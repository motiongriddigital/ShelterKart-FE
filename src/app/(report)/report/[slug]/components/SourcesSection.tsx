import type { PropertyReport } from '@/types/propertyReport';
import { Chip } from './Chip';
import { SectionHeading } from './SectionHeading';

const HEAD = ['Source authority', 'Document / reference', 'Verification status', 'Observation'];

export function SourcesSection({ report }: { report: PropertyReport }) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-12 md:px-6">
      <SectionHeading
        eyebrow="Section 05 · Audit trail"
        title="Regulatory Sources & Verified Evidence Index"
      />
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead>
            <tr className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
              {HEAD.map((h) => (
                <th key={h} scope="col" className="px-4 py-2.5 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {report.sources.map((s) => (
              <tr key={s.authority} className="border-t border-slate-100 align-top">
                <th scope="row" className="px-4 py-3 font-semibold text-slate-900">
                  {s.authority}
                </th>
                <td className="px-4 py-3 font-mono text-[11px]">{s.document}</td>
                <td className="px-4 py-3">
                  <Chip tone={s.status.tone}>{s.status.label}</Chip>
                </td>
                <td className="px-4 py-3">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
