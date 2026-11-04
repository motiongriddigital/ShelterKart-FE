import type { PropertyReport } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { Chip } from './Chip';
import { StatGrid } from './StatGrid';

export function ReportHero({ report }: { report: PropertyReport }) {
  const { registration } = report;
  return (
    <section className="mx-auto max-w-[1900px] px-4 pt-6 md:px-8 md:pt-8 xl:px-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Chip tone="green">MahaRERA {registration.id}</Chip>
            <Chip tone="blue">Registered {registration.registeredOn}</Chip>
            <span className="text-[0.6875rem] text-slate-500 self-center">
              Jurisdiction: {registration.jurisdiction}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {report.name}
          </h1>
          <p className="mt-1 text-sm text-slate-600">{report.address}</p>
          <p className="mt-5 max-w-xl text-lg font-semibold leading-snug text-slate-900">
            {report.headline}
          </p>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-500">{report.summary}</p>
        </div>

        <aside
          aria-label="Registry ledger stamp"
          className="self-start rounded-lg border border-slate-200 bg-slate-50 p-4"
        >
          <h2 className="mb-3 text-[0.625rem] font-bold uppercase tracking-widest text-slate-500">
            Registry ledger stamp
          </h2>
          <dl className="divide-y divide-slate-200 text-xs">
            {report.ledger.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-3 py-2">
                <dt className="text-slate-500">{row.label}</dt>
                <dd
                  className={cn(
                    'text-right font-semibold text-slate-900',
                    row.highlight && 'rounded bg-amber-100 px-1.5 text-amber-800',
                  )}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <StatGrid stats={report.stats} />
    </section>
  );
}
