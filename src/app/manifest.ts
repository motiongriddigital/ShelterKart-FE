import type { MetadataRoute } from 'next';

// Migrated from the legacy manifest.json (installable web app).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShelterKart — Independent Property & Builder Research',
    short_name: 'ShelterKart',
    description:
      'Independent assessments of properties and the developers behind them, from public records.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#061428',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
