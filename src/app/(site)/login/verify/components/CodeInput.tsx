'use client';
import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  length: number;
  value: string;
  onChange: (code: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

/** One box per digit, grouped 3 and 3. Typing moves on, Backspace moves back, and a pasted code fills every box. */
export function CodeInput({ length, value, onChange, invalid, describedBy }: Props) {
  const boxes = useRef<(HTMLInputElement | null)[]>([]);
  const focus = (i: number) => boxes.current[Math.min(Math.max(i, 0), length - 1)]?.focus();

  const type = (i: number, raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (!digits) return;
    const next = (value.slice(0, i) + digits).slice(0, length);
    onChange(next + value.slice(next.length));
    focus(i + digits.length);
  };

  const keys = (i: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (value[i]) onChange(value.slice(0, i) + value.slice(i + 1));
      else if (i > 0) {
        onChange(value.slice(0, i - 1) + value.slice(i));
        focus(i - 1);
      }
    } else if (e.key === 'ArrowLeft') focus(i - 1);
    else if (e.key === 'ArrowRight') focus(i + 1);
  };

  const paste = (e: ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(digits);
    focus(digits.length);
  };

  return (
    <div
      role="group"
      aria-label={`Your ${length}-digit code`}
      className="flex items-center justify-center gap-1 sm:gap-2"
    >
      {Array.from({ length: length }, (_, i) => (
        <span key={i} className="contents">
          {i === length / 2 && (
            <span aria-hidden="true" className="h-0.5 w-2 bg-slate-400 sm:mx-1 sm:w-3" />
          )}
          <input
            ref={(el) => {
              boxes.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            maxLength={length}
            value={value[i] ?? ''}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={invalid ? true : undefined}
            aria-describedby={describedBy}
            onChange={(e) => type(i, e.target.value)}
            onKeyDown={(e) => keys(i, e)}
            onPaste={paste}
            onFocus={(e) => e.target.select()}
            className={cn(
              'size-11 rounded-lg border bg-slate-50 text-center text-2xl font-semibold text-slate-900 outline-none transition-colors focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 sm:size-14',
              invalid ? 'border-rose-600' : 'border-slate-300',
            )}
          />
        </span>
      ))}
    </div>
  );
}
