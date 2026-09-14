import { NextResponse } from 'next/server';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    count: ALL_IANA_TIMEZONES.length,
    data: ALL_IANA_TIMEZONES,
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
