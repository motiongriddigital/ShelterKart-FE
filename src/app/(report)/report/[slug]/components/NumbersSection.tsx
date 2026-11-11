import type { PriceRow, PropertyReport } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { Chip } from './Chip';
import { BlueprintArt } from '@/components/illustrations/BlueprintArt';
import { SectionHeading } from './SectionHeading';

const COLUMNS: { key: keyof PriceRow; label: string }[] = [
  { key: 'typology', label: 'Home type' },
  { key: 'area', label: 'Size (carpet area)' },
  { key: 'quoted', label: 'Price you were quoted' },
  { key: 'effective', label: 'Real rate, all costs in' },
  { key: 'benchmark', label: 'Official benchmark rate' },
  { key: 'variance', label: 'Difference' },
];

const TH = 'border-b border-slate-200 px-3 py-3 text-start text-base font-bold text-slate-900';

export function NumbersSection({ report }: { report: PropertyReport }) {
  const { numbers } = report;
  const { statutory } = numbers;
  const [first, ...rest] = COLUMNS;
  return (
    <section
      id="numbers"
      className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12"
    >
      <SectionHeading
        art={<BlueprintArt className="w-full text-blue-600/20" />}
        eyebrow="Part 3 · The numbers"
        title="The numbers, checked"
        sub="How the price you were quoted compares with the official benchmark."
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_24rem]">
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-slate-900">{numbers.title}</h3>
            <Chip tone="green">{numbers.badge}</Chip>
          </div>

          <div className="mt-4 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[40rem] border-collapse text-start text-base">
              <thead>
                <tr>
                  {COLUMNS.map((c) => (
                    <th key={c.key} scope="col" className={TH}>
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tabular-nums text-slate-800">
                {numbers.rows.map((r) => (
                  <tr key={r.typology} className="border-b border-slate-100">
                    <th scope="row" className="px-3 py-3 text-start font-semibold text-slate-900">
                      {r.typology}
                    </th>
                    {rest.map((c) => (
                      <td
                        key={c.key}
                        className={cn(
                          'px-3 py-3',
                          c.key === 'variance' && 'font-bold text-rose-700',
                          c.key === 'quoted' && 'font-semibold text-slate-900',
                        )}
                      >
                        {r[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 space-y-3 md:hidden">
            {numbers.rows.map((r) => (
              <li key={r.typology} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-lg font-bold text-slate-900">{r[first.key]}</p>
                <dl className="mt-2 divide-y divide-slate-200 text-base">
                  {rest.map((c) => (
                    <div key={c.key} className="flex items-baseline justify-between gap-4 py-2">
                      <dt className="text-slate-700">{c.label}</dt>
                      <dd
                        className={cn(
                          'text-end font-semibold tabular-nums text-slate-900',
                          c.key === 'variance' && 'text-rose-700',
                        )}
                      >
                        {r[c.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-base italic text-slate-700">{numbers.footnote}</p>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-xl font-bold text-slate-900">How the numbers are worked out</h3>
          <Chip tone="blue" className="mt-2">
            {statutory.rule}
          </Chip>
          <p className="mt-3 text-lg font-bold text-slate-900">{statutory.title}</p>
          <p className="mt-1 text-base leading-relaxed text-slate-800">{statutory.intro}</p>
          <dl className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white text-base">
            {statutory.rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-3 px-4 py-3">
                <dt className="text-slate-700">{row.label}</dt>
                <dd
                  className={cn(
                    'text-end font-semibold text-slate-900',
                    row.strong && 'text-rose-700',
                  )}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-base leading-relaxed text-slate-700">{statutory.outro}</p>
        </aside>
      </div>
    </section>
  );
}
