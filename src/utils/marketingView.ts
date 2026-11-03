import type { Loose } from '@/types/desk';

const IN = 'en-IN';

/** "—" for a missing number; thousands grouped the Indian way. */
export const num = (v: unknown, suffix = ''): string =>
  v == null ? '—' : `${typeof v === 'number' ? v.toLocaleString(IN) : String(v)}${suffix}`;

export const money = (o?: Record<string, number>): string => {
  const keys = Object.keys(o ?? {});
  return keys.length
    ? keys.map((c) => `${(o as Record<string, number>)[c].toLocaleString(IN)} ${c}`).join(', ')
    : '—';
};

export const addDays = (ymd: string, days: number) =>
  new Date(Date.parse(`${ymd}T00:00:00Z`) + days * 864e5).toISOString().slice(0, 10);

export const inr = (v: number) => `₹${v.toLocaleString(IN)}`;

/** How this week compares with last: nothing, "same", or up/down with last week's figure. */
export function change(a: number | null | undefined, b: number | null | undefined) {
  if (a == null || b == null) return null;
  if (a === b) return { kind: 'flat', text: '(same)' } as const;
  return {
    kind: a > b ? 'up' : 'down',
    text: `(${a > b ? 'up' : 'down'} from ${num(b)})`,
  } as const;
}

export const costCell = (m: Loose) => (m.organic ? 'Organic: no spend' : money(m.costPerPaid));

const channels = (o?: Record<string, number>) =>
  Object.keys(o ?? {})
    .map((c) => `${c} ${(o as Record<string, number>)[c]}`)
    .join(', ');

/** The seven weekly measures for one market: [label, value, last week's value, detail, target]. */
export function measureRows(m: Loose, last: Loose, targets: Loose = {}) {
  return [
    {
      label: 'Visits',
      value: m.visits,
      prev: last.visits,
      detail: channels(m.visitsByChannel) || 'No visits yet',
      target: targets.visits,
    },
    {
      label: 'Previews per 100 visits',
      value: m.previewsPer100,
      prev: last.previewsPer100,
      target: targets.previewsPer100,
    },
    {
      label: 'Shares per 100 visits',
      value: m.sharesPer100,
      prev: last.sharesPer100,
      target: targets.sharesPer100,
    },
    {
      label: '"Ask us to check" requests',
      value: m.checkRequests,
      prev: last.checkRequests,
      target: targets.checkRequests,
    },
    {
      label: 'Paid reports and revenue',
      value: m.paid,
      prev: last.paid,
      target: targets.paid,
      detail:
        money(m.revenue) + (channels(m.paidByChannel) ? `; via ${channels(m.paidByChannel)}` : ''),
    },
    { label: 'Cost per paid report', text: costCell(m) },
    {
      label: 'Refund rate and open complaints',
      text: 'All markets only',
      detail: 'Shown under Early warnings',
    },
  ];
}

export type Call = { tone: string; word: string; title: string; text: string };

