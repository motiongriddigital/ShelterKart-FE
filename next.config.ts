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
    return [{ source: '/api/:path*', destination: `${API_ORIGIN}/api/:path*` }];
  },
};

export default nextConfig;
