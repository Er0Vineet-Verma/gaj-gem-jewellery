import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import { api } from '../lib/api';
import { SEED_PRODUCTS } from '../lib/seedProducts';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'ring', label: 'Rings' },
  { key: 'pendant', label: 'Pendants' },
  { key: 'earring', label: 'Earrings' },
  { key: 'bracelet', label: 'Bracelets' },
  { key: 'necklace', label: 'Necklaces' },
];

const seedFor = (tab: string) =>
  (tab === 'all' ? SEED_PRODUCTS : SEED_PRODUCTS.filter(p => p.category === tab)).slice(0, 8);

export default function FeaturedGrid() {
  const [tab, setTab] = useState('all');
  // Seed first so cards render immediately; API fills in real data when available.
  const [list, setList] = useState<any[]>(() => seedFor('all'));

  useEffect(() => {
    setList(seedFor(tab));
    api.products({ category: tab === 'all' ? undefined : tab })
      .then(r => { if (r.products?.length) setList(r.products.slice(0, 8)); })
      .catch(() => { /* keep seed */ });
  }, [tab]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative py-20 bg-warm"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="eyebrow mb-2">Featured</div>
            <h2 className="font-display text-3xl sm:text-4xl mt-1">In the case this <em className="italic gold-text">week</em>. <span className="font-deva text-xl sm:text-2xl muted">इस सप्ताह</span></h2>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-nowrap pb-1">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-3.5 py-1.5 rounded-full text-sm transition whitespace-nowrap shrink-0 ${tab === t.key ? 'bg-ink text-ivory' : 'bg-white border hairline'}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map(p => <ProductCard key={p.id} p={p} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/jewellery" className="btn btn-ghost">View all pieces <Icon name="arrow-right" size={16} /></Link>
        </div>
      </div>
    </motion.section>
  );
}
