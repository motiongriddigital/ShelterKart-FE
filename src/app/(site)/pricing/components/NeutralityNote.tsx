import { Scale } from 'lucide-react';
import { NEUTRALITY } from '@/constants/pricing';

export function NeutralityNote() {
  return (
    <aside className="flex items-start gap-4 rounded-lg border border-blue-100 bg-blue-50 p-5">
      <Scale className="mt-0.5 size-5 shrink-0 text-blue-700" aria-hidden="true" />
      <div>
        <h2 className="text-sm font-bold text-slate-900">{NEUTRALITY.title}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-800">{NEUTRALITY.lead}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-600 md:text-sm">
          {NEUTRALITY.text}
        </p>
      </div>
    </aside>
  );
}
