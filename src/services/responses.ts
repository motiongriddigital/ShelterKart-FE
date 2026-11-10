import { http } from './http';
import type {
  ReportResponses,
  ResponseStatus,
  ResponseSubmission,
  ResponseSubmitted,
} from '@/types/responses';

/** Right of reply and right of correction. Nothing is public until the sender confirms by e-mail. */
export const submitResponse = (body: ResponseSubmission) =>
  http<ResponseSubmitted>('/api/responses', { method: 'POST', body, timeoutMs: 12000 });

/** The token comes from the link in the confirmation e-mail. */
export const confirmResponse = (token: string) =>
  http<{ ok: boolean; publicRef: string; state: string }>('/api/responses/confirm', {
    method: 'POST',
    body: { token },
  });

export const getResponseStatus = (publicRef: string, key: string) =>
  http<ResponseStatus>(
    `/api/responses/status/${encodeURIComponent(publicRef)}?key=${encodeURIComponent(key)}`,
    { cache: 'no-store' },
  );

export const getReportResponses = (reportRef: string) =>
  http<ReportResponses>(`/api/responses/${encodeURIComponent(reportRef)}`, { cache: 'no-store' });
