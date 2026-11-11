import { Decor } from '@/components/illustrations/Decor';
import { SkylineArt } from '@/components/illustrations/SkylineArt';
import type { PropertyReport } from '@/types/propertyReport';

/** The report's own small print, above the site footer. */
export function ReportDisclaimer({ report }: { report: PropertyReport }) {
  return (
    <section
      aria-label="About this report"
      className="relative mt-14 overflow-hidden border-t border-slate-200 bg-slate-50"
    >
      <Decor className="inset-x-0 bottom-0">
        <SkylineArt className="h-20 w-full text-blue-600/20 md:h-28" />
      </Decor>
      <div className="relative mx-auto max-w-[1900px] px-4 pb-24 pt-8 md:px-8 md:pb-32 xl:px-12">
        <p className="max-w-3xl text-base leading-relaxed text-slate-800">
          <strong className="text-slate-900">Please note:</strong> this report is research, not
          advice. It summarises information from public records, including regulator filings and
          local authorities, and is not legal, financial or investment advice. Before you pay
          anything, check the details with a qualified professional.
        </p>
        <p className="mt-3 text-base text-slate-700">Report reference: {report.ref}</p>
      </div>
    </section>
  );
}
