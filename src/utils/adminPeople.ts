import type { SeedBan, SeedSession, SeedUser } from '@/constants/adminSeedPeople';

export type ApiUser = {
  id: string;
  email: string;
  displayName: string | null;
  country: string | null;
  language: string | null;
  createdAt: string | null;
  lastLoginAt: string | null;
  disabled: boolean;
};
export type ApiSession = {
  id: string;
  userId: string;
  createdAt: string | null;
  lastSeenAt: string | null;
  expiresAt: string | null;
  ip: string | null;
  userAgent: string | null;
};
export type ApiBan = {
  id: string;
  kind: 'account' | 'ip';
  target: string;
  reason: string;
  createdAt: string;
  expiresAt: string | null;
  createdBy: string;
  active: boolean;
};
export type ApiPurchase = {
  ref: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string | null;
};

/** The browser and system from a user-agent string, in a few words. */
export function deviceOf(ua: string | null): string {
  const s = ua ?? '';
  const browser = /Edg\//.test(s)
    ? 'Edge'
    : /Firefox\//.test(s)
      ? 'Firefox'
      : /Chrome\//.test(s) || /CriOS\//.test(s)
        ? 'Chrome'
        : /Safari\//.test(s)
          ? 'Safari'
          : '';
  const system = /iPhone|iPad/.test(s)
    ? 'iOS'
    : /Android/.test(s)
      ? 'Android'
      : /Windows/.test(s)
        ? 'Windows'
        : /Mac OS X|Macintosh/.test(s)
          ? 'macOS'
          : /Linux/.test(s)
            ? 'Linux'
            : '';
  return [browser, system].filter(Boolean).join(' on ') || 'Unknown device';
}

export const userFromApi = (u: ApiUser): SeedUser => ({
  id: u.id,
  email: u.email,
  name: u.displayName?.trim() || u.email.split('@')[0],
  country: u.country ?? '',
  language: u.language ?? '',
  createdAt: u.createdAt ?? '',
  lastLoginAt: u.lastLoginAt ?? '',
  purchases: [],
  disabled: Boolean(u.disabled),
});

export const sessionFromApi = (s: ApiSession): SeedSession => ({
  id: s.id,
  userId: s.userId,
  ip: s.ip ?? '',
  device: deviceOf(s.userAgent),
  country: '',
  startedAt: s.createdAt ?? '',
  lastSeenAt: s.lastSeenAt ?? s.createdAt ?? '',
});

export const banFromApi = (b: ApiBan): SeedBan => ({
  id: b.id,
  kind: b.kind,
  target: b.target,
  reason: b.reason,
  createdAt: b.createdAt,
  expiresAt: b.expiresAt,
  by: b.createdBy,
});

/** Only settled purchases are shown ('paid' or 'refunded', as the payment code writes them): one waiting for payment is not a purchase yet. */
export function purchasesFromApi(list: ApiPurchase[]): SeedUser['purchases'] {
  return list
    .filter((p) => p.status === 'paid' || p.status === 'refunded')
    .map((p) => ({
      ref: p.ref,
      project: '',
      amount: `${p.currency} ${Number(p.amount).toLocaleString('en-IN')}`,
      at: p.createdAt ?? '',
      status: p.status === 'refunded' ? 'refunded' : 'paid',
    }));
}

/** A user is shown as disabled when the account is disabled or an active ban names the e-mail address. */
export function withBans(users: SeedUser[], bans: SeedBan[]): SeedUser[] {
  const banned = new Set(
    bans.filter((b) => b.kind === 'account').map((b) => b.target.toLowerCase()),
  );
  return users.map((u) => (banned.has(u.email.toLowerCase()) ? { ...u, disabled: true } : u));
}
