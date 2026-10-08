import { NextRequest, NextResponse } from 'next/server';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { checkRateLimit, createRateLimitHeaders, createRateLimitExceededResponse } from '@/lib/api/rate-limit';

export async function GET(request: NextRequest) {
  const rateCheck = checkRateLimit(request);
  if (!rateCheck.allowed) {
    return createRateLimitExceededResponse(rateCheck);
  }

  return NextResponse.json({
    status: 'success',
    count: ALL_IANA_TIMEZONES.length,
    data: ALL_IANA_TIMEZONES,
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
