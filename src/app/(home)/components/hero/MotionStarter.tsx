'use client';
import { useEffect } from 'react';

const HOLD_SCRIPT = "document.documentElement.classList.add('motion-wait')";

/**
 * Holds the hero's first frame, then plays its motion once the page is ready: after hydration, after the fonts, and
 * two frames later, so the main thread is idle when the sequence begins. The hold is set before the first paint by
 * the inline script; without JavaScript it is never set and the finished page shows.
 */
export function MotionStarter() {
  useEffect(() => {
    const root = document.documentElement;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      root.classList.remove('motion-wait');
      root.classList.add('motion-run');
    };
    // Two frames after the fonts are ready; a timer backs it up, because frames pause in a hidden tab.
    const ready = () => {
      requestAnimationFrame(() => requestAnimationFrame(start));
      setTimeout(start, 400);
    };
    const fallback = setTimeout(ready, 1500);
    document.fonts.ready.then(() => {
      clearTimeout(fallback);
      ready();
    });
    return () => clearTimeout(fallback);
  }, []);

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: HOLD_SCRIPT }} />;
}
