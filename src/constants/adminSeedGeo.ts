export type Market = {
  code: string;
  name: string;
  numeric: string;
  weight: number;
  currency: string;
  lang: string;
};

// The 36 markets the backend supports (backend/engine/markets.js). `weight` only shapes the seed numbers.
export const MARKET_LIST: Market[] = [
  {
    code: 'in',
    name: 'India',
    numeric: '356',
    weight: 100,
    currency: 'INR',
    lang: 'English, Hindi',
  },
  {
    code: 'ae',
    name: 'United Arab Emirates',
    numeric: '784',
    weight: 34,
    currency: 'AED',
    lang: 'English, Arabic',
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    numeric: '826',
    weight: 26,
    currency: 'GBP',
    lang: 'English',
  },
  { code: 'sg', name: 'Singapore', numeric: '702', weight: 21, currency: 'SGD', lang: 'English' },
  {
    code: 'us',
    name: 'United States',
    numeric: '840',
    weight: 18,
    currency: 'USD',
    lang: 'English',
  },
  { code: 'au', name: 'Australia', numeric: '036', weight: 11, currency: 'AUD', lang: 'English' },
  {
    code: 'ca',
    name: 'Canada',
    numeric: '124',
    weight: 9,
    currency: 'CAD',
    lang: 'English, French',
  },
  { code: 'fr', name: 'France', numeric: '250', weight: 8, currency: 'EUR', lang: 'French' },
  { code: 'ie', name: 'Ireland', numeric: '372', weight: 7, currency: 'EUR', lang: 'English' },
  { code: 'de', name: 'Germany', numeric: '276', weight: 7, currency: 'EUR', lang: 'German' },
  { code: 'sa', name: 'Saudi Arabia', numeric: '682', weight: 6, currency: 'SAR', lang: 'Arabic' },
  {
    code: 'tw',
    name: 'Taiwan',
    numeric: '158',
    weight: 5,
    currency: 'TWD',
    lang: 'Chinese (Traditional)',
  },
  {
    code: 'hk',
    name: 'Hong Kong',
    numeric: '344',
    weight: 5,
    currency: 'HKD',
    lang: 'English, Chinese',
  },
  { code: 'nz', name: 'New Zealand', numeric: '554', weight: 4, currency: 'NZD', lang: 'English' },
  { code: 'my', name: 'Malaysia', numeric: '458', weight: 4, currency: 'MYR', lang: 'English' },
  { code: 'es', name: 'Spain', numeric: '724', weight: 4, currency: 'EUR', lang: 'Spanish' },
  { code: 'pl', name: 'Poland', numeric: '616', weight: 4, currency: 'PLN', lang: 'Polish' },
  { code: 'nl', name: 'Netherlands', numeric: '528', weight: 3, currency: 'EUR', lang: 'English' },
  { code: 'it', name: 'Italy', numeric: '380', weight: 3, currency: 'EUR', lang: 'Italian' },
  { code: 'pt', name: 'Portugal', numeric: '620', weight: 3, currency: 'EUR', lang: 'Portuguese' },
  { code: 'za', name: 'South Africa', numeric: '710', weight: 3, currency: 'ZAR', lang: 'English' },
  { code: 'ph', name: 'Philippines', numeric: '608', weight: 3, currency: 'PHP', lang: 'English' },
  { code: 'th', name: 'Thailand', numeric: '764', weight: 2, currency: 'THB', lang: 'Thai' },
  { code: 'jp', name: 'Japan', numeric: '392', weight: 2, currency: 'JPY', lang: 'Japanese' },
  { code: 'br', name: 'Brazil', numeric: '076', weight: 2, currency: 'BRL', lang: 'Portuguese' },
  { code: 'mx', name: 'Mexico', numeric: '484', weight: 2, currency: 'MXN', lang: 'Spanish' },
  { code: 'se', name: 'Sweden', numeric: '752', weight: 2, currency: 'SEK', lang: 'English' },
  { code: 'dk', name: 'Denmark', numeric: '208', weight: 2, currency: 'DKK', lang: 'English' },
  { code: 'no', name: 'Norway', numeric: '578', weight: 2, currency: 'NOK', lang: 'English' },
  { code: 'fi', name: 'Finland', numeric: '246', weight: 2, currency: 'EUR', lang: 'English' },
  {
    code: 'ch',
    name: 'Switzerland',
    numeric: '756',
    weight: 2,
    currency: 'CHF',
    lang: 'English, German',
  },
  { code: 'be', name: 'Belgium', numeric: '056', weight: 2, currency: 'EUR', lang: 'French' },
  {
    code: 'cz',
    name: 'Czech Republic',
    numeric: '203',
    weight: 1,
    currency: 'CZK',
    lang: 'English',
  },
  { code: 'ee', name: 'Estonia', numeric: '233', weight: 1, currency: 'EUR', lang: 'English' },
  { code: 'lv', name: 'Latvia', numeric: '428', weight: 1, currency: 'EUR', lang: 'English' },
  { code: 'lt', name: 'Lithuania', numeric: '440', weight: 1, currency: 'EUR', lang: 'English' },
];

export type CountryStat = Market & {
  users: number;
  paid: number;
  conversion: number;
  newThisWeek: number;
};

const lcg = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const next = lcg(33);
export const COUNTRY_STATS: CountryStat[] = MARKET_LIST.map((m) => {
  const users = Math.round(m.weight * (28 + next() * 14));
  const conversion = 0.035 + next() * 0.06;
  return {
    ...m,
    users,
    paid: Math.round(users * conversion),
    conversion,
    newThisWeek: Math.max(1, Math.round(users * (0.02 + next() * 0.05))),
  };
});

export const statByCode = (code: string) => COUNTRY_STATS.find((c) => c.code === code);
