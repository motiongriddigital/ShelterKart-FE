import { AlertCircle, CheckCircle2, Info, type LucideIcon } from 'lucide-react';
import type { ResearchQuestion } from '@/types/customResearch';
import { PrintButton } from '../components/PrintButton';
import { SectionHeading } from '../components/SectionHeading';

type Row = { label: string; icon: LucideIcon; tone: string; read: (q: ResearchQuestion) => string };

// Each question is answered the same three ways, so the card reads the same every time.
const ROWS: Row[] = [
  { label: 'Why it matters', icon: Info, tone: 'text-slate-900', read: (q) => q.whyItMatters },
  {
    label: 'A good answer',
    icon: CheckCircle2,
    tone: 'text-emerald-700',
    read: (q) => q.goodAnswer,
  },
  {
    label: 'Be careful if they say',
    icon: AlertCircle,
    tone: 'text-rose-700',
    read: (q) => q.redFlag,
  },
];

/** The questions to put to the seller, the ones to ask first at the top. */
export function CustomQuestions({ questions }: { questions: ResearchQuestion[] }) {
  const ordered = [...questions].sort(
    (a, b) => Number(b.priority === 'top') - Number(a.priority === 'top'),
  );
  return (
    <section
      id="questions"
      className="mx-auto max-w-[1900px] scroll-mt-36 px-4 pt-14 md:px-8 xl:px-12"
    >
      <SectionHeading
        eyebrow="Part 3 · Questions to ask"
        title={`Start here: ${questions.length} questions to ask the seller`}
        sub="Take this list to your meeting. Get the answers in writing before you pay anything."
        aside={<PrintButton label="Print this list" />}
      />
      <ol className="grid gap-5 lg:grid-cols-2">
        {ordered.map((q, i) => (
          <li key={q.question} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-3 text-base font-bold text-slate-700">
                <span className="grid size-9 place-items-center rounded-full bg-slate-900 text-lg text-white dark:bg-amber-400 dark:text-slate-950">
                  {i + 1}
                </span>
                {q.category}
              </p>
              {q.priority === 'top' && (
                <span className="rounded-full bg-amber-50 px-3 py-0.5 text-base font-semibold text-amber-800 ring-1 ring-inset ring-amber-200">
                  Ask this first
                </span>
              )}
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
