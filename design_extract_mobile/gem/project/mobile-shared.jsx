/* ─────────────────────────────────────────────────────────────
   GAJ — Mobile shared components: header, footer, marquee, icons
   ───────────────────────────────────────────────────────────── */

const MIcon = ({ name, size = 18, color, ...rest }) => {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color || 'currentColor', strokeWidth: 1.35, strokeLinecap: 'round', strokeLinejoin: 'round', ...rest };
  switch (name) {
    case 'search':  return <svg {...c}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'menu':    return <svg {...c}><path d="M3 7h18M3 13h18M3 19h18"/></svg>;
    case 'menu-fine': return <svg {...c}><path d="M4 8h16M4 16h10"/></svg>;
    case 'heart':   return <svg {...c}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case 'heart-fill': return <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} {...rest}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case 'bag':     return <svg {...c}><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>;
    case 'close':   return <svg {...c}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'arr-r':   return <svg {...c}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arr-l':   return <svg {...c}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case 'arr-d':   return <svg {...c}><path d="M6 9l6 6 6-6"/></svg>;
    case 'arr-u':   return <svg {...c}><path d="M6 15l6-6 6 6"/></svg>;
    case 'arr-dr':  return <svg {...c}><path d="M7 17 17 7M9 7h8v8"/></svg>;
    case 'check':   return <svg {...c}><path d="m5 12 4 4 10-10"/></svg>;
    case 'plus':    return <svg {...c}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus':   return <svg {...c}><path d="M5 12h14"/></svg>;
    case 'shield':  return <svg {...c}><path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/></svg>;
    case 'gem':     return <svg {...c}><path d="M6 8h12l-6 12L6 8z"/><path d="m6 8 3-4h6l3 4M9 8l3 12L15 8"/></svg>;
    case 'sparkle': return <svg {...c}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/></svg>;
    case 'leaf':    return <svg {...c}><path d="M5 19c8 0 14-6 14-14C9 5 5 11 5 19z"/><path d="M5 19c2-4 5-7 9-9"/></svg>;
    case 'pencil':  return <svg {...c}><path d="m15 4 5 5L8 21H3v-5L15 4z"/></svg>;
    case 'whatsapp': return <svg width={size} height={size} viewBox="0 0 24 24" fill={color || 'currentColor'} {...rest}><path d="M17.5 14.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.7.1-.9-.4-1.7-1-2.5-1.7-.7-.7-1.3-1.6-1.7-2.5-.1-.3 0-.5.1-.7.1-.2.3-.4.5-.6.1-.2.2-.3.3-.6.1-.2 0-.5 0-.7-.1-.2-.7-1.7-1-2.3-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .4-.7.7-1.1 1.5-1.1 2.5 0 1.4.5 2.7 1.3 3.8 1.5 2.2 3.7 4.1 6.2 5 1 .5 2 .8 3 .9.5 0 1-.1 1.5-.2 1-.4 1.8-1 2.2-1.8.2-.4.3-.9.3-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.5.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4 14.9 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5S16.7 20 12 20z"/></svg>;
    case 'phone':   return <svg {...c}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4c0 1-.7 2-2 2A18 18 0 0 1 3 6c0-1.3 1-2 2-2z"/></svg>;
    case 'pin':     return <svg {...c}><path d="M12 22s7-7 7-13a7 7 0 0 0-14 0c0 6 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'mail':    return <svg {...c}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'instagram': return <svg {...c}><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill={color || 'currentColor'}/></svg>;
    case 'filter':  return <svg {...c}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case 'sort':    return <svg {...c}><path d="M7 5v14M7 19l-3-3M7 19l3-3M17 19V5M17 5l-3 3M17 5l3 3"/></svg>;
    case 'grid':    return <svg {...c}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
    case 'list':    return <svg {...c}><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'ruler':   return <svg {...c}><path d="m3 17 14-14 4 4L7 21 3 17z"/><path d="m7 13 2-2M11 17l2-2M15 9l2-2"/></svg>;
    case 'package': return <svg {...c}><path d="m3 7 9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/></svg>;
    case 'calendar': return <svg {...c}><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case 'expand':  return <svg {...c}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>;
    case 'star':    return <svg {...c}><path d="M12 3l2.5 6 6.5.5-5 4.5L17.5 21 12 17.5 6.5 21l1.5-7L3 9.5 9.5 9 12 3z"/></svg>;
    default: return null;
  }
};

