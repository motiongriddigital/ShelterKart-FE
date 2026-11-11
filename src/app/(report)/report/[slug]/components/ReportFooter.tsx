import Link from 'next/link';
import type { PropertyReport } from '@/types/propertyReport';

export function ReportFooter({ report }: { report: PropertyReport }) {
  return (
    <footer className="mt-14 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1900px] px-4 py-8 md:px-8 xl:px-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-bold text-slate-900">ShelterKart</p>
            <p className="text-sm text-slate-600">Independent Due Diligence Engine</p>
            <p className="mt-1 max-w-md text-sm text-slate-600">
              ShelterKart is paid exclusively by property buyers. No developer, marketing agency or
              land owner can pay to change our findings in these reports.
            </p>
          </div>
          <Link
            href="/guide"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            The ShelterKart Home Buying Guide (12 Chapters Free)
          </Link>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-slate-600">
          <strong className="text-slate-700">Regulatory disclaimer:</strong> research, not advice.
          This document summarises information collected from public records, including regulatory
          filings and local municipal authorities, and does not constitute legal, financial or
          investment advice. Prospective buyers must conduct independent verification with a
          qualified professional before any transaction.
        </p>
        <p className="mt-3 flex flex-wrap justify-between gap-2 text-sm text-slate-600">
          <span>© 2026 ShelterKart. All rights reserved.</span>
          <span>Document reference: {report.ref}</span>
        </p>
      </div>
    </footer>
  );
}
