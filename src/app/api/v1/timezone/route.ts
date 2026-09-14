import { NextRequest, NextResponse } from 'next/server';
import { getTimeDetails } from '@/lib/time/engine';
import { findIanaZoneBySlug } from '@/lib/time/timezone-lookup';

export async function GET(request: NextRequest) {
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
        tier: 'anonymous',
        limit: '100 requests per minute',
        remaining: 99
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: `Invalid or unrecognized IANA timezone: ${tzQuery}`,
    }, { status: 400 });
  }
}
