'use client';
import { ActionLink } from '@/components/ui/ActionLink';
import { useConsent } from '@/hooks/useConsent';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';

export function ConsentBanner() {
  const t = useT();
  const { sourceVisible, noticeVisible, chooseSource, accept } = useConsent();
  const open = useModalStore((s) => s.open);
  const readMore = (
    <ActionLink onActivate={() => open('privacyModal')}>{t('Read more')}</ActionLink>
  );

  return (
    <>
      <div
        className={`consent-banner${noticeVisible ? ' visible' : ''}`}
        id="consentBanner"
        role="dialog"
        aria-label={t('Data notice')}
      >
        <p>
          <span>
            {t(
              'We store a little data on this device so your unlocked reports are here when you return. Nothing is sold.',
            )}
          </span>{' '}
          {readMore}
        </p>
        <button onClick={accept}>OK</button>
      </div>
      <div
        className={`consent-banner${sourceVisible ? ' visible' : ''}`}
        id="sourceChoice"
        role="dialog"
        aria-label={t('Data notice')}
      >
        <p>
          <span>
            {t(
              'May we note which campaign link or website brought you, for this visit only? It helps us see which channels lead to purchases. Nothing is sold.',
            )}
          </span>{' '}
          {readMore}
        </p>
        <button className="alt" onClick={() => chooseSource('declined')}>
          {t('No thanks')}
        </button>
        <button onClick={() => chooseSource('granted')}>{t('Allow')}</button>
      </div>
    </>
  );
}
