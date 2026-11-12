import { getT } from '@/i18n/server';

/** What the product is, in one line, closing the plate. */
export async function Proposition() {
  const t = await getT();
  return (
    <div className="mx-auto mt-4 max-w-3xl px-4 text-center md:px-8">
      <h1 className="text-4xl font-semibold leading-tight tracking-tight text-cream md:text-6xl">
        {t('The public record,')}
        <br />
        <em className="text-gold">{t('before you commit.')}</em>
      </h1>
      <span aria-hidden="true" className="mx-auto mt-6 block h-0.5 w-24 bg-gold" />
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">
        {t(
          'Independent assessments of properties and the real estate developers behind them, with every claim traced to its public source.',
        )}
      </p>
    </div>
  );
}
