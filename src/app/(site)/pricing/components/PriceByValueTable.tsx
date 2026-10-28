import type { PriceByValueRow } from '@/types/pricing';
import styles from '../styles/pricing.module.scss';

export function PriceByValueTable({ rows }: { rows: PriceByValueRow[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Property value</th>
          <th>Gold standard</th>
          <th>Heavy</th>
          <th>Thin</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.value}>
            <td>
              {r.value} <span className={styles.muted}>({r.approx})</span>
            </td>
            <td className={styles.num}>{r.gold}</td>
            <td className={styles.num}>{r.heavy}</td>
            <td className={styles.num}>{r.thin}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
