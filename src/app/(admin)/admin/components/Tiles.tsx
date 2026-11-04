import type { Analytics, Stats } from '@/types/admin';
import { fmt, money } from '@/utils/format';

function Tile({ n, label, sub }: { n: string; label: string; sub?: string }) {
  return (
    <div className="kpi">
      <div className="n">{n}</div>
      <div className="l">{label}</div>
      {sub && <div className="sub-line">{sub}</div>}
    </div>
  );
}

export function Tiles({ a, stats }: { a: Analytics | null; stats: Stats | null }) {
  const t = a?.totals;
  if (!t) return null;
  const [main, ...rest] = t.revenue;
  const conv = t.visitors ? (100 * t.purchases) / t.visitors : 0;
  return (
    <div className="tiles">
      <Tile
        n={main ? money(main.amount, main.currency) : '—'}
        label="Revenue"
        sub={
          rest.length ? `+ ${rest.map((r) => money(r.amount, r.currency)).join(' · ')}` : undefined
        }
      />
      <Tile
        n={fmt(t.purchases)}
        label="Paid reports"
        sub={stats ? `${fmt(stats.pendingCheckouts)} checkouts not completed` : undefined}
      />
      <Tile n={fmt(t.visitors)} label="Visitors" sub={`${fmt(t.page_views)} page views`} />
      <Tile n={`${conv.toFixed(1)}%`} label="Visitor to paid" sub={`${fmt(t.searches)} searches`} />
    </div>
  );
}
