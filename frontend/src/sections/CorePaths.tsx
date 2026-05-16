import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';

const PATHS = [
  { to: '/jewellery', icon: 'gem' as const, t: 'Ready to wear', hi: 'तैयार आभूषण', d: 'Pieces from our active collection — solitaires, sets, daily-wear classics.' },
  { to: '/custom',    icon: 'pencil' as const, t: 'Custom design', hi: 'मनचाहा डिज़ाइन', d: 'A six-step studio process — from stone selection to a finished piece.' },
  { to: '/gems',      icon: 'sparkle' as const, t: 'Loose gemstones', hi: 'खुले रत्न', d: 'Certified, naturally-sourced ruby, emerald, sapphire and more.' },
];

export default function CorePaths() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative py-20"
    >
      <div className="container-x grid md:grid-cols-3 gap-5">
        {PATHS.map(p => (
          <Link to={p.to} key={p.to} className="card p-5 sm:p-7 group">
            <span className="w-11 h-11 rounded-full bg-stone/40 text-gold-deep inline-flex items-center justify-center"><Icon name={p.icon} /></span>
            <h3 className="font-display text-2xl mt-5">{p.t}</h3>
            <p className="font-deva text-sm muted">{p.hi}</p>
            <p className="text-sm muted mt-3">{p.d}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm gold-text">Begin here <Icon name="arrow-right" size={14} /></span>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
