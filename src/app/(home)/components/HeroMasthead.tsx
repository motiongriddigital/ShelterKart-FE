import { BrandMark } from '@/components/ui/BrandMark';
import { MARKETS } from '@/constants/markets';
import { getT } from '@/i18n/server';

const marketCount = Object.keys(MARKETS).length;

/** Flanking metadata, a centred device and a double rule: the structure of a publication of record. */
export async function HeroMasthead() {
  const t = await getT();
  const count = t('{n} Markets', { n: marketCount });
  return (
    <header className="masthead">
      <div className="mh-top-rule" aria-hidden="true" />

      <div className="mh-row">
        <span className="mh-flank mh-flank-l">{t('Est. 2026')}</span>

        <div className="mh-centre">
          <BrandMark className="brand-mark" size={64} />
          <h1 className="brand-name">ShelterKart</h1>
          <span className="brand-sub" dir="ltr" lang="en">
            Peace of mind, on the record.
          </span>
        </div>

        <span className="mh-flank mh-flank-r">
          <span className="mh-dot" aria-hidden="true" />
          <span className="js-market-count">{count}</span>
        </span>
      </div>

      <div className="mh-double-rule" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="mh-strap">{t('Property & Builder Trust Assessments')}</div>
      <div className="mh-count-m">
        <span className="mh-dot" aria-hidden="true" />
        <span className="js-market-count">{count}</span>
      </div>
    </header>
  );
}
