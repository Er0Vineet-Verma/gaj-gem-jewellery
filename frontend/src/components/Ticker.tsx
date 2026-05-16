import { useEffect, useState } from 'react';
import Icon from './Icon';
import { api } from '../lib/api';
import { inr, pct } from '../lib/format';
import type { Rate } from '../types';

export default function Ticker() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    let live = true;
    const load = async () => {
      try {
        const r = await api.rates();
        if (!live) return;
        setRates(r.rates);
        setUpdatedAt(new Date(r.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
      } catch { /* ignore */ }
    };
    load();
    const t = setInterval(load, 60_000);
    return () => { live = false; clearInterval(t); };
  }, []);

  if (!rates.length) return null;

  const items = [...rates, ...rates]; // double for seamless loop

  return (
    <div className="ticker text-xs">
      <div className="container-x flex items-center gap-4 py-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-ivory/60 shrink-0 hidden sm:flex items-center gap-1.5">
          <Icon name="scale" size={14} /> Live rates · {updatedAt || '--'}
        </span>
        <div className="overflow-hidden flex-1">
          <div className="ticker-track">
            {items.map((r, i) => (
              <span key={i} className="inline-flex items-center gap-2">
                <Icon name="sparkle" size={12} className="text-gold-soft" />
                <span className="font-medium">{r.label}</span>
                <span className="font-deva text-ivory/70">{r.hi}</span>
                <span className="text-gold-soft">{inr(r.pricePerGram)}/{r.unit}</span>
                <span className={r.changePct >= 0 ? 'text-emerald-300' : 'text-red-300'}>{pct(r.changePct)}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
