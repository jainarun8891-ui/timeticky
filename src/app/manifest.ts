import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TimeNumbers — Exact World Time & Atomic Clock',
    short_name: 'TimeNumbers',
    description: 'Ultra-fast precision global time platform, world clock, IANA timezone database, and solar astronomical calculations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico?v=2',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png?v=2',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png?v=2',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
