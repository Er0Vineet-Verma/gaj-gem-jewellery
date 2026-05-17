/* ─────────────────────────────────────────────────────────────
   GAJ — Mobile screens: Custom flow, Cart, Wishlist, Gemstones
   ───────────────────────────────────────────────────────────── */

/* ─── Custom design flow (step 3 — Stone) ─── */
const CustomMobile = () => {
  const { CUSTOM_FORMS, CUSTOM_STONES, formatINR } = window.GAJ_DATA;
  const steps = ['Form', 'Metal', 'Stone', 'Budget', 'Details'];
  const stepIdx = 2;
  return (
    <div className="m-root" style={{height: '100%'}}>
      <div className="m-custom">
        <div className="head">
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <button className="m-icon-btn" style={{color:'var(--ivory)'}}><MIcon name="arr-l" size={22}/></button>
            <span style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold-soft)'}}>Step {stepIdx+1} of {steps.length}</span>
            <button className="m-icon-btn" style={{color:'var(--ivory)'}}><MIcon name="close" size={22}/></button>
          </div>
          <div className="title" style={{marginTop: 18}}>The <em>centre</em>, picked.</div>
          <div className="m-deva" style={{marginTop: 8}}>केंद्र का रत्न</div>

          <div className="progress">
            {steps.map((_, i) => <span key={i} className={i <= stepIdx ? 'on' : ''}/>)}
          </div>
          <div className="step-meta">
            <span>{steps[stepIdx]}</span>
            <span>Next · {steps[stepIdx+1]}</span>
          </div>
        </div>

        <div className="body">
          <div className="sub">Each stone is hand-picked from a small batch. We will send three sketches with your stone, photographed in north light.</div>

          <div className="choices">
            {[
              {id:'s-ruby', name:'Ruby', deva:'माणिक', c:'#9A1F2A', on: true, p: '+₹ 1,84,000'},
              {id:'s-emerald', name:'Emerald', deva:'पन्ना', c:'#1B6E4F', p: '+₹ 1,62,000'},
              {id:'s-sapphire', name:'Sapphire', deva:'नीलम', c:'#1D3A6E', p: '+₹ 96,000'},
              {id:'s-polki', name:'Polki', deva:'पोलकी', c:'#D4C8A4', p: '+₹ 2,40,000'},
              {id:'s-pearl', name:'South Sea Pearl', deva:'मोती', c:'#EFE7D7', p: '+₹ 38,000'},
              {id:'s-none', name:'No centre', deva:'बिना रत्न', c:null, p: 'Gold only'}
            ].map(s => (
              <div key={s.id} className={`choice ${s.on ? 'on' : ''}`}>
                <div className="ph swatch" style={{background: s.c || 'var(--ink)'}}>
                  {s.c && <span style={{width:'70%', height:'70%', borderRadius:'50%', background: s.c, boxShadow:'inset 0 -10px 18px rgba(0,0,0,.45), inset 0 8px 14px rgba(255,255,255,.22)'}}/>}
                  {!s.c && <span style={{fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 28, color:'var(--muted)'}}>—</span>}
                </div>
                <div className="nm">{s.name}</div>
                <div className="dv">{s.deva}</div>
                <div style={{fontFamily:'var(--font-mono)', fontSize: 9.5, letterSpacing:'.16em', textTransform:'uppercase', color: s.on ? 'var(--gold)' : 'var(--muted)', marginTop: 6}}>{s.p}</div>
              </div>
            ))}
          </div>

          {/* Live summary card */}
          <div className="preview-card">
            <div className="pv"><img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85&auto=format&fit=crop" alt=""/></div>
            <div className="info">
              <div className="k">Your commission</div>
              <div className="nm">Ring · 22K Yellow · Ruby</div>
              <div style={{display:'flex', gap: 10, marginTop: 6, fontFamily:'var(--font-mono)', fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)'}}>
                <span>≈ 12 weeks</span>
                <span style={{color:'var(--gold)'}}>from ₹ 1,84,000</span>
              </div>
            </div>
          </div>

          {/* WhatsApp aside */}
          <div style={{marginTop: 22, padding: 18, border:'1px dashed var(--hairline-2)', display:'flex', gap: 14, alignItems:'center'}}>
            <MIcon name="whatsapp" size={22} color="#1ea75a"/>
            <div style={{flex: 1}}>
              <div style={{fontFamily:'var(--font-display)', fontSize: 16, lineHeight: 1.25}}>Not sure? Speak to a designer.</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize: 9.5, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)', marginTop: 4}}>Reply within 2 hours · Mon–Sat</div>
            </div>
            <MIcon name="arr-r" size={16} color="var(--gold)"/>
          </div>
        </div>

        <div className="footnav">
          <button className="m-btn m-btn-outline" style={{color:'var(--ivory)', borderColor:'var(--hairline-2)'}}><MIcon name="arr-l" size={14}/> Back</button>
          <button className="m-btn m-btn-gold">Continue <MIcon name="arr-r" size={14}/></button>
        </div>
      </div>
    </div>
  );
};

