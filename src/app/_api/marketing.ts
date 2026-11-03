import type { AdminAuth } from './admin';
import { deskCall } from './desk';

const B = '/api/admin/marketing';

export const marketing = {
  dashboard: (a: AdminAuth, week?: string | null) =>
    deskCall(a, 'GET', `${B}/dashboard${week ? `?week=${week}` : ''}`),
  spend: (a: AdminAuth, body: unknown) => deskCall(a, 'POST', `${B}/spend`, body),
  citation: (a: AdminAuth, body: unknown) => deskCall(a, 'POST', `${B}/citation`, body),
  effort: (a: AdminAuth, body: unknown) => deskCall(a, 'POST', `${B}/effort`, body),
  settings: (a: AdminAuth, body: unknown) => deskCall(a, 'POST', `${B}/settings`, body),
};
