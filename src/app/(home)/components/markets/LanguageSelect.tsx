'use client';
import { Languages } from 'lucide-react';
import { Select } from '@/components/ui/Field';
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch';
import { useMarketSelection } from '@/hooks/useMarketSelection';
import { useT } from '@/hooks/useT';
import { isLang, langInfo } from '@/i18n';
import { DEFAULT_LANG, LANGUAGES, MARKET_LANGUAGES, type LangCode } from '@/i18n/languages';

/** Language select, the "translated with AI" note, and the selected market's own languages as quick choices. */
export function LanguageSelect() {
  const t = useT();
  const { market } = useMarketSelection();
  const { lang, setLanguage } = useLanguageSwitch();
  const info = langInfo(lang);

  // Offered wherever there is a real choice (India: Hindi or English); never forced.
  const choices = [...new Set([...(MARKET_LANGUAGES[market] ?? []), DEFAULT_LANG])].filter(
    (c): c is LangCode => isLang(c),
  );
  // Say exactly what checked the translation; never claim a review that did not happen.
  const said =
    info.review === 'native'
      ? t('Translated with AI and reviewed by a native speaker. The English original governs.')
      : t('Translated and checked with AI. The English original governs.');

  return (
    <div className="flex flex-col items-start gap-2 md:items-end">
      <label className="flex items-center gap-2 text-[11px] text-slate-500">
        <Languages className="size-3.5" aria-hidden="true" />
        {t('Language')}
        <Select
          value={lang}
          onChange={(e) => setLanguage(e.target.value as LangCode)}
          className="w-auto py-1.5 text-xs"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.native}
            </option>
          ))}
        </Select>
      </label>

      {choices.length > 1 && (
        <div className="flex flex-wrap gap-1.5" aria-label={t('Language')}>
          {choices.map((c) => (
            <button
              key={c}
              type="button"
              lang={c}
              aria-pressed={c === lang}
              onClick={() => setLanguage(c)}
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                c === lang
                  ? 'border-blue-600 bg-blue-50 text-blue-800'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {langInfo(c).native}
            </button>
          ))}
        </div>
      )}

      {lang !== DEFAULT_LANG && (
        <p role="status" className="max-w-sm text-[11px] leading-snug text-slate-500 md:text-end">
          {said}{' '}
          <button
            type="button"
            onClick={() => setLanguage(DEFAULT_LANG)}
            className="font-semibold text-blue-700 underline"
          >
            {t('Show English')}
          </button>
        </p>
      )}
    </div>
  );
}
