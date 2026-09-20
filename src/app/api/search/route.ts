import { NextRequest, NextResponse } from 'next/server';
import { searchCities } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { TIMEZONES } from '@/lib/time/timezones';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { COUNTRIES } from '@/lib/geo/countries';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  if (!q.trim()) {
    return NextResponse.json({ results: [] });
  }

  const query = q.toLowerCase().trim();
  const cityResults = searchCities(query).slice(0, 6).map(c => ({
    type: 'city',
    id: c.id,
    title: `${c.name}, ${c.country}`,
    subtitle: c.timezone,
    slug: `/${getCityRootSlug(c)}`,
    countryCode: c.countryCode
  }));

  const countryResults = Object.values(COUNTRIES)
    .filter(c => c.name.toLowerCase().includes(query) || c.code.toLowerCase() === query)
    .slice(0, 3)
    .map(c => ({
      type: 'country',
      id: c.code,
      title: `${c.name} ${c.flag}`,
      subtitle: `Capital: ${c.capital} • ${c.timezones[0]}`,
      slug: `/country/${c.slug}`,
      countryCode: c.code
    }));

  const standardTz = TIMEZONES
    .filter(t => t.name.toLowerCase().includes(query) || t.shortName.toLowerCase().includes(query) || t.id.toLowerCase().includes(query))
    .slice(0, 2)
    .map(t => ({
      type: 'timezone',
      id: t.id,
      title: `${t.name} (${t.shortName})`,
      subtitle: t.formattedOffset,
      slug: `/timezone/${t.shortName.toLowerCase()}`,
      countryCode: ''
    }));

  const ianaResults = ALL_IANA_TIMEZONES
    .filter(t => t.city.toLowerCase().includes(query) || t.id.toLowerCase().includes(query) || t.formattedOffset.toLowerCase().includes(query))
    .slice(0, 4)
    .map(t => ({
      type: 'iana-timezone',
      id: t.id,
      title: `${t.city} (${t.id})`,
      subtitle: `${t.region} • ${t.formattedOffset}`,
      slug: `/time-zones?q=${encodeURIComponent(t.city)}`,
      countryCode: ''
    }));

  return NextResponse.json({
    results: [...cityResults, ...countryResults, ...standardTz, ...ianaResults]
  });
}
