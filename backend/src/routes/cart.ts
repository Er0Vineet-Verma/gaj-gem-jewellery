import { Router } from 'express';
import { z } from 'zod';
import { products } from '../data/products.js';

const router = Router();

interface CartLine {
  productId: string;
  qty: number;
  metal?: string;
  size?: string;
  addedAt: string;
}

const carts = new Map<string, CartLine[]>();

function sessionId(req: any): string | null {
  const id = req.header('x-session-id');
  return typeof id === 'string' && id.length >= 8 ? id : null;
}

function expand(lines: CartLine[]) {
  return lines.map(l => {
    const p = products.find(p => p.id === l.productId);
    return {
      ...l,
      product: p ? { id: p.id, slug: p.slug, name: p.name, hindi: p.hindi, basePrice: p.basePrice, category: p.category } : null,
      lineTotal: p ? p.basePrice * l.qty : 0,
    };
  });
}

const addSchema = z.object({
  productId: z.string().min(2),
  qty: z.coerce.number().int().min(1).max(20).default(1),
  metal: z.string().max(40).optional(),
  size: z.string().max(20).optional(),
});

router.get('/', (req, res) => {
  const sid = sessionId(req);
  if (!sid) return res.status(400).json({ error: 'Missing x-session-id header' });
  const lines = carts.get(sid) ?? [];
  const expanded = expand(lines);
  const subtotal = expanded.reduce((s, l) => s + l.lineTotal, 0);
  res.json({ items: expanded, subtotal, count: expanded.reduce((s, l) => s + l.qty, 0) });
});

router.post('/', (req, res) => {
  const sid = sessionId(req);
  if (!sid) return res.status(400).json({ error: 'Missing x-session-id header' });
  const parsed = addSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid', details: parsed.error.flatten() });
  if (!products.find(p => p.id === parsed.data.productId)) return res.status(404).json({ error: 'Product not found' });

  const lines = carts.get(sid) ?? [];
  const existing = lines.find(l => l.productId === parsed.data.productId && l.metal === parsed.data.metal && l.size === parsed.data.size);
  if (existing) {
    existing.qty = Math.min(20, existing.qty + parsed.data.qty);
  } else {
    lines.push({ productId: parsed.data.productId, qty: parsed.data.qty, metal: parsed.data.metal, size: parsed.data.size, addedAt: new Date().toISOString() });
  }
  carts.set(sid, lines);
  res.status(201).json({ ok: true });
});

router.patch('/:productId', (req, res) => {
  const sid = sessionId(req);
  if (!sid) return res.status(400).json({ error: 'Missing x-session-id header' });
  const qty = Number(req.body?.qty ?? 0);
  const lines = carts.get(sid) ?? [];
  const line = lines.find(l => l.productId === req.params.productId);
  if (!line) return res.status(404).json({ error: 'Not in cart' });
  if (qty <= 0) {
    carts.set(sid, lines.filter(l => l.productId !== req.params.productId));
  } else {
    line.qty = Math.min(20, qty);
  }
  res.json({ ok: true });
});

router.delete('/:productId', (req, res) => {
  const sid = sessionId(req);
  if (!sid) return res.status(400).json({ error: 'Missing x-session-id header' });
  const lines = carts.get(sid) ?? [];
  carts.set(sid, lines.filter(l => l.productId !== req.params.productId));
  res.json({ ok: true });
});

router.delete('/', (req, res) => {
  const sid = sessionId(req);
  if (!sid) return res.status(400).json({ error: 'Missing x-session-id header' });
  carts.delete(sid);
  res.json({ ok: true });
});

export default router;
