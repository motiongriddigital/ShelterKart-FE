import type { Count } from '@/types/admin';
import { barWidth } from '@/utils/adminMetrics';
import { fmt } from '@/utils/format';

type Props = { items?: Count[]; label?: (x: Count) => string; className?: string };

export function BarList({ items, label = (x) => x.key, className }: Props) {
  if (!items?.length) {
    return (
      <ul className={`bars ${className ?? ''}`}>
        <li className="empty">Nothing yet in this period.</li>
      </ul>
    );
  }
  const top = Math.max(...items.map((x) => x.count), 1);
  return (
    <ul className={`bars ${className ?? ''}`}>
      {items.map((x) => (
        <li key={x.key}>
          <span className="k" title={label(x)}>
            {label(x)}
          </span>
          <span className="track">
            <span className="fill" style={{ width: `${barWidth(x.count, top)}%` }} />
          </span>
          <span className="v">{fmt(x.count)}</span>
        </li>
      ))}
    </ul>
  );
}
