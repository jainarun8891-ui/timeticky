import { NextRequest, NextResponse } from 'next/server';
import { findCityByRootSlug } from '@/lib/geo/city-lookup';
import { getSolarTimes } from '@/lib/astronomy/calculator';
import { getUtcOffsetMinutes } from '@/lib/time/engine';

interface Props {
  params: Promise<{ city: string }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const { city: slug } = await params;
  const cityData = findCityByRootSlug(slug);

  if (!cityData) {
    return NextResponse.json({
      status: 'error',
      message: `Location '${slug}' not found for solar ephemeris calculations`,
    }, { status: 404 });
  }

  const now = new Date();
  const offsetMinutes = getUtcOffsetMinutes(cityData.timezone, now);
  const solar = getSolarTimes(cityData.lat, cityData.lng, now, offsetMinutes);

  return NextResponse.json({
    status: 'success',
    data: {
      location: cityData.name,
      country: cityData.country,
      timezone: cityData.timezone,
      coordinates: {
        latitude: cityData.lat,
        longitude: cityData.lng,
      },
      date: now.toISOString().split('T')[0],
      solar: {
        sunrise: solar.sunrise,
        sunset: solar.sunset,
        solarNoon: solar.solarNoon,
        dayLength: solar.dayLength,
        dayLengthMinutes: solar.dayLengthMinutes,
        civilDawn: solar.civilTwilight.dawn,
        civilDusk: solar.civilTwilight.dusk,
        nauticalDawn: solar.nauticalTwilight.dawn,
        nauticalDusk: solar.nauticalTwilight.dusk,
        astronomicalDawn: solar.astronomicalTwilight.dawn,
        astronomicalDusk: solar.astronomicalTwilight.dusk,
        isDaytime: solar.isDaytime,
      },
    },
    rateLimit: {
      tier: 'anonymous',
      limit: '100 requests per minute',
      remaining: 99,
    }
  }, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
