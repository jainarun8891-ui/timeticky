import { NextResponse } from 'next/server';
import { getAllCountries } from '@/lib/geo/countries';

export async function GET() {
  const countries = getAllCountries();

  return NextResponse.json({
    status: 'success',
    count: countries.length,
    data: countries.map(c => ({
      code: c.code,
      name: c.name,
      slug: c.slug,
      capital: c.capital,
      population: c.population,
      currency: c.currency,
      flag: c.flag,
      region: c.region,
      timezones: c.timezones,
      hasDst: c.hasDst,
      dstNotes: c.dstNotes || null,
    })),
    rateLimit: {
      tier: 'anonymous',
      limit: '100 requests per minute',
      remaining: 99,
    }
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
