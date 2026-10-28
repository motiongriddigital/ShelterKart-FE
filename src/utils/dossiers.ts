import { SAMPLE_DOSSIERS } from '@/constants/samples';
import type { SampleDossier } from '@/types/report';

const normalise = (v: unknown) =>
  String(v ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const dossierById = (id: string): SampleDossier | undefined =>
  SAMPLE_DOSSIERS.find((x) => x.id === id);

/** A search that names a sample project, its place or its registration number opens that reference report. */
export function findDossier(q: string): SampleDossier | undefined {
  const qq = normalise(q);
  if (qq.length < 3) return undefined;
  return SAMPLE_DOSSIERS.find((x) =>
    [x.title, x.place, ...x.ids].some((t) => {
      const tt = normalise(t);
      return tt && (tt.includes(qq) || qq.includes(tt));
    }),
  );
}
