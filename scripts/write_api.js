const fs = require('fs');

// src/app/api/time/route.ts
fs.writeFileSync('src/app/api/time/route.ts', `
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const now = Date.now();
  return NextResponse.json(
    {
      serverTime: now,
      iso: new Date(now).toISOString(),
      timezone: "UTC",
      precision: "±0.01 seconds",
      source: "Server NTP-synced timestamp"
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    }
  );
}
`, 'utf8');

// src/app/api/search/route.ts
fs.writeFileSync('src/app/api/search/route.ts', `
import { NextRequest, NextResponse } from 'next/server';
import { searchCities } from '@/lib/geo/cities';
import { TIMEZONES } from '@/lib/time/timezones';
import { COUNTRIES } from '@/lib/geo/countries';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  if (!q.trim()) {
    return NextResponse.json({ results: [] });
  }

  const query = q.toLowerCase().trim();
  const cityResults = searchCities(query).slice(0, 8).map(c => ({
    type: 'city',
    id: c.id,
    title: \`\${c.name}, \${c.country}\`,
    subtitle: c.timezone,
    slug: \`/time/\${c.slug}\`,
    countryCode: c.countryCode
  }));

  const countryResults = Object.values(COUNTRIES)
    .filter(c => c.name.toLowerCase().includes(query) || c.code.toLowerCase() === query)
    .slice(0, 4)
    .map(c => ({
      type: 'country',
      id: c.code,
      title: \`\${c.name} \${c.flag}\`,
      subtitle: \`Capital: \${c.capital} • \${c.timezones[0]}\`,
      slug: \`/country/\${c.slug}\`,
      countryCode: c.code
    }));

  const tzResults = TIMEZONES
    .filter(t => t.name.toLowerCase().includes(query) || t.shortName.toLowerCase().includes(query) || t.id.toLowerCase().includes(query))
    .slice(0, 4)
    .map(t => ({
      type: 'timezone',
      id: t.id,
      title: \`\${t.name} (\${t.shortName})\`,
      subtitle: t.formattedOffset,
      slug: \`/time-zone/\${t.shortName.toLowerCase()}\`,
      countryCode: ''
    }));

  return NextResponse.json({
    results: [...cityResults, ...countryResults, ...tzResults]
  });
}
`, 'utf8');

console.log('API routes written successfully');
