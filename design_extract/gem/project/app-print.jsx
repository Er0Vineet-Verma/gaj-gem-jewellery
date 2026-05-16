/* ─────────────────────────────────────────────────────────────
   GAJ — Print app: renders ALL pages stacked, one per page.
   ───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

function PrintApp() {
  const noop = () => {};
  const tweak = {
    theme: 'dark',
    accentGold: '#C6A86B',
    headline: 'Stones with stories.\nGold with *feeling*.'
  };

  // Demo state so cart/wishlist render with content
  const wishlist = ['mehr-ruby-ring', 'amrita-emerald-necklace', 'inara-rose-stud', 'kohl-sapphire-band'];
  const cart = [
    { id: 'mehr-ruby-ring', qty: 1, metal: '22K', size: '14' },
    { id: 'jharokha-jhumka', qty: 1, metal: '22K', size: '—' }
  ];

  const pages = [
    { id: 'home',      label: 'Home · The Atelier',     el: <HomePage tweak={tweak} goto={noop} openProduct={noop} wishlist={wishlist} toggleWish={noop} /> },
    { id: 'catalogue', label: 'The Collection',          el: <CataloguePage goto={noop} openProduct={noop} wishlist={wishlist} toggleWish={noop} /> },
    { id: 'product',   label: 'Product · Mehr Ruby',     el: <ProductPage productId="mehr-ruby-ring" goto={noop} openProduct={noop} wishlist={wishlist} toggleWish={noop} addToCart={noop} /> },
    { id: 'custom',    label: 'The Commission',          el: <CustomPage goto={noop} /> },
    { id: 'cart',      label: 'The Bag',                 el: <CartPage goto={noop} cart={cart} updateCart={noop} removeFromCart={noop} /> },
    { id: 'wishlist',  label: 'The Wishlist',            el: <WishlistPage goto={noop} openProduct={noop} wishlist={wishlist} toggleWish={noop} addToCart={noop} /> },
    { id: 'gemstones', label: 'The Stone Library',       el: <GemstonesPage goto={noop} /> },
    { id: 'about',     label: 'The Studio',              el: <AboutPage goto={noop} /> }
  ];

  return (
    <>
      {/* ─── Cover ─── */}
      <section className="print-cover">
        <div className="cover-inner">
          <div className="cover-mark">GAJ<sup>°</sup></div>
          <div className="cover-eyebrow">Gem &amp; Jewellery · Est. 1995 · Bangalore</div>
          <h1 className="cover-title">
            Refined Indian<br/>
            <em>Atelier</em>.
          </h1>
          <div className="cover-deva">रत्न जो कहानी कहें · सोना जो मन को छुए</div>
          <p className="cover-sub">
            A complete website design for GAJ — a family atelier for custom Indian jewellery.
            Eight pages, sketched in this order.
          </p>
          <ol className="cover-toc">
            {pages.map((p, i) => (
              <li key={p.id}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="label">{p.label}</span>
              </li>
            ))}
          </ol>
          <div className="cover-foot">
            <span>Refined Indian Atelier · Design Brief, Spring 2026</span>
            <span>GAJ°</span>
          </div>
        </div>
      </section>

      {/* ─── Each page on its own print sheet ─── */}
      {pages.map((p, i) => (
        <section key={p.id} className="print-page">
          <div className="print-pageheader">
            <span className="ph-num">{String(i + 1).padStart(2, '0')} / 08</span>
            <span className="ph-label">{p.label}</span>
            <span className="ph-mark">GAJ<sup>°</sup></span>
          </div>
          <Header route={p.id} goto={noop} cartCount={cart.length} wishCount={wishlist.length} />
          <main>{p.el}</main>
          <Footer goto={noop} />
        </section>
      ))}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PrintApp />);

// ─── Auto-print after fonts + babel render settle ─────────────
(async () => {
  try {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  } catch (e) {}
  // Wait for images to begin loading (best-effort)
  await new Promise(r => setTimeout(r, 1500));
  window.print();
})();
