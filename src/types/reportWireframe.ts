export type WireKind = 'text' | 'number' | 'boolean' | 'enum';

/** One value the backend sends. `path` is relative to the block's list when the block repeats. */
export type WireField = {
  path: string;
  kind: WireKind;
  /** Longest text the design has room for. */
  limit?: number;
  /** The allowed values, for an enum. */
  options?: string[];
};

export type WireBlock = {
  id: string;
  title: string;
  /** Where this block sits on the page, in words. */
  where: string;
  /** A repeated block is a list: `path` is the array in the response. */
  repeat?: { path: string; show: number; max: number };
  columns: 1 | 2 | 3;
  fields: WireField[];
};
