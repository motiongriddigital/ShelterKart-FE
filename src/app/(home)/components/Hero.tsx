import type { Market } from '@/types/market';
import { getT } from '@/i18n/server';
import { EvidenceStandard } from './EvidenceStandard';
import { GuideCard } from './GuideCard';
import { HeroFoot } from './HeroFoot';
import { LanguageBar } from './LanguageBar';
import { HeroMasthead } from './HeroMasthead';
import { MarketPicker } from './MarketPicker';
import { ReportPanel } from './ReportPanel';
import { SearchCard } from './SearchCard';

const PLATE_MARKS = ['plate-tl', 'plate-tr', 'plate-bl', 'plate-br'];

export async function Hero({ markets }: { markets: Market[] }) {
  const t = await getT();
  return (
    <div className="hero" id="landing">
      <div className="hero-vignette" aria-hidden="true" />
      {PLATE_MARKS.map((c) => (
        <span key={c} className={`plate-mark ${c}`} aria-hidden="true" />
      ))}
      <span className="plate-rail" aria-hidden="true" />
      <span className="plate-imprint" aria-hidden="true">
        ShelterKart &middot; Evidence Standard &middot; Est. 2026
      </span>
      <div className="hero-plate">
        <div className="hero-inner">
          <HeroMasthead />

          <div className="hero-main">
            <EvidenceStandard />

            <div className="hero-body">
              <div className="hero-col-main">
                <MarketPicker markets={markets} />
                <LanguageBar />
                <SearchCard />
                <GuideCard />
              </div>
            </div>

            <ReportPanel />
            <div className="proposition">
              <h1 className="hero-headline">
                <span>{t('The public record,')}</span>
                <br />
                <em>{t('before you commit.')}</em>
              </h1>
              <span className="hero-divider" aria-hidden="true" />
              <p className="hero-sub">
                {t(
                  'Independent assessments of properties and the real estate developers behind them, with every claim traced to its public source.',
                )}
              </p>
            </div>

            <HeroFoot />
          </div>
        </div>
      </div>
    </div>
  );
}
