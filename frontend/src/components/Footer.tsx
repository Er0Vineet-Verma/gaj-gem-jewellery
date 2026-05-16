import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Icon from './Icon';
import { api } from '../lib/api';
import { useToast } from '../contexts/ToastContext';

const NAV_LINKS = [
  { to: '/jewellery',  label: 'Jewellery',     hi: 'आभूषण' },
  { to: '/gems',       label: 'Gemstones',     hi: 'रत्न' },
  { to: '/custom',     label: 'Custom Design', hi: 'मनचाहा डिज़ाइन' },
  { to: '/about',      label: 'Our Studio',    hi: 'हमारा स्टूडियो' },
];

const ASSURANCE = [
  'BIS Hallmarked Gold',
  'Lab-Certified Stones',
  'Lifetime Free Polish',
  'Transparent Live Rates',
  'By Appointment · Mon–Sat',
];

const CONTACT = [
  { LIcon: Phone,  text: '+91 9816024887',               href: 'tel:+919816024887' },
  { LIcon: Mail,   text: 'hello@gemandjewellery.in',     href: 'mailto:hello@gemandjewellery.in' },
  { LIcon: MapPin, text: 'By appointment · 11 am – 8 pm', href: '#' },
];

const SOCIAL: { name: 'instagram' | 'facebook' | 'pinterest'; label: string; href: string }[] = [
  { name: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { name: 'facebook',  label: 'Facebook',  href: 'https://facebook.com' },
  { name: 'pinterest', label: 'Pinterest', href: 'https://pinterest.com' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.subscribe(email);
      toast('Thank you — we\'ll write to you with care.');
      setEmail('');
    } catch {
      toast('That email looks off — try again?', 'error');
    }
  };

  return (
    <footer className="site-footer relative overflow-hidden text-ivory border-t mt-24">

      {/* ── Indian wedding aurora spotlights on black ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Gold — jewellery showroom warmth */}
        <div className="aurora-spot spot-gold-vv"     style={{ width: '55%', height: '90%', top: '-30%', left: '-10%' }} />
        {/* Sindoor red — top right */}
        <div className="aurora-spot spot-ruby-vv"     style={{ width: '50%', height: '80%', top: '-20%', right: '-10%' }} />
        {/* Sapphire blue — mid left */}
        <div className="aurora-spot spot-sapphire-vv" style={{ width: '45%', height: '70%', bottom: '-10%', left: '15%' }} />
        {/* Mehndi green — bottom right */}
        <div className="aurora-spot spot-emerald-vv"  style={{ width: '42%', height: '65%', bottom: '-15%', right: '5%' }} />
        {/* Marigold — center accent */}
        <div className="aurora-spot spot-marigold-vv" style={{ width: '35%', height: '50%', top: '30%', left: '40%' }} />
      </div>

      <div className="container-x relative z-10 pt-20 lg:pt-24 pb-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">

          {/* ── Brand ── */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-ivory text-ink inline-flex items-center justify-center shrink-0">
                <Icon name="diamond" size={18} />
              </span>
              <span className="font-display text-lg leading-tight text-ivory">GEM &amp; JEWELLERY</span>
            </Link>

            <p className="text-sm text-ivory/80 leading-relaxed max-w-[220px]">
              A family-run studio crafting hand-finished pieces in 22K &amp; 18K gold, set with
              naturally-sourced stones.
            </p>
            <p className="font-deva text-sm text-[#C6A86B] mt-1">रत्न और आभूषण</p>

            <ul className="flex gap-3 mt-5">
              {SOCIAL.map(({ name, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full inline-flex items-center justify-center text-ivory/80 hover:text-[#C6A86B] bg-ivory/[0.08] hover:bg-ivory/[0.14] transition-colors cursor-pointer"
                  >
                    <Icon name={name} size={18} />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://wa.me/919816024887"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full inline-flex items-center justify-center text-ivory/80 hover:text-[#C6A86B] bg-ivory/[0.08] hover:bg-ivory/[0.14] transition-colors cursor-pointer"
                >
                  <Icon name="whatsapp" size={18} />
                </a>
              </li>
            </ul>
          </div>

          {/* ── Collections ── */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-ivory/60 mb-5 font-medium">
              Collections
            </p>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map(({ to, label, hi }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-ivory/80 hover:text-[#C6A86B] transition-colors inline-flex flex-col cursor-pointer"
                  >
                    {label}
                    <span className="font-deva text-xs text-ivory/60">{hi}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Our Promise ── */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-ivory/60 mb-5 font-medium">
              Our Promise
            </p>
            <ul className="space-y-3 text-sm text-ivory/80">
              {ASSURANCE.map(text => (
                <li key={text} className="flex items-start gap-2">
                  <Icon name="check" size={13} className="text-[#C6A86B] mt-0.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Connect + Newsletter ── */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.26em] text-ivory/60 mb-5 font-medium">
              Connect
            </p>
            <ul className="space-y-3 text-sm mb-7">
              {CONTACT.map(({ LIcon, text, href }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="flex items-start gap-2 text-ivory/80 hover:text-[#C6A86B] transition-colors cursor-pointer"
                  >
                    <LIcon size={14} className="text-[#C6A86B] mt-0.5 shrink-0" />
                    <span>{text}</span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-[10px] uppercase tracking-[0.26em] text-ivory/60 mb-3 font-medium">
              Studio Letters
            </p>
            <p className="text-xs text-ivory/70 mb-3 leading-relaxed">
              New arrivals, gem stories. Once a fortnight.
            </p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 min-w-0 bg-ivory/[0.08] border border-ivory/[0.16] rounded-full px-3.5 py-2 text-xs text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-[#C6A86B] focus:ring-2 focus:ring-[#C6A86B]/20 transition"
              />
              <button type="submit" className="btn btn-gold text-xs py-2 px-4 shrink-0 cursor-pointer">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-ivory/[0.12] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/60">
          <span>© {new Date().getFullYear()} GEM &amp; JEWELLERY · BIS hallmarked · GST registered</span>
          <span className="font-deva text-[#C6A86B]/70">हस्त-निर्मित · हर रत्न प्रमाणित</span>
        </div>
      </div>
    </footer>
  );
}
