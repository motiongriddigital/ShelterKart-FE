'use client';
import { Globe } from 'lucide-react';
import { Flag } from '@/components/ui/Flag';
import { MARKET_REGISTRY } from '@/constants/home';
import { useMarketSelection } from '@/hooks/useMarketSelection';
import { useT } from '@/hooks/useT';
import type { Market, MarketCode } from '@/types/market';
import { cn } from '@/utils/cn';
import { LanguageSelect } from './LanguageSelect';

/** One named button per market: a flag and its code, big enough to tap. The choice sets where searches look. */
export function MarketCoverage({ markets }: { markets: Market[] }) {
  const t = useT();
  const { market, label, select } = useMarketSelection();
  const registry = MARKET_REGISTRY[market];

  return (
    <section id="markets" className="scroll-mt-24 px-4 pt-4 pb-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-cream/80"
            aria-live="polite"
          >
            <Globe className="size-5 text-gold" aria-hidden="true" />
            {t('Where is the property?')}
            <strong key={market} className="anim-caption font-display text-xl text-cream">
              {t(label)}
            </strong>
            {registry && (
              <span className="rounded-md border border-gold/50 px-2 py-0.5 text-sm font-semibold text-gold">
                {registry}
              </span>
            )}
          </p>
          <LanguageSelect />
        </div>

        <p className="mt-2 text-base text-cream/75">
          {t('Pick the country. The records we search and the price you pay follow your choice.')}
        </p>

        <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12">
          {markets.map((m) => {
            const active = m.code === market;
            return (
              <li key={m.code}>
                <button
                  type="button"
                  aria-pressed={active}
                  aria-label={t('Select {country}', { country: t(m.label) })}
                  onClick={() => select(m.code as MarketCode)}
                  className={cn(
                    'flex w-full flex-col items-center gap-1 rounded-lg border px-1 py-3 text-sm font-semibold text-cream/80 transition-colors',
                    active
                      ? 'border-gold bg-cream/10 text-cream ring-1 ring-gold'
                      : 'border-cream/15 bg-cream/5 hover:border-cream/40 hover:bg-cream/10',
                  )}
                >
                  <Flag
                    code={m.code}
                    className="block size-8 overflow-hidden rounded-full [&>svg]:size-full"
                  />
                  {m.flag}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
