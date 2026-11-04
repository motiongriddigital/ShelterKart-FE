'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Ban, MonitorSmartphone, ShieldBan, UserRound } from 'lucide-react';
import { SegTabs } from '@/app/(admin)/admin/components/SegTabs';
import { COUNTRY } from '@/constants/admin';
import { statByCode } from '@/constants/adminSeedGeo';
import { useConsoleData } from '@/store/consoleData';
import { PageHeader } from '../PageHeader';
import {
  Badge,
  Panel,
  Stat,
  ago,
  btn,
  btnDanger,
  input,
  rowCls,
  tableWrap,
  td,
  th,
  when,
} from '../kit/Panel';
import { BanDialog } from './BanDialog';
import { report, useLiveGate } from './LiveGate';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const countryName = (c: string) =>
  c ? (statByCode(c)?.name ?? COUNTRY[c.toUpperCase()] ?? c.toUpperCase()) : '—';

export function BansView() {
  const bans = useConsoleData((s) => s.bans);
  const unban = useConsoleData((s) => s.unban);
  const gate = useLiveGate('Bans', ShieldBan);
  const [tab, setTab] = useState<'account' | 'ip'>('ip');
  const [open, setOpen] = useState(false);
  const rows = bans.filter((b) => b.kind === tab);
  const count = (k: string) => bans.filter((b) => b.kind === k).length;
  if (gate) return gate;

  return (
    <div>
      <PageHeader title="Bans" icon={ShieldBan}>
        <Button variant="plain" className={btn} onClick={() => setOpen(true)}>
          <Ban className="size-4" strokeWidth={1.75} /> Add a ban
        </Button>
      </PageHeader>
      <div className="mx-auto max-w-5xl space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Banned IP addresses" value={count('ip')} sub="Refused on every route" />
          <Stat label="Banned accounts" value={count('account')} sub="Cannot sign in" />
          <Stat
            label="Temporary"
            value={bans.filter((b) => b.expiresAt).length}
            sub="Lift themselves when the time ends"
          />
        </div>
        <Panel
          title="Active bans"
          sub="Every ban needs a reason and is written to the audit trail."
          actions={
            <SegTabs
              label="Ban type"
              value={tab}
              onChange={setTab}
              tabs={[
                { id: 'ip', label: 'IP addresses', count: 0 },
                { id: 'account', label: 'Accounts', count: 0 },
              ]}
            />
          }
          flush
        >
          <div className={tableWrap}>
            <table className="w-full">
              <thead>
                <tr>
                  <th className={th}>{tab === 'ip' ? 'Address' : 'Account'}</th>
                  <th className={th}>Reason</th>
                  <th className={th}>Banned</th>
                  <th className={th}>Ends</th>
                  <th className={th} />
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => (
                  <tr key={b.id} className={rowCls}>
                    <td className={`${td} fact`}>{b.target}</td>
                    <td className={`${td} max-w-sm text-muted-foreground`}>{b.reason}</td>
                    <td className={`${td} tabular whitespace-nowrap`}>
                      {when(b.createdAt)}
                      <span className="block text-xs text-muted-foreground">by {b.by}</span>
                    </td>
                    <td className={`${td} tabular whitespace-nowrap`}>
                      {b.expiresAt ? when(b.expiresAt) : <Badge tone="warn">Until lifted</Badge>}
                    </td>
                    <td className={`${td} text-right`}>
                      <Button
                        variant="plain"
                        className={btn}
                        onClick={() => void report(unban(b.id), `Lifted the ban on ${b.target}`)}
                      >
                        Lift ban
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!rows.length && (
              <p className="px-5 pb-5 text-ui text-muted-foreground">
                No {tab === 'ip' ? 'IP addresses' : 'accounts'} are banned.
              </p>
            )}
          </div>
        </Panel>
      </div>
      <BanDialog key={String(open)} open={open} onOpenChange={setOpen} kind={tab} />
    </div>
  );
}

