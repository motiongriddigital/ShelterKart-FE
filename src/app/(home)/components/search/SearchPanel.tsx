'use client';
import { useCallback, useRef } from 'react';
import { Mic, Search } from 'lucide-react';
import { Decor } from '@/components/illustrations/Decor';
import { DocumentSealArt } from '@/components/illustrations/DocumentSealArt';
import { LandPlotArt } from '@/components/illustrations/LandPlotArt';
import { Button } from '@/components/ui/Button';
import { IS_DEMO } from '@/configs/env';
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
    <section id="search" className="relative scroll-mt-24 px-4 pb-8 md:px-8">
      <Decor className="start-4 top-16 hidden w-44 lg:block xl:start-12 xl:w-56">
        <LandPlotArt className="w-full text-cream/15" />
      </Decor>
      <Decor className="end-4 top-24 hidden w-40 lg:block xl:end-12 xl:w-52">
        <DocumentSealArt className="w-full text-cream/15" />
      </Decor>
      <div
        ref={cardRef}
        className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-5 text-center shadow-lg md:p-8"
      >
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          <label htmlFor="searchInput">{t('Search a property or builder')}</label>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-slate-700">
          {t(
            'Type the name of the project or the builder. You can also speak, or paste a RERA number.',
          )}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 p-1.5 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/25 sm:flex-nowrap">
          <Search className="ms-2 size-5 shrink-0 text-slate-600" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            id="searchInput"
            enterKeyHint="search"
            placeholder={t('For example: Hubtown Celeste')}
            autoComplete="off"
            value={search.query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            className="min-w-0 flex-1 bg-transparent px-1 py-3 text-lg text-slate-900 outline-none placeholder:text-slate-500"
          />
          <button
            type="button"
            aria-label={t('Speak your search')}
            title={t('Speak your search')}
            aria-pressed={voice.listening}
            onClick={voice.toggle}
            className={cn(
              'flex h-11 shrink-0 items-center gap-1.5 rounded-md px-3 text-base font-medium text-slate-700 hover:bg-white',
              voice.listening && 'bg-rose-50 text-rose-600',
            )}
          >
            <Mic className="size-5" aria-hidden="true" />
            <span className="hidden sm:inline">{t('Speak')}</span>
          </button>
          <Button
            variant="dark"
            size="lg"
            onClick={() => submit()}
            className="w-full text-base sm:w-auto"
          >
            <Search className="size-5" aria-hidden="true" />
            {t('Search')}
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

        <p className="mt-3 text-start text-base text-slate-700">
          {t('Searching is free. You only pay if you choose to unlock the full report.')}
        </p>

        {IS_DEMO && <SampleLinks />}
      </div>

      <div className="mx-auto mt-6 max-w-5xl">
        <ReportPanel />
      </div>
    </section>
  );
}
