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
    <section id="markets" className="px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-wider text-slate-500"
            aria-live="polite"
          >
            <Globe className="size-3.5 text-blue-700" aria-hidden="true" />
            {t('Jurisdiction coverage')}:
            <strong className="text-sm normal-case tracking-normal text-slate-900">
              {t(label)}
            </strong>
            {registry && (
              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-700">
                {registry}
              </span>
            )}
          </p>
          <LanguageSelect />
        </div>

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
                    'flex w-full flex-col items-center gap-1 rounded-lg border px-1 py-2 text-[10px] font-semibold uppercase text-slate-500 transition-colors',
                    active
                      ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600'
                      : 'border-transparent hover:border-slate-200 hover:bg-slate-50',
                  )}
                >
                  <Flag
                    code={m.code}
                    className="block size-7 overflow-hidden rounded-full [&>svg]:size-full"
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
