'use client';
import { useRef, type ReactNode } from 'react';
import { useModalA11y } from '@/hooks/useModalA11y';
import { useModalStore, type ModalId } from '@/store/modal';

type Props = {
  id: ModalId;
  title?: string;
  wide?: boolean;
  /** Extra classes for the backdrop and the panel (the guide reader has its own). */
  bgClassName?: string;
  panelClassName?: string;
  /** Hides the default × button and heading when the content brings its own. */
  bare?: boolean;
  children: ReactNode;
};

export function Modal({ id, title, wide, bgClassName, panelClassName, bare, children }: Props) {
  const isOpen = useModalStore((s) => s.openId === id);
  const close = useModalStore((s) => s.close);
  const panelRef = useRef<HTMLDivElement>(null);
  useModalA11y(isOpen, panelRef, close);

  return (
    <div
      className={['modal-bg', bgClassName, isOpen && 'visible'].filter(Boolean).join(' ')}
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // the dimmed backdrop, not the panel
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className={['modal', wide && 'wide', panelClassName].filter(Boolean).join(' ')}
        tabIndex={-1}
      >
        {!bare && (
          <>
            <button className="modal-close" onClick={close} aria-label="Close">
              ×
            </button>
            {title && <h3 id={`${id}-title`}>{title}</h3>}
          </>
        )}
        {children}
      </div>
    </div>
  );
}
