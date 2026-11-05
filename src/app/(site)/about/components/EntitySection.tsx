import { Building2, Mail } from 'lucide-react';
import { Placeholder } from '@/components/ui/Placeholder';
import { BUSINESS } from '@/constants/business';

const LABEL = 'text-[0.5625rem] font-semibold uppercase tracking-wider text-slate-500';

export function EntitySection() {
  return (
    <section
      aria-labelledby="entity"
      className="rounded-lg border border-slate-200 bg-white p-5 md:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Building2 className="mt-0.5 size-4 text-slate-700" aria-hidden="true" />
          <div>
            <h2 id="entity" className="text-base font-bold text-slate-900">
              Who We Are &amp; Legal Entity Disclosure
            </h2>
            <p className="text-[0.6875rem] text-slate-500">
              ShelterKart is operated in strict compliance with consumer information transparency
              mandates.
            </p>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-slate-600">
          <span className="size-1.5 rounded-full bg-blue-600" aria-hidden="true" />
          Verified Statutory Registry Entity
        </p>
      </div>

      <dl className="mt-6 grid gap-x-8 gap-y-6 text-xs text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <dt className={LABEL}>Registered corporate entity</dt>
          <dd className="mt-1.5 text-sm font-semibold text-slate-900">
            <Placeholder field="legalName" />
          </dd>
          <dd className="mt-1 text-slate-500">Autonomous Public Evidentiary Company</dd>
        </div>
        <div>
          <dt className={LABEL}>Registered address</dt>
          <dd className="mt-1.5 leading-relaxed">
            <Placeholder field="registeredAddress" />
          </dd>
        </div>
        <div>
          <dt className={LABEL}>Statutory operating model</dt>
          <dd className="mt-1.5 text-sm font-semibold text-slate-900">Pure Information Service</dd>
          <dd className="mt-1 text-slate-500">Consumer Protection Act, 2019 compliant</dd>
        </div>
        <div>
          <dt className={LABEL}>Grievance &amp; compliance officer</dt>
          <dd className="mt-1.5 text-sm font-semibold text-slate-900">
            <Placeholder field="grievanceOfficerName" />
          </dd>
          <dd className="mt-1 flex items-center gap-1.5 text-blue-700">
            <Mail className="size-3" aria-hidden="true" />
            <Placeholder field="grievanceOfficerEmail" />
            <span className="text-slate-500">
              (reply within {BUSINESS.replyWithinBusinessDays} business days)
            </span>
          </dd>
        </div>
        <div>
          <dt className={LABEL}>Direct verification desk</dt>
          <dd className="mt-1.5">
            <Placeholder field="phone" />
          </dd>
          <dd className="mt-1 text-blue-700">
            <Placeholder field="supportEmail" />
          </dd>
        </div>
        <div>
          <dt className={LABEL}>Corrections</dt>
          <dd className="mt-1.5 text-blue-700">{BUSINESS.correctionsEmail}</dd>
        </div>
      </dl>

      <p className="mt-6 rounded-md border border-blue-100 bg-blue-50 p-3 text-[0.6875rem] leading-relaxed text-slate-600">
        <strong className="font-semibold uppercase tracking-wide text-slate-700">
          Mandatory statutory declaration:
        </strong>{' '}
        ShelterKart acts purely as an unredacted public archival research and intelligence compiler.
        ShelterKart is not a licensed real estate broker, conveyancer, promoter, or financial
        advisor under RERA 2016 or FCA frameworks. We do not intermediate real property
        transactions, execute deeds, or receive commissions from developers.
      </p>
    </section>
  );
}
