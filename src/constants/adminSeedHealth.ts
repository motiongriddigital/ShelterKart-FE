export type Level = 'error' | 'warn' | 'info';
export type ErrorEntry = {
  id: string;
  level: Level;
  source: string;
  message: string;
  detail: string;
  count: number;
  firstAt: string;
  lastAt: string;
};
export type FailedJob = {
  id: string;
  kind: string;
  ref: string;
  reason: string;
  attempts: number;
  failedAt: string;
};
export type Register = {
  code: string;
  label: string;
  state: 'healthy' | 'degraded' | 'down' | 'unconfirmed' | 'skipped';
  note: string;
  lastOkAt: string | null;
  checkedAt: string;
  failures: number;
  p95ms: number;
};
export type DeliveryChannel = {
  channel: string;
  provider: string;
  sent: number;
  failed: number;
  avgSeconds: number;
  last: { at: string; to: string; ok: boolean; note: string }[];
};

const at = (hoursAgo: number) =>
  new Date(Date.UTC(2026, 10, 4, 12, 0, 0) - hoursAgo * 3600e3).toISOString();

export const SEED_ERRORS: ErrorEntry[] = [
  {
    id: 'e1',
    level: 'error',
    source: 'engine:openai',
    message: 'Rate limit reached for requests',
    detail:
      'POST /v1/responses answered 429. Retry-After 20 s. Another engine took over for 41 of 54 calls.',
    count: 41,
    firstAt: at(30),
    lastAt: at(2),
  },
  {
    id: 'e2',
    level: 'error',
    source: 'connector:rera-karnataka',
    message: 'Register answered 503 three times in a row',
    detail:
      'GET https://rera.karnataka.gov.in/ProjectDetails returned 503. The market was switched to research-only until the next health check.',
    count: 9,
    firstAt: at(20),
    lastAt: at(5),
  },
  {
    id: 'e3',
    level: 'warn',
    source: 'delivery:email',
    message: 'Report e-mail soft-bounced',
    detail:
      'Recipient mailbox full (452). Retried after 1 minute and delivered on the second attempt.',
    count: 6,
    firstAt: at(40),
    lastAt: at(9),
  },
  {
    id: 'e4',
    level: 'error',
    source: 'payments:razorpay',
    message: 'Webhook signature did not match',
    detail:
      'A POST to /api/payments/razorpay/webhook failed signature verification and was ignored. No purchase changed.',
    count: 2,
    firstAt: at(13),
    lastAt: at(13),
  },
  {
    id: 'e5',
    level: 'warn',
    source: 'investigator',
    message: 'Sweep stopped at its cost cap',
    detail:
      'The investigation reached its USD 0.40 cap before the last question. The report was saved with what was found.',
    count: 14,
    firstAt: at(46),
    lastAt: at(1),
  },
  {
    id: 'e6',
    level: 'info',
    source: 'accounts',
    message: 'Sign-in code mailed to a new address',
    detail: 'Counted for the sign-in funnel; no personal data is logged.',
    count: 233,
    firstAt: at(47),
    lastAt: at(0),
  },
  {
    id: 'e7',
    level: 'warn',
    source: 'auth',
    message: 'Five wrong sign-in codes for one address',
    detail: 'The code was locked and the address must ask for a new one.',
    count: 7,
    firstAt: at(36),
    lastAt: at(6),
  },
];

export const SEED_FAILED_JOBS: FailedJob[] = [
  {
    id: 'j1',
    kind: 'Paid report',
    ref: 'SK-9C41D7A2E',
    reason: 'The research engine stopped before the report was complete',
    attempts: 2,
    failedAt: at(6),
  },
  {
    id: 'j2',
    kind: 'Delivery e-mail',
    ref: 'SK-4B77E1F90',
    reason: 'The e-mail provider answered 500 after three attempts',
    attempts: 3,
    failedAt: at(11),
  },
  {
    id: 'j3',
    kind: 'Translation',
    ref: 'SK-2D0A6B318',
    reason: 'No engine was approved for personal data in this market',
    attempts: 1,
    failedAt: at(18),
  },
];

const REG = (
  code: string,
  label: string,
  state: Register['state'],
  note: string,
  okH: number | null,
  failures: number,
  p95: number,
): Register => ({
  code,
  label,
  state,
  note,
  lastOkAt: okH == null ? null : at(okH),
  checkedAt: at(0.5),
  failures,
  p95ms: p95,
});

export const SEED_REGISTERS: Register[] = [
  REG(
    'uk',
    'United Kingdom',
    'healthy',
    'Land Registry and Companies House answer normally.',
    0.5,
    0,
    840,
  ),
  REG('fr', 'France', 'healthy', 'Answers normally.', 0.5, 0, 1120),
  REG('no', 'Norway', 'healthy', 'Answers normally.', 0.5, 0, 910),
  REG('sg', 'Singapore', 'healthy', 'Answers normally.', 0.5, 0, 770),
  REG(
    'ie',
    'Ireland',
    'unconfirmed',
    'The register’s terms for automated access are not confirmed yet.',
    24,
    0,
    1380,
  ),
  REG('tw', 'Taiwan', 'skipped', 'Not checked: no connector for this market yet.', null, 0, 0),
  REG('au', 'Australia', 'skipped', 'Not checked: no connector for this market yet.', null, 0, 0),
  REG('fi', 'Finland', 'healthy', 'Answers normally.', 0.5, 0, 990),
  REG('cz', 'Czech Republic', 'healthy', 'Answers normally.', 0.5, 0, 1240),
  REG(
    'in',
    'India (MahaRERA)',
    'degraded',
    'Slow: p95 above 4 seconds in the last hour. Results are still returned.',
    0.5,
    1,
    4210,
  ),
  REG(
    'ee',
    'Estonia',
    'down',
    'Answered 503 three times in a row. Switched to research-only.',
    5,
    3,
    0,
  ),
];

export const SEED_DELIVERY: DeliveryChannel[] = [
  {
    channel: 'E-mail',
    provider: 'Resend',
    sent: 312,
    failed: 6,
    avgSeconds: 4.2,
    last: [
      { at: at(0.2), to: 'a•••@example.com', ok: true, note: 'Report ready' },
      { at: at(1.1), to: 'm•••@example.com', ok: true, note: 'Sign-in code' },
      { at: at(2.6), to: 'o•••@example.com', ok: false, note: 'Mailbox full (452), retried' },
      { at: at(3.4), to: 'p•••@example.com', ok: true, note: 'Report ready' },
      { at: at(5.0), to: 'l•••@example.com', ok: true, note: 'Sign-in code' },
    ],
  },
  {
    channel: 'WhatsApp',
    provider: 'Meta Cloud API',
    sent: 0,
    failed: 0,
    avgSeconds: 0,
    last: [],
  },
];

export const ERROR_SERIES: { hour: string; errors: number; warnings: number }[] = Array.from(
  { length: 24 },
  (_, i) => {
    const h = 23 - i;
    const base = [1, 2, 0, 1, 3, 2, 1, 0, 2, 4, 6, 3, 2, 1, 0, 1, 2, 5, 9, 4, 2, 1, 1, 0][i];
    return {
      hour: at(h).slice(11, 13) + ':00',
      errors: base,
      warnings: Math.max(0, Math.round(base * 1.4) - 1),
    };
  },
);
