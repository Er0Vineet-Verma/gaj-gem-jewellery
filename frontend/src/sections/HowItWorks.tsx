import { motion } from 'framer-motion';
import Icon from '../components/Icon';

const STEPS = [
  { icon: 'chat' as const, t: 'Tell us', hi: 'बताएँ', d: 'Send a sketch, photo or just a few words on WhatsApp.' },
  { icon: 'pencil' as const, t: 'We design', hi: 'हम बनाएँ', d: 'You get a CAD render and a clean quote within 48 hours.' },
  { icon: 'gem' as const, t: 'You approve', hi: 'मंज़ूरी', d: 'We finalise the stone, the metal and the price.' },
  { icon: 'shield' as const, t: 'Hand-finished', hi: 'हस्त-निर्मित', d: 'Made in our studio · BIS hallmarked · delivered insured.' },
];

export default function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative py-20 bg-warm"
    >
      <div className="container-x">
        <div className="text-center mb-12">
          <div className="eyebrow mb-2">Atelier</div>
          <h2 className="font-display text-3xl sm:text-4xl mt-1">A piece made in <em className="italic gold-text">four</em> quiet conversations.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div key={i} className="card p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-ink text-ivory inline-flex items-center justify-center"><Icon name={s.icon} size={16} /></span>
                <span className="text-[10px] uppercase tracking-[0.18em] muted">Step {i + 1}</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl mt-3 sm:mt-4">{s.t} <span className="font-deva text-sm sm:text-base muted">· {s.hi}</span></h3>
              <p className="text-xs sm:text-sm muted mt-1.5 sm:mt-2">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
