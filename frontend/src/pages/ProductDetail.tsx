import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import { ProductDetailSkeleton } from '../components/Skeleton';
import { api } from '../lib/api';
import { inr, waLink } from '../lib/format';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

type Tab = 'description' | 'specs' | 'care';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct]       = useState<any | null>(null);
  const [related, setRelated]       = useState<any[]>([]);
  const [metal, setMetal]           = useState<string>('');
  const [size, setSize]             = useState<string>('');
  const [tab, setTab]               = useState<Tab>('description');
  const [selectedImg, setSelectedImg] = useState(0);
  const [lightbox, setLightbox]     = useState(false);
  const { add }                     = useCart();
  const { ids, toggle }             = useWishlist();
  const touchStartX                 = useRef(0);

  useEffect(() => {
    if (!slug) return;
    setProduct(null);
    setSelectedImg(0);
    api.product(slug).then(r => {
      setProduct(r.product);
      setRelated(r.related);
      setMetal(r.product.metals[0]);
      setSize(r.product.sizes[0]);
    }).catch(() => setProduct(null));
  }, [slug]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightbox(false);
      if (e.key === 'ArrowRight')  setSelectedImg(i => Math.min(i + 1, (product?.images?.length ?? 1) - 1));
      if (e.key === 'ArrowLeft')   setSelectedImg(i => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, product]);

  if (!product) return <ProductDetailSkeleton />;

  const wished  = ids.has(product.id);
  const images: string[] = product.images ?? [];

  const catIcon =
    product.category === 'ring'     ? 'ring'    :
    product.category === 'pendant'  ? 'pendant' :
    product.category === 'earring'  ? 'earring' :
    product.category === 'bracelet' ? 'bracelet' : 'necklace';

  return (
    <>
      <section className="py-10">
        <div className="container-x">
          <nav className="text-xs muted mb-5 flex items-center gap-2">
            <Link to="/">Home</Link> <span>/</span>
            <Link to="/jewellery">Jewellery</Link> <span>/</span>
            <span className="dark:text-[#F9F5EF] text-ink">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* ── Left: images ─────────────────────────────────── */}
            <div className="lg:col-span-7">
              {/* Main image — click to open lightbox, swipe on mobile */}
              <div
                className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-stone/40 to-warm shadow-soft relative cursor-zoom-in"
                onClick={() => images[selectedImg] && setLightbox(true)}
                onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={e => {
                  const delta = touchStartX.current - e.changedTouches[0].clientX;
                  if (Math.abs(delta) < 48) return;
                  if (delta > 0) setSelectedImg(i => Math.min(i + 1, images.length - 1));
                  else           setSelectedImg(i => Math.max(i - 1, 0));
                }}
              >
                {images[selectedImg] ? (
                  <img
                    src={images[selectedImg]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gold-deep">
                    <Icon name={catIcon as any} size={220} strokeWidth={0.6} />
                  </div>
                )}
                {/* Tap-to-zoom hint */}
                {images[selectedImg] && (
                  <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-white/60 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full pointer-events-none">
                    Tap to zoom
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.length > 0
                  ? images.slice(0, 4).map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImg(i)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          selectedImg === i
                            ? 'border-gold-deep shadow-md'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={src} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))
                  : [0, 1, 2, 3].map(i => (
                      <div key={i} className="aspect-square rounded-2xl bg-stone/30 flex items-center justify-center text-gold-deep/60">
                        <Icon name={catIcon as any} size={40} strokeWidth={0.8} />
                      </div>
                    ))}
              </div>
            </div>

            {/* ── Right: details — sticky on desktop ───────────── */}
            <aside className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              {product.badge && (
                <span className={`badge ${
                  product.badge === 'new'          ? 'badge-new'  :
                  product.badge === 'best-seller'  ? 'badge-best' :
                  product.badge === 'gemstone'     ? 'badge-gem'  : 'badge-custom'
                }`}>{product.badge.replace('-', ' ')}</span>
              )}
              <h1 className="font-display text-3xl sm:text-4xl mt-3">{product.name}</h1>
              <p className="font-deva text-base sm:text-lg muted">{product.hindi}</p>
              <p className="muted mt-3 text-sm sm:text-base">{product.shortDesc}</p>

              <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs uppercase tracking-wider muted">From</span>
                <span className="font-display text-2xl sm:text-3xl gold-text">{inr(product.basePrice)}</span>
                <span className="text-xs muted">· tax &amp; making charge confirmed at order</span>
              </div>

              <div className="mt-6">
                <div className="label mb-2">Metal</div>
                <div className="flex flex-wrap gap-2">
                  {product.metals.map((m: string) => (
                    <button key={m} onClick={() => setMetal(m)} className={`px-3 py-1.5 rounded-full text-sm transition cursor-pointer ${metal === m ? 'bg-ink text-ivory dark:bg-ivory dark:text-ink' : 'bg-white border hairline hover:border-gold-deep'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="label mb-2">Size</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s: string) => (
                    <button key={s} onClick={() => setSize(s)} className={`px-3 py-1.5 rounded-full text-sm transition cursor-pointer ${size === s ? 'bg-ink text-ivory dark:bg-ivory dark:text-ink' : 'bg-white border hairline hover:border-gold-deep'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => add({ productId: product.id, qty: 1, metal, size, name: product.name })}
                  className="btn btn-primary"
                >
                  <Icon name="bag" size={16} /> Add to bag
                </button>
                <button
                  onClick={() => toggle(product.id, product.name)}
                  className="btn btn-ghost"
                >
                  <Icon name={wished ? 'heart-fill' : 'heart'} size={16} className={wished ? 'text-ruby-brand' : ''} />
                  {wished ? 'Saved' : 'Save'}
                </button>
                <a
                  href={waLink(`Hi, I'd like to know more about the ${product.name} (${metal}, Size ${size}).`)}
                  target="_blank" rel="noreferrer"
                  className="btn btn-gold"
                >
                  <Icon name="whatsapp" size={16} /> Ask about this
                </a>
              </div>

              <ul className="mt-6 text-sm space-y-1.5 muted">
                <li className="flex items-center gap-2"><Icon name="shield"  size={14} className="text-emerald-brand" /> BIS hallmarked · {product.specs.Hallmark ?? 'BIS 916'}</li>
                <li className="flex items-center gap-2"><Icon name="gem"     size={14} className="text-ruby-brand"    /> Certified stone with lab report</li>
                <li className="flex items-center gap-2"><Icon name="sparkle" size={14} className="text-gold-deep"     /> Free lifetime polish</li>
                <li className="flex items-center gap-2"><Icon name="chat"    size={14} className="text-emerald-brand" /> WhatsApp our designer before you commit</li>
              </ul>

              <div className="mt-8">
                <div className="flex gap-4 border-b hairline">
                  {(['description', 'specs', 'care'] as Tab[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`pb-2 text-sm capitalize cursor-pointer ${tab === t ? 'dark:text-[#F9F5EF] text-ink border-b-2 border-gold-deep -mb-px' : 'muted'}`}
                    >{t}</button>
                  ))}
                </div>
                <div className="pt-4 text-sm leading-relaxed">
                  {tab === 'description' && <p>{product.description}</p>}
                  {tab === 'specs' && (
                    <dl className="grid grid-cols-2 gap-y-2 text-sm">
                      {Object.entries(product.specs).map(([k, v]) => (
                        <div key={k} className="contents">
                          <dt className="muted">{k}</dt>
                          <dd>{String(v)}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {tab === 'care' && <p>{product.care}</p>}
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h3 className="font-display text-2xl mb-6">You may also love</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {related.map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && images[selectedImg] && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} — image ${selectedImg + 1} of ${images.length}`}
          >
            <motion.img
              key={selectedImg}
              src={images[selectedImg]}
              alt={`${product.name} view ${selectedImg + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.88,    opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            />

            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              onClick={() => setLightbox(false)}
              aria-label="Close lightbox"
            >
              <Icon name="close" size={20} />
            </button>

            {/* Prev */}
            {selectedImg > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer rotate-180"
                onClick={e => { e.stopPropagation(); setSelectedImg(i => i - 1); }}
                aria-label="Previous image"
              >
                <Icon name="arrow-right" size={20} />
              </button>
            )}

            {/* Next */}
            {selectedImg < images.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                onClick={e => { e.stopPropagation(); setSelectedImg(i => i + 1); }}
                aria-label="Next image"
              >
                <Icon name="arrow-right" size={20} />
              </button>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setSelectedImg(i); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${i === selectedImg ? 'bg-white w-4' : 'bg-white/40'}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
