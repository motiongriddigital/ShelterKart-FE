'use client';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { PriceByCurrencyRow } from '@/types/pricing';

const TH = 'px-4 py-3 text-start text-[0.625rem] font-semibold uppercase tracking-wider';
const NUM = 'whitespace-nowrap px-4 py-3 tabular-nums';
const HIGHLIGHT = ['USD', 'INR'];

export function PriceByCurrencyTable({ rows }: { rows: PriceByCurrencyRow[] }) {
  const [query, setQuery] = useState('');
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? rows.filter((r) => `${r.currency} ${r.code}`.toLowerCase().includes(q)) : rows;
  }, [rows, query]);

  return (
    <section aria-labelledby="by-currency">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeading
          id="by-currency"
          eyebrow="Multi-jurisdictional schedule"
          title="The same report in each currency"
        >
          A Gold-standard report on a typical purchase, and the lowest and highest price of any
          report, in each currency.
        </SectionHeading>
        <label className="relative w-full sm:w-56">
          <span className="sr-only">Filter currency or code</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter currency or code…"
            className="h-9 w-full rounded-md border border-slate-200 bg-white ps-8 pe-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30"
          />
        </label>
      </div>
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[36rem] text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className={TH}>Jurisdiction currency</th>
              <th className={TH}>ISO code</th>
              <th className={TH}>Gold-standard (typical)</th>
              <th className={TH}>Range (lowest – highest)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shown.map((r) => {
              const on = HIGHLIGHT.includes(r.code);
              return (
                <tr key={r.code} className={on ? 'bg-blue-50' : undefined}>
                  <td className="px-4 py-2.5 font-medium text-slate-900">{r.currency}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[0.625rem] font-bold ${
                        on
                          ? 'bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {r.code}
                    </span>
                  </td>
                  <td className={`${NUM} ${on ? 'font-bold text-blue-700' : ''}`}>{r.typical}</td>
                  <td className={`${NUM} text-slate-500`}>{r.range}</td>
                </tr>
              );
            })}
            {shown.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  No currency matches “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
