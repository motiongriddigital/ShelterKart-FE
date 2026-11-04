import { COUNTRY } from '@/constants/admin';

export type PanelItem = { slug: string; label: string; meta?: string; flag?: 'ban' | 'warn' };
export type PanelGroup = { label?: string; items: PanelItem[] };
export type PanelConfig = {
  title: string;
  searchPlaceholder?: string;
  groups: PanelGroup[];
};

const view = (slug: string, label: string): PanelItem => ({ slug, label });

const rand = (seed: number) => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const NAMES = [
  'aarav.shah',
  'meera.iyer',
  'omar.haddad',
  'priya.nair',
  'liam.walker',
  'sofia.russo',
  'kenji.mori',
  'hannah.berg',
  'rohan.mehta',
  'ananya.rao',
  'tariq.aziz',
  'chloe.dubois',
  'vikram.joshi',
  'isla.murphy',
];
const CODES = Object.keys(COUNTRY).filter((c) => c !== 'unknown');

const next = rand(2026);
export const SEED_USERS: PanelItem[] = NAMES.map((n) => {
  const country = CODES[Math.floor(next() * CODES.length)];
  const paid = Math.floor(next() * 4);
  const banned = next() > 0.9;
  return {
    slug: n.replace('.', '-'),
    label: `${n}@example.com`,
    meta: `${country} · ${paid ? `${paid} paid` : 'free'}`,
    flag: banned ? 'ban' : undefined,
  };
});

const nextC = rand(33);
export const SEED_COUNTRIES: PanelItem[] = CODES.map((c) => ({
  slug: c.toLowerCase(),
  label: COUNTRY[c],
  meta: `${Math.floor(nextC() * 900 + 40)} users`,
}));

export const PANELS: Record<string, PanelConfig> = {
  sales: {
    title: 'Sales',
    groups: [
      {
        items: [
          view('overview', 'Overview'),
          view('orders', 'Orders'),
          view('refunds', 'Refunds'),
          view('tax', 'Tax exposure'),
          view('reports', 'Reports sold'),
        ],
      },
    ],
  },
  freemium: {
    title: 'Free vs premium',
    groups: [
      {
        items: [
          view('roadmap', 'Roadmap'),
          view('funnel', 'Preview to paid'),
          view('drop-offs', 'Where people leave'),
          view('cohorts', 'Free and paying users'),
        ],
      },
    ],
  },
  traffic: {
    title: 'Website traffic',
    groups: [
      {
        items: [
          view('overview', 'Overview'),
          view('pages', 'Pages'),
          view('sources', 'Sources'),
          view('devices', 'Devices'),
          view('languages', 'Languages'),
        ],
      },
    ],
  },
  map: {
    title: 'User map',
    searchPlaceholder: 'Find a country',
    groups: [
      { items: [view('world', 'All countries')] },
      { label: 'Countries', items: SEED_COUNTRIES },
    ],
  },
  'ai-engine': {
    title: 'AI engine',
    groups: [
      {
        items: [
          view('overview', 'Overview'),
          view('engines', 'Engines'),
          view('agents', 'Agents and routing'),
          view('costs', 'Costs'),
        ],
      },
    ],
  },
  health: {
    title: 'Health and errors',
    groups: [
      {
        items: [
          view('overview', 'Overview'),
          view('registers', 'Official registers'),
          view('errors', 'Error log'),
          view('jobs', 'Failed jobs'),
          view('delivery', 'E-mail and WhatsApp'),
        ],
      },
    ],
  },
  settings: {
    title: 'Settings',
    groups: [
      {
        label: 'Personal',
        items: [
          view('account', 'Account'),
          view('appearance', 'Appearance'),
          view('notifications', 'Notifications'),
        ],
      },
      {
        label: 'Database backups',
        items: [
          view('backup-schedule', 'Schedule'),
          view('backup-history', 'History'),
          view('backup-keys', 'Encryption keys'),
          view('backup-restore', 'Restore'),
        ],
      },
      { label: 'Security', items: [view('admin-access', 'Admin sign-in')] },
    ],
  },
  users: {
    title: 'Users and sessions',
    searchPlaceholder: 'Find a user',
    groups: [
      {
        label: 'Controls',
        items: [view('bans', 'Bans'), view('sessions', 'Active sessions')],
      },
      { label: 'Users', items: SEED_USERS },
    ],
  },
};
