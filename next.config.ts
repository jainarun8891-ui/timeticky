import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/country',
        destination: '/countries',
        permanent: true,
      },
      {
        source: '/country/:slug',
        destination: '/countries/:slug',
        permanent: true,
      },
      {
        source: '/sunrise-sunset',
        destination: '/sun',
        permanent: true,
      },
      {
        source: '/sunrise-sunset/:city',
        destination: '/sun/:city',
        permanent: true,
      },
      {
        source: '/convert',
        destination: '/converter',
        permanent: true,
      },
      {
        source: '/convert/:combo',
        destination: '/converter/:combo',
        permanent: true,
      },
      {
        source: '/time-converter',
        destination: '/converter',
        permanent: true,
      },
      {
        source: '/time-zone-converter',
        destination: '/converter',
        permanent: true,
      },
      {
        source: '/time-difference',
        destination: '/converter',
        permanent: true,
      },
      {
        source: '/time-difference/:cityA/:cityB',
        destination: '/converter/difference/:cityA-to-:cityB',
        permanent: true,
      },
      {
        source: '/compare',
        destination: '/converter/compare',
        permanent: true,
      },
      {
        source: '/compare/:cities*',
        destination: '/converter/compare/:cities*',
        permanent: true,
      },
      {
        source: '/time-zone/:slug',
        destination: '/timezone/:slug',
        permanent: true,
      },
      {
        source: '/moon-phase/:city*',
        destination: '/moon/:city*',
        permanent: true,
      },
      {
        source: '/:from([a-zA-Z0-9]+)-to-:to([a-zA-Z0-9]+)-converter',
        destination: '/converter/:from-to-:to',
        permanent: true,
      },
      {
        source: '/:from([a-zA-Z0-9]+)-to-:to([a-zA-Z0-9]+)',
        destination: '/converter/:from-to-:to',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
