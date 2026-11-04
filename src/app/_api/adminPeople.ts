import { useAdminSession } from '@/store/adminSession';
import type { ApiBan, ApiPurchase, ApiSession, ApiUser } from '@/utils/adminPeople';
import { ApiError, http } from './http';

type Init = { method?: string; body?: unknown };

/** One call to the admin API with the signed-in operator's login. A 401 signs the operator out. */
function authed<T>(path: string, init: Init = {}): Promise<T> {
  const { mode, authHeader } = useAdminSession.getState();
  if (mode !== 'live') return Promise.reject(new Error('Not signed in to a live server.'));
  return http<T>(path, {
    ...init,
    headers: { Authorization: authHeader },
    cache: 'no-store',
  }).catch((e: unknown) => {
    if (e instanceof ApiError && e.status === 401) useAdminSession.getState().signOut();
    throw e;
  });
}

/** What to tell the operator: the server's own sentence when there is one, otherwise what went wrong in plain words. */
export function adminErrorMessage(e: unknown): string {
  if (e instanceof ApiError) {
    if (e.status === 401) return 'The admin login was refused. Sign in again.';
    if (e.status >= 500)
      return 'The server had a problem. Nothing was changed; try again in a moment.';
    return e.message || 'The server refused that.';
  }
  if ((e as Error)?.name === 'AbortError') return 'The server took too long to answer.';
  if (e instanceof TypeError) return 'Could not reach the server.';
  return (e as Error)?.message || 'Something went wrong.';
}

const PAGE = 100;
const MAX_PAGES = 10;

export async function fetchUsers(): Promise<ApiUser[]> {
  const all: ApiUser[] = [];
  for (let page = 0; page < MAX_PAGES; page++) {
    const { users } = await authed<{ users: ApiUser[] }>(
      `/api/admin/users?limit=${PAGE}&offset=${page * PAGE}`,
    );
    all.push(...users);
    if (users.length < PAGE) break;
  }
  return all;
}
export const fetchSessions = () =>
  authed<{ sessions: ApiSession[] }>('/api/admin/sessions').then((r) => r.sessions);
export const fetchBans = () => authed<{ bans: ApiBan[] }>('/api/admin/bans').then((r) => r.bans);
export const fetchUserDetail = (id: string) =>
  authed<{ user: ApiUser; sessions: ApiSession[]; purchases: ApiPurchase[] }>(
    `/api/admin/users/${encodeURIComponent(id)}`,
  );

const post = (path: string, body: unknown = {}) => authed<unknown>(path, { method: 'POST', body });
export const revokeSession = (id: string) =>
  post(`/api/admin/sessions/${encodeURIComponent(id)}/revoke`);
export const revokeUserSessions = (userId: string) =>
  post(`/api/admin/users/${encodeURIComponent(userId)}/sessions/revoke`);
export const setUserDisabled = (userId: string, disabled: boolean) =>
  post(`/api/admin/users/${encodeURIComponent(userId)}/${disabled ? 'disable' : 'enable'}`);
export const banSessionIp = (sessionId: string, reason: string, days: number | null) =>
  post(`/api/admin/sessions/${encodeURIComponent(sessionId)}/ban-ip`, { reason, days: days ?? 0 });
export const createBan = (
  kind: 'account' | 'ip',
  target: string,
  reason: string,
  days: number | null,
) => post('/api/admin/bans', { kind, target, reason, days: days ?? 0 });
export const liftBan = (id: string) => post(`/api/admin/bans/${encodeURIComponent(id)}/lift`);
