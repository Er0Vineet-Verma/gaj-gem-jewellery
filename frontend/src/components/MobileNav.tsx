import { NavLink } from 'react-router-dom';
import Icon from './Icon';
import { useTheme } from '../contexts/ThemeContext';

export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, toggle } = useTheme();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[95] flex" onClick={onClose}>
      <aside className="w-[80%] max-w-xs bg-ink text-ivory h-full flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between px-5 py-4 border-b border-ivory/10">
          <span className="font-display text-lg">Menu</span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="icon-btn-light"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>
            <button onClick={onClose} className="icon-btn-light"><Icon name="close" /></button>
          </div>
        </header>
        <nav className="flex-1 px-5 py-4 flex flex-col gap-1 text-base">
          {[
            ['/', 'Home'], ['/jewellery', 'Jewellery'], ['/gems', 'Gemstones'],
            ['/custom', 'Custom Design'], ['/wishlist', 'Wishlist'], ['/cart', 'Bag'], ['/about', 'Our Studio'],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} onClick={onClose}
              className={({ isActive }) => `py-3 border-b border-ivory/8 ${isActive ? 'text-gold-soft' : ''}`}>{label}</NavLink>
          ))}
        </nav>
        <footer className="px-5 py-5 border-t border-ivory/10">
          <a href="https://wa.me/919816024887" target="_blank" rel="noreferrer" className="btn btn-gold w-full justify-center"><Icon name="whatsapp" size={16} /> Chat on WhatsApp</a>
        </footer>
      </aside>
      <div className="flex-1" />
    </div>
  );
}
