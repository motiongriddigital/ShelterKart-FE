'use client';
import { SAMPLE_DOSSIERS } from '@/constants/samples';
import { useDossierFlow } from '@/hooks/useDossierFlow';
import { useT } from '@/hooks/useT';

/** "Read a full sample report": one link per reference report, one per country. */
export function SampleLinks() {
  const t = useT();
  const { showFull } = useDossierFlow();
  return (
    <div className="demo-chips" id="demoChips">
      <p className="demo-chips-label">{t('Read a full sample report:')}</p>
      <div className="demo-chips-row">
        {SAMPLE_DOSSIERS.map((x) => (
          <a
            key={x.id}
            className="demo-chip"
            href={`/samples/${x.id}`}
            onClick={(e) => {
              e.preventDefault();
              showFull(x.id);
            }}
          >
            {t(x.city)}
            {t(', ')}
            {t(x.country)}
          </a>
        ))}
      </div>
    </div>
  );
}
