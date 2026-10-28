'use client';
import { useEffect, useState } from 'react';

/** Milliseconds left until `iso`, ticking once a second while `active`. */
export function useCountdown(iso: string | undefined, active: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [active]);
  return iso ? Math.max(0, Date.parse(iso) - now) : 0;
}
