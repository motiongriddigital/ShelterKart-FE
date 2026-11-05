import type { Engines, Health } from '@/types/admin';
import { Panel } from '@/components/console/kit/Panel';
import { fmt } from '@/utils/format';
import { Button } from '@/components/ui/Button';

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
    <Panel className="h-full" title="Engine and registers" sub="Since the server last started.">
      <dl className="m-0 grid gap-2.5 [&>div]:flex [&>div]:justify-between [&>div]:gap-3 [&>div]:border-b [&>div]:border-rule [&>div]:pb-2 [&>div]:text-sm [&_dd]:m-0 [&_dd]:font-semibold [&_dd]:tabular-nums [&_dt]:text-ink-3">
        <div>
          <dt>AI calls</dt>
          <dd>{fmt(calls)}</dd>
        </div>
        <div>
          <dt>Failed</dt>
          <dd className={failed ? 'text-warn' : ''}>
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
          <dd className={down ? 'text-bad' : ''}>
            {ok} of {markets.length}
            {down ? `, ${down} down` : ''}
          </dd>
        </div>
      </dl>
      <Button variant="outline" size="sm" className="mt-3" onClick={onRun} disabled={busy}>
        {busy ? 'Checking…' : 'Check registers now'}
      </Button>
    </Panel>
  );
}
