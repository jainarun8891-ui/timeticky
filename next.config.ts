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
      {
        source: '/time-scrubber',
        destination: '/time-slider',
        permanent: true,
      },
      {
        source: '/es/time-scrubber',
        destination: '/es/time-slider',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-store',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=604800',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
