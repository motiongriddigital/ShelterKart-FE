import type { PriceByCurrencyRow } from '@/types/pricing';
import styles from '../styles/pricing.module.scss';

export function PriceByCurrencyTable({ rows }: { rows: PriceByCurrencyRow[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Typical report</th>
          <th>Lowest – highest</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.code}>
            <td>
              {r.currency} ({r.code})
            </td>
            <td className={styles.num}>{r.typical}</td>
            <td className={styles.num}>{r.range}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
