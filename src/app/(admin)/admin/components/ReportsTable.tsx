import type { AdminReport } from '@/types/admin';
import { money, shortDate } from '@/utils/format';

type Props = { reports: AdminReport[] | null; demo: boolean };

export function ReportsTable({ reports, demo }: Props) {
  if (!reports) return <div className="empty">Could not load.</div>;
  if (!reports.length) return <div className="empty">No reports yet.</div>;
  const since = reports[0]?.paidSince;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Findings</th>
            <th>Price</th>
            <th>{since ? `Paid since ${shortDate(since)}` : 'Paid'}</th>
            <th>Checked</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reports.map((x) => (
            <tr key={x.ref}>
              <td>
                <div className="rep-title">{x.title}</div>
                <div className="rep-sub">
                  {x.place ?? ''} · {x.market ?? ''}
                  <br />
                  {x.developer ?? ''} · {x.ref}
                </div>
              </td>
              <td>{x.findings ?? '—'}</td>
              <td>{x.price ? money(x.price.amount, x.price.currency) : '—'}</td>
              <td>{x.paid ?? '—'}</td>
              <td>{x.checkedAt ? shortDate(x.checkedAt) : ''}</td>
              <td className="rep-actions">
                <a
                  href={
                    demo
                      ? `/sample-reports/${encodeURIComponent(x.pdf ?? '')}`
                      : `/api/admin/reports/${encodeURIComponent(x.ref)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {demo ? 'Open full report' : 'Full report (data)'}
                </a>
                <a
                  href={`/?ref=${encodeURIComponent(x.ref)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View as client
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
