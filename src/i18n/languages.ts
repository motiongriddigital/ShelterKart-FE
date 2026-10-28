export type LangCode = 'en' | 'hi' | 'ar' | 'fr' | 'pl' | 'zh-Hant' | 'es' | 'de' | 'ja';

export type Language = {
  code: LangCode;
  native: string;
  name: string;
  dir: 'ltr' | 'rtl';
  locale: string;
  /** Who checked the translation: shown honestly in the language note. */
  review: 'native' | 'ai';
};

export const LANGUAGES: Language[] = [
  {
    code: 'en',
    native: 'English',
    name: 'English',
    dir: 'ltr',
    locale: 'en',
    review: 'native',
  },
  {
    code: 'hi',
    native: 'हिन्दी',
    name: 'Hindi',
    dir: 'ltr',
    locale: 'hi-IN',
    review: 'ai',
  },
  {
    code: 'ar',
    native: 'العربية',
    name: 'Arabic',
    dir: 'rtl',
    locale: 'ar-AE',
    review: 'ai',
  },
  {
    code: 'fr',
    native: 'Français',
    name: 'French',
    dir: 'ltr',
    locale: 'fr-FR',
    review: 'ai',
  },
  {
    code: 'pl',
    native: 'Polski',
    name: 'Polish',
    dir: 'ltr',
    locale: 'pl-PL',
    review: 'ai',
  },
  {
    code: 'zh-Hant',
    native: '繁體中文',
    name: 'Chinese (Traditional)',
    dir: 'ltr',
    locale: 'zh-TW',
    review: 'ai',
  },
  {
    code: 'es',
    native: 'Español',
    name: 'Spanish',
    dir: 'ltr',
    locale: 'es-ES',
    review: 'ai',
  },
  {
    code: 'de',
    native: 'Deutsch',
    name: 'German',
    dir: 'ltr',
    locale: 'de-CH',
    review: 'ai',
  },
  {
    code: 'ja',
    native: '日本語',
    name: 'Japanese',
    dir: 'ltr',
    locale: 'ja-JP',
    review: 'ai',
  },
];

export const DEFAULT_LANG: LangCode = 'en';
export const LANG_COOKIE = 'sk_lang';

/** The languages each market's buyers read that ShelterKart offers (English is always added). */
export const MARKET_LANGUAGES: Partial<Record<string, string[]>> = {
  in: ['hi', 'en', 'ta', 'mr'],
  ae: ['ar', 'en', 'hi', 'ru'],
  uk: ['en'],
  sg: ['en', 'zh-Hans', 'ms', 'ta'],
  au: ['en'],
  nz: ['en'],
  hk: ['zh-Hant', 'en'],
  tw: ['zh-Hant'],
  ie: ['en'],
  fr: ['fr'],
  es: ['es'],
  pl: ['pl'],
  cz: ['cs'],
  se: ['sv'],
  dk: ['da'],
  no: ['nb'],
  fi: ['fi', 'sv'],
  ee: ['et'],
  lv: ['lv'],
  lt: ['lt'],
  be: ['fr', 'nl'],
  ch: ['de', 'fr', 'it'],
  us: ['en', 'es'],
  ca: ['en', 'fr'],
  my: ['en', 'ms', 'zh-Hans'],
  de: ['de', 'en'],
  nl: ['en', 'nl'],
  pt: ['en', 'pt'],
  it: ['en', 'it'],
  sa: ['ar', 'en'],
  za: ['en'],
  br: ['pt'],
  mx: ['es'],
  jp: ['ja', 'en'],
  th: ['en', 'th'],
  ph: ['en'],
};
