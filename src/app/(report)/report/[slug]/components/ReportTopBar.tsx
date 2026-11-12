import type { PropertyReport } from '@/types/propertyReport';

export function ReportTopBar({ report }: { report: PropertyReport }) {
  return (
    <div className="bg-navy text-sm text-[#e2e8f0]">
      <div className="mx-auto flex max-w-[1900px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 md:px-8 xl:px-12">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-bold text-[#fcd34d]">Property report</span>
          <span>Reference: {report.ref}</span>
          <span className="text-[#94a3b8]">Checked up to {report.researchedTo}</span>
        </p>
        <p className="hidden items-center gap-3 text-[#94a3b8] md:flex">
          <span>Sample report: no payment taken</span>
        </p>
      </div>
    </div>
  );
}
