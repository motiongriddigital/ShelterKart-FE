import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import type { PropertyReport } from '@/types/propertyReport';

/** What a reader can do with this report: go back, flag a mistake, keep a copy. */
export function ReportActions({ report }: { report: PropertyReport }) {
  return (
    <div className="mx-auto flex max-w-[1900px] flex-wrap items-center gap-2 px-4 pt-5 md:px-8 xl:px-12">
      <Link href="/#search" className={buttonVariants({ variant: 'outline' })}>
        <ArrowLeft aria-hidden="true" />
        Check another property
      </Link>
      <div className="ms-auto flex flex-wrap items-center gap-2">
        <Link href="/corrections" className={buttonVariants({ variant: 'outline' })}>
          Report a mistake
        </Link>
        <a href={`/samples/${report.slug}.pdf`} className={buttonVariants()}>
          <Download aria-hidden="true" />
          Download the PDF
        </a>
      </div>
    </div>
  );
}
