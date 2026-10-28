import { PERIODS } from '@/constants/admin';

type Props = {
  status: string;
  days: string;
  onDays: (d: string) => void;
  onRefresh: () => void;
  onSignOut: () => void;
};

export function TopBar({ status, days, onDays, onRefresh, onSignOut }: Props) {
  return (
    <div className="top">
      <h1>
        Shelter<span>Kart</span> Admin
      </h1>
      <span className="status">{status}</span>
      <span className="spacer" />
      <label>
        <span className="status">Period </span>
        <select value={days} onChange={(e) => onDays(e.target.value)} aria-label="Period">
          {PERIODS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      <button className="btn" onClick={onRefresh}>
        Refresh
      </button>
      <button className="btn" onClick={onSignOut}>
        Sign out
      </button>
    </div>
  );
}
