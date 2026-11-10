import type {
  Analytics,
  AdminReport,
  DashboardData,
  DevResponse,
  Dispute,
  Engines,
  Health,
  Held,
  Stats,
  Tax,
} from '@/types/admin';

export class Unauthorised extends Error {}

type Demo = {
  note: string;
  analytics: Record<string, Analytics>;
  stats: Stats;
  health: Health;
  disputes: Dispute[];
  responses: DevResponse[];
  reports: AdminReport[];
  tax?: Tax;
  engines?: Engines;
  held?: Held;
};

// The demo answers the same questions the server does, from a bundled dataset (public/admin/demo-data.json).
let demo: Demo | null = null;
async function loadDemo(): Promise<Demo> {
  if (!demo) demo = (await (await fetch('/admin/demo-data.json')).json()) as Demo;
  return demo;
}

async function demoApi(path: string): Promise<unknown> {
  const d = await loadDemo();
  const m = path.match(/^\/api\/admin\/analytics\?days=(\d+)/);
  if (m) return d.analytics[m[1]] ?? d.analytics[30];
  const x = path.match(/^\/api\/admin\/(disputes|responses)\/([^/]+)\/(resolve|approve|reject)$/);
  if (x) {
    const id = decodeURIComponent(x[2]);
    if (x[1] === 'disputes') {
      d.disputes = d.disputes.filter((r) => r.id !== id);
      d.stats.openDisputes = d.disputes.length;
    } else {
      d.responses = d.responses.filter((r) => r.id !== id);
      d.stats.pendingResponses = d.responses.length;
    }
    return { ok: true };
  }
  switch (path) {
    case '/api/admin/stats':
      return d.stats;
    case '/api/admin/source-health':
      return d.health;
    case '/api/admin/source-health/run':
      await new Promise((r) => setTimeout(r, 900));
      return { ok: true };
    case '/api/admin/disputes':
      return d.disputes;
    case '/api/admin/responses':
      return d.responses;
    case '/api/admin/held':
      return d.held ?? { markets: [], held: [] };
    case '/api/admin/reports':
      return { ok: true, reports: d.reports };
    case '/api/admin/tax':
      return d.tax ?? { progress: [], off: [] };
    case '/api/admin/engines':
      return d.engines ?? { roles: {}, engines: {}, usage: {} };
  }
  throw new Error('Not available in the demo.');
}

export type AdminAuth = { mode: 'live' | 'demo'; authHeader: string };

export async function adminApi<T>(
  auth: AdminAuth,
  path: string,
  method: 'GET' | 'POST' = 'GET',
): Promise<T> {
  if (auth.mode === 'demo') return (await demoApi(path)) as T;
  const res = await fetch(path, {
    method,
    headers: { Authorization: auth.authHeader, 'Content-Type': 'application/json' },
  });
  if (res.status === 401) throw new Unauthorised('Wrong username or password.');
  if (res.status === 429) throw new Error('Too many attempts. Wait fifteen minutes and try again.');
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error((data as { error?: string }).error || `The server answered ${res.status}.`);
  return data as T;
}

export const checkCredentials = (auth: AdminAuth) => adminApi(auth, '/api/admin/source-health');
export const runHealthCheck = (auth: AdminAuth) =>
  adminApi(auth, '/api/admin/source-health/run', 'POST');
export const approveHeld = (auth: AdminAuth, ref: string) =>
  adminApi(auth, `/api/admin/held/${encodeURIComponent(ref)}/approve`, 'POST');
export const resolveDispute = (auth: AdminAuth, id: string) =>
  adminApi(auth, `/api/admin/disputes/${encodeURIComponent(id)}/resolve`, 'POST');
export const reviewResponse = (auth: AdminAuth, id: string, action: 'approve' | 'reject') =>
  adminApi(auth, `/api/admin/responses/${encodeURIComponent(id)}/${action}`, 'POST');

/** Loads every dashboard panel; a panel that fails is reported, not fatal. Throws Unauthorised on a 401. */
export async function loadDashboard(auth: AdminAuth, days: string): Promise<DashboardData> {
  const calls = [
    adminApi<Analytics>(auth, `/api/admin/analytics?days=${encodeURIComponent(days)}`),
    adminApi<Stats>(auth, '/api/admin/stats'),
    adminApi<Health>(auth, '/api/admin/source-health'),
    adminApi<Dispute[]>(auth, '/api/admin/disputes'),
    adminApi<DevResponse[]>(auth, '/api/admin/responses'),
    adminApi<{ reports: AdminReport[] }>(auth, '/api/admin/reports'),
    adminApi<Tax>(auth, '/api/admin/tax'),
    adminApi<Engines>(auth, '/api/admin/engines'),
    adminApi<Held>(auth, '/api/admin/held'),
  ] as const;
  const results = await Promise.allSettled(calls);
  const bad = results.find((r) => r.status === 'rejected' && r.reason instanceof Unauthorised);
  if (bad) throw (bad as PromiseRejectedResult).reason;
  const v = results.map((r) => (r.status === 'fulfilled' ? r.value : null)) as [
    Analytics | null,
    Stats | null,
    Health | null,
    Dispute[] | null,
    DevResponse[] | null,
    { reports: AdminReport[] } | null,
    Tax | null,
    Engines | null,
    Held | null,
  ];
  return {
    analytics: v[0],
    stats: v[1],
    health: v[2],
    disputes: v[3] ?? [],
    responses: v[4] ?? [],
    reports: v[5]?.reports ?? null,
    tax: v[6],
    engines: v[7],
    held: v[8],
    failed: results
      .filter((r) => r.status === 'rejected')
      .map((r) => (r as PromiseRejectedResult).reason.message),
    demoNote: auth.mode === 'demo' ? (await loadDemo()).note : undefined,
  };
}
