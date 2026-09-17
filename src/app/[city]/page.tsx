import React from 'react';
import { notFound } from 'next/navigation';
import { findCityByRootSlug } from '@/lib/geo/city-lookup';
import { CityPageClient } from './CityPageClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const popular = [
    'new-york', 'london', 'delhi', 'mumbai', 'tokyo', 'dubai',
    'singapore', 'sydney', 'paris', 'berlin', 'san-francisco',
    'toronto', 'rome', 'madrid', 'cairo', 'seoul', 'bengaluru',
    'chicago', 'los-angeles', 'zurich'
  ];
  return popular.map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);
  if (!city) return {};

  const cleanSlug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return {
    title: `Current Time in ${city.name}, ${city.country} — Live Clock & Time Zone`,
    description: `Exact current local time in ${city.name}, ${city.country}. Includes ${city.timezone} time zone, UTC offset, sunrise, sunset, day length, and live global time difference comparisons.`,
    alternates: {
      canonical: `https://www.timenumbers.com/${cleanSlug}`,
    },
    openGraph: {
      title: `Current Time in ${city.name} — TimeNumbers`,
      description: `Check precision local time in ${city.name} (${city.country}) with live seconds and atomic clock synchronization.`,
      url: `https://www.timenumbers.com/${cleanSlug}`,
      type: 'website',
    },
  };
}

export default async function RootCityPage({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const cleanSlug = city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const cityFaqs = [
    {
      question: `What time is it in ${city.name} right now?`,
      answer: `The live clock above shows the exact, synchronized local time in ${city.name}, ${city.country}. It updates in real time to the second, calibrated directly with official atomic reference clocks so you always see the true local time.`
    },
    {
      question: `Does ${city.name} change clocks for Daylight Saving Time?`,
      answer: `${city.name} follows the regional time conventions for ${city.country} (${city.timezone}). If daylight saving time is active, our clock automatically factors in the one-hour shift so you never have to guess standard vs daylight hours.`
    },
    {
      question: `What is the current UTC offset for ${city.name}?`,
      answer: `${city.name} belongs to the ${city.timezone} time zone. Its exact hour difference from Coordinated Universal Time (UTC) is shown right beneath the main clock above, alongside today's sunrise, sunset, and daylight duration.`
    },
    {
      question: `What are typical business hours in ${city.name}?`,
      answer: `Standard office and business hours in ${city.name} generally run from 9:00 AM to 5:00 PM local time, Monday through Friday. Use our interactive converter below to easily coordinate international meetings during shared waking hours.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Semantic Breadcrumbs & Schema.org JSON-LD */}
      <Breadcrumbs
        items={[
          { name: 'Cities', url: '/cities' },
          { name: `${city.name}, ${city.country}`, url: `/${cleanSlug}` },
        ]}
      />

      <CityPageClient city={city} />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={cityFaqs} />
      </div>

      <RelatedLinksHub title={`Explore More Locations Near ${city.name}`} />
    </div>
  );
}
