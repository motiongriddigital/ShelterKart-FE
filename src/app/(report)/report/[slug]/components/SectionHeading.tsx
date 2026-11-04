import type { ReactNode } from 'react';

type Props = { eyebrow: string; title: string; sub?: string; aside?: ReactNode };

export function SectionHeading({ eyebrow, title, sub, aside }: Props) {
  return (
    <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-[28px]">
          {title}
        </h2>
        {sub && <p className="mt-1 max-w-2xl text-sm text-slate-600">{sub}</p>}
      </div>
      {aside && <div className="text-xs font-semibold text-rose-700">{aside}</div>}
    </div>
  );
}
