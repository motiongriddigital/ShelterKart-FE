'use client';
import { cn } from '@/utils/cn';
import { Button } from '@/components/console/ui/button';

export type SegTab<T extends string> = { id: T; label: string; count?: number };

export function SegTabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: SegTab<T>[];
  value: T;
  onChange: (id: T) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex rounded-md bg-muted p-0.5">
      {tabs.map((t) => (
        <Button
          variant="plain"
          key={t.id}
          role="tab"
          type="button"
          aria-selected={value === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'pressable rounded-[5px] px-2.5 py-1 text-ui font-medium transition-colors duration-150',
            value === t.id
              ? 'bg-card text-foreground shadow-card'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t.label}
          {t.count != null && t.count > 0 && (
            <span className="tabular ml-1.5 text-xs text-status-warn-text">{t.count}</span>
          )}
        </Button>
      ))}
    </div>
  );
}
