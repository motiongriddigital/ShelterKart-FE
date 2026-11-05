'use client';
import { ActionLink } from '@/components/ui/ActionLink';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Field';
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
      <p className="text-sm leading-relaxed text-slate-600">
        {t('Free and unconditional. See')}{' '}
        <ActionLink
          className="cursor-pointer font-semibold text-blue-700 underline"
          onActivate={() => open('principlesModal')}
        >
          {t('our Constitution')}
        </ActionLink>
        .{' '}
        {t(
          'Nothing here can change a finding; your response is reviewed, then published alongside the finding it responds to, never in place of it.',
        )}
      </p>
      <Input readOnly className="mt-3" value={f.ref} aria-label={t('Report reference')} />
      <Textarea
        className="mt-3"
        rows={2}
        placeholder={t("Paste the exact finding you're responding to.")}
        aria-label={t('The finding you are responding to')}
        value={f.finding}
        onChange={(e) => f.setFinding(e.target.value)}
      />
      <Textarea
        className="mt-3"
        rows={4}
        maxLength={2000}
        placeholder={t('Your response (max 2,000 characters).')}
        aria-label={t('Your response')}
        value={f.response}
        onChange={(e) => f.setResponse(e.target.value)}
      />
      <Input
        className="mt-3"
        type="email"
        placeholder={t('Contact email (for our review team, not shown publicly)')}
        aria-label={t('Contact email for our review team')}
        value={f.email}
        onChange={(e) => f.setEmail(e.target.value)}
      />
      <p
        role="status"
        className={`mt-2 min-h-5 text-sm ${f.result && !f.result.ok ? 'text-rose-600' : 'text-slate-600'}`}
      >
        {f.result?.text}
      </p>
      <Button className="mt-3 w-full" disabled={f.busy} onClick={f.submit}>
        {t('Submit for review')}
      </Button>
    </Modal>
  );
}
