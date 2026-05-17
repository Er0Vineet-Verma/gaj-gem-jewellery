import { useEffect, useState } from 'react';

/**
 * Returns true when the viewport is at or below the mobile breakpoint.
 *
 * Default break is 720px to align with the mobile design bundle, where the
 * 360 / 390 / 430 px canvases are tuned. Above that we hand off to the
 * desktop layout. Updates live on resize so the transition between layouts
 * is seamless when a user rotates / resizes a window.
 *
 * SSR-safe: returns `false` until the first effect runs in the browser.
 */
export function useIsMobile(breakpoint: number = 720): boolean {
  const get = () => (typeof window === 'undefined' ? false : window.matchMedia(`(max-width: ${breakpoint}px)`).matches);
  const [isMobile, setIsMobile] = useState<boolean>(get);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    // Safari < 14 still uses the deprecated addListener — handle both
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
    };
  }, [breakpoint]);

  return isMobile;
}
