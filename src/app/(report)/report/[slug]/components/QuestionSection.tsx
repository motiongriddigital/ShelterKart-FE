import { AlertCircle, CheckCircle2, Info, type LucideIcon } from 'lucide-react';
import type { PropertyReport, Question } from '@/types/propertyReport';
import { PrintButton } from './PrintButton';
import { DocumentSealArt } from '@/components/illustrations/DocumentSealArt';
import { SectionHeading } from './SectionHeading';

type Row = { label: string; icon: LucideIcon; tone: string; read: (q: Question) => string };

// Each question is answered the same three ways, so the card reads the same every time.
const ROWS: Row[] = [
  { label: 'Why it matters', icon: Info, tone: 'text-slate-900', read: (q) => q.why },
  { label: 'A good answer', icon: CheckCircle2, tone: 'text-emerald-700', read: (q) => q.good },
  {
    label: 'Be careful if they say',
    icon: AlertCircle,
    tone: 'text-rose-700',
    read: (q) => q.notClose,
  },
];

export function QuestionSection({ report }: { report: PropertyReport }) {
  return (
    <section
      id="questions"
      className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12"
    >
      <SectionHeading
        art={<DocumentSealArt className="w-full text-blue-600/20" />}
        eyebrow="Part 2 · Questions to ask"
        title={`Start here: ${report.questions.length} questions to ask the seller`}
        sub="Take this list to your meeting. Each question says why it matters and what a good answer sounds like. Get the answers in writing before you pay anything."
        aside={<PrintButton label="Print this list" />}
      />
      <ol className="grid gap-5 lg:grid-cols-2">
        {report.questions.map((q, i) => (
          <li key={q.question} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-3 text-base font-bold text-slate-700">
                <span className="grid size-9 place-items-center rounded-full bg-slate-900 text-lg text-white dark:bg-amber-400 dark:text-slate-950">
                  {i + 1}
                </span>
                {q.category}
              </p>
              <label className="flex items-center gap-2 text-base text-slate-700">
                <input type="checkbox" className="size-5 accent-blue-700" />
                Answered
              </label>
            </div>
            <h3 className="mt-4 text-xl font-bold leading-snug text-slate-900">{q.question}</h3>
            <dl className="mt-4 space-y-3 text-base leading-relaxed text-slate-800">
              {ROWS.map(({ label, icon: Icon, tone, read }) => (
                <div key={label} className="flex gap-3">
                  <Icon className={`mt-0.5 size-5 shrink-0 ${tone}`} aria-hidden="true" />
                  <div>
                    <dt className={`font-bold ${tone}`}>{label}</dt>
                    <dd>{read(q)}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
