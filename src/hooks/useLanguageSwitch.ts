'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useLang } from '@/hooks/useT';
import { LANG_COOKIE, type LangCode } from '@/i18n/languages';

/** Remembers a CHOICE (never a guess) in a first-party cookie the server reads, then re-renders in that language. */
export function useLanguageSwitch() {
  const router = useRouter();
  const lang = useLang();

  const setLanguage = useCallback(
    (code: LangCode) => {
      if (code === lang) return;
      document.cookie = `${LANG_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
      router.refresh();
    },
    [lang, router],
  );

  return { lang, setLanguage };
}
