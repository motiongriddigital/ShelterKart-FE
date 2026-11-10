'use client';
import { useEffect, useState } from 'react';
import { getDossierHtml } from '@/services/samples';
import type { DossierHtml } from '@/types/report';

export function useDossierHtml(id: string | null) {
  const [state, setState] = useState<{ id: string; html: DossierHtml } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!id) return;
    let live = true;
    getDossierHtml(id).then(
      (html) => live && setState({ id, html }),
      () => live && setFailed(true),
    );
    return () => {
      live = false;
    };
  }, [id]);

  return { html: state?.id === id ? state.html : null, failed };
}
