import { WIRE_BLOCKS } from '@/constants/reportWireframe';
import { buildExample } from '@/utils/reportWireframe';
import { CopyButton } from './CopyButton';

/** The same structure as JSON: what the backend sends for one report. */
export function ResponseShape() {
  const json = JSON.stringify(buildExample(WIRE_BLOCKS), null, 2);
  return (
    <section aria-labelledby="wire-response" className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="wire-response" className="text-xl font-bold text-slate-900">
            What the backend sends
          </h2>
          <p className="mt-1 text-base text-slate-700">
            One JSON object per report. Lists show one item here; send up to the limit above.
          </p>
        </div>
        <CopyButton text={json} />
      </div>
      <pre className="mt-4 max-h-[32rem] overflow-auto rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-800">
        <code>{json}</code>
      </pre>
    </section>
  );
}
