import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

const field =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus-visible:border-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600/25 read-only:bg-slate-50 read-only:text-slate-500';

export const Input = ({ className, ...rest }: ComponentProps<'input'>) => (
  <input className={cn(field, className)} {...rest} />
);

export const Textarea = ({ className, ...rest }: ComponentProps<'textarea'>) => (
  <textarea className={cn(field, 'resize-y', className)} {...rest} />
);

export const Select = ({ className, ...rest }: ComponentProps<'select'>) => (
  <select className={cn(field, 'pe-8', className)} {...rest} />
);

export const FieldLabel = ({ className, ...rest }: ComponentProps<'label'>) => (
  <label
    className={cn('mb-1 mt-3 block text-xs font-semibold text-slate-600', className)}
    {...rest}
  />
);
