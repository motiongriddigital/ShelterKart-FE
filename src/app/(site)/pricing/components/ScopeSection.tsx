import { CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SCOPE_CARDS } from '@/constants/pricing';

export function ScopeSection() {
  return (
    <section aria-labelledby="scope">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <SectionHeading id="scope" title="Core Value & Inspection Scope" />
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-slate-500">
          Dual-tier verification system
        </p>
      </div>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {SCOPE_CARDS.map((c) => (
          <li
            key={c.title}
            className={`flex flex-col rounded-lg border bg-white p-5 ${
              c.featured ? 'border-blue-600 shadow-md ring-1 ring-blue-600/25' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-blue-700">
                {c.eyebrow}
              </p>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.625rem] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                {c.badge}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-slate-900">{c.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-500 md:text-sm">{c.text}</p>
            <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 size-3.5 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
