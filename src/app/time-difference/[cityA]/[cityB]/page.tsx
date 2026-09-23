import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug, POPULAR_TIME_DIFFERENCE_PAIRS } from '@/lib/geo/city-lookup';
import { TimeDifferencePairClient } from './TimeDifferencePairClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface Props {
  params: Promise<{ cityA: string; cityB: string }>;
}

export async function generateStaticParams() {
  return POPULAR_TIME_DIFFERENCE_PAIRS;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cityA: slugA, cityB: slugB } = await params;
  const cityA = findCityByRootSlug(slugA);
  const cityB = findCityByRootSlug(slugB);
  if (!cityA || !cityB) return buildPageMetadata('Time Difference Not Found', 'City time difference not found.', `/time-difference/${slugA}/${slugB}`);

  return buildPageMetadata(
    `${cityA.name} to ${cityB.name} Time Difference (Exact Hours & Overlap)`,
    `Exact time difference between ${cityA.name} (${cityA.country}) and ${cityB.name} (${cityB.country}). Live dual clocks, hours ahead or behind, 24-hour conversion table, and best calling hours.`,
    `/time-difference/${slugA}/${slugB}`
  );
}

export default async function TimeDifferencePairPage({ params }: Props) {
  const { cityA: slugA, cityB: slugB } = await params;
  const cityA = findCityByRootSlug(slugA);
  const cityB = findCityByRootSlug(slugB);

  if (!cityA || !cityB) {
    notFound();
  }

  const cleanA = getCityRootSlug(cityA);
  const cleanB = getCityRootSlug(cityB);
  if (slugA !== cleanA || slugB !== cleanB) {
    permanentRedirect(`/time-difference/${cleanA}/${cleanB}`);
  }

  const faqs = [
    {
      question: `What is the time difference between ${cityA.name} and ${cityB.name}?`,
      answer: `The time difference between ${cityA.name} and ${cityB.name} is calculated based on their official IANA time zone rules (${cityA.timezone} vs ${cityB.timezone}) and current daylight saving status.`
    },
    {
      question: `What is the best time to schedule a meeting between ${cityA.name} and ${cityB.name}?`,
      answer: `Check the highlighted green rows in the 24-hour table above. Those hours represent the mutual business overlap (between 9:00 AM and 6:00 PM local time in both cities).`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Time Difference', url: '/time-difference' }, { name: `${cityA.name} to ${cityB.name}`, url: `/time-difference/${slugA}/${slugB}` }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Time Difference', url: '/time-difference' },
          { name: `${cityA.name} to ${cityB.name}`, url: `/time-difference/${slugA}/${slugB}` },
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 inline-block">
            Bilateral Time Difference Analysis
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {cityA.name} to {cityB.name} Time Difference
          </h1>
          <p className="text-slate-300 text-sm sm:text-base">
            Compare local time, daylight saving rules, and mutual working office hours between {cityA.name} and {cityB.name}.
          </p>
        </div>
      </div>

      <TimeDifferencePairClient cityA={cityA} cityB={cityB} />

      <div className="pt-4">
        <FaqAccordion
          title={`Frequently Asked Questions: ${cityA.name} vs ${cityB.name}`}
          subtitle="Tips on coordinating cross-border calls and navigating timezone differentials."
          items={faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath={`/time-difference/${slugA}/${slugB}`}
        title="Explore Related Horology Tools"
        subtitle="Compare times, plan cross-border meetings, or check the world clock wall."
      />
    </div>
  );
}
