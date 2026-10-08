import { NextRequest, NextResponse } from 'next/server';
import { getAllCountries } from '@/lib/geo/countries';
import { checkRateLimit, createRateLimitHeaders, createRateLimitExceededResponse } from '@/lib/api/rate-limit';

export async function GET(request: NextRequest) {
  const rateCheck = checkRateLimit(request);
  if (!rateCheck.allowed) {
    return createRateLimitExceededResponse(rateCheck);
  }

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
      tier: rateCheck.plan.id,
      tierName: rateCheck.plan.name,
      limitPerMinute: rateCheck.limit,
      remainingThisMinute: rateCheck.remaining,
      resetSeconds: rateCheck.resetSeconds,
    }
  }, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
      ...createRateLimitHeaders(rateCheck),
    }
  });
}
