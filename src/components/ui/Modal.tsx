'use client';
import { useRef, type ReactNode } from 'react';
import { useModalA11y } from '@/hooks/useModalA11y';
import { useModalStore, type ModalId } from '@/store/modal';
import { cn } from '@/utils/cn';

type Props = {
  id: ModalId;
  title?: string;
  wide?: boolean;
  /** Replaces the default panel size and padding (the guide reader fills the screen). */
  panelClassName?: string;
  /** Hides the default × button and heading when the content brings its own. */
  bare?: boolean;
  children: ReactNode;
};

export function Modal({ id, title, wide, panelClassName, bare, children }: Props) {
  const isOpen = useModalStore((s) => s.openId === id);
  const close = useModalStore((s) => s.close);
  const panelRef = useRef<HTMLDivElement>(null);
  useModalA11y(isOpen, panelRef, close);

  return (
    <div
      data-open={isOpen}
      className="invisible fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-3 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 data-[open=true]:visible data-[open=true]:opacity-100 md:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // the dimmed backdrop, not the panel
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        tabIndex={-1}
        className={cn(
          'relative max-h-full w-full overflow-y-auto rounded-xl bg-white p-5 shadow-2xl outline-none md:p-7',
          wide ? 'max-w-3xl' : 'max-w-md',
          panelClassName,
        )}
      >
        {!bare && (
          <>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute end-3 top-3 grid size-8 place-items-center rounded-md text-xl leading-none text-slate-500 hover:bg-slate-100"
            >
              ×
            </button>
            {title && (
              <h3 id={`${id}-title`} className="mb-3 pe-8 text-lg font-bold text-slate-900">
                {title}
              </h3>
            )}
          </>
        )}
        {children}
      </div>
    </div>
  );
}