/* ─── Mobile Header (compact, sticky-style) ─── */
const MHeader = ({ wishCount = 0, cartCount = 0, onMenu, onSearch, onWish, onBag, transparent = false }) => (
  <div className="m-header" style={transparent ? { background: 'rgba(11,10,12,.18)', borderBottom: '1px solid rgba(247,242,234,.10)' } : null}>
    <button className="m-icon-btn" aria-label="Menu" onClick={onMenu}>
      <MIcon name="menu-fine" size={22} />
    </button>
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', lineHeight: 1}}>
      <span className="mark">GAJ<sup>°</sup></span>
      <span style={{fontFamily:'var(--font-mono)', fontSize: 8, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--muted)', marginTop: 2}}>Est. 1995</span>
    </div>
    <div className="h-icons">
      <button className="m-icon-btn" aria-label="Search" onClick={onSearch}><MIcon name="search" size={20}/></button>
      <button className="m-icon-btn" aria-label="Bag" onClick={onBag}>
        <MIcon name="bag" size={20}/>
        {cartCount > 0 && <span className="badge">{cartCount}</span>}
      </button>
    </div>
  </div>
);

/* ─── Trust ticker (one-line, slim) ─── */
const MTicker = ({ msgs = ['BIS 916 Hallmarked', 'Free India shipping over ₹25,000', 'WhatsApp a designer · 7 days'], idx = 0 }) => (
  <div className="m-tick" style={{justifyContent:'center'}}>
    <MIcon name="shield" size={12}/> <span>{msgs[idx % msgs.length]}</span>
    <span className="dot"/>
    <span style={{opacity:.6}}>{idx+1}/{msgs.length}</span>
  </div>
);

/* ─── Section frame ─── */
const MSection = ({ tone = 'maroon', eyebrow, deva, title, sub, children, tight = false, ...props }) => (
  <section className={`m-sec ${tone} ${tight ? 'tight' : ''}`} {...props}>
    {eyebrow && <div className="m-eyebrow"><span className="line"/>{eyebrow}</div>}
    {title && <h2 className="m-h2" style={{marginTop: eyebrow ? 14 : 0}} dangerouslySetInnerHTML={{__html: title}} />}
    {deva && <div className="m-deva" style={{marginTop: 8}}>{deva}</div>}
    {sub && <p className="m-body" style={{marginTop: 14, marginBottom: 0, maxWidth: '36ch'}}>{sub}</p>}
    {(title || sub || eyebrow) && <div style={{height: 28}}/>}
    {children}
  </section>
);

/* ─── Product card (mobile, 2-col) ─── */
const MPCard = ({ p, wished, big = false }) => {
  const { formatINR } = window.GAJ_DATA;
  return (
    <div className="m-pcard">
      <div className="ph">
        <img src={p.images[0]} alt={p.name} loading="lazy"/>
        {p.tag && <span className="tag">{p.tag}</span>}
        <button className={`wish ${wished ? 'on' : ''}`} aria-label="Wishlist"><MIcon name={wished ? 'heart-fill' : 'heart'} size={14}/></button>
      </div>
      <div className="nm">{p.name}</div>
      <div className="dv">{p.deva}</div>
      <div className="mt">{p.stone} · {p.metal.replace('Yellow ','').replace('White ','W ').replace('Rose ','R ')}</div>
      <div className="pr"><span className="from">From</span>{formatINR(p.price)}</div>
    </div>
  );
};

/* ─── Footer (mobile, accordion) ─── */
const MFooter = ({ open = ['shop'] }) => {
  const groups = [
    { id: 'shop', h: 'Shop', items: ['All Jewellery', 'Bridal', 'Everyday Gold', 'Gemstones', 'Heirloom'] },
    { id: 'atelier', h: 'Atelier', items: ['Custom Design', 'The Studio', 'Book Appointment', 'Live Gold Rate', 'Stories from the Bench'] },
    { id: 'service', h: 'Service', items: ['Shipping & Returns', 'Resizing', 'Lifetime Polish', 'Certification', 'Care Guide'] },
    { id: 'contact', h: 'Contact', items: ['+91 98100 02250', 'WhatsApp a designer', 'studio@gaj.in', 'MG Road · Bangalore'] }
  ];
  return (
    <footer className="m-footer">
      <div className="lockup">
        <div className="mark">GAJ<sup>°</sup></div>
        <p>A family atelier for custom Indian jewellery. Sketched in Jaipur, made by hand, sold in our showroom at MG Road, Bangalore.</p>
        <div className="socials">
          <a aria-label="Instagram"><MIcon name="instagram" size={18}/></a>
          <a aria-label="WhatsApp"><MIcon name="whatsapp" size={18}/></a>
          <a aria-label="Mail"><MIcon name="mail" size={18}/></a>
          <a aria-label="Phone"><MIcon name="phone" size={18}/></a>
        </div>
      </div>
      <div className="m-foot-acc">
        {groups.map(g => {
          const isOpen = open.includes(g.id);
          return (
            <div key={g.id}>
              <div className="row">
                <h5>{g.h}</h5>
                <span className="ico"><MIcon name={isOpen ? 'minus' : 'plus'} size={16}/></span>
              </div>
              {isOpen && (
                <ul>
                  {g.items.map(x => <li key={x}><a>{x}</a></li>)}
                </ul>
              )}
            </div>
          );
        })}
        <div className="news">
          <h5 style={{color:'var(--gold)', fontFamily:'var(--font-mono)', fontSize: 10.5, letterSpacing:'.22em', textTransform:'uppercase', margin: 0}}>Letters from the bench</h5>
          <p style={{margin:0, color:'rgba(251,248,243,.62)', fontSize:14}}>One letter a season — sketches, rates, new arrivals.</p>
          <input placeholder="Email address" />
          <button className="m-btn m-btn-gold m-btn-full">Subscribe</button>
        </div>
      </div>
      <div className="bot">
        <span>© 1995–2026 GAJ · Gem &amp; Jewellery Pvt. Ltd.</span>
        <span>Made in Bangalore · Sketched in Jaipur</span>
        <span>Privacy · Terms · BIS Hallmark Notice</span>
      </div>
      <div className="safe-pad"/>
    </footer>
  );
};

Object.assign(window, { MIcon, MHeader, MTicker, MSection, MPCard, MFooter });
