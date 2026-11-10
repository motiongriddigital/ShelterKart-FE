import { ApiError } from '@/services/http';
import type { TFn } from '@/i18n';

/** Human-readable and honest about what is not known: "could not reach" differs from "was rejected". */
export function failureMessage(e: unknown, t: TFn): string {
  if (e instanceof ApiError) {
    return e.status >= 500
      ? t('Something went wrong on our side. Nothing was submitted — please try again shortly.')
      : t(e.message || 'Something went wrong. Please try again.');
  }
  if ((e as Error)?.name === 'AbortError')
    return t('That took too long to respond. Your details have been kept — try again.');
  return t('Could not reach ShelterKart. Check your connection and try again.');
}
