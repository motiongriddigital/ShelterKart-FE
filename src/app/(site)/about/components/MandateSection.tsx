import { FileCheck2, ScrollText, ShieldCheck } from 'lucide-react';
import { ABOUT_MANDATE, HIERARCHY } from '@/constants/about';

export function MandateSection() {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-lg border border-slate-200 border-s-4 border-s-blue-700 bg-white p-5 md:p-7">
        <p className="flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-wider text-slate-500">
          <ShieldCheck className="size-3.5 text-blue-700" aria-hidden="true" />
          Evidentiary mandate &amp; operational truth
        </p>
        <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-slate-800 md:text-base">
          {ABOUT_MANDATE.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-6 rounded-md bg-slate-50 p-3 text-[0.6875rem] text-slate-500">
          <p className="flex items-center gap-1.5">
            <ScrollText className="size-3.5 text-blue-700" aria-hidden="true" />
            Published under Public Archival Record Doctrine · Mandate SK-DIR-01
          </p>
          <p className="mt-1">Non-Advisory · Non-Intermediated</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-lg bg-[#0a1c33] p-5 text-[#fff]">
          <div className="flex items-center justify-between text-[0.5625rem] font-semibold uppercase tracking-wider text-[#94a3b8]">
            <span>Independent pipeline</span>
            <span className="rounded-md bg-[#fff]/10 px-1.5 py-0.5 text-[#fff]">● Live feed</span>
          </div>
          <h2 className="mt-2 text-lg font-bold text-[#fff]">
            Statutory Cross-Verification Hierarchy
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[#94a3b8]">
            Autonomous ingestion of legal land title registers, RERA dockets, municipal sanction
            plans, and hypothecation logs.
          </p>
          <ul className="mt-4 space-y-2">
            {HIERARCHY.map((h) => (
              <li
                key={h.level}
                className="flex items-center justify-between gap-3 rounded-md border border-[#fff]/10 bg-[#fff]/5 px-3 py-2 text-xs"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-[#38bdf8]"
                    aria-hidden="true"
                  />
                  {h.level}
                </span>
                <span className="shrink-0 text-[#94a3b8]">{h.weight}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="flex items-center gap-1.5 text-[0.625rem] font-semibold uppercase tracking-wider text-blue-700">
            <FileCheck2 className="size-3.5" aria-hidden="true" />
            The neutrality compact
          </p>
          <blockquote className="mt-2 text-xs italic leading-relaxed text-slate-600">
            “We never take listing fees, promotional retainers, or affiliate payoffs. Our software
            is accountable solely to the homebuyer whose life savings are at stake.”
          </blockquote>
          <p className="mt-3 flex items-center gap-2 text-[0.6875rem] text-slate-600">
            <span className="grid size-7 place-items-center rounded-full bg-slate-900 text-[0.625rem] font-bold text-white dark:bg-amber-400 dark:text-slate-950">
              SK
            </span>
            <span className="leading-tight">
              <strong className="block text-slate-900">Office of the Registrar</strong>
              ShelterKart Oversight Board
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
