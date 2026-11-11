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

const ITEM =
  'flex w-full flex-wrap items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-start text-base hover:bg-slate-50';
const LINK_BTN =
  'block w-full border-t border-slate-100 px-4 py-2.5 text-start text-base font-semibold text-blue-700 hover:bg-blue-50';

const Hint = ({ children, empty }: { children: React.ReactNode; empty?: boolean }) => (
  <p className={empty ? 'px-4 py-3 text-base text-slate-700' : 'px-4 py-2 text-sm text-slate-600'}>
    {children}
  </p>
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
    <button type="button" className={ITEM} onClick={() => onChoose(c)}>
      <span className="font-semibold text-slate-900">
        {[c.name + (c.phase ? ` · ${c.phase}` : ''), c.locality, c.city].filter(Boolean).join(', ')}
      </span>
      {best && (
        <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-sm font-bold text-emerald-700">
          {t('Best match')}
        </span>
      )}
      <span className="w-full text-sm text-slate-600">{meta.join(' · ')}</span>
    </button>
  );
}

const Line = ({ label, value }: { label: string; value: string }) => (
  <p className="px-4 py-0.5 text-base text-slate-700">
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
          <button type="button" className={LINK_BTN} onClick={() => onNoneOfThese(q)}>
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
          <button type="button" className={LINK_BTN} onClick={() => onResearchAnyway(q)}>
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
