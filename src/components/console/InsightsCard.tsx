'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bot,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  DatabaseBackup,
  Hourglass,
  Lightbulb,
  ShoppingCart,
  TrendingUp,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';
import {
  SEED_INSIGHTS,
  type Insight,
  type InsightIcon,
  type InsightTone,
} from '@/constants/adminInsights';
import { cn } from '@/utils/cn';

const ROTATE_MS = 6000;
const ROTATE_HELD_MS = 15000;

const TONE: Record<
  InsightTone,
  { label: string; icon: LucideIcon; card: string; tile: string; text: string; dot: string }
> = {
  critical: {
    label: 'Needs you now',
    icon: CircleAlert,
    card: 'border-status-down/35 bg-status-down-soft',
    tile: 'bg-status-down/20',
    text: 'text-status-down-text',
    dot: 'bg-status-down',
  },
  warning: {
    label: 'Worth a look',
    icon: TriangleAlert,
    card: 'border-status-warn/40 bg-status-warn-soft',
    tile: 'bg-status-warn/25',
    text: 'text-status-warn-text',
    dot: 'bg-status-warn',
  },
  good: {
    label: 'All clear',
    icon: CircleCheck,
    card: 'border-status-up/35 bg-status-up-soft',
    tile: 'bg-status-up/20',
    text: 'text-status-up-text',
    dot: 'bg-status-up',
  },
  info: {
    label: 'Good to know',
    icon: Lightbulb,
    card: 'border-sidebar-border bg-sidebar-accent/50',
    tile: 'bg-foreground/10',
    text: 'text-foreground',
    dot: 'bg-muted-foreground',
  },
};

const ICON: Record<InsightIcon, LucideIcon> = {
  disputes: CircleAlert,
  held: Hourglass,
  engine: Bot,
  checkout: ShoppingCart,
  traffic: TrendingUp,
  backup: DatabaseBackup,
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function InsightsCard({ insights = SEED_INSIGHTS }: { insights?: Insight[] }) {
  const reduced = usePrefersReducedMotion();
  const [held, setHeld] = useState(false);
  const [index, setIndex] = useState(0);
  const count = insights.length;
  const show = (i: number) => setIndex(((i % count) + count) % count);

  useEffect(() => {
    if (reduced || count < 2) return;
    const timer = setTimeout(
      () => {
        if (!document.hidden) setIndex((index + 1) % count);
      },
      held ? ROTATE_HELD_MS : ROTATE_MS,
    );
    return () => clearTimeout(timer);
  }, [reduced, count, held, index]);

  if (!count) return null;
  const tone = TONE[insights[index].tone];
  const many = count > 1;

  return (
    <section
      aria-label="Insights"
      aria-roledescription="carousel"
      className="relative mx-2 mb-2 h-[196px] shrink-0 overflow-hidden rounded-2xl"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div
        className="flex h-full motion-safe:transition-transform motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {insights.map((insight, i) => (
          <Slide
            key={insight.id}
            insight={insight}
            active={i === index}
            position={`${i + 1} of ${count}`}
            reserveControls={many}
          />
        ))}
      </div>

      {many && (
        <div className="absolute inset-x-3.5 bottom-3 flex items-center">
          <div className="flex items-center">
            {insights.map((insight, i) => (
              <button
                key={insight.id}
                type="button"
                onClick={() => show(i)}
                aria-label={`Show insight ${i + 1} of ${count}`}
                aria-current={i === index ? 'true' : undefined}
                className="flex h-5 w-3.5 items-center justify-center"
              >
                <span
                  className={cn(
                    'h-1.5 rounded-full motion-safe:transition-all motion-safe:duration-[420ms]',
                    i === index ? cn('w-3.5', tone.dot) : cn('w-1.5 opacity-35', tone.dot),
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => show(index + 1)}
            title="Next insight"
            className={cn(
              'pressable ml-auto flex items-center gap-0.5 rounded-full border bg-card py-1 pl-2.5 pr-1.5',
              'text-xs font-semibold text-foreground transition-colors duration-150 hover:bg-sidebar-accent',
              tone.card.split(' ')[0],
            )}
          >
            Next
            <ChevronRight className="size-3.5" strokeWidth={2} aria-hidden />
          </button>
        </div>
      )}
    </section>
  );
}

function Slide({
  insight,
  active,
  position,
  reserveControls,
}: {
  insight: Insight;
  active: boolean;
  position: string;
  reserveControls: boolean;
}) {
  const tone = TONE[insight.tone];
  const Icon = ICON[insight.icon] ?? tone.icon;
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={position}
      aria-hidden={!active}
      className="h-full w-full shrink-0 basis-full"
    >
      <div className={cn('flex h-full flex-col rounded-2xl border px-3.5 pb-3 pt-3', tone.card)}>
        <div className="flex items-center gap-2">
          <span className={cn('flex size-6 items-center justify-center rounded-md', tone.tile)}>
            <Icon className={cn('size-3.5', tone.text)} strokeWidth={2} aria-hidden />
          </span>
          <span className={cn('text-xs font-semibold', tone.text)}>{tone.label}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-tight text-foreground">
          {insight.title}
        </p>
        <div className="mt-1 min-h-0 flex-1">
          <p className="line-clamp-3 text-xs leading-snug text-foreground/70">{insight.body}</p>
        </div>
        {insight.action && insight.href && (
          <Link
            href={insight.href}
            tabIndex={active ? 0 : -1}
            className={cn(
              'mt-0.5 inline-flex w-fit max-w-full items-center gap-1 rounded-md py-0.5 text-xs font-semibold',
              'transition-colors duration-150 hover:underline',
              tone.text,
            )}
          >
            <span className="truncate">{insight.action}</span>
            <ArrowRight className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          </Link>
        )}
        {reserveControls && <div className="h-7 shrink-0" aria-hidden />}
      </div>
    </div>
  );
}
