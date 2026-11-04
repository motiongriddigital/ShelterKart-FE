// Calls the real admin API the way the Users screens do and runs the answers through the screens' own mapping.
// ADMIN_API (default http://127.0.0.1:4018, so the self-ban check sees the same address), ADMIN_USER and ADMIN_PASS name a running backend with ACCOUNTS_ENABLED=on and ACCOUNTS_DEV_ECHO=on.
import assert from 'node:assert/strict';
import {
  banFromApi,
  deviceOf,
  purchasesFromApi,
  sessionFromApi,
  userFromApi,
  withBans,
} from '../src/utils/adminPeople.ts';
import { geoStatsFromApi, notPlaced } from '../src/utils/adminGeo.ts';
import { MARKET_LIST } from '../src/constants/adminSeedGeo.ts';

const API = process.env.ADMIN_API || 'http://127.0.0.1:4018';
const AUTH =
  'Basic ' +
  Buffer.from(
    `${process.env.ADMIN_USER || 'qa'}:${process.env.ADMIN_PASS || 'qa-pass-123'}`,
  ).toString('base64');
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0 Safari/537.36';
let failures = 0;
const ok = (label, c) => {
  if (!c) failures++;
  console.log((c ? '  ok   ' : '  FAIL ') + label);
};
const call = async (path, { method = 'GET', body, auth = AUTH, headers = {} } = {}) => {
  const res = await fetch(API + path, {
    method,
    headers: {
      ...(auth ? { Authorization: auth } : {}),
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
};
async function signIn(email, ua = UA, extra = {}) {
  const h = { 'User-Agent': ua, ...extra };
  const rc = await call('/api/auth/request-code', {
    method: 'POST',
    body: { email },
    auth: '',
    headers: h,
  });
  const vc = await call('/api/auth/verify-code', {
    method: 'POST',
    body: { email, code: rc.body.devCode, termsAccepted: true },
    auth: '',
    headers: h,
  });
  return vc;
}
const stamp = Date.now();
const emails = [1, 2, 3].map((i) => `people-check-${stamp}-${i}@example.com`);

console.log('the admin login');
ok(
  'a wrong password is refused with 401',
  (await call('/api/admin/users', { auth: 'Basic ' + Buffer.from('qa:wrong').toString('base64') }))
    .status === 401,
);
ok(
  'no login at all is refused with 401',
  (await call('/api/admin/users', { auth: '' })).status === 401,
);

console.log('users and sessions, through the mapping');
for (const e of emails) assert.equal((await signIn(e)).status, 200, 'sign-in failed for ' + e);
const users = (await call('/api/admin/users?limit=100&offset=0')).body.users.map(userFromApi);
const mine = users.filter((u) => emails.includes(u.email));
ok('the three new users are listed', mine.length === 3);
ok(
  'none has a seed name',
  users.every((u) => !/Aarav|Meera|Omar|Priya|Liam|Sofia|Kenji|Hannah|Rohan/.test(u.name)),
);
ok(
  'a user with no display name is named after the e-mail',
  mine[0].name === mine[0].email.split('@')[0],
);
ok(
  'an empty country and last login are empty strings, not "undefined"',
  mine.every(
    (u) =>
      u.country === '' &&
      typeof u.lastLoginAt === 'string' &&
      !/undefined|null/.test(JSON.stringify(u)),
  ),
);
const sessions = (await call('/api/admin/sessions')).body.sessions.map(sessionFromApi);
const mySessions = sessions.filter((s) => mine.some((u) => u.id === s.userId));
ok('each user has one session', mySessions.length === 3);
ok(
  'the device is read from the user agent',
  mySessions.every((s) => s.device === 'Chrome on macOS') &&
    deviceOf('') === 'Unknown device' &&
    deviceOf(null) === 'Unknown device',
);
ok(
  'the address is a short code, never a dotted address',
  mySessions.every((s) => s.ip && !/^\d+\.\d+\.\d+\.\d+$/.test(s.ip)),
);
ok(
  'started and last seen are dates',
  mySessions.every(
    (s) => !Number.isNaN(Date.parse(s.startedAt)) && !Number.isNaN(Date.parse(s.lastSeenAt)),
  ),
);

console.log('one user in detail');
const detail = await call('/api/admin/users/' + mine[0].id);
ok(
  'the detail answers 200 with the same user',
  detail.status === 200 && detail.body.user.id === mine[0].id,
);
ok('a free account has no purchases', purchasesFromApi(detail.body.purchases).length === 0);
const sample = purchasesFromApi([
  {
    ref: 'SK-1',
    amount: 3000,
    currency: 'INR',
    status: 'active',
    createdAt: '2026-11-04T10:00:00Z',
  },
  {
    ref: 'SK-2',
    amount: 10,
    currency: 'GBP',
    status: 'refunded',
    createdAt: '2026-11-04T10:00:00Z',
  },
  {
    ref: 'SK-3',
    amount: 10,
    currency: 'GBP',
    status: 'pending_payment',
    createdAt: '2026-11-04T10:00:00Z',
  },
]);
ok(
  'an active purchase is paid, a refunded one is refunded, one waiting for payment is not shown',
  sample.length === 2 &&
    sample[0].status === 'paid' &&
    sample[0].amount === 'INR 3,000' &&
    sample[1].status === 'refunded',
);
ok(
  'a user id that does not exist is 404',
  (await call('/api/admin/users/00000000-0000-4000-8000-000000000000')).status === 404,
);
ok('an id that is not an id is 400', (await call('/api/admin/users/abc')).status === 400);

console.log('ending sessions');
const s1 = mySessions[0];
ok(
  'ending one session answers 200',
  (await call(`/api/admin/sessions/${s1.id}/revoke`, { method: 'POST', body: {} })).status === 200,
);
ok(
  'it is gone from the list',
  !(await call('/api/admin/sessions')).body.sessions.some((s) => s.id === s1.id),
);
ok(
  'ending it again is 404',
  (await call(`/api/admin/sessions/${s1.id}/revoke`, { method: 'POST', body: {} })).status === 404,
);
ok(
  'ending all sessions of a user answers 200',
  (await call(`/api/admin/users/${mine[1].id}/sessions/revoke`, { method: 'POST', body: {} }))
    .status === 200,
);
ok(
  'that user has no session left',
  !(await call('/api/admin/sessions')).body.sessions.some((s) => s.userId === mine[1].id),
);

console.log('bans');
const ban = await call('/api/admin/bans', {
  method: 'POST',
  body: { kind: 'account', target: mine[2].email, reason: 'people check: spam', days: 1 },
});
ok(
  'banning an account answers 200',
  ban.status === 200 && ban.body.ban && ban.body.ban.kind === 'account',
);
const bans = (await call('/api/admin/bans')).body.bans.map(banFromApi);
ok(
  'the ban is listed with who made it',
  bans.some((b) => b.target === mine[2].email && b.by === 'admin' && b.expiresAt),
);
ok(
  'the user is shown as disabled through the bans',
  withBans(users, bans).find((u) => u.email === mine[2].email).disabled === true,
);
const again = await signIn(mine[2].email);
ok('a banned account cannot sign in again', again.status === 403 || again.status === 400);
ok(
  'banning it twice is refused (409) with a sentence',
  (
    await call('/api/admin/bans', {
      method: 'POST',
      body: { kind: 'account', target: mine[2].email, reason: 'people check: again', days: 1 },
    })
  ).status === 409,
);
ok(
  'a reason that is too short is refused (400)',
  (
    await call('/api/admin/bans', {
      method: 'POST',
      body: { kind: 'account', target: 'x@example.com', reason: 'no', days: 1 },
    })
  ).status === 400,
);
const self = await call('/api/admin/bans', {
  method: 'POST',
  body: { kind: 'ip', target: '127.0.0.1', reason: 'people check: self ban', days: 1 },
});
ok(
  'banning the address the admin is using is refused with the self-ban message',
  self.status === 400 && /block the address you are using/.test(self.body.error || ''),
);
const other = await call('/api/admin/bans', {
  method: 'POST',
  body: { kind: 'ip', target: '203.0.113.0/24', reason: 'people check: test range', days: 1 },
});
ok("a range that is not the admin's is accepted", other.status === 200);
const lifted = await call(`/api/admin/bans/${other.body.ban.id}/lift`, {
  method: 'POST',
  body: {},
});
ok(
  'lifting it answers 200 and it leaves the active list',
  lifted.status === 200 &&
    !(await call('/api/admin/bans')).body.bans.some((b) => b.id === other.body.ban.id),
);
await call(`/api/admin/bans/${ban.body.ban.id}/lift`, { method: 'POST', body: {} });
const afterLift = await call('/api/auth/request-code', {
  method: 'POST',
  body: { email: mine[2].email },
  auth: '',
  headers: { 'User-Agent': UA },
});
ok(
  `after the ban is lifted a code can be requested again, not refused as banned (got ${afterLift.status} ${JSON.stringify(afterLift.body)})`,
  afterLift.status === 202 || afterLift.status === 429,
);
const badLift = await call('/api/admin/bans/abc/lift', { method: 'POST', body: {} });
ok(
  `a ban id that is not an id is 400 (got ${badLift.status} ${JSON.stringify(badLift.body)})`,
  badLift.status === 400,
);

console.log('the user map');
const geoEmails = [
  `geo-check-${stamp}-in@example.com`,
  `geo-check-${stamp}-gb@example.com`,
  `geo-check-${stamp}-cn@example.com`,
];
await signIn(geoEmails[0], UA, { 'CF-IPCountry': 'IN' });
await signIn(geoEmails[1], UA, { 'CF-IPCountry': 'gb' });
await signIn(geoEmails[2], UA, { 'CF-IPCountry': 'CN' });
const geo = await call('/api/admin/geo/users');
ok('the route answers 200', geo.status === 200 && Array.isArray(geo.body.markets));
const stats = geoStatsFromApi(geo.body.markets, MARKET_LIST);
ok(
  'every one of the 36 markets has a row, with its fixed facts from the map',
  stats.length === 36 &&
    stats.length === MARKET_LIST.length &&
    stats.every((c) => c.numeric && c.currency),
);
const row = (code) => stats.find((c) => c.code === code);
ok(
  'India has at least the user from the edge header IN, and the United Kingdom the one from gb',
  row('in').users >= 1 && row('uk').users >= 1,
);
ok(
  'a country that is not a market is counted as not placed, with the users that have no country',
  notPlaced(geo.body) >= 4,
);
ok(
  'the total adds up: markets, other and unknown',
  stats.reduce((t, c) => t + c.users, 0) + notPlaced(geo.body) === geo.body.totals.users,
);
ok(
  'no number is NaN, negative or missing',
  stats.every((c) =>
    [c.users, c.paid, c.conversion, c.newThisWeek].every((v) => Number.isFinite(v) && v >= 0),
  ),
);
ok(
  'a market the server did not name has no users instead of a crash',
  geoStatsFromApi([], MARKET_LIST).every((c) => c.users === 0 && c.conversion === 0),
);
ok(
  'nothing personal in the answer',
  !/@|geo-check|\d+\.\d+\.\d+\.\d+/.test(JSON.stringify(geo.body)),
);
ok(
  'a wrong login is refused with 401',
  (
    await call('/api/admin/geo/users', {
      auth: 'Basic ' + Buffer.from('qa:wrong').toString('base64'),
    })
  ).status === 401,
);

console.log('nothing leaks');
const all = JSON.stringify([users, sessions, bans]);
ok(
  'no stack trace or SQL text in what the screens receive',
  !/at .*\.js|SELECT|relation "/.test(all),
);

console.log(failures ? `\n${failures} FAILED` : '\nall passing');
process.exit(failures ? 1 : 0);
