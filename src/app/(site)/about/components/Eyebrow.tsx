import type { ReactNode } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-blue-700">
      {children}
    </p>
  );
}
