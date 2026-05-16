import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';

export default function CTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="py-20"
    >
      <div className="container-x">
        <div className="cta-panel relative overflow-hidden rounded-3xl text-ivory px-5 md:px-14 py-10 md:py-20 grid lg:grid-cols-12 gap-8 items-center shadow-soft">
          {/* Aurora inside dark CTA — vivid wedding spotlights */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="aurora-spot spot-gold-vv"     style={{ width: '55%', height: '160%', top: '-30%', right: '-10%' }} />
            <div className="aurora-spot spot-ruby-vv"     style={{ width: '45%', height: '140%', top: '-20%', left: '-8%' }} />
            <div className="aurora-spot spot-sapphire-vv" style={{ width: '40%', height: '100%', bottom: '-20%', left: '30%' }} />
          </div>
          <div className="lg:col-span-8">
            <div className="eyebrow mb-2 !text-ivory/60">Appointment</div>
            <h2 className="font-display text-3xl md:text-5xl mt-2">Let's design something <span className="italic text-gold-soft">just for you.</span></h2>
            <p className="text-ivory/70 mt-4 max-w-xl">A first sketch and a first quote — within 48 hours. No commitment, no pressure. Just a conversation between you and our designer.</p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link to="/custom" className="btn btn-gold justify-center"><Icon name="pencil" size={16} /> Start a custom request</Link>
            <a href="https://wa.me/919816024887" target="_blank" rel="noreferrer" className="btn btn-on-dark justify-center"><Icon name="whatsapp" size={16} /> Chat on WhatsApp</a>
            <a href="tel:+919816024887" className="btn btn-on-dark justify-center"><Icon name="phone" size={16} /> +91 9816024887</a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
