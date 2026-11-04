import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { PropertyReport } from '@/types/propertyReport';

export function ReportHeader({ report }: { report: PropertyReport }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1900px] flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-8 xl:px-12">
        <Link href="/" aria-label="ShelterKart home" className="flex items-center gap-2">
          <Image
            src="/logo/shelterkart-lockup.svg"
            alt="ShelterKart"
            width={907}
            height={211}
            className="h-8 w-auto max-w-none"
            priority
          />
          <span className="hidden text-[0.6875rem] text-slate-500 md:block">
            Peace of mind,
            <br />
            on the record.
          </span>
          <span className="rounded border border-slate-300 px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-slate-500">
            Independent
          </span>
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <label className="relative hidden sm:block">
            <span className="sr-only">Search by registration number</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              defaultValue={report.registration.id}
              className="h-9 w-56 rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-700 outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30"
            />
          </label>
          <Link
            href="/corrections"
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Report an inaccuracy
          </Link>
          <a
            href={`/samples/${report.slug}.pdf`}
            className="rounded-md bg-blue-700 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800"
          >
            Download PDF (Full Audit)
          </a>
        </div>
      </div>
    </header>
  );
}
