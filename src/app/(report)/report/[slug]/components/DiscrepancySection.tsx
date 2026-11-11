import type { Claim, PropertyReport } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { SectionHeading } from './SectionHeading';

function ClaimBox({ claim, official }: { claim: Claim; official?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-md border p-3',
        official ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white',
      )}
    >
      <p className="text-sm font-bold text-slate-600">{claim.label}</p>
      <p className="mt-1 text-base font-semibold text-slate-900">{claim.title}</p>
      <p className="mt-0.5 text-sm text-slate-600">{claim.note}</p>
    </div>
  );
}

export function DiscrepancySection({ report }: { report: PropertyReport }) {
  return (
    <section className="mx-auto max-w-[1900px] px-4 pt-12 md:px-8 xl:px-12">
      <SectionHeading
        eyebrow="Part 1 · Claims and records"
        title="Where the brochure and the official records disagree"
        sub="Each box puts what the seller says next to what the official record says."
        aside={`${report.discrepancies.length} important differences found`}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {report.discrepancies.map((d) => (
          <article
            key={d.code}
            className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            <p className="flex items-center justify-between text-sm font-bold text-slate-600">
              <span>{d.tag}</span>
              <span className="text-slate-600">{d.code}</span>
            </p>
            <h3 className="mt-2 text-base font-bold text-slate-900">{d.title}</h3>
            <div className="mt-3 grid gap-2">
              <ClaimBox claim={d.claimed} />
              <ClaimBox claim={d.official} official />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              <strong className="text-slate-900">{d.footer.label}:</strong> {d.footer.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
