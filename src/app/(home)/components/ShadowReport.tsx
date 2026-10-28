'use client';
import { useEffect, useRef } from 'react';
import { useGuide } from '@/hooks/useGuide';
import { useT } from '@/hooks/useT';
import { useModalStore } from '@/store/modal';
import { useReportStore } from '@/store/report';

type Props = { html: string; onUnlock?: () => void };

/**
 * Mounts the product's pre-rendered report in a shadow root so its styles stay its own. The HTML is built and
 * escaped by the product renderer at build time (tools/build_frontend_samples.js); nothing a visitor types reaches it.
 */
export function ShadowReport({ html, onUnlock }: Props) {
  const t = useT();
  const hostRef = useRef<HTMLDivElement>(null);
  const { openGuide, downloadGuide } = useGuide();
  const openModal = useModalStore((s) => s.open);
  const setReply = useReportStore((s) => s.setReply);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
    root.innerHTML = html;

    // Links inside the report: the free guide opens in its reader; the right of reply opens its own window.
    const onClick = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.(
        'a[data-guide], a[data-guide-pdf], a[data-reply]',
      );
      if (!el) return;
      e.preventDefault();
      if (el.hasAttribute('data-guide')) openGuide(el.getAttribute('data-guide') ?? '');
      else if (el.hasAttribute('data-guide-pdf')) downloadGuide();
      else {
        setReply(el.getAttribute('data-ref') ?? '', el.getAttribute('data-claim') ?? '');
        openModal('replyModal');
      }
    };
    root.addEventListener('click', onClick);

    const btn = onUnlock ? root.querySelector<HTMLElement>('.unlock .btn') : null;
    const onUnlockClick = (e: Event) => {
      e.preventDefault();
      onUnlock?.();
    };
    if (btn) {
      const note = document.createElement('p');
      note.textContent = t(
        'Demo: no money is taken. In the live product this step is Razorpay’s secure checkout (UPI, cards, net banking).',
      );
      btn.parentNode?.insertBefore(note, btn);
      btn.addEventListener('click', onUnlockClick);
    }
    return () => {
      root.removeEventListener('click', onClick);
      btn?.removeEventListener('click', onUnlockClick);
    };
  }, [html, onUnlock, openGuide, downloadGuide, openModal, setReply, t]);

  // The report is English: left to right on an Arabic page too.
  return <div ref={hostRef} className="sk-dossier-host" dir="ltr" lang="en" />;
}
