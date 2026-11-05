import Link from 'next/link';
import { Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';

export function SearchCta() {
  return (
    <section className="flex flex-col gap-5 rounded-lg bg-[#0a1c33] p-6 text-[#fff] md:flex-row md:items-center md:justify-between md:p-8">
      <div className="max-w-xl">
        <p className="flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-wider text-[#94a3b8]">
          <Search className="size-3.5" aria-hidden="true" />
          Independent public record search
        </p>
        <h2 className="mt-2 text-xl font-bold text-[#fff] md:text-2xl">
          Verify any off-plan home before signing.
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-[#94a3b8]">
          Enter a project name, developer, or official RERA registration number to generate an
          unvarnished evidentiary docket within seconds.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/#search" className={buttonVariants({ size: 'lg' })}>
          Search Public Docket
        </Link>
        <Link href="/methodology" className={buttonVariants({ size: 'lg', variant: 'onDark' })}>
          Read Methodology
        </Link>
      </div>
    </section>
  );
}