/* ─── Cart ─── */
const CartMobile = () => {
  const { PRODUCTS, formatINR } = window.GAJ_DATA;
  const items = [
    { p: PRODUCTS[0], opts: '22K · Size 11', qty: 1 },
    { p: PRODUCTS[7], opts: '18K Rose · Pair', qty: 1 }
  ];
  const subtotal = items.reduce((s, it) => s + it.p.price * it.qty, 0);
  const making = Math.round(subtotal * 0.06);
  const total = subtotal + making;

  return (
    <div className="m-root" style={{height:'auto'}}>
      <MTicker idx={0}/>
      <MHeader cartCount={2} wishCount={2}/>

      <div className="m-cat-head" style={{paddingBottom: 12}}>
        <div className="m-eyebrow"><span className="line"/>Your bag · {items.length} pieces</div>
        <div className="title" style={{marginTop: 12}}>Bag, <em>resting</em></div>
        <div className="deva">आपका थैला</div>
      </div>

      {items.map((it, i) => (
        <div key={i} className="m-cart-row">
          <div className="ph"><img src={it.p.images[0]} alt={it.p.name}/></div>
          <div className="info">
            <div className="nm">{it.p.name}</div>
            <div className="dv">{it.p.deva}</div>
            <div className="sp">
              {it.opts.split(' · ').map(s => <span key={s}>{s}</span>)}
              <span>Engraving: मेहर</span>
            </div>
            <div className="pricerow">
              <div className="qty">
                <button><MIcon name="minus" size={14}/></button>
                <span className="n">{it.qty}</span>
                <button><MIcon name="plus" size={14}/></button>
              </div>
              <div className="pr">{formatINR(it.p.price * it.qty)}</div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 8}}>
              <a style={{fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)'}}>Move to wishlist</a>
              <a className="rem">Remove</a>
            </div>
          </div>
        </div>
      ))}

      {/* Gift wrap toggle */}
      <div style={{padding:'18px 20px', display:'flex', alignItems:'center', gap: 14, borderBottom:'1px solid var(--hairline)'}}>
        <div style={{width: 44, height: 44, borderRadius:'50%', background:'rgba(198,168,107,.10)', color:'var(--gold)', display:'inline-flex', alignItems:'center', justifyContent:'center', flex:'none'}}><MIcon name="package" size={18}/></div>
        <div style={{flex: 1}}>
          <div style={{fontFamily:'var(--font-display)', fontSize: 16}}>Velvet pouch &amp; gift box</div>
          <div className="m-mute">Complimentary on every order</div>
        </div>
        <span style={{width: 38, height: 22, borderRadius: 999, background:'var(--gold)', position:'relative'}}>
          <span style={{position:'absolute', right: 2, top: 2, width: 18, height: 18, borderRadius:'50%', background:'var(--ink)'}}/>
        </span>
      </div>

      {/* Summary */}
      <div className="m-cart-sum">
        <h3>Summary</h3>
        <div className="line"><span>Subtotal · 2 pieces</span><span className="v">{formatINR(subtotal)}</span></div>
        <div className="line"><span>Making · 6%</span><span className="v">{formatINR(making)}</span></div>
        <div className="line"><span>Shipping</span><span className="v" style={{color:'var(--gold)'}}>Free</span></div>
        <div className="line total"><span className="lab" style={{fontFamily:'var(--font-display)', fontSize: 18, textTransform:'none', letterSpacing:0}}>Total</span><span className="v">{formatINR(total)}</span></div>
        <div className="m-mute" style={{marginTop: 8}}>Live gold rate · 22K @ ₹ 7,640/g</div>

        <button className="m-btn m-btn-gold m-btn-full" style={{marginTop: 18}}>Checkout securely</button>
        <button className="m-btn m-btn-wa m-btn-full" style={{marginTop: 10}}><MIcon name="whatsapp" size={14}/> Order on WhatsApp</button>
        <div style={{display:'flex', gap: 14, marginTop: 18, fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)', flexWrap:'wrap'}}>
          <span><MIcon name="shield" size={11}/> BIS 916</span>
          <span><MIcon name="sparkle" size={11}/> Lifetime polish</span>
          <span><MIcon name="package" size={11}/> 30-day return</span>
        </div>
      </div>

      <MFooter open={[]}/>
    </div>
  );
};

