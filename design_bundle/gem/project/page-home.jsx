/* ─────────────────────────────────────────────────────────────
   GAJ — Home page (8 sections per brief)
   ───────────────────────────────────────────────────────────── */

const HomePage = ({ goto, openProduct, wishlist, toggleWish, tweak }) => {
  const { PRODUCTS, COLLECTIONS, GEMS, TESTIMONIALS, CRAFT, formatINR } = window.GAJ_DATA;
  const [journeyStep, setJourneyStep] = React.useState(0);

  const journeySteps = [
    { num: '01', name: 'Choose a form', hint: 'Ring, necklace, jhumka, suite', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop' },
    { num: '02', name: 'Choose a metal', hint: '22K, 18K, white, rose, platinum', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85&auto=format&fit=crop' },
    { num: '03', name: 'Choose a stone', hint: 'Ruby, emerald, sapphire, polki', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop' },
    { num: '04', name: 'Receive a sketch', hint: 'Hand-drawn quote in 7 days', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop' }
  ];

  const heroProduct = PRODUCTS[5]; // Roop bridal suite
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-photo" style={{backgroundImage: `url(https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=2000&q=90&auto=format&fit=crop)`}}></div>
        <div className="hero-grain"></div>
        <div className="shell hero-content">
          <div className="hero-eyebrow-row">
            <span className="line"></span>
            <span className="eyebrow">Refined Indian Atelier <span className="dot"></span> Est. 1995</span>
          </div>
          <h1 className="hero-title font-display">
            {tweak.headline.split('\n').map((line, i) => (
              <span key={i} style={{display:'block'}}>
                {line.split('*').map((part, j) =>
                  j % 2 === 1 ? <em key={j}>{part}</em> : <React.Fragment key={j}>{part}</React.Fragment>
                )}
              </span>
            ))}
          </h1>
          <div className="hero-deva font-deva">रत्न जो कहानी कहें · सोना जो मन को छुए</div>

          <div className="hero-grid" style={{marginTop: 48}}>
            <div>
              <p style={{maxWidth: '52ch', color:'var(--text-body)', fontSize: 19, lineHeight: 1.55}}>
                Hand-finished pieces in 22K and 18K gold, set with naturally-sourced gemstones —
                ruby, emerald, sapphire, pearl, polki. Sketched by hand. Made for one.
              </p>
              <div className="hero-actions">
                <button className="btn btn-gold" onClick={() => goto('custom')}>
                  <Icon name="pencil" size={14} /> Start a custom piece
                </button>
                <button className="btn btn-outline" onClick={() => goto('catalogue')}>
                  Browse jewellery <Icon name="arrow-right" size={14} />
                </button>
              </div>
              <div className="hero-trust">
                <span><Icon name="shield" size={14} className="ico" /> BIS 916 Hallmarked</span>
                <span><Icon name="gem" size={14} className="ico" /> GIA / GRS Stones</span>
                <span><Icon name="sparkle" size={14} className="ico" /> Lifetime Polish</span>
              </div>
            </div>
            <div className="hero-meta">
              <div className="kv">
                <span>Currently in studio</span>
                <span className="v font-display">Roop Bridal Suite</span>
                <span style={{textTransform:'none', letterSpacing: 0, color:'var(--gold-soft)', fontFamily:'var(--font-display)', fontSize: 15, fontStyle:'italic'}}>Build week 12 of 16</span>
              </div>
              <div className="kv">
                <span>Today's gold rate</span>
                <span className="v font-display">₹ 7,420 <span style={{fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--muted)', letterSpacing:'.15em'}}>/ gram · 22K</span></span>
                <span style={{textTransform:'none', letterSpacing: 0, color:'var(--gold)', fontFamily:'var(--font-mono)', fontSize: 11}}>Updated 09:00 IST · 16 May 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* ─── Featured Collections ─── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow" style={{marginBottom: 16}}>Section 02 <span className="dot"></span> Collections</div>
                <h2 className="title font-display">Four paths through the<br/><em>house</em>.</h2>
              </div>
              <div style={{maxWidth: 320, color:'var(--text-body)'}}>
                <p style={{margin: 0}}>Bridal commissions, everyday gold to live in, certified gemstone work, and custom heirlooms made around a stone you already love.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="collections-grid">
              {COLLECTIONS.map(c => (
                <div key={c.id} className={`collection-tile ${c.span}`} onClick={() => goto('catalogue')}>
                  <img className="photo" src={c.image} alt={c.name} loading="lazy" />
                  <div className="label">
                    <div className="label-text">
                      <div className="name">{c.name}</div>
                      <div className="meta">{c.deva} <span style={{margin:'0 8px', opacity:.5}}>·</span> {c.count}</div>
                    </div>
                    <div className="arr"><Icon name="arrow-right" size={16} /></div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divider" />

      {/* ─── Custom Journey ─── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow" style={{marginBottom: 16}}>Section 03 <span className="dot"></span> Atelier</div>
                <h2 className="title font-display">A piece made in <em>four</em><br/>quiet conversations.</h2>
              </div>
              <button className="btn btn-outline" onClick={() => goto('custom')}>
                Start the conversation <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </Reveal>
          <div className="journey">
            <div className="journey-steps">
              {journeySteps.map((s, i) => (
                <div key={i}
                  className={`journey-step ${journeyStep === i ? 'active' : ''}`}
                  onMouseEnter={() => setJourneyStep(i)}>
                  <span className="num">{s.num}</span>
                  <div>
                    <div className="name">{s.name}</div>
                    <div className="hint" style={{marginTop: 4}}>{s.hint}</div>
                  </div>
                  <Icon name="arrow-right" size={16} style={{color: journeyStep === i ? 'var(--gold)' : 'var(--muted)'}} />
                </div>
              ))}
            </div>
            <div className="journey-preview">
              <img src={journeySteps[journeyStep].image} alt="" key={journeyStep}
                style={{animation: 'fadeIn .6s ease'}} />
              <div className="c-tl corner"></div>
              <div className="c-tr corner"></div>
              <div className="c-bl corner"></div>
              <div className="c-br corner"></div>
              <div className="overlay">
                <span>Step {journeySteps[journeyStep].num} / 04</span>
                <span className="v">{journeySteps[journeyStep].name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ─── Craftsmanship ─── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow" style={{marginBottom: 16}}>Section 04 <span className="dot"></span> Craftsmanship</div>
                <h2 className="title font-display">Three proofs<br/>of <em>provenance</em>.</h2>
              </div>
              <div style={{maxWidth: 320, color:'var(--text-body)'}}>
                <p style={{margin: 0}}>What we will tell you, on paper, about every piece that leaves this house.</p>
              </div>
            </div>
          </Reveal>
          <div className="craft-grid">
            {CRAFT.map((c, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="craft-item">
                  <div className="photo"><img src={c.image} alt={c.name} loading="lazy" /></div>
                  <div className="num">{c.num} / 03</div>
                  <div className="name">{c.name}</div>
                  <div className="desc">{c.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ─── Featured Jewellery ─── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow" style={{marginBottom: 16}}>Section 05 <span className="dot"></span> Featured</div>
                <h2 className="title font-display">In the case<br/>this <em>week</em>.</h2>
              </div>
              <button className="btn btn-outline" onClick={() => goto('catalogue')}>
                See all 124 pieces <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </Reveal>
          <div className="product-grid">
            {featured.map(p => (
              <ProductCard key={p.id} product={p}
                onClick={() => openProduct(p.id)}
                wished={wishlist.includes(p.id)}
                onWish={() => toggleWish(p.id)} />
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ─── Gemstone story ─── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow" style={{marginBottom: 16}}>Section 06 <span className="dot"></span> Stones</div>
                <h2 className="title font-display">Stones we have <em>met</em>,<br/>and stones we trust.</h2>
              </div>
              <button className="btn btn-outline" onClick={() => goto('gemstones')}>
                Stone library <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="gem-strip" style={{padding: 0}}>
              {GEMS.slice(0, 8).map(g => (
                <div key={g.id} className="gem-chip" onClick={() => goto('gemstones')}>
                  <div className="swatch-circ" style={{background: g.color}}></div>
                  <div className="n">{g.name}</div>
                  <div className="dev">{g.deva}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <hr className="divider" />

      {/* ─── Testimonials ─── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow" style={{marginBottom: 16}}>Section 07 <span className="dot"></span> Words</div>
                <h2 className="title font-display">From the families<br/>who <em>chose</em> us.</h2>
              </div>
            </div>
          </Reveal>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="testimonial">
                  <div className="quote">{t.quote}</div>
                  <div className="meta">
                    <div className="name">{t.name}</div>
                    <div className="what">{t.what}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Appointment CTA ─── */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="appt">
              <div>
                <div className="eyebrow" style={{marginBottom: 24, color:'var(--gold-soft)'}}>Section 08 <span className="dot"></span> Appointment</div>
                <h2 className="h font-display">A long table,<br/>two chairs, and<br/><em>your stone</em>.</h2>
                <p style={{marginTop: 24, maxWidth: '38ch', color:'var(--text-body)', fontSize: 18}}>
                  Visit our atelier on Lavelle Road in Bangalore, or talk to us on WhatsApp from anywhere in the world. Most consultations begin with a single image.
                </p>
                <div style={{display:'flex', gap: 12, marginTop: 32, flexWrap:'wrap'}}>
                  <button className="btn btn-gold"><Icon name="calendar" size={14} /> Book an appointment</button>
                  <button className="btn btn-outline"><Icon name="whatsapp" size={14} /> Message on WhatsApp</button>
                </div>
              </div>
              <div className="appt-side">
                <div className="appt-card">
                  <Icon name="pin" size={28} className="ico" />
                  <div>
                    <div className="t">Lavelle Road Atelier</div>
                    <div className="d" style={{marginTop:6, fontFamily:'var(--font-body)', fontSize: 14, letterSpacing:0, textTransform:'none', color:'var(--text-mute)'}}>14 Lavelle Road, Bangalore 560001 <br/>Mon–Sat · 10:30 — 19:30</div>
                  </div>
                </div>
                <div className="appt-card">
                  <Icon name="chat" size={28} className="ico" />
                  <div>
                    <div className="t">Reply within the hour</div>
                    <div className="d" style={{marginTop:6, fontFamily:'var(--font-body)', fontSize: 14, letterSpacing:0, textTransform:'none', color:'var(--text-mute)'}}>Send a photo, a sketch, or just an idea. A designer will respond personally — usually within 60 minutes.</div>
                  </div>
                </div>
                <div className="appt-card">
                  <Icon name="package" size={28} className="ico" />
                  <div>
                    <div className="t">Worldwide insured delivery</div>
                    <div className="d" style={{marginTop:6, fontFamily:'var(--font-body)', fontSize: 14, letterSpacing:0, textTransform:'none', color:'var(--text-mute)'}}>Brink-handled, fully insured. India · 3 days. International · 7–10 days.</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

window.HomePage = HomePage;
