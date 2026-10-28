'use client';
import { createContext, useMemo, type ReactNode } from 'react';
import { createT, type Dict, type TFn } from './index';
import type { LangCode } from './languages';

type Ctx = { lang: LangCode; t: TFn };
export const I18nContext = createContext<Ctx>({ lang: 'en', t: (s) => s });

/** Hands the server-chosen language and its dictionary to client components. */
export function I18nProvider({
  lang,
  dict,
  children,
}: {
  lang: LangCode;
  dict: Dict;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ lang, t: createT(lang, dict) }), [lang, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
