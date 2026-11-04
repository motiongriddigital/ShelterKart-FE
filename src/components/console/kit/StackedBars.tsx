'use client';
import { useState } from 'react';

type Row = { label: string; a: number; b: number };

/** Hand-drawn SVG, like the other charts: nothing is loaded from another site. a is drawn at the bottom, b above it. */
export function StackedBars({
  rows,
  aLabel,
  bLabel,
  height = 150,
}: {
  rows: Row[];
  aLabel: string;
  bLabel: string;
  height?: number;
}) {
  const [i, setI] = useState<number | null>(null);
  const W = 720;
  const P = { l: 26, r: 4, t: 8, b: 20 };
  const max = Math.max(4, ...rows.map((r) => r.a + r.b));
  const bw = (W - P.l - P.r) / rows.length;
  const y = (v: number) => P.t + (height - P.t - P.b) * (1 - v / max);
  const ticks = [0, Math.round(max / 2), max];
  const hot = i == null ? null : rows[i];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label={`${aLabel} and ${bLabel} per hour`}
        onMouseLeave={() => setI(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
            <text
              x={P.l - 6}
              y={y(t) + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--muted-foreground)"
            >
              {t}
            </text>
          </g>
        ))}
        {rows.map((r, k) => (
          <g key={r.label} onMouseEnter={() => setI(k)}>
            <rect
              x={P.l + k * bw}
              y={P.t}
              width={bw}
              height={height - P.t - P.b}
              fill="transparent"
            />
            <rect
              x={P.l + k * bw + 2}
              y={y(r.a)}
              width={bw - 4}
              height={Math.max(0, y(0) - y(r.a))}
              rx={2}
              fill="var(--status-down)"
              opacity={i == null || i === k ? 1 : 0.45}
            />
            <rect
              x={P.l + k * bw + 2}
              y={y(r.a + r.b)}
              width={bw - 4}
              height={Math.max(0, y(r.a) - y(r.a + r.b))}
              rx={2}
              fill="var(--status-warn)"
              opacity={i == null || i === k ? 1 : 0.45}
            />
            {k % 4 === 0 && (
              <text
                x={P.l + k * bw + bw / 2}
                y={height - 5}
                textAnchor="middle"
                fontSize="10"
                fill="var(--muted-foreground)"
              >
                {r.label}
              </text>
            )}
          </g>
        ))}
      </svg>
      <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <i className="size-2 rounded-sm bg-status-down" /> {aLabel}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="size-2 rounded-sm bg-status-warn" /> {bLabel}
        </span>
        <span className="tabular ml-auto min-h-4">
          {hot
            ? `${hot.label}: ${hot.a} ${aLabel.toLowerCase()}, ${hot.b} ${bLabel.toLowerCase()}`
            : ''}
        </span>
      </div>
    </div>
  );
}
