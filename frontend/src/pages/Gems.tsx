import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { api } from '../lib/api';
import type { Gem } from '../types';

export default function Gems() {
  const [gems, setGems] = useState<Gem[]>([]);
  useEffect(() => {
    api.gems().then(r => setGems(r.gems)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!gems.length || !location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [gems]);

  return (
    <section className="py-12">
      <div className="container-x">
        <header className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.28em] muted">Loose gemstones</div>
          <h1 className="font-display text-3xl sm:text-5xl mt-1">The nine stones and more <span className="font-deva text-xl sm:text-2xl muted block mt-2">नौ रत्न और अन्य</span></h1>
          <p className="muted max-w-2xl mx-auto mt-4">Each stone below is available as a loose gem, or set in a piece we design around it. All stones are naturally-sourced, lab-certified, and documented.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-5">
          {gems.map(g => (
            <article key={g.id} id={g.id} className="card scroll-mt-28 overflow-hidden">
              {/* image header */}
              <div className="relative h-52 overflow-hidden">
                {g.image ? (
                  <img src={g.image} alt={g.en} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                ) : (
                  <div className="w-full h-full" style={{ background: g.color }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-white leading-tight">{g.en}</h3>
                    <span className="font-deva text-sm text-white/65">{g.hi}</span>
                  </div>
                  <div className="w-9 h-9 rounded-full flex-shrink-0 ring-2 ring-white/30 shadow-md overflow-hidden" style={{ background: g.color }} />
                </div>
              </div>

              {/* content */}
              <div className="p-5">
                <div className="text-xs uppercase tracking-[0.18em] gold-text mb-2">{g.short}</div>
                <p className="text-sm muted leading-relaxed">{g.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {g.uses.map(u => (
                    <span key={u} className="text-[11px] bg-stone/40 dark:bg-white/8 px-2 py-0.5 rounded-full">{u}</span>
                  ))}
                </div>
                <Link to="/custom" className="mt-4 inline-flex items-center gap-1.5 text-sm gold-text hover:underline">
                  Design with {g.en} <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
