'use client';
import { useCallback, useRef } from 'react';
import { useDossierFlow } from '@/hooks/useDossierFlow';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useSearch } from '@/hooks/useSearch';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';
import { useT } from '@/hooks/useT';
import { IS_DEMO } from '@/configs/env';
import { SampleLinks } from './SampleLinks';
import { SuggestPanel } from './SuggestPanel';
import { VoicePanel } from './VoicePanel';

const SearchIcon = ({ stroke }: { stroke: number }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={stroke} />
    <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
  </svg>
);

export function SearchCard() {
  const t = useT();
  const cardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { investigate } = useDossierFlow();
  const search = useSearch({ onDossier: investigate });
  const { hide, setQuery, submit } = search;

  useOutsideClick(cardRef, hide);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);
  const voice = useVoiceSearch({ onSearch: submit, onEdit: setQuery, focusInput });

  return (
    <div className="search-card" ref={cardRef}>
      <div className="search-card-inner">
        <label className="search-label" htmlFor="searchInput">
          {t('Search a property or builder')}
        </label>
        <div className="search-field">
          <span className="search-icon" aria-hidden="true">
            <SearchIcon stroke={2} />
          </span>
          <input
            ref={inputRef}
            type="search"
            id="searchInput"
            enterKeyHint="search"
            placeholder={t('Enter property name or registration ID')}
            autoComplete="off"
            aria-label={t('Search a property or builder')}
            value={search.query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
          <button
            type="button"
            className="mic-btn"
            id="micBtn"
            aria-label={t('Speak your search')}
            title={t('Speak your search')}
            aria-pressed={voice.listening}
            onClick={voice.toggle}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect
                x="9"
                y="3"
                width="6"
                height="11"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <SuggestPanel
          view={search.view}
          visible={search.visible}
          onDidYouMean={search.pickDidYouMean}
          onPick={search.showRecord}
          onBack={search.backToResults}
        />
        <VoicePanel
          panel={voice.panel}
          onAllow={voice.requestMic}
          onTypeInstead={voice.typeInstead}
          onConfirm={voice.confirm}
          onEdit={voice.edit}
        />

        <button className="search-go" id="searchBtn" onClick={() => submit()}>
          <span className="search-go-icon" aria-hidden="true">
            <SearchIcon stroke={2.2} />
          </span>
          <span>{t('Search')}</span>
        </button>
        <div className="search-hint">
          {t('You can paste a RERA number, or search a real estate developer by name.')}
        </div>
        {IS_DEMO && <SampleLinks />}
      </div>
    </div>
  );
}
