'use client';
import Link from 'next/link';
import type { ComponentType } from 'react';
import { DoodleProps } from '@/components/illustrations/doodles/DoodleSvg';
import { LostHouseDoodle } from '@/components/illustrations/doodles/LostHouseDoodle';
import { MissingReportDoodle } from '@/components/illustrations/doodles/MissingReportDoodle';
import { UnpluggedDoodle } from '@/components/illustrations/doodles/UnpluggedDoodle';
import { Button, buttonVariants } from '@/components/ui/Button';
import { EMPTY_STATES, type EmptyKind } from '@/constants/emptyStates';
import { useT } from '@/hooks/useT';

const DOODLES: Record<EmptyKind, ComponentType<DoodleProps>> = {
  notFound: LostHouseDoodle,
  missingReport: MissingReportDoodle,
  error: UnpluggedDoodle,
};

type Props = { kind: EmptyKind; onAction?: () => void };

/**
 * A page with nothing to show: one small drawing, a heading, a sentence, and the one thing to do next. The action is
 * a link when the state has an address, otherwise a button that calls `onAction` (for example "Try again").
 */
export function EmptyState({ kind, onAction }: Props) {
  const t = useT();
  const { title, text, label, action } = EMPTY_STATES[kind];
  const Doodle = DOODLES[kind];
  const href = 'href' in action ? action.href : undefined;
  return (
    <section className="mx-auto max-w-xl px-4 py-16 text-center md:py-24">
      <Doodle label={t(label)} className="mx-auto w-56 md:w-72" />
      <h1 className="mt-6 text-3xl font-semibold text-slate-900">{t(title)}</h1>
      <p className="mt-3 text-lg text-slate-700">{t(text)}</p>
      {href ? (
        <Link href={href} className={`${buttonVariants({ variant: 'gold', size: 'lg' })} mt-8`}>
          {t(action.label)}
        </Link>
      ) : (
        <Button variant="gold" size="lg" onClick={onAction} className="mt-8">
          {t(action.label)}
        </Button>
      )}
    </section>
  );
}
