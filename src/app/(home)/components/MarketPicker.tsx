'use client';
import { Flag } from '@/components/ui/Flag';
import { useMarketSelection } from '@/hooks/useMarketSelection';
import { useT } from '@/hooks/useT';
import type { Market, MarketCode } from '@/types/market';

type Props = { markets: Market[] };

/** One large, named button per market: bigger tap targets than a map, readable at arm's length. */
export function MarketPicker({ markets }: Props) {
  const t = useT();
  const { market, label, select } = useMarketSelection();

  return (
    <>
      <div className="market-grid" id="countryRow">
        {markets.map((m) => {
          const active = m.code === market;
          return (
            <button
              key={m.code}
              type="button"
              className={`market-btn${active ? ' active' : ''}`}
              data-country={m.code}
              aria-pressed={active}
              aria-label={t('Select {country}', { country: t(m.label) })}
              onClick={() => select(m.code as MarketCode)}
            >
              <Flag code={m.code} className="market-flag" />
              <span className="market-name">{t(m.label)}</span>
              <span className="market-check" aria-hidden="true">
                &#10003;
              </span>
            </button>
          );
        })}
      </div>
      <span
        className={`market-caption${label ? ' is-set' : ''}`}
        id="marketCaption"
        aria-live="polite"
      >
        <span className="market-caption-label">{t('Searching')}</span>
        {/* keyed by market so the entrance animation restarts on every selection */}
        <span
          key={market}
          className="market-caption-name"
          id="marketCaptionName"
          data-code={market}
        >
          {t(label)}
        </span>
        <span className="market-caption-rule" aria-hidden="true" />
      </span>
    </>
  );
}