export function SessionsView() {
  const sessions = useConsoleData((s) => s.sessions);
  const users = useConsoleData((s) => s.users);
  const endSession = useConsoleData((s) => s.endSession);
  const live = useConsoleData((s) => s.live);
  const gate = useLiveGate('Active sessions', MonitorSmartphone);
  const [q, setQ] = useState('');
  const [ipBan, setIpBan] = useState<{ ip: string; sessionId: string } | null>(null);

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return sessions
      .map((s) => ({ ...s, user: users.find((u) => u.id === s.userId) }))
      .filter(
        (s) =>
          !t ||
          `${s.user?.email} ${s.ip} ${s.device} ${countryName(s.country)}`
            .toLowerCase()
            .includes(t),
      );
  }, [sessions, users, q]);
  if (gate) return gate;

  return (
    <div>
      <PageHeader title="Active sessions" icon={MonitorSmartphone} />
      <div className="mx-auto max-w-6xl space-y-4 p-6">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Active sessions" value={sessions.length} sub="Signed in right now" />
          <Stat
            label="People"
            value={new Set(sessions.map((s) => s.userId)).size}
            sub="Each may have several devices"
          />
          <Stat
            label="Countries"
            value={new Set(sessions.map((s) => s.country).filter(Boolean)).size}
          />
        </div>
        <Panel
          title="Sessions"
          sub="A session lasts 30 days and is extended while it is used, never beyond 90."
          actions={
            <div className="w-56">
              <Input
                variant="plain"
                className={input}
                placeholder="Find an e-mail, address or device"
                aria-label="Find a session"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          }
          flush
        >
          <div className={tableWrap}>
            <table className="w-full">
              <thead>
                <tr>
                  <th className={th}>Account</th>
                  <th className={th}>Address</th>
                  <th className={th}>Device</th>
                  <th className={th}>Country</th>
                  <th className={th}>Started</th>
                  <th className={th}>Last seen</th>
                  <th className={th} />
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s.id} className={rowCls}>
                    <td className={td}>
                      <Link
                        href={`/admin/users/${s.userId}`}
                        className="font-medium hover:underline"
                      >
                        {s.user?.email}
                      </Link>
                    </td>
                    <td className={`${td} fact`}>{s.ip}</td>
                    <td className={td}>{s.device}</td>
                    <td className={td}>{countryName(s.country)}</td>
                    <td className={`${td} tabular whitespace-nowrap`}>{when(s.startedAt)}</td>
                    <td className={`${td} tabular whitespace-nowrap`}>
                      {ago(s.lastSeenAt, live ? Date.now() : undefined)}
                    </td>
                    <td className={`${td} whitespace-nowrap text-right`}>
                      <Button
                        variant="plain"
                        className={btn}
                        onClick={() => void report(endSession(s.id), 'Session ended')}
                      >
                        End
                      </Button>{' '}
                      <Button variant="plain" className={btnDanger} onClick={() => setIpBan(s.ip)}>
                        Ban address
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!rows.length && (
              <p className="px-5 pb-5 text-ui text-muted-foreground">No sessions match.</p>
            )}
          </div>
        </Panel>
      </div>
      {ipBan && (
        <BanDialog
          key={ipBan.sessionId}
          open
          onOpenChange={(o) => !o && setIpBan(null)}
          kind="ip"
          target={ipBan.ip}
          sessionId={ipBan.sessionId}
        />
      )}
    </div>
  );
}

