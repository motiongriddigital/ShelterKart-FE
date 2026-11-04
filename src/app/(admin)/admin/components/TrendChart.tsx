'use client';
import { useState } from 'react';
import type { Daily } from '@/types/admin';
import { fmt } from '@/utils/format';
import { SegTabs } from './SegTabs';

type Key = 'visitors' | 'searches' | 'purchases';
const TABS: { id: Key; label: string }[] = [
  { id: 'visitors', label: 'Visitors' },
  { id: 'searches', label: 'Searches' },
  { id: 'purchases', label: 'Paid reports' },
];

export function TrendChart({ daily }: { daily: Daily[] }) {
  const [key, setKey] = useState<Key>('visitors');
  const [hot, setHot] = useState<number | null>(null);
  const W = 720;
  const H = 230;
  const P = { l: 40, r: 8, t: 10, b: 22 };
  if (!daily.length)
    return <p className="text-ui text-muted-foreground">Nothing yet in this period.</p>;

  const vals = daily.map((d) => d[key]);
  const raw = Math.max(1, ...vals);
  const step = 10 ** Math.floor(Math.log10(raw));
  const max = Math.ceil(raw / step) * step;
  const x = (i: number) =>
    P.l + (daily.length === 1 ? 0 : (i * (W - P.l - P.r)) / (daily.length - 1));
  const y = (v: number) => P.t + (H - P.t - P.b) * (1 - v / max);
  const line = vals
    .map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(' ');
  const area = `${line} L${x(vals.length - 1).toFixed(1)} ${y(0)} L${x(0).toFixed(1)} ${y(0)} Z`;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(max * t));
  const total = vals.reduce((a, b) => a + b, 0);
  const sel = hot == null ? null : daily[hot];
  const labelEvery = Math.ceil(daily.length / 7);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <SegTabs label="Measure" tabs={TABS} value={key} onChange={setKey} />
        <p className="tabular ml-auto text-ui text-muted-foreground">
          {sel ? (
            <>
              <span className="font-medium text-foreground">{sel.day}</span>: {fmt(sel[key])}
            </>
          ) : (
            <>
              <span className="font-medium text-foreground">{fmt(total)}</span> in the period
            </>
          )}
        </p>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${TABS.find((t) => t.id === key)?.label} per day`}
        onMouseLeave={() => setHot(null)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = ((e.clientX - r.left) / r.width) * W;
          setHot(
            Math.min(
              daily.length - 1,
              Math.max(0, Math.round(((px - P.l) / (W - P.l - P.r)) * (daily.length - 1))),
            ),
          );
        }}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
            <text
              x={P.l - 8}
              y={y(t) + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--muted-foreground)"
            >
              {fmt(t)}
            </text>
          </g>
        ))}
        <path d={area} fill="var(--signal)" opacity={0.12} />
        <path d={line} fill="none" stroke="var(--signal)" strokeWidth={2} strokeLinejoin="round" />
        {daily.map((d, i) =>
          i % labelEvery === 0 ? (
            <text
              key={d.day}
              x={x(i)}
              y={H - 6}
              textAnchor="middle"
              fontSize="11"
              fill="var(--muted-foreground)"
            >
              {d.day.slice(5)}
            </text>
          ) : null,
        )}
        {hot != null && (
          <g>
            <line
              x1={x(hot)}
              x2={x(hot)}
              y1={P.t}
              y2={y(0)}
              stroke="var(--muted-foreground)"
              strokeDasharray="3 3"
            />
            <circle
              cx={x(hot)}
              cy={y(vals[hot])}
              r={4}
              fill="var(--card)"
              stroke="var(--signal)"
              strokeWidth={2}
            />
          </g>
        )}
      </svg>
    </div>
  );
}
