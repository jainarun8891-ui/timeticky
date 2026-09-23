import React from 'react';
import { notFound } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug } from '@/lib/geo/city-lookup';
import { SunriseSunsetClient } from '@/components/tools/SunriseSunsetClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Sun, Camera, Compass, Eye, MapPin, Sparkles, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const popular = ['delhi', 'new-york', 'london', 'paris', 'tokyo', 'sydney', 'mumbai', 'dubai', 'singapore', 'berlin', 'san-francisco', 'toronto'];
  return popular.map(city => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);
  if (!city) return buildPageMetadata('City Not Found', 'City sunrise and sunset times not found.', `/sun/${rawSlug}`);

  const cleanSlug = getCityRootSlug(city);
  return buildPageMetadata(
    `Sunrise & Sunset in ${city.name}, ${city.country} Today (Solar Times)`,
    `Today's sunrise, sunset, dawn, dusk, civil twilight times, and day length for ${city.name} (${city.country}). Coordinates: ${city.lat.toFixed(2)}°, ${city.lng.toFixed(2)}°. High-precision NOAA solar predictions.`,
    `/sun/${cleanSlug}`
  );
}

export default async function CitySunriseSunsetPage({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const cleanSlug = getCityRootSlug(city);
  const isNorthern = city.lat >= 0;
  const absLat = Math.abs(city.lat);
  const isHighLat = absLat > 45;
  const isTropical = absLat < 23.5;

  const faqs = [
    {
      question: `What time is sunrise and sunset in ${city.name} today?`,
      answer: `Today's exact sunrise and sunset times in ${city.name} (${city.country}) are computed using high-precision NOAA solar ephemeris algorithms for coordinates ${city.lat.toFixed(4)}° latitude and ${city.lng.toFixed(4)}° longitude. The calculations account for atmospheric refraction (34 arcminutes) and local elevation.`
    },
    {
      question: `How long is the daylight duration in ${city.name} across different seasons?`,
      answer: isTropical
        ? `Located at latitude ${city.lat.toFixed(2)}°, ${city.name} lies within the tropical zone. As a result, day length remains remarkably steady throughout the entire year, fluctuating by less than an hour between the summer and winter solstices (typically around 11.5 to 12.8 hours).`
        : isHighLat
        ? `At latitude ${city.lat.toFixed(2)}°, ${city.name} experiences dramatic seasonal daylight swings. In mid-summer around the June solstice (Northern) or December solstice (Southern), daylight extends up to 16–17 hours with prolonged twilight, while mid-winter daylight contracts to approximately 7.5–8.5 hours.`
        : `At latitude ${city.lat.toFixed(2)}°, ${city.name} experiences temperate seasonal variations. Daylight stretches to approximately 14–15 hours during mid-summer and contracts to roughly 9–10 hours during mid-winter.`
    },
    {
      question: `When are the Golden Hour and Blue Hour in ${city.name}?`,
      answer: `The morning Golden Hour begins at sunrise and lasts for approximately 45–60 minutes, while the evening Golden Hour starts about an hour before sunset. The Blue Hour occurs immediately following sunset (and before dawn) during civil twilight when the sun is between 0° and 6° below the horizon, creating vivid deep blue and indigo skylines across ${city.name}.`
    },
    {
      question: `When does Solar Noon occur in ${city.name}?`,
      answer: `Solar Noon in ${city.name} is the exact astronomical instant when the sun crosses the local meridian (${city.lng.toFixed(2)}° longitude) and reaches its maximum daily elevation. Depending on the time of year (the Equation of Time) and whether daylight saving time is active, Solar Noon generally falls between 11:45 AM and 1:30 PM in the ${city.timezone} zone.`
    },
    {
      question: `How long does civil twilight last in ${city.name}?`,
      answer: `In ${city.name}, civil twilight typically lasts between 25 and 45 minutes after sunset. Because the angle at which the sun sinks below the horizon depends on latitude (${city.lat.toFixed(2)}°), twilight duration increases in the summer months and is longer than in equatorial regions.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { name: 'Sun', url: '/sun' },
          { name: `${city.name} Solar Times`, url: `/sun/${cleanSlug}` },
        ]}
      />
      <JsonLd type="faq" data={faqs} />
      <JsonLd
        type="application"
        data={{
          name: `${city.name} Sunrise & Sunset Calculator`,
          category: "UtilitiesApplication",
          description: `Live daily sunrise, sunset, civil twilight, and solar noon calculator for ${city.name}, ${city.country}.`
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Sun className="w-3.5 h-3.5" />
            <span>{city.name}, {city.country} Solar Ephemeris</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Sunrise & Sunset in {city.name}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Accurate daily dawn, dusk, civil twilight, solar noon, and day length schedule for {city.name}. Coordinates: {city.lat.toFixed(4)}° {city.lat >= 0 ? 'N' : 'S'}, {Math.abs(city.lng).toFixed(4)}° {city.lng >= 0 ? 'E' : 'W'} ({city.timezone}).
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <Link
              href={`/time/${cleanSlug}`}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Current Time in {city.name}</span>
            </Link>
            <Link
              href={`/moon/${cleanSlug}`}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Moon Phases in {city.name}</span>
            </Link>
          </div>
        </div>
      </div>

      <SunriseSunsetClient initialCity={city} />

      {/* In-Depth City Solar Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Compass className="w-4 h-4" />
            <span>Geographical Solar Characteristics</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Solar Profile & Seasonal Cycles in {city.name}
          </h2>
          <p>
            Positioned at <strong>{city.lat.toFixed(4)}° latitude</strong> and <strong>{city.lng.toFixed(4)}° longitude</strong>, {city.name} operates under the <strong>{city.timezone}</strong> time standard. The local solar trajectory is determined by Earth&apos;s axial tilt relative to {city.name}&apos;s geographic latitude:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Hemisphere & Zone</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                {isNorthern ? 'Northern' : 'Southern'} Hemisphere • {isTropical ? 'Tropical Zone' : isHighLat ? 'Sub-Polar / High Temperate' : 'Temperate Zone'}
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                {isNorthern ? 'Longest daylight occurs around June 21; shortest daylight occurs around December 21.' : 'Longest daylight occurs around December 21; shortest daylight occurs around June 21.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Atmospheric Refraction Lift</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                +34 Arcminutes (~0.566°)
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                Atmospheric bending causes the sun to become visible approximately 2.5 to 3.5 minutes prior to true geometric sunrise in {city.name}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Solar Noon Variance</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                Equation of Time Drift
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                Depending on the time of year, true astronomical midday in {city.name} deviates from clock midday by up to ±16 minutes due to orbital eccentricity.
              </p>
            </div>
          </div>
        </section>

        {/* Photography Lighting Guide */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Camera className="w-4 h-4" />
            <span>Cinematography & Photography Protocol</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Golden Hour & Blue Hour Photography Windows in {city.name}
          </h2>
          <p>
            For landscape photographers, videographers, and creators in {city.name}, the hour surrounding sunrise and sunset provides the most flattering, diffuse natural lighting:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-slate-800/70 border border-amber-200/70 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-bold text-amber-900 dark:text-amber-300">Golden Hour (Warm Spectrum)</strong>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">Sun +6° to 0°</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Light rays travel through extensive atmospheric air masses, scattering high-frequency blue photons and bathing {city.name}&apos;s skyline and landscapes in warm amber, gold, and terracotta hues with long, soft shadows.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/70 border border-indigo-200/70 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-bold text-indigo-900 dark:text-indigo-300">Blue Hour (Indigo & Cobalt)</strong>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-200/60 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200">Sun 0° to -6°</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Occurring during civil twilight, Chappuis ozone absorption filters longer red wavelengths, producing balanced cobalt twilight skies that contrast against the warm artificial architectural lighting of {city.name}.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={faqs} />
      </div>

      <RelatedLinksHub
        currentPath={`/sun/${cleanSlug}`}
        title={`Explore More Time Tools for ${city.name}`}
        subtitle={`Check live clocks, moon phase cycles, or compare ${city.name} with other global metropolises.`}
      />
    </div>
  );
}
