import { REPORT_SECTIONS } from '@/constants/reportSections';

/** "On this page": one tap to any part of the report, so a reader always knows where they are. */
export function ReportNav() {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-[4.5rem] z-30 border-b border-slate-200 bg-white/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-[1900px] gap-2 overflow-x-auto px-4 py-2.5 md:px-8 xl:px-12">
        {REPORT_SECTIONS.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              className="inline-flex h-10 items-center rounded-full border border-slate-300 px-4 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
