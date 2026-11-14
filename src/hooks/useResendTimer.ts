'use client';
import { useCallback, useEffect, useState } from 'react';

/** Counts down `seconds`, once a second; `restart` starts it again (after a new code is asked for). */
export function useResendTimer(seconds: number) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);

  const restart = useCallback(() => setLeft(seconds), [seconds]);
  return { left, ready: left <= 0, restart };
}
