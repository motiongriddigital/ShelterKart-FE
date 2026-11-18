import { Landmark, Megaphone, type LucideIcon } from 'lucide-react';
import type { Claim, Difference } from '@/types/customResearch';
import { cn } from '@/utils/cn';
import { SectionHeading } from '../components/SectionHeading';
import { SourceLink } from './SourceLink';

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
      <p className="mt-2 text-xl font-semibold text-slate-900">{claim.value}</p>
      <p className="mt-1 text-base text-slate-700">{claim.detail}</p>
      <p className="mt-2">
        <SourceLink href={claim.sourceUrl} />
      </p>
    </div>
  );
}

/** Where what the seller says and what the records show do not match. */
export function CustomDifferences({ differences }: { differences: Difference[] }) {
  return (
    <section
      id="differences"
      className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12"
    >
      <SectionHeading
        eyebrow="Part 2 · Claims and records"
        title="Where the seller and the records disagree"
        sub="Each card puts what the seller says next to what an independent record says."
      />
      {differences.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white p-5 text-lg text-slate-800">
          We did not find a disagreement between the seller and the records in what we read.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {differences.map((d, i) => (
            <article
              key={d.title}
              className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <p className="text-base font-bold text-blue-700">
                Difference {i + 1} · {d.category}
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">{d.title}</h3>
              <div className="mt-4 grid gap-3">
                <ClaimBox caption="What the seller says" icon={Megaphone} claim={d.sellerClaim} />
                <ClaimBox
                  caption="What the record says"
                  icon={Landmark}
                  claim={d.officialRecord}
                  official
                />
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-800">
                <strong className="text-slate-900">Why it matters:</strong> {d.impact}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
