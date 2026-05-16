import { motion } from 'framer-motion';
import Icon from '../components/Icon';

const POINTS = [
  { icon: 'shield' as const, t: 'BIS hallmarked', d: 'Every piece carries the BIS mark — purity you can verify.' },
  { icon: 'gem' as const,    t: 'Naturally-sourced stones', d: 'Each stone arrives with a lab certificate (IGI / GIA / GTL).' },
  { icon: 'scale' as const,  t: 'Honest pricing', d: 'Live metal rates, transparent making charge, no surprises.' },
  { icon: 'sparkle' as const,t: 'Lifetime polish', d: 'Bring your piece in once a year — we re-finish it on us.' },
];

export default function CraftTrust() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative py-20"
    >
      <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="eyebrow mb-2">Craft &amp; Trust</div>
          <h2 className="font-display text-3xl sm:text-4xl mt-1">A studio,<br />not a <em className="italic gold-text">factory</em>.</h2>
          <p className="muted mt-4">We're a small team of designers, karigars and a single bench jeweller. Every piece passes through three pairs of hands before it reaches you — that's the difference you can feel when you wear it.</p>
          <p className="font-deva muted mt-3">हर आभूषण हाथ से बनाया जाता है · जल्दी नहीं, ध्यान से ।</p>
        </div>
        <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
          {POINTS.map((p, i) => (
            <div key={i} className="card p-3 sm:p-5">
              <span className="w-10 h-10 rounded-full bg-emerald-brand text-ivory inline-flex items-center justify-center"><Icon name={p.icon} size={18} /></span>
              <h4 className="font-display text-lg mt-3">{p.t}</h4>
              <p className="text-sm muted mt-1">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
