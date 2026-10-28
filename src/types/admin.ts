export type Revenue = { currency: string; amount: number };
export type Count = { key: string; count: number };
export type Daily = { day: string; visitors: number; searches: number; purchases: number };
export type FunnelStep = { label: string; count: number; ofPrevious: number | null };
export type LanguageRow = {
  lang: string;
  visitors: number;
  searches: number;
  unlock_clicks: number;
  checkouts: number;
};
export type CountryRow = {
  country: string;
  visitors: number;
  searches: number;
  unlock_clicks: number;
  checkouts: number;
};

export type Analytics = {
  stored?: boolean;
  truncated?: boolean;
  totals: {
    visitors: number;
    page_views: number;
    searches: number;
    report_opens: number;
    purchases: number;
    pdf_saves: number;
    whatsapp_shares: number;
    document_checks: number;
    revenue: Revenue[];
  };
  funnel: FunnelStep[];
  daily: Daily[];
  channels: Count[];
  campaigns: Count[];
  referrers: Count[];
  countries: Count[];
  devices: Count[];
  markets: Count[];
  top_searches: Count[];
  search_outcomes: Count[];
  languages?: LanguageRow[];
  country_funnel?: CountryRow[];
};

export type Stats = { pendingCheckouts: number; openDisputes: number; pendingResponses: number };
export type HealthMarket = {
  label: string;
  state: string;
  detail?: string;
  lastOkAt?: string;
  checkedAt?: string;
};
export type Health = { markets: HealthMarket[] };
export type Dispute = {
  id: string;
  report_ref?: string;
  contact?: string;
  note: string;
  submitted_at: string;
};
export type DevResponse = {
  id: string;
  report_ref: string;
  contact_email: string;
  finding_text: string;
  response_text: string;
  submitted_at: string;
  sender_check?: string;
  developer_site?: string;
  report_available?: boolean;
  finding_match?: number;
};
export type AdminReport = {
  ref: string;
  title: string;
  place?: string;
  market?: string;
  developer?: string;
  checkedAt?: string;
  pdf?: string;
  findings?: number;
  paid?: number | string;
  paidSince?: string;
  price?: Revenue;
};
export type TaxThreshold = { currency: string; amount: number; sales: number; basis?: string };
export type TaxProgress = {
  name: string;
  thresholds: TaxThreshold[];
  pct: number;
  level: string;
  registered: boolean;
};
export type Tax = { progress: TaxProgress[]; off: { name: string; reason: string }[] };
export type EngineUsage = {
  calls?: number;
  failed?: number;
  rescued?: number;
  searches?: number;
  tokensIn?: number;
  tokensOut?: number;
  avgMs?: number;
  estimatedCostUsd?: number | null;
  costComplete?: boolean;
  lastError?: string;
  lastErrorAt?: string;
};
export type Engines = {
  roles: Record<
    string,
    {
      candidates?: { engine: string; model: string; estUsd: number | null; basis: string }[];
      excluded?: { engine: string; reason: string }[];
    }
  >;
  engines: Record<string, { label: string; configured: boolean; jurisdiction?: string }>;
  usage: Record<string, EngineUsage>;
  benchmarkAt?: string;
  pricesChecked?: string;
};
export type HeldReport = {
  ref: string;
  project?: string;
  developer?: string;
  market?: string;
  adverse: { claim: string; sources: string[] }[];
};
export type Held = { markets: string[]; held: HeldReport[] };

export type DashboardData = {
  analytics: Analytics | null;
  stats: Stats | null;
  health: Health | null;
  disputes: Dispute[];
  responses: DevResponse[];
  reports: AdminReport[] | null;
  tax: Tax | null;
  engines: Engines | null;
  held: Held | null;
  failed: string[];
  demoNote?: string;
};

export type AdminMode = 'live' | 'demo';
