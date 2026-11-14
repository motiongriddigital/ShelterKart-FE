import { AlertTriangle } from 'lucide-react';
import { BlueprintArt } from '@/components/illustrations/BlueprintArt';
import { Decor } from '@/components/illustrations/Decor';
import type { PropertyReport } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { Chip } from './Chip';
import { StatGrid } from './StatGrid';

export function ReportHero({ report }: { report: PropertyReport }) {
  const { registration } = report;
  const differences = report.discrepancies.length;
  return (
    <section
      id="summary"
      className="relative mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-6 md:px-8 md:pt-8 xl:px-12"
    >
      <Decor className="end-[26rem] top-10 hidden w-56 2xl:block">
        <BlueprintArt className="w-full text-blue-600/20" />
      </Decor>
      <div className="relative grid gap-6 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="green">Regulator registration {registration.id}</Chip>
            <Chip tone="blue">Registered {registration.registeredOn}</Chip>
            <span className="text-base text-slate-700">In {registration.jurisdiction}</span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {report.name}
          </h1>
          <p className="mt-2 text-lg text-slate-700">{report.address}</p>
          <p className="mt-5 max-w-2xl text-xl font-semibold leading-snug text-slate-900">
            {report.headline}
          </p>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-700">
            {report.summary}
          </p>
          <a
            href="#differences"
            className="mt-5 inline-flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-lg font-semibold text-amber-900 hover:bg-amber-100"
          >
            <AlertTriangle className="size-6 shrink-0" aria-hidden="true" />
            {differences} important {differences === 1 ? 'difference' : 'differences'} found. See
            what they are
          </a>
        </div>

        <aside
          aria-label="Key facts"
          className="self-start rounded-xl border border-slate-200 bg-slate-50 p-5"
        >
          <h2 className="mb-3 text-lg font-bold text-slate-900">Key facts</h2>
          <dl className="divide-y divide-slate-200 text-base">
            {report.ledger.map((row) => (
              <div key={row.label} className="py-2.5">
                <dt className="text-slate-700">{row.label}</dt>
                <dd
                  className={cn(
                    'mt-0.5 text-lg font-semibold text-slate-900',
                    row.highlight &&
                      'inline-block rounded-md bg-amber-50 px-2 text-amber-800 ring-1 ring-amber-200',
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
