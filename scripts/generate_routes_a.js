const fs = require('fs');
const path = require('path');

function write(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Wrote:', relPath);
}

// 1. /time/[slug]/page.tsx
write('src/app/time/[slug]/page.tsx', `
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCityBySlug, getAllCities, CITIES } from '@/lib/geo/cities';
import { getCountryByCode } from '@/lib/geo/countries';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, isDstActive, getTimeDifference } from '@/lib/time/timezones';
import { getSunTimes } from '@/lib/astronomy/sun';
import { buildPageMetadata, generatePlaceSchema } from '@/lib/seo/metadata';
import { SunDaylightCard } from '@/components/dashboard/SunDaylightCard';
import { TimeDifferenceCard } from '@/components/dashboard/TimeDifferenceCard';
import { HeroClockCard } from '@/components/dashboard/HeroClockCard';
import { ChevronRight, Globe, Calendar, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  return getAllCities().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: 'Location Not Found' };
  const title = \`Time in \${city.name}, \${city.country} Now\`;
  const desc = \`Current local time in \${city.name}, \${city.country}. Timezone: \${city.timezone}, UTC offset, sunrise, sunset, and daylight hours.\`;
  return buildPageMetadata(title, desc, \`/time/\${city.slug}\`);
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const country = getCountryByCode(city.countryCode);
  const now = new Date();
  const sun = getSunTimes(now, city.lat, city.lng, city.timezone);
  const dst = isDstActive(now, city.timezone);
  const nearbyCities = CITIES.filter(c => c.timezone === city.timezone && c.id !== city.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link href={\`/country/\${country?.slug || 'world'}\`} className="hover:text-blue-600">
          {country?.name || city.country}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-slate-900 dark:text-white">{city.name}</span>
      </nav>

      {/* Hero Live Clock */}
      <HeroClockCard currentCity={city} />

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Geographic & Timezone Specs */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
            Location Overview
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Country</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{city.country}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Timezone</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{city.timezone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Coordinates</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                {city.lat.toFixed(4)}° N, {city.lng.toFixed(4)}° E
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Daylight Saving</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {dst ? 'Currently Active' : 'Not Active'}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-400">Population</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{city.population || 'Major city'}</span>
            </div>
          </div>
        </div>

        {/* Sun & Daylight */}
        <SunDaylightCard currentCity={city} />

        {/* Time Difference */}
        <TimeDifferenceCard currentCity={city} />
      </div>

      {/* Cities in Same Timezone / Nearby */}
      {nearbyCities.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Other Cities in {city.timezone}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {nearbyCities.map((other) => (
              <Link
                key={other.id}
                href={\`/time/\${other.slug}\`}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors block border border-slate-100 dark:border-slate-700"
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{other.name}</span>
                <span className="text-[11px] text-slate-400 block">{other.country}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePlaceSchema(city.name, city.country, city.lat, city.lng, city.timezone))
        }}
      />
    </div>
  );
}
`);

// 2. /country/[slug]/page.tsx
write('src/app/country/[slug]/page.tsx', `
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCountryBySlug, getAllCountries } from '@/lib/geo/countries';
import { getCitiesByCountry } from '@/lib/geo/cities';
import { formatTimeInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe, Clock, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  return getAllCountries().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found' };
  return buildPageMetadata(
    \`Current Time in \${country.name}\`,
    \`Current local times across \${country.name}, capital time in \${country.capital}, timezones used, and daylight saving status.\`,
    \`/country/\${country.slug}\`
  );
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const cities = getCitiesByCountry(country.code);
  const now = new Date();
  const capitalTime = formatTimeInZone(now, country.timezones[0], false, true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-slate-900 dark:text-white">{country.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Time in {country.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Capital: <span className="font-semibold text-slate-700 dark:text-slate-300">{country.capital}</span> • Population: {country.population}
              </p>
            </div>
          </div>

          <div className="text-right bg-blue-50 dark:bg-slate-800 px-5 py-3 rounded-2xl border border-blue-100 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 font-medium block">Capital Time ({country.capital})</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{capitalTime}</span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block">{getUtcOffsetString(now, country.timezones[0])}</span>
          </div>
        </div>

        {country.dstNotes && (
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200">Daylight Saving Rule: </span>
            {country.dstNotes}
          </div>
        )}
      </div>

      {/* Major Cities List */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Major Cities in {country.name}
        </h2>

        {cities.length === 0 ? (
          <p className="text-xs text-slate-400">Primary timezone: {country.timezones.join(', ')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cities.map((city) => {
              const localTime = formatTimeInZone(now, city.timezone, false, false);
              return (
                <Link
                  key={city.id}
                  href={\`/time/\${city.slug}\`}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-all"
                >
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">{city.name}</span>
                    <span className="text-[11px] text-slate-400 block">{city.timezone}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono block">{localTime}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{getUtcOffsetString(now, city.timezone)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
`);

