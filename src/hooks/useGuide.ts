'use client';
import { useCallback } from 'react';
import { track } from '@/app/_api/track';
import { IS_DEMO } from '@/configs/env';
import { useModalStore } from '@/store/modal';

export const GUIDE_URL = '/guide/index.html';
const GUIDE_FILENAME = 'ShelterKart-Home-Buying-Guide.pdf';
const GUIDE_SHARE_TEXT =
  'Before you visit a property, ask these 25 questions. Free, from ShelterKart:';

/** The free Home Buying Guide: open it in the reader, download the PDF, or share the question card. */
export function useGuide() {
  const open = useModalStore((s) => s.open);

  const openGuide = useCallback(
    (chapter?: string) => {
      track('guide_open', { detail: chapter ?? 'start' });
      open('guideModal');
    },
    [open],
  );

  const downloadGuide = useCallback(async () => {
    track('guide_download');
    if (!IS_DEMO) {
      try {
        const r = await fetch('/guide/pdf', { method: 'HEAD' });
        if (r.ok) {
          const a = document.createElement('a');
          a.href = '/guide/pdf';
          a.download = GUIDE_FILENAME;
          document.body.append(a);
          a.click();
          a.remove();
          return;
        }
      } catch {
        /* fall through to the reader */
      }
    }
    // The server has no PDF here: open the reader, whose own Print gives the same document.
    openGuide();
  }, [openGuide]);

  const shareHref = useCallback(() => {
    const url = `${window.location.origin}/guide`;
    return `https://wa.me/?text=${encodeURIComponent(`${GUIDE_SHARE_TEXT} ${url}`)}`;
  }, []);

  const trackShare = useCallback((from: string) => track('guide_share', { detail: from }), []);

  return { openGuide, downloadGuide, shareHref, trackShare };
}
