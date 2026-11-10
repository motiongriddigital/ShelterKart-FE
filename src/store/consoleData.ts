import { create } from 'zustand';
import {
  SEED_BAN_LIST,
  SEED_SESSION_LIST,
  SEED_USER_LIST,
  type SeedBan,
  type SeedSession,
  type SeedUser,
} from '@/constants/adminSeedPeople';
import {
  adminErrorMessage,
  banSessionIp as apiBanSessionIp,
  createBan,
  fetchBans,
  fetchSessions,
  fetchUserDetail,
  fetchUsers,
  liftBan,
  revokeSession,
  revokeUserSessions,
  setUserDisabled,
} from '@/services/adminPeople';
import {
  banFromApi,
  purchasesFromApi,
  sessionFromApi,
  userFromApi,
  withBans,
} from '@/utils/adminPeople';
import { useAdminSession } from './adminSession';

type Load = 'idle' | 'loading' | 'ready' | 'error';

type State = {
  users: SeedUser[];
  sessions: SeedSession[];
  bans: SeedBan[];
  /** True when the operator is signed in to a real server; the demo keeps these lists in memory only. */
  live: boolean;
  status: Load;
  error: string;
  details: Record<string, Load>;
  load: (opts?: { quiet?: boolean }) => Promise<void>;
  loadUser: (id: string) => Promise<void>;
  endSession: (id: string) => Promise<void>;
  endAllSessions: (userId: string) => Promise<void>;
  setDisabled: (userId: string, disabled: boolean) => Promise<void>;
  banAccount: (email: string, reason: string, days: number | null) => Promise<void>;
  banIp: (ip: string, reason: string, days: number | null) => Promise<void>;
  banSessionIp: (sessionId: string, reason: string, days: number | null) => Promise<void>;
  unban: (id: string) => Promise<void>;
};

const ipMatches = (ip: string, target: string) =>
  target.includes('/')
    ? ip.startsWith(target.split('/')[0].split('.').slice(0, 3).join('.') + '.')
    : ip === target;

const until = (days: number | null) =>
  days == null ? null : new Date(Date.now() + days * 86400e3).toISOString();

const start = (live: boolean) =>
  live
    ? { users: [], sessions: [], bans: [], live, status: 'idle' as Load, error: '', details: {} }
    : {
        users: SEED_USER_LIST,
        sessions: SEED_SESSION_LIST,
        bans: SEED_BAN_LIST,
        live,
        status: 'ready' as Load,
        error: '',
        details: {},
      };

/**
 * One source for the Users, Sessions and Bans screens. Signed in to a real server it loads from the admin API and every action
 * is sent to the server first; in the demo it is seed data and the actions change this in-memory copy only.
 */
export const useConsoleData = create<State>((set, get) => ({
  ...start(useAdminSession.getState().mode === 'live'),

  load: async ({ quiet = false } = {}) => {
    if (!get().live) return;
    if (!quiet) set({ status: 'loading', error: '' });
    try {
      const [users, sessions, bans] = await Promise.all([
        fetchUsers(),
        fetchSessions(),
        fetchBans(),
      ]);
      const banList = bans.map(banFromApi);
      set((s) => {
        const known = new Map(s.users.map((u) => [u.id, u.purchases]));
        const merged = withBans(
          users.map(userFromApi).map((u) => ({ ...u, purchases: known.get(u.id) ?? [] })),
          banList,
        );
        return {
          users: merged,
          sessions: sessions.map(sessionFromApi),
          bans: banList,
          status: 'ready',
          error: '',
        };
      });
    } catch (e) {
      if (!quiet) set({ status: 'error', error: adminErrorMessage(e) });
    }
  },

  loadUser: async (id) => {
    if (!get().live) return;
    set((s) => ({ details: { ...s.details, [id]: 'loading' } }));
    try {
      const d = await fetchUserDetail(id);
      const purchases = purchasesFromApi(d.purchases);
      const sessions = d.sessions.map(sessionFromApi);
      set((s) => {
        const mine = s.users.some((u) => u.id === id);
        const base = withBans([userFromApi(d.user)], s.bans)[0];
        return {
          users: mine
            ? s.users.map((u) => (u.id === id ? { ...u, purchases } : u))
            : [...s.users, { ...base, purchases }],
          sessions: [...s.sessions.filter((x) => x.userId !== id), ...sessions],
          details: { ...s.details, [id]: 'ready' },
        };
      });
    } catch (e) {
      set((s) => ({ details: { ...s.details, [id]: 'error' }, error: adminErrorMessage(e) }));
    }
  },

  endSession: async (id) => {
    if (get().live) await revokeSession(id);
    set((s) => ({ sessions: s.sessions.filter((x) => x.id !== id) }));
  },
  endAllSessions: async (userId) => {
    if (get().live) await revokeUserSessions(userId);
    set((s) => ({ sessions: s.sessions.filter((x) => x.userId !== userId) }));
  },
  setDisabled: async (userId, disabled) => {
    if (get().live) await setUserDisabled(userId, disabled);
    set((s) => ({
      users: s.users.map((u) => (u.id === userId ? { ...u, disabled } : u)),
      sessions: disabled ? s.sessions.filter((x) => x.userId !== userId) : s.sessions,
    }));
  },

  banAccount: async (email, reason, days) => {
    if (get().live) {
      await createBan('account', email, reason, days);
      await get().load({ quiet: true });
      return;
    }
    set((s) => {
      const user = s.users.find((u) => u.email === email);
      return {
        bans: [
          {
            id: `b${Date.now()}`,
            kind: 'account',
            target: email,
            reason,
            createdAt: new Date().toISOString(),
            expiresAt: until(days),
            by: 'admin',
          },
          ...s.bans,
        ],
        users: s.users.map((u) => (u.email === email ? { ...u, disabled: true } : u)),
        sessions: user ? s.sessions.filter((x) => x.userId !== user.id) : s.sessions,
      };
    });
  },
  banIp: async (ip, reason, days) => {
    if (get().live) {
      await createBan('ip', ip, reason, days);
      await get().load({ quiet: true });
      return;
    }
    set((s) => ({
      bans: [
        {
          id: `b${Date.now()}`,
          kind: 'ip',
          target: ip,
          reason,
          createdAt: new Date().toISOString(),
          expiresAt: until(days),
          by: 'admin',
        },
        ...s.bans,
      ],
      sessions: s.sessions.filter((x) => !ipMatches(x.ip, ip)),
    }));
  },
  banSessionIp: async (sessionId, reason, days) => {
    if (get().live) {
      await apiBanSessionIp(sessionId, reason, days);
      await get().load({ quiet: true });
      return;
    }
    const ip = get().sessions.find((x) => x.id === sessionId)?.ip;
    if (ip) await get().banIp(ip, reason, days);
  },
  unban: async (id) => {
    if (get().live) {
      await liftBan(id);
      await get().load({ quiet: true });
      return;
    }
    set((s) => {
      const ban = s.bans.find((b) => b.id === id);
      return {
        bans: s.bans.filter((b) => b.id !== id),
        users:
          ban && ban.kind === 'account'
            ? s.users.map((u) => (u.email === ban.target ? { ...u, disabled: false } : u))
            : s.users,
      };
    });
  },
}));

// Signing in to a server, to the demo, or out starts these lists again: nothing from one mode is shown in another.
useAdminSession.subscribe((s, prev) => {
  if (s.mode !== prev.mode) useConsoleData.setState(start(s.mode === 'live'));
});
