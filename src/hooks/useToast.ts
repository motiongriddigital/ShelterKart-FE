'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

/** A message that fades after a few seconds; errors stay longer. */
export function useToast() {
  const [toast, setToast] = useState<{ text: string; bad: boolean } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback((text: string, bad = false) => {
    clearTimeout(timer.current);
    setToast({ text, bad });
    timer.current = setTimeout(() => setToast(null), bad ? 9000 : 4500);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);
  return { toast, show };
}
