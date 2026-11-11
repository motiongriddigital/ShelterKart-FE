import { FileSearch, Search, Unlock, type LucideIcon } from 'lucide-react';
import { Decor } from '@/components/illustrations/Decor';
import { KeyHouseArt } from '@/components/illustrations/KeyHouseArt';
import { HOW_IT_WORKS } from '@/constants/home';
import { getT } from '@/i18n/server';
import type { Step } from '@/types/home';

const ICONS: Record<Step['icon'], LucideIcon> = {
  search: Search,
  preview: FileSearch,
  unlock: Unlock,
};

/** Three plain steps, so a first-time visitor knows what happens and what it costs before they start. */
export async function HowItWorks() {
  const t = await getT();
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="relative scroll-mt-24 overflow-x-clip px-4 pb-12 md:px-8"
    >
      <Decor className="-end-4 -top-6 hidden w-44 xl:block">
        <KeyHouseArt className="w-full text-blue-600/25" />
      </Decor>
      <div className="mx-auto max-w-5xl">
        <h2
          id="how-title"
          className="text-center text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          {t('How it works')}
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-blue-700">
                    {t('Step {n}', { n: i + 1 })}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">{t(step.title)}</h3>
                  <p className="mt-1 text-base leading-relaxed text-slate-700">{t(step.text)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
