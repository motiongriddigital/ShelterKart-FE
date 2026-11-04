import { AGENT_NAME, COUNTRY, LANG_NAME, OFF_REASON, TAX_LEVEL } from '@/constants/admin';
import type { CountryRow, Engines, Health, LanguageRow, Tax } from '@/types/admin';
import { conversionPct } from '@/utils/adminMetrics';
import { dateTime } from '@/utils/format';
import { Button } from '@/components/console/ui/button';

const Empty = ({ cols }: { cols: number }) => (
  <tr>
    <td colSpan={cols}>No data yet.</td>
  </tr>
);

export function LanguagesTable({ rows }: { rows?: LanguageRow[] }) {
  return (
    <table className="ltable">
      <thead>
        <tr>
          <th>Language</th>
          <th>Visitors</th>
          <th>Searched</th>
          <th>Clicked unlock</th>
          <th>Started checkout</th>
          <th>Search to checkout</th>
        </tr>
      </thead>
      <tbody>
        {rows?.length ? (
          rows.map((x) => (
            <tr key={x.lang}>
              <td>{LANG_NAME[x.lang] ?? x.lang}</td>
              <td>{x.visitors}</td>
              <td>{x.searches}</td>
              <td>{x.unlock_clicks}</td>
              <td>{x.checkouts}</td>
              <td>{conversionPct(x.searches, x.checkouts)}</td>
            </tr>
          ))
        ) : (
          <Empty cols={6} />
        )}
      </tbody>
    </table>
  );
}

export function CountryFunnelTable({ rows }: { rows?: CountryRow[] }) {
  return (
    <table className="ltable">
      <thead>
        <tr>
          <th>Country</th>
          <th>Visitors</th>
          <th>Searched</th>
          <th>Clicked unlock</th>
          <th>Started checkout</th>
          <th>Search to checkout</th>
        </tr>
      </thead>
      <tbody>
        {rows?.length ? (
          rows.map((x) => (
            <tr key={x.country}>
              <td>{COUNTRY[x.country] ?? x.country}</td>
              <td>{x.visitors}</td>
              <td>{x.searches}</td>
              <td>{x.unlock_clicks}</td>
              <td>{x.checkouts}</td>
              <td>{conversionPct(x.searches, x.checkouts)}</td>
            </tr>
          ))
        ) : (
          <Empty cols={6} />
        )}
      </tbody>
    </table>
  );
}

export function TaxExposure({ tax }: { tax: Tax }) {
  const rows = [...tax.progress].sort((x, y) => y.pct - x.pct);
  const groups: Record<string, string[]> = {};
  tax.off.forEach((o) => (groups[o.reason] = [...(groups[o.reason] ?? []), o.name]));
  return (
    <>
      <table className="ltable">
        <thead>
          <tr>
            <th>Country</th>
            <th>Threshold</th>
            <th>Sales, 12 months</th>
            <th>Progress</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((p) => {
              const level = p.registered ? 'registered' : p.level;
              const color = ['alert', 'reached'].includes(level)
                ? { color: '#B42318', fontWeight: 600 }
                : level === 'watch'
                  ? { color: '#865E1D' }
                  : undefined;
              return (
                <tr key={p.name} style={color}>
                  <td>{p.name}</td>
                  <td>
                    {p.thresholds
                      .map(
                        (x) =>
                          `${x.currency} ${x.amount.toLocaleString()}${x.basis === 'worldwide' ? ' (worldwide)' : ''}`,
                      )
                      .join(' and ')}
                  </td>
                  <td>
                    {p.thresholds
                      .map((x) => `${x.currency} ${x.sales.toLocaleString()}`)
                      .join(' / ')}
                  </td>
                  <td>{Math.round(p.pct * 100)}%</td>
                  <td>{TAX_LEVEL[level] ?? level}</td>
                </tr>
              );
            })
          ) : (
            <Empty cols={5} />
          )}
        </tbody>
      </table>
      <p className="sub" style={{ marginTop: 12 }}>
        {Object.keys(groups).length ? (
          <>
            <strong>Not on sale:</strong>{' '}
            {Object.entries(groups)
              .map(([r, n]) => `${n.join(', ')} (${OFF_REASON[r] ?? r})`)
              .join('; ')}
            .
          </>
        ) : (
          <strong>On sale in every listed country.</strong>
        )}
      </p>
    </>
  );
}

