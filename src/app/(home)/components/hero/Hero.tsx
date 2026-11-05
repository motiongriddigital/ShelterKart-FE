import Image from 'next/image';
import { TRACED_SOURCES, TRACED_TO } from '@/constants/home';
import { getT } from '@/i18n/server';
import { PillarCards } from './PillarCards';

export async function Hero() {
  const t = await getT();
  return (
    <section
      id="landing"
      className="bg-gradient-to-b from-slate-50 to-white px-4 pb-10 pt-10 md:px-8 md:pt-14"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="grid size-16 place-items-center rounded-xl border border-slate-200 bg-white shadow-md">
          <Image
            src="/logo/shelterkart-mark.svg"
            alt=""
            width={400}
            height={440}
            priority
            unoptimized
            className="h-11 w-auto"
          />
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          ShelterKart
        </h1>
        <p className="mt-2 text-lg text-slate-700 md:text-xl" dir="ltr" lang="en">
          Peace of mind, on the record.
        </p>
        <p className="mt-4 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-700">
          {t('Property & Builder Trust Assessments')}
        </p>

        <PillarCards />

        <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
          <span className="size-1.5 rounded-full bg-blue-600" aria-hidden="true" />
          {t(TRACED_TO)}
          <span className="font-normal normal-case tracking-normal text-slate-400">
            ({t(TRACED_SOURCES)})
          </span>
        </p>
      </div>
    </section>
  );
}
