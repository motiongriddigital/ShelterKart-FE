import type { KeyFact } from '@/types/customResearch';
import { SectionHeading } from '../components/SectionHeading';
import { SourceLink } from './SourceLink';

export function CustomKeyFacts({ facts }: { facts: KeyFact[] }) {
  if (!facts.length) return null;
  return (
    <section id="facts" className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12">
      <SectionHeading
        eyebrow="Part 1 · Key facts"
        title="What we found about this property"
        sub="Each fact links to the page it came from."
      />
      <dl className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <dt className="text-base text-slate-700">{f.label}</dt>
            <dd className="mt-1 text-xl font-semibold text-slate-900">{f.value}</dd>
            <p className="mt-3">
              <SourceLink href={f.sourceUrl} />
            </p>
          </div>
        ))}
      </dl>
    </section>
  );
}
