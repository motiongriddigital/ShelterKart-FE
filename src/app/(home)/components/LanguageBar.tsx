'use client';
import { useLanguageSwitch } from '@/hooks/useLanguageSwitch';
import { useMarketSelection } from '@/hooks/useMarketSelection';
import { useT } from '@/hooks/useT';
import { isLang, langInfo } from '@/i18n';
import { DEFAULT_LANG, LANGUAGES, MARKET_LANGUAGES, type LangCode } from '@/i18n/languages';

/** Language select, the "translated with AI" note, and the selected market's own languages as quick choices. */
export function LanguageBar() {
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
    <>
      <div className="lang-bar" id="langBar">
        <label htmlFor="langSelect">{t('Language')}</label>
        <select
          id="langSelect"
          value={lang}
          onChange={(e) => setLanguage(e.target.value as LangCode)}
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>
              {l.native}
            </option>
          ))}
        </select>
      </div>
      <p className="lang-note" id="langNote" hidden={lang === DEFAULT_LANG} role="status">
        {said}{' '}
        <a
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            setLanguage(DEFAULT_LANG);
          }}
        >
          {t('Show English')}
        </a>
      </p>
      <div
        className="lang-suggest"
        id="langSuggest"
        hidden={choices.length < 2}
        aria-label={t('Language')}
      >
        {choices.length > 1 &&
          choices.map((c) => (
            <button
              key={c}
              type="button"
              lang={c}
              className={`lang-chip${c === lang ? ' on' : ''}`}
              aria-pressed={c === lang}
              onClick={() => setLanguage(c)}
            >
              {langInfo(c).native}
            </button>
          ))}
      </div>
    </>
  );
}
