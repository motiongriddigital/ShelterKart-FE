'use client';
import { adminItemBySlug } from '@/constants/adminNav';
import { PageHeader } from './PageHeader';

export function PlannedSection({ slug, view }: { slug: string; view?: string }) {
  const item = adminItemBySlug(slug);
  if (!item) return null;
  return (
    <div>
      <PageHeader title={view ?? item.label} icon={item.icon} />
      <div className="mx-auto max-w-3xl p-6">
        <div className="card-surface p-6">
          <span className="rounded-full bg-status-warn-soft px-2 py-0.5 text-xs font-medium text-status-warn-text">
            Planned
          </span>
          <p className="mt-3 text-sm">{item.blurb}</p>
          {item.will.length > 0 && (
            <>
              <p className="label-quiet mt-5">This screen will show</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {item.will.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </>
          )}
          <p className="label-quiet mt-5">Backend</p>
          <p className="mt-1 text-sm text-muted-foreground">{item.backend}</p>
        </div>
      </div>
    </div>
  );
}
