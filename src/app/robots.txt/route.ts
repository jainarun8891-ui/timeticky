import { NextResponse } from 'next/server';
export async function GET() {
  const robots = ['User-agent: *', 'Allow: /', 'Disallow: /api/', 'Disallow: /embed/', '', 'Sitemap: https://globaltime.org/sitemap.xml'].join('\n');
  return new NextResponse(robots, { headers: { 'Content-Type': 'text/plain' } });
}
