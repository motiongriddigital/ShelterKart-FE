import type { PriceByCurrencyRow } from '@/types/pricing';

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
            <td className="whitespace-nowrap tabular-nums">{r.typical}</td>
            <td className="whitespace-nowrap tabular-nums">{r.range}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
