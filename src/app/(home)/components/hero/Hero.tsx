import Image from 'next/image';
import { TRACED_TO } from '@/constants/home';
import { getT } from '@/i18n/server';

/** The first thing a visitor reads: what this is for, in one sentence, with the search box right below. */
export async function Hero() {
  const t = await getT();
  return (
    <section
      id="landing"
      className="bg-gradient-to-b from-slate-50 to-white px-4 pb-6 pt-8 md:px-8 md:pt-12"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Image
          src="/logo/shelterkart-mark.svg"
          alt=""
          width={400}
          height={440}
          priority
          unoptimized
          className="h-14 w-auto"
        />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          {t('Check a property before you pay for it')}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-700 md:text-xl">
          {t(
            'We look up the official records and tell you, in plain words, what matches, what does not, and what to ask the seller.',
          )}
        </p>
        <p className="mt-3 text-base text-slate-600">{t(TRACED_TO)}</p>
      </div>
    </section>
  );
}
