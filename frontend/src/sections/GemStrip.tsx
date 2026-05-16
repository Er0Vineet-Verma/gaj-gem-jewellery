import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { api } from '../lib/api';
import type { Gem } from '../types';

export default function GemStrip() {
  const [gems, setGems] = useState<Gem[]>([]);

  useEffect(() => {
    api.gems().then(r => setGems(r.gems)).catch(() => {});
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative py-12 bg-warm border-y hairline"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-y-2 gap-x-4 mb-6">
          <div>
            <div className="eyebrow mb-2">Gemstones</div>
            <h2 className="font-display text-2xl sm:text-3xl mt-1">Choose your stone <span className="font-deva text-lg sm:text-xl muted">अपना रत्न चुनें</span></h2>
          </div>
          <Link to="/gems" className="text-sm gold-text inline-flex items-center gap-1.5">All stones <Icon name="arrow-right" size={14} /></Link>
        </div>
        <div className="overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {gems.map(g => (
              <Link to={`/gems#${g.id}`} key={g.id} className="gem-chip">
                <span className="gem-swatch" style={{ background: g.color }} />
                <span className="text-xs font-medium">{g.en}</span>
                <span className="font-deva text-[11px] muted">{g.hi}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
