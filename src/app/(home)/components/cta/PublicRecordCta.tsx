import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/Button';
import { PUBLIC_RECORD } from '@/constants/home';
import { getT } from '@/i18n/server';

export async function PublicRecordCta() {
  const t = await getT();
  return (
    <section className="bg-[#061428] px-4 py-14 text-center text-[#fff] md:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <span className="mx-auto grid size-10 place-items-center rounded-lg border border-[#fff]/15 bg-[#fff]/5">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">
          {t(PUBLIC_RECORD.title)}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#cbd5e1]">
          {t(PUBLIC_RECORD.sub)}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-3 text-start md:grid-cols-4">
          {PUBLIC_RECORD.stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-[#fff]/10 bg-[#fff]/5 p-4">
              <dd className="text-2xl font-bold tabular-nums md:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {t(s.label)}
              </dt>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="#search" className={buttonVariants({ size: 'lg' })}>
            {t(PUBLIC_RECORD.primary)}
          </Link>
          <Link href="/independence" className={buttonVariants({ variant: 'onDark', size: 'lg' })}>
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t(PUBLIC_RECORD.secondary)}
          </Link>
        </div>
      </div>
    </section>
  );
}
