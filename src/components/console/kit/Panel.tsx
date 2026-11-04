import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export function Panel({
  title,
  sub,
  actions,
  children,
  className,
  flush,
}: {
  title?: string;
  sub?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  flush?: boolean;
}) {
  return (
    <section className={cn('card-surface min-w-0', className)}>
      {(title || actions) && (
        <header className="flex items-start gap-3 px-5 pt-4">
          <div className="min-w-0 flex-1">
            {title && <h2 className="text-[15px] font-semibold tracking-tight">{title}</h2>}
            {sub && <p className="mt-0.5 text-ui text-muted-foreground">{sub}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className={cn(flush ? 'pt-3' : 'px-5 pb-5 pt-3')}>{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: 'good' | 'warn' | 'bad';
}) {
  return (
    <div className="card-surface min-w-0 px-4 py-3.5">
      <p className="label-quiet">{label}</p>
      <p
        className={cn(
          'tabular mt-1 truncate text-2xl font-semibold tracking-tight',
          tone === 'bad' && 'text-status-down-text',
          tone === 'warn' && 'text-status-warn-text',
          tone === 'good' && 'text-status-up-text',
        )}
      >
        {value}
      </p>
      {sub && <p className="tabular mt-1 truncate text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

const TONES = {
  good: 'bg-status-up-soft text-status-up-text',
  warn: 'bg-status-warn-soft text-status-warn-text',
  bad: 'bg-status-down-soft text-status-down-text',
  mute: 'bg-status-unknown-soft text-status-unknown-text',
} as const;

export function Badge({
  tone = 'mute',
  children,
}: {
  tone?: keyof typeof TONES;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}

export const th = 'px-3 py-2 text-left text-xs font-medium text-muted-foreground';
export const td = 'px-3 py-2.5 align-top text-ui';
export const tableWrap = 'overflow-x-auto';
export const rowCls = 'border-t border-border transition-colors hover:bg-muted/50';

export const btn =
  'pressable inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-ui font-medium transition-colors duration-150 hover:bg-accent disabled:opacity-50';
export const btnDanger =
  'pressable inline-flex h-8 items-center gap-1.5 rounded-md border border-status-down/40 bg-card px-3 text-ui font-medium text-status-down-text transition-colors duration-150 hover:bg-status-down-soft disabled:opacity-50';
export const input =
  'h-8 w-full rounded-md border border-border bg-card px-2.5 text-ui outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30';

export const when = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'never';
export const ago = (iso: string) => {
  const m = Math.max(
    0,
    Math.round((Date.UTC(2026, 10, 4, 12, 0, 0) - new Date(iso).getTime()) / 60000),
  );
  if (m < 60) return `${m} min ago`;
  if (m < 1440) return `${Math.round(m / 60)} h ago`;
  return `${Math.round(m / 1440)} d ago`;
};
