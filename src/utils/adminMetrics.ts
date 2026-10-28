import { TARGETS, type Target } from '@/constants/admin';
import type { Analytics, Daily, Stats } from '@/types/admin';

export const barWidth = (count: number, top: number) =>
  Math.max(2, Math.round((100 * count) / Math.max(top, 1)));
export const conversionPct = (searches: number, checkouts: number) =>
  searches ? `${Math.round((1000 * checkouts) / searches) / 10}%` : '—';

export type SuccessRow = { target: Target; value: number | null; met: boolean | null };

export function successRows(a: Analytics, stats: Stats | null): SuccessRow[] {
  const t = a.totals;
  const paid = t.purchases;
  const unlock = a.funnel.find((f) => f.label === 'Clicked unlock');
  const failed = (a.search_outcomes ?? [])
    .filter((o) => /unavailable|error/.test(o.key))
    .reduce((n, o) => n + o.count, 0);
  const v: Record<string, number | null> = {
    conv: t.visitors ? paid / t.visitors : null,
    checkout: unlock && unlock.count ? Math.min(1, paid / unlock.count) : null,
    answered: t.searches ? 1 - failed / t.searches : null,
    disputes: paid && stats ? (100 * stats.openDisputes) / paid : null,
    pdf: paid ? t.pdf_saves / paid : null,
    share: paid ? t.whatsapp_shares / paid : null,
  };
  return TARGETS.map((target) => {
    const value = v[target.key];
    const met =
      value == null
        ? null
        : target.better === 'higher'
          ? value >= target.target
          : value <= target.target;
    return { target, value, met };
  });
}

export const showMetric = (x: number | null, f: 'pct' | 'num') =>
  x == null ? '—' : f === 'pct' ? `${(100 * x).toFixed(x < 0.1 ? 1 : 0)}%` : x.toFixed(1);

const W = 1100,
  H = 220,
  P = { l: 36, r: 10, t: 12, b: 26 };
/** Geometry for the daily SVG chart, kept out of the component so it stays presentational. */
export function dailyChart(daily: Daily[]) {
  const n = daily.length,
    iw = W - P.l - P.r,
    ih = H - P.t - P.b;
  const max = Math.max(1, ...daily.map((d) => Math.max(d.visitors, d.searches)));
  const x = (i: number) => P.l + ((i + 0.5) * iw) / n;
  const y = (v: number) => P.t + ih - (v / max) * ih;
  const bw = Math.max(2, Math.min(28, (iw / n) * 0.6));
  const step = Math.ceil(n / 8);
  return {
    W,
    H,
    P,
    ih,
    bw,
    x,
    y,
    grid: [0, 0.5, 1].map((f) => ({ v: Math.round(max * f), y: y(Math.round(max * f)) })),
    line: daily
      .map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d.searches).toFixed(1)}`)
      .join(' '),
    labelIdx: (i: number) => i % step === 0 || i === n - 1,
  };
}
