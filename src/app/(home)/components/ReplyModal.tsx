'use client';
import { Modal } from '@/components/ui/Modal';
import { useReplyForm } from '@/hooks/useReportForms';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';

export function ReplyModal() {
  const t = useT();
  const open = useModalStore((s) => s.open);
  const f = useReplyForm();
  return (
    <Modal id="replyModal" title={t('Developer Right of Reply')}>
      <p>
        {t('Free and unconditional. See')}{' '}
        <a
          role="button"
          tabIndex={0}
          className="modal-link"
          onClick={() => open('principlesModal')}
        >
          {t('our Constitution')}
        </a>
        .{' '}
        {t(
          'Nothing here can change a finding; your response is reviewed, then published alongside the finding it responds to, never in place of it.',
        )}
      </p>
      <input readOnly className="modal-readonly" value={f.ref} aria-label={t('Report reference')} />
      <textarea
        rows={2}
        placeholder={t("Paste the exact finding you're responding to.")}
        aria-label={t('The finding you are responding to')}
        value={f.finding}
        onChange={(e) => f.setFinding(e.target.value)}
      />
      <textarea
        rows={4}
        maxLength={2000}
        placeholder={t('Your response (max 2,000 characters).')}
        aria-label={t('Your response')}
        value={f.response}
        onChange={(e) => f.setResponse(e.target.value)}
      />
      <input
        type="email"
        placeholder={t('Contact email (for our review team, not shown publicly)')}
        aria-label={t('Contact email for our review team')}
        value={f.email}
        onChange={(e) => f.setEmail(e.target.value)}
      />
      <p role="status" className={`modal-status${f.result && !f.result.ok ? ' err' : ''}`}>
        {f.result?.text}
      </p>
      <button className="modal-submit" disabled={f.busy} onClick={f.submit}>
        {t('Submit for review')}
      </button>
    </Modal>
  );
}
