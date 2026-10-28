import type { DossierHtml } from '@/types/report';

const cache = new Map<string, Promise<DossierHtml>>();

/** Loads one reference report on demand and keeps it for the session. */
export function getDossierHtml(id: string): Promise<DossierHtml> {
  let hit = cache.get(id);
  if (!hit) {
    hit = fetch(`/samples/${encodeURIComponent(id)}.json`).then((r) => {
      if (!r.ok) throw new Error(`Sample ${id} not found`);
      return r.json() as Promise<DossierHtml>;
    });
    hit.catch(() => cache.delete(id)); // a failed load can be retried
    cache.set(id, hit);
  }
  return hit;
}
