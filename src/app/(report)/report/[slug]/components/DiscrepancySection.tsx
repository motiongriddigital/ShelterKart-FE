import { Landmark, Megaphone, type LucideIcon } from 'lucide-react';
import type { Claim, PropertyReport } from '@/types/propertyReport';
import { cn } from '@/utils/cn';
import { ResearchBuildingArt } from '@/components/illustrations/ResearchBuildingArt';
import { SectionHeading } from './SectionHeading';

function ClaimBox({
  caption,
  icon: Icon,
  claim,
  official,
}: {
  caption: string;
  icon: LucideIcon;
  claim: Claim;
  official?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4',
        official ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white',
      )}
    >
      <p className="flex items-center gap-2 text-base font-bold text-slate-900">
        <Icon className="size-5 shrink-0" aria-hidden="true" />
        {caption}
      </p>
      <p className="mt-2 text-xl font-semibold text-slate-900">{claim.title}</p>
      <p className="mt-1 text-base text-slate-700">{claim.note}</p>
      <p className="mt-2 text-sm text-slate-600">Source: {claim.label}</p>
    </div>
  );
}

export function DiscrepancySection({ report }: { report: PropertyReport }) {
  return (
    <section
      id="differences"
      className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12"
    >
      <SectionHeading
        art={<ResearchBuildingArt className="w-full text-blue-600/20" />}
        eyebrow="Part 1 · Claims and records"
        title="Where the brochure and the official records disagree"
        sub="Each card puts what the seller says next to what the official record says."
        aside={
          <span className="font-semibold text-rose-700">
            {report.discrepancies.length} important differences found
          </span>
        }
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {report.discrepancies.map((d, i) => (
          <article
            key={d.code}
            className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-base font-bold text-blue-700">
              Difference {i + 1} · {d.tag}
            </p>
            <h3 className="mt-1 text-xl font-bold text-slate-900">{d.title}</h3>
            <div className="mt-4 grid gap-3">
              <ClaimBox caption="What the seller says" icon={Megaphone} claim={d.claimed} />
              <ClaimBox
                caption="What the official record says"
                icon={Landmark}
                claim={d.official}
                official
              />
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-800">
              <strong className="text-slate-900">{d.footer.label}:</strong> {d.footer.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
