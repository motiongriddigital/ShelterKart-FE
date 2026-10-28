'use client';
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

const Hint = ({ children, empty }: { children: React.ReactNode; empty?: boolean }) => (
  <p className={empty ? 'suggest-empty-hint' : 'suggest-hint'}>{children}</p>
);

const Line = ({ label, value }: { label: string; value: string }) => (
  <p className="suggest-line">
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
          <p className="suggest-record-title">
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
            <button type="button" className="suggest-didyoumean" onClick={onBack}>
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
              className="suggest-didyoumean"
              onClick={() => onDidYouMean(view.didYouMean as string)}
            >
              {t('Did you mean “{q}”?', { q: view.didYouMean })}
            </button>
          )}
          <Hint>{t('Matches so far, grouped by country. Choose one.')}</Hint>
          {groupByCountry(view.hits).map(({ country, items }) => (
            <div key={country}>
              <div className="suggest-group">
                {country} · {items.length}
              </div>
              {items.map((it) => (
                <button
                  key={it.r.reg}
                  type="button"
                  className="suggest-item"
                  onClick={() => onPick(it.r, view.hits)}
                >
                  <span className="suggest-name">
                    {it.r.name}, {it.r.locality}, {it.r.city}
                  </span>
                  {it.best && <span className="stype">{t('Best match')}</span>}
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
    <div className={`suggest${visible ? ' visible' : ''}`} id="suggest">
      <Body {...rest} />
    </div>
  );
}
