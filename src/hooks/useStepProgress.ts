'use client';
import { useEffect, useState } from 'react';

/** Index of the step currently running, advancing every `ms`; steps before it are done. */
export function useStepProgress(count: number, ms: number) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (current >= count) return;
    const id = setTimeout(() => setCurrent((c) => c + 1), ms);
    return () => clearTimeout(id);
  }, [current, count, ms]);
  return current;
}
