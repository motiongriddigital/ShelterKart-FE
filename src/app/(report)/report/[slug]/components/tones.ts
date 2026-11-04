import type { Tone } from '@/types/propertyReport';

// One place for the status colours, so the chips, stat cards and tables agree.
export const chipTone: Record<Tone, string> = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  blue: 'bg-blue-50 text-blue-700 ring-blue-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  violet: 'bg-violet-50 text-violet-700 ring-violet-200',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  red: 'bg-rose-50 text-rose-700 ring-rose-200',
};

export const statTone: Record<Tone, string> = {
  green: 'border-emerald-200 bg-emerald-50/60 text-emerald-700',
  blue: 'border-blue-200 bg-blue-50/60 text-blue-700',
  amber: 'border-amber-200 bg-amber-50/60 text-amber-700',
  violet: 'border-violet-200 bg-violet-50/60 text-violet-700',
  slate: 'border-slate-200 bg-slate-50 text-slate-800',
  red: 'border-rose-200 bg-rose-50/60 text-rose-700',
};
