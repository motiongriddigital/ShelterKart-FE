'use client';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Activity, ChevronDown, RefreshCw } from 'lucide-react';
import { SegTabs } from '@/app/(admin)/admin/components/SegTabs';
import {
  ERROR_SERIES,
  SEED_DELIVERY,
  SEED_ERRORS,
  SEED_FAILED_JOBS,
  SEED_REGISTERS,
  type ErrorEntry,
  type Level,
  type Register,
} from '@/constants/adminSeedHealth';
import { cn } from '@/utils/cn';
import { PageHeader } from '../PageHeader';
import { StackedBars } from '../kit/StackedBars';
import { Badge, Panel, Stat, ago, btn, input, rowCls, tableWrap, td, th, when } from '../kit/Panel';
import { Button } from '@/components/ui/Button';
import { Input } from '../ui/input';

const LEVEL_TONE = { error: 'bad', warn: 'warn', info: 'mute' } as const;
const STATE_TONE = {
  healthy: 'good',
  degraded: 'warn',
  down: 'bad',
  unconfirmed: 'warn',
  skipped: 'mute',
} as const;

function Shell({
  title,
  children,
  actions,
}: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div>
      <PageHeader title={title} icon={Activity}>
        {actions}
      </PageHeader>
      <div className="mx-auto max-w-6xl space-y-4 p-6">{children}</div>
    </div>
  );
}

