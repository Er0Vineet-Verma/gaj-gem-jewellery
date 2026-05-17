/* ─────────────────────────────────────────────────────────────
   GAJ — Shared components: icons, header, footer, product card,
   marquee, hallmark trust strip, breadcrumbs.
   ───────────────────────────────────────────────────────────── */

const { useState, useEffect, useRef } = React;

/* ─── Icon set (line, thin, refined) ───────────────────────── */
const Icon = ({ name, size = 18, ...rest }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round', ...rest };
  switch (name) {
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'user': return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>;
    case 'heart': return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case 'heart-fill': return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case 'bag': return <svg {...common}><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>;
    case 'menu': return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case 'arrow-right': return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-left': return <svg {...common}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case 'arrow-up-right': return <svg {...common}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case 'shield': return <svg {...common}><path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'gem': return <svg {...common}><path d="M6 8h12l-6 12L6 8z"/><path d="m6 8 3-4h6l3 4M9 8l3 12L15 8"/></svg>;
    case 'check': return <svg {...common}><path d="m5 12 4 4 10-10"/></svg>;
    case 'chat': return <svg {...common}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"/></svg>;
    case 'whatsapp': return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}><path d="M17.5 14.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.9-.4-1.7-1-2.5-1.7-.7-.7-1.3-1.6-1.7-2.5-.1-.3 0-.5.1-.7.1-.2.3-.4.5-.6.1-.2.2-.3.3-.6.1-.2 0-.5 0-.7-.1-.2-.7-1.7-1-2.3-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .4-.7.7-1.1 1.5-1.1 2.5 0 1.4.5 2.7 1.3 3.8 1.5 2.2 3.7 4.1 6.2 5 1 .5 2 .8 3 .9.5 0 1-.1 1.5-.2 1-.4 1.8-1 2.2-1.8.2-.4.3-.9.3-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.5.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4 14.9 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5S16.7 20 12 20z"/></svg>;
    case 'pencil': return <svg {...common}><path d="m15 4 5 5L8 21H3v-5L15 4z"/></svg>;
    case 'leaf': return <svg {...common}><path d="M5 19c8 0 14-6 14-14C9 5 5 11 5 19z"/><path d="M5 19c2-4 5-7 9-9"/></svg>;
    case 'sparkle': return <svg {...common}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/></svg>;
    case 'phone': return <svg {...common}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4c0 1-.7 2-2 2A18 18 0 0 1 3 6c0-1.3 1-2 2-2z"/></svg>;
    case 'pin': return <svg {...common}><path d="M12 22s7-7 7-13a7 7 0 0 0-14 0c0 6 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'mail': return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'instagram': return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>;
    case 'close': return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'plus': return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus': return <svg {...common}><path d="M5 12h14"/></svg>;
    case 'sun': return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>;
    case 'moon': return <svg {...common}><path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10z"/></svg>;
    case 'calendar': return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case 'ruler': return <svg {...common}><path d="m3 17 14-14 4 4L7 21 3 17z"/><path d="m7 13 2-2M11 17l2-2M15 9l2-2"/></svg>;
    case 'package': return <svg {...common}><path d="m3 7 9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/></svg>;
    default: return null;
  }
};

/* ─── Page-route navigation ─── */
const NAV_ITEMS = [
  { id: 'home', label: 'Atelier' },
  { id: 'catalogue', label: 'Jewellery' },
  { id: 'custom', label: 'Custom' },
  { id: 'gemstones', label: 'Gemstones' },
  { id: 'about', label: 'Studio' }
];

