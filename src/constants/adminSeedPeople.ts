import { MARKET_LIST } from './adminSeedGeo';

export type SeedUser = {
  id: string;
  email: string;
  name: string;
  country: string;
  language: string;
  createdAt: string;
  lastLoginAt: string;
  purchases: {
    ref: string;
    project: string;
    amount: string;
    at: string;
    status: 'paid' | 'refunded';
  }[];
  disabled: boolean;
};
export type SeedSession = {
  id: string;
  userId: string;
  ip: string;
  device: string;
  country: string;
  startedAt: string;
  lastSeenAt: string;
};
export type SeedBan = {
  id: string;
  kind: 'account' | 'ip';
  target: string;
  reason: string;
  createdAt: string;
  expiresAt: string | null;
  by: string;
};

const lcg = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};
const r = lcg(2026);
const pick = <T>(a: T[]) => a[Math.floor(r() * a.length)];
const iso = (daysAgo: number, hour = 9) => {
  const d = new Date(Date.UTC(2026, 10, 4, hour, 0, 0));
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString();
};

const PEOPLE: [string, string][] = [
  ['Aarav Shah', 'aarav.shah'],
  ['Meera Iyer', 'meera.iyer'],
  ['Omar Haddad', 'omar.haddad'],
  ['Priya Nair', 'priya.nair'],
  ['Liam Walker', 'liam.walker'],
  ['Sofia Russo', 'sofia.russo'],
  ['Kenji Mori', 'kenji.mori'],
  ['Hannah Berg', 'hannah.berg'],
  ['Rohan Mehta', 'rohan.mehta'],
  ['Ananya Rao', 'ananya.rao'],
  ['Tariq Aziz', 'tariq.aziz'],
  ['Chloe Dubois', 'chloe.dubois'],
  ['Vikram Joshi', 'vikram.joshi'],
  ['Isla Murphy', 'isla.murphy'],
  ['Neha Kulkarni', 'neha.kulkarni'],
  ['Daniel Cho', 'daniel.cho'],
  ['Fatima Khan', 'fatima.khan'],
  ['Mateo Silva', 'mateo.silva'],
];
const PROJECTS = [
  'Hubtown Celeste',
  'Marina Gate Residences',
  'Lodha Bellevue',
  'Emaar Creek Harbour',
  'The Reef, Dubai',
  'Canary Wharf Tower 4',
];
const DEVICES = [
  'Chrome on Windows',
  'Safari on iPhone',
  'Chrome on Android',
  'Safari on Mac',
  'Firefox on Windows',
  'Edge on Windows',
];
const CODES = MARKET_LIST.slice(0, 12).map((m) => m.code);

export const SEED_USER_LIST: SeedUser[] = PEOPLE.map(([name, handle], i) => {
  const paid = Math.floor(r() * 4);
  return {
    id: handle.replace('.', '-'),
    email: `${handle}@example.com`,
    name,
    country: pick(CODES),
    language: pick(['en', 'hi', 'ar', 'fr', 'es']),
    createdAt: iso(5 + Math.floor(r() * 60)),
    lastLoginAt: iso(Math.floor(r() * 6), 6 + Math.floor(r() * 14)),
    purchases: Array.from({ length: paid }, (_, k) => ({
      ref: `SK-${(100000000 + Math.floor(r() * 899999999)).toString(16).toUpperCase()}`,
      project: pick(PROJECTS),
      amount: pick(['₹1,499', '₹1,499', 'AED 75', 'US$19', '£15']),
      at: iso(Math.floor(r() * 30) + k),
      status: r() > 0.9 ? 'refunded' : 'paid',
    })),
    disabled: i === 7,
  };
});

export const SEED_SESSION_LIST: SeedSession[] = SEED_USER_LIST.flatMap((u, i) =>
  Array.from({ length: 1 + (i % 3 === 0 ? 1 : 0) }, (_, k) => ({
    id: `s-${u.id}-${k}`,
    userId: u.id,
    ip: `${[49, 103, 59, 82, 151, 217][i % 6]}.${Math.floor(r() * 250)}.${Math.floor(r() * 250)}.${Math.floor(r() * 250)}`,
    device: pick(DEVICES),
    country: u.country,
    startedAt: iso(Math.floor(r() * 8), 7 + k),
    lastSeenAt: iso(0, 5 + Math.floor(r() * 6)),
  })),
).filter((s) => !SEED_USER_LIST.find((u) => u.id === s.userId)?.disabled);

export const SEED_BAN_LIST: SeedBan[] = [
  {
    id: 'b1',
    kind: 'ip',
    target: '185.220.101.0/24',
    reason: 'Automated searches from an anonymising network, 4,200 requests in one hour',
    createdAt: iso(9),
    expiresAt: null,
    by: 'admin',
  },
  {
    id: 'b2',
    kind: 'account',
    target: 'hannah.berg@example.com',
    reason: 'Chargeback on two reports and abuse in a reply to a finding',
    createdAt: iso(3),
    expiresAt: iso(-27),
    by: 'admin',
  },
  {
    id: 'b3',
    kind: 'ip',
    target: '45.155.205.17',
    reason: 'Repeated sign-in code requests for other people’s addresses',
    createdAt: iso(1),
    expiresAt: iso(-6),
    by: 'admin',
  },
];
