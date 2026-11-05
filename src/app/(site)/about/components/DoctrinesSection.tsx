import { DOCTRINES } from '@/constants/about';
import { Eyebrow } from './Eyebrow';

export function DoctrinesSection() {
  return (
    <section aria-labelledby="doctrines">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Guiding axioms</Eyebrow>
          <h2 id="doctrines" className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            The Four Operational Doctrines
          </h2>
        </div>
        <p className="max-w-sm text-[0.6875rem] text-slate-500 md:text-end">
          How ShelterKart conducts every investigation, processes conflict claims, and enforces
          immutable buyer protections.
        </p>
      </div>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DOCTRINES.map(({ code, title, text, tag, icon: Icon }) => (
          <li key={code} className="flex flex-col rounded-lg border border-slate-200 bg-white p-4">
            <span className="grid size-8 place-items-center rounded-md bg-slate-100 text-slate-700">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <p className="mt-4 text-[0.625rem] font-semibold uppercase tracking-wider text-blue-700">
              {code}
            </p>
            <h3 className="mt-1 text-[0.9375rem] font-bold text-slate-900">{title}</h3>
            <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">{text}</p>
            <p className="mt-4 text-[0.625rem] font-semibold uppercase tracking-wider text-blue-700">
              {tag}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
