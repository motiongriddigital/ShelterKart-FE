import type { DashboardData } from '@/types/admin';

export function Banners({ data }: { data: DashboardData }) {
  const a = data.analytics;
  const down = data.health?.markets.filter((m) => m.state === 'down') ?? [];
  return (
    <div>
      {data.demoNote && (
        <div className="banner demo">
          <strong>Demo.</strong> {data.demoNote}
        </div>
      )}
      {data.failed.length > 0 && (
        <div className="banner bad">
          {[...new Set(data.failed)].map((m) => (
            <div key={m}>{m}</div>
          ))}
        </div>
      )}
      {a?.stored === false && (
        <div className="banner warn">
          DATABASE_URL is not set: these numbers live in server memory and reset on every restart.
        </div>
      )}
      {a?.truncated && (
        <div className="banner warn">
          This period has more events than one request reads (250,000). Choose a shorter period for
          exact figures.
        </div>
      )}
      {down.length > 0 && (
        <div className="banner bad">
          Switched to research-only: {down.map((m) => m.label).join(', ')}. See Official registers
          below.
        </div>
      )}
    </div>
  );
}
