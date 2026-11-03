import type { Metadata } from 'next';
import { SITE_URL } from './env';

export const BASE_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'ShelterKart', template: '%s · ShelterKart' },
  description: 'Peace of mind, on the record.',
  icons: {
    icon: [{ url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: '/icons/apple-touch-icon.png',
  },
};
