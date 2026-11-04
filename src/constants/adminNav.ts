import {
  Activity,
  BarChart3,
  Bot,
  Globe2,
  LayoutDashboard,
  Lightbulb,
  Megaphone,
  Scale,
  Settings2,
  Share2,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type AdminNavItem = {
  slug: string;
  href: string;
  label: string;
  icon: LucideIcon;
  keywords: string;
  blurb: string;
  will: string[];
  backend: string;
  live?: boolean;
};
export type AdminNavSection = { label: string; items: AdminNavItem[] };

const item = (
  slug: string,
  label: string,
  icon: LucideIcon,
  keywords: string,
  blurb: string,
  will: string[],
  backend: string,
): AdminNavItem => ({
  slug,
  href: slug ? `/admin/${slug}` : '/admin',
  label,
  icon,
  keywords,
  blurb,
  will,
  backend,
});

export const ADMIN_NAV: AdminNavSection[] = [
  {
    label: 'Overview',
    items: [
      item(
        '',
        'Dashboard',
        LayoutDashboard,
        'home overview summary kpi reports disputes replies held registers tax',
        'Today at a glance: headline numbers, success metrics, reports and the review queues.',
        [],
        'Live: ten admin endpoints.',
      ),
    ],
  },
  {
    label: 'Business',
    items: [
      item(
        'sales',
        'Sales',
        BarChart3,
        'revenue money payments purchases refunds tax currency orders',
        'Revenue, paid reports, refunds and tax exposure over time.',
        [
          'Revenue by currency, country and day',
          'Paid reports, average price, refunds',
          'Tax thresholds per country',
        ],
        'Partly: revenue and tax exist; sales history and refunds list are still to build.',
      ),
      {
        ...item(
          'marketing',
          'Marketing dashboard',
          Megaphone,
          'marketing numbers dashboard campaign utm channel acquisition spend phase anchor markets',
          'Weekly marketing numbers, the launch phase and the decisions they point to.',
          [],
          'Live: the marketing dashboard API.',
        ),
        live: true,
      },
      {
        ...item(
          'social',
          'Marketing desk',
          Share2,
          'social desk posts instagram x linkedin queue approve pack weekly facts audit pause',
          'The weekly social pack, the post queue, approvals and pauses.',
          [],
          'Live: the social desk API.',
        ),
        live: true,
      },
      item(
        'freemium',
        'Free vs premium',
        Scale,
        'freemium premium funnel preview unlock conversion paywall roadmap what works failing',
        'How people move from the free preview to a paid report, and where they drop out.',
        [
          'Roadmap from first visit to paid report',
          'What works and what fails at each step',
          'Free and paying users compared',
        ],
        'Partly: the visit-to-payment funnel and the sign-in funnel exist; a per-user free versus paid view needs new endpoints.',
      ),
      item(
        'insights',
        'Insights',
        Lightbulb,
        'insight recommendation trend anomaly decision',
        'Plain-language findings drawn from the numbers.',
        ['What changed since last week', 'Anomalies and drops', 'Suggested next actions'],
        'To build.',
      ),
    ],
  },
  {
    label: 'Audience',
    items: [
      item(
        'traffic',
        'Website traffic',
        TrendingUp,
        'visitors page views graph devices referrers languages daily chart',
        'Visitors, page views, devices, languages and every overall graph.',
        [
          'Daily visitors and page views',
          'Devices, languages, referring sites',
          'Period comparison',
        ],
        'Live: the analytics endpoint already returns all of it.',
      ),
      item(
        'map',
        'User map',
        Globe2,
        'world map countries distribution geography 33 markets location',
        'Where users are, across the 33 countries, on a world map.',
        [
          'World map shaded by users and by sales',
          'Country table with conversion',
          'Click a country for its detail',
        ],
        'Partly: visitor country counts exist; users by country need a new endpoint.',
      ),
    ],
  },
  {
    label: 'Engine',
    items: [
      item(
        'ai-engine',
        'AI engine',
        Bot,
        'ai engines usage cost tokens anthropic openai models research adviser latency rescued',
        'How the AI engines are used and how the engine as a whole is working.',
        [
          'Calls, failures, rescues and latency per engine',
          'Cost per call and per report',
          'Routing: who serves each agent',
        ],
        'Partly: engine status and costs exist; history over time is to build.',
      ),
      item(
        'health',
        'Health and errors',
        Activity,
        'health errors logs uptime registers connectors incidents status',
        'Health reports and the error log, in one place.',
        [
          'Official registers and connector health',
          'Error log with search and filter',
          'Failed jobs and delivery failures',
        ],
        'Partly: register health and delivery status exist; an error log API is to build.',
      ),
    ],
  },
  {
    label: 'People',
    items: [
      item(
        'users',
        'Users and sessions',
        Users,
        'users accounts sessions ban ip block disable delete sign in support',
        'Find a user, see their sessions and purchases, and ban an account or an IP address.',
        [
          'Search users, open one, see purchases',
          'End sessions',
          'Ban or unban an account or an IP address',
        ],
        'Accounts exist behind the user-accounts PR; admin routes and bans are to build.',
      ),
    ],
  },
];

export const SETTINGS_ITEM = item(
  'settings',
  'Settings',
  Settings2,
  'settings account appearance notifications preferences backup backups database restore encryption keys schedule access security',
  'Your account, how the console looks, the notices you receive, and the database backups with their encryption keys.',
  [
    'Account and sign-in',
    'Appearance (light and dark)',
    'Notifications, including backup notices in the header',
    'Database backups every two weeks, encrypted, with key status and restore',
  ],
  'To build.',
);
export const HEALTH_HREF = '/admin/health';

export const ADMIN_ITEMS: AdminNavItem[] = [...ADMIN_NAV.flatMap((s) => s.items), SETTINGS_ITEM];
export const adminItemBySlug = (slug: string) => ADMIN_ITEMS.find((i) => i.slug === slug);
