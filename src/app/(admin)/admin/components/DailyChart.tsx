import type { Daily } from '@/types/admin';
import { dailyChart } from '@/utils/adminMetrics';

/** Inline SVG: no chart library, nothing loaded from another site. */
export function DailyChart({ daily }: { daily: Daily[] }) {
  if (!daily.length) return <div className="empty">Nothing yet in this period.</div>;
  const c = dailyChart(daily);
  return (
    <div className="chart">
      <svg
        viewBox={`0 0 ${c.W} ${c.H}`}
        role="img"
        aria-label="Daily visitors, searches and paid reports"
      >
        {c.grid.map((g) => (
          <g key={g.v}>
            <line x1={c.P.l} x2={c.W - c.P.r} y1={g.y} y2={g.y} stroke="#E4DDD1" />
            <text x={c.P.l - 6} y={g.y + 4} textAnchor="end" fontSize="11" fill="#52657F">
              {g.v}
            </text>
          </g>
        ))}
        {daily.map((d, i) => (
          <rect
            key={d.day}
            x={c.x(i) - c.bw / 2}
            y={c.y(d.visitors)}
            width={c.bw}
            height={c.P.t + c.ih - c.y(d.visitors)}
            fill="#163C64"
            rx="2"
          >
            <title>{`${d.day}: ${d.visitors} visitors, ${d.searches} searches, ${d.purchases} paid`}</title>
          </rect>
        ))}
        <path d={c.line} fill="none" stroke="#D3A245" strokeWidth="2.5" strokeLinejoin="round" />
        {daily.map(
          (d, i) =>
            d.purchases > 0 && (
              <circle
                key={`p${d.day}`}
                cx={c.x(i)}
                cy={c.P.t + 6}
                r={Math.min(9, 3 + d.purchases)}
                fill="#1D6338"
              >
                <title>{`${d.day}: ${d.purchases} paid`}</title>
              </circle>
            ),
        )}
        {daily.map(
          (d, i) =>
            c.labelIdx(i) && (
              <text
                key={`l${d.day}`}
                x={c.x(i)}
                y={c.H - 6}
                textAnchor="middle"
                fontSize="11"
                fill="#52657F"
              >
                {d.day.slice(5)}
              </text>
            ),
        )}
      </svg>
    </div>
  );
}
