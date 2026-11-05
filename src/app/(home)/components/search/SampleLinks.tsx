'use client';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { SAMPLE_DOSSIERS } from '@/constants/samples';
import { useDossierFlow } from '@/hooks/useDossierFlow';
import { useT } from '@/hooks/useT';

/** "Read a full sample report": one link per reference report, one per country. */
export function SampleLinks() {
  const t = useT();
  const { showFull } = useDossierFlow();
  return (
    <div id="samples" className="mt-5 flex flex-wrap items-center justify-center gap-2 text-start">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {t('Read a full sample report:')}
      </p>
      {SAMPLE_DOSSIERS.map((x) => (
        <Link
          key={x.id}
          href={x.reportSlug ? `/report/${x.reportSlug}` : `/samples/${x.id}`}
          onClick={(e) => {
            e.preventDefault();
            showFull(x.id);
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-blue-100 bg-blue-50 px-2.5 py-1.5 text-[11px] font-medium text-blue-800 transition-colors hover:bg-blue-100"
        >
          <FileText className="size-3" aria-hidden="true" />
          {t(x.city)}
          {t(', ')}
          {t(x.country)}
        </Link>
      ))}
    </div>
  );
}
