import type { PropertyReport } from '@/types/propertyReport';

export function ReportTopBar({ report }: { report: PropertyReport }) {
  return (
    <div className="bg-[#0f172a] text-[0.6875rem] text-[#e2e8f0]">
      <div className="mx-auto flex max-w-[1900px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 md:px-8 xl:px-12">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-bold uppercase tracking-widest text-[#fcd34d]">
            Public audit record
          </span>
          <span>Reference: {report.ref}</span>
          <span className="text-[#94a3b8]">Research to {report.researchedTo}</span>
        </p>
        <p className="hidden items-center gap-3 text-[#94a3b8] md:flex">
          <span>Payment simulated · No developer operations</span>
          <span className="text-[#6ee7b7]">● 8k Global Markets Active</span>
        </p>
      </div>
    </div>
  );
}
