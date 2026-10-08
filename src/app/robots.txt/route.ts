import { NextResponse } from 'next/server';

export async function GET() {
  const robots = [
    'User-agent: *',
    'Allow: /',
    'Allow: /_next/static/',
    'Disallow: /api/',
    'Disallow: /embed/',
    'Disallow: /admin/',
    '',
    'Host: www.timenumbers.com',
    'Sitemap: https://www.timenumbers.com/sitemap.xml'
  ].join('\n');

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
