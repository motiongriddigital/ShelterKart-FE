import { ShieldCheck } from 'lucide-react';
import { Placeholder } from '@/components/ui/Placeholder';

export function EntityNotice() {
  return (
    <aside className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600">
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-blue-700" aria-hidden="true" />
      <p className="leading-relaxed">
        <strong className="text-slate-900">
          Statutory Compliance &amp; Legal Entity Disclosure
        </strong>{' '}
        <span className="ms-1 rounded-md bg-blue-50 px-1.5 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-blue-700">
          Active registry
        </span>
        <br />
        <Placeholder field="legalName" /> · <Placeholder field="registeredAddress" /> · Grievance
        officer: <Placeholder field="grievanceOfficerName" />,{' '}
        <Placeholder field="grievanceOfficerEmail" /> | <Placeholder field="supportEmail" />
      </p>
    </aside>
  );
}
