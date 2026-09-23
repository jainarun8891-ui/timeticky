import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getCityBySlug, City, CITIES } from '@/lib/geo/cities';
import { CompareCitiesClient } from '@/components/converter/CompareCitiesClient';
import { ArrowLeftRight } from 'lucide-react';

interface Props {
  params: Promise<{
    cities: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cities } = await params;
  if (!cities || cities.length === 0) {
    return buildPageMetadata('Compare Cities', 'Compare time across world locations.', '/converter/compare');
  }

  const resolvedCities = cities
    .map(slug => getCityBySlug(slug))
    .filter(Boolean) as City[];

  const cityNames = resolvedCities.map(c => c.name);
  const title = cityNames.length >= 2
    ? `Time Comparison: ${cityNames.slice(0, 3).join(' vs ')} — Live Clocks & Differences`
    : `Compare Time Across Cities`;

  const description = `Live interactive time difference comparator between ${cityNames.join(', ')}. Compare current clocks, UTC offsets, and working hour overlaps.`;
  const canonicalPath = `/converter/compare/${cities.join('/')}`;

  return buildPageMetadata(title, description, canonicalPath);
}

const COMPARE_FAQS = [
  {
    question: "How is the time difference between multiple cities calculated?",
    answer: "Every city's local time is determined from Coordinated Universal Time (UTC) using the authoritative IANA Time Zone Database (tzdb). The relative hour difference is calculated directly against your selected base location."
  },
  {
    question: "How does Daylight Saving Time affect these comparisons?",
    answer: "Whenever any of the compared regions enters or exits Daylight Saving Time (summer time), the offset shifts automatically. TimeNumbers guarantees zero manual adjustments required."
  },
  {
    question: "Can I add more locations to this comparison view?",
    answer: "Yes! Use the 'Add More World Cities' buttons below the cards to add up to 10 international locations to this comparative matrix simultaneously."
  }
];

export default async function ConverterCompareCitiesPage({ params }: Props) {
  const { cities } = await params;
  if (!cities || cities.length === 0) {
    notFound();
  }

  const resolvedCities = cities
    .map(slug => getCityBySlug(slug))
    .filter(Boolean) as City[];

  const initialCities = resolvedCities.length >= 1 ? resolvedCities : CITIES.slice(0, 3);
  const cityLabels = initialCities.map(c => c.name).join(' vs ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Converter', url: '/converter' },
          { name: 'Compare Cities', url: '/converter/compare' },
          { name: cityLabels, url: `/converter/compare/${cities.join('/')}` },
        ]}
      />

      <JsonLd type="faq" data={COMPARE_FAQS} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Interactive Multi-City Comparator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            {initialCities.map(c => c.name).join(' vs ')} Time Comparison
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Live atomic comparison between {initialCities.map(c => `${c.name} (${c.country})`).join(', ')}. Compare current clocks, UTC offsets, and working hour overlaps.
          </p>
        </div>
      </div>

      <CompareCitiesClient initialCities={initialCities} />

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={COMPARE_FAQS} />
      </div>

      <RelatedLinksHub />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `${cityLabels} Time Comparison`,
            "url": `https://www.timenumbers.com/converter/compare/${cities.join('/')}`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
