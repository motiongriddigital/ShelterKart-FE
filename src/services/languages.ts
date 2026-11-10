import { http } from './http';
import type { Language } from '@/i18n/languages';

export const getLanguages = () =>
  http<{ ok: boolean; languages: Language[] }>('/api/languages', {
    next: { revalidate: 3600, tags: ['languages'] },
  });
