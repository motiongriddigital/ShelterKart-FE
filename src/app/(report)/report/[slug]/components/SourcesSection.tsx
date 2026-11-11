import type { PropertyReport } from '@/types/propertyReport';
import { Chip } from './Chip';
import { LandPlotArt } from '@/components/illustrations/LandPlotArt';
import { SectionHeading } from './SectionHeading';

export function SourcesSection({ report }: { report: PropertyReport }) {
  return (
    <section
      id="sources"
      className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12"
    >
      <SectionHeading
        art={<LandPlotArt className="w-full text-blue-600/20" />}
        eyebrow="Part 5 · Where this came from"
        title="The official sources we used"
        sub="Every finding in this report comes from one of these records."
      />
      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {report.sources.map((s) => (
          <li
            key={s.authority}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5"
          >
            <Chip tone={s.status.tone} className="self-start">
              {s.status.label}
            </Chip>
            <h3 className="mt-3 text-lg font-bold text-slate-900">{s.authority}</h3>
            <p className="mt-1 text-base text-slate-700">{s.document}</p>
            <p className="mt-3 text-base leading-relaxed text-slate-800">{s.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
