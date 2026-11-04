'use client';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';

export function PageHeader({
  title,
  icon: Icon,
  note,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  note?: string;
  children?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <SidebarTrigger
        aria-label="Show or hide the sidebar"
        className="-ml-1 text-muted-foreground"
      />
      <span className="h-4 w-px bg-border" aria-hidden="true" />
      {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />}
      <h1 className="truncate text-[15px] font-semibold tracking-tight">{title}</h1>
      {note && (
        <span className="tabular hidden truncate text-xs text-muted-foreground sm:inline">
          {note}
        </span>
      )}
      <span className="flex-1" />
      {children}
    </header>
  );
}
