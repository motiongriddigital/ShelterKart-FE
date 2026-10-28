export type MarketCode =
  | 'uk'
  | 'sg'
  | 'fr'
  | 'no'
  | 'ie'
  | 'tw'
  | 'au'
  | 'fi'
  | 'cz'
  | 'lv'
  | 'pl'
  | 'es'
  | 'ee'
  | 'lt'
  | 'dk'
  | 'ch'
  | 'be'
  | 'se'
  | 'ae'
  | 'in'
  | 'hk'
  | 'nz'
  | 'ca'
  | 'my'
  | 'us'
  | 'de'
  | 'nl'
  | 'pt'
  | 'it'
  | 'sa'
  | 'za'
  | 'br'
  | 'mx'
  | 'jp'
  | 'th'
  | 'ph';

export type MarketTier = 'reviewed' | 'evidence' | 'signup' | 'pending' | 'partial';

export type Market = {
  code: MarketCode;
  label: string;
  flag: string;
  flagColors: string[];
  tier?: MarketTier;
  cities: string[];
};
