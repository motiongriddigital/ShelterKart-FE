'use client';
import { useCallback } from 'react';
import { useT } from '@/hooks/useT';
import { useReportStore } from '@/store/report';
import { dossierById } from '@/utils/dossiers';

export const DEMO_STEP_MS = 700;
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** The demo journey for a reference report: investigation stages, free preview, then the full report. */
export function useDossierFlow() {
  const t = useT();
  const setView = useReportStore((s) => s.setView);

  const steps = [
    t('Several AI engines are investigating the project independently'),
    t('Following every lead: the seller, its people, cases, complaints and finances'),
    t('Checking the numbers and where sources disagree'),
    t('Writing the questions for each team at the developer'),
  ];

  const investigate = useCallback(
    async (id: string) => {
      if (!dossierById(id)) return;
      setView({ kind: 'investigating', id });
      await wait(DEMO_STEP_MS * 1.5 * 4 + DEMO_STEP_MS / 2);
      setView({ kind: 'preview', id });
    },
    [setView],
  );

  const showFull = useCallback(
    (id: string) => dossierById(id) && setView({ kind: 'full', id }),
    [setView],
  );

  return { steps, investigate, showFull };
}
