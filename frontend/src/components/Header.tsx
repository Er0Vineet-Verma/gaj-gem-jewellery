import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';
import SearchModal from './SearchModal';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useTheme } from '../contexts/ThemeContext';

const NAV_ITEMS = [
  { to: '/',          label: 'Atelier' },
  { to: '/jewellery', label: 'Jewellery' },
  { to: '/custom',    label: 'Custom' },
  { to: '/gems',      label: 'Gemstones' },
  { to: '/about',     label: 'Studio' },
];

export default function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { count: cartCount, openDrawer } = useCart();
  const { count: wishCount } = useWishlist();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {/* keep for future use */};
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="site-header">
      {/* Top announcement strip */}
      <div className="header-strip">
        <span>BIS 916 Hallmarked Gold</span>
        <span className="sep">·</span>
        <span>Free India Shipping over ₹25,000</span>
        <span className="sep">·</span>
        <span>Talk to a designer · WhatsApp +91 98160 24887</span>
      </div>

      <div className="shell header-inner">
        <Link to="/" className="header-logo" aria-label="GAJ home">
          <span className="mark">GAJ<sup>°</sup></span>
          <span className="tagline hide-mobile">Gem &amp; Jewellery · Est. 1995</span>
        </Link>

        <nav className="nav-row hide-mobile">
          {NAV_ITEMS.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-icons">
          <button onClick={() => setSearchOpen(true)} className="icon-btn hide-mobile" aria-label="Search">
            <Icon name="search" size={18} />
          </button>

          <button
            onClick={toggle}
            className="icon-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Icon name="sun" size={18} /> : <Icon name="moon" size={18} />}
          </button>

          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
            <Icon name="heart" size={18} />
            {wishCount > 0 && <span className="badge">{wishCount}</span>}
          </Link>

          <button onClick={openDrawer} className="icon-btn" aria-label="Bag">
            <Icon name="bag" size={18} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </button>

          <a
            href="https://wa.me/919816024887"
            target="_blank"
            rel="noreferrer"
            className="btn btn-gold hide-mobile"
            style={{ marginLeft: 6 }}
          >
            <Icon name="whatsapp" size={14} /> WhatsApp
          </a>

          <button onClick={onOpenMenu} className="icon-btn show-mobile" aria-label="Open menu">
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
