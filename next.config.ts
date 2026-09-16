import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/moon-phase/:city*',
        destination: '/moon/:city*',
      },
      {
        source: '/:from([a-zA-Z0-9]+)-to-:to([a-zA-Z0-9]+)-converter',
        destination: '/convert/:from-to-:to',
      },
      {
        source: '/:from([a-zA-Z0-9]+)-to-:to([a-zA-Z0-9]+)',
        destination: '/convert/:from-to-:to',
      },
    ];
  },
};

export default nextConfig;
