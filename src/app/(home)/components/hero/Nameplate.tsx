import { DocumentMark } from '@/components/illustrations/DocumentMark';
import { MARKETS } from '@/constants/markets';
import { getT } from '@/i18n/server';

/** The masthead of a publication of record: provenance on one side, standing on the other, the mark between. */
export async function Nameplate() {
  const t = await getT();
  const markets = Object.keys(MARKETS).length;
  return (
    <header className="mx-auto max-w-4xl px-4 pt-8 md:px-8 md:pt-10">
      <div className="flex items-center justify-between text-base tracking-wide text-gold">
        <span>{t('Est. 2026')}</span>
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-gold" aria-hidden="true" />
          {t('{n} Markets', { n: markets })}
        </span>
      </div>

      <div className="mt-2 text-center">
        <DocumentMark animated className="mx-auto" />
        <p className="anim-fade mt-3 font-display text-4xl text-cream md:text-5xl">ShelterKart</p>
        <p className="mt-1 font-display text-lg text-cream/90" dir="ltr" lang="en">
          Peace of mind, on the record.
        </p>
      </div>

      <div aria-hidden="true" className="mt-5 grid gap-1">
        <span className="anim-rule-1 h-0.5 bg-gold" />
        <span className="anim-rule-2 h-px bg-gold/60" />
      </div>
      <p className="mt-3 text-center text-base tracking-wide text-cream/70">
        {t('Property & Builder Trust Assessments')}
      </p>
    </header>
  );
}
