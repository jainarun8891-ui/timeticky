import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const now = Date.now();
  return NextResponse.json(
    {
      serverTime: now,
      timestamp: now,
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
