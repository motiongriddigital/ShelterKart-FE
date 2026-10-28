'use client';
import { useT } from '@/hooks/useT';
import type { VoicePanel as VoicePanelState } from '@/types/speech';

type Props = {
  panel: VoicePanelState | null;
  onAllow: () => void;
  onTypeInstead: () => void;
  onConfirm: (heard: string) => void;
  onEdit: (heard: string) => void;
};

export function VoicePanel({ panel, onAllow, onTypeInstead, onConfirm, onEdit }: Props) {
  const t = useT();
  return (
    <div
      className="voice-confirm"
      id="voiceConfirm"
      hidden={!panel}
      role="status"
      aria-live="polite"
    >
      {panel?.kind === 'note' && <p>{panel.text}</p>}

      {(panel?.kind === 'allow' || panel?.kind === 'blocked') && (
        <>
          <p className="voice-q">
            {panel.kind === 'allow'
              ? t(
                  'Voice search needs your microphone. Only this site uses it, and only while you speak.',
                )
              : t(
                  'Your browser has microphone access switched off for this site. Click the lock icon in the address bar, set Microphone to Allow, then press Try again.',
                )}
          </p>
          <div className="voice-actions">
            <button type="button" className="voice-yes" onClick={onAllow}>
              {panel.kind === 'allow' ? t('Allow microphone') : t('Try again')}
            </button>
            <button type="button" className="voice-edit" onClick={onTypeInstead}>
              {t('Type instead')}
            </button>
          </div>
        </>
      )}

      {panel?.kind === 'confirm' && (
        <>
          <p className="voice-q">{t('Did you mean “{q}”?', { q: panel.heard })}</p>
          <div className="voice-actions">
            <button
              type="button"
              className="voice-yes"
              autoFocus
              onClick={() => onConfirm(panel.heard)}
            >
              {t('Search this')}
            </button>
            <button type="button" className="voice-edit" onClick={() => onEdit(panel.heard)}>
              {t('Edit')}
            </button>
          </div>
          <p className="voice-note">
            {t(
              'Speech is turned into text by your browser. ShelterKart does not record your voice.',
            )}
          </p>
        </>
      )}
    </div>
  );
}
