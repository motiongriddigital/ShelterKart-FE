'use client';
import { useState, type FormEvent } from 'react';
import { useT } from '@/hooks/useT';
import type { Remembered } from '@/types/search';

/** "Tell us what you remember": a short second chance when nothing matched. */
export function RememberForm({ onSubmit }: { onSubmit: (r: Remembered) => void }) {
  const t = useT();
  const [form, setForm] = useState<Remembered>({ developer: '', locality: '', year: '' });
  const field = (key: keyof Remembered, label: string, extra: object = {}) => (
    <label>
      {label}
      <input
        name={key}
        autoComplete="off"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        {...extra}
      />
    </label>
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
    <form className="suggest-form" onSubmit={submit}>
      <p className="suggest-hint">{t('Tell us what you remember, and we will look again.')}</p>
      {field('developer', t('Developer'))}
      {field('locality', t('Area or locality'))}
      {field('year', t('Year of possession or launch'), {
        type: 'number',
        min: 1990,
        max: 2040,
        inputMode: 'numeric',
      })}
      <button type="submit" className="suggest-didyoumean">
        {t('Search with these details')}
      </button>
    </form>
  );
}
