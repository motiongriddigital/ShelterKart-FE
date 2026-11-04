'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { PanelConfig } from '@/constants/adminPanels';
import { cn } from '@/utils/cn';

export function SecondaryPanel({ base, panel }: { base: string; panel: PanelConfig }) {
  const pathname = usePathname();
  const [q, setQ] = useState('');
  const first = panel.groups[0]?.items[0]?.slug;
  const current = pathname.startsWith(`${base}/`)
    ? pathname.slice(base.length + 1).split('/')[0]
    : first;

  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return panel.groups;
    return panel.groups
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => `${i.label} ${i.meta ?? ''}`.toLowerCase().includes(t)),
      }))
      .filter((g) => g.items.length);
  }, [panel, q]);

  return (
    <nav
      aria-label={panel.title}
      className="flex shrink-0 flex-col border-b border-border bg-panel md:sticky md:top-0 md:h-svh md:w-60 md:border-b-0 md:border-r"
    >
      <div className="px-4 pb-2 pt-4">
        <h2 className="text-sm font-semibold tracking-tight">{panel.title}</h2>
        {panel.searchPlaceholder && (
          <div className="relative mt-3">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.75}
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={panel.searchPlaceholder}
              aria-label={panel.searchPlaceholder}
              className="h-8 w-full rounded-md border border-border bg-card pl-8 pr-2 text-ui outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>
        )}
      </div>
      <div className="flex gap-1 overflow-x-auto px-3 pb-3 md:block md:flex-1 md:overflow-y-auto md:overflow-x-hidden md:pb-4">
        {groups.map((g, gi) => (
          <div key={g.label ?? gi} className="flex gap-1 md:mb-3 md:block">
            {g.label && <p className="label-quiet hidden px-2 pb-1.5 pt-2 md:block">{g.label}</p>}
            <ul className="flex gap-1 md:block md:space-y-0.5">
              {g.items.map((i) => {
                const active = i.slug === current;
                return (
                  <li key={i.slug} className="shrink-0">
                    <Link
                      href={`${base}/${i.slug}`}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 text-sm transition-colors duration-150 md:whitespace-normal',
                        active
                          ? 'bg-accent font-medium text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{i.label}</span>
                        {i.meta && (
                          <span className="tabular block truncate text-xs font-normal text-label">
                            {i.meta}
                          </span>
                        )}
                      </span>
                      {i.flag === 'ban' && (
                        <span className="rounded-full bg-status-down-soft px-1.5 text-xs text-status-down-text">
                          banned
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {!groups.length && <p className="px-2 py-3 text-ui text-muted-foreground">No match.</p>}
      </div>
    </nav>
  );
}
