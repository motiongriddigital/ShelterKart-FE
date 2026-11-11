import { CircleAlert, FileCheck2, FileText, Landmark } from 'lucide-react';
import Link from 'next/link';
import { DOCKET } from '@/constants/home';
import { getT } from '@/i18n/server';
import type { DocketClaim } from '@/types/home';
import { cn } from '@/utils/cn';

const FLAG_TONE = {
  bad: 'border-s-rose-500 bg-rose-50/60 [&_dt]:text-rose-700',
  ok: 'border-s-emerald-500 bg-emerald-50/60 [&_dt]:text-emerald-700',
} as const;

function Claims({ items, t }: { items: DocketClaim[]; t: (s: string) => string }) {
  return (
    <ul className="mt-3 grid gap-2.5">
      {items.map((c) => (
        <li
          key={c.label}
          className={cn(
            'rounded-md border border-slate-200 bg-slate-50 p-3',
            c.flag && cn('border-s-4', FLAG_TONE[c.flag]),
          )}
        >
          <dl>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <dt className="text-sm font-semibold text-slate-600">{t(c.label)}</dt>
              {c.ref && <span className="text-sm text-slate-600">{c.ref}</span>}
            </div>
            <dd className="mt-1 text-base font-medium text-slate-900">{t(c.text)}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}

/** One audited example, side by side: what the brochure says, and what the public record says. */
export async function DocketComparison() {
  const t = await getT();
  return (
    <section className="px-4 pb-14 md:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-bold text-blue-700">{t(DOCKET.eyebrow)}</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {t(DOCKET.title)}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
          {t(DOCKET.sub)}
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-sm">
          <span className="flex items-center gap-2 text-slate-700">
            <FileText className="size-3.5" aria-hidden="true" />
            {t(DOCKET.sample)}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded bg-rose-50 px-2 py-0.5 text-sm font-bold text-rose-700">
            <CircleAlert className="size-3" aria-hidden="true" />
            {t(DOCKET.verdict)}
          </span>
        </div>

        <div className="grid divide-slate-200 md:grid-cols-2 md:divide-x rtl:md:divide-x-reverse">
          <div className="p-4 md:p-5">
            <h3 className="flex items-center justify-between text-sm font-bold text-slate-600">
              {t(DOCKET.claimsTitle)}
            </h3>
            <Claims items={DOCKET.claims} t={t} />
          </div>
          <div className="border-t border-slate-200 p-4 md:border-t-0 md:p-5">
            <h3 className="flex items-center justify-between text-sm font-bold text-blue-700">
              {t(DOCKET.recordTitle)}
              <Landmark className="size-3.5" aria-hidden="true" />
            </h3>
            <Claims items={DOCKET.record} t={t} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <FileCheck2 className="size-3.5" aria-hidden="true" />
            {t(DOCKET.footnote)}
          </span>
          <Link href={DOCKET.ctaHref} className="font-semibold text-blue-700 hover:underline">
            {t(DOCKET.cta)} →
          </Link>
        </div>
      </div>
    </section>
  );
}
