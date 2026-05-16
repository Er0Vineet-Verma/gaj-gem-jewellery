/* ─────────────────────────────────────────────────────────────
   GAJ — Catalogue + Product Detail pages
   ───────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: 'all', label: 'All Jewellery' },
  { id: 'rings', label: 'Rings' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'sets', label: 'Bridal Suites' }
];

const SORTS = ['Curated', 'Newest', 'Price · Low to high', 'Price · High to low'];

const CataloguePage = ({ goto, openProduct, wishlist, toggleWish }) => {
  const { PRODUCTS, formatINR } = window.GAJ_DATA;
  const [cat, setCat] = React.useState('all');
  const [sort, setSort] = React.useState('Curated');
  const [stoneFilters, setStoneFilters] = React.useState([]);
  const [metalFilters, setMetalFilters] = React.useState([]);
  const [occasionFilters, setOccasionFilters] = React.useState([]);
  const [priceMax, setPriceMax] = React.useState(1500000);

  const toggle = (arr, set, v) => {
    set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };

  const filtered = PRODUCTS.filter(p => {
    if (cat !== 'all' && p.category !== cat) return false;
    if (stoneFilters.length && !stoneFilters.includes(p.stone)) return false;
    if (metalFilters.length && !metalFilters.some(m => p.metal.includes(m))) return false;
    if (occasionFilters.length && !occasionFilters.includes(p.occasion)) return false;
    if (p.price > priceMax) return false;
    return true;
  });

  return (
    <>
      <div className="shell cat-head">
        <Crumbs items={[
          { label: 'Atelier', onClick: () => goto('home') },
          { label: 'Jewellery' }
        ]} />
        <h1 className="title font-display" style={{marginTop: 24}}>
          The <em style={{fontStyle:'italic', color:'var(--gold)'}}>collection</em>.
        </h1>
        <div className="deva">समस्त आभूषण <span style={{margin:'0 12px', color:'var(--muted)'}}>·</span>
          <span style={{fontFamily:'var(--font-mono)', fontSize: 12, color:'var(--muted)', letterSpacing:'.16em', textTransform:'uppercase'}}>{PRODUCTS.length} pieces, hand-finished</span>
        </div>
      </div>

      <div className="shell cat-controls">
        <div className="left">
          {CATEGORIES.map(c => (
            <button key={c.id} className={`filter-chip ${cat === c.id ? 'active' : ''}`}
              onClick={() => setCat(c.id)}>{c.label}</button>
          ))}
        </div>
        <div style={{display:'flex', gap: 24, alignItems:'center'}}>
          <span style={{fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.16em', textTransform:'uppercase', color:'var(--muted)'}}>Sort</span>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{background:'transparent', border:0, color:'inherit', fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.16em', textTransform:'uppercase', cursor:'pointer', outline:'none'}}>
            {SORTS.map(s => <option key={s} value={s} style={{background:'var(--ink)'}}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="shell cat-body">
        <aside className="cat-sidebar">
          <div>
            <h6>Stone</h6>
            {['Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Polki Diamond', 'Pink Sapphire'].map(s => (
              <label key={s} className="opt">
                <span><input type="checkbox" checked={stoneFilters.includes(s)} onChange={() => toggle(stoneFilters, setStoneFilters, s)} />{s}</span>
                <span className="ct">{PRODUCTS.filter(p => p.stone === s).length}</span>
              </label>
            ))}
          </div>
          <div>
            <h6>Metal</h6>
            {['22K Yellow', '18K Yellow', '18K White', '18K Rose', 'Platinum'].map(m => (
              <label key={m} className="opt">
                <span><input type="checkbox" checked={metalFilters.includes(m)} onChange={() => toggle(metalFilters, setMetalFilters, m)} />{m}</span>
                <span className="ct">{PRODUCTS.filter(p => p.metal.includes(m)).length}</span>
              </label>
            ))}
          </div>
          <div>
            <h6>Occasion</h6>
            {['Bridal', 'Everyday', 'Festive', 'Heirloom'].map(o => (
              <label key={o} className="opt">
                <span><input type="checkbox" checked={occasionFilters.includes(o)} onChange={() => toggle(occasionFilters, setOccasionFilters, o)} />{o}</span>
                <span className="ct">{PRODUCTS.filter(p => p.occasion === o).length}</span>
              </label>
            ))}
          </div>
          <div>
            <h6>Price</h6>
            <input type="range" min="40000" max="1500000" step="20000" value={priceMax} onChange={e => setPriceMax(+e.target.value)}
              style={{width:'100%', accentColor:'var(--gold)'}}/>
            <div style={{display:'flex', justifyContent:'space-between', fontFamily:'var(--font-mono)', fontSize: 11, color:'var(--muted)', letterSpacing:'.16em', marginTop: 8}}>
              <span>₹ 40K</span><span style={{color:'var(--gold)'}}>{formatINR(priceMax)}</span>
            </div>
          </div>
        </aside>

        <div>
          <div className="cat-results-meta">
            <span>{filtered.length} pieces · {cat === 'all' ? 'all categories' : cat}</span>
            <span>View · Grid · List</span>
          </div>
          <div className="product-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p}
                onClick={() => openProduct(p.id)}
                wished={wishlist.includes(p.id)}
                onWish={() => toggleWish(p.id)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty-state">
              <Icon name="gem" size={48} className="ico" />
              <h3 className="font-display">No matches in the case today.</h3>
              <p>Loosen a filter — or have us make one. Most of what we sell starts as a custom request.</p>
              <button className="btn btn-gold" onClick={() => goto('custom')}>Start a custom piece</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ProductPage = ({ productId, goto, openProduct, wishlist, toggleWish, addToCart }) => {
  const { PRODUCTS, formatINR } = window.GAJ_DATA;
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [activeImg, setActiveImg] = React.useState(0);
  const [metal, setMetal] = React.useState('yg22');
  const [size, setSize] = React.useState('14');

  const related = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.stone === product.stone)).slice(0, 4);

  return (
    <>
      <div className="shell pdp">
        <div className="pdp-gallery">
          <div className="main"><img src={product.images[activeImg]} alt={product.name} /></div>
          <div className="pdp-thumbs">
            {product.images.map((src, i) => (
              <div key={i} className={`thumb ${i === activeImg ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                <img src={src} alt={`view ${i+1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="pdp-side">
          <Crumbs items={[
            { label: 'Atelier', onClick: () => goto('home') },
            { label: 'Jewellery', onClick: () => goto('catalogue') },
            { label: product.category, onClick: () => goto('catalogue') },
            { label: product.name }
          ]} />
          <h1 className="name font-display">{product.name}</h1>
          <div className="deva font-deva">{product.deva}</div>
          <div className="price"><span className="from">From</span>{formatINR(product.price)}</div>
          <div className="vat">Inclusive of GST · Today's gold rate ₹ 7,420 / g · 22K</div>

          <div className="pdp-spec">
            <h6>Metal</h6>
            <div className="row gap-3" style={{flexWrap:'wrap'}}>
              {[
                {id:'yg22', cls:'swatch-yg', l:'22K'},
                {id:'yg18', cls:'swatch-yg', l:'18K'},
                {id:'wg', cls:'swatch-wg', l:'White'},
                {id:'rg', cls:'swatch-rg', l:'Rose'},
                {id:'pt', cls:'swatch-pt', l:'Platinum'}
              ].map(s => (
                <div key={s.id} className={`swatch ${metal === s.id ? 'active' : ''}`} onClick={() => setMetal(s.id)}>
                  <div className={`dot ${s.cls}`}></div>
                  <div className="l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pdp-spec">
            <h6>Size (Indian)</h6>
            <div className="row gap-3" style={{flexWrap:'wrap'}}>
              {['10','12','14','16','18','20'].map(s => (
                <button key={s} className={`size-btn ${size === s ? 'active' : ''}`} onClick={() => setSize(s)}>{s}</button>
              ))}
              <button className="size-btn" style={{minWidth: 'auto', padding: '12px 18px'}}>
                <Icon name="ruler" size={12} style={{marginRight: 6, verticalAlign:'middle'}}/> Sizing guide
              </button>
            </div>
          </div>

          <div className="pdp-cta">
            <button className="btn btn-gold btn-full" onClick={() => { addToCart(product.id, { metal, size }); goto('cart'); }}>
              <Icon name="bag" size={14} /> Add to bag · {formatINR(product.price)}
            </button>
            <div className="row gap-3" style={{width:'100%'}}>
              <button className="btn btn-outline" style={{flex:1, justifyContent:'center'}} onClick={() => toggleWish(product.id)}>
                <Icon name={wishlist.includes(product.id) ? 'heart-fill' : 'heart'} size={14} />
                {wishlist.includes(product.id) ? 'Wishlisted' : 'Wishlist'}
              </button>
              <button className="btn btn-outline" style={{flex:1, justifyContent:'center'}}>
                <Icon name="whatsapp" size={14} /> Consult on WhatsApp
              </button>
            </div>
          </div>

          <div className="pdp-trust">
            <div className="tx"><Icon name="shield" size={16} /> BIS 916 hallmark</div>
            <div className="tx"><Icon name="gem" size={16} /> GIA / GRS report</div>
            <div className="tx"><Icon name="sparkle" size={16} /> Lifetime polish</div>
            <div className="tx"><Icon name="package" size={16} /> Insured delivery</div>
            <div className="tx"><Icon name="ruler" size={16} /> Free resize · 60 days</div>
            <div className="tx"><Icon name="leaf" size={16} /> Mine-traceable stone</div>
          </div>
        </div>
      </div>

      {/* ─── Story + spec ─── */}
      <section className="pdp-detail-section">
        <div className="shell pdp-detail-grid">
          <div className="pdp-story">
            <div className="eyebrow" style={{marginBottom: 24}}>The Piece <span className="dot"></span> Origin</div>
            <h2 className="font-display" style={{fontSize: 'clamp(32px, 3.5vw, 48px)', lineHeight: 1.1, marginBottom: 24}}>
              Where the stone <em style={{color:'var(--gold)', fontStyle:'italic'}}>came from</em>.
            </h2>
            <p>{product.story}</p>
            <p style={{marginTop: 16}}>
              The mount is hand-set by Mohan, who has worked at the bench in our atelier for twenty-eight years. The piece will be photographed on the wearer's hand before it is sent — you choose what is kept on file and what is not.
            </p>
            <div style={{marginTop: 32}}>
              <button className="link-arrow"><Icon name="pencil" size={12} /> Read the build log</button>
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{marginBottom: 24}}>Specification <span className="dot"></span> On Paper</div>
            <div className="col" style={{gap: 0}}>
              {Object.entries(product.spec).map(([k, v], i) => (
                <div key={k} style={{display:'grid', gridTemplateColumns:'180px 1fr', padding: '16px 0', borderTop: i === 0 ? 'none' : '1px solid var(--hairline)', gap: 24}}>
                  <span style={{fontFamily:'var(--font-mono)', fontSize: 11, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--gold)'}}>{k}</span>
                  <span style={{fontFamily:'var(--font-display)', fontSize: 18}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Related ─── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <div>
              <div className="eyebrow" style={{marginBottom: 16}}>Pairs with <span className="dot"></span> From the case</div>
              <h2 className="title font-display">You may <em>also</em> like.</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map(p => (
              <ProductCard key={p.id} product={p}
                onClick={() => { openProduct(p.id); window.scrollTo({top:0, behavior:'smooth'}); }}
                wished={wishlist.includes(p.id)}
                onWish={() => toggleWish(p.id)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

window.CataloguePage = CataloguePage;
window.ProductPage = ProductPage;
