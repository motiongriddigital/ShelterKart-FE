import { ASSURANCES } from '@/constants/about';
import { Eyebrow } from './Eyebrow';

export function AssuranceSection() {
  return (
    <section aria-label="Assurances">
      <ul className="grid gap-4 md:grid-cols-3">
        {ASSURANCES.map(({ eyebrow, title, text, stat, icon: Icon }) => (
          <li key={title} className="flex flex-col rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Icon className="size-4 text-blue-700" aria-hidden="true" />
            </div>
            <h3 className="mt-2 text-[0.9375rem] font-bold text-slate-900">{title}</h3>
            <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">{text}</p>
            <p className="mt-4 flex items-center justify-between gap-2 rounded-md bg-blue-50 px-3 py-2 text-[0.6875rem]">
              <span className="text-slate-500">{stat.label}</span>
              <strong className="text-slate-900">{stat.value}</strong>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
