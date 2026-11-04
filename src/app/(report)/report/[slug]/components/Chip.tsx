import type { ReactNode } from 'react';
import type { Tone } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { chipTone } from './tones';

export function Chip({
  tone = 'slate',
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold ring-1 ring-inset',
        chipTone[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
