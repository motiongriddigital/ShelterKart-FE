'use client';
import type { ReactNode } from 'react';

type Props = { onActivate: () => void; className?: string; children: ReactNode };

/** A plain-text link that acts like a button, with real Enter/Space activation. */
export function ActionLink({ onActivate, className, children }: Props) {
  return (
    <a
      role="button"
      tabIndex={0}
      className={className}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      {children}
    </a>
  );
}