// 3. /time-zones/page.tsx
write('src/app/time-zones/page.tsx', `
import React from 'react';
import Link from 'next/link';
import { TIMEZONES } from '@/lib/time/timezones';
import { formatTimeInZone } from '@/lib/time/timezones';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Clock, Globe } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Global Time Zones Directory',
  'Browse standard global time zones, UTC offsets, IANA identifiers, and Daylight Saving Time rules.',
  '/time-zones'
);

export default function TimeZonesPage() {
  const now = new Date();
  const regions = ["UTC", "Europe", "Americas", "Asia", "Australia", "Africa"] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          World Time Zones Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore global timezones, abbreviations, current times, and UTC offsets.
        </p>
      </div>

      <div className="space-y-8">
        {regions.map((region) => {
          const zones = TIMEZONES.filter(t => t.region === region);
          if (zones.length === 0) return null;

          return (
            <section key={region} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                {region}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {zones.map((tz) => {
                  const time = formatTimeInZone(now, tz.id === 'UTC' ? 'UTC' : tz.id, false, false);

                  return (
                    <Link
                      key={tz.id}
                      href={\`/time-zone/\${tz.shortName.toLowerCase()}\`}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-700/60 border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-sm text-slate-900 dark:text-white block">
                          {tz.name}
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                          {tz.shortName} • {tz.formattedOffset}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-mono font-bold text-slate-900 dark:text-white block">
                          {time}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {tz.hasDst ? 'Observes DST' : 'No DST'}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
`);

// 4. /time-zone/[slug]/page.tsx
write('src/app/time-zone/[slug]/page.tsx', `
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TIMEZONES, getTimeZoneBySlug, formatTimeInZone, isDstActive } from '@/lib/time/timezones';
import { getCitiesByTimezone } from '@/lib/geo/cities';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Clock, Globe, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  return TIMEZONES.map(t => ({ slug: t.shortName.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tz = getTimeZoneBySlug(slug);
  if (!tz) return { title: 'Time Zone Not Found' };
  return buildPageMetadata(
    \`\${tz.name} (\${tz.shortName}) Now\`,
    \`Current time in \${tz.name} (\${tz.shortName}), UTC offset \${tz.formattedOffset}, countries using it, and DST rules.\`,
    \`/time-zone/\${tz.shortName.toLowerCase()}\`
  );
}

export default async function TimeZoneDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tz = getTimeZoneBySlug(slug);
  if (!tz) notFound();

  const now = new Date();
  const time = formatTimeInZone(now, tz.id === 'UTC' ? 'UTC' : tz.id, false, true);
  const cities = getCitiesByTimezone(tz.id);
  const dstActive = isDstActive(now, tz.id === 'UTC' ? 'UTC' : tz.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link href="/time-zones" className="hover:text-blue-600">
          Time Zones
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-slate-900 dark:text-white">{tz.shortName}</span>
      </nav>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {tz.region} Timezone
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              {tz.name} ({tz.shortName})
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Standard Offset: {tz.formattedOffset} • IANA: {tz.id}
            </p>
          </div>

          <div className="text-center bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-2xl border border-slate-200/70 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 font-medium block">Live Time</span>
            <span className="text-3xl font-mono font-black text-slate-900 dark:text-white block">{time}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">● Atomic Synced</span>
          </div>
        </div>

        {tz.isAmbiguous && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
            <span className="font-bold">Note on Ambiguity: </span>
            {tz.ambiguityNote}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Daylight Saving Status:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {tz.hasDst ? (dstActive ? 'Currently active (clocks shifted 1 hour)' : 'Observed during summer months') : 'Does not observe Daylight Saving Time'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Countries / Territories:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {tz.countries.join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Cities using this Timezone */}
      {cities.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Major Cities in {tz.shortName}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={\`/time/\${city.slug}\`}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700"
              >
                <span className="font-bold text-sm text-slate-900 dark:text-white block">{city.name}</span>
                <span className="text-xs text-slate-400 block">{city.country}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
`);

console.log('Routes Group A generated successfully');
