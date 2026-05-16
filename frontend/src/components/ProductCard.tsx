import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { inr } from '../lib/format';

export default function ProductCard({ p }: { p: any }) {
  const { ids, toggle } = useWishlist();
  const { add } = useCart();
  const wished = ids.has(p.id);
  const [imgFailed, setImgFailed] = useState(false);
  const hasImg = p.images?.[0] && !imgFailed;

  const swatchClass =
    p.metals[0]?.includes('White') ? 'swatch-wg' :
    p.metals[0]?.includes('Rose') ? 'swatch-rg' :
    p.metals[0]?.includes('Platinum') ? 'swatch-pt' : 'swatch-yg';

  const catIcon =
    p.category === 'ring' ? 'ring' :
    p.category === 'pendant' ? 'pendant' :
    p.category === 'earring' ? 'earring' :
    p.category === 'bracelet' ? 'bracelet' :
    'necklace';

  const hasAlt = !!(p.images?.[1]);

  return (
    <article className="card group relative">
      <Link to={`/jewellery/${p.slug}`} className="block">
        <div className="aspect-[4/5] bg-gradient-to-br from-stone/40 to-warm relative overflow-hidden">
          {hasImg ? (
            <>
              <img
                src={p.images[0]}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                onError={() => setImgFailed(true)}
              />
              {hasAlt && (
                <img
                  src={p.images[1]}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  loading="lazy"
                />
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gold-deep">
              <Icon name={catIcon as any} size={84} strokeWidth={0.9} className="opacity-90" />
            </div>
          )}
          <div className={`absolute bottom-3 left-3 w-7 h-7 rounded-full ${swatchClass} ring-2 ring-white`} title={p.metals[0]} />
        </div>
      </Link>
      <button
        onClick={() => toggle(p.id, p.name)}
        className={`absolute top-3 right-3 icon-btn-light backdrop-blur ${wished ? 'text-ruby-brand bg-white/90' : 'bg-white/70 text-ink'}`}
        aria-label="Save to wishlist">
        <Icon name={wished ? 'heart-fill' : 'heart'} size={18} />
      </button>
      {p.badge && (
        <span className={`absolute top-3 left-3 badge ${p.badge === 'new' ? 'badge-new' : p.badge === 'best-seller' ? 'badge-best' : p.badge === 'gemstone' ? 'badge-gem' : 'badge-custom'}`}>
          {p.badge.replace('-', ' ')}
        </span>
      )}
      <div className="p-3 sm:p-4">
        <Link to={`/jewellery/${p.slug}`}>
          <h3 className="font-display text-base sm:text-lg leading-tight">{p.name}</h3>
          <p className="font-deva text-xs muted">{p.hindi}</p>
        </Link>
        <p className="text-xs muted mt-1.5 line-clamp-2 hidden sm:block">{p.shortDesc}</p>
        <div className="flex items-end justify-between mt-2 sm:mt-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider muted">From</div>
            <div className="font-display text-base sm:text-lg gold-text">{inr(p.basePrice)}</div>
          </div>
          <button
            onClick={() => add({ productId: p.id, qty: 1, metal: p.metals[0], size: p.sizes[0], name: p.name })}
            className="btn btn-ghost text-xs py-1.5 px-2 sm:py-2 sm:px-3"><Icon name="bag" size={14} /></button>
        </div>
      </div>
    </article>
  );
}
