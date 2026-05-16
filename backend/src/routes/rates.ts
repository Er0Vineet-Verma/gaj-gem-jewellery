import { Router } from 'express';
import { config } from '../config.js';
import type { Rate } from '../types.js';

const router = Router();

// ── Constants ─────────────────────────────────────────────────────
const TROY_OZ_TO_G = 31.1035;
const RATES_TTL    = 60_000;           // 1 min — metals cache
const FX_TTL       = 6 * 60 * 60_000; // 6 h  — USD/INR cache

// India import duty (6%) + GST (3%) — applied when converting
// international USD spot → Indian retail. NOT applied when the
// API already returns INR-denominated prices (metals-api.com).
const INDIA_FACTOR = 1.06 * 1.03;     // ≈ 1.0918

// ── In-memory state ───────────────────────────────────────────────
let ratesCache: { rates: Rate[]; updatedAt: string } | null = null;
let ratesCacheTime = 0;

let usdInr     = 84.0;  // fallback; refreshed every 6 h
let usdInrTime = 0;

let prevPrices: Record<string, number> = {};  // for changePct calculation

// ── Helpers ───────────────────────────────────────────────────────
function pct(key: string, current: number): number {
  const prev = prevPrices[key] ?? 0;
  if (!prev) return 0;
  return +((current - prev) / prev * 100).toFixed(2);
}

function abort5s() {
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), 5000);
  return ctrl.signal;
}

function buildRows(gold24: number, silver: number, platinum: number): Rate[] {
  const goldPct   = pct('gold',     gold24);
  const silverPct = pct('silver',   silver);
  const platPct   = pct('platinum', platinum);
  prevPrices = { gold: gold24, silver, platinum };

  return [
    { label: 'Gold 24K', hi: 'सोना 24K', pricePerGram: gold24,                     changePct: goldPct,                       unit: 'g' },
    { label: 'Gold 22K', hi: 'सोना 22K', pricePerGram: Math.round(gold24 * 0.916), changePct: +(goldPct * 0.9).toFixed(2) as unknown as number, unit: 'g' },
    { label: 'Gold 18K', hi: 'सोना 18K', pricePerGram: Math.round(gold24 * 0.75),  changePct: +(goldPct * 0.8).toFixed(2) as unknown as number, unit: 'g' },
    { label: 'Silver',   hi: 'चांदी',    pricePerGram: silver,                      changePct: silverPct,                     unit: 'g' },
    { label: 'Platinum', hi: 'प्लैटिनम', pricePerGram: platinum,                    changePct: platPct,                       unit: 'g' },
  ];
}

// ── Source 1: metals-api.com (requires METALS_API_KEY in .env) ────
// Response shape: { base: "INR", rates: { XAU, XAG, XPT } }
// Rate meaning:   1 INR = rates.XAU troy oz of gold
// Formula:        INR/gram = 1 / rate / TROY_OZ_TO_G
// No INDIA_FACTOR — prices are already in INR.
async function fetchMetalsApiCom(): Promise<Rate[] | null> {
  const { apiKey, apiUrl } = config.rates;
  if (!apiKey) return null;

  const base = (apiUrl || 'https://metals-api.com/api/latest').replace(/\/$/, '');
  const url  = `${base}?access_key=${apiKey}&base=INR&symbols=XAU,XAG,XPT`;

  try {
    const r = await fetch(url, { signal: abort5s() });
    if (!r.ok) return null;
    const j: any = await r.json();
    if (!j?.success || !j?.rates?.XAU) return null;

    const gold24   = Math.round(1 / j.rates.XAU / TROY_OZ_TO_G);
    const silver   = Math.round(1 / j.rates.XAG / TROY_OZ_TO_G);
    const platinum = Math.round(1 / j.rates.XPT / TROY_OZ_TO_G);

    // Guard: free tier returns old test data (gives ~₹146/g for gold).
    // Real gold is always above ₹5,000/g in any modern year.
    if (gold24 < 5_000) {
      console.warn(`[rates] metals-api.com returned ₹${gold24}/g for gold — free tier test data, skipping`);
      return null;
    }

    return buildRows(gold24, silver, platinum);
  } catch { return null; }
}

// ── Source 2: metals.live + open.er-api.com (free, no key) ───────
// metals.live  → USD/troy oz spot for gold, silver, platinum
// open.er-api  → live USD → INR rate
// Applies INDIA_FACTOR to bridge international spot → Indian retail.

async function getUsdInr(): Promise<number> {
  if (Date.now() - usdInrTime < FX_TTL) return usdInr;
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/USD', { signal: abort5s() });
    if (!r.ok) return usdInr;
    const j: any = await r.json();
    if (j?.rates?.INR) { usdInr = j.rates.INR; usdInrTime = Date.now(); }
  } catch { /* keep last value */ }
  return usdInr;
}

async function fetchMetalsLive(): Promise<Rate[] | null> {
  try {
    const [spotRes, fx] = await Promise.all([
      fetch('https://metals.live/api/latest', { signal: abort5s() }),
      getUsdInr(),
    ]);
    if (!spotRes.ok) return null;
    const spot: any = await spotRes.json();
    if (!spot?.gold) return null;

    const toInr = (usdPerTroyOz: number) =>
      Math.round((usdPerTroyOz * fx * INDIA_FACTOR) / TROY_OZ_TO_G);

    const gold24   = toInr(spot.gold);
    const silver   = toInr(spot.silver ?? 0);
    const platinum = toInr(spot.platinum ?? 0);

    if (gold24 < 5_000) return null;  // same guard
    return buildRows(gold24, silver, platinum);
  } catch { return null; }
}

// ── Source 3: simulate (hardcoded current Indian retail) ──────────
// Only used when both live APIs are unreachable.
// Prices based on Indian market rates as of May 2026.
function simulate(): Rate[] {
  const wobble = (n: number) => n + Math.round((Math.random() - 0.5) * n * 0.004);
  const gold24 = 15_850;
  return buildRows(wobble(gold24), wobble(280), wobble(3_200));
}

// ── Route ─────────────────────────────────────────────────────────
router.get('/', async (_req, res) => {
  if (ratesCache && Date.now() - ratesCacheTime < RATES_TTL) {
    return res.json(ratesCache);
  }

  // Try sources in priority order
  const rates =
    (await fetchMetalsApiCom()) ??
    (await fetchMetalsLive())   ??
    simulate();

  ratesCache     = { rates, updatedAt: new Date().toISOString() };
  ratesCacheTime = Date.now();
  res.json(ratesCache);
});

export default router;
