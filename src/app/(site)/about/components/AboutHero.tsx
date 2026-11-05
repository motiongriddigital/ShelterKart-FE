import { ShieldCheck } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-slate-500">
          <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-semibold uppercase tracking-wide">
            Statutory disclosure &amp; corporate mission
          </span>
          <span>Gazette Code: SK-ABT-2026</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-blue-600" aria-hidden="true" />
            Version 4.9.1 Audited
          </span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          About ShelterKart
        </h1>
        <p className="mt-1 text-lg font-medium text-blue-700 md:text-xl">
          The public record, before you commit.
        </p>
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 pe-5 shadow-sm">
        <span className="grid size-10 place-items-center rounded-md bg-slate-900 text-white">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="text-[0.5625rem] font-semibold uppercase tracking-wider text-slate-500">
            Institutional status
          </p>
          <p className="mt-0.5 text-sm font-bold text-slate-900">100% Buyer-Funded</p>
          <p className="text-[0.6875rem] text-slate-500">Zero Developer Sponsorship</p>
        </div>
      </div>
    </section>
  );
}
