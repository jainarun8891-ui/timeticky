import React from 'react';
import { notFound } from 'next/navigation';
import { findCityByRootSlug } from '@/lib/geo/city-lookup';
import { MoonClient } from '../MoonClient';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);
  if (!city) return {};

  return {
    title: `Moon Phase in ${city.name}, ${city.country} Today — Lunar Illumination & Calendar`,
    description: `Current moon phase, illumination percentage, and lunar calendar for ${city.name} (${city.country}). View next Full Moon and New Moon dates.`,
    alternates: {
      canonical: `https://globaltime.org/moon/${rawSlug}`,
    },
    openGraph: {
      title: `Moon Phase in ${city.name} — GlobalTime`,
      description: `Today's moon phase, illumination %, and lunar calendar in ${city.name}.`,
      url: `https://globaltime.org/moon/${rawSlug}`,
      type: 'website',
    },
  };
}

export default async function CityMoonPage({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const faqs = [
    {
      question: `Is the moon phase in ${city.name} the same as the rest of the world?`,
      answer: `Yes. Lunar phases are caused by the relative geometry of the Sun, Earth, and Moon in space, so the phase and percentage illumination are essentially identical worldwide at any given moment.`
    },
    {
      question: `Does the Moon look different in the Northern vs Southern Hemisphere?`,
      answer: `While the illumination percentage is identical, observers in the Southern Hemisphere see the Moon upside down relative to Northern Hemisphere observers (the illuminated crescent appears on the opposite side).`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Moon Phases', url: '/moon' }, { name: `${city.name}, ${city.country}`, url: `/moon/${rawSlug}` }]} />

      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 inline-block">
            Lunar Ephemeris: {city.name}, {city.country}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Moon Phase in {city.name}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Track current optical phase, illumination percentage, and upcoming full moon countdown in {city.name}.
          </p>
        </div>
      </div>

      <MoonClient initialCity={city} />

      <div className="pt-4">
        <FaqAccordion
          title={`Frequently Asked Questions: Moon in ${city.name}`}
          subtitle="Learn about astronomical observation and lunar cycles."
          items={faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath={`/moon/${rawSlug}`}
        title={`Explore More Astronomy Tools for ${city.name}`}
        subtitle="Check sunrise, sunset, and daylight progression."
      />
    </div>
  );
}
