/* ─────────────────────────────────────────────────────────────
   GAJ — Custom Design flow + Cart + Wishlist pages
   ───────────────────────────────────────────────────────────── */

const CustomPage = ({ goto }) => {
  const { CUSTOM_FORMS, CUSTOM_METALS, CUSTOM_STONES, formatINR } = window.GAJ_DATA;
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState('');
  const [metal, setMetal] = React.useState('');
  const [stone, setStone] = React.useState('');
  const [budget, setBudget] = React.useState(400000);
  const [contact, setContact] = React.useState({ name: '', email: '', phone: '', note: '' });

  const steps = ['Form', 'Metal', 'Stone', 'Brief'];

  const selectedForm = CUSTOM_FORMS.find(f => f.id === form);
  const selectedMetal = CUSTOM_METALS.find(m => m.id === metal);
  const selectedStone = CUSTOM_STONES.find(s => s.id === stone);

  const previewImage = selectedForm ? selectedForm.image : 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85&auto=format&fit=crop';

  const canNext = () => {
    if (step === 0) return !!form;
    if (step === 1) return !!metal;
    if (step === 2) return !!stone;
    if (step === 3) return contact.name && contact.email;
    return false;
  };

  return (
    <div className="custom-page">
      <div className="custom-side">
        <Crumbs items={[{ label: 'Atelier', onClick: () => goto('home') }, { label: 'Custom' }]} />
        <h2 className="font-display" style={{fontSize: 36, lineHeight: 1.1, marginTop: 16, marginBottom: 8}}>
          The <em style={{color:'var(--gold)', fontStyle:'italic'}}>commission</em>.
        </h2>
        <div className="font-deva" style={{color:'var(--gold-soft)', marginBottom: 32}}>विशेष आदेश</div>
        <div className="stepper">
          {steps.map((s, i) => (
            <div key={i} className={`custom-step-li ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
              onClick={() => { if (i <= step) setStep(i); }}>
              <span className="n">{i < step ? <Icon name="check" size={12}/> : (i+1).toString().padStart(2,'0')}</span>
              <span className="label">{s}</span>
            </div>
          ))}
        </div>
        <div style={{fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom: 16}}>What happens next</div>
        <ul style={{margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 14, color:'var(--text-body)'}}>
          <li style={{display:'grid', gridTemplateColumns:'24px 1fr', gap: 12}}>
            <span style={{color:'var(--gold)', fontFamily:'var(--font-mono)', fontSize: 11, marginTop: 2}}>01</span>
            <span>A designer calls within 24 hours.</span>
          </li>
          <li style={{display:'grid', gridTemplateColumns:'24px 1fr', gap: 12}}>
            <span style={{color:'var(--gold)', fontFamily:'var(--font-mono)', fontSize: 11, marginTop: 2}}>02</span>
            <span>Hand-drawn sketch &amp; quote within 7 days.</span>
          </li>
          <li style={{display:'grid', gridTemplateColumns:'24px 1fr', gap: 12}}>
            <span style={{color:'var(--gold)', fontFamily:'var(--font-mono)', fontSize: 11, marginTop: 2}}>03</span>
            <span>40% deposit, photos of every stage, balance on delivery.</span>
          </li>
          <li style={{display:'grid', gridTemplateColumns:'24px 1fr', gap: 12}}>
            <span style={{color:'var(--gold)', fontFamily:'var(--font-mono)', fontSize: 11, marginTop: 2}}>04</span>
            <span>Build time 8–18 weeks depending on the piece.</span>
          </li>
        </ul>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
        <div className="custom-main">
          {step === 0 && (
            <>
              <div className="eyebrow" style={{marginBottom: 16}}>Step 01 / 04 <span className="dot"></span> Form</div>
              <h2 className="font-display">What shape is the <em>piece</em>?</h2>
              <p className="sub">Pick a form. We will guide everything that follows from this choice. You can change it on the phone with the designer.</p>
              <div className="choice-grid">
                {CUSTOM_FORMS.map(f => (
                  <div key={f.id} className={`choice-card ${form === f.id ? 'active' : ''}`} onClick={() => setForm(f.id)}>
                    <div className="photo"><img src={f.image} alt={f.name}/></div>
                    <div className="name">{f.name}</div>
                    <div className="deva">{f.deva}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="eyebrow" style={{marginBottom: 16}}>Step 02 / 04 <span className="dot"></span> Metal</div>
              <h2 className="font-display">Which <em>metal</em>?</h2>
              <p className="sub">22K reads softer and more traditional; 18K is harder and holds prong-set stones better. Pick what you'll wear — we can change purity later without changing the design.</p>
              <div className="choice-grid">
                {CUSTOM_METALS.map(m => (
                  <div key={m.id} className={`choice-card ${metal === m.id ? 'active' : ''}`} onClick={() => setMetal(m.id)}>
                    <div className="photo"><div className={`swatch-fill ${m.cls}`}></div></div>
                    <div className="name">{m.name}</div>
                    <div className="deva">{m.deva}</div>
                    <div className="meta">{m.note}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="eyebrow" style={{marginBottom: 16}}>Step 03 / 04 <span className="dot"></span> Stone</div>
              <h2 className="font-display">A <em>stone</em>, perhaps.</h2>
              <p className="sub">If you have a stone already — heirloom or otherwise — we can build around it. Otherwise pick a family and our buyer will show you four options against your sketch.</p>
              <div className="choice-grid">
                {CUSTOM_STONES.map(s => (
                  <div key={s.id} className={`choice-card ${stone === s.id ? 'active' : ''}`} onClick={() => setStone(s.id)}>
                    <div className="photo"><div className="swatch-fill" style={{background: s.color}}></div></div>
                    <div className="name">{s.name}</div>
                    <div className="deva">{s.deva}</div>
                  </div>
                ))}
              </div>
              <div className="budget-slider" style={{marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--hairline)'}}>
                <div className="vals"><span>Budget</span><span>Adjustable later</span></div>
                <div className="current">{formatINR(budget)}</div>
                <input type="range" min="80000" max="2500000" step="20000" value={budget} onChange={e => setBudget(+e.target.value)} />
                <div className="vals" style={{marginTop: 8}}><span>₹ 80,000</span><span>₹ 25,00,000+</span></div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="eyebrow" style={{marginBottom: 16}}>Step 04 / 04 <span className="dot"></span> Brief</div>
              <h2 className="font-display">Tell us, <em>briefly</em>.</h2>
              <p className="sub">Anything you've drawn, photographed, or thought about for too long. We do our best work when we know the why.</p>
              <div className="custom-form-grid">
                <div className="field">
                  <label>Your name</label>
                  <input value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} placeholder="Aanya Mehra"/>
                </div>
                <div className="field">
                  <label>Email</label>
                  <input value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} placeholder="aanya@..."/>
                </div>
                <div className="field">
                  <label>Phone / WhatsApp</label>
                  <input value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} placeholder="+91 ..."/>
                </div>
                <div className="field">
                  <label>Occasion</label>
                  <select>
                    <option style={{background:'var(--ink)'}}>Engagement / wedding</option>
                    <option style={{background:'var(--ink)'}}>Anniversary</option>
                    <option style={{background:'var(--ink)'}}>Heirloom remake</option>
                    <option style={{background:'var(--ink)'}}>Personal</option>
                    <option style={{background:'var(--ink)'}}>Gift</option>
                  </select>
                </div>
              </div>
              <div className="field" style={{marginBottom: 24}}>
                <label>What is on your mind?</label>
                <textarea rows="5" value={contact.note} onChange={e => setContact({...contact, note: e.target.value})}
                  placeholder="A ring my nani left me. The setting is cracked, but the ruby is good. I want to wear it every day. Can you make something that doesn't look like a wedding ring?"></textarea>
              </div>
              <div style={{border:'1px dashed var(--hairline-2)', padding: 24, textAlign:'center', fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)'}}>
                <Icon name="pencil" size={16} style={{display:'block', margin:'0 auto 8px', color:'var(--gold)'}} />
                Drop a reference image or sketch <span style={{color:'var(--gold)', cursor:'pointer'}}>(browse)</span>
              </div>
            </>
          )}

          <div className="custom-nav">
            {step > 0 && (
              <button className="btn btn-outline" onClick={() => setStep(step - 1)}>
                <Icon name="arrow-left" size={14}/> Back
              </button>
            )}
            {step < 3 && (
              <button className="btn btn-gold" disabled={!canNext()}
                style={{opacity: canNext() ? 1 : 0.4, cursor: canNext() ? 'pointer' : 'not-allowed'}}
                onClick={() => canNext() && setStep(step + 1)}>
                Continue <Icon name="arrow-right" size={14}/>
              </button>
            )}
            {step === 3 && (
              <button className="btn btn-gold" disabled={!canNext()}
                style={{opacity: canNext() ? 1 : 0.4}}
                onClick={() => canNext() && alert('Brief submitted — a designer will be in touch within 24 hours.')}>
                Send brief <Icon name="arrow-right" size={14}/>
              </button>
            )}
          </div>
        </div>

        <div className="custom-preview-side">
          <div className="row between center">
            <h6>Live preview</h6>
            <span style={{fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)'}}>Indicative · Final sketch by hand</span>
          </div>
          <div className="custom-preview-img">
            <img src={previewImage} alt="preview" key={previewImage} style={{animation: 'fadeIn .6s ease'}}/>
            {selectedStone && (
              <div style={{position:'absolute', bottom: 24, left: 24, display:'flex', alignItems:'center', gap: 12, padding: '8px 14px', background:'rgba(11,10,12,.65)', backdropFilter:'blur(8px)'}}>
                <div style={{width: 14, height: 14, borderRadius: '50%', background: selectedStone.color, boxShadow:'inset 0 -3px 4px rgba(0,0,0,.4)'}}></div>
                <span style={{fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--ivory)'}}>{selectedStone.name}</span>
              </div>
            )}
          </div>
          <div className="custom-summary">
            <div>
              <div className="k">Form</div>
              <div className={`v ${!selectedForm ? 'empty' : ''}`}>{selectedForm ? selectedForm.name : 'Not chosen'}</div>
            </div>
            <div>
              <div className="k">Metal</div>
              <div className={`v ${!selectedMetal ? 'empty' : ''}`}>{selectedMetal ? selectedMetal.name.replace('Yellow ','Y ').replace('White ','W ').replace('Rose ','R ') : 'Not chosen'}</div>
            </div>
            <div>
              <div className="k">Stone</div>
              <div className={`v ${!selectedStone ? 'empty' : ''}`}>{selectedStone ? selectedStone.name : 'Not chosen'}</div>
            </div>
            <div>
              <div className="k">Budget</div>
              <div className="v">{formatINR(budget)}</div>
            </div>
          </div>
          <div style={{marginTop:'auto', paddingTop: 24, borderTop:'1px solid var(--hairline)', display:'flex', gap: 16, alignItems:'center'}}>
            <Icon name="chat" size={20} style={{color:'var(--gold)'}} />
            <div>
              <div style={{fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.22em', textTransform:'uppercase', color:'var(--gold-soft)'}}>Speaking now</div>
              <div style={{fontFamily:'var(--font-display)', fontSize: 16}}>Pranati · Senior designer · 4 yrs at GAJ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ goto, cart, updateCart, removeFromCart }) => {
  const { PRODUCTS, formatINR } = window.GAJ_DATA;
  const items = cart.map(c => ({ ...c, product: PRODUCTS.find(p => p.id === c.id) })).filter(c => c.product);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const making = Math.round(subtotal * 0.08);
  const gst = Math.round((subtotal + making) * 0.03);
  const total = subtotal + making + gst;

  if (items.length === 0) {
    return (
      <div className="shell" style={{padding: '64px 0'}}>
        <Crumbs items={[{ label: 'Atelier', onClick: () => goto('home') }, { label: 'Bag' }]} />
        <div className="empty-state">
          <Icon name="bag" size={48} className="ico" />
          <h3 className="font-display">Your bag is empty.</h3>
          <p>Nothing inside yet. The case is open downstairs.</p>
          <button className="btn btn-gold" onClick={() => goto('catalogue')}>Browse jewellery <Icon name="arrow-right" size={14}/></button>
        </div>
      </div>
    );
  }

  return (
    <div className="shell">
      <div style={{padding:'48px 0 0'}}>
        <Crumbs items={[{ label: 'Atelier', onClick: () => goto('home') }, { label: 'Bag' }]} />
        <h1 className="font-display" style={{fontSize: 'clamp(36px, 5vw, 64px)', marginTop: 16, marginBottom: 8}}>
          Your <em style={{color:'var(--gold)', fontStyle:'italic'}}>bag</em>.
        </h1>
        <div className="font-deva" style={{color:'var(--gold-soft)', marginBottom: 8}}>आपकी थैली</div>
      </div>
      <div className="cart-grid">
        <div>
          {items.map(({ product, qty, metal, size }, i) => (
            <div key={i} className="cart-row">
              <div className="photo"><img src={product.images[0]} alt={product.name} /></div>
              <div>
                <div className="name">{product.name}</div>
                <div className="deva font-deva">{product.deva}</div>
                <div className="specs">
                  <span>Metal · {metal || '22K'}</span>
                  <span>Size · {size || '14'}</span>
                  <span>Stone · {product.stone}</span>
                </div>
                <div className="qty">
                  <button onClick={() => updateCart(i, Math.max(1, qty - 1))}><Icon name="minus" size={12}/></button>
                  <span className="n">{qty}</span>
                  <button onClick={() => updateCart(i, qty + 1)}><Icon name="plus" size={12}/></button>
                </div>
              </div>
              <div>
                <div className="price font-display">{formatINR(product.price * qty)}</div>
                <button className="remove" onClick={() => removeFromCart(i)}>Remove</button>
              </div>
            </div>
          ))}
          <div style={{marginTop: 32, padding: 24, border:'1px solid var(--hairline-2)', display:'flex', gap: 16, alignItems:'center'}}>
            <Icon name="sparkle" size={28} style={{color:'var(--gold)', flexShrink:0}} />
            <div>
              <div style={{fontFamily:'var(--font-display)', fontSize: 18, marginBottom: 4}}>A complimentary engraving with every order.</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)'}}>Two lines, on the band or the clasp · added at the bench</div>
            </div>
          </div>
        </div>
        <div className="cart-summary">
          <h3>Summary</h3>
          <div className="line"><span>Subtotal · {items.length} {items.length === 1 ? 'piece' : 'pieces'}</span><span>{formatINR(subtotal)}</span></div>
          <div className="line"><span>Making · 8%</span><span>{formatINR(making)}</span></div>
          <div className="line"><span>GST · 3%</span><span>{formatINR(gst)}</span></div>
          <div className="line"><span>Insured delivery</span><span style={{color:'var(--gold)'}}>Complimentary</span></div>
          <div className="line total"><span>Total</span><span>{formatINR(total)}</span></div>
          <button className="btn btn-gold btn-full" style={{marginTop: 24}}>
            Proceed to checkout <Icon name="arrow-right" size={14}/>
          </button>
          <button className="btn btn-outline btn-full" style={{marginTop: 8}}>
            <Icon name="whatsapp" size={14}/> Hold &amp; discuss on WhatsApp
          </button>
          <div style={{marginTop: 24, paddingTop: 24, borderTop:'1px solid var(--hairline)', display:'flex', flexDirection:'column', gap: 12, fontFamily:'var(--font-mono)', fontSize: 10, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)'}}>
            <span><Icon name="shield" size={14} style={{verticalAlign:'middle', color:'var(--gold)', marginRight: 8}}/> BIS hallmark on every piece</span>
            <span><Icon name="ruler" size={14} style={{verticalAlign:'middle', color:'var(--gold)', marginRight: 8}}/> Free resize within 60 days</span>
            <span><Icon name="package" size={14} style={{verticalAlign:'middle', color:'var(--gold)', marginRight: 8}}/> 14-day return on stocked pieces</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const WishlistPage = ({ goto, openProduct, wishlist, toggleWish, addToCart }) => {
  const { PRODUCTS } = window.GAJ_DATA;
  const items = wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="shell">
      <div style={{padding:'48px 0 0'}}>
        <Crumbs items={[{ label: 'Atelier', onClick: () => goto('home') }, { label: 'Wishlist' }]} />
        <div className="row between" style={{alignItems:'flex-end', flexWrap:'wrap', gap: 24, marginTop: 16}}>
          <div>
            <h1 className="font-display" style={{fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: 8}}>
              The <em style={{color:'var(--gold)', fontStyle:'italic'}}>wishlist</em>.
            </h1>
            <div className="font-deva" style={{color:'var(--gold-soft)'}}>पसंद की सूची <span style={{margin:'0 12px', color:'var(--muted)'}}>·</span>
              <span style={{fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--muted)', letterSpacing:'.16em', textTransform:'uppercase'}}>{items.length} {items.length === 1 ? 'piece kept' : 'pieces kept'}</span>
            </div>
          </div>
          {items.length > 0 && (
            <button className="btn btn-outline"><Icon name="whatsapp" size={14}/> Share list with a designer</button>
          )}
        </div>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <Icon name="heart" size={48} className="ico" />
          <h3 className="font-display">Nothing kept yet.</h3>
          <p>Tap the heart on any piece. We will hold it for you and notify you if its making rate changes.</p>
          <button className="btn btn-gold" onClick={() => goto('catalogue')}>Browse jewellery <Icon name="arrow-right" size={14}/></button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {items.map(p => (
            <ProductCard key={p.id} product={p}
              onClick={() => openProduct(p.id)}
              wished={true}
              onWish={() => toggleWish(p.id)} />
          ))}
        </div>
      )}
    </div>
  );
};

window.CustomPage = CustomPage;
window.CartPage = CartPage;
window.WishlistPage = WishlistPage;
