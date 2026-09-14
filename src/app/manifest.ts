import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GlobalTime — Exact World Time & Atomic Clock',
    short_name: 'GlobalTime',
    description: 'Ultra-fast precision global time platform, world clock, IANA timezone database, and solar astronomical calculations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
