'use client';
import { useGuide } from '@/hooks/useGuide';
import { useT } from '@/hooks/useT';

export function GuideCard() {
  const t = useT();
  const { openGuide, downloadGuide, shareHref, trackShare } = useGuide();

  return (
    <div className="guide-card" id="guideCard">
      <div className="guide-card-text">
        <span className="guide-kicker">{t('Free guide')}</span>
        <h2 className="guide-card-title">{t('The ShelterKart Home Buying Guide')}</h2>
        <p className="guide-card-sub">
          {t(
            'What to check, what to ask, and what a good answer sounds like. 12 chapters, free, for any country.',
          )}
        </p>
        <p className="guide-card-note">{t('The guide is in English.')}</p>
      </div>
      <div className="guide-card-actions">
        <button type="button" className="guide-cta" onClick={() => openGuide()}>
          {t('Read the guide')}
        </button>
        <button type="button" className="guide-cta ghost" onClick={downloadGuide}>
          {t('Download PDF')}
        </button>
        <a
          className="guide-cta ghost"
          href="https://wa.me/?text="
          target="_blank"
          rel="noopener noreferrer"
          id="guideShare"
          onClick={(e) => {
            e.currentTarget.href = shareHref(); // the address is only known in the browser
            trackShare('home');
          }}
        >
          {t('Share the question card')}
        </a>
      </div>
    </div>
  );
}
