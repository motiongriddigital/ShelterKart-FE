import type { DemoHit, DemoRecord } from '@/types/search';

const norm = (v: unknown) =>
  String(v ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function editDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}

// A word matches another exactly, or as a spelling mistake of at most one letter (two for long words).
const near = (w: string, x: string) =>
  w === x || (w.length >= 5 && editDistance(w, x) <= (w.length >= 8 ? 2 : 1));

export function matchDemoRecords(q: string, records: DemoRecord[]): DemoHit[] {
  const qw = norm(q)
    .split(' ')
    .filter((w) => w.length >= 2);
  if (!qw.length) return [];

  return records
    .map((r) => {
      const nameW = norm(r.name).split(' ');
      const devW = norm(r.developer).split(' ');
      const locW = norm(r.locality).split(' ');
      const cityW = norm(r.city).split(' ');
      let points = 0;
      let typoOnly = true;
      let typo = false;
      for (const w of qw) {
        if (nameW.includes(w)) {
          points += 3;
          typoOnly = false;
        } else if (nameW.some((x) => near(w, x))) {
          points += 2;
          typo = true;
        }
        if (devW.includes(w)) {
          points += 2;
          typoOnly = false;
        } else if (devW.some((x) => near(w, x))) points += 1;
        if (locW.includes(w) || cityW.includes(w)) {
          points += 2;
          typoOnly = false;
        } else if (locW.some((x) => near(w, x)) || cityW.some((x) => near(w, x))) points += 1;
        if (r.reg.toLowerCase() === w) {
          points += 5;
          typoOnly = false;
        }
      }
      return { r, points, typoOnly, typo };
    })
    .filter((x) => x.points > 0)
    .sort((a, b) => b.points - a.points);
}

/** Groups hits by country, keeping the best match flagged. */
export function groupByCountry(hits: DemoHit[]) {
  const groups = new Map<string, (DemoHit & { best: boolean })[]>();
  hits.forEach((h, i) => {
    const list = groups.get(h.r.country) ?? [];
    list.push({ ...h, best: i === 0 });
    groups.set(h.r.country, list);
  });
  return [...groups.entries()].map(([country, items]) => ({ country, items }));
}
