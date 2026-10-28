import path from 'node:path';
import type { NextConfig } from 'next';

const API_ORIGIN = process.env.API_ORIGIN ?? 'http://localhost:4000';

const nextConfig: NextConfig = {
  // Lets any .scss file `@use 'breakpoints'`, `@use 'mixins'`, etc. without relative paths.
  sassOptions: {
    loadPaths: [path.join(process.cwd(), 'src/styles')],
    includePaths: [path.join(process.cwd(), 'src/styles')],
  },
  async rewrites() {
    // Everything the Express backend serves itself: its API, the live report pages and the guide's downloads.
    return [
      '/api/:path*',
      '/r/:path*',
      '/samples/:path*',
      '/assets/:path*',
      '/guide/pdf',
      '/guide/card.png',
      '/guide/card.pdf',
    ].map((source) => ({ source, destination: `${API_ORIGIN}${source}` }));
  },
};

export default nextConfig;
