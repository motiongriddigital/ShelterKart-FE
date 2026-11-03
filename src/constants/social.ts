import type { Platform } from '@/types/desk';

export const PLATFORMS: Platform[] = ['X', 'FB', 'IG', 'LI', 'YT', 'TT', 'TH', 'TG', 'LN'];
export const PLATFORM_NAME: Record<string, string> = {
  X: 'X',
  FB: 'Facebook',
  IG: 'Instagram',
  LI: 'LinkedIn',
  YT: 'YouTube',
  TT: 'TikTok',
  TH: 'Threads',
  TG: 'Telegram',
  LN: 'LINE',
};
export const platformName = (p: string) => PLATFORM_NAME[p] ?? p;

export const INCIDENT_KINDS = [
  { value: 'sensitivity', label: 'A tragedy or disaster in a market (holds it 24 hours)' },
  { value: 'platform_warning', label: 'A platform sent a warning or strike' },
  { value: 'legal_notice', label: 'A legal notice arrived' },
  { value: 'negative_comments', label: 'Comments turned sharply negative' },
  { value: 'security_alert', label: 'A security alert on an account' },
];

export const PAUSE_SCOPES = [
  { value: 'market', label: 'One market' },
  { value: 'platform', label: 'One platform' },
  { value: 'global', label: 'Everything' },
];

export const DESK_REFRESH_MS = 30000;
export const JOB_POLL_MS = 2500;
