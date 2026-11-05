'use client';
import { useCallback, useRef } from 'react';
import { Mic, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { IS_DEMO } from '@/configs/env';
import { INDEX_COUNT } from '@/constants/home';
import { useDossierFlow } from '@/hooks/useDossierFlow';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useSearch } from '@/hooks/useSearch';
import { useT } from '@/hooks/useT';
import { useVoiceSearch } from '@/hooks/useVoiceSearch';
import { cn } from '@/utils/cn';
import { ReportPanel } from '../report/ReportPanel';
import { SampleLinks } from './SampleLinks';
import { SuggestPanel } from './SuggestPanel';
import { VoicePanel } from './VoicePanel';

/** The search box and everything it opens: suggestions, voice, the sample reports and the report itself. */
export function SearchPanel() {
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
    <section id="search" className="px-4 pb-10 md:px-8">
      <div
        ref={cardRef}
        className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-5 text-center shadow-lg md:p-8"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700">
          {t('Institutional search engine')}
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          <label htmlFor="searchInput">{t('Search a property or builder')}</label>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-500">
          {t(
            'Access statutory records, approved sanctions, completion escrow balances, and legal dockets.',
          )}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 p-1.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/25 sm:flex-nowrap">
          <Search className="ms-2 size-4 shrink-0 text-slate-400" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            id="searchInput"
            enterKeyHint="search"
            placeholder={t('Enter property name, developer, or registration ID')}
            autoComplete="off"
            value={search.query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            aria-label={t('Speak your search')}
            title={t('Speak your search')}
            aria-pressed={voice.listening}
            onClick={voice.toggle}
            className={cn(
              'grid size-9 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-white',
              voice.listening && 'bg-rose-50 text-rose-600',
            )}
          >
            <Mic className="size-4" aria-hidden="true" />
          </button>
          <Button
            variant="dark"
            onClick={() => submit()}
            className="w-full uppercase tracking-wider sm:w-auto"
          >
            {t('Search docket')}
          </Button>
        </div>

        <div className="text-start">
          <SuggestPanel
            view={search.view}
            visible={search.visible}
            onDidYouMean={search.pickDidYouMean}
            onPick={search.showRecord}
            onBack={search.backToResults}
            onChoose={search.chooseCandidate}
            onNoneOfThese={search.askToRemember}
            onRemember={(q, r) => search.showCandidates(q, r)}
            onResearchAnyway={search.researchAnyway}
          />
          <VoicePanel
            panel={voice.panel}
            onAllow={voice.requestMic}
            onTypeInstead={voice.typeInstead}
            onConfirm={voice.confirm}
            onEdit={voice.edit}
          />
        </div>

        <p className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-start text-[11px] text-slate-400">
          <span>
            {t('You can paste a RERA number, or search a real estate developer by name.')}
          </span>
          <span>
            {t('Index')}: {INDEX_COUNT}
          </span>
        </p>

        {IS_DEMO && <SampleLinks />}
      </div>

      <div className="mx-auto mt-6 max-w-5xl">
        <ReportPanel />
      </div>
    </section>
  );
}
