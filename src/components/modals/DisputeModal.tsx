'use client';
import { ActionLink } from '@/components/ui/ActionLink';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Field';
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
      <p className="text-base leading-relaxed text-slate-700">
        {t(
          'We review every dispute against the original source document. Submission does not guarantee removal or alteration of any finding — see',
        )}{' '}
        <ActionLink
          className="cursor-pointer font-semibold text-blue-700 underline"
          onActivate={() => open('tncModal')}
        >
          {t('Terms')}
        </ActionLink>
        .
      </p>
      <Input
        className="mt-3"
        placeholder={t('Your name & contact')}
        aria-label={t('Your name and contact details')}
        value={f.contact}
        onChange={(e) => f.setContact(e.target.value)}
      />
      <Textarea
        className="mt-3"
        rows={4}
        placeholder={t("Which finding, and what's inaccurate?")}
        aria-label={t('Which finding is inaccurate, and why')}
        value={f.note}
        onChange={(e) => f.setNote(e.target.value)}
      />
      <p
        role="status"
        className={`mt-2 min-h-5 text-base ${f.result && !f.result.ok ? 'text-rose-600' : 'text-slate-700'}`}
      >
        {f.result?.text}
      </p>
      <Button className="mt-3 w-full" disabled={f.busy} onClick={f.submit}>
        {t('Submit')}
      </Button>
    </Modal>
  );
}
