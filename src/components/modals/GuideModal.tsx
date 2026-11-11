'use client';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { GUIDE_URL, useGuide } from '@/hooks/useGuide';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';

export function GuideModal() {
  const t = useT();
  const isOpen = useModalStore((s) => s.openId === 'guideModal');
  const close = useModalStore((s) => s.close);
  const { downloadGuide } = useGuide();

  return (
    <Modal
      id="guideModal"
      bare
      panelClassName="flex h-[92vh] max-w-5xl flex-col overflow-hidden p-0 md:p-0"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
        <span id="guideModal-title" className="text-base font-bold text-slate-900">
          {t('The ShelterKart Home Buying Guide')}
        </span>
        <span className="flex gap-2">
          <Button size="sm" onClick={downloadGuide}>
            {t('Download PDF')}
          </Button>
          <Button size="sm" variant="outline" onClick={close}>
            {t('Close')}
          </Button>
        </span>
      </div>
      {/* The guide loads only while open, and is dropped on close. */}
      <iframe
        className="w-full flex-1 bg-white"
        title={t('The ShelterKart Home Buying Guide')}
        src={isOpen ? GUIDE_URL : undefined}
      />
    </Modal>
  );
}
