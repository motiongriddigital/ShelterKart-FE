'use client';
import { ActionLink } from '@/components/ui/ActionLink';
import { Button } from '@/components/ui/Button';
import { useConsent } from '@/hooks/useConsent';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';

const BAR =
  'fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-3xl flex-wrap items-center gap-3 rounded-lg bg-[#0f172a] p-4 text-base text-[#fff] shadow-2xl';

export function ConsentBanner() {
  const t = useT();
  const { sourceVisible, noticeVisible, chooseSource, accept } = useConsent();
  const open = useModalStore((s) => s.open);
  const readMore = (
    <ActionLink className="cursor-pointer underline" onActivate={() => open('privacyModal')}>
      {t('Read more')}
    </ActionLink>
  );

  return (
    <>
      <div hidden={!noticeVisible} role="dialog" aria-label={t('Data notice')} className={BAR}>
        <p className="min-w-0 flex-1">
          {t(
            'We store a little data on this device so your unlocked reports are here when you return. Nothing is sold.',
          )}{' '}
          {readMore}
        </p>
        <Button size="sm" onClick={accept}>
          OK
        </Button>
      </div>
      <div hidden={!sourceVisible} role="dialog" aria-label={t('Data notice')} className={BAR}>
        <p className="min-w-0 flex-1">
          {t(
            'May we note which campaign link or website brought you, for this visit only? It helps us see which channels lead to purchases. Nothing is sold.',
          )}{' '}
          {readMore}
        </p>
        <Button size="sm" variant="onDark" onClick={() => chooseSource('declined')}>
          {t('No thanks')}
        </Button>
        <Button size="sm" onClick={() => chooseSource('granted')}>
          {t('Allow')}
        </Button>
      </div>
    </>
  );
}
