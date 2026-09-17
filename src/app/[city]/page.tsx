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
      canonical: `https://timenumbers.com/${cleanSlug}`,
    },
    openGraph: {
      title: `Current Time in ${city.name} — TimeNumbers`,
      description: `Check precision local time in ${city.name} (${city.country}) with live seconds and atomic clock synchronization.`,
      url: `https://timenumbers.com/${cleanSlug}`,
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
      answer: `TimeNumbers calculates the current local time in ${city.name} using atomic NTP synchronization against the canonical ${city.timezone} IANA time zone rules.`
    },
    {
      question: `Does ${city.name} observe Daylight Saving Time (DST)?`,
      answer: `${city.name} follows the daylight saving schedule of ${city.country}. During summer months, clocks may advance by one hour.`
    },
    {
      question: `What is the UTC offset for ${city.name}?`,
      answer: `The official time zone identifier for ${city.name} is ${city.timezone}. You can see the live calculated standard or daylight offset in the header above.`
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
