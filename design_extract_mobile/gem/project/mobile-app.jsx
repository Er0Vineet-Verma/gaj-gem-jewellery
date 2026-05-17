/* ─────────────────────────────────────────────────────────────
   GAJ — Mobile design showcase: device frames, design canvas
   ───────────────────────────────────────────────────────────── */

const { useState, useEffect } = React;

// A simplified phone frame that matches the page height (for tall screens
// like the home page, where we want to show the whole scroll).
const PhoneFrame = ({ children, width = 390, height = 'auto', dark = true, label, scrollable = false, time = '9:41' }) => {
  return (
    <div style={{
      width, minHeight: height === 'auto' ? undefined : height,
      height: height === 'auto' ? 'auto' : height,
      borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12), inset 0 0 0 6px rgba(255,255,255,0.04)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 200,
        boxShadow: '0 0 0 1px rgba(0,0,0,0.4)'
      }}/>
      {/* status bar overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
        height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 32px 0', boxSizing: 'border-box',
        pointerEvents: 'none', color: '#fff', mixBlendMode: 'difference'
      }}>
        <span style={{fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590, fontSize: 16, color: '#fff'}}>{time}</span>
        <div style={{display: 'flex', gap: 6, alignItems: 'center'}}>
          <svg width="17" height="11" viewBox="0 0 19 12">
            <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill="#fff"/>
            <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill="#fff"/>
            <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill="#fff"/>
            <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill="#fff"/>
          </svg>
          <svg width="15" height="11" viewBox="0 0 17 12">
            <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill="#fff"/>
            <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill="#fff"/>
            <circle cx="8.5" cy="10.5" r="1.5" fill="#fff"/>
          </svg>
          <svg width="24" height="11" viewBox="0 0 27 13">
            <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#fff" strokeOpacity="0.45" fill="none"/>
            <rect x="2" y="2" width="20" height="9" rx="2" fill="#fff"/>
          </svg>
        </div>
      </div>
      {/* content */}
      <div style={{
        height: '100%', width: '100%',
        overflow: scrollable ? 'auto' : 'visible',
        position: 'relative', paddingTop: 0
      }}>
        {/* spacer for status bar */}
        <div style={{height: 54, background: 'transparent', position: 'relative', zIndex: 1}}/>
        <div style={{marginTop: -54, position: 'relative', zIndex: 0}}>
          {children}
        </div>
      </div>
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 150,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{
          width: 139, height: 5, borderRadius: 100,
          background: 'rgba(255,255,255,0.7)',
          mixBlendMode: 'difference'
        }}/>
      </div>
    </div>
  );
};

