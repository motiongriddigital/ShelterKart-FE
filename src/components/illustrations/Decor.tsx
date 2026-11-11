import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

/** Places a decorative illustration: hidden from assistive tech, never in the way of clicks or text. */
export function Decor({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute select-none', className)}>
      {children}
    </div>
  );
}