const usd = (v: number | null | undefined) =>
  v == null ? 'cost unknown' : `$${v < 0.01 ? v.toFixed(4) : v.toFixed(3)} a call`;

export function EnginesPanel({ e }: { e: Engines }) {
  const label = (id: string) => e.engines?.[id]?.label ?? id;
  return (
    <>
      <div className="sub">
        {Object.entries(e.roles ?? {}).map(([r, p]) => {
          const left = (p.excluded ?? []).filter((x) => x.reason !== 'not set up (no API key)');
          return (
            <div key={r}>
              <strong>{AGENT_NAME[r] ?? r}:</strong>{' '}
              {p.candidates?.length ? (
                p.candidates.map((c, i) => (
                  <span key={c.engine}>
                    {i > 0 && ' → '}
                    {label(c.engine)}{' '}
                    <span className="sub">
                      ({c.model}, {usd(c.estUsd)}, {c.basis})
                    </span>
                  </span>
                ))
              ) : (
                <strong>no engine available</strong>
              )}
              {left.length > 0 && (
                <div className="sub">
                  Not used: {left.map((x) => `${label(x.engine)}: ${x.reason}`).join('; ')}
                </div>
              )}
            </div>
          );
        })}
        <div className="sub">
          {e.benchmarkAt
            ? `Quality gate results from ${String(e.benchmarkAt).slice(0, 10)}.`
            : 'No quality-gate results yet: estimates use catalogue prices.'}{' '}
          Prices checked {e.pricesChecked ?? '?'}.
        </div>
      </div>
      <table className="ltable">
        <thead>
          <tr>
            <th>Engine</th>
            <th>Set up</th>
            <th>Where</th>
            <th>Calls</th>
            <th>Failed</th>
            <th>Rescued</th>
            <th>Searches</th>
            <th>Tokens in / out</th>
            <th>Average time</th>
            <th>Estimated cost</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(e.engines ?? {}).map((id) => {
            const u = e.usage?.[id] ?? {};
            const en = e.engines[id];
            const cost =
              u.estimatedCostUsd == null
                ? '—'
                : `$${u.estimatedCostUsd.toFixed(2)}${u.costComplete ? '' : ' (partial)'}`;
            return (
              <FragmentRows
                key={id}
                cells={[
                  label(id),
                  en.configured ? 'Yes' : 'No',
                  en.jurisdiction ?? '',
                  u.calls ?? 0,
                  u.failed ?? 0,
                  u.rescued ?? 0,
                  u.searches ?? 0,
                  `${(u.tokensIn ?? 0).toLocaleString()} / ${(u.tokensOut ?? 0).toLocaleString()}`,
                  u.avgMs ? `${(u.avgMs / 1000).toFixed(1)} s` : '—',
                  cost,
                ]}
                error={u.lastError ? `Last error: ${u.lastError} (${u.lastErrorAt})` : undefined}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function FragmentRows({ cells, error }: { cells: (string | number)[]; error?: string }) {
  return (
    <>
      <tr>
        {cells.map((c, i) => (
          <td key={i}>{c}</td>
        ))}
      </tr>
      {error && (
        <tr>
          <td colSpan={10} className="sub">
            {error}
          </td>
        </tr>
      )}
    </>
  );
}

export function HealthTable({
  health,
  busy,
  onRun,
}: {
  health: Health | null;
  busy: boolean;
  onRun: () => void;
}) {
  if (!health) return <div className="empty">Could not load.</div>;
  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Market</th>
              <th>State</th>
              <th>Last worked</th>
              <th>Last checked</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {health.markets.map((m) => (
              <tr key={m.label}>
                <td>{m.label}</td>
                <td>
                  <span className={`pill ${m.state}`}>{String(m.state).replace('_', ' ')}</span>
                </td>
                <td>{dateTime(m.lastOkAt)}</td>
                <td>{dateTime(m.checkedAt)}</td>
                <td>{m.detail ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 10 }}>
        <Button variant="plain" className="btn" disabled={busy} onClick={onRun}>
          {busy ? 'Checking… (up to a few minutes)' : 'Check all registers now'}
        </Button>
      </div>
    </>
  );
}
