import { useState } from 'react';
import { MobileHeader, MobileTicker, MobileMenu, MobileFooter } from './MobileShared';

/**
 * Wraps page content with the mobile ticker + sticky header + menu sheet +
 * footer. Used for every mobile route. Keeps the menu state in one place so
 * the header's hamburger and the menu sheet's close button stay in sync.
 */
export default function MobileShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="m-root">
      <MobileTicker />
      <MobileHeader onOpenMenu={() => setMenuOpen(true)} />
      {children}
      <MobileFooter />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
