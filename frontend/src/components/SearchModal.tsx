import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { api } from '../lib/api';
import { inr } from '../lib/format';

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!open) { setQ(''); setResults([]); return; }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!q.trim()) { setResults([]); return; }
    let live = true;
    const t = setTimeout(async () => {
      try {
        const r = await api.products({ q });
        if (live) setResults(r.products.slice(0, 6));
      } catch { /* ignore */ }
    }, 200);
    return () => { live = false; clearTimeout(t); };
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4" onClick={onClose}>
      <div className="w-full max-w-xl bg-warm rounded-2xl shadow-soft overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b hairline">
          <Icon name="search" />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search rings, stones, sets…" className="flex-1 bg-transparent outline-none text-base" />
          <button onClick={onClose} className="icon-btn"><Icon name="close" /></button>
        </div>
        <div className="max-h-[60vh] overflow-auto">
          {q.trim() && !results.length && (
            <div className="px-4 py-8 text-center muted text-sm">No matches yet — try another stone or design.</div>
          )}
          {results.map(p => (
            <Link to={`/jewellery/${p.slug}`} key={p.id} onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 hover:bg-warm border-b hairline last:border-0">
              <div className="w-12 h-12 rounded-xl bg-stone/40 flex items-center justify-center text-gold-deep">
                <Icon name={p.category === 'ring' ? 'ring' : p.category === 'pendant' ? 'pendant' : p.category === 'earring' ? 'earring' : p.category === 'bracelet' ? 'bracelet' : 'necklace'} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{p.name}</div>
                <div className="font-deva text-xs muted">{p.hindi}</div>
              </div>
              <div className="text-sm font-medium gold-text">{inr(p.basePrice)}</div>
            </Link>
          ))}
          {!q.trim() && (
            <div className="px-4 py-6 text-sm muted">
              Try: <span className="text-ink font-medium">ruby</span>, <span className="text-ink font-medium">pukhraj</span>, <span className="text-ink font-medium">solitaire</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
