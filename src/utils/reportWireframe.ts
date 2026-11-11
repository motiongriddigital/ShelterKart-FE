import type { WireBlock, WireField } from '@/types/reportWireframe';

type Tree = { [key: string]: unknown };

function sample(f: WireField): unknown {
  if (f.kind === 'number') return 0;
  if (f.kind === 'boolean') return false;
  if (f.kind === 'enum') return (f.options ?? []).join(' | ');
  return `text, up to ${f.limit} characters`;
}

/** Sets `a.b.c` inside an object, creating the objects on the way. */
function setPath(root: Tree, path: string, value: unknown) {
  const keys = path.split('.');
  const last = keys.pop() as string;
  let node = root;
  for (const k of keys) node = (node[k] ??= {}) as Tree;
  node[last] = value;
}

/** An example response in the shape the wireframe describes, with a placeholder instead of every value. */
export function buildExample(blocks: WireBlock[]): Tree {
  const out: Tree = {};
  for (const b of blocks) {
    if (!b.repeat) {
      b.fields.forEach((f) => setPath(out, f.path, sample(f)));
      continue;
    }
    const item: Tree = {};
    b.fields.forEach((f) => setPath(item, f.path, sample(f)));
    setPath(out, b.repeat.path, [item]);
  }
  return out;
}
