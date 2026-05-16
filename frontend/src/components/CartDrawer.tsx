import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useCart } from '../contexts/CartContext';
import { inr } from '../lib/format';

export default function CartDrawer() {
  const { drawerOpen, closeDrawer, items, subtotal, count, update, remove } = useCart();
  if (!drawerOpen) return null;
  return (
    <div className="fixed inset-0 z-[95] flex" onClick={closeDrawer}>
      <div className="flex-1 bg-ink/60" />
      <aside className="w-full max-w-md bg-warm h-full flex flex-col shadow-soft" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between px-5 py-4 border-b hairline">
          <div className="flex items-center gap-2">
            <Icon name="bag" />
            <h3 className="font-display text-xl">Your bag</h3>
            <span className="muted text-sm">· {count}</span>
          </div>
          <button onClick={closeDrawer} className="icon-btn"><Icon name="close" /></button>
        </header>
        <div className="flex-1 overflow-auto px-5 py-3">
          {!items.length && (
            <div className="text-center py-12">
              <div className="w-14 h-14 mx-auto rounded-full bg-stone/40 text-gold-deep flex items-center justify-center mb-3"><Icon name="bag" /></div>
              <p className="muted text-sm">Your bag is quiet.</p>
              <Link to="/jewellery" onClick={closeDrawer} className="btn btn-ghost mt-4 inline-flex">Browse pieces <Icon name="arrow-right" size={16} /></Link>
            </div>
          )}
          {items.map(it => (
            <div key={it.productId} className="flex gap-3 py-4 border-b hairline last:border-0">
              <div className="w-16 h-16 rounded-xl bg-stone/40 text-gold-deep flex items-center justify-center"><Icon name="gem" /></div>
              <div className="flex-1">
                <div className="font-medium text-sm">{it.product?.name}</div>
                <div className="font-deva text-xs muted">{it.product?.hindi}</div>
                {(it.metal || it.size) && <div className="text-xs muted mt-1">{[it.metal, it.size && `Size ${it.size}`].filter(Boolean).join(' · ')}</div>}
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => update(it.productId, Math.max(0, it.qty - 1))} className="icon-btn-light w-7 h-7 bg-stone/40 text-ink"><Icon name="minus" size={14} /></button>
                  <span className="text-sm w-6 text-center">{it.qty}</span>
                  <button onClick={() => update(it.productId, it.qty + 1)} className="icon-btn-light w-7 h-7 bg-stone/40 text-ink"><Icon name="plus" size={14} /></button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium gold-text">{inr(it.lineTotal)}</div>
                <button onClick={() => remove(it.productId)} className="text-xs muted hover:text-ruby-brand mt-2">Remove</button>
              </div>
            </div>
          ))}
        </div>
        {!!items.length && (
          <footer className="px-5 py-4 border-t hairline">
            <div className="flex items-center justify-between mb-3">
              <span className="muted text-sm">Subtotal</span>
              <span className="font-display text-xl">{inr(subtotal)}</span>
            </div>
            <p className="text-xs muted mb-3">Tax & making charge confirmed at order.</p>
            <Link to="/cart" onClick={closeDrawer} className="btn btn-primary w-full justify-center">View bag <Icon name="arrow-right" size={16} /></Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
