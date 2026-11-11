import type { PropertyReport } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { Chip } from './Chip';
import { SectionHeading } from './SectionHeading';

const HEAD = [
  'Typology',
  'Carpet area',
  'Quoted / asking',
  'Effective rate',
  'Registered benchmark',
  'Variance',
];

export function NumbersSection({ report }: { report: PropertyReport }) {
  const { numbers } = report;
  const { statutory } = numbers;
  return (
    <section className="mx-auto max-w-[1900px] px-4 pt-12 md:px-8 xl:px-12">
      <SectionHeading
        eyebrow="Part 3 · The numbers"
        title="The numbers, checked"
        sub="How the price you were quoted compares with the official benchmark."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-slate-900">{numbers.title}</h3>
            <Chip tone="green">{numbers.badge}</Chip>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[35rem] border-collapse text-left text-sm">
              <thead>
                <tr className="text-sm text-slate-600">
                  {HEAD.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border-b border-slate-200 px-2 py-2 font-bold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tabular-nums text-slate-700">
                {numbers.rows.map((r) => (
                  <tr key={r.typology} className="border-b border-slate-100">
                    <th scope="row" className="px-2 py-3 font-semibold text-slate-900">
                      {r.typology}
                    </th>
                    <td className="px-2 py-3">{r.area}</td>
                    <td className="px-2 py-3 font-semibold text-slate-900">{r.quoted}</td>
                    <td className="px-2 py-3">{r.effective}</td>
                    <td className="px-2 py-3">{r.benchmark}</td>
                    <td className="px-2 py-3 font-bold text-rose-600">{r.variance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm italic text-slate-600">{numbers.footnote}</p>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-600">How the numbers are worked out</h3>
            <Chip tone="blue">{statutory.rule}</Chip>
          </div>
          <p className="mt-2 text-base font-bold text-slate-900">{statutory.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">{statutory.intro}</p>
          <dl className="mt-3 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white text-sm">
            {statutory.rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-3 px-3 py-2">
                <dt className="text-slate-600">{row.label}</dt>
                <dd className={cn('font-semibold text-slate-900', row.strong && 'text-rose-600')}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{statutory.outro}</p>
        </aside>
      </div>
    </section>
  );
}
