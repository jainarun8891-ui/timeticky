import { NextRequest, NextResponse } from 'next/server';
import { getTimeDetails } from '@/lib/time/engine';
import { checkRateLimit, createRateLimitHeaders, createRateLimitExceededResponse } from '@/lib/api/rate-limit';

export async function GET(request: NextRequest) {
  const rateCheck = checkRateLimit(request);
  if (!rateCheck.allowed) {
    return createRateLimitExceededResponse(rateCheck);
  }

  const now = new Date();
  const details = getTimeDetails('UTC', now);

  return NextResponse.json({
    status: 'success',
    data: {
      standard: 'Coordinated Universal Time (UTC)',
      iso8601: now.toISOString(),
      timestamp: Math.floor(now.getTime() / 1000),
      timestampMs: now.getTime(),
      year: details.year,
      month: details.month,
      day: details.day,
      hours: details.hours,
      minutes: details.minutes,
      seconds: details.seconds,
      dayOfWeek: details.dayOfWeek,
      dayOfYear: details.dayOfYear,
      weekNumber: details.weekNumber,
      isLeapYear: details.isLeapYear,
      utcOffset: '+00:00',
      abbreviation: 'UTC',
    },
    rateLimit: {
      tier: rateCheck.plan.id,
      tierName: rateCheck.plan.name,
      limitPerMinute: rateCheck.limit,
      remainingThisMinute: rateCheck.remaining,
      resetSeconds: rateCheck.resetSeconds,
    }
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Access-Control-Allow-Origin': '*',
      ...createRateLimitHeaders(rateCheck),
    }
  });
}
