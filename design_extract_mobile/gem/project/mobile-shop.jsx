/* ─────────────────────────────────────────────────────────────
   GAJ — Mobile screens: Menu, Catalogue, Filter, PDP, Lightbox
   ───────────────────────────────────────────────────────────── */

/* ─── Full-sheet menu ─── */
const MenuMobile = () => {
  const links = [
    { en: 'Atelier', dv: 'गृह' },
    { en: 'Jewellery', dv: 'आभूषण' },
    { en: 'Custom', dv: 'विशेष' },
    { en: 'Gemstones', dv: 'रत्न' },
    { en: 'Studio', dv: 'स्टूडियो' },
    { en: 'Journal', dv: 'जर्नल' }
  ];
  return (
    <div className="m-root" style={{height: '100%'}}>
      <div className="m-menu-sheet">
        <div className="top">
          <div style={{display:'flex', flexDirection:'column', lineHeight:1.1}}>
            <span className="mark">GAJ<sup>°</sup></span>
            <span style={{fontFamily:'var(--font-mono)', fontSize: 8.5, letterSpacing:'.3em', textTransform:'uppercase', color:'var(--muted)', marginTop: 3}}>Gem &amp; Jewellery</span>
          </div>
          <button className="m-icon-btn" aria-label="Close"><MIcon name="close" size={22}/></button>
        </div>
        <div className="links">
          {links.map((l, i) => (
            <a key={l.en}>
              <span className="l" style={{color: i===1 ? 'var(--gold)' : 'var(--ivory)'}}>{l.en}</span>
              <span className="r">{l.dv}</span>
            </a>
          ))}
        </div>
        <div className="util">
          <a><MIcon name="heart" size={16} className="ic"/>Wishlist <span style={{marginLeft:'auto', color:'var(--gold)'}}>2</span></a>
          <a><MIcon name="bag" size={16} className="ic"/>Bag <span style={{marginLeft:'auto', color:'var(--muted)'}}>—</span></a>
          <a><MIcon name="calendar" size={16} className="ic"/>Book a consultation</a>
          <a><MIcon name="whatsapp" size={16} className="ic"/>WhatsApp +91 98100 02250</a>
        </div>
        <div className="foot">
          <div>MG Road, Bangalore · Mon–Sat 11–8</div>
          <div style={{marginTop: 6}}>Atelier · Johari Bazaar, Jaipur</div>
        </div>
      </div>
    </div>
  );
};

