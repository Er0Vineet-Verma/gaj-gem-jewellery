import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const FEATURES = [
  {
    id: 1,
    title: 'Custom Design Process',
    description:
      'From your first sketch to a finished piece in 22K gold — our designers work closely with you at every step. Share a photo, a mood board, or just a few words.',
    imageUrl:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=640&auto=format&fit=crop&q=80',
    reverse: false,
  },
  {
    id: 2,
    title: 'Certified Gemstones',
    description:
      'Every stone arrives with an IGI, GIA or GTL lab certificate. Naturally sourced rubies, emeralds, sapphires and pearls — selected by our in-house gemologist.',
    imageUrl:
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=640&auto=format&fit=crop&q=80',
    reverse: true,
  },
  {
    id: 3,
    title: 'Handcrafted to Last',
    description:
      'Each piece passes through three pairs of hands — a designer, a karigar, and a finishing jeweller. BIS hallmarked and delivered with a lifetime polish guarantee.',
    imageUrl:
      'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?w=640&auto=format&fit=crop&q=80',
    reverse: false,
  },
];

interface FeatureItemProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse: boolean;
}

function FeatureItem({ title, description, imageUrl, reverse }: FeatureItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'center 60%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const x       = useTransform(scrollYProgress, [0, 0.7], [reverse ? 40 : -40, 0]);
  const y       = useTransform(scrollYProgress, [0, 1], [-30, 0]);

  return (
    <div
      ref={ref}
      className={`min-h-[70vh] md:min-h-screen flex items-center justify-center gap-10 md:gap-16 lg:gap-32 px-6 lg:px-0 flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      <motion.div style={{ y }} className="md:max-w-sm">
        <p className="text-[10px] uppercase tracking-[0.28em] muted mb-3">Our craft</p>
        <h3 className="font-display text-4xl lg:text-5xl leading-tight">{title}</h3>
        <p className="mt-5 muted text-base leading-relaxed">{description}</p>
      </motion.div>

      <motion.div style={{ opacity, x }} className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-2xl shadow-soft"
        />
      </motion.div>
    </div>
  );
}

export function ParallaxScrollFeatureSection() {
  return (
    <section className="relative bg-warm">
      <div className="min-h-[60vh] flex flex-col items-center justify-center container-x text-center">
        <div className="eyebrow mb-4">Our Promise</div>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl max-w-3xl leading-tight">
          Crafted with purpose,{' '}
          <span className="italic gold-text">worn with story.</span>
        </h2>
        <p className="mt-8 inline-flex items-center gap-2 text-xs muted uppercase tracking-[0.2em]">
          Scroll to discover <ArrowDown size={13} />
        </p>
      </div>

      <div className="container-x">
        {FEATURES.map(f => (
          <FeatureItem key={f.id} {...f} />
        ))}
      </div>
    </section>
  );
}
