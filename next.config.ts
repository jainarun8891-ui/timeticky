import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/moon-phase/:city*',
        destination: '/moon/:city*',
      },
    ];
  },
};

export default nextConfig;
