'use client';
import { NoResultsDoodle } from '@/components/illustrations/doodles/NoResultsDoodle';
import { NO_RESULTS_LABEL } from '@/constants/emptyStates';
import { useT } from '@/hooks/useT';
import { groupByCountry } from '@/utils/demoSearch';
import type { SearchView } from '@/hooks/useSearch';
import type { DemoHit, DemoRecord } from '@/types/search';

type Props = {
  view: SearchView;
  visible: boolean;
  onDidYouMean: (name: string) => void;
  onPick: (record: DemoRecord, back: DemoHit[]) => void;
  onBack: () => void;
};

const ITEM =
  'flex w-full flex-wrap items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-start text-base hover:bg-slate-50';
const LINK_BTN =
  'block w-full border-t border-slate-100 px-4 py-2.5 text-start text-base font-semibold text-blue-700 hover:bg-blue-50';

const NoResults = () => {
  const t = useT();
  return <NoResultsDoodle label={t(NO_RESULTS_LABEL)} className="mx-auto mt-3 w-28" />;
};

const Hint = ({ children, empty }: { children: React.ReactNode; empty?: boolean }) => (
  <p className={empty ? 'px-4 py-3 text-base text-slate-700' : 'px-4 py-2 text-sm text-slate-600'}>
    {children}
  </p>
);

const Line = ({ label, value }: { label: string; value: string }) => (
  <p className="px-4 py-0.5 text-base text-slate-700">
    <strong>{label}: </strong>
    {value}
  </p>
);

function Body({ view, onDidYouMean, onPick, onBack }: Omit<Props, 'visible'>) {
  const t = useT();
  switch (view.mode) {
    case 'idle':
      return null;
    case 'live':
      return <Hint>{view.message}</Hint>;
    case 'empty':
      return (
        <>
          <NoResults />
          <Hint empty>
            {t(
              'We do not have this project in our records yet. Tell us the name, the city and your e-mail, and we will tell you when it is researched.',
            )}
          </Hint>
          <Hint>
            {t(
              'Not what you were looking for? Try a developer and an area, such as “Example Developers Worli”.',
            )}
          </Hint>
        </>
      );
    case 'record': {
      const r = view.record;
      return (
        <>
          <p className="px-4 pt-3 text-base font-bold text-slate-900">
            {r.name}, {r.city}
          </p>
          <Line label={t('Developer')} value={r.developer} />
          <Line label={t('Locality')} value={r.locality} />
          <Line label={t('Country')} value={r.country} />
          <Line label={t('Registration number')} value={r.reg} />
          <Line label={t('Status')} value={r.status} />
          <Hint>
            {t(
              'Demo record. A live search would research this project and show its full report. This demo has no full report for it.',
            )}
          </Hint>
          {view.back && (
            <button type="button" className={LINK_BTN} onClick={onBack}>
              {t('Back to results')}
            </button>
          )}
        </>
      );
    }
    case 'list':
      return (
        <>
          <Hint>
            {t(
              'Demo records only. They are illustrative, not real projects. A live search researches each project and shows a full report.',
            )}
          </Hint>
          {view.didYouMean && (
            <button
              type="button"
              className={LINK_BTN}
              onClick={() => onDidYouMean(view.didYouMean as string)}
            >
              {t('Did you mean “{q}”?', { q: view.didYouMean })}
            </button>
          )}
          <Hint>{t('Matches so far, grouped by country. Choose one.')}</Hint>
          {groupByCountry(view.hits).map(({ country, items }) => (
            <div key={country}>
              <div className="bg-slate-50 px-4 py-1.5 text-sm font-bold text-slate-600">
                {country} · {items.length}
              </div>
              {items.map((it) => (
                <button
                  key={it.r.reg}
                  type="button"
                  className={ITEM}
                  onClick={() => onPick(it.r, view.hits)}
                >
                  <span className="font-semibold text-slate-900">
                    {it.r.name}, {it.r.locality}, {it.r.city}
                  </span>
                  {it.best && (
                    <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-sm font-bold text-emerald-700">
                      {t('Best match')}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </>
      );
  }
}

export function SuggestPanel({ visible, ...rest }: Props) {
  return (
    <div
      hidden={!visible}
      className="mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
    >
      <Body {...rest} />
    </div>
  );
}
