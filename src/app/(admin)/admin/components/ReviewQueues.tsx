import { SENDER_CHECK } from '@/constants/admin';
import type { DevResponse, Dispute, Held } from '@/types/admin';

export function DisputesQueue({
  rows,
  onResolve,
}: {
  rows: Dispute[];
  onResolve: (id: string) => void;
}) {
  if (!rows.length) return <div className="empty">No open reports of inaccuracy.</div>;
  return (
    <>
      {rows.map((r) => (
        <div className="row" key={r.id}>
          <div>
            <strong>{r.report_ref ?? '—'}</strong> · {r.contact ?? 'no contact given'}
            <div>{r.note}</div>
            <div className="meta">Submitted {new Date(r.submitted_at).toLocaleString()}</div>
          </div>
          <div className="actions">
            <button className="btn" onClick={() => onResolve(r.id)}>
              Mark resolved
            </button>
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
  if (!rows.length) return <div className="empty">No replies waiting.</div>;
  return (
    <>
      {rows.map((r) => (
        <div className="row" key={r.id}>
          <div>
            <strong>{r.report_ref}</strong> · {r.contact_email}
            <div className="meta" style={{ marginTop: 4 }}>
              <strong>{SENDER_CHECK[r.sender_check ?? ''] ?? SENDER_CHECK.unknown}</strong>
              {r.developer_site ? ` (${r.developer_site})` : ''}
            </div>
            <div className="meta">
              {r.report_available === false
                ? 'The report is no longer available.'
                : (r.finding_match ?? -1) >= 0
                  ? `Quotes finding ${(r.finding_match as number) + 1} of the report.`
                  : 'Quotes none of the report’s findings — check what it answers.'}
            </div>
            <div style={{ marginTop: 6 }}>
              <em>Responding to:</em> “{r.finding_text}”
            </div>
            <div style={{ marginTop: 6 }}>{r.response_text}</div>
            <div className="meta">Submitted {new Date(r.submitted_at).toLocaleString()}</div>
          </div>
          <div className="actions">
            <button className="btn" onClick={() => onReview(r.id, 'approve')}>
              Approve
            </button>
            <button className="btn" onClick={() => onReview(r.id, 'reject')}>
              Reject
            </button>
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
  if (!held?.held.length) return <div className="empty">No reports waiting for a check.</div>;
  return (
    <>
      {held.held.map((h) => (
        <div className="row" key={h.ref}>
          <div>
            <strong>{h.ref}</strong> · {h.project ?? ''} · {h.developer ?? ''} ({h.market ?? ''})
            {h.adverse.map((a) => (
              <div key={a.claim} style={{ marginTop: 6 }}>
                • {a.claim}
                <div className="meta">{a.sources.join(' · ') || 'No sources listed'}</div>
              </div>
            ))}
          </div>
          <div className="actions">
            <button className="btn" onClick={() => onRelease(h.ref)}>
              Checked: release
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
