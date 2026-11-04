import { create } from 'zustand';
import {
  SEED_BAN_LIST,
  SEED_SESSION_LIST,
  SEED_USER_LIST,
  type SeedBan,
  type SeedSession,
  type SeedUser,
} from '@/constants/adminSeedPeople';

type State = {
  users: SeedUser[];
  sessions: SeedSession[];
  bans: SeedBan[];
  endSession: (id: string) => void;
  endAllSessions: (userId: string) => void;
  setDisabled: (userId: string, disabled: boolean) => void;
  banAccount: (email: string, reason: string, days: number | null) => void;
  banIp: (ip: string, reason: string, days: number | null) => void;
  unban: (id: string) => void;
};

const ipMatches = (ip: string, target: string) =>
  target.includes('/')
    ? ip.startsWith(target.split('/')[0].split('.').slice(0, 3).join('.') + '.')
    : ip === target;

const until = (days: number | null) =>
  days == null ? null : new Date(Date.now() + days * 86400e3).toISOString();

/** Seed-driven for now: the actions change this in-memory copy only, so a ban shows up in every view until the real API exists. */
export const useConsoleData = create<State>((set) => ({
  users: SEED_USER_LIST,
  sessions: SEED_SESSION_LIST,
  bans: SEED_BAN_LIST,
  endSession: (id) => set((s) => ({ sessions: s.sessions.filter((x) => x.id !== id) })),
  endAllSessions: (userId) =>
    set((s) => ({ sessions: s.sessions.filter((x) => x.userId !== userId) })),
  setDisabled: (userId, disabled) =>
    set((s) => ({
      users: s.users.map((u) => (u.id === userId ? { ...u, disabled } : u)),
      sessions: disabled ? s.sessions.filter((x) => x.userId !== userId) : s.sessions,
    })),
  banAccount: (email, reason, days) =>
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
    }),
  banIp: (ip, reason, days) =>
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
    })),
  unban: (id) =>
    set((s) => {
      const ban = s.bans.find((b) => b.id === id);
      return {
        bans: s.bans.filter((b) => b.id !== id),
        users:
          ban && ban.kind === 'account'
            ? s.users.map((u) => (u.email === ban.target ? { ...u, disabled: false } : u))
            : s.users,
      };
    }),
}));
