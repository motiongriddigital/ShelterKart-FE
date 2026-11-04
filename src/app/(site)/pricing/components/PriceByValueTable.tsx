import type { PriceByValueRow } from '@/types/pricing';

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
              {r.value} <span className="text-slate">({r.approx})</span>
            </td>
            <td className="whitespace-nowrap tabular-nums">{r.gold}</td>
            <td className="whitespace-nowrap tabular-nums">{r.heavy}</td>
            <td className="whitespace-nowrap tabular-nums">{r.thin}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
