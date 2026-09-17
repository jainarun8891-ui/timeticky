import React from 'react';
import { notFound } from 'next/navigation';
import { findCityByRootSlug } from '@/lib/geo/city-lookup';
import { SunriseSunsetClient } from '../SunriseSunsetClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const popular = ['delhi', 'new-york', 'london', 'paris', 'tokyo', 'sydney', 'mumbai', 'dubai', 'singapore'];
  return popular.map(city => ({ city }));
}

import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);
  if (!city) return buildPageMetadata('City Not Found', 'City sunrise and sunset times not found.', `/sunrise-sunset/${rawSlug}`);

  return buildPageMetadata(
    `${city.name} Sunrise & Sunset Times Today`,
    `Exact sunrise, sunset, dawn, dusk, civil twilight times, and day length for ${city.name} (${city.country}). Updated daily using high-precision NOAA solar formulas.`,
    `/sunrise-sunset/${rawSlug}`
  );
}

export default async function CitySunriseSunsetPage({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const faqs = [
    {
      question: `What time is sunrise in ${city.name} today?`,
      answer: `We calculate today's sunrise, sunset, and twilight phases in ${city.name} (${city.country}) based on its precise coordinates (${city.lat.toFixed(2)}°, ${city.lng.toFixed(2)}°). The calculations factor in solar elevation and dawn twilight so photographers, travelers, and early risers can plan with confidence.`
    },
    {
      question: `What time does sunset occur in ${city.name}?`,
      answer: `Sunset in ${city.name} occurs when the sun drops below the horizon. The civil twilight continues for approximately 25–35 minutes after sunset.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Sunrise & Sunset', url: '/sunrise-sunset' }, { name: `${city.name}, ${city.country}`, url: `/sunrise-sunset/${rawSlug}` }]} />

      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 inline-block">
            Solar Ephemeris: {city.name}, {city.country}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Sunrise & Sunset in {city.name}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Detailed solar progression, daylight length, solar noon, and civil twilight for {city.name}.
          </p>
        </div>
      </div>

      <SunriseSunsetClient initialCity={city} />

      <div className="pt-4">
        <FaqAccordion
          title={`Frequently Asked Questions About Sunrise in ${city.name}`}
          subtitle="Learn how solar noon and twilight hours shift throughout the seasons."
          items={faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath={`/sunrise-sunset/${rawSlug}`}
        title={`Explore More Tools for ${city.name}`}
        subtitle="Compare times, plan meetings, or check local time zone details."
      />
    </div>
  );
}
