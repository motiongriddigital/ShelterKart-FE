'use client';
import { ActionLink } from '@/components/ui/ActionLink';
import { useConsent } from '@/hooks/useConsent';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';

export function ConsentBanner() {
  const t = useT();
  const { visible, accept } = useConsent();
  const open = useModalStore((s) => s.open);

  return (
    <div
      className={`consent-banner${visible ? ' visible' : ''}`}
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
        <ActionLink onActivate={() => open('privacyModal')}>{t('Read more')}</ActionLink>
      </p>
      <button onClick={accept}>OK</button>
    </div>
  );
}