const Header = ({ route, goto, cartCount, wishCount }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-strip">
        <span>BIS 916 Hallmarked Gold</span><span style={{margin:'0 18px', opacity:.4}}>·</span>
        <span>Free India shipping over ₹25,000</span><span style={{margin:'0 18px', opacity:.4}}>·</span>
        <span>Talk to a designer · WhatsApp +91 98100 02250</span>
      </div>
      <div className="shell header-inner">
        <button className="header-logo" onClick={() => goto('home')} aria-label="GAJ home">
          <span className="mark">GAJ<sup>°</sup></span>
          <span className="tagline hide-mobile">Gem &amp; Jewellery · Est. 1995</span>
        </button>
        <nav className="nav hide-mobile">
          {NAV_ITEMS.map(n => (
            <a key={n.id} className={route === n.id ? 'active' : ''} onClick={() => goto(n.id)}>{n.label}</a>
          ))}
        </nav>
        <div className="nav-icons">
          <button className="icon-btn hide-mobile" aria-label="Search"><Icon name="search" /></button>
          <button className="icon-btn" aria-label="Wishlist" onClick={() => goto('wishlist')}>
            <Icon name="heart" />
            {wishCount > 0 && <span className="badge">{wishCount}</span>}
          </button>
          <button className="icon-btn" aria-label="Cart" onClick={() => goto('cart')}>
            <Icon name="bag" />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>
          <button className="icon-btn hide-mobile" aria-label="Account"><Icon name="user" /></button>
          <button className="icon-btn" style={{display: window.innerWidth < 720 ? 'inline-flex' : 'none'}} onClick={() => setMobileOpen(true)} aria-label="Menu"><Icon name="menu" /></button>
        </div>
      </div>
      {mobileOpen && (
        <div style={{position:'fixed', inset:0, background:'rgba(11,10,12,.96)', zIndex: 100, padding: 32, display:'flex', flexDirection:'column'}}>
          <div className="row between center" style={{marginBottom: 40}}>
            <span className="mark" style={{fontFamily:'var(--font-display)', fontSize: 28, fontStyle:'italic', color:'var(--ivory)'}}>GAJ<sup style={{color:'var(--gold)', fontSize: 11, fontStyle:'normal'}}>°</sup></span>
            <button onClick={() => setMobileOpen(false)} className="icon-btn"><Icon name="close" /></button>
          </div>
          <div className="col" style={{gap: 4}}>
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => { goto(n.id); setMobileOpen(false); }}
                style={{textAlign:'left', padding:'20px 0', borderBottom:'1px solid var(--hairline)', fontFamily:'var(--font-display)', fontSize: 32, color: route === n.id ? 'var(--gold)' : 'var(--ivory)'}}>
                {n.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

/* ─── Footer ─── */
const Footer = ({ goto }) => (
  <footer className="footer">
    <div className="shell">
      <div className="footer-grid">
        <div className="lockup">
          <div className="mark">GAJ<sup style={{color:'var(--gold)', fontSize: 12, fontStyle:'normal', verticalAlign:'super'}}>°</sup></div>
          <p style={{color:'var(--text-mute)', margin:0}}>A family atelier for custom Indian jewellery. Sketched in Jaipur, made by hand, sold in our showroom at MG Road, Bangalore.</p>
          <div className="row gap-3" style={{marginTop: 16}}>
            <a className="icon-btn"><Icon name="instagram" /></a>
            <a className="icon-btn"><Icon name="whatsapp" /></a>
            <a className="icon-btn"><Icon name="mail" /></a>
          </div>
        </div>
        <div>
          <h5>Shop</h5>
          <ul>
            <li><a onClick={() => goto('catalogue')}>All Jewellery</a></li>
            <li><a onClick={() => goto('catalogue')}>Bridal</a></li>
            <li><a onClick={() => goto('catalogue')}>Everyday Gold</a></li>
            <li><a onClick={() => goto('gemstones')}>Gemstones</a></li>
            <li><a onClick={() => goto('catalogue')}>Heirloom</a></li>
          </ul>
        </div>
        <div>
          <h5>Atelier</h5>
          <ul>
            <li><a onClick={() => goto('custom')}>Custom Design</a></li>
            <li><a onClick={() => goto('about')}>The Studio</a></li>
            <li><a>Book Appointment</a></li>
            <li><a>Live Rates</a></li>
            <li><a>Stories</a></li>
          </ul>
        </div>
        <div>
          <h5>Service</h5>
          <ul>
            <li><a>Shipping &amp; Returns</a></li>
            <li><a>Resizing</a></li>
            <li><a>Lifetime Polish</a></li>
            <li><a>Certification</a></li>
            <li><a>Care Guide</a></li>
          </ul>
        </div>
        <div>
          <h5>Stay in touch</h5>
          <p style={{margin:'0 0 12px', color:'var(--text-mute)', fontSize: 14}}>One letter a season — sketches from the bench, new arrivals, and rate updates.</p>
          <div className="input-row">
            <input className="input" placeholder="Email address" />
            <button className="btn btn-gold">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 1995–2026 GAJ · Gem &amp; Jewellery Pvt. Ltd.</span>
        <span>Made in Bangalore · Sketched in Jaipur</span>
      </div>
    </div>
  </footer>
);

/* ─── Hallmark marquee ─── */
const Marquee = () => (
  <div className="marquee">
    <div className="marquee-track">
      {[...Array(2)].map((_, i) => (
        <React.Fragment key={i}>
          <span><Icon name="shield" size={14} /> BIS 916 Hallmarked</span>
          <span className="sep">⟡</span>
          <span><Icon name="gem" size={14} /> GIA &amp; GRS Certified Stones</span>
          <span className="sep">⟡</span>
          <span><Icon name="sparkle" size={14} /> Lifetime Polish &amp; Resize</span>
          <span className="sep">⟡</span>
          <span><Icon name="leaf" size={14} /> Mine-to-Atelier Traceability</span>
          <span className="sep">⟡</span>
          <span><Icon name="pencil" size={14} /> Hand-Sketched · Hand-Set</span>
          <span className="sep">⟡</span>
          <span><Icon name="chat" size={14} /> Designer Consultation</span>
          <span className="sep">⟡</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

/* ─── Product card ─── */
const ProductCard = ({ product, onClick, wished, onWish }) => {
  const { formatINR } = window.GAJ_DATA;
  return (
    <div className="pcard" onClick={onClick}>
      <div className="photo">
        <img className="primary" src={product.images[0]} alt={product.name} loading="lazy" />
        <img className="alt" src={product.images[1]} alt="" loading="lazy" />
        {product.tag && <span className="tag">{product.tag}</span>}
        <button className={`wish ${wished ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onWish && onWish(); }}
          aria-label="Wishlist">
          <Icon name={wished ? 'heart-fill' : 'heart'} size={14} />
        </button>
      </div>
      <div className="name">{product.name}</div>
      <div className="deva">{product.deva}</div>
      <div className="meta">{product.stone} · {product.metal.replace(' Gold','').replace('22K Yellow','22K').replace('18K Yellow','18K')}</div>
      <div className="price"><span className="from">From</span>{formatINR(product.price)}</div>
    </div>
  );
};

/* ─── Breadcrumbs ─── */
const Crumbs = ({ items }) => (
  <div className="breadcrumbs">
    {items.map((it, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span style={{margin: '0 10px', opacity:.5}}>/</span>}
        <span style={{cursor: it.onClick ? 'pointer' : 'default', color: i === items.length - 1 ? 'var(--gold)' : 'inherit'}}
              onClick={it.onClick}>{it.label}</span>
      </React.Fragment>
    ))}
  </div>
);

/* ─── Reveal-on-scroll wrapper ─── */
const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${seen ? 'in' : ''}`} style={{transitionDelay: `${delay}ms`}}>{children}</div>;
};

Object.assign(window, { Icon, Header, Footer, Marquee, ProductCard, Crumbs, Reveal });
