import 'server-only';
import { cache } from 'react';
import { cookies, headers } from 'next/headers';
import { createT, pickLang, type Dict } from './index';
import { DEFAULT_LANG, LANG_COOKIE, type LangCode } from './languages';

export const getLang = cache(async (): Promise<LangCode> => {
  const [c, h] = await Promise.all([cookies(), headers()]);
  return pickLang(c.get(LANG_COOKIE)?.value, h.get('accept-language'));
});

/** Only the active language's dictionary is loaded; English is the key itself, so it needs none. */
export const getDict = cache(async (lang: LangCode): Promise<Dict> => {
  if (lang === DEFAULT_LANG) return {};
  try {
    return (await import(`./messages/${lang}.json`)).default as Dict;
  } catch {
    return {}; // a language without a dictionary falls back to English
  }
});

export async function getT() {
  const lang = await getLang();
  return createT(lang, await getDict(lang));
}
