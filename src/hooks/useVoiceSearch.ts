'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLang, useT } from '@/hooks/useT';
import type { TFn } from '@/i18n';
import type { SpeechRecognitionCtor, SpeechRecognitionLike, VoicePanel } from '@/types/speech';

const LANG_CODES: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ar: 'ar-AE',
  fr: 'fr-FR',
  pl: 'pl-PL',
  'zh-Hant': 'zh-TW',
  es: 'es-ES',
  de: 'de-DE',
  ja: 'ja-JP',
};
const MAX_CHARS = 120;

const reasonFor = (t: TFn, code?: string) => {
  if (code === 'audio-capture') return t('No microphone was found on this device.');
  if (code === 'no-speech') return t('No speech was heard. Tap the microphone and speak clearly.');
  if (code === 'network')
    return t(
      'Voice search could not reach the speech service. Check your connection, or type your search.',
    );
  return t('Could not hear you. Try again, or type your search.');
};

type Options = {
  onSearch: (text: string) => void;
  onEdit: (text: string) => void;
  focusInput: () => void;
};

/**
 * Voice search. The browser turns speech into text, which is shown back and searched only when the buyer confirms.
 * Nothing is recorded by ShelterKart; the transcript is rendered as plain text and capped in length.
 */
export function useVoiceSearch({ onSearch, onEdit, focusInput }: Options) {
  const t = useT();
  const locale = useLang();
  const [panel, setPanel] = useState<VoicePanel | null>(null);
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  const clear = useCallback(() => setPanel(null), []);
  const note = useCallback((text: string) => setPanel({ kind: 'note', text }), []);

  const startListening = useCallback(() => {
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const Rec = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Rec) return;
    clear();
    const rec = new Rec();
    recRef.current = rec;
    rec.lang = LANG_CODES[locale] ?? 'en-IN';
    rec.interimResults = false;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    rec.onstart = () => {
      setListening(true);
      note(t('Listening. Say the project name and the city.'));
    };
    rec.onresult = (e) => {
      const said = (e.results?.[0]?.[0]?.transcript ?? '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, MAX_CHARS);
      if (!said) note(reasonFor(t));
      else setPanel({ kind: 'confirm', heard: said });
    };
    rec.onerror = (e) => {
      const code = e?.error;
      if (code === 'not-allowed' || code === 'service-not-allowed') setPanel({ kind: 'blocked' });
      else note(reasonFor(t, code));
    };
    rec.onend = () => {
      setListening(false);
      recRef.current = null;
    };
    try {
      rec.start();
    } catch {
      recRef.current = null;
      setListening(false);
      note(reasonFor(t));
    }
  }, [clear, locale, note, t]);

  // Asks the browser for the microphone from inside the page; the browser shows its own prompt, then listening starts.
  const requestMic = useCallback(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      startListening();
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        stream.getTracks().forEach((tr) => tr.stop()); // only the permission was needed
        startListening();
      })
      .catch((err: { name?: string }) => {
        if (err?.name === 'NotAllowedError' || err?.name === 'SecurityError')
          setPanel({ kind: 'blocked' });
        else if (err?.name === 'NotFoundError') note(reasonFor(t, 'audio-capture'));
        else note(reasonFor(t));
      });
  }, [note, startListening, t]);

  const toggle = useCallback(() => {
    const w = window as unknown as Record<string, unknown>;
    const supported =
      Boolean(w.SpeechRecognition ?? w.webkitSpeechRecognition) && window.isSecureContext;
    if (!supported) {
      note(
        !window.isSecureContext
          ? t('Voice search needs a secure (https) page. You can type your search.')
          : t('Voice search works in Chrome, Edge and Safari. You can type your search.'),
      );
      return;
    }
    if (recRef.current) {
      recRef.current.stop();
      return;
    }
    setPanel({ kind: 'allow' }); // one clear step on the page first, then the browser's own prompt
  }, [note, t]);

  const typeInstead = useCallback(() => {
    clear();
    focusInput();
  }, [clear, focusInput]);

  const confirm = useCallback(
    (heard: string) => {
      clear();
      onSearch(heard);
    },
    [clear, onSearch],
  );

  const edit = useCallback(
    (heard: string) => {
      clear();
      onEdit(heard);
      focusInput();
    },
    [clear, focusInput, onEdit],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clear();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [clear]);

  return { panel, listening, toggle, requestMic, typeInstead, confirm, edit };
}
