import { cn } from '@/utils/cn';

// Tailwind classes shared by the marketing and social desks (the dashboard uses the console theme directly).
// Repeated looks live here once; the raw-tag rules (section, label, table...) stay in desk.module.scss.
export const tone = {
  ok: 'bg-ok-bg text-ok',
  warn: 'bg-warn-bg text-warn',
  bad: 'bg-bad-bg text-bad',
} as const;
export type Tone = keyof typeof tone;

const gold =
  'border-[#b6832b] bg-[linear-gradient(178deg,#ecd093_0%,#d3a245_55%,#b6832b_100%)] text-[var(--navy-900)]';

export const dk = {
  wrap: 'mx-auto max-w-[980px] p-4 min-[700px]:p-6',
  wrapWide: 'max-w-[1040px]',
  toast:
    'fixed inset-x-3 bottom-3 z-20 rounded-[10px] bg-[var(--navy-900)] px-4 py-3.5 text-white shadow-[0_6px_24px_rgb(0_0_0/25%)] min-[700px]:left-auto min-[700px]:max-w-[460px]',
  toastBad: 'bg-bad',
  pill: cn(
    'inline-block whitespace-nowrap rounded-full border border-current px-3 py-1 text-sm font-semibold',
    tone.warn,
  ),
  muted: 'mb-3 text-[15px] text-ink-3',
  sub: 'text-[13px] text-ink-3',
  btn: 'min-h-11 cursor-pointer rounded-[10px] border border-ink-3 bg-surface px-[18px] py-2.5 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50',
  gold,
  danger: 'border-bad bg-bad text-white',
  small: 'px-3.5 py-2 text-[15px]',
  row: 'flex flex-wrap items-center gap-2.5',
  end: 'items-end',
  grow: 'flex-[1_1_130px]',
  growWide: 'flex-[2_1_200px]',
  grid: 'grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5',
  kpi: 'rounded-[10px] border border-rule bg-paper px-3.5 py-3',
  kpiN: 'text-[28px] font-semibold leading-[1.1]',
  kpiL: 'mt-1 text-sm text-ink-3',
  banner: 'mb-4 rounded-[10px] px-3.5 py-3',
  list: 'm-0 list-none p-0 [&>li]:flex [&>li]:flex-wrap [&>li]:items-center [&>li]:gap-x-3 [&>li]:gap-y-2 [&>li]:border-t [&>li]:border-rule [&>li]:py-3 [&>li:first-child]:border-t-0',
  when: 'min-w-16 font-bold',
  what: 'min-w-0 flex-[1_1_220px] [&_small]:block [&_small]:text-sm [&_small]:text-ink-3 [&_small]:[overflow-wrap:anywhere]',
  audit: 'font-mono text-sm [overflow-wrap:anywhere]',
  chip: 'inline-block rounded-full bg-paper-2 px-2.5 py-0.5 text-sm font-semibold text-ink-2',
  post: 'my-2.5 rounded-[10px] border border-rule bg-surface [&>summary]:flex [&>summary]:min-h-12 [&>summary]:cursor-pointer [&>summary]:list-none [&>summary]:flex-wrap [&>summary]:items-center [&>summary]:gap-x-3 [&>summary]:gap-y-2 [&>summary]:p-3 [&>summary::-webkit-details-marker]:hidden [&[open]>summary]:border-b [&[open]>summary]:border-rule [&[open]>summary]:bg-paper',
  postBody: 'p-3',
  text: 'mb-3 mt-1.5 whitespace-pre-wrap rounded-lg border border-rule bg-paper p-3 [overflow-wrap:anywhere]',
  meta: 'my-1.5 text-[15px] text-ink-2 [overflow-wrap:anywhere] [&_a]:text-[var(--blue)] [&_b]:text-ink',
  controls:
    'flex flex-wrap items-center gap-4 border-t border-rule pt-2 [&_label]:m-0 [&_label]:flex [&_label]:min-h-11 [&_label]:items-center [&_label]:gap-2.5',
  approve: 'mt-[18px] rounded-xl border-2 border-gold bg-paper p-4',
  scroll: 'overflow-x-auto',
  num: 'text-right tabular-nums',
  word: 'inline-block min-w-16 rounded-full bg-paper-2 px-2.5 py-0.5 text-center text-sm font-bold text-ink-2',
  calls:
    'm-0 list-none p-0 [&>li]:flex [&>li]:items-start [&>li]:gap-3 [&>li]:border-t [&>li]:border-rule [&>li]:py-2.5 [&>li:first-child]:border-t-0 [&_li>div]:grid [&_li>div]:gap-0.5 [&_li>div>span]:text-[15px] [&_li>div>span]:text-ink-3',
  anchors: 'grid gap-3.5 min-[700px]:grid-cols-2',
  formGrid:
    'mb-4 grid gap-x-3 gap-y-1 min-[700px]:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] min-[700px]:items-end',
  msg: 'min-h-[1.4em] font-semibold',
  okk: 'text-ok',
  err: 'text-bad',
};

// Older dashboard pieces.
export const bars = {
  list: 'm-0 list-none p-0',
  row: 'grid grid-cols-[minmax(90px,38%)_1fr_auto] items-center gap-2.5 py-[5px] text-sm',
  funnelRow: 'grid-cols-[minmax(120px,34%)_1fr_auto]',
  k: 'truncate',
  track: 'h-2 overflow-hidden rounded bg-paper-2',
  fill: 'block h-full rounded bg-[var(--chart-1)]',
  funnelFill: 'bg-[var(--chart-2)]',
  v: 'min-w-[3ch] text-right tabular-nums text-ink-2',
  pct: 'ml-1.5 text-xs text-ink-3',
  empty: 'py-1.5 text-sm text-ink-3',
};

export const legacyTable =
  'w-full border-collapse text-sm [&_td]:border-b [&_td]:border-rule [&_td]:px-1.5 [&_td]:py-2 [&_td]:text-left [&_td]:align-top [&_td]:tabular-nums [&_th]:border-b [&_th]:border-rule [&_th]:px-1.5 [&_th]:py-2 [&_th]:text-left [&_th]:align-top [&_th]:text-[13px] [&_th]:font-medium [&_th]:text-ink-3';

export const pill = cn(
  'inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold',
);
