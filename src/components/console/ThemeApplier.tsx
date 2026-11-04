'use client';
import { useEffect } from 'react';
import { applyTheme, useAdminTheme } from '@/store/adminTheme';

export function ThemeApplier() {
  const init = useAdminTheme((s) => s.init);
  const mode = useAdminTheme((s) => s.mode);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (mode !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = () => applyTheme('system');
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [mode]);

  return null;
}
