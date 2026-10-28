// Minimal typing for the Web Speech API, which TypeScript's DOM lib does not ship.
export type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

export type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

export type VoicePanel =
  | { kind: 'note'; text: string }
  | { kind: 'allow' }
  | { kind: 'blocked' }
  | { kind: 'confirm'; heard: string };
