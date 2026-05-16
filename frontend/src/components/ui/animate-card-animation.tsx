import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

interface Card {
  id: number;
  contentType: 1 | 2 | 3;
}

const cardData = {
  1: {
    title: 'Heera Solitaire',
    description: '0.50 ct · F/VS1 · 18K White Gold',
    tag: 'Diamond',
    href: '/jewellery/heera-solitaire-band',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80&auto=format&fit=crop',
  },
  2: {
    title: 'Roop Ruby Ring',
    description: '2.1 ct Ruby · 22K Yellow Gold',
    tag: 'Ruby',
    href: '/jewellery',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80&auto=format&fit=crop',
  },
  3: {
    title: 'Panna Pendant',
    description: '1.8 ct Emerald · 18K Rose Gold',
    tag: 'Emerald',
    href: '/jewellery',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&auto=format&fit=crop',
  },
} as const;

const initialCards: Card[] = [
  { id: 1, contentType: 1 },
  { id: 2, contentType: 2 },
  { id: 3, contentType: 3 },
];

const positionStyles = [
  { scale: 1,    y: 14  },
  { scale: 0.95, y: -18 },
  { scale: 0.90, y: -50 },
];

function CardContent({ contentType }: { contentType: 1 | 2 | 3 }) {
  const data = cardData[contentType];
  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-[240px] w-full overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="h-full w-full select-none object-cover"
          draggable={false}
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/60 to-transparent" />
        <span className="absolute top-3 left-3 badge badge-gem text-[9px] tracking-wider">
          {data.tag}
        </span>
      </div>

      <div className="flex flex-1 items-center justify-between gap-3 px-5 py-4">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-display text-xl leading-tight text-ivory truncate">
            {data.title}
          </span>
          <span className="text-[11px] text-ivory/55 tracking-wide">{data.description}</span>
        </div>
        <Link
          to={data.href}
          onClick={e => e.stopPropagation()}
          className="flex h-9 shrink-0 cursor-pointer items-center gap-1 rounded-full bg-gold-deep pl-4 pr-3 text-xs font-medium text-ivory transition-colors hover:bg-gold-soft"
        >
          View
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

function AnimatedCard({
  card,
  index,
  isAnimating,
}: {
  card: Card;
  index: number;
  isAnimating: boolean;
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2];
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index;

  return (
    <motion.div
      key={card.id}
      initial={index === 2 ? { y: -18, scale: 0.9 } : undefined}
      animate={{ y, scale }}
      exit={index === 0 ? { y: 400, scale: 1.02, zIndex: 10 } : undefined}
      transition={{ type: 'spring', duration: 1.2, bounce: 0.08 }}
      style={{ zIndex, left: '50%', x: '-50%', bottom: 0 }}
      className="absolute h-[320px] w-[300px] sm:w-[480px] flex flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-gradient-to-br from-ink to-ink-2 will-change-transform"
    >
      <CardContent contentType={card.contentType} />
    </motion.div>
  );
}

export default function AnimatedCardStack() {
  const [cards, setCards] = useState(initialCards);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextId, setNextId] = useState(4);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextContentType = ((cards[2].contentType % 3) + 1) as 1 | 2 | 3;
    setCards([...cards.slice(1), { id: nextId, contentType: nextContentType }]);
    setNextId(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 700);
  };

  return (
    <div className="flex w-full flex-col items-center">
      {/* Container height = card height (320) + deepest back-card offset (50) + spring overshoot */}
      <div className="relative w-full overflow-hidden sm:w-[580px]" style={{ height: 430 }}>
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => (
            <AnimatedCard
              key={card.id}
              card={card}
              index={index}
              isAnimating={isAnimating}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 -mt-px flex w-full items-center justify-center border-t border-ink/10 py-4">
        <button
          onClick={handleNext}
          className="flex h-9 cursor-pointer select-none items-center gap-1.5 rounded-full border border-ink/14 bg-white px-5 text-sm font-medium text-ink transition-all duration-200 hover:border-gold-deep hover:text-gold-deep active:scale-[0.97]"
        >
          Next piece
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
