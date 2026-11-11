import type { ReactNode } from 'react';
import { Decor } from '@/components/illustrations/Decor';

type Props = { eyebrow: string; title: string; sub?: string; aside?: ReactNode; art?: ReactNode };

export function SectionHeading({ eyebrow, title, sub, aside, art }: Props) {
  return (
    <div className="relative mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      {art && <Decor className="end-56 -top-6 hidden w-36 xl:block">{art}</Decor>}
      <div>
        <p className="text-base font-bold text-blue-700">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem]">
          {title}
        </h2>
        {sub && <p className="mt-2 max-w-3xl text-lg text-slate-700">{sub}</p>}
      </div>
      {aside && <div className="text-lg">{aside}</div>}
    </div>
  );
}
