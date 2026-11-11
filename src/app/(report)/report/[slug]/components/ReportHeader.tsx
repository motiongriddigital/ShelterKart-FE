import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import type { PropertyReport } from '@/types/propertyReport';

export function ReportHeader({ report }: { report: PropertyReport }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1900px] flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-8 xl:px-12">
        <Link href="/" aria-label="ShelterKart home" className="flex items-center gap-2">
          <Logo priority />
          <span className="hidden text-sm text-slate-600 md:block">
            Peace of mind,
            <br />
            on the record.
          </span>
          <span className="rounded-md border border-slate-300 px-1.5 py-0.5 text-sm font-bold text-slate-600">
            Independent
          </span>
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <label className="relative hidden sm:block">
            <span className="sr-only">Search by registration number</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-slate-600"
            />
            <input
              type="search"
              defaultValue={report.registration.id}
              className="h-11 w-56 rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-sm text-slate-700 outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/30"
            />
          </label>
          <ThemeToggle className="size-9" />
          <Link
            href="/corrections"
            className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50"
          >
            Report a mistake
          </Link>
          <a
            href={`/samples/${report.slug}.pdf`}
            className="rounded-md bg-blue-700 px-4 py-2.5 text-base font-semibold text-white hover:bg-blue-800 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300"
          >
            Download the PDF
          </a>
        </div>
      </div>
    </header>
  );
}
