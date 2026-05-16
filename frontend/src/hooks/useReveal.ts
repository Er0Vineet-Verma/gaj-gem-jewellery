import { useEffect, useRef } from 'react';

export function useReveal<T extends HTMLElement>(rootMargin = '0px 0px -60px 0px') {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('reveal');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('reveal-in');
          io.unobserve(e.target);
        }
      }
    }, { rootMargin, threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}
