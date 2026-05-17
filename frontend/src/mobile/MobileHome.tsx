import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MIcon, MPCard, MReveal } from './MobileShared';
import { SEED_PRODUCTS } from '../lib/seedProducts';
import { api } from '../lib/api';
import { useWishlist } from '../contexts/WishlistContext';

/* ─────────────────────────────────────────────────────────────
   GAJ — Mobile homepage (full scroll)
   Ported from design_extract_mobile/gem/project/mobile-home.jsx
   Section flow:
     Hero → Trust grid → Collections → Custom visualiser →
     Atelier process → Featured grid + editorial →
     Craft story → Testimonial → CTA
   ───────────────────────────────────────────────────────────── */

const COLLECTIONS = [
  { id: 'bridal',   name: 'Bridal',          dv: 'दुल्हन',       count: '24 pieces',   to: '/jewellery?occasion=bridal',   image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=85&auto=format&fit=crop' },
  { id: 'everyday', name: 'Everyday Gold',   dv: 'दैनिक स्वर्ण',   count: '36 pieces',   to: '/jewellery?occasion=everyday', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=85&auto=format&fit=crop' },
  { id: 'gemstone', name: 'Gemstone',        dv: 'रत्न',         count: '28 pieces',   to: '/gems',                        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=85&auto=format&fit=crop' },
  { id: 'heirloom', name: 'Custom Heirloom', dv: 'कुलधरोहर',     count: 'Made to order', to: '/custom',                    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=85&auto=format&fit=crop' },
];

const ATELIER_STEPS = [
  { n: '01', nm: 'Sketched',          dv: 'रेखाचित्र', ds: 'On paper, in the studio, with the person who will wear it. No CAD until the line is right.' },
  { n: '02', nm: 'Stoned',            dv: 'रत्न चयन',  ds: 'Coloured stones above a carat carry GIA or GRS. Our buyer travels to source twice a year.' },
  { n: '03', nm: 'Set',               dv: 'जड़ाई',     ds: 'Cast in 22K or 18K, struck at the Mumbai assay office, set by hand in Jaipur.' },
  { n: '04', nm: 'Polished, forever', dv: 'पॉलिश',     ds: 'Lifetime polish and resize, in our showroom. The piece keeps coming back home.' },
];

const CRAFT = [
  { num: '01', tag: 'Drawing',  name: 'Sketched by hand',  desc: 'Every commission begins on paper, in the studio, with the person who will wear it. No CAD until the line is right.', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop' },
  { num: '02', tag: 'Sourcing', name: 'Stones, certified', desc: 'GIA / GRS reports on every coloured stone above one carat. Our buyer travels to the source twice a year for the rough.', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=900&q=85&auto=format&fit=crop' },
  { num: '03', tag: 'Setting',  name: 'BIS 916 hallmarked', desc: '22K and 18K, struck to standard at the Mumbai assay office. Every gram of gold accounted for, on paper, on request.', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85&auto=format&fit=crop' },
];

const TESTIMONIALS = [
  { q: 'We had a stone my grandmother left us. They re-set it into a necklace for my wedding without telling me it had cracked — they replaced it from their own stock and told me afterwards. That is the studio.', name: 'Aanya Mehra', what: 'Bridal commission · 2025' },
  { q: 'I went in for a band and left, six months later, with the ring I\'d been drawing on napkins for fifteen years. They never once tried to upsell. They asked questions until they understood it.', name: 'Karan & Yashasvi', what: 'Engagement ring · 2024' },
  { q: 'Two generations of my family have bought gold from this house. The price card is still hand-written and the tea is still good. Some things should not change.', name: 'Devika R.', what: 'Everyday gold · 2023' },
];

const FEATURED_TABS = ['All', 'Bridal', 'Everyday', 'Heirloom', 'Polki', 'Gemstone'];

export default function MobileHome() {
  const [products, setProducts] = useState<any[]>(() => SEED_PRODUCTS);
  const [tabIdx, setTabIdx] = useState(0);
  const [stoneIdx, setStoneIdx] = useState(0);
  const [formIdx, setFormIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const { ids: wishIds, toggle: toggleWish } = useWishlist();

  // Pull live product list when API is available (graceful fallback to seed)
  useEffect(() => {
    api.products({}).then((r) => { if (r.products?.length) setProducts(r.products); }).catch(() => {});
  }, []);

  // Rotate testimonial every 8s
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length), 8000);
    return () => clearInterval(t);
  }, []);

  const featured = products.slice(0, 4);
  const editorial = products[4] ?? products[0];
  const inr = (n: number) => '₹ ' + Number(n).toLocaleString('en-IN');
  const t = TESTIMONIALS[testimonialIdx];

  return (
    <>
      {/* HERO ─────────────────────────────────────────── */}
      <motion.section
        className="m-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="ph" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=85&auto=format&fit=crop)' }} />
        <div className="veil" />
        <div className="grain" />
        <div className="content">
          <div className="m-eyebrow" style={{ color: 'var(--gold-soft)' }}>
            <span className="line" style={{ background: 'var(--gold-soft)' }} />
            Refined Indian Atelier · Est. 1995
          </div>
          <h1 className="m-hero-title" style={{ marginTop: 18 }}>
            Stones with stories.<br />
            Gold with <em>feeling</em>.
          </h1>
          <div className="sub">रत्न जो कहानी कहें · सोना जो मन को छुए</div>
          <p className="body">
            A family atelier for hand-sketched Indian jewellery. Naturally-sourced stones, hallmarked 22K &amp; 18K gold, set in our Jaipur workshop.
          </p>
          <div className="actions">
            <Link to="/custom" className="m-btn m-btn-gold m-btn-full">
              <MIcon name="pencil" size={14} /> Begin a Commission
            </Link>
            <Link to="/jewellery" className="m-btn m-btn-outline m-btn-full">
              Browse Jewellery <MIcon name="arr-r" size={14} />
            </Link>
          </div>
          <div className="trustrow">
            <span><MIcon name="shield" size={12} /> BIS 916</span>
            <span><MIcon name="gem" size={12} /> GIA · GRS</span>
            <span><MIcon name="sparkle" size={12} /> Lifetime polish</span>
          </div>
        </div>
        <div className="scrollcue">
          <span>Scroll</span>
          <span className="ln" />
        </div>
      </motion.section>

      {/* TRUST GRID ──────────────────────────────────── */}
      <section style={{ background: 'var(--ink)' }}>
        <div className="m-trust">
          <div className="cell"><MIcon name="shield" size={20} className="ico" /><div><div className="t">BIS 916<br />Hallmark</div><div className="d">On every gram</div></div></div>
          <div className="cell"><MIcon name="gem" size={20} className="ico" /><div><div className="t">Certified<br />Stones</div><div className="d">GIA · GRS · IGI</div></div></div>
          <div className="cell"><MIcon name="sparkle" size={20} className="ico" /><div><div className="t">Lifetime<br />Polish</div><div className="d">Free, in studio</div></div></div>
          <div className="cell"><MIcon name="pencil" size={20} className="ico" /><div><div className="t">Designer<br />Consultation</div><div className="d">By appointment</div></div></div>
        </div>
      </section>

      {/* COLLECTIONS ─────────────────────────────────── */}
      <section className="m-sec maroon">
        <MReveal>
          <div className="m-eyebrow"><span className="line" />Four houses</div>
          <h2 className="m-h2" style={{ marginTop: 14 }}>
            Collections, <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>by occasion</em>.
          </h2>
          <div className="m-deva" style={{ marginTop: 8 }}>संग्रह · चार घराने</div>
        </MReveal>
        <div style={{ height: 28 }} />
        <div className="m-collstack">
          {COLLECTIONS.map((c, i) => (
            <MReveal key={c.id} delay={i * 80}>
              <Link to={c.to} className="m-coll" style={{ display: 'block' }}>
                <div className="ph" style={{ backgroundImage: `url(${c.image})` }} />
                <div className="lbl">
                  <div>
                    <div className="name">{c.name}</div>
                    <div className="dv">{c.dv}</div>
                    <div className="ct">{c.count}</div>
                  </div>
                  <div className="arr"><MIcon name="arr-dr" size={16} /></div>
                </div>
              </Link>
            </MReveal>
          ))}
        </div>
      </section>

      {/* CUSTOM VISUALISER ───────────────────────────── */}
      <section className="m-customblock">
        <MReveal>
          <div className="m-eyebrow" style={{ color: 'var(--gold-soft)' }}>
            <span className="line" style={{ background: 'var(--gold-soft)' }} />
            Make your own
          </div>
          <h2 className="m-h1" style={{ marginTop: 14, color: 'var(--ivory)', fontSize: 42 }}>
            A piece sketched <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>for you</em>, in our hand.
          </h2>
          <div className="m-deva" style={{ marginTop: 10 }}>आपके लिए, हाथ से</div>
          <p style={{ color: 'rgba(251, 248, 243, 0.78)', marginTop: 16, fontSize: 15, maxWidth: '34ch' }}>
            Pick a form, a metal, a stone. Sketches in your inbox within 48 hours. No upsell, no obligation.
          </p>

          <div className="pv">
            <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85&auto=format&fit=crop" alt="Preview" />
            <span className="corner c-tl" /><span className="corner c-tr" />
            <span className="corner c-bl" /><span className="corner c-br" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: 8 }}>Form</div>
              <div className="chips">
                {['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Bridal Suite'].map((c, i) => (
                  <button key={c} className={`chip ${formIdx === i ? 'on' : ''}`} onClick={() => setFormIdx(i)}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--gold-soft)', marginBottom: 8 }}>Centre stone</div>
              <div className="chips">
                {['Ruby', 'Emerald', 'Sapphire', 'Polki', 'Pearl'].map((s, i) => (
                  <button key={s} className={`chip ${stoneIdx === i ? 'on' : ''}`} onClick={() => setStoneIdx(i)}>{s}</button>
                ))}
              </div>
            </div>
          </div>

          <Link to="/custom" className="m-btn m-btn-gold m-btn-full" style={{ marginTop: 26 }}>
            Begin a Commission <MIcon name="arr-r" size={14} />
          </Link>
          <a href="https://wa.me/919816024887" target="_blank" rel="noreferrer" className="m-btn m-btn-outline m-btn-full" style={{ marginTop: 10 }}>
            <MIcon name="whatsapp" size={14} /> WhatsApp a designer
          </a>
        </MReveal>
      </section>

      {/* ATELIER PROCESS ──────────────────────────────── */}
      <section className="m-sec paper">
        <MReveal>
          <div className="m-eyebrow"><span className="line" />The four hands</div>
          <h2 className="m-h2" style={{ marginTop: 14 }}>
            An <em style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>atelier</em>, not an assembly line.
          </h2>
          <div className="m-deva" style={{ marginTop: 8 }}>चार हाथ</div>
        </MReveal>
        <div style={{ height: 28 }} />
        <div className="m-process">
          {ATELIER_STEPS.map((s, i) => (
            <MReveal key={s.n} delay={i * 80}>
              <div className="m-proc-step">
                <div className="n">{s.n}</div>
                <div>
                  <div className="nm">{s.nm}</div>
                  <div className="dv">{s.dv}</div>
                  <div className="ds">{s.ds}</div>
                </div>
              </div>
            </MReveal>
          ))}
        </div>
        <Link to="/about" className="m-link" style={{ marginTop: 32, color: 'var(--gold-deep)' }}>
          Inside the studio <MIcon name="arr-r" size={11} />
        </Link>
      </section>

      {/* FEATURED PRODUCTS ─────────────────────────── */}
      <section className="m-sec maroon">
        <MReveal>
          <div className="m-eyebrow"><span className="line" />At the bench</div>
          <h2 className="m-h2" style={{ marginTop: 14 }}>
            New from the <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>studio</em>.
          </h2>
          <div className="m-deva" style={{ marginTop: 8 }}>नई कारीगरी</div>
        </MReveal>
        <div style={{ height: 28 }} />

        <div className="m-chiprow" style={{ marginBottom: 20 }}>
          {FEATURED_TABS.map((t, i) => (
            <button key={t} className={`m-chip ${tabIdx === i ? 'on' : ''}`} onClick={() => setTabIdx(i)}>{t}</button>
          ))}
        </div>
        <div className="m-pgrid">
          {featured.map((p) => (
            <MPCard
              key={p.id}
              p={p}
              wished={wishIds.has(p.id)}
              onWish={() => toggleWish(p.id, p.name)}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 }}>
          <Link to="/jewellery" className="m-link">All Jewellery <MIcon name="arr-r" size={11} /></Link>
          <span className="m-mute" style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase' }}>
            {products.length} pieces
          </span>
        </div>

        {/* Editorial featured card */}
        {editorial && (
          <Link to={`/jewellery/${editorial.slug}`} className="m-feat" style={{ marginTop: 36, display: 'block' }}>
            <div className="ph"><img src={editorial.images?.[0]} alt={editorial.name} /></div>
            <div className="lab">
              <div className="tg">Heirloom · This Season</div>
              <div className="nm">{editorial.name}</div>
              {editorial.hindi && <div className="dv">{editorial.hindi}</div>}
              <div className="pr">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(247, 242, 234, 0.6)', marginRight: 6 }}>
                  From
                </span>
                {inr(editorial.basePrice)}
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* CRAFT STORY ─────────────────────────────────── */}
      <section className="m-sec ink">
        <MReveal>
          <div className="m-eyebrow"><span className="line" />At the bench</div>
          <h2 className="m-h2" style={{ marginTop: 14 }}>
            A workshop of <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>four hands</em>.
          </h2>
          <div className="m-deva" style={{ marginTop: 8 }}>कार्यशाला</div>
        </MReveal>
        <div style={{ height: 28 }} />
        <div className="m-craft">
          {CRAFT.map((c, i) => (
            <MReveal key={c.num} delay={i * 80}>
              <div className="item">
                <div className="ph"><img src={c.image} alt={c.name} /></div>
                <div className="n">{c.num} · {c.tag}</div>
                <div className="nm">{c.name}</div>
                <div className="ds">{c.desc}</div>
              </div>
            </MReveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL CAROUSEL ───────────────────────── */}
      <section className="m-sec ivory">
        <MReveal>
          <div className="m-eyebrow"><span className="line" />Letters from clients</div>
          <h2 className="m-h2" style={{ marginTop: 14 }}>
            In their <em style={{ fontStyle: 'italic', color: 'var(--gold-deep)' }}>own words</em>.
          </h2>
          <div className="m-deva" style={{ marginTop: 8 }}>ग्राहक के बोल</div>
        </MReveal>
        <div style={{ height: 28 }} />
        <div className="m-testi">
          <div className="q" style={{ color: 'var(--ink)' }}>{t.q}</div>
          <div>
            <div className="name" style={{ color: 'var(--ink)' }}>{t.name}</div>
            <div className="what">{t.what}</div>
          </div>
          <div className="m-testi-dots" role="tablist">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                className={testimonialIdx === i ? 'on' : ''}
                role="tab"
                aria-selected={testimonialIdx === i}
                onClick={() => setTestimonialIdx(i)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA ─────────────────────────────────────────── */}
      <section className="m-cta">
        <div className="m-eyebrow" style={{ color: 'var(--gold-soft)' }}>
          <span className="line" style={{ background: 'var(--gold-soft)' }} />
          Begin
        </div>
        <h2 className="h" style={{ marginTop: 14 }}>
          Come into the studio,<br />
          or <em>start on your phone</em>.
        </h2>
        <p style={{ color: 'rgba(247, 242, 234, 0.76)', marginTop: 16, fontSize: 15, maxWidth: '32ch' }}>
          Tell us what you're imagining. We'll send sketches within 48 hours — no upsell, no obligation.
        </p>
        <div className="actions">
          <Link to="/custom" className="m-btn m-btn-gold m-btn-full">Book a Consultation</Link>
          <a href="https://wa.me/919816024887" target="_blank" rel="noreferrer" className="m-btn m-btn-wa m-btn-full">
            <MIcon name="whatsapp" size={16} /> WhatsApp +91 98160 24887
          </a>
          <a href="tel:+919816024887" className="m-btn m-btn-outline m-btn-full">
            <MIcon name="phone" size={14} /> Call the studio
          </a>
        </div>
        <div className="meta">
          <div>
            <div className="k">Showroom</div>
            <div className="v">MG Road, Bangalore</div>
            <div className="s">Mon–Sat · 11–8</div>
          </div>
          <div>
            <div className="k">Atelier</div>
            <div className="v">Johari Bazaar, Jaipur</div>
            <div className="s">By appointment</div>
          </div>
        </div>
      </section>
    </>
  );
}
