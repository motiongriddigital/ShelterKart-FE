import type { AdminAuth } from './admin';
import { deskCall } from './desk';
import type { Loose } from '@/types/desk';

const B = '/api/admin/social';
const get = (a: AdminAuth, p: string) => deskCall(a, 'GET', `${B}${p}`);
const post = (a: AdminAuth, p: string, body: unknown) => deskCall(a, 'POST', `${B}${p}`, body);
const id = encodeURIComponent;

export const social = {
  status: (a: AdminAuth) => get(a, '/status'),
  queue: (a: AdminAuth, hours = 24) => get(a, `/queue?hours=${hours}`),
  audit: (a: AdminAuth, limit = 15) => get(a, `/audit?limit=${limit}`),
  jobs: (a: AdminAuth) => get(a, '/jobs'),
  keeper: (a: AdminAuth) => get(a, '/keeper'),
  kb: (a: AdminAuth, status: 'draft' | 'verified') => get(a, `/kb?status=${status}`),
  veto: (a: AdminAuth, postId: string) =>
    post(a, '/veto', { id: postId, reason: 'vetoed from the desk' }),
  pause: (a: AdminAuth, body: Loose) => post(a, '/pause', body),
  resume: (a: AdminAuth, body: Loose) => post(a, '/resume', body),
  incident: (a: AdminAuth, body: Loose) => post(a, '/incident', body),
  plan: (a: AdminAuth, week: string) => post(a, '/plan', { week }),
  buildPack: (a: AdminAuth, week: string) => post(a, '/pack', { week }),
  approvePack: (a: AdminAuth, packId: string, exceptions: string[], pin: string) =>
    post(a, `/pack/${id(packId)}/approve`, { exceptions, pin }),
  addSeed: (a: AdminAuth, market: string, topic: string, url: string) =>
    post(a, '/keeper/seeds', { market, topic, urls: [url] }),
  runKeeper: (a: AdminAuth, market: string, topic: string) =>
    post(a, '/keeper/run', { market, topic, wait: true }),
  verifyFact: (a: AdminAuth, factId: string) =>
    post(a, `/kb/${id(factId)}/verify`, { by: 'founder' }),
  rejectFact: (a: AdminAuth, factId: string) =>
    post(a, `/kb/${id(factId)}/reject`, { why: 'rejected from the desk' }),
  approveTranslation: (a: AdminAuth, factId: string, lang: string, by: string) =>
    post(a, `/kb/${id(factId)}/translation/${id(lang)}/approve`, { by }),
};
