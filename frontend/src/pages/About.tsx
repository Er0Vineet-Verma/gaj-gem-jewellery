import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

export default function About() {
  return (
    <section className="py-12">
      <div className="container-x">
        {/* Studio photo strip */}
        <div className="grid grid-cols-3 gap-3 mb-10 sm:mb-14 rounded-3xl overflow-hidden h-40 sm:h-56">
          <div className="col-span-3 sm:col-span-1 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1573408301185-9521cf7e35dd?w=600&auto=format&fit=crop&q=80" alt="Goldsmith at work" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden sm:block overflow-hidden">
            <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80" alt="Fine jewellery display" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden sm:block overflow-hidden">
            <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80" alt="Gemstone selection" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        <header className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-[10px] uppercase tracking-[0.28em] muted">Our studio</div>
          <h1 className="font-display text-4xl sm:text-5xl mt-1">A small team. <span className="italic gold-text">A slow craft.</span></h1>
          <p className="font-deva text-lg muted mt-3">हमारा कारख़ाना · हमारी कहानी</p>
          <p className="muted mt-5 text-base">
            GEM &amp; JEWELLERY is a family-run jewellery studio. We design each piece with you, source the stone ourselves,
            and set it by hand. No showroom crowds, no sales pressure — just the work, and a long conversation.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { icon: 'shield', t: 'BIS hallmarked', d: 'Every piece is stamped with the BIS hallmark, verifiable with your certificate.' },
            { icon: 'gem', t: 'Traceable stones', d: 'Each stone comes with a lab certificate (IGI / GIA / GTL) and origin notes.' },
            { icon: 'scale', t: 'Honest pricing', d: 'Live metal rate, set making charge, no hidden mark-ups.' },
            { icon: 'sparkle', t: 'Lifetime polish', d: 'Bring it in once a year for a free re-finish.' },
            { icon: 'chat', t: 'Talk to a designer', d: 'Not a call centre — you will actually speak to who makes your piece.' },
            { icon: 'heart', t: 'Family business', d: 'Built slowly, one order at a time, since the family began.' },
          ].map((v, i) => (
            <div key={i} className="card p-5">
              <span className="w-10 h-10 rounded-full bg-emerald-brand text-ivory inline-flex items-center justify-center"><Icon name={v.icon as any} size={18} /></span>
              <h4 className="font-display text-xl mt-3">{v.t}</h4>
              <p className="text-sm muted mt-1.5">{v.d}</p>
            </div>
          ))}
        </div>

        <div className="card p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] muted">Come say hello</div>
            <h3 className="font-display text-3xl mt-1">Visit the studio, by appointment.</h3>
            <p className="muted mt-3">We keep the studio quiet on purpose — so you have time with the stones and time with the karigar. Send us a WhatsApp to book.</p>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center gap-2"><Icon name="phone" size={14} className="gold-text" /> +91 9816024887</div>
              <div className="flex items-center gap-2"><Icon name="mail" size={14} className="gold-text" /> hello@gemandjewellery.in</div>
              <div className="flex items-center gap-2"><Icon name="pin" size={14} className="gold-text" /> By appointment · Mon–Sat · 11–8</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://wa.me/919816024887" target="_blank" rel="noreferrer" className="btn btn-gold"><Icon name="whatsapp" size={16} /> WhatsApp us</a>
              <Link to="/custom" className="btn btn-ghost">Start a custom piece <Icon name="arrow-right" size={16} /></Link>
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&auto=format&fit=crop&q=80"
              alt="Our jewellery studio — crafting pieces by hand"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
