import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import CorePaths from '../sections/CorePaths';
import HowItWorks from '../sections/HowItWorks';
import FeaturedGrid from '../sections/FeaturedGrid';
import CraftTrust from '../sections/CraftTrust';
import Gallery from '../sections/Gallery';
import Testimonials from '../sections/Testimonials';
import CTA from '../sections/CTA';
import { ParallaxScrollFeatureSection } from '../components/ui/parallax-scroll-feature-section';
import { useIsMobile } from '../hooks/useIsMobile';
import MobileHome from '../mobile/MobileHome';

export default function Home() {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileHome />;

  return (
    <>
      <Hero />
      <Marquee />
      <CorePaths />
      <HowItWorks />
      <FeaturedGrid />
      <ParallaxScrollFeatureSection />
      <CraftTrust />
      <Gallery />
      <Testimonials />
      <CTA />
    </>
  );
}
