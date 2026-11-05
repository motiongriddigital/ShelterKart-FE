'use client';
import { useCallback, useEffect, useRef } from 'react';
import { Button, buttonVariants } from '@/components/ui/Button';
import { useBuyerCountry } from '@/hooks/useBuyerCountry';
import { useStartCheckout } from '@/hooks/useCheckout';
import { useCheckoutStore } from '@/store/checkout';
import { useModalStore } from '@/store/modal';
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
  const { steps } = useDossierFlow();
  const ref = useRef<HTMLElement>(null);
  const id = view.kind === 'none' ? null : view.id;
  const dossier = id ? dossierById(id) : undefined;
  const { html, failed } = useDossierHtml(
    view.kind === 'preview' || view.kind === 'full' ? id : null,
  );
  useBuyerCountry(); // settle the buyer's country early, so the checkout price is ready when asked
  const startCheckout = useStartCheckout();
  const paidContact = useCheckoutStore((s) => s.paidContact);
  const openModal = useModalStore((s) => s.open);
  const unlock = useCallback(() => id && startCheckout(id), [id, startCheckout]);

  // Bring each stage into view, as before; reduced-motion users get an instant jump.
  useEffect(() => {
    if (view.kind === 'none') return;
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    ref.current?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
  }, [view.kind, id]);

  const place = dossier ? `${t(dossier.city)}${t(', ')}${t(dossier.country)}` : '';

  return (
    <section
      className="scroll-mt-20"
      ref={ref}
      hidden={view.kind === 'none'}
      aria-live="polite"
      aria-label="Research brief"
    >
      {dossier && view.kind === 'investigating' && (
        <InvestigationSteps title={`${dossier.title} · ${place}`} steps={steps} />
      )}
      {dossier && (view.kind === 'preview' || view.kind === 'full') && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md md:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
              {place}
            </span>
            {view.kind === 'full' && (
              <>
                <a
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                  href={`/sample-reports/${dossier.pdf}`}
                  download
                >
                  {t('Download PDF')}
                </a>
                <Button size="sm" variant="outline" onClick={() => openModal('disputeModal')}>
                  {t('Report an inaccuracy')}
                </Button>
                {paidContact && (
                  <p className="w-full text-xs text-slate-500">
                    {t('In the live product, the report and its PDF are sent to {email}.', {
                      email: paidContact.email,
                    })}
                  </p>
                )}
              </>
            )}
          </div>
          {failed && (
            <p className="text-sm text-rose-600">
              {t('This report could not be loaded. Try again.')}
            </p>
          )}
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
