import { NextResponse } from 'next/server';
import { getTimeDetails } from '@/lib/time/engine';

export async function GET() {
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
}
