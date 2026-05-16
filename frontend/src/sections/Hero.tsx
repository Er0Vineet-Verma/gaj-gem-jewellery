import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { api } from '../lib/api';
import { inr } from '../lib/format';
import type { Rate } from '../types';

export default function Hero() {
  const [gold22k, setGold22k] = useState<Rate | null>(null);
  const [updatedAt, setUpdatedAt] = useState('09:00 IST');

  useEffect(() => {
    let live = true;
    api.rates().then((r) => {
      if (!live) return;
      const g = r.rates.find((x) => /22k/i.test(x.label)) ?? r.rates[0] ?? null;
      setGold22k(g);
      try {
        setUpdatedAt(
          new Date(r.updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'
        );
      } catch { /* keep default */ }
    }).catch(() => { /* keep defaults */ });
    return () => { live = false; };
  }, []);

  const goldDisplay = gold22k ? `${inr(gold22k.pricePerGram)}` : '₹ 7,420';

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div
        className="hero-photo"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=2000&q=90&auto=format&fit=crop)' }}
      />
      <div className="hero-grain" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.6, 0.2, 1] }}
        className="shell hero-content"
      >
        <div className="hero-eyebrow-row">
          <span className="line" />
          <span className="eyebrow">Refined Indian Atelier <span className="dot" /> Est. 1995</span>
        </div>

        <h1 className="hero-title font-display">
          <span style={{ display: 'block' }}>Stones with</span>
          <span style={{ display: 'block' }}>stories. <em>Gold</em></span>
          <span style={{ display: 'block' }}>with feeling.</span>
        </h1>

        <div className="hero-deva font-deva">रत्न जो कहानी कहें · सोना जो मन को छुए</div>

        <div className="hero-grid" style={{ marginTop: 48 }}>
          <div>
            <p className="hero-lead">
              Hand-finished pieces in 22K and 18K gold, set with naturally-sourced gemstones —
              ruby, emerald, sapphire, pearl, polki. Sketched by hand. Made for one.
            </p>

            <div className="hero-actions">
              <Link to="/custom" className="btn btn-gold">
                <Icon name="pencil" size={14} /> Start a custom piece
              </Link>
              <Link to="/jewellery" className="btn btn-outline" style={{ color: 'var(--ivory)', borderColor: 'rgba(247,242,234,.25)' }}>
                Browse jewellery <Icon name="arrow-right" size={14} />
              </Link>
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
            </div>
            <div className="kv">
              <span>Today's gold rate</span>
              <span className="v font-display">
                {goldDisplay}
                <span className="hero-meta-unit">/ gram · 22K</span>
              </span>
              <span className="sub" style={{ color: 'var(--gold)', textTransform: 'none', letterSpacing: 0 }}>
                Updated daily at {updatedAt}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
