import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type DoodleProps = { label: string; className?: string };

/**
 * The frame every doodle shares: one line drawing in the gold of the site, announced to screen readers as an image
 * with `label`. Strokes marked `doodle-draw` (with `pathLength={1}`) draw themselves once; with "reduce motion" on
 * nothing moves and the finished drawing shows.
 */
export function DoodleSvg({ label, className, children }: DoodleProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 200 160"
      role="img"
      aria-label={label}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-gold', className)}
    >
      {children}
    </svg>
  );
}
