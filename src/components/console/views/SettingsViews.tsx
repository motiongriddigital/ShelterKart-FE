'use client';
import { Check, Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';
import { useAdminTheme, type ThemeMode } from '@/store/adminTheme';
import { cn } from '@/utils/cn';
import { PageHeader } from '../PageHeader';
import { Panel } from '../kit/Panel';

const OPTIONS: {
  id: ThemeMode;
  label: string;
  note: string;
  icon: LucideIcon;
  bg: string;
  fg: string;
  card: string;
}[] = [
  {
    id: 'light',
    label: 'Light',
    note: 'Off-white ground and white cards.',
    icon: Sun,
    bg: '#f7f7f4',
    fg: '#2a2c30',
    card: '#ffffff',
  },
  {
    id: 'dark',
    label: 'Dark',
    note: 'Dark ground, easier at night.',
    icon: Moon,
    bg: '#1d1f24',
    fg: '#eceef2',
    card: '#272a31',
  },
  {
    id: 'system',
    label: 'System',
    note: 'Follows the device setting.',
    icon: Monitor,
    bg: 'linear-gradient(90deg,#f7f7f4 50%,#1d1f24 50%)',
    fg: '#7a7f89',
    card: '#ffffff',
  },
];

export function AppearanceView() {
  const mode = useAdminTheme((s) => s.mode);
  const setMode = useAdminTheme((s) => s.setMode);
  return (
    <div>
      <PageHeader title="Appearance" icon={Sun} />
      <div className="mx-auto max-w-3xl space-y-4 p-6">
        <Panel title="Theme" sub="Saved in this browser only. The public site is not affected.">
          <div role="radiogroup" aria-label="Theme" className="grid gap-3 sm:grid-cols-3">
            {OPTIONS.map((o) => {
              const on = mode === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setMode(o.id)}
                  className={cn(
                    'pressable rounded-xl border p-3 text-left transition-colors duration-150',
                    on ? 'border-ring bg-accent' : 'border-border hover:bg-accent/60',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="block h-20 rounded-lg border border-black/10 p-2"
                    style={{ background: o.bg }}
                  >
                    <span
                      className="block h-3 w-10 rounded"
                      style={{ background: o.fg, opacity: 0.8 }}
                    />
                    <span
                      className="mt-2 block h-7 rounded"
                      style={{ background: o.card, opacity: 0.95 }}
                    />
                  </span>
                  <span className="mt-3 flex items-center gap-2 text-sm font-medium">
                    <o.icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
                    {o.label}
                    {on && <Check className="ml-auto size-4 text-status-up-text" strokeWidth={2} />}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{o.note}</span>
                </button>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}
