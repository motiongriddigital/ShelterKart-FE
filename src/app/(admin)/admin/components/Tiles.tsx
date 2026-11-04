import { Stat } from '@/components/console/kit/Panel';
import type { Analytics, Stats } from '@/types/admin';
import { fmt, money } from '@/utils/format';

export function Tiles({ a, stats }: { a: Analytics | null; stats: Stats | null }) {
  const t = a?.totals;
  if (!t) return null;
  const [main, ...rest] = t.revenue;
  const conv = t.visitors ? (100 * t.purchases) / t.visitors : 0;
  return (
    <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Stat
        label="Revenue"
        value={main ? money(main.amount, main.currency) : '—'}
        sub={
          rest.length ? `+ ${rest.map((r) => money(r.amount, r.currency)).join(' · ')}` : undefined
        }
      />
      <Stat
        label="Paid reports"
        value={fmt(t.purchases)}
        sub={stats ? `${fmt(stats.pendingCheckouts)} checkouts not completed` : undefined}
      />
      <Stat label="Visitors" value={fmt(t.visitors)} sub={`${fmt(t.page_views)} page views`} />
      <Stat
        label="Visitor to paid"
        value={`${conv.toFixed(1)}%`}
        sub={`${fmt(t.searches)} searches`}
      />
    </div>
  );
}
