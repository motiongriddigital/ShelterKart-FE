'use client';
import { useT } from '@/hooks/useT';
import { groupByCountry } from '@/utils/demoSearch';
import type { SearchView } from '@/hooks/useSearch';
import type { Candidate, DemoHit, DemoRecord, Remembered } from '@/types/search';
import { leadsClearly, whyText } from '@/utils/searchWhy';
import { RememberForm } from './RememberForm';

type Props = {
  view: SearchView;
  visible: boolean;
  onDidYouMean: (name: string) => void;
  onPick: (record: DemoRecord, back: DemoHit[]) => void;
  onBack: () => void;
  onChoose: (c: Candidate) => void;
  onNoneOfThese: (q: string) => void;
  onRemember: (q: string, r: Remembered) => void;
  onResearchAnyway: (q: string) => void;
};

const Hint = ({ children, empty }: { children: React.ReactNode; empty?: boolean }) => (
  <p className={empty ? 'suggest-empty-hint' : 'suggest-hint'}>{children}</p>
);

function CandidateRow({
  c,
  best,
  onChoose,
}: {
  c: Candidate;
  best: boolean;
  onChoose: (c: Candidate) => void;
}) {
  const t = useT();
  const meta = [
    c.developer ? `${t('Developer')}: ${c.developer}` : '',
    c.registration ? `${t('Registration number')}: ${c.registration}` : '',
    whyText(c, t),
  ].filter(Boolean);
  return (
    <button type="button" className="suggest-item suggest-live" onClick={() => onChoose(c)}>
      <span className="suggest-name">
        {[c.name + (c.phase ? ` · ${c.phase}` : ''), c.locality, c.city].filter(Boolean).join(', ')}
      </span>
      {best && <span className="stype">{t('Best match')}</span>}
      <span className="suggest-meta">{meta.join(' · ')}</span>
    </button>
  );
}

const Line = ({ label, value }: { label: string; value: string }) => (
  <p className="suggest-line">
    <strong>{label}: </strong>
    {value}
  </p>
);

function Body({
  view,
  onDidYouMean,
  onPick,
  onBack,
  onChoose,
  onNoneOfThese,
  onRemember,
  onResearchAnyway,
}: Omit<Props, 'visible'>) {
  const t = useT();
  switch (view.mode) {
    case 'idle':
      return null;
    case 'live':
      return <Hint>{view.message}</Hint>;
    case 'candidates': {
      const { data, q } = view;
      const best =
        leadsClearly(data.candidates) &&
        (data.confidence === 'sure' || data.confidence === 'likely');
      return (
        <>
          <Hint>
            {data.confidence === 'sure'
              ? t('Is this the project you mean?')
              : t('Which of these do you mean? Choose one.')}
          </Hint>
          {data.candidates.map((c, i) => (
            <CandidateRow
              key={`${c.name}${c.registration}${i}`}
              c={c}
              best={i === 0 && best}
              onChoose={onChoose}
            />
          ))}
          <button type="button" className="suggest-didyoumean" onClick={() => onNoneOfThese(q)}>
            {t('None of these')}
          </button>
        </>
      );
    }
    case 'notfound':
    case 'remember': {
      const { q } = view;
      const closest = view.mode === 'notfound' ? (view.data.notFound?.closest ?? []) : [];
      return (
        <>
          {view.mode === 'notfound' && (
            <>
              <Hint empty>{t('We could not find “{q}” in our list of projects yet.', { q })}</Hint>
              {closest.length > 0 && <Hint>{t('Closest projects we know')}</Hint>}
              {closest.map((c, i) => (
                <CandidateRow key={`${c.name}${i}`} c={c} best={false} onChoose={onChoose} />
              ))}
            </>
          )}
          <RememberForm onSubmit={(r) => onRemember(q, r)} />
          <button type="button" className="suggest-anyway" onClick={() => onResearchAnyway(q)}>
            {t('Research “{q}” anyway', { q })}
          </button>
        </>
      );
    }
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
