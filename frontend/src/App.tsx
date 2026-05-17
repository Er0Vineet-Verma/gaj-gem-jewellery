import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import MobileNav from './components/MobileNav';
import WhatsAppFAB from './components/WhatsAppFAB';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CustomDesign from './pages/CustomDesign';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Gems from './pages/Gems';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { useIsMobile } from './hooks/useIsMobile';
import { MobileHeader, MobileTicker, MobileMenu, MobileFooter } from './mobile/MobileShared';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      {isMobile ? (
        /* ── Mobile shell ── */
        <div className="m-root">
          <MobileTicker />
          <MobileHeader onOpenMenu={() => setMobileMenuOpen(true)} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jewellery" element={<ProductList />} />
              <Route path="/jewellery/:slug" element={<ProductDetail />} />
              <Route path="/custom" element={<CustomDesign />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/gems" element={<Gems />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <MobileFooter />
          <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
          <CartDrawer />
          <WhatsAppFAB />
        </div>
      ) : (
        /* ── Desktop shell ── */
        <div className="min-h-screen flex flex-col bg-warm dark:bg-transparent">
          <Header onOpenMenu={() => setMenuOpen(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jewellery" element={<ProductList />} />
              <Route path="/jewellery/:slug" element={<ProductDetail />} />
              <Route path="/custom" element={<CustomDesign />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/gems" element={<Gems />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
          <WhatsAppFAB />
        </div>
      )}
    </MotionConfig>
  );
}
