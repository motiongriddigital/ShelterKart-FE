'use client';
import { Modal } from '@/components/ui/Modal';
import { useDisputeForm } from '@/hooks/useReportForms';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';

export function DisputeModal() {
  const t = useT();
  const open = useModalStore((s) => s.open);
  const f = useDisputeForm();
  return (
    <Modal id="disputeModal" title={t('Report an inaccuracy')}>
      <p>
        {t(
          'We review every dispute against the original source document. Submission does not guarantee removal or alteration of any finding — see',
        )}{' '}
        <a role="button" tabIndex={0} className="modal-link" onClick={() => open('tncModal')}>
          {t('Terms')}
        </a>
        .
      </p>
      <input
        placeholder={t('Your name & contact')}
        aria-label={t('Your name and contact details')}
        value={f.contact}
        onChange={(e) => f.setContact(e.target.value)}
      />
      <textarea
        rows={4}
        placeholder={t("Which finding, and what's inaccurate?")}
        aria-label={t('Which finding is inaccurate, and why')}
        value={f.note}
        onChange={(e) => f.setNote(e.target.value)}
      />
      <p role="status" className={`modal-status${f.result && !f.result.ok ? ' err' : ''}`}>
        {f.result?.text}
      </p>
      <button className="modal-submit" disabled={f.busy} onClick={f.submit}>
        {t('Submit')}
      </button>
    </Modal>
  );
}
