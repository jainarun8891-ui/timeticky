import { NextRequest, NextResponse } from 'next/server';
import { getTimeDetails } from '@/lib/time/engine';

interface Props {
  params: Promise<{ tz: string[] }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { tz } = await params;
  const zoneId = tz ? tz.join('/') : 'UTC';

  try {
    const now = new Date();
    const details = getTimeDetails(zoneId, now);

    return NextResponse.json({
      status: 'success',
      data: {
        timezone: zoneId,
        datetime: now.toISOString(),
        formattedTime: `${String(details.hours).padStart(2, '0')}:${String(details.minutes).padStart(2, '0')}:${String(details.seconds).padStart(2, '0')}`,
        utcOffset: details.utcOffsetString,
        utcOffsetMinutes: details.utcOffsetMinutes,
        abbreviation: details.abbreviation,
        isDst: details.isDst,
        timestamp: Math.floor(now.getTime() / 1000),
        year: details.year,
        month: details.month,
        day: details.day,
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
      message: `Invalid or unrecognized IANA timezone: ${zoneId}`,
    }, { status: 400 });
  }
}