export function HealthOverview() {
  const total24 = ERROR_SERIES.reduce((s, r) => s + r.errors, 0);
  const warn24 = ERROR_SERIES.reduce((s, r) => s + r.warnings, 0);
  const watched = SEED_REGISTERS.filter((r) => r.state !== 'skipped');
  const healthy = watched.filter((r) => r.state === 'healthy').length;
  const email = SEED_DELIVERY[0];
  const rate = (100 * (email.sent - email.failed)) / email.sent;
  const incidents = [...SEED_ERRORS]
    .filter((e) => e.level !== 'info')
    .sort((a, b) => b.lastAt.localeCompare(a.lastAt))
    .slice(0, 4);

  return (
    <Shell title="Health and errors">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Registers healthy"
          value={`${healthy} of ${watched.length}`}
          sub={`${watched.filter((r) => r.state === 'down').length} down, ${watched.filter((r) => r.state === 'degraded').length} slow`}
          tone={watched.some((r) => r.state === 'down') ? 'bad' : 'good'}
        />
        <Stat
          label="Errors, last 24 hours"
          value={total24}
          sub={`${warn24} warnings`}
          tone={total24 > 30 ? 'warn' : undefined}
        />
        <Stat
          label="Failed jobs"
          value={SEED_FAILED_JOBS.length}
          sub="Waiting for a person"
          tone={SEED_FAILED_JOBS.length ? 'warn' : 'good'}
        />
        <Stat
          label="E-mail delivered"
          value={`${rate.toFixed(1)}%`}
          sub={`${email.sent} sent, ${email.failed} failed`}
          tone={rate < 97 ? 'warn' : 'good'}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Errors and warnings by hour"
          sub="The last 24 hours. Hover a bar for its hour."
        >
          <StackedBars
            rows={ERROR_SERIES.map((r) => ({ label: r.hour, a: r.errors, b: r.warnings }))}
            aLabel="Errors"
            bLabel="Warnings"
            height={210}
          />
        </Panel>
        <Panel title="Recent incidents" sub="Errors and warnings, newest first." flush>
          <ul>
            {incidents.map((e) => (
              <li key={e.id} className="border-t border-border px-5 py-3 text-ui">
                <div className="flex items-center gap-2">
                  <Badge tone={LEVEL_TONE[e.level]}>{e.level}</Badge>
                  <span className="fact truncate text-xs text-muted-foreground">{e.source}</span>
                  <span className="tabular ml-auto text-xs text-muted-foreground">
                    {ago(e.lastAt)}
                  </span>
                </div>
                <p className="mt-1">{e.message}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Shell>
  );
}

export function RegistersView() {
  const [rows, setRows] = useState<Register[]>(SEED_REGISTERS);
  const [busy, setBusy] = useState(false);
  const check = () => {
    setBusy(true);
    setTimeout(() => {
      setRows((r) =>
        r.map((x) =>
          x.state === 'skipped'
            ? x
            : { ...x, checkedAt: new Date(Date.UTC(2026, 10, 4, 12, 0, 0)).toISOString() },
        ),
      );
      setBusy(false);
      toast.success('Checked every register that has a connector');
    }, 900);
  };
  return (
    <Shell
      title="Official registers"
      actions={
        <Button variant="plain" className={btn} onClick={check} disabled={busy}>
          <RefreshCw className={cn('size-4', busy && 'animate-spin')} strokeWidth={1.75} />
          {busy ? 'Checking' : 'Check now'}
        </Button>
      }
    >
      <Panel
        title="Register health"
        sub="Checked every night, and whenever you press Check now. A register that is down is switched to research-only."
        flush
      >
        <div className={tableWrap}>
          <table className="w-full">
            <thead>
              <tr>
                <th className={th}>Market</th>
                <th className={th}>State</th>
                <th className={th}>What we see</th>
                <th className={`${th} text-right`}>Slowest 5%</th>
                <th className={th}>Last answered</th>
                <th className={th}>Checked</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code} className={rowCls}>
                  <td className={`${td} font-medium`}>{r.label}</td>
                  <td className={td}>
                    <Badge tone={STATE_TONE[r.state]}>{r.state}</Badge>
                  </td>
                  <td className={`${td} max-w-xs text-muted-foreground`}>{r.note}</td>
                  <td className={`${td} tabular text-right`}>
                    {r.p95ms ? `${(r.p95ms / 1000).toFixed(1)} s` : '—'}
                  </td>
                  <td className={`${td} tabular whitespace-nowrap`}>
                    {r.lastOkAt ? ago(r.lastOkAt) : 'never'}
                  </td>
                  <td className={`${td} tabular whitespace-nowrap`}>{ago(r.checkedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </Shell>
  );
}

export function ErrorLogView() {
  const [level, setLevel] = useState<'all' | Level>('all');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return SEED_ERRORS.filter(
      (e: ErrorEntry) =>
        (level === 'all' || e.level === level) &&
        (!t || `${e.source} ${e.message} ${e.detail}`.toLowerCase().includes(t)),
    ).sort((a, b) => b.lastAt.localeCompare(a.lastAt));
  }, [level, q]);
  return (
    <Shell title="Error log">
      <Panel
        title="Everything that went wrong"
        sub="Grouped by message. Open a row for the detail. Personal data is never written here."
        actions={
          <div className="flex items-center gap-2">
            <div className="w-52">
              <Input
                variant="plain"
                className={input}
                placeholder="Search the log"
                aria-label="Search the log"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <SegTabs
              label="Level"
              value={level}
              onChange={setLevel}
              tabs={[
                { id: 'all', label: 'All' },
                { id: 'error', label: 'Errors' },
                { id: 'warn', label: 'Warnings' },
                { id: 'info', label: 'Info' },
              ]}
            />
          </div>
        }
        flush
      >
        <div className={tableWrap}>
          <table className="w-full">
            <thead>
              <tr>
                <th className={th} />
                <th className={th}>Level</th>
                <th className={th}>Source</th>
                <th className={th}>Message</th>
                <th className={`${th} text-right`}>Times</th>
                <th className={th}>Last seen</th>
              </tr>
            </thead>
            <tbody>
              {rows.flatMap((e) => [
                <tr
                  key={e.id}
                  className={cn(rowCls, 'cursor-pointer')}
                  onClick={() => setOpen(open === e.id ? null : e.id)}
                >
                  <td className={`${td} w-8`}>
                    <ChevronDown
                      className={cn(
                        'size-4 text-muted-foreground transition-transform',
                        open === e.id && 'rotate-180',
                      )}
                      strokeWidth={1.75}
                    />
                  </td>
                  <td className={td}>
                    <Badge tone={LEVEL_TONE[e.level]}>{e.level}</Badge>
                  </td>
                  <td className={`${td} fact text-xs`}>{e.source}</td>
                  <td className={td}>{e.message}</td>
                  <td className={`${td} tabular text-right`}>{e.count}</td>
                  <td className={`${td} tabular whitespace-nowrap`}>{ago(e.lastAt)}</td>
                </tr>,
                open === e.id && (
                  <tr key={`${e.id}-d`} className="bg-muted/40">
                    <td />
                    <td colSpan={5} className="px-3 pb-3 pt-1 text-ui">
                      <p className="text-muted-foreground">{e.detail}</p>
                      <p className="tabular mt-1 text-xs text-muted-foreground">
                        First seen {when(e.firstAt)}, last seen {when(e.lastAt)}.
                      </p>
                    </td>
                  </tr>
                ),
              ])}
            </tbody>
          </table>
          {!rows.length && (
            <p className="px-5 pb-5 text-ui text-muted-foreground">Nothing matches.</p>
          )}
        </div>
      </Panel>
    </Shell>
  );
}

export function FailedJobsView() {
  const [jobs, setJobs] = useState(SEED_FAILED_JOBS);
  return (
    <Shell title="Failed jobs">
      <Panel
        title="Waiting for a person"
        sub="A paid report that fails is never lost: what was found is saved. Retry runs it again from the saved state."
        flush
      >
        <div className={tableWrap}>
          <table className="w-full">
            <thead>
              <tr>
                <th className={th}>Job</th>
                <th className={th}>Reference</th>
                <th className={th}>Why it failed</th>
                <th className={`${th} text-right`}>Attempts</th>
                <th className={th}>Failed</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className={rowCls}>
                  <td className={`${td} font-medium`}>{j.kind}</td>
                  <td className={`${td} fact text-xs`}>{j.ref}</td>
                  <td className={`${td} max-w-sm text-muted-foreground`}>{j.reason}</td>
                  <td className={`${td} tabular text-right`}>{j.attempts}</td>
                  <td className={`${td} tabular whitespace-nowrap`}>{ago(j.failedAt)}</td>
                  <td className={`${td} whitespace-nowrap text-right`}>
                    <Button
                      variant="plain"
                      className={btn}
                      onClick={() => {
                        setJobs((x) => x.filter((y) => y.id !== j.id));
                        toast.success(`${j.kind} queued again`);
                      }}
                    >
                      Retry
                    </Button>{' '}
                    <Button
                      variant="plain"
                      className={btn}
                      onClick={() => {
                        setJobs((x) => x.filter((y) => y.id !== j.id));
                        toast('Dismissed');
                      }}
                    >
                      Dismiss
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!jobs.length && (
            <p className="px-5 pb-5 text-ui text-muted-foreground">
              No failed jobs. Everything that was started has finished.
            </p>
          )}
        </div>
      </Panel>
    </Shell>
  );
}

export function DeliveryView() {
  return (
    <Shell title="E-mail and WhatsApp">
      <div className="grid gap-4 lg:grid-cols-2">
        {SEED_DELIVERY.map((c) => {
          const off = c.sent === 0;
          return (
            <Panel
              key={c.channel}
              title={c.channel}
              sub={c.provider}
              actions={<Badge tone={off ? 'mute' : 'good'}>{off ? 'Not set up' : 'Sending'}</Badge>}
            >
              {off ? (
                <p className="text-ui text-muted-foreground">
                  WhatsApp needs an approved template and keys from the client. Reports go by e-mail
                  until then.
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <Stat label="Sent" value={c.sent} />
                    <Stat label="Failed" value={c.failed} tone={c.failed ? 'warn' : 'good'} />
                    <Stat label="Average time" value={`${c.avgSeconds} s`} />
                  </div>
                  <ul className="mt-4 divide-y divide-border text-ui">
                    {c.last.map((l, i) => (
                      <li key={i} className="flex items-center gap-3 py-2">
                        <Badge tone={l.ok ? 'good' : 'warn'}>{l.ok ? 'sent' : 'retried'}</Badge>
                        <span className="fact text-xs">{l.to}</span>
                        <span className="min-w-0 flex-1 truncate text-muted-foreground">
                          {l.note}
                        </span>
                        <span className="tabular text-xs text-muted-foreground">{ago(l.at)}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Panel>
          );
        })}
      </div>
    </Shell>
  );
}
