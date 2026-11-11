import type { PropertyReport } from '@/types/propertyReport';
import { SectionHeading } from './SectionHeading';

export function QuestionSection({ report }: { report: PropertyReport }) {
  return (
    <section className="mx-auto max-w-[1900px] px-4 pt-12 md:px-8 xl:px-12">
      <SectionHeading
        eyebrow="Part 2 · Questions to ask"
        title={`Start here: ${report.questions.length} questions to ask the seller`}
        sub="Take this list to your meeting. Each question says why it matters and what a good answer sounds like. Get the answers in writing before you pay anything."
      />
      <ol className="grid gap-4 md:grid-cols-2">
        {report.questions.map((q, i) => (
          <li key={q.question} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <span className="grid size-5 place-items-center rounded-md bg-slate-900 text-sm text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {q.category}
              </p>
              <label className="flex items-center gap-1.5 text-sm text-slate-600">
                <input type="checkbox" className="size-3.5 accent-blue-700" />
                Document Verified
              </label>
            </div>
            <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900">
              {q.question}
            </h3>
            <dl className="mt-3 space-y-1.5 text-sm leading-relaxed text-slate-700">
              <div>
                <dt className="inline font-bold text-slate-900">Why it matters: </dt>
                <dd className="inline">{q.why}</dd>
              </div>
              <div>
                <dt className="inline font-bold text-emerald-700">A good answer: </dt>
                <dd className="inline">{q.good}</dd>
              </div>
              <div>
                <dt className="inline font-bold text-rose-700">Does NOT close it: </dt>
                <dd className="inline text-rose-700">{q.notClose}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
