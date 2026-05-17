/* ─────────────────────────────────────────────────────────────
   GAJ — App shell, routing, state, Tweaks
   ───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accentGold": "#C6A86B",
  "headline": "Stones with stories.\nGold with *feeling*."
}/*EDITMODE-END*/;

const HEADLINE_PRESETS = [
  { id: 'stories', label: 'Stones with stories', value: 'Stones with stories.\nGold with *feeling*.' },
  { id: 'made', label: 'Made by hand', value: 'Made by hand.\nChosen for a *lifetime*.' },
  { id: 'natural', label: 'Natural stones', value: 'Natural stones.\nHand-finished *gold*.' }
];

const ACCENT_OPTIONS = [
  '#C6A86B', // antique gold
  '#DDC591', // soft gold
  '#A88445', // deep gold
  '#B87554'  // copper
];

function App() {
  const [route, setRoute] = useState('home');
  const [productId, setProductId] = useState('mehr-ruby-ring');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [tweak, setTweakState] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme + accent to <body> / :root
  useEffect(() => {
    document.body.classList.toggle('light-mode', tweak.theme === 'light');
    document.documentElement.style.setProperty('--gold', tweak.accentGold);
  }, [tweak.theme, tweak.accentGold]);

  // Scroll top on route change
  useEffect(() => { window.scrollTo({top: 0, behavior:'instant'}); }, [route]);

  const goto = (r) => setRoute(r);
  const openProduct = (id) => { setProductId(id); setRoute('product'); };

  const addToCart = (id, opts = {}) => {
    setCart(c => {
      const existing = c.findIndex(x => x.id === id);
      if (existing >= 0) {
        const next = [...c]; next[existing] = { ...next[existing], qty: next[existing].qty + 1 }; return next;
      }
      return [...c, { id, qty: 1, ...opts }];
    });
  };
  const updateCart = (idx, qty) => setCart(c => c.map((x, i) => i === idx ? { ...x, qty } : x));
  const removeFromCart = (idx) => setCart(c => c.filter((_, i) => i !== idx));

  const toggleWish = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  };

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const wishCount = wishlist.length;

  let page;
  switch (route) {
    case 'catalogue': page = <CataloguePage goto={goto} openProduct={openProduct} wishlist={wishlist} toggleWish={toggleWish} />; break;
    case 'product':   page = <ProductPage productId={productId} goto={goto} openProduct={openProduct} wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} />; break;
    case 'custom':    page = <CustomPage goto={goto} />; break;
    case 'cart':      page = <CartPage goto={goto} cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />; break;
    case 'wishlist':  page = <WishlistPage goto={goto} openProduct={openProduct} wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} />; break;
    case 'gemstones': page = <GemstonesPage goto={goto} />; break;
    case 'about':     page = <AboutPage goto={goto} />; break;
    default:          page = <HomePage goto={goto} openProduct={openProduct} wishlist={wishlist} toggleWish={toggleWish} tweak={tweak} />;
  }

  return (
    <>
      <Header route={route} goto={goto} cartCount={cartCount} wishCount={wishCount} />
      <main key={route}>{page}</main>
      <Footer goto={goto} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="Mode"
            value={tweak.theme}
            onChange={v => setTweakState('theme', v)}
            options={[
              { value: 'dark',  label: 'Dark' },
              { value: 'light', label: 'Light' }
            ]}
          />
        </TweakSection>

        <TweakSection label="Accent">
          <TweakColor
            label="Gold tone"
            value={tweak.accentGold}
            onChange={v => setTweakState('accentGold', v)}
            options={ACCENT_OPTIONS}
          />
        </TweakSection>

        <TweakSection label="Hero copy">
          <TweakSelect
            label="Headline"
            value={tweak.headline}
            onChange={v => setTweakState('headline', v)}
            options={HEADLINE_PRESETS.map(p => ({ value: p.value, label: p.label }))}
          />
        </TweakSection>

        <TweakSection label="Jump to page">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 6}}>
            {['home','catalogue','product','custom','cart','wishlist','gemstones','about'].map(r => (
              <button key={r} onClick={() => goto(r)}
                style={{
                  padding: '8px 10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '.16em',
                  textTransform: 'uppercase',
                  border: `1px solid ${route === r ? 'var(--gold)' : 'rgba(247,242,234,.16)'}`,
                  background: route === r ? 'rgba(198,168,107,.12)' : 'transparent',
                  color: route === r ? 'var(--gold)' : 'inherit',
                  cursor: 'pointer'
                }}>
                {r}
              </button>
            ))}
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
