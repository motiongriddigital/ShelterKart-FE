export type TrackEvent =
  'page_view' | 'guide_open' | 'guide_share' | 'guide_download' | (string & {});

export type TrackExtra = { detail?: string; [key: string]: unknown };
