'use client';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { FieldLabel, Input } from '@/components/ui/Field';
import { useT } from '@/hooks/useT';
import type { Remembered } from '@/types/search';

/** "Tell us what you remember": a short second chance when nothing matched. */
export function RememberForm({ onSubmit }: { onSubmit: (r: Remembered) => void }) {
  const t = useT();
  const [form, setForm] = useState<Remembered>({ developer: '', locality: '', year: '' });
  const field = (key: keyof Remembered, label: string, extra: object = {}) => (
    <div>
      <FieldLabel htmlFor={`remember-${key}`} className="mt-0">
        {label}
      </FieldLabel>
      <Input
        id={`remember-${key}`}
        name={key}
        autoComplete="off"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        {...extra}
      />
    </div>
  );
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      developer: form.developer.trim(),
      locality: form.locality.trim(),
      year: form.year.trim(),
    });
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 border-t border-slate-100 px-4 py-3 sm:grid-cols-3"
    >
      <p className="text-xs text-slate-500 sm:col-span-3">
        {t('Tell us what you remember, and we will look again.')}
      </p>
      {field('developer', t('Developer'))}
      {field('locality', t('Area or locality'))}
      {field('year', t('Year of possession or launch'), {
        type: 'number',
        min: 1990,
        max: 2040,
        inputMode: 'numeric',
      })}
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="sm:col-span-3 sm:justify-self-start"
      >
        {t('Search with these details')}
      </Button>
    </form>
  );
}
