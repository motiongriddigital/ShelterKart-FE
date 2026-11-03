import type { TFn } from '@/i18n';
import type { Candidate } from '@/types/search';

const WHY: Record<string, string> = {
  registration: 'Matched by registration number',
  former: 'Matched a former name',
  name: 'Name matched',
  name_more: 'Name matched, with the developer or area',
  spelling: 'Close to what you typed',
  developer: 'A project by the developer you named',
  developer_area: 'A project by that developer, in that area',
  area: 'A project in the area you named',
};

/** Why a candidate matched, in the reader's language. */
export function whyText(c: Candidate, t: TFn): string {
  const code = c.why?.code ?? 'area';
  const key = code === 'name' && /developer or area/.test(c.why?.text ?? '') ? 'name_more' : code;
  return t(WHY[key] ?? WHY.area);
}

/** "Best match" is shown only when one candidate truly leads. */
export const leadsClearly = (list: Candidate[]) =>
  list.length === 1 || list[0].score - list[1].score >= 0.1;
