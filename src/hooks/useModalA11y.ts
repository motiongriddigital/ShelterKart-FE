'use client';
import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], a[role="button"], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Ids of the sections hidden from assistive tech while a dialog is open. Add any new top-level section here.
const BACKGROUND_IDS = ['landing'];

/** Focus trap, Escape to close, return focus, and hide the page behind an open dialog. */
export function useModalA11y(
  open: boolean,
  panelRef: RefObject<HTMLElement | null>,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previous = document.activeElement as HTMLElement | null;
    BACKGROUND_IDS.forEach((id) =>
      document.getElementById(id)?.setAttribute('aria-hidden', 'true'),
    );

    const focusables = () =>
      [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement,
      );
    (focusables()[0] ?? panel).focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const f = focusables();
      if (!f.length) {
        e.preventDefault();
        return;
      }
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);

    return () => {
      document.removeEventListener('keydown', onKey, true);
      BACKGROUND_IDS.forEach((id) => document.getElementById(id)?.removeAttribute('aria-hidden'));
      if (previous && document.body.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [open, panelRef, close]);
}
