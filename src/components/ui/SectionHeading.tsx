import type { ReactNode } from 'react';

type Props = { eyebrow?: string; title: string; children?: ReactNode; id?: string };

/** Eyebrow, title and optional lead used at the top of the page sections. */
export function SectionHeading({ eyebrow, title, children, id }: Props) {
  return (
    <header>
      {eyebrow && (
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-blue-700">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {children && <p className="mt-1 text-xs text-slate-500 md:text-sm">{children}</p>}
    </header>
  );
}
