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
    // What the Express backend serves itself: the live report pages, the guide's downloads and the /api paths that
    // pages it serves (and its webhooks) use. A route handler in app/api wins over the /api rewrite at the same path.
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