export function UserDetailView({ id }: { id: string }) {
  const users = useConsoleData((s) => s.users);
  const sessions = useConsoleData((s) => s.sessions);
  const endAll = useConsoleData((s) => s.endAllSessions);
  const setDisabled = useConsoleData((s) => s.setDisabled);
  const bans = useConsoleData((s) => s.bans);
  const unban = useConsoleData((s) => s.unban);
  const live = useConsoleData((s) => s.live);
  const status = useConsoleData((s) => s.status);
  const detail = useConsoleData((s) => s.details[id]);
  const loadUser = useConsoleData((s) => s.loadUser);
  const gate = useLiveGate('User', UserRound);
  const user = users.find((u) => u.id === id);
  const [ban, setBan] = useState<{
    kind: 'account' | 'ip';
    target: string;
    sessionId?: string;
  } | null>(null);

  useEffect(() => {
    if (live && status === 'ready' && detail === undefined) void loadUser(id);
  }, [live, status, detail, id, loadUser]);
  if (gate) return gate;

  if (!user) {
    return (
      <div>
        <PageHeader title="User not found" icon={UserRound} />
        <p className="p-6 text-sm text-muted-foreground">No user has that identifier.</p>
      </div>
    );
  }
  const mine = sessions.filter((s) => s.userId === user.id);
  const paid = user.purchases.filter((p) => p.status === 'paid').length;
  const accountBan = bans.find(
    (b) => b.kind === 'account' && b.target.toLowerCase() === user.email.toLowerCase(),
  );
  const loadingDetail = live && (detail === undefined || detail === 'loading');
  const clock = live ? Date.now() : undefined;

  return (
    <div>
      <PageHeader title={user.name} icon={UserRound} note={user.email}>
        {user.disabled ? (
          <Badge tone="bad">Banned or disabled</Badge>
        ) : (
          <Badge tone="good">Active</Badge>
        )}
      </PageHeader>
      <div className="mx-auto grid max-w-6xl gap-4 p-6 lg:grid-cols-3">
        <Panel title="Profile" className="lg:col-span-1">
          <dl className="space-y-2.5 text-ui">
            {[
              ['E-mail', user.email],
              ['Country', countryName(user.country)],
              ['Language', user.language],
              ['Joined', when(user.createdAt)],
              ['Last sign-in', when(user.lastLoginAt)],
              ['Paid reports', String(paid)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-border pb-2">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="tabular truncate font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="plain"
              className={btn}
              disabled={!mine.length}
              onClick={() => void report(endAll(user.id), 'All sessions ended')}
            >
              End all sessions
            </Button>
            {accountBan ? (
              <Button
                className={btn}
                onClick={() => void report(unban(accountBan.id), 'Ban lifted')}
              >
                Lift ban
              </Button>
            ) : user.disabled ? (
              <Button
                className={btn}
                onClick={() => void report(setDisabled(user.id, false), 'Account enabled')}
              >
                Enable account
              </Button>
            ) : (
              <Button
                variant="plain"
                className={btnDanger}
                onClick={() => setBan({ kind: 'account', target: user.email })}
              >
                Ban account
              </Button>
            )}
          </div>
        </Panel>

        <div className="space-y-4 lg:col-span-2">
          <Panel title="Purchases" sub="Every purchase belongs to this account for good." flush>
            <div className={tableWrap}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Report</th>
                    <th className={th}>Project</th>
                    <th className={th}>Amount</th>
                    <th className={th}>Date</th>
                    <th className={th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {user.purchases.map((p) => (
                    <tr key={p.ref} className={rowCls}>
                      <td className={`${td} fact`}>{p.ref}</td>
                      <td className={td}>{p.project || '—'}</td>
                      <td className={`${td} tabular`}>{p.amount}</td>
                      <td className={`${td} tabular whitespace-nowrap`}>{when(p.at)}</td>
                      <td className={td}>
                        <Badge tone={p.status === 'paid' ? 'good' : 'mute'}>{p.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {loadingDetail && (
                <p className="px-5 pb-5 text-ui text-muted-foreground">Loading purchases…</p>
              )}
              {!loadingDetail && detail === 'error' && (
                <p className="px-5 pb-5 text-ui text-status-down-text">
                  Could not load this account&rsquo;s purchases.
                </p>
              )}
              {!loadingDetail && detail !== 'error' && !user.purchases.length && (
                <p className="px-5 pb-5 text-ui text-muted-foreground">
                  Nothing bought yet: a free account.
                </p>
              )}
            </div>
          </Panel>
          <Panel title="Sessions" flush>
            <div className={tableWrap}>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className={th}>Address</th>
                    <th className={th}>Device</th>
                    <th className={th}>Last seen</th>
                    <th className={th} />
                  </tr>
                </thead>
                <tbody>
                  {mine.map((s) => (
                    <tr key={s.id} className={rowCls}>
                      <td className={`${td} fact`}>{s.ip}</td>
                      <td className={td}>{s.device}</td>
                      <td className={`${td} tabular`}>{ago(s.lastSeenAt, clock)}</td>
                      <td className={`${td} text-right`}>
                        <Button
                          variant="plain"
                          className={btnDanger}
                          onClick={() => setBan({ kind: 'ip', target: s.ip, sessionId: s.id })}
                        >
                          Ban address
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!mine.length && (
                <p className="px-5 pb-5 text-ui text-muted-foreground">Not signed in anywhere.</p>
              )}
            </div>
          </Panel>
        </div>
      </div>
      {ban && (
        <BanDialog
          key={ban.target}
          open
          onOpenChange={(o) => !o && setBan(null)}
          kind={ban.kind}
          target={ban.target}
          sessionId={ban.sessionId}
        />
      )}
    </div>
  );
}
