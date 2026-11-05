import { ShieldCheck } from 'lucide-react';
import { MARKETS } from '@/constants/markets';
import { STANDARD_STRIP } from '@/constants/home';
import { getT } from '@/i18n/server';

/** The standard the site works to, and the audit stamp of this page: the masthead of a publication of record. */
export async function StatusStrip() {
  const t = await getT();
  return (
    <div className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500">
      <div className="mx-auto flex max-w-[1900px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1.5 md:px-8 xl:px-12">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-semibold text-slate-700">{t(STANDARD_STRIP.left)}</span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <ShieldCheck className="size-3" aria-hidden="true" />
            {t(STANDARD_STRIP.framework)}
          </span>
        </p>
        <p className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            {t('{n} Jurisdictions Live', { n: Object.keys(MARKETS).length })}
          </span>
          <span className="hidden font-mono md:inline">{STANDARD_STRIP.stamp}</span>
        </p>
      </div>
    </div>
  );
}
