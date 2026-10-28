import { DEFAULT_LANG, LANGUAGES, type LangCode } from './languages';

// Strings are keyed by their English text: a missing translation shows English, never a blank.
export type TVars = Record<string, string | number>;
export type Dict = Record<string, string>;
export type TFn = (text: string, vars?: TVars) => string;

export const isLang = (code: unknown): code is LangCode => LANGUAGES.some((l) => l.code === code);
export const langInfo = (code: LangCode) => LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

// Plural forms are stored as "<English>|<category>"; the category comes from the platform's plural rules.
const pluralCat = (lang: LangCode, n: number) => {
  try {
    return new Intl.PluralRules(lang === 'zh-Hant' ? 'zh' : lang).select(n);
  } catch {
    return 'other';
  }
};

export function createT(lang: LangCode, dict: Dict = {}): TFn {
  return (text, vars) => {
    let out: string | undefined;
    if (vars && typeof vars.n === 'number') out = dict[`${text}|${pluralCat(lang, vars.n)}`];
    out ??= dict[text] ?? text;
    return vars
      ? out.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m))
      : out;
  };
}

/** Best language for a request: the remembered choice, else the browser's, else English. */
export function pickLang(cookie: string | undefined, acceptLanguage: string | null): LangCode {
  if (isLang(cookie)) return cookie;
  for (const part of (acceptLanguage ?? '').split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase();
    let p = tag.split('-')[0];
    if (p === 'zh') p = /hant|-tw|-hk|-mo/.test(tag) ? 'zh-Hant' : 'zh-Hans'; // zh-TW/zh-HK, not zh-Hant
    if (p !== 'en' && isLang(p)) return p;
  }
  return DEFAULT_LANG;
}
