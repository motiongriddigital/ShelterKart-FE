import { Landmark, Scale, ShieldCheck, type LucideIcon } from 'lucide-react';
import { PILLARS } from '@/constants/home';
import { getT } from '@/i18n/server';
import type { Pillar } from '@/types/home';
import { cn } from '@/utils/cn';

const ICONS: Record<Pillar['icon'], LucideIcon> = {
  scale: Scale,
  seal: ShieldCheck,
  ledger: Landmark,
};

/** The three commitments; the middle card is the product itself, raised above the other two. */
export async function PillarCards() {
  const t = await getT();
  return (
    <ul className="mt-10 grid w-full gap-4 md:grid-cols-3 md:items-center">
      {PILLARS.map((p) => {
        const Icon = ICONS[p.icon];
        return (
          <li
            key={p.title}
            className={cn(
              'rounded-xl border bg-white p-5 text-center',
              p.featured
                ? 'border-slate-300 py-7 shadow-xl ring-1 ring-slate-900/5 md:-my-3 md:order-none'
                : 'border-slate-200 shadow-sm',
            )}
          >
            <span
              className={cn(
                'mx-auto grid size-10 place-items-center rounded-full',
                p.featured
                  ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950'
                  : 'bg-slate-100 text-slate-700',
              )}
            >
              <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            {p.featured && (
              <span className="mt-3 inline-block rounded bg-emerald-50 px-2 py-0.5 text-sm font-bold text-emerald-700">
                {t(p.tag)}
              </span>
            )}
            <h3 className="mt-3 text-lg font-bold text-slate-900">{t(p.title)}</h3>
            <p className="mx-auto mt-1 max-w-[18rem] text-base leading-relaxed text-slate-600">
              {t(p.text)}
            </p>
            {!p.featured && <p className="mt-3 text-sm font-bold text-blue-700">{t(p.tag)}</p>}
          </li>
        );
      })}
    </ul>
  );
}
