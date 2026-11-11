'use client';
import { DEMO_STEP_MS } from '@/hooks/useDossierFlow';
import { useStepProgress } from '@/hooks/useStepProgress';

export function InvestigationSteps({ title, steps }: { title: string; steps: string[] }) {
  const current = useStepProgress(steps.length, DEMO_STEP_MS * 1.5);
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <ol className="mt-3 grid gap-2">
        {steps.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'running' : 'waiting';
          return (
            <li
              key={s}
              data-state={state}
              className="group flex items-center gap-2.5 text-base text-slate-600 data-[state=done]:text-emerald-700 data-[state=running]:font-semibold data-[state=running]:text-blue-700"
            >
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-current group-data-[state=running]:animate-pulse"
              />
              {s}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
