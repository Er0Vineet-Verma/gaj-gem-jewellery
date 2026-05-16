import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import AnimatedCardStack from '../components/ui/animate-card-animation';
import { api } from '../lib/api';

const CATEGORIES = ['all', 'ring', 'pendant', 'earring', 'bracelet', 'necklace'] as const;

const STONES = [
  'Ruby', 'Emerald', 'Sapphire', 'Diamond',
  'Pearl', 'Coral', 'Yellow Sapphire', 'Amethyst',
];

const METAL_FILTERS = [
  { label: '22K Gold',  key: '22K'      },
  { label: '18K Gold',  key: '18K'      },
  { label: 'Silver',    key: 'Silver'   },
  { label: 'Platinum',  key: 'Platinum' },
];

const SORTS = [
  { k: '',           label: 'Featured'     },
  { k: 'price-asc',  label: 'Price · low'  },
  { k: 'price-desc', label: 'Price · high' },
  { k: 'name',       label: 'Name · A–Z'   },
];

const pillBase   = 'px-3.5 py-1.5 rounded-full text-sm capitalize transition-all cursor-pointer whitespace-nowrap';
const pillActive = 'bg-ink text-ivory dark:bg-ivory dark:text-ink shadow-sm';
const pillIdle   = 'bg-white border hairline hover:border-gold-deep hover:text-gold-deep dark:hover:border-gold-soft dark:hover:text-gold-soft';

export default function ProductList() {
  const [params, setParams] = useSearchParams();
  const [list, setList]     = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [metalKey, setMetalKey] = useState('');   // client-side metal filter

  const category = params.get('category') ?? 'all';
  const sort      = params.get('sort')     ?? '';
  const q         = params.get('q')        ?? '';
  const stone     = params.get('stone')    ?? '';

  useEffect(() => {
    setLoading(true);
    api.products({
      category: category === 'all' ? undefined : category,
      sort:     sort  || undefined,
      q:        q     || undefined,
      stone:    stone || undefined,
    }).then(r => setList(r.products)).finally(() => setLoading(false));
  }, [category, sort, q, stone]);

  const setParam = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v); else next.delete(k);
    setParams(next, { replace: true });
  };

  const stones = useMemo(() => STONES, []);

  // Client-side metal filter on top of API results
  const displayed = metalKey
    ? list.filter(p => p.metals.some((m: string) => m.includes(metalKey)))
    : list;

  const activeFilters = [
    category !== 'all' && category,
    stone,
    metalKey,
  ].filter(Boolean).length;

  return (
    <>
      {/* Trending picks — interactive card stack */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="py-14 border-b hairline bg-warm"
      >
        <div className="container-x flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          <div className="flex-shrink-0 lg:max-w-xs text-center lg:text-left">
            <div className="text-[10px] uppercase tracking-[0.28em] muted">Trending this season</div>
            <h2 className="font-display text-4xl mt-2 leading-tight">Pieces that steal the room.</h2>
            <p className="font-deva text-base muted mt-1">इस सीज़न के सबसे चर्चित आभूषण</p>
            <p className="muted text-sm mt-4 leading-relaxed">
              Hand-selected by our designers — click <em>Next piece</em> to cycle through current favourites.
            </p>
          </div>
          <div className="flex-1 w-full">
            <AnimatedCardStack />
          </div>
        </div>
      </motion.section>

      {/* Catalogue */}
      <section className="py-12">
        <div className="container-x">
          <header className="flex flex-wrap items-end justify-between gap-4 mb-7">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] muted">Our jewellery</div>
              <h1 className="font-display text-4xl mt-1">
                Pieces in the studio{' '}
                <span className="font-deva text-2xl muted">हमारे आभूषण</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {activeFilters > 0 && (
                <button
                  onClick={() => { setParams({}); setMetalKey(''); }}
                  className="text-xs muted hover:text-gold-deep transition cursor-pointer flex items-center gap-1"
                >
                  <Icon name="close" size={12} /> Clear filters
                </button>
              )}
              <span className="text-sm muted">{displayed.length} pieces</span>
            </div>
          </header>

          {/* Row 1: Category + Sort */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setParam('category', c === 'all' ? '' : c)}
                  className={`${pillBase} ${category === c ? pillActive : pillIdle}`}
                >
                  {c === 'all' ? 'All pieces' : c}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <select
              value={sort}
              onChange={e => setParam('sort', e.target.value)}
              className="input max-w-[160px] cursor-pointer text-sm"
            >
              {SORTS.map(s => <option key={s.k} value={s.k}>{s.label}</option>)}
            </select>
          </div>

          {/* Row 2: Stone pills */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-xs muted shrink-0 pr-1">Stone</span>
            <button
              onClick={() => setParam('stone', '')}
              className={`${pillBase} text-xs ${!stone ? pillActive : pillIdle}`}
            >Any</button>
            {stones.map(s => (
              <button
                key={s}
                onClick={() => setParam('stone', stone === s ? '' : s)}
                className={`${pillBase} text-xs ${stone === s ? pillActive : pillIdle}`}
              >{s}</button>
            ))}
          </div>

          {/* Row 3: Metal pills */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-xs muted shrink-0 pr-1">Metal</span>
            <button
              onClick={() => setMetalKey('')}
              className={`${pillBase} text-xs ${!metalKey ? pillActive : pillIdle}`}
            >Any</button>
            {METAL_FILTERS.map(m => (
              <button
                key={m.key}
                onClick={() => setMetalKey(metalKey === m.key ? '' : m.key)}
                className={`${pillBase} text-xs ${metalKey === m.key ? pillActive : pillIdle}`}
              >{m.label}</button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : displayed.length ? (
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            >
              {displayed.map(p => (
                <motion.div
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                  }}
                >
                  <ProductCard p={p} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center muted py-20 space-y-2">
              <Icon name="gem" size={32} className="mx-auto opacity-30" />
              <p>No pieces match — try widening your filters.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