/* ─── Wishlist ─── */
const WishlistMobile = () => {
  const { PRODUCTS, formatINR } = window.GAJ_DATA;
  const wished = [PRODUCTS[1], PRODUCTS[2], PRODUCTS[5]];
  return (
    <div className="m-root" style={{height:'auto'}}>
      <MTicker idx={2}/>
      <MHeader cartCount={1} wishCount={3}/>

      <div className="m-cat-head">
        <div className="m-eyebrow"><span className="line"/>Saved by you</div>
        <div className="title" style={{marginTop: 12}}>Wishlist <em>·</em> 3</div>
        <div className="deva">पसंद की सूची</div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 16}}>
          <div style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)'}}>2 pieces in stock</div>
          <a className="m-link" style={{fontSize: 10}}>Share list <MIcon name="arr-dr" size={10}/></a>
        </div>
      </div>

      {wished.map((p, i) => (
        <div key={p.id} className="m-wish-row">
          <div className="ph"><img src={p.images[0]} alt={p.name}/></div>
          <div className="info">
            <div className="nm">{p.name}</div>
            <div className="dv">{p.deva}</div>
            <div style={{fontFamily:'var(--font-mono)', fontSize: 9, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)', marginTop: 6}}>
              {p.stone} · {p.metal} · {i === 2 ? 'Made to order' : 'In stock'}
            </div>
            <div className="pr">{formatINR(p.price)}</div>
            <div className="act">
              <button className="b gold">Add to Bag</button>
              <button className="b" style={{color:'var(--text-strong)'}}>View</button>
              <button className="b" style={{color:'var(--text-mute)'}}><MIcon name="close" size={11}/></button>
            </div>
          </div>
        </div>
      ))}

      <div style={{padding:'32px 20px'}}>
        <div style={{padding: 22, border:'1px solid var(--hairline-2)', textAlign:'center'}}>
          <div style={{width: 44, height: 44, margin:'0 auto 12px', color:'var(--gold)', display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
            <MIcon name="heart" size={24}/>
          </div>
          <div style={{fontFamily:'var(--font-display)', fontSize: 20, lineHeight: 1.25, marginBottom: 8}}>Save the list to your inbox</div>
          <div className="m-mute" style={{marginBottom: 14}}>We'll keep an eye on what comes back in stock.</div>
          <button className="m-btn m-btn-outline" style={{color:'var(--text-strong)', borderColor:'var(--hairline-2)'}}>Email this wishlist</button>
        </div>
      </div>

      <MFooter open={[]}/>
    </div>
  );
};

/* ─── Gemstones page ─── */
const GemstonesMobile = () => {
  const { GEMS } = window.GAJ_DATA;
  return (
    <div className="m-root" style={{height: 'auto'}}>
      <MTicker idx={1}/>
      <MHeader cartCount={0} wishCount={2}/>

      <section className="m-gem-hero">
        <div className="m-eyebrow" style={{justifyContent:'center'}}><span className="line"/>From mine to atelier</div>
        <div className="title" style={{marginTop: 16}}>Eight <em>stones</em> we know by hand.</div>
        <div className="deva">आठ रत्न</div>
        <p className="body" style={{maxWidth:'34ch', margin:'18px auto 0', color:'var(--text-body)', fontSize: 15}}>
          We grade colour first, carat second. Every coloured stone above one carat carries a third-party report.
        </p>
      </section>

      <div className="m-gem-strip">
        {GEMS.map((g, i) => (
          <div key={g.id} className={`m-gem-chip ${i===0 ? 'on' : ''}`}>
            <div className="sw" style={{background: g.color}}/>
            <div className="n">{g.name}</div>
            <div className="dv">{g.deva}</div>
          </div>
        ))}
      </div>

      {/* Featured gem */}
      <div className="m-gem-feature">
        <div className="ph"><img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop" alt="Ruby"/></div>
        <div className="latin">{GEMS[0].astro}</div>
        <div className="nm">Ruby</div>
        <div className="dv">माणिक · Corundum</div>
        <p className="body">{GEMS[0].body}</p>
        <div className="specs">
          <div><div className="k">Origin</div><div className="v">{GEMS[0].origin}</div></div>
          <div><div className="k">Hardness</div><div className="v">{GEMS[0].hardness}</div></div>
          <div><div className="k">Sourcing</div><div className="v">Direct, twice a year</div></div>
          <div><div className="k">Certification</div><div className="v">GRS · Origin</div></div>
        </div>
        <button className="m-btn m-btn-outline m-btn-full" style={{marginTop: 26, color:'var(--text-strong)', borderColor:'var(--hairline-2)'}}>
          See pieces in ruby <MIcon name="arr-r" size={13}/>
        </button>
      </div>

      <div className="m-gem-feature">
        <div className="ph"><img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop" alt="Emerald"/></div>
        <div className="latin">{GEMS[1].astro}</div>
        <div className="nm">Emerald</div>
        <div className="dv">पन्ना · Beryl</div>
        <p className="body">{GEMS[1].body}</p>
        <div className="specs">
          <div><div className="k">Origin</div><div className="v">{GEMS[1].origin}</div></div>
          <div><div className="k">Hardness</div><div className="v">{GEMS[1].hardness}</div></div>
        </div>
      </div>

      <section className="m-cta">
        <div className="m-eyebrow" style={{color:'var(--gold-soft)'}}><span className="line" style={{background:'var(--gold-soft)'}}/>Astrological consultation</div>
        <h2 className="h" style={{marginTop: 14}}>
          A stone for the <em>chart</em>, not just the finger.
        </h2>
        <p style={{color:'rgba(247,242,234,.76)', marginTop: 16, fontSize: 15, maxWidth:'32ch'}}>
          Pair with one of our two Vedic jyotishis before you commit. Stone-on-finger reading, free with commission.
        </p>
        <div className="actions">
          <button className="m-btn m-btn-gold m-btn-full">Book a reading</button>
          <button className="m-btn m-btn-outline m-btn-full" style={{color:'var(--ivory)', borderColor:'rgba(247,242,234,.36)'}}>Read the guide</button>
        </div>
      </section>

      <MFooter open={[]}/>
    </div>
  );
};

Object.assign(window, { CustomMobile, CartMobile, WishlistMobile, GemstonesMobile });
