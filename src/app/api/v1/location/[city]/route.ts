import { NextRequest, NextResponse } from 'next/server';
import { findCityByRootSlug } from '@/lib/geo/city-lookup';
import { getTimeDetails } from '@/lib/time/engine';

interface Props {
  params: Promise<{ city: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { city: slug } = await params;
  const cityData = findCityByRootSlug(slug);

  if (!cityData) {
    return NextResponse.json({
      status: 'error',
      message: `Location '${slug}' not found in canonical index`,
    }, { status: 404 });
  }

  const now = new Date();
  const timeInfo = getTimeDetails(cityData.timezone, now);

  return NextResponse.json({
    status: 'success',
    data: {
      id: cityData.id,
      name: cityData.name,
      country: cityData.country,
      countryCode: cityData.countryCode,
      timezone: cityData.timezone,
      coordinates: {
        latitude: cityData.lat,
        longitude: cityData.lng,
      },
      population: cityData.population || null,
      currentTime: {
        iso: now.toISOString(),
        time: `${String(timeInfo.hours).padStart(2, '0')}:${String(timeInfo.minutes).padStart(2, '0')}:${String(timeInfo.seconds).padStart(2, '0')}`,
        formatted12h: `${timeInfo.hours % 12 || 12}:${String(timeInfo.minutes).padStart(2, '0')} ${timeInfo.hours >= 12 ? 'PM' : 'AM'}`,
        utcOffset: timeInfo.utcOffsetString,
        utcOffsetMinutes: timeInfo.utcOffsetMinutes,
        abbreviation: timeInfo.abbreviation,
        isDst: timeInfo.isDst,
        date: `${timeInfo.year}-${String(timeInfo.month).padStart(2, '0')}-${String(timeInfo.day).padStart(2, '0')}`,
        weekday: timeInfo.dayOfWeek,
      },
    },
    rateLimit: {
      tier: 'anonymous',
      limit: '100 requests per minute',
      remaining: 99,
    }
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
