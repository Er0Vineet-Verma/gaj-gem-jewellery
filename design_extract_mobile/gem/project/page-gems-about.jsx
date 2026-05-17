/* ─────────────────────────────────────────────────────────────
   GAJ — Gemstones page + About / Studio page
   ───────────────────────────────────────────────────────────── */

const GemstonesPage = ({ goto }) => {
  const { GEMS } = window.GAJ_DATA;
  const [active, setActive] = React.useState(GEMS[0].id);
  const featured = GEMS.find(g => g.id === active);

  return (
    <>
      <div className="shell">
        <div style={{padding:'56px 0 0'}}>
          <Crumbs items={[{ label: 'Atelier', onClick: () => goto('home') }, { label: 'Gemstones' }]} />
        </div>
        <div className="gems-hero">
          <div className="eyebrow" style={{marginBottom: 20}}>The Stone Library <span className="dot"></span> Eight families, one buyer</div>
          <h1 className="title font-display">Read by <em>light</em>,<br/>sorted by <em>hand</em>.</h1>
          <div className="deva">रत्न जो सच कहते हैं</div>
          <p className="sub">Our buyer Anika travels twice a year — Mogok for ruby, Muzo for emerald, Ratnapura for sapphire. What returns to the studio is what she put on her own palm and held against north-light.</p>
        </div>

        <div className="gem-strip">
          {GEMS.map(g => (
            <div key={g.id} className={`gem-chip ${active === g.id ? 'active' : ''}`} onClick={() => setActive(g.id)}>
              <div className="swatch-circ" style={{background: g.color}}></div>
              <div className="n">{g.name}</div>
              <div className="dev">{g.deva}</div>
            </div>
          ))}
        </div>

        <div className="gem-feature">
          <div>
            <div className="latin">{featured.id.toUpperCase()} <span style={{opacity:.5, margin:'0 8px'}}>·</span> {featured.deva}</div>
            <h2 className="name font-display">{featured.name}</h2>
            <p className="body">{featured.body}</p>
            <div className="specs">
              <div>
                <div className="k">Astrology</div>
                <div className="v">{featured.astro}</div>
              </div>
              <div>
                <div className="k">Hardness · Mohs</div>
                <div className="v">{featured.hardness}</div>
              </div>
              <div>
                <div className="k">Primary origin</div>
                <div className="v">{featured.origin}</div>
              </div>
              <div>
                <div className="k">In our stock</div>
                <div className="v" style={{color:'var(--gold)'}}>Available, GIA/GRS</div>
              </div>
            </div>
            <div style={{marginTop: 32, display:'flex', gap: 12, flexWrap:'wrap'}}>
              <button className="btn btn-gold" onClick={() => goto('custom')}>
                <Icon name="pencil" size={14}/> Commission with this stone
              </button>
              <button className="btn btn-outline" onClick={() => goto('catalogue')}>
                See pieces set with {featured.name} <Icon name="arrow-right" size={14}/>
              </button>
            </div>
          </div>
          <div className="photo">
            <div style={{width:'100%', height:'100%', position:'relative', background: `radial-gradient(circle at 50% 35%, ${featured.color}99, ${featured.color}33 50%, #0b0507 80%)`, display:'flex', alignItems:'center', justifyContent:'center'}}>
              <div style={{
                width: '52%', aspectRatio: '1',
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.55), ${featured.color} 35%, ${featured.color} 65%, rgba(0,0,0,.45) 100%)`,
                boxShadow: `0 30px 80px ${featured.color}66, inset 0 -20px 40px rgba(0,0,0,.4), inset 0 20px 30px rgba(255,255,255,.18)`,
                position: 'relative'
              }}>
                <div style={{position:'absolute', top: '12%', left: '20%', width: '28%', height: '20%', background:'radial-gradient(ellipse, rgba(255,255,255,.5), transparent 70%)', borderRadius: '50%', filter:'blur(2px)'}}></div>
              </div>
              <div style={{position:'absolute', bottom: 24, left: 24, fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.22em', textTransform:'uppercase', color: 'var(--text-faint)'}}>Illustrative · Actual stones from {featured.origin}</div>
            </div>
          </div>
        </div>

        {/* ─── Education columns ─── */}
        <section className="section">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{marginBottom: 16}}>How we grade <span className="dot"></span> The four reads</div>
              <h2 className="title font-display">Four things we check<br/>before the <em>tray</em> goes back.</h2>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 32}}>
            {[
              { n: '01', t: 'Colour temperature', d: 'Held under north-light, against a neutral grey card. We score colour first because it cannot be improved at the bench.' },
              { n: '02', t: 'Clarity & inclusions', d: 'Loupe inspection at 10×. We accept inclusions that tell us where a stone came from. We reject anything that compromises light return.' },
              { n: '03', t: 'Cut & symmetry', d: 'Measured on a faceted stone, eyed on a cabochon. The cut decides whether a stone sits well in the setting we have in mind.' },
              { n: '04', t: 'Origin & treatment', d: 'Documented on paper. Heat-only, unheated, oiled, or untreated — we will always tell you exactly what the stone has been through.' }
            ].map((x, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{borderTop:'1px solid var(--hairline)', paddingTop: 24}}>
                  <div style={{fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.22em', color:'var(--gold)', marginBottom: 16}}>{x.n} / 04</div>
                  <div style={{fontFamily:'var(--font-display)', fontSize: 24, lineHeight: 1.2, marginBottom: 12}}>{x.t}</div>
                  <div style={{color:'var(--text-mute)', fontSize: 15}}>{x.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

const AboutPage = ({ goto }) => {
  const { STUDIO_IMAGES } = window.GAJ_DATA;

  return (
    <>
      <div className="shell">
        <div style={{padding:'56px 0 0'}}>
          <Crumbs items={[{ label: 'Atelier', onClick: () => goto('home') }, { label: 'The Studio' }]} />
        </div>
        <div className="about-hero">
          <div>
            <div className="eyebrow" style={{marginBottom: 24}}>The Studio <span className="dot"></span> Est. 1995</div>
            <h1 className="title font-display">
              Two generations,<br/>
              <em style={{fontStyle:'italic', color:'var(--gold)'}}>one bench</em>.
            </h1>
            <div className="font-deva" style={{color:'var(--gold-soft)', marginTop: 16, fontSize: 18}}>दो पीढ़ियाँ, एक बेंच</div>
          </div>
          <div className="body">
            <p style={{margin: 0}}>GAJ was opened in 1995 by Mahendra Anand at a single table on Chickpet, Bangalore — two stools, a kerosene lamp, and a magnifier his father had carried from Lahore.</p>
            <p style={{marginTop: 16}}>Today his son Ishaan runs the studio, his daughter-in-law Pranati leads the design floor, and the same bench stands in our showroom, still in use. We do one thing — make jewellery, by hand, for people we have met.</p>
            <div style={{marginTop: 32, display:'flex', gap: 12, flexWrap:'wrap'}}>
              <button className="btn btn-gold" onClick={() => goto('custom')}><Icon name="pencil" size={14}/> Start a piece</button>
              <button className="btn btn-outline"><Icon name="calendar" size={14}/> Visit the atelier</button>
            </div>
          </div>
        </div>

        <div className="about-stats">
          <div className="about-stat">
            <div className="v font-display">31</div>
            <div className="l">years at the bench</div>
          </div>
          <div className="about-stat">
            <div className="v font-display">2<span style={{fontFamily:'var(--font-mono)', fontSize: 18, verticalAlign:'super', color:'var(--gold-soft)'}}>nd</span></div>
            <div className="l">generation in the studio</div>
          </div>
          <div className="about-stat">
            <div className="v font-display">1,200+</div>
            <div className="l">commissions delivered</div>
          </div>
        </div>

        <div className="studio-grid">
          <div className="ph a"><img src={STUDIO_IMAGES[0]} alt="bench" /></div>
          <div className="ph b"><img src={STUDIO_IMAGES[1]} alt="stones" /></div>
          <div className="ph c"><img src={STUDIO_IMAGES[2]} alt="chain" /></div>
          <div className="ph d"><img src={STUDIO_IMAGES[3]} alt="ring" /></div>
          <div className="ph e" style={{background:'var(--ink)', display:'flex', alignItems:'center', justifyContent:'center', padding: 16, textAlign:'center'}}>
            <div>
              <div style={{fontFamily:'var(--font-display)', fontSize: 28, fontStyle:'italic', color:'var(--gold)'}}>GAJ°</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize: 9, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)', marginTop: 6}}>est. 1995</div>
            </div>
          </div>
          <div className="ph f"><img src={STUDIO_IMAGES[4]} alt="bridal" /></div>
        </div>

        <div className="values-grid">
          {[
            { n: '01', h: 'We do not chase volume.', b: 'GAJ takes on a fixed number of commissions a year, so every piece is held by someone who can answer for it. A floor that never feels rushed makes jewellery that does not look rushed.' },
            { n: '02', h: 'Paper before pixels.', b: 'Every commission is sketched in graphite first, by the designer who will see it through. CAD comes later, after the line is decided. The drawing returns with the piece.' },
            { n: '03', h: 'The same family, two generations on.', b: 'Many of our clients are the daughters and granddaughters of clients we already knew. We keep their grandmothers\' sketches in a drawer downstairs. We don\'t advertise this — it\'s simply the way it has gone.' }
          ].map((v, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="value">
                <div className="n">{v.n} / 03</div>
                <div className="h font-display">{v.h}</div>
                <div className="b">{v.b}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Press / accreditations */}
        <section style={{padding:'64px 0 96px', borderTop:'1px solid var(--hairline)'}}>
          <div className="row between center" style={{flexWrap:'wrap', gap: 24, marginBottom: 32}}>
            <div className="eyebrow">Accreditations <span className="dot"></span> On paper</div>
            <div style={{fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)'}}>Documents available on request</div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 24, alignItems:'center'}}>
            {[
              { l: 'BIS', s: 'Hallmark 916 · 750' },
              { l: 'GIA', s: 'Graduate Gemologist' },
              { l: 'GRS', s: 'Origin Reports' },
              { l: 'IGI', s: 'Diamond Certification' },
              { l: 'GJEPC', s: 'Member · 1988' }
            ].map((b, i) => (
              <div key={i} style={{textAlign:'center', padding: '32px 16px', border:'1px solid var(--hairline)', minHeight: 130, display:'flex', flexDirection:'column', justifyContent:'center', gap: 8}}>
                <div style={{fontFamily:'var(--font-display)', fontSize: 32, fontStyle:'italic', color:'var(--gold)'}}>{b.l}</div>
                <div style={{fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)'}}>{b.s}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

window.GemstonesPage = GemstonesPage;
window.AboutPage = AboutPage;
