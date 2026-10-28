'use client';
import { useCallback, useEffect, useRef } from 'react';
import { useDossierFlow } from '@/hooks/useDossierFlow';
import { useDossierHtml } from '@/hooks/useDossierHtml';
import { useT } from '@/hooks/useT';
import { useReportStore } from '@/store/report';
import { dossierById } from '@/utils/dossiers';
import { InvestigationSteps } from './InvestigationSteps';
import { ShadowReport } from './ShadowReport';

/** The research brief area under the search: the investigation, then a free preview or the full sample report. */
export function ReportPanel() {
  const t = useT();
  const view = useReportStore((s) => s.view);
  const { steps, showFull } = useDossierFlow();
  const ref = useRef<HTMLElement>(null);
  const id = view.kind === 'none' ? null : view.id;
  const dossier = id ? dossierById(id) : undefined;
  const { html, failed } = useDossierHtml(
    view.kind === 'preview' || view.kind === 'full' ? id : null,
  );
  const unlock = useCallback(() => id && showFull(id), [id, showFull]);

  // Bring each stage into view, as before; reduced-motion users get an instant jump.
  useEffect(() => {
    if (view.kind === 'none') return;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    ref.current?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
  }, [view.kind, id]);

  const place = dossier ? `${t(dossier.city)}${t(', ')}${t(dossier.country)}` : '';

  return (
    <section
      className="lb"
      id="liveBrief"
      ref={ref}
      hidden={view.kind === 'none'}
      aria-live="polite"
      aria-label="Research brief"
    >
      {dossier && view.kind === 'investigating' && (
        <InvestigationSteps title={`${dossier.title} · ${place}`} steps={steps} />
      )}
      {dossier && (view.kind === 'preview' || view.kind === 'full') && (
        <div className="sk-dossier">
          <div className="sk-dossier-bar">
            <span className="sk-dossier-tag">{place}</span>
            {view.kind === 'full' && (
              <a className="lb-act" href={`/sample-reports/${dossier.pdf}`} download>
                {t('Download PDF')}
              </a>
            )}
          </div>
          {failed && <p className="lb-small">{t('This report could not be loaded. Try again.')}</p>}
          {html && (
            <ShadowReport
              html={view.kind === 'full' ? html.full : html.preview}
              onUnlock={view.kind === 'preview' ? unlock : undefined}
            />
          )}
        </div>
      )}
    </section>
  );
}
