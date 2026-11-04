import { COUNTRY_STATS } from './adminSeedGeo';
import { SEED_USER_LIST } from './adminSeedPeople';

export type PanelItem = { slug: string; label: string; meta?: string; flag?: 'ban' | 'warn' };
export type PanelGroup = { label?: string; items: PanelItem[] };
export type PanelConfig = {
  title: string;
  searchPlaceholder?: string;
  groups: PanelGroup[];
};

const view = (slug: string, label: string): PanelItem => ({ slug, label });

export const SEED_COUNTRIES: PanelItem[] = [...COUNTRY_STATS]
  .sort((x, y) => y.users - x.users)
  .map((c) => ({ slug: c.code, label: c.name, meta: `${c.users.toLocaleString('en-IN')} users` }));

export const SEED_USERS: PanelItem[] = SEED_USER_LIST.map((u) => ({
  slug: u.id,
  label: u.email,
  meta: `${u.country.toUpperCase()} · ${u.purchases.length ? `${u.purchases.length} bought` : 'free'}`,
  flag: u.disabled ? 'ban' : undefined,
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
      { items: [view('world', 'World map')] },
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
