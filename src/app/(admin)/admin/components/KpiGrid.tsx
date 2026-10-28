import type { Analytics, Stats } from '@/types/admin';
import { fmt, money } from '@/utils/format';

function Kpi({ n, label, money: isMoney }: { n: string; label: string; money?: boolean }) {
  return (
    <div className={`kpi${isMoney ? ' money' : ''}`}>
      <div className="n">{n}</div>
      <div className="l">{label}</div>
    </div>
  );
}

export function KpiGrid({ a, stats }: { a: Analytics | null; stats: Stats | null }) {
  const t = a?.totals;
  return (
    <div className="kpis">
      {t && (
        <>
          <Kpi n={fmt(t.visitors)} label="Visitors" />
          <Kpi n={fmt(t.page_views)} label="Page views" />
          <Kpi n={fmt(t.searches)} label="Searches" />
          <Kpi n={fmt(t.report_opens)} label="Reports opened by link" />
          <Kpi n={fmt(t.purchases)} label="Paid reports" />
          {t.revenue.length ? (
            t.revenue.map((r) => (
              <Kpi key={r.currency} n={money(r.amount, r.currency)} label="Revenue" money />
            ))
          ) : (
            <Kpi n="—" label="Revenue" money />
          )}
          <Kpi n={fmt(t.pdf_saves)} label="PDFs saved" />
          <Kpi n={fmt(t.whatsapp_shares)} label="WhatsApp shares" />
          <Kpi n={fmt(t.document_checks)} label="Document checks" />
        </>
      )}
      {stats && (
        <>
          <Kpi n={fmt(stats.pendingCheckouts)} label="Checkouts not completed (all time)" />
          <Kpi n={fmt(stats.openDisputes)} label="Open disputes" />
          <Kpi n={fmt(stats.pendingResponses)} label="Replies to review" />
        </>
      )}
    </div>
  );
}
