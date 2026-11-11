import type { WireBlock } from '@/types/reportWireframe';
import { cn } from '@/utils/cn';
import { WireField } from './WireField';

const COLUMNS: Record<WireBlock['columns'], string> = {
  1: 'grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'md:grid-cols-2 xl:grid-cols-3',
};

/** One part of the report page, drawn as the cards it will be, each holding the fields that fill it. */
export function WireSection({ block, index }: { block: WireBlock; index: number }) {
  const { repeat } = block;
  return (
    <section aria-labelledby={`wire-${block.id}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="grid size-9 place-items-center rounded-full bg-slate-900 text-base font-bold text-white dark:bg-amber-400 dark:text-slate-950">
          {index + 1}
        </span>
        <h2 id={`wire-${block.id}`} className="text-xl font-bold text-slate-900">
          {block.title}
        </h2>
        {repeat && (
          <span className="rounded-full bg-blue-50 px-3 py-0.5 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-200">
            List · shown {repeat.show} here · up to {repeat.max}
          </span>
        )}
      </div>
      <p className="mt-1 text-base text-slate-700">{block.where}</p>

      <div className={cn('mt-4 grid gap-4', COLUMNS[block.columns])}>
        {Array.from({ length: repeat?.show ?? 1 }, (_, i) => (
          <div
            key={i}
            className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-4"
          >
            <p className="mb-3 font-mono text-sm font-bold text-slate-900">
              {repeat ? `${repeat.path}[${i}]` : 'response'}
            </p>
            <div
              className={cn(
                block.columns === 1 ? 'grid gap-x-8 gap-y-3 md:grid-cols-2' : 'space-y-3',
              )}
            >
              {block.fields.map((f) => (
                <WireField key={f.path} field={f} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
