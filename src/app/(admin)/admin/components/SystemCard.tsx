import type { Engines, Health } from '@/types/admin';
import { fmt } from '@/utils/format';

export function SystemCard({
  engines,
  health,
  busy,
  onRun,
}: {
  engines: Engines | null;
  health: Health | null;
  busy: boolean;
  onRun: () => void;
}) {
  const usage = Object.values(engines?.usage ?? {});
  const calls = usage.reduce((s, u) => s + (u.calls ?? 0), 0);
  const failed = usage.reduce((s, u) => s + (u.failed ?? 0), 0);
  const cost = usage.reduce((s, u) => s + (u.estimatedCostUsd ?? 0), 0);
  const markets = health?.markets ?? [];
  const down = markets.filter((m) => m.state === 'down').length;
  const ok = markets.filter((m) => m.state === 'healthy').length;
  return (
    <div className="card">
      <h2>Engine and registers</h2>
      <p className="sub">Since the server last started.</p>
      <dl className="stat-list">
        <div>
          <dt>AI calls</dt>
          <dd>{fmt(calls)}</dd>
        </div>
        <div>
          <dt>Failed</dt>
          <dd className={failed ? 'warn-text' : ''}>
            {fmt(failed)}
            {calls ? ` (${((100 * failed) / calls).toFixed(1)}%)` : ''}
          </dd>
        </div>
        <div>
          <dt>Estimated cost</dt>
          <dd>US${cost.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Registers healthy</dt>
          <dd className={down ? 'bad-text' : ''}>
            {ok} of {markets.length}
            {down ? `, ${down} down` : ''}
          </dd>
        </div>
      </dl>
      <button className="btn mt-3" onClick={onRun} disabled={busy}>
        {busy ? 'Checking…' : 'Check registers now'}
      </button>
    </div>
  );
}
