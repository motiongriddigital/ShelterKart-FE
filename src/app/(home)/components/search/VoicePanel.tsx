'use client';
import { Button } from '@/components/ui/Button';
import { useT } from '@/hooks/useT';
import type { VoicePanel as VoicePanelState } from '@/types/speech';

type Props = {
  panel: VoicePanelState | null;
  onAllow: () => void;
  onTypeInstead: () => void;
  onConfirm: (heard: string) => void;
  onEdit: (heard: string) => void;
};

const Actions = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2 flex flex-wrap gap-2">{children}</div>
);

export function VoicePanel({ panel, onAllow, onTypeInstead, onConfirm, onEdit }: Props) {
  const t = useT();
  if (!panel) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3 text-base text-slate-700"
    >
      {panel.kind === 'note' && <p>{panel.text}</p>}

      {(panel.kind === 'allow' || panel.kind === 'blocked') && (
        <>
          <p>
            {panel.kind === 'allow'
              ? t(
                  'Voice search needs your microphone. Only this site uses it, and only while you speak.',
                )
              : t(
                  'Your browser has microphone access switched off for this site. Click the lock icon in the address bar, set Microphone to Allow, then press Try again.',
                )}
          </p>
          <Actions>
            <Button size="sm" onClick={onAllow}>
              {panel.kind === 'allow' ? t('Allow microphone') : t('Try again')}
            </Button>
            <Button size="sm" variant="outline" onClick={onTypeInstead}>
              {t('Type instead')}
            </Button>
          </Actions>
        </>
      )}

      {panel.kind === 'confirm' && (
        <>
          <p className="font-semibold">{t('Did you mean “{q}”?', { q: panel.heard })}</p>
          <Actions>
            <Button size="sm" autoFocus onClick={() => onConfirm(panel.heard)}>
              {t('Search this')}
            </Button>
            <Button size="sm" variant="outline" onClick={() => onEdit(panel.heard)}>
              {t('Edit')}
            </Button>
          </Actions>
          <p className="mt-2 text-sm text-slate-600">
            {t(
              'Speech is turned into text by your browser. ShelterKart does not record your voice.',
            )}
          </p>
        </>
      )}
    </div>
  );
}
