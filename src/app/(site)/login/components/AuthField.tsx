import type { ComponentProps, ReactNode } from 'react';
import { Input } from '@/components/ui/Field';
import { cn } from '@/utils/cn';

type Props = Omit<ComponentProps<'input'>, 'id'> & {
  id: string;
  label: string;
  icon: ReactNode;
  error?: string;
  /** A control that sits at the end of the field, such as the show-password button. */
  action?: ReactNode;
};

/** A labelled input with an icon, an optional action at its end, and its error underneath. */
export function AuthField({ id, label, icon, error, action, className, ...rest }: Props) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base font-semibold text-slate-900">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-gold">
          {icon}
        </span>
        <Input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'h-12 ps-11 text-base',
            action && 'pe-12',
            error && 'border-rose-600 focus-visible:border-rose-600',
            className,
          )}
          {...rest}
        />
        {action && <span className="absolute end-1.5 top-1/2 -translate-y-1/2">{action}</span>}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-base text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}
