'use client';
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
    <Modal id="guideModal" bare bgClassName="guide-bg" panelClassName="guide-modal">
      <div className="guide-bar">
        <span className="guide-bar-title" id="guideModal-title">
          {t('The ShelterKart Home Buying Guide')}
        </span>
        <span className="guide-bar-actions">
          <button type="button" className="guide-btn" onClick={downloadGuide}>
            {t('Download PDF')}
          </button>
          <button type="button" className="guide-btn ghost" onClick={close}>
            {t('Close')}
          </button>
        </span>
      </div>
      {/* The guide loads only while open, and is dropped on close, as before. */}
      <iframe
        className="guide-frame"
        id="guideFrame"
        title={t('The ShelterKart Home Buying Guide')}
        src={isOpen ? GUIDE_URL : undefined}
      />
    </Modal>
  );
}
