import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const TILES = [
  {
    img: 'https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=600&auto=format&fit=crop&q=80',
    t: 'Roop Ruby', slug: 'roop-ruby-ring',
  },
  {
    img: 'https://images.unsplash.com/photo-1685489802596-673d1b55bd38?w=600&auto=format&fit=crop&q=80',
    t: 'Panna Leaf', slug: 'panna-leaf-pendant',
  },
  {
    img: 'https://images.unsplash.com/photo-1671644730555-916aa8d8157f?w=600&auto=format&fit=crop&q=80',
    t: 'Neelam Drops', slug: 'neelam-drop-earrings',
  },
  {
    img: 'https://images.unsplash.com/photo-1591523734506-bc7d280f2719?w=600&auto=format&fit=crop&q=80',
    t: 'Moti Set', slug: 'moti-classic-set',
  },
  {
    img: 'https://images.unsplash.com/photo-1615655114865-4cc1bda5901e?w=600&auto=format&fit=crop&q=80',
    t: 'Heera Band', slug: 'heera-solitaire-band',
  },
  {
    img: 'https://images.unsplash.com/photo-1723802205505-2f88b2227718?w=600&auto=format&fit=crop&q=80',
    t: 'Pukhraj', slug: 'pukhraj-statement-ring',
  },
];

export default function Gallery() {
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative py-20 bg-warm"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <div>
            <div className="eyebrow mb-2">From the Studio</div>
            <h2 className="font-display text-2xl sm:text-4xl mt-1">Recently made <em className="italic gold-text">by hand</em>.</h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm gold-text inline-flex items-center gap-1.5">
            <Icon name="instagram" size={14} /> Follow @gemandjewellery
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {TILES.map((t, i) => (
            <Link key={i} to={`/jewellery/${t.slug}`} className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer">
              {!failed[i] ? (
                <img
                  src={t.img}
                  alt={t.t}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={() => setFailed(prev => ({ ...prev, [i]: true }))}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-stone/60 to-warm flex items-center justify-center text-gold-deep">
                  <Icon name="diamond" size={48} strokeWidth={0.9} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 left-3 right-3 text-[11px] uppercase tracking-[0.18em] text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t.t}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
