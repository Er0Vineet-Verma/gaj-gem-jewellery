/* ─────────────────────────────────────────────────────────────
   GAJ — Mobile screen 1: Homepage (full scroll)
   ───────────────────────────────────────────────────────────── */

const HomeMobile = () => {
  const { COLLECTIONS, CRAFT, TESTIMONIALS, PRODUCTS, formatINR } = window.GAJ_DATA;
  const [tabIdx, setTabIdx] = React.useState(0);
  const [customStone, setCustomStone] = React.useState('ruby');
  const featured = PRODUCTS.slice(0, 4);
  const editorial = PRODUCTS[5];

  return (
    <div className="m-root" style={{height: 'auto'}}>
      <MTicker idx={0}/>
      <MHeader cartCount={0} wishCount={2}/>

      {/* HERO ─────────────────────────── */}
      <section className="m-hero">
        <div className="ph" style={{backgroundImage: `url(https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop)`}}/>
        <div className="veil"/>
        <div className="grain"/>
        <div className="content">
          <div className="m-eyebrow" style={{color:'var(--gold-soft)'}}><span className="line" style={{background:'var(--gold-soft)'}}/>Refined Indian Atelier · Est. 1995</div>
          <h1 className="m-hero-title" style={{marginTop: 18}}>
            Stones with stories.<br/>
            Gold with <em>feeling</em>.
          </h1>
          <div className="sub">मेहर · रूप · रंग</div>
          <p className="body">
            A family atelier for hand-sketched Indian jewellery. Naturally-sourced stones, hallmarked 22K &amp; 18K gold, set in our Jaipur workshop.
          </p>
          <div className="actions">
            <button className="m-btn m-btn-gold m-btn-full">Begin a Commission <MIcon name="arr-r" size={14}/></button>
            <button className="m-btn m-btn-outline m-btn-full" style={{color:'var(--ivory)', borderColor:'rgba(247,242,234,.36)'}}>Browse Jewellery</button>
          </div>
          <div className="trustrow">
            <span><MIcon name="shield" size={12}/> BIS 916</span>
            <span><MIcon name="gem" size={12}/> GIA · GRS</span>
            <span><MIcon name="sparkle" size={12}/> Lifetime polish</span>
          </div>
        </div>
        <div className="scrollcue">
          <span>Scroll</span><span className="ln"/>
        </div>
      </section>

      {/* TRUST GRID ─────────────────── */}
      <section style={{background:'var(--ink)'}}>
        <div className="m-trust">
          <div className="cell"><MIcon name="shield" size={20} className="ico"/><div><div className="t">BIS 916<br/>Hallmark</div><div className="d">On every gram</div></div></div>
          <div className="cell"><MIcon name="gem" size={20} className="ico"/><div><div className="t">Certified<br/>Stones</div><div className="d">GIA · GRS · IGI</div></div></div>
          <div className="cell"><MIcon name="sparkle" size={20} className="ico"/><div><div className="t">Lifetime<br/>Polish</div><div className="d">Free, in studio</div></div></div>
          <div className="cell"><MIcon name="pencil" size={20} className="ico"/><div><div className="t">Designer<br/>Consultation</div><div className="d">By appointment</div></div></div>
        </div>
      </section>

      {/* COLLECTIONS ─────────────────── */}
      <MSection tone="maroon" eyebrow="Four houses" title="Collections, by <em>occasion</em>" deva="संग्रह · चार घराने">
        <div className="m-collstack">
          {COLLECTIONS.map(c => (
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

      {/* CUSTOM VISUALISER ─────────── */}
      <section className="m-customblock">
        <div className="m-eyebrow" style={{color:'var(--gold-soft)'}}><span className="line" style={{background:'var(--gold-soft)'}}/>Make your own</div>
        <h2 className="m-h1" style={{marginTop: 14, color:'var(--ivory)', fontSize: 42}}>
          A piece sketched <em style={{fontStyle:'italic', color:'var(--gold)'}}>for you</em>, in our hand.
        </h2>
        <div className="m-deva" style={{marginTop: 10}}>आपके लिए, हाथ से</div>
        <p style={{color:'rgba(251,248,243,.78)', marginTop: 16, fontSize: 15, maxWidth:'34ch'}}>
          Pick a form, a metal, a stone. Sketches in your inbox within 48 hours. No upsell, no obligation.
        </p>

        <div className="pv">
          <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop" alt=""/>
          <span className="c-tl"/><span className="c-tr"/><span className="c-bl"/><span className="c-br"/>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap: 12}}>
          <div>
            <div style={{fontFamily:'var(--font-mono)', fontSize: 9, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold-soft)', marginBottom: 8}}>Form</div>
            <div className="chips">
              {['Ring','Necklace','Earrings','Bracelet','Bridal Suite'].map((c, i) => (
                <button key={c} className={`chip ${i===0 ? 'on' : ''}`}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontFamily:'var(--font-mono)', fontSize: 9, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold-soft)', marginBottom: 8}}>Centre stone</div>
            <div className="chips">
              {[{id:'ruby', n:'Ruby'}, {id:'emerald', n:'Emerald'}, {id:'sapphire', n:'Sapphire'}, {id:'polki', n:'Polki'}, {id:'pearl', n:'Pearl'}].map(s => (
                <button key={s.id} className={`chip ${customStone===s.id ? 'on' : ''}`} onClick={()=>setCustomStone(s.id)}>{s.n}</button>
              ))}
            </div>
          </div>
        </div>

        <button className="m-btn m-btn-gold m-btn-full" style={{marginTop: 26}}>Begin a Commission <MIcon name="arr-r" size={14}/></button>
        <button className="m-btn m-btn-outline m-btn-full" style={{marginTop: 10, color:'var(--ivory)', borderColor:'rgba(247,242,234,.32)'}}>
          <MIcon name="whatsapp" size={14}/> WhatsApp a designer
        </button>
      </section>

      {/* ATELIER PROCESS ─────────────── */}
      <MSection tone="paper" eyebrow="The four hands" title="An <em>atelier</em>, not an assembly line" deva="चार हाथ">
        <div className="m-process">
          {[
            { n:'01', name:'Sketched', deva:'रेखाचित्र', ds:'On paper, in the studio, with the person who will wear it. No CAD until the line is right.' },
            { n:'02', name:'Stoned', deva:'रत्न चयन', ds:'Coloured stones above a carat carry GIA or GRS. Our buyer travels to source twice a year.' },
            { n:'03', name:'Set', deva:'जड़ाई', ds:'Cast in 22K or 18K, struck at the Mumbai assay office, set by hand in Jaipur.' },
            { n:'04', name:'Polished, forever', deva:'पॉलिश', ds:'Lifetime polish and resize, in our showroom. The piece keeps coming back home.' }
          ].map(s => (
            <div key={s.n} className="m-proc-step">
              <div className="n">{s.n}</div>
              <div>
                <div className="nm">{s.name}</div>
                <div className="dv">{s.deva}</div>
                <div className="ds">{s.ds}</div>
              </div>
            </div>
          ))}
        </div>
        <a className="m-link" style={{marginTop: 32, color:'var(--gold-deep)'}}>Inside the studio <MIcon name="arr-r" size={11}/></a>
      </MSection>

      {/* FEATURED PRODUCTS ────────── */}
      <MSection tone="maroon" eyebrow="At the bench" title="New from the <em>studio</em>" deva="नई कारीगरी">
        <div className="m-chiprow" style={{marginBottom: 20}}>
          {['All','Bridal','Everyday','Heirloom','Polki','Gemstone'].map((t, i) => (
            <button key={t} className={`m-chip ${tabIdx===i ? 'on' : ''}`} onClick={()=>setTabIdx(i)}>{t}</button>
          ))}
        </div>
        <div className="m-pgrid">
          {featured.map((p, i) => <MPCard key={p.id} p={p} wished={i===1}/>)}
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 28}}>
          <a className="m-link">All Jewellery <MIcon name="arr-r" size={11}/></a>
          <span className="m-mute" style={{fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.22em', textTransform:'uppercase'}}>112 pieces</span>
        </div>

        {/* Editorial featured card */}
        <div className="m-feat" style={{marginTop: 36}}>
          <div className="ph"><img src={editorial.images[0]} alt={editorial.name}/></div>
          <div className="lab">
            <div className="tg">Heirloom · This Season</div>
            <div className="nm">{editorial.name}</div>
            <div className="dv">{editorial.deva}</div>
            <div className="pr"><span style={{fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(247,242,234,.6)', marginRight: 6}}>From</span>{formatINR(editorial.price)}</div>
          </div>
        </div>
      </MSection>

      {/* CRAFT STORY ──────────────── */}
      <MSection tone="ink" eyebrow="At the bench" title="A workshop of <em>four hands</em>" deva="कार्यशाला">
        <div className="m-craft">
          {CRAFT.map((c, i) => (
            <div key={c.num} className="item">
              <div className="ph"><img src={c.image} alt={c.name}/></div>
              <div className="n">{c.num} · {i === 0 ? 'Drawing' : i === 1 ? 'Sourcing' : 'Setting'}</div>
              <div className="nm">{c.name}</div>
              <div className="ds">{c.desc}</div>
            </div>
          ))}
        </div>
      </MSection>

      {/* TESTIMONIALS ───────────── */}
      <MSection tone="ivory" eyebrow="Letters from clients" title="In their <em>own words</em>" deva="ग्राहक के बोल">
        <div className="m-testi">
          <div className="q" style={{color:'var(--ink)'}}>{TESTIMONIALS[0].quote}</div>
          <div>
            <div className="name" style={{color:'var(--ink)'}}>{TESTIMONIALS[0].name}</div>
            <div className="what">{TESTIMONIALS[0].what}</div>
          </div>
          <div className="m-testi-dots">
            <span className="on"/><span/><span/>
          </div>
        </div>
      </MSection>

      {/* CTA ─────────────────────── */}
      <section className="m-cta">
        <div className="m-eyebrow" style={{color:'var(--gold-soft)'}}><span className="line" style={{background:'var(--gold-soft)'}}/>Begin</div>
        <h2 className="h" style={{marginTop: 14}}>
          Come into the studio,<br/>
          or <em>start on your phone</em>.
        </h2>
        <p style={{color:'rgba(247,242,234,.76)', marginTop: 16, fontSize: 15, maxWidth:'32ch'}}>
          Tell us what you're imagining. We'll send sketches within 48 hours — no upsell, no obligation.
        </p>
        <div className="actions">
          <button className="m-btn m-btn-gold m-btn-full">Book a Consultation</button>
          <button className="m-btn m-btn-wa m-btn-full"><MIcon name="whatsapp" size={16}/> WhatsApp +91 98100 02250</button>
          <button className="m-btn m-btn-outline m-btn-full" style={{color:'var(--ivory)', borderColor:'rgba(247,242,234,.36)'}}><MIcon name="phone" size={14}/> Call the studio</button>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14, marginTop: 36, paddingTop: 28, borderTop:'1px solid rgba(247,242,234,.12)'}}>
          <div>
            <div style={{fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold-soft)'}}>Showroom</div>
            <div style={{fontFamily:'var(--font-display)', fontSize: 17, marginTop: 6}}>MG Road, Bangalore</div>
            <div className="m-mute" style={{color:'rgba(247,242,234,.5)', fontSize:13, marginTop: 4}}>Mon–Sat · 11–8</div>
          </div>
          <div>
            <div style={{fontFamily:'var(--font-mono)', fontSize:9.5, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold-soft)'}}>Atelier</div>
            <div style={{fontFamily:'var(--font-display)', fontSize: 17, marginTop: 6}}>Johari Bazaar, Jaipur</div>
            <div className="m-mute" style={{color:'rgba(247,242,234,.5)', fontSize:13, marginTop: 4}}>By appointment</div>
          </div>
        </div>
      </section>

      {/* FOOTER ───────────────────── */}
      <MFooter open={['shop']}/>
    </div>
  );
};

Object.assign(window, { HomeMobile });
