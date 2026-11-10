import { http } from './http';
import type { MyReport, ProfileUpdate, SessionUser } from '@/types/auth';

/** A file download: open it with a link, not `fetch`. */
export const MY_DATA_EXPORT_URL = '/api/me/export';

/** The signed-in user. A 401 `auth_required` ApiError means signed out. */
export const getMe = () =>
  http<{ ok: boolean; user: SessionUser }>('/api/me', { cache: 'no-store' });

export const updateMe = (patch: ProfileUpdate) =>
  http<{ ok: boolean; user: SessionUser }>('/api/me', { method: 'PATCH', body: patch });

/** Paid reports stop opening once the account is deleted. */
export const deleteMe = () =>
  http<{ ok: boolean }>('/api/me', { method: 'DELETE', body: { confirm: 'DELETE' } });

export const getMyReports = () =>
  http<{ ok: boolean; reports: MyReport[] }>('/api/me/reports', { cache: 'no-store' });
