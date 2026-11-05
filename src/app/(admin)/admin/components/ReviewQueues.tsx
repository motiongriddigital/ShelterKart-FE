import { SENDER_CHECK } from '@/constants/admin';
import type { DevResponse, Dispute, Held } from '@/types/admin';
import { bars } from '@/app/(admin)/admin/styles/ui';
import { Button } from '@/components/ui/Button';

export function DisputesQueue({
  rows,
  onResolve,
}: {
  rows: Dispute[];
  onResolve: (id: string) => void;
}) {
  if (!rows.length) return <div className={bars.empty}>No open reports of inaccuracy.</div>;
  return (
    <>
      {rows.map((r) => (
        <div
          className="flex items-start justify-between gap-3 border-b border-rule py-3"
          key={r.id}
        >
          <div>
            <strong>{r.report_ref ?? '—'}</strong> · {r.contact ?? 'no contact given'}
            <div>{r.note}</div>
            <div className="mt-1 text-[12.5px] text-ink-3">
              Submitted {new Date(r.submitted_at).toLocaleString()}
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={() => onResolve(r.id)}>
              Mark resolved
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}

export function ResponsesQueue({
  rows,
  onReview,
}: {
  rows: DevResponse[];
  onReview: (id: string, a: 'approve' | 'reject') => void;
}) {
  if (!rows.length) return <div className={bars.empty}>No replies waiting.</div>;
  return (
    <>
      {rows.map((r) => (
        <div
          className="flex items-start justify-between gap-3 border-b border-rule py-3"
          key={r.id}
        >
          <div>
            <strong>{r.report_ref}</strong> · {r.contact_email}
            <div className="mt-1 text-[12.5px] text-ink-3">
              <strong>{SENDER_CHECK[r.sender_check ?? ''] ?? SENDER_CHECK.unknown}</strong>
              {r.developer_site ? ` (${r.developer_site})` : ''}
            </div>
            <div className="mt-1 text-[12.5px] text-ink-3">
              {r.report_available === false
                ? 'The report is no longer available.'
                : (r.finding_match ?? -1) >= 0
                  ? `Quotes finding ${(r.finding_match as number) + 1} of the report.`
                  : 'Quotes none of the report’s findings — check what it answers.'}
            </div>
            <div className="mt-1.5">
              <em>Responding to:</em> “{r.finding_text}”
            </div>
            <div className="mt-1.5">{r.response_text}</div>
            <div className="mt-1 text-[12.5px] text-ink-3">
              Submitted {new Date(r.submitted_at).toLocaleString()}
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={() => onReview(r.id, 'approve')}>
              Approve
            </Button>
            <Button variant="outline" size="sm" onClick={() => onReview(r.id, 'reject')}>
              Reject
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}

export function HeldQueue({
  held,
  onRelease,
}: {
  held: Held | null;
  onRelease: (ref: string) => void;
}) {
  if (!held?.held.length) return <div className={bars.empty}>No reports waiting for a check.</div>;
  return (
    <>
      {held.held.map((h) => (
        <div
          className="flex items-start justify-between gap-3 border-b border-rule py-3"
          key={h.ref}
        >
          <div>
            <strong>{h.ref}</strong> · {h.project ?? ''} · {h.developer ?? ''} ({h.market ?? ''})
            {h.adverse.map((a) => (
              <div key={a.claim} className="mt-1.5">
                • {a.claim}
                <div className="mt-1 text-[12.5px] text-ink-3">
                  {a.sources.join(' · ') || 'No sources listed'}
                </div>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={() => onRelease(h.ref)}>
              Checked: release
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
