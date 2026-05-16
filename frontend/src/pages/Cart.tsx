import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { useCart } from '../contexts/CartContext';
import { inr, waLink } from '../lib/format';

export default function Cart() {
  const { items, subtotal, count, update, remove, clear } = useCart();

  const orderText = () => {
    const lines = items.map((it: any) => `• ${it.product?.name} × ${it.qty}${it.metal ? ` (${it.metal})` : ''}${it.size ? ` · size ${it.size}` : ''} — ${inr(it.lineTotal)}`);
    return `Hi, I'd like to place an order:\n\n${lines.join('\n')}\n\nSubtotal: ${inr(subtotal)}`;
  };

  return (
    <section className="py-12">
      <div className="container-x">
        <header className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] muted">Your bag</div>
            <h1 className="font-display text-4xl mt-1">Bag <span className="font-deva text-2xl muted">आपका बैग</span></h1>
          </div>
          <span className="text-sm muted">{count} piece{count === 1 ? '' : 's'}</span>
        </header>

        {!items.length ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 mx-auto rounded-full bg-stone/40 text-gold-deep flex items-center justify-center mb-3"><Icon name="bag" /></div>
            <p className="muted">Your bag is quiet.</p>
            <Link to="/jewellery" className="btn btn-primary mt-4 inline-flex">Browse pieces <Icon name="arrow-right" size={16} /></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-3">
              {items.map((it: any) => (
                <div key={it.productId} className="card p-4 flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-stone/40 text-gold-deep flex items-center justify-center"><Icon name="gem" /></div>
                  <div className="flex-1">
                    <Link to={`/jewellery/${it.product?.slug}`} className="font-display text-lg">{it.product?.name}</Link>
                    <div className="font-deva text-xs muted">{it.product?.hindi}</div>
                    {(it.metal || it.size) && <div className="text-xs muted mt-1">{[it.metal, it.size && `Size ${it.size}`].filter(Boolean).join(' · ')}</div>}
                    <div className="flex items-center gap-2 mt-3">
                      <button onClick={() => update(it.productId, Math.max(0, it.qty - 1))} className="icon-btn-light w-8 h-8 bg-stone/40 text-ink"><Icon name="minus" size={14} /></button>
                      <span className="text-sm w-6 text-center">{it.qty}</span>
                      <button onClick={() => update(it.productId, it.qty + 1)} className="icon-btn-light w-8 h-8 bg-stone/40 text-ink"><Icon name="plus" size={14} /></button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg gold-text">{inr(it.lineTotal)}</div>
                    <button onClick={() => remove(it.productId)} className="text-xs muted hover:text-ruby-brand mt-3">Remove</button>
                  </div>
                </div>
              ))}
              <button onClick={clear} className="text-sm muted hover:text-ruby-brand">Clear bag</button>
            </div>

            <aside className="lg:col-span-4">
              <div className="card p-6 sticky top-24">
                <h3 className="font-display text-xl">Order summary</h3>
                <dl className="mt-4 text-sm space-y-2">
                  <div className="flex justify-between"><dt className="muted">Subtotal</dt><dd>{inr(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="muted">Making &amp; tax</dt><dd className="muted">confirmed at order</dd></div>
                </dl>
                <div className="border-t hairline my-4" />
                <div className="flex justify-between items-center">
                  <span className="font-display text-lg">Total from</span>
                  <span className="font-display text-2xl gold-text">{inr(subtotal)}</span>
                </div>
                <a href={waLink(orderText())} target="_blank" rel="noreferrer" className="btn btn-gold w-full justify-center mt-5">
                  <Icon name="whatsapp" size={16} /> Place order on WhatsApp
                </a>
                <p className="text-xs muted mt-3">We confirm every order by WhatsApp before making. No advance needed for in-stock pieces.</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
