import React from 'react';
import { notFound } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug } from '@/lib/geo/city-lookup';
import { MoonClient } from '../MoonClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Moon, Sparkles, Orbit, Compass, Clock, Sun, MapPin } from 'lucide-react';
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
  if (!city) return buildPageMetadata('City Not Found', 'City lunar ephemeris not found.', `/moon/${rawSlug}`);

  const cleanSlug = getCityRootSlug(city);
  return buildPageMetadata(
    `Moon Phase in ${city.name}, ${city.country} Today (Live Illumination)`,
    `Tonight's exact moon phase, surface illumination percentage, moon age, and lunar calendar for ${city.name} (${city.country}). Coordinates: ${city.lat.toFixed(2)}°, ${city.lng.toFixed(2)}°. Next Full Moon and New Moon dates.`,
    `/moon/${cleanSlug}`
  );
}

export default async function CityMoonPage({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const cleanSlug = getCityRootSlug(city);
  const isNorthern = city.lat >= 0;
  const absLat = Math.abs(city.lat);
  const isTropical = absLat < 23.5;

  const faqs = [
    {
      question: `What is the current moon phase in ${city.name} tonight?`,
      answer: `Tonight's moon phase and percentage surface illumination in ${city.name} (${city.country}) are calculated using synodic astronomical ephemeris models. Because the moon phase is governed by the relative celestial alignment of the Sun, Earth, and Moon, the phase and illumination percentage are identical worldwide at any given UTC second.`
    },
    {
      question: `How does the Moon appear visually from ${city.name}'s latitude (${city.lat.toFixed(2)}°)?`,
      answer: isTropical
        ? `Located at tropical latitude ${city.lat.toFixed(2)}°, observers in ${city.name} frequently witness the distinctive "wet moon" or "Cheshire Cat moon", where the crescent appears horizontally illuminated on the bottom like a glowing celestial boat as it rises and sets near the zenith.`
        : isNorthern
        ? `Located in the Northern Hemisphere at latitude ${city.lat.toFixed(2)}°, observers in ${city.name} look south to view the Moon. During waxing phases, illumination begins on the right edge and expands inward toward the left, whereas waning phases diminish from right to left.`
        : `Located in the Southern Hemisphere at latitude ${city.lat.toFixed(2)}°, observers in ${city.name} face north to view the Moon. As a result, the optical orientation is inverted compared to northern skies: waxing illumination begins on the left limb and progresses rightward toward Full Moon.`
    },
    {
      question: `When are the next Full Moon and New Moon visible in ${city.name}?`,
      answer: `Our live lunar engine displays the exact real-time countdown to the next upcoming astronomical Full Moon and New Moon in the ${city.timezone} time zone, helping night-sky observers and astrophotographers plan sessions around peak illumination or dark skies.`
    },
    {
      question: `How does the lunar cycle influence tides near ${city.name}?`,
      answer: `During New Moon and Full Moon phases (syzygy), solar and lunar gravitational pulls combine to create Spring Tides with the highest high-tides and lowest low-tides of the month. During the Quarter phases (quadrature), tidal forces pull at right angles, resulting in milder Neap Tides with minimal sea-level range.`
    },
    {
      question: `What is the best time for stargazing and astrophotography in ${city.name}?`,
      answer: `The ideal window for stargazing in ${city.name} is during the New Moon and surrounding crescent phases (lunar illumination < 15%), when the absence of moonlight allows faint nebulae, star clusters, and the Milky Way to stand out with maximum contrast against dark skies.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { name: 'Moon', url: '/moon' },
          { name: `${city.name} Moon Phase`, url: `/moon/${cleanSlug}` },
        ]}
      />
      <JsonLd type="faq" data={faqs} />
      <JsonLd
        type="application"
        data={{
          name: `${city.name} Moon Phase & Lunar Tracker`,
          category: "UtilitiesApplication",
          description: `Live daily moon phase calculations, illumination percentage, and lunar calendar for ${city.name}, ${city.country}.`
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Moon className="w-3.5 h-3.5" />
            <span>{city.name}, {city.country} Lunar Ephemeris</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Moon Phase in {city.name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Live astronomical calculations for tonight&apos;s lunar phase, surface illumination percentage, moon age in days, and milestone full moon countdown in {city.name}. Coordinates: {city.lat.toFixed(4)}°, {city.lng.toFixed(4)}° ({city.timezone}).
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <Link
              href={`/sun/${cleanSlug}`}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Sunrise & Sunset in {city.name}</span>
            </Link>
            <Link
              href={`/time/${cleanSlug}`}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Current Time in {city.name}</span>
            </Link>
          </div>
        </div>
      </div>

      <MoonClient initialCity={city} />

      {/* City-Specific Astronomical Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Compass className="w-4 h-4" />
            <span>Latitudinal Perspective & Sky Geometry</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            How the Moon Appears from {city.name}
          </h2>
          <p>
            While the physical percentage of the Moon lit by the Sun is universal across the entire globe, the visual angle and orientation of the illuminated crescent in the night sky depend entirely on your vantage point in <strong>{city.name} ({city.lat.toFixed(2)}° latitude)</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Hemisphere Orientation</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                {isNorthern ? 'Northern Sky Perspective' : 'Southern Sky Perspective'}
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                {isNorthern
                  ? 'Facing south, waxing crescents are lit on the right side ("D" shape), while waning crescents appear on the left ("C" shape).'
                  : 'Facing north, waxing crescents appear lit on the left side, with waning crescents illuminated on the right side.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Zenith Path & Crescent Angle</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                {isTropical ? 'High Zenith / Cheshire Cat Arc' : 'Oblique Southern Arc'}
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                {isTropical
                  ? `At latitude ${city.lat.toFixed(2)}°, the Moon passes nearly directly overhead, producing horizontal cradle-shaped crescents.`
                  : `At latitude ${city.lat.toFixed(2)}°, the Moon follows an inclined path across the sky with pronounced tilted illumination angles.`}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Synodic Month Tracking</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                29.53 Days Per Full Cycle
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                From {city.name}, the Moon cycles through all 8 phases over 29 days, 12 hours, and 44 minutes, synchronizing tide cycles and night-sky luminosity.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="pt-4">
        <FaqAccordion
          title={`Frequently Asked Questions: Moon in ${city.name}`}
          subtitle={`Learn how lunar ephemeris and orbital geometry shape nighttime viewing in ${city.name}.`}
          items={faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath={`/moon/${cleanSlug}`}
        title={`Explore More Astronomy Tools for ${city.name}`}
        subtitle={`Check sunrise and sunset times, convert time zones, or test atomic clock accuracy.`}
      />
    </div>
  );
}
