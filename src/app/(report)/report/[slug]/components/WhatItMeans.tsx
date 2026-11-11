import { CheckCircle2, ClipboardList, FileWarning, MessageCircleQuestion } from 'lucide-react';
import { Decor } from '@/components/illustrations/Decor';
import { LandPlotArt } from '@/components/illustrations/LandPlotArt';
import type { PropertyReport } from '@/types/propertyReport';

/** The answer first, in plain words: what was found and what to do, before the detail below. */
export function WhatItMeans({ report }: { report: PropertyReport }) {
  const differences = report.discrepancies.length;
  const allQuestions = report.checklist.items.length + report.checklist.more;
  const facts = [
    {
      icon: FileWarning,
      text: `${differences} important ${differences === 1 ? 'difference' : 'differences'} between what is promised and what the official records show`,
    },
    {
      icon: MessageCircleQuestion,
      text: `${allQuestions} questions to ask the seller before you pay, starting with the ${report.questions.length} that matter most`,
    },
    {
      icon: ClipboardList,
      text: `${report.sources.length} official sources checked`,
    },
  ];
  const steps = [
    'Read the differences in Part 1.',
    'Ask the seller the questions in Part 2 and get the answers in writing.',
    'Check the answers against the official records before you pay anything.',
  ];
  return (
    <section
      aria-labelledby="meaning-title"
      className="mx-auto max-w-[1900px] px-4 pt-8 md:px-8 xl:px-12"
    >
      <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50 p-5 md:p-6">
        <Decor className="-bottom-8 -end-8 hidden w-44 lg:block">
          <LandPlotArt className="w-full text-blue-600/15" />
        </Decor>
        <h2 id="meaning-title" className="text-2xl font-bold text-slate-900">
          What this means for you
        </h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <ul className="space-y-3">
            {facts.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-lg text-slate-900">
                <Icon className="mt-1 size-5 shrink-0 text-blue-700" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          <div>
            <h3 className="text-lg font-bold text-slate-900">What to do next</h3>
            <ol className="mt-2 space-y-2">
              {steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-lg text-slate-800">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-700 text-base font-bold text-white dark:bg-amber-400 dark:text-slate-950">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="mt-3 flex items-start gap-2 text-base text-slate-700">
              <CheckCircle2
                className="mt-0.5 size-5 shrink-0 text-emerald-700"
                aria-hidden="true"
              />
              This report shows what the records say. It does not tell you whether to buy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
