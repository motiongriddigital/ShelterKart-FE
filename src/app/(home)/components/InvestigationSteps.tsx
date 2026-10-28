'use client';
import { DEMO_STEP_MS } from '@/hooks/useDossierFlow';
import { useStepProgress } from '@/hooks/useStepProgress';

export function InvestigationSteps({ title, steps }: { title: string; steps: string[] }) {
  const current = useStepProgress(steps.length, DEMO_STEP_MS * 1.5);
  return (
    <>
      <p className="lb-small">{title}</p>
      <ol className="sk-steps">
        {steps.map((s, i) => (
          <li key={s} className={i < current ? 'done' : i === current ? 'running' : undefined}>
            {s}
          </li>
        ))}
      </ol>
    </>
  );
}
