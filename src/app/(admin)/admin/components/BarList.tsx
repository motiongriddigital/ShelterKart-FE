import type { Count } from '@/types/admin';
import { barWidth } from '@/utils/adminMetrics';
import { fmt } from '@/utils/format';
import { bars } from '@/app/(admin)/admin/styles/ui';
import { cn } from '@/utils/cn';

type Props = { items?: Count[]; label?: (x: Count) => string; className?: string };

export function BarList({ items, label = (x) => x.key, className }: Props) {
  if (!items?.length) {
    return (
      <ul className={cn(bars.list, className)}>
        <li className={bars.empty}>Nothing yet in this period.</li>
      </ul>
    );
  }
  const top = Math.max(...items.map((x) => x.count), 1);
  return (
    <ul className={cn(bars.list, className)}>
      {items.map((x) => (
        <li key={x.key} className={bars.row}>
          <span className={bars.k} title={label(x)}>
            {label(x)}
          </span>
          <span className={bars.track}>
            <span className={bars.fill} style={{ width: `${barWidth(x.count, top)}%` }} />
          </span>
          <span className={bars.v}>{fmt(x.count)}</span>
        </li>
      ))}
    </ul>
  );
}
