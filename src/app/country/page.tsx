import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCountries } from '@/lib/geo/countries';
import { CountryDirectoryClient } from './CountryDirectoryClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe, MapPin, Clock, Compass, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Current Time in Countries Worldwide — World Countries Directory',
  'What time is it around the world? Live clocks, current local time, capital cities, and timezone offsets for all countries worldwide.',
  '/country'
);

const COUNTRY_PAGE_FAQS = [
  {
    question: "How many countries and territories are tracked in this directory?",
    answer: "Our horology platform indexes canonical sovereign nations and overseas territories recognized by ISO 3166-1 and the IANA time zone database, mapping each to its respective capital city and legal time keeping jurisdiction."
  },
  {
    question: "Which country has the most time zones in the world?",
    answer: "France spans the highest number of time zones (12 standard, or 13 including its Antarctic territory claims) due to its overseas departments across the Pacific, Indian, and Atlantic oceans. The United States and Russia follow closely with 11 standard time zones each."
  },
  {
    question: "How are country local times synchronized?",
    answer: "All country clocks are calculated using the canonical IANA (Olson) tz database releases coupled with Network Time Protocol (NTP) atomic reference standards, ensuring precision within fractions of a second."
  },
  {
    question: "Do all countries observe Daylight Saving Time?",
    answer: "No. Only about 70 countries globally observe Daylight Saving Time, predominantly in North America and Europe. Most nations in Africa, Asia, and near the equator maintain standard time year-round because day length varies minimally throughout the seasons."
  }
];

export default function CountryDirectoryPage() {
  const countries = getAllCountries();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'World Countries Directory — Global Time & Clocks',
    description: 'Definitive index of countries with live digital clocks, capital times, and timezone information.',
    url: 'https://www.timenumbers.com/country',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Country Directory', item: 'https://www.timenumbers.com/country' },
      ],
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Country Directory', url: '/country' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={COUNTRY_PAGE_FAQS} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Globe className="w-3.5 h-3.5" />
            Global Sovereign Jurisdictions
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            World Countries Directory
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explore international time zones, capital clocks, and Daylight Saving Time protocols across sovereign nations worldwide. Synchronized with sub-second atomic accuracy.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Canonical IANA Boundaries</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Atomic NTP Synchronization</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Capital & Regional Clocks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Country Directory Client */}
      <CountryDirectoryClient countries={countries} />

      {/* FAQs */}
      <FaqAccordion items={COUNTRY_PAGE_FAQS} title="Frequently Asked Questions About Country Time" />

      {/* Related Links Hub */}
      <RelatedLinksHub title="Explore More Time & Location Hubs" />
    </div>
  );
}
