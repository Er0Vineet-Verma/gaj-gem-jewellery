import { motion, type Variants } from 'framer-motion';

const reviews = [
  {
    name: 'Priya Sharma',
    what: 'Bridal Necklace Set · Mumbai',
    quote: 'Every piece was exactly as we imagined — and Parveen sir was patient through three rounds of changes. The craftsmanship left every guest asking where it came from.',
  },
  {
    name: 'Rohit & Kavita Malhotra',
    what: 'Heera Solitaire Band · New Delhi',
    quote: 'The diamond ring was delivered in time for our engagement ceremony, and the IGI certificate gave my parents all the confidence they needed. A piece made for generations.',
  },
  {
    name: 'Anjali Menon',
    what: 'Colombian Emerald Pendant · Bengaluru',
    quote: 'They sourced the exact Colombian emerald I described within a week. The gold setting is so delicate it looks like lacework. No showroom could have created something this personal.',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Testimonials() {
  return (
    <section className="py-20 bg-warm">
      <div className="container-x">
        <div className="mb-14">
          <div className="eyebrow mb-4">Words</div>
          <h2 className="font-display text-3xl sm:text-5xl leading-[1.04]">
            From the families<br />who <em className="italic gold-text">chose</em> us.
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x hairline"
        >
          {reviews.map((r) => (
            <motion.div key={r.name} variants={item} className="pt-8 md:pt-0 md:pl-10 first:md:pl-0 pb-8 md:pb-0 md:pr-10 last:md:pr-0 flex flex-col gap-5">
              {/* Border-top accent like the design */}
              <div className="h-px bg-gold-deep/40 w-full mb-1 hidden md:block" />

              <blockquote className="font-display text-xl sm:text-[22px] leading-[1.45] italic flex-1">
                <span className="text-3xl text-gold-deep leading-none mr-1 not-italic">"</span>
                {r.quote}
              </blockquote>

              <div>
                <div className="font-display text-lg">{r.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] muted mt-1">{r.what}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
