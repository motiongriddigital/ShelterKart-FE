import { ApiError } from '@/services/http';
import type { TFn } from '@/i18n';

/** The server's one answer for "sign in first": 401 with `code: auth_required`. */
export const isAuthRequired = (e: unknown) =>
  e instanceof ApiError &&
  e.status === 401 &&
  (e.body as { code?: string } | undefined)?.code === 'auth_required';

/** Human-readable and honest about what is not known: "could not reach" differs from "was rejected". */
export function failureMessage(e: unknown, t: TFn): string {
  if (e instanceof ApiError) {
    // A pause is the server saying something true and useful, so its own sentence is shown.
    const paused = (e.body as { code?: string } | undefined)?.code === 'paused';
    return e.status >= 500 && !paused
      ? t('Something went wrong on our side. Nothing was submitted — please try again shortly.')
      : t(e.message || 'Something went wrong. Please try again.');
  }
  if ((e as Error)?.name === 'AbortError')
    return t('That took too long to respond. Your details have been kept — try again.');
  return t('Could not reach ShelterKart. Check your connection and try again.');
}
