import { NextRequest, NextResponse } from 'next/server';
import { getTimeDetails } from '@/lib/time/engine';
import { findIanaZoneBySlug } from '@/lib/time/timezone-lookup';
import { checkRateLimit, createRateLimitHeaders, createRateLimitExceededResponse } from '@/lib/api/rate-limit';

export async function GET(request: NextRequest) {
  const rateCheck = checkRateLimit(request);
  if (!rateCheck.allowed) {
    return createRateLimitExceededResponse(rateCheck);
  }

  const { searchParams } = new URL(request.url);
  const tzQuery = searchParams.get('tz') || 'UTC';

  try {
    const now = new Date();
    const details = getTimeDetails(tzQuery, now);

    return NextResponse.json({
      status: 'success',
      data: {
        timezone: tzQuery,
        datetime: now.toISOString(),
        formattedTime: `${String(details.hours).padStart(2, '0')}:${String(details.minutes).padStart(2, '0')}:${String(details.seconds).padStart(2, '0')}`,
        utcOffset: details.utcOffsetString,
        utcOffsetMinutes: details.utcOffsetMinutes,
        abbreviation: details.abbreviation,
        isDst: details.isDst,
        timestamp: Math.floor(now.getTime() / 1000),
        dayOfWeek: details.dayOfWeek,
        dayOfYear: details.dayOfYear,
        weekNumber: details.weekNumber,
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
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: `Invalid or unrecognized IANA timezone: ${tzQuery}`,
    }, { status: 400 });
  }
}
