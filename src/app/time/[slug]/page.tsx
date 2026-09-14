import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
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
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { getCityFaqs } from '@/lib/seo/page-faqs';

export async function generateStaticParams() {
  return getAllCities().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: 'Location Not Found' };
  const title = `Time in ${city.name}, ${city.country} Now`;
  const desc = `Current local time in ${city.name}, ${city.country}. Timezone: ${city.timezone}, UTC offset, sunrise, sunset, and daylight hours.`;
  return buildPageMetadata(title, desc, `/time/${city.slug}`);
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
      {/* Standardized Breadcrumbs with JSON-LD Microdata */}
      <Breadcrumbs
        items={[
          { name: country?.name || city.country, url: `/country/${country?.slug || 'world'}` },
          { name: city.name, url: `/time/${city.slug}` }
        ]}
      />

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
                href={`/time/${other.slug}`}
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
    
      <FaqAccordion items={getCityFaqs(city)} title={`Frequently Asked Questions About ${city.name} Time`} />
      <RelatedLinksHub />
    </div>
  );
}