/** This week's calls: what the launch rules say to do now. */
export function callsFor(d: Loose): Call[] {
  const p = d.decisions.pause;
  const gate = d.decisions.gate;
  const met = gate.conditions.filter((c: Loose) => c.status === 'met').length;
  const ch: Loose[] = d.decisions.channels;
  const bud = d.decisions.budget;
  const p2 = d.decisions.phase2;
  return [
    p.triggered
      ? { tone: 'bad', word: 'Pause', title: 'Pause everything', text: p.reasons.join('; ') }
      : {
          tone: 'ok',
          word: 'Clear',
          title: 'No reason to pause',
          text: `No open legal notice, platform strike or uncorrected factual error${p.connected.responses ? '.' : ' that the dashboard can see (complaints are not connected).'}`,
        },
    gate.open
      ? {
          tone: 'ok',
          word: 'Open',
          title: 'The Phase 1 gate is open',
          text: 'All five conditions hold: set the first monthly budget at 30% of contribution.',
        }
      : {
          tone: 'warn',
          word: `${met} of 5`,
          title: 'Stay organic: the Phase 1 gate is shut',
          text: 'See the gate below for what is missing.',
        },
    ch.length
      ? {
          tone: 'plain',
          word: `${ch.length} market${ch.length > 1 ? 's' : ''}`,
          title: 'Paid channels',
          text: ch.map((c) => `${c.market}, ${c.scope}: ${c.call} (${c.detail})`).join(' '),
        }
      : {
          tone: 'plain',
          word: 'None',
          title: 'No paid spend recorded',
          text:
            d.phase === 0
              ? 'Phase 0 has no media spend.'
              : 'Record spend below to get scale, hold and stop calls.',
        },
    {
      tone: p2.organicHalf === 'met' ? 'ok' : p2.organicHalf === 'unknown' ? 'plain' : 'warn',
      word: p2.organicShareOfPreviews == null ? 'Unknown' : `${p2.organicShareOfPreviews}% organic`,
      title: 'Phase 2 readiness',
      text: `Organic share of previews over the last six weeks. ${p2.paybackDetail}`,
    },
    bud.contribution == null
      ? { tone: 'plain', word: 'Unknown', title: `Budget rule for ${bud.month}`, text: bud.detail }
      : {
          tone: 'plain',
          word: inr(bud.budget),
          title: `Budget rule for the month after ${bud.month}`,
          text: `Contribution ${inr(bud.contribution)} × 30%: best channel ${inr(bud.split.best)}, tests ${inr(bud.split.tests)}, reserve ${inr(bud.split.reserve)}${d.phase === 0 ? '. Not to be spent until the gate opens.' : '.'}`,
        },
  ];
}

/** Gaps the dashboard cannot see, shown above the calls. */
export function dataGaps(d: Loose): string[] {
  const tp = d.total.thisWeek;
  const gaps: string[] = [];
  if (tp.paid && tp.attributedPaid < tp.paid)
    gaps.push(
      `${tp.paid - tp.attributedPaid} of ${tp.paid} paid reports this week carry no source (paid before checkout sent it, or the browser sent nothing). They count for their market, not for a channel.`,
    );
  if (!d.connected.refunds) gaps.push('Refunds are not connected (they need the database).');
  if (!d.connected.responses)
    gaps.push('Replies, corrections and complaints are not connected (they need the database).');
  return gaps;
}

export function baselineText(b: Loose): string {
  return b.status === 'ready'
    ? `Baseline ready since ${b.since}`
    : b.status === 'collecting'
      ? `Collecting a baseline: day ${b.days} of 14`
      : 'No visits yet: the baseline starts with the first visit';
}

export function warningRows(d: Loose): [string, string, string][] {
  const w = d.earlyWarnings;
  const rc = w.repliesAndCorrections;
  const tw = d.total.thisWeek;
  const ch = w.contentHealth;
  return [
    [
      'Refund rate',
      tw.refundRate == null
        ? d.connected.refunds
          ? 'No sales yet'
          : 'Not connected'
        : `${tw.refundRate}% of ${tw.paid} paid (the model assumes 3%)`,
      'Refunds',
    ],
    [
      'Replies and corrections',
      rc
        ? `${rc.open} open; ${rc.resolvedThisWeek} resolved this week${rc.medianDaysToResolve == null ? '' : `, median ${rc.medianDaysToResolve} days to resolve`}`
        : 'Not connected',
      'Developer replies and corrections',
    ],
    [
      'Audience quality',
      w.audienceQuality == null
        ? 'No visits yet'
        : `${w.audienceQuality}% of visitors opened a preview`,
      'Analytics',
    ],
    [
      'Content health',
      ch.posts
        ? `${ch.held} of ${ch.posts} posts held by the checker${ch.reasons.length ? `: ${ch.reasons.map((r: [string, number]) => `${r[0]} (${r[1]})`).join(', ')}` : ''}`
        : 'No posts planned for this week',
      'Marketing desk',
    ],
    [
      'AI-answer citations',
      w.aiCitations
        ? `${w.aiCitations.cited} of ${w.aiCitations.checked} questions cited ShelterKart (${w.aiCitations.month})`
        : 'No monthly check recorded yet',
      'Your monthly check',
    ],
  ];
}