// Top-bar header for the showcase page
const ShowcaseHeader = () => (
  <div style={{
    padding: '40px 48px 32px',
    color: 'var(--ivory)',
    borderBottom: '1px solid rgba(247,242,234,.08)',
    background: 'rgba(11,10,12,.4)',
    backdropFilter: 'blur(8px)',
    position: 'sticky', top: 0, zIndex: 5
  }}>
    <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', flexWrap:'wrap', gap: 18}}>
      <div>
        <div style={{fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.28em', textTransform:'uppercase', color:'var(--gold)'}}>
          GAJ° · Mobile design
        </div>
        <h1 style={{fontFamily:'var(--font-display)', fontSize: 44, lineHeight: 1.04, fontWeight: 300, margin:'10px 0 0', maxWidth: 800}}>
          A private Indian atelier, in the <em style={{fontStyle:'italic', color:'var(--gold)'}}>pocket</em>.
        </h1>
        <p style={{maxWidth: 620, marginTop: 14, color:'rgba(247,242,234,.7)', fontSize: 15.5, lineHeight: 1.55}}>
          Mobile-first, designed at 390×844 — scroll-driven, thumb-friendly, with cinematic photography and quiet tonal shifts between sections. Other widths (360, 430) follow the same rhythm with adjusted margins, never a compressed desktop layout.
        </p>
      </div>
      <div style={{display:'flex', gap: 24, fontFamily:'var(--font-mono)', fontSize: 10.5, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)'}}>
        <div><div style={{color:'var(--gold)'}}>Canvas</div><div style={{marginTop: 4}}>390 × 844</div></div>
        <div><div style={{color:'var(--gold)'}}>Theme</div><div style={{marginTop: 4}}>Dark + Light</div></div>
        <div><div style={{color:'var(--gold)'}}>Screens</div><div style={{marginTop: 4}}>11 surfaces</div></div>
      </div>
    </div>
  </div>
);

// A small caption beneath each artboard label, rendered inside artboard via a wrapper
const ScreenCap = ({ children }) => (
  <div style={{
    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.18em',
    textTransform: 'uppercase', color: 'rgba(247,242,234,.5)',
    padding: '12px 4px 0', maxWidth: 360
  }}>{children}</div>
);

// helper that wraps a screen inside our PhoneFrame
const Phone = ({ children, h = 844, dark = true, scrollable = false }) => (
  <PhoneFrame width={390} height={h} dark={dark} scrollable={scrollable}>{children}</PhoneFrame>
);

function App() {
  return (
    <div className="showcase-bg">
      <ShowcaseHeader />

      <DesignCanvas>
        {/* SECTION 1 — Homepage, end to end (one tall phone) */}
        <DCSection id="home" title="01 · Home" subtitle="Full scroll, 390 × 844 — hero, trust, collections, custom, atelier, featured, craft, testimonials, CTA, footer">
          <DCArtboard id="home-full" label="Homepage · Dark · full scroll" width={390} height={6900}>
            <PhoneFrame width={390} height={6900} dark={true}>
              <HomeMobile/>
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard id="home-light" label="Homepage · Light · top fold" width={390} height={1700}>
            <PhoneFrame width={390} height={1700} dark={false}>
              <div className="m-root m-light" style={{height:'auto'}}>
                <MTicker idx={0}/>
                <MHeader cartCount={0} wishCount={2}/>
                <section className="m-hero">
                  <div className="ph" style={{backgroundImage: `url(https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop)`}}/>
                  <div className="veil" style={{background:'linear-gradient(180deg, rgba(251,248,243,.15) 0%, rgba(251,248,243,.05) 35%, rgba(251,248,243,.45) 70%, rgba(251,248,243,.95) 100%)'}}/>
                  <div className="content">
                    <div className="m-eyebrow" style={{color:'var(--gold-deep)'}}><span className="line" style={{background:'var(--gold-deep)'}}/>Refined Indian Atelier · Est. 1995</div>
                    <h1 className="m-hero-title" style={{marginTop: 18, color:'var(--ink)'}}>Stones with stories.<br/>Gold with <em style={{color:'var(--gold-deep)'}}>feeling</em>.</h1>
                    <div className="sub" style={{color:'var(--gold-deep)'}}>मेहर · रूप · रंग</div>
                    <p className="body" style={{color:'rgba(11,10,12,.78)'}}>A family atelier for hand-sketched Indian jewellery. Naturally-sourced stones, hallmarked 22K &amp; 18K gold.</p>
                    <div className="actions">
                      <button className="m-btn m-btn-ink m-btn-full">Begin a Commission <MIcon name="arr-r" size={14}/></button>
                      <button className="m-btn m-btn-outline m-btn-full" style={{color:'var(--ink)', borderColor:'rgba(11,10,12,.18)'}}>Browse Jewellery</button>
                    </div>
                  </div>
                </section>
                <section style={{background:'var(--ink)'}}>
                  <div className="m-trust">
                    <div className="cell"><MIcon name="shield" size={20} color="var(--gold)"/><div><div className="t" style={{color:'var(--ivory)'}}>BIS 916<br/>Hallmark</div><div className="d" style={{color:'var(--muted)'}}>On every gram</div></div></div>
                    <div className="cell"><MIcon name="gem" size={20} color="var(--gold)"/><div><div className="t" style={{color:'var(--ivory)'}}>Certified<br/>Stones</div><div className="d" style={{color:'var(--muted)'}}>GIA · GRS</div></div></div>
                    <div className="cell"><MIcon name="sparkle" size={20} color="var(--gold)"/><div><div className="t" style={{color:'var(--ivory)'}}>Lifetime<br/>Polish</div><div className="d" style={{color:'var(--muted)'}}>Free, in studio</div></div></div>
                    <div className="cell"><MIcon name="pencil" size={20} color="var(--gold)"/><div><div className="t" style={{color:'var(--ivory)'}}>Designer<br/>Consultation</div><div className="d" style={{color:'var(--muted)'}}>By appointment</div></div></div>
                  </div>
                </section>
                <MSection tone="ivory" eyebrow="Four houses" title="Collections, by <em>occasion</em>" deva="संग्रह">
                  <div className="m-collstack">
                    {window.GAJ_DATA.COLLECTIONS.slice(0,2).map(c => (
                      <div key={c.id} className="m-coll">
                        <div className="ph" style={{backgroundImage:`url(${c.image})`}}/>
                        <div className="lbl">
                          <div>
                            <div className="name">{c.name}</div>
                            <div className="dv">{c.deva}</div>
                            <div className="ct">{c.count}</div>
                          </div>
                          <div className="arr"><MIcon name="arr-dr" size={16}/></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </MSection>
              </div>
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        {/* SECTION 2 — Navigation & Browse */}
        <DCSection id="nav" title="02 · Navigation & Browse" subtitle="Menu sheet, catalogue grid with sticky filter bar, full-sheet filter drawer">
          <DCArtboard id="menu" label="Menu · Full sheet" width={390} height={844}>
            <PhoneFrame width={390} height={844} dark={true}>
              <MenuMobile/>
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard id="cat" label="Catalogue · 2-up grid" width={390} height={2800}>
            <PhoneFrame width={390} height={2800} dark={true}>
              <CatalogueMobile/>
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard id="filter" label="Filter drawer · over catalogue" width={390} height={844}>
            <PhoneFrame width={390} height={844} dark={true}>
              <FilterDrawerMobile/>
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        {/* SECTION 3 — Product detail */}
        <DCSection id="pdp" title="03 · Product Detail" subtitle="Swipeable gallery, metal/size selectors, accordions, sticky purchase bar. WhatsApp is one tap from price.">
          <DCArtboard id="pdp-dark" label="PDP · Dark · with sticky bar" width={390} height={2600}>
            <PhoneFrame width={390} height={2600} dark={true}>
              <PDPMobile light={false}/>
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard id="pdp-light" label="PDP · Light · same density" width={390} height={2600}>
            <PhoneFrame width={390} height={2600} dark={false}>
              <PDPMobile light={true}/>
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard id="lightbox" label="Image lightbox · pinch-zoom" width={390} height={844}>
            <PhoneFrame width={390} height={844} dark={true}>
              <LightboxMobile/>
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        {/* SECTION 4 — Custom design flow */}
        <DCSection id="custom" title="04 · Custom Design Flow" subtitle="Guided consultation, not a form. Sticky progress, large tap targets, live commission card.">
          <DCArtboard id="custom-step" label="Custom · Step 3 · Stone" width={390} height={844}>
            <PhoneFrame width={390} height={844} dark={true}>
              <CustomMobile/>
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        {/* SECTION 5 — Cart & Wishlist */}
        <DCSection id="conversion" title="05 · Bag & Wishlist" subtitle="Two checkout paths — secure web or WhatsApp. Live gold rate visible. Strong recovery state.">
          <DCArtboard id="cart" label="Bag · 2 pieces · Summary" width={390} height={1700}>
            <PhoneFrame width={390} height={1700} dark={true}>
              <CartMobile/>
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard id="wish" label="Wishlist · 3 pieces" width={390} height={1500}>
            <PhoneFrame width={390} height={1500} dark={true}>
              <WishlistMobile/>
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        {/* SECTION 6 — Discovery */}
        <DCSection id="discovery" title="06 · Gemstones" subtitle="Editorial knowledge surface — sourcing, hardness, astrological intent.">
          <DCArtboard id="gems" label="Gemstones · long-form" width={390} height={2200}>
            <PhoneFrame width={390} height={2200} dark={true}>
              <GemstonesMobile/>
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

      </DesignCanvas>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
