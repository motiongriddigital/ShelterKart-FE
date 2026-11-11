import type { WireField as Field } from '@/types/reportWireframe';
import { cn } from '@/utils/cn';

// Bar width stands in for how much text the design has room for.
function barWidth(f: Field) {
  if (f.kind === 'number') return 'w-12';
  if (f.kind === 'boolean') return 'w-8';
  const limit = f.limit ?? 0;
  if (limit <= 30) return 'w-1/4';
  if (limit <= 60) return 'w-2/5';
  if (limit <= 100) return 'w-3/5';
  return 'w-4/5';
}

const KIND_LABEL: Record<Field['kind'], string> = {
  text: 'text',
  number: 'number',
  boolean: 'true / false',
  enum: 'one of',
};

/** One value in the response: its name, its type, and a grey bar showing how much room it gets. */
export function WireField({ field }: { field: Field }) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <code className="text-sm font-semibold text-blue-700">{field.path}</code>
        <span className="text-sm text-slate-700">
          {KIND_LABEL[field.kind]}
          {field.limit ? ` · up to ${field.limit} characters` : ''}
        </span>
      </div>
      {field.kind === 'enum' ? (
        <p className="mt-1 flex flex-wrap gap-1.5">
          {field.options?.map((o) => (
            <span
              key={o}
              className="rounded-full border border-slate-300 px-2.5 py-0.5 text-sm text-slate-700"
            >
              {o}
            </span>
          ))}
        </p>
      ) : (
        <div
          aria-hidden="true"
          className={cn('mt-1.5 h-3 rounded-full bg-slate-300', barWidth(field))}
        />
      )}
    </div>
  );
}