/* ─── Catalogue grid + sticky filter bar ─── */
const CatalogueMobile = () => {
  const { PRODUCTS } = window.GAJ_DATA;
  return (
    <div className="m-root" style={{height: 'auto'}}>
      <MTicker idx={1}/>
      <MHeader cartCount={1} wishCount={2}/>

      <div className="m-cat-head">
        <div className="m-eyebrow"><span className="line"/>All jewellery</div>
        <div className="title" style={{marginTop: 12}}>Jewellery, <em>by occasion</em></div>
        <div className="deva">सब आभूषण</div>
        <div className="ct">112 pieces · Updated this morning</div>
      </div>

      {/* Sticky category chip row */}
      <div style={{position:'relative', borderTop:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)', padding: '12px 20px'}}>
        <div className="m-chiprow">
          {['All (112)', 'Rings (38)', 'Necklaces (24)', 'Earrings (28)', 'Bridal Suites (6)', 'Mangalsutra (12)'].map((c, i) => (
            <button key={c} className={`m-chip ${i===0 ? 'on' : ''}`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Filter / sort bar */}
      <div className="m-cat-bar" style={{top: 0}}>
        <button><MIcon name="filter" size={14}/> Filter <span className="count">· 2</span></button>
        <button><MIcon name="sort" size={14}/> Sort · Featured</button>
        <button><MIcon name="grid" size={14}/></button>
      </div>

      {/* Active filter chips */}
      <div className="m-active-row">
        <button className="m-active-chip">Bridal <MIcon name="close" size={10}/></button>
        <button className="m-active-chip">22K Yellow Gold <MIcon name="close" size={10}/></button>
        <button className="m-active-chip" style={{background:'transparent', color:'var(--muted)', borderColor:'var(--hairline-2)'}}>Reset all</button>
      </div>

      {/* Product grid */}
      <section style={{padding:'12px 20px 80px'}}>
        <div className="m-pgrid">
          {PRODUCTS.slice(0, 6).map((p, i) => <MPCard key={p.id} p={p} wished={[1,3].includes(i)}/>)}
        </div>
        <button className="m-btn m-btn-outline m-btn-full" style={{marginTop: 32, color:'var(--text-strong)', borderColor:'var(--hairline-2)'}}>Load 24 more</button>
        <div style={{textAlign:'center', marginTop: 18, fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)'}}>Showing 6 of 18</div>
      </section>

      <MFooter open={[]}/>
    </div>
  );
};

/* ─── Filter drawer overlay ─── */
const FilterDrawerMobile = () => {
  return (
    <div className="m-root" style={{height: '100%'}}>
      <div className="m-drawer">
        <div className="head">
          <button className="m-icon-btn"><MIcon name="close" size={22}/></button>
          <div className="t">Filter</div>
          <button style={{fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--gold)'}}>Reset</button>
        </div>
        <div className="body">

          <div className="group">
            <h6>Occasion</h6>
            {[
              {n:'Bridal', c: 24, on: true},
              {n:'Everyday', c: 36, on: false},
              {n:'Heirloom', c: 18, on: false},
              {n:'Festive', c: 22, on: false},
              {n:'Astrological', c: 12, on: false}
            ].map(o => (
              <div key={o.n} className={`opt ${o.on ? 'on' : ''}`}>
                <div className="lbl">
                  <span className="box">{o.on && <MIcon name="check" size={14}/>}</span>
                  <span className="nm">{o.n}</span>
                </div>
                <span className="ct">{o.c}</span>
              </div>
            ))}
          </div>

          <div className="group">
            <h6>Metal</h6>
            {[
              {n:'22K Yellow Gold · BIS 916', c: 64, on: true},
              {n:'18K Yellow Gold', c: 28, on: false},
              {n:'18K White Gold', c: 12, on: false},
              {n:'18K Rose Gold', c: 8, on: false},
              {n:'Platinum 950', c: 4, on: false}
            ].map(o => (
              <div key={o.n} className={`opt ${o.on ? 'on' : ''}`}>
                <div className="lbl">
                  <span className="box">{o.on && <MIcon name="check" size={14}/>}</span>
                  <span className="nm">{o.n}</span>
                </div>
                <span className="ct">{o.c}</span>
              </div>
            ))}
          </div>

          <div className="group">
            <h6>Stone</h6>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 10}}>
              {[
                {n:'Ruby',     c:'#9A1F2A'},
                {n:'Emerald',  c:'#1B6E4F'},
                {n:'Sapphire', c:'#1D3A6E'},
                {n:'Diamond',  c:'#E8E5DC'},
                {n:'Pearl',    c:'#EFE7D7'},
                {n:'Polki',    c:'#D4C8A4'},
                {n:'Coral',    c:'#B73B2B'},
                {n:'Topaz',    c:'#C99E3C'}
              ].map(s => (
                <div key={s.n} style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 8, padding:'10px 4px', border:'1px solid var(--hairline-2)'}}>
                  <span style={{width: 28, height: 28, borderRadius: '50%', background: s.c, boxShadow:'inset 0 -4px 8px rgba(0,0,0,.4), inset 0 4px 8px rgba(255,255,255,.18)'}}/>
                  <span style={{fontFamily:'var(--font-mono)', fontSize: 9, letterSpacing:'.16em', textTransform:'uppercase'}}>{s.n}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="group">
            <h6>Price · ₹</h6>
            <div style={{padding:'4px 0 8px'}}>
              <div style={{display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.16em', textTransform:'uppercase', color:'var(--muted)'}}>
                <span>40,000</span><span>15,00,000</span>
              </div>
              <div style={{position:'relative', height: 4, background:'var(--hairline-2)', marginTop: 18}}>
                <div style={{position:'absolute', left:'12%', right:'48%', top: 0, bottom: 0, background:'var(--gold)'}}/>
                <div style={{position:'absolute', left:'12%', top:'50%', width:14, height:14, borderRadius:'50%', background:'var(--gold)', transform:'translate(-50%, -50%)'}}/>
                <div style={{position:'absolute', left:'52%', top:'50%', width:14, height:14, borderRadius:'50%', background:'var(--gold)', transform:'translate(-50%, -50%)'}}/>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', marginTop: 14, fontFamily:'var(--font-display)', fontSize: 15}}>
                <span>₹ 95,000</span><span>₹ 5,80,000</span>
              </div>
            </div>
          </div>

          <div className="group">
            <h6>Wear style</h6>
            {[
              {n:'Statement', c: 28, on: false},
              {n:'Subtle', c: 48, on: false},
              {n:'Stackable', c: 22, on: false}
            ].map(o => (
              <div key={o.n} className={`opt`}>
                <div className="lbl">
                  <span className="box"/>
                  <span className="nm">{o.n}</span>
                </div>
                <span className="ct">{o.c}</span>
              </div>
            ))}
          </div>

        </div>
        <div className="foot">
          <button className="m-btn m-btn-outline" style={{flex: 1, color:'var(--ivory)', borderColor:'var(--hairline-2)'}}>Clear</button>
          <button className="m-btn m-btn-gold" style={{flex: 2}}>Show 42 pieces</button>
        </div>
      </div>
    </div>
  );
};

/* ─── Product detail page (with sticky buy bar) ─── */
const PDPMobile = ({ light = false }) => {
  const { PRODUCTS, formatINR } = window.GAJ_DATA;
  const p = PRODUCTS[0]; // Mehr Ruby Solitaire
  return (
    <div className={`m-root ${light ? 'm-light' : ''}`} style={{height: 'auto'}}>
      <MTicker idx={2}/>
      <MHeader cartCount={1} wishCount={2}/>

      {/* Gallery */}
      <div className="m-pdp-gal">
        <img src={p.images[0]} alt={p.name}/>
        <button className="wish"><MIcon name="heart" size={16}/></button>
        <div className="count">01 / 04</div>
        <button style={{position:'absolute', bottom: 16, right: 16, width: 40, height: 40, borderRadius:'50%', background:'rgba(11,10,12,.55)', color:'var(--ivory)', display:'inline-flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)'}}>
          <MIcon name="expand" size={16}/>
        </button>
      </div>
      <div className="m-pdp-dots"><span className="on"/><span/><span/><span/></div>

      {/* Body */}
      <section className="m-pdp-body">
        <div className="crumb">Rings / Bridal / Ruby</div>
        <h1 className="nm">{p.name}</h1>
        <div className="dv">{p.deva}</div>
        <div className="pr"><span className="from">From</span>{formatINR(p.price)}</div>
        <div className="vat">Incl. all taxes · Free India shipping</div>
        <div className="quick">
          <span><MIcon name="shield" size={12}/> BIS 916</span>
          <span><MIcon name="gem" size={12}/> GIA Origin</span>
          <span><MIcon name="package" size={12}/> Ships in 12 weeks</span>
        </div>

        {/* Metal selector */}
        <div className="m-pdp-spec">
          <h6>Metal</h6>
          <div className="row">
            <div className="swatch on">
              <span className="dot" style={{background:'linear-gradient(135deg, #F4D187, #C09147)'}}/>
              <div><div className="l">22K Yellow</div><div style={{fontFamily:'var(--font-mono)', fontSize:9, color:'var(--muted)', marginTop: 2}}>8.6g · BIS 916</div></div>
            </div>
            <div className="swatch">
              <span className="dot" style={{background:'linear-gradient(135deg, #F1F1F1, #ABABB1)'}}/>
              <div><div className="l">18K White</div><div style={{fontFamily:'var(--font-mono)', fontSize:9, color:'var(--muted)', marginTop: 2}}>+₹ 12,000</div></div>
            </div>
            <div className="swatch">
              <span className="dot" style={{background:'linear-gradient(135deg, #F4C6B1, #B97560)'}}/>
              <div><div className="l">18K Rose</div><div style={{fontFamily:'var(--font-mono)', fontSize:9, color:'var(--muted)', marginTop: 2}}>+₹ 8,000</div></div>
            </div>
            <div className="swatch">
              <span className="dot" style={{background:'linear-gradient(135deg, #E0E0E5, #9CA1AB)'}}/>
              <div><div className="l">Platinum</div><div style={{fontFamily:'var(--font-mono)', fontSize:9, color:'var(--muted)', marginTop: 2}}>+₹ 28,000</div></div>
            </div>
          </div>
        </div>

        {/* Size selector */}
        <div className="m-pdp-spec">
          <h6>Ring size</h6>
          <div className="sizes">
            {['IN 9','IN 10','IN 11','IN 12','IN 13','IN 14','IN 15','IN 16'].map((s, i) => (
              <button key={s} className={`size-btn ${i===2 ? 'on' : ''}`}>{s}</button>
            ))}
          </div>
          <a className="size-help"><MIcon name="ruler" size={12}/>Ring sizer at home — free</a>
        </div>

        {/* Engraving */}
        <div className="m-pdp-spec">
          <h6>Inner engraving — complimentary</h6>
          <input
            placeholder="up to 20 characters · हिंदी या English"
            style={{
              width:'100%', background:'transparent', border:'1px solid var(--hairline-2)',
              padding:'14px 14px', fontFamily:'var(--font-body)', fontSize: 15, color:'inherit', outline:'none'
            }}/>
        </div>

        {/* Accordions */}
        <div className="m-acc" style={{marginTop: 8}}>
          <div className="row"><h6>About this piece</h6><span className="ico"><MIcon name="minus" size={16}/></span></div>
          <div className="body">{p.story}</div>
        </div>
        <div className="m-acc">
          <div className="row"><h6>Specifications</h6><span className="ico"><MIcon name="minus" size={16}/></span></div>
          <div className="body">
            <div className="spec-grid">
              {Object.entries(p.spec).map(([k,v]) => (
                <div key={k}>
                  <div className="k">{k}</div>
                  <div className="v">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="m-acc">
          <div className="row"><h6>Care &amp; lifetime polish</h6><span className="ico"><MIcon name="plus" size={16}/></span></div>
        </div>
        <div className="m-acc">
          <div className="row"><h6>Shipping &amp; returns</h6><span className="ico"><MIcon name="plus" size={16}/></span></div>
        </div>
        <div className="m-acc">
          <div className="row"><h6>Certification</h6><span className="ico"><MIcon name="plus" size={16}/></span></div>
        </div>

        {/* Bench-side note */}
        <div style={{marginTop: 28, padding: 20, background: light ? 'var(--paper)' : 'var(--ink-2)', display:'flex', gap: 14, alignItems:'flex-start'}}>
          <div style={{width: 44, height: 44, borderRadius:'50%', background:'var(--gold)', color:'var(--ink)', display:'inline-flex', alignItems:'center', justifyContent:'center', flex:'none', fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 18}}>R</div>
          <div>
            <div style={{fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom: 6}}>From the bench</div>
            <div style={{fontFamily:'var(--font-display)', fontSize: 16, lineHeight: 1.4, fontStyle:'italic'}}>"This stone has a touch of orange when it catches a candle. Try it on under warm light at home — we'll wait."</div>
            <div style={{fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)', marginTop: 10}}>— Rohit, head setter · 24 yrs</div>
          </div>
        </div>

        {/* You might also like */}
        <div style={{marginTop: 40}}>
          <div className="m-eyebrow"><span className="line"/>You might also like</div>
          <div className="m-pgrid" style={{marginTop: 18}}>
            <MPCard p={PRODUCTS[3]}/>
            <MPCard p={PRODUCTS[7]}/>
          </div>
        </div>
      </section>

      {/* Sticky buy bar */}
      <div className="m-buybar">
        <div className="pr">
          <span className="lab">22K · Size 11</span>
          <span className="v">{formatINR(p.price)}</span>
        </div>
        <button className="wa-btn" aria-label="WhatsApp"><MIcon name="whatsapp" size={20}/></button>
        <button className="m-btn m-btn-gold add">Add to Bag</button>
      </div>
    </div>
  );
};

/* ─── Image lightbox ─── */
const LightboxMobile = () => {
  const { PRODUCTS } = window.GAJ_DATA;
  const p = PRODUCTS[0];
  return (
    <div className="m-root" style={{height: '100%'}}>
      <div className="m-light-box">
        <div className="top">
          <button className="m-icon-btn"><MIcon name="close" size={22} color="#fff"/></button>
          <div className="ct">{p.name} · 02 of 04</div>
          <button className="m-icon-btn"><MIcon name="heart" size={20} color="#fff"/></button>
        </div>
        <div className="stage">
          <img src={p.images[1]} alt=""/>
          <button style={{position:'absolute', left: 14, top:'50%', transform:'translateY(-50%)', width: 40, height: 40, borderRadius:'50%', background:'rgba(255,255,255,.10)', color:'#fff', backdropFilter:'blur(8px)', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
            <MIcon name="arr-l" size={18} color="#fff"/>
          </button>
          <button style={{position:'absolute', right: 14, top:'50%', transform:'translateY(-50%)', width: 40, height: 40, borderRadius:'50%', background:'rgba(255,255,255,.10)', color:'#fff', backdropFilter:'blur(8px)', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
            <MIcon name="arr-r" size={18} color="#fff"/>
          </button>
          {/* zoom hint */}
          <div style={{position:'absolute', bottom: 16, left:'50%', transform:'translateX(-50%)', fontFamily:'var(--font-mono)', fontSize: 9.5, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.55)'}}>
            Pinch to zoom
          </div>
        </div>
        <div className="thumbs">
          {p.images.map((src, i) => (
            <div key={i} className={`t ${i===1 ? 'on' : ''}`}><img src={src} alt=""/></div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { MenuMobile, CatalogueMobile, FilterDrawerMobile, PDPMobile, LightboxMobile });
