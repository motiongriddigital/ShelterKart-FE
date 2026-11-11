import { SectionHeading } from '@/components/ui/SectionHeading';
import { BENCHMARK_VALUE } from '@/constants/pricing';
import type { PriceByValueRow } from '@/types/pricing';

const TH = 'px-4 py-3 text-start text-[0.625rem] font-semibold uppercase tracking-wider';
const NUM = 'whitespace-nowrap px-4 py-3 tabular-nums';

export function PriceByValueTable({ rows }: { rows: PriceByValueRow[] }) {
  return (
    <section aria-labelledby="by-value">
      <SectionHeading id="by-value" eyebrow="Statutory matrix" title="By the value of the property">
        The price of a report in US dollars and Indian rupees (every other currency follows the same
        list).
      </SectionHeading>
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[40rem] text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className={TH}>Property value</th>
              <th className={TH}>Gold standard (100%)</th>
              <th className={TH}>Heavy (80%)</th>
              <th className={TH}>Thin (60%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => {
              const benchmark = r.value === BENCHMARK_VALUE;
              return (
                <tr key={r.value} className={benchmark ? 'bg-blue-50' : undefined}>
                  <td className="px-4 py-3">
                    <strong className="text-slate-900">{r.value}</strong>{' '}
                    <span className="text-slate-500">({r.approx})</span>
                    {benchmark && (
                      <span className="ms-2 rounded-md bg-slate-900 px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-white dark:bg-amber-400 dark:text-slate-950">
                        Benchmark
                      </span>
                    )}
                  </td>
                  <td className={`${NUM} ${benchmark ? 'font-bold text-blue-700' : ''}`}>
                    {r.gold}
                  </td>
                  <td className={NUM}>{r.heavy}</td>
                  <td className={NUM}>{r.thin}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[0.625rem] text-slate-500">
        * Typical purchase benchmark determined by median transaction registers. Indexed to Gazette
        Code SK-PRC-2026.
      </p>
    </section>
  );
}
