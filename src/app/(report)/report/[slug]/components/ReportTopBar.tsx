import type { PropertyReport } from '@/types/propertyReport';

export function ReportTopBar({ report }: { report: PropertyReport }) {
  return (
    <div className="bg-slate-900 text-[0.6875rem] text-slate-200">
      <div className="mx-auto flex max-w-[1900px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 md:px-8 xl:px-12">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-bold uppercase tracking-widest text-amber-300">
            Public audit record
          </span>
          <span>Reference: {report.ref}</span>
          <span className="text-slate-400">Research to {report.researchedTo}</span>
        </p>
        <p className="hidden items-center gap-3 text-slate-400 md:flex">
          <span>Payment simulated · No developer operations</span>
          <span className="text-emerald-300">● 8k Global Markets Active</span>
        </p>
      </div>
    </div>
  );
}
