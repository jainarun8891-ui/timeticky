import React from 'react';
import { Metadata } from 'next';
import { getAllCountries } from '@/lib/geo/countries';
import { CountryDirectoryClient } from './CountryDirectoryClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/countries'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/countries'
);

export default function CountryDirectoryPage() {
  const countries = getAllCountries();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.title,
    description: content.description,
    url: 'https://www.timenumbers.com/countries',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Countries Directory', url: '/countries' }]} />
      <JsonLd type="faq" data={content.faqs} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Globe className="w-3.5 h-3.5" />
          Sovereign Nations &amp; Civil Timekeeping
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {content.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          {content.description}
        </p>
      </div>

      <CountryDirectoryClient countries={countries} />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Global Geopolitical Time Guide" />

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title="Frequently Asked Questions About World Countries"
          subtitle="Explore national time zones, sovereign borders, and daylight saving policies."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/countries"
        title="Explore More Time & Location Directories"
        subtitle="Discover time zones, city hubs, or check current world time."
      />
    </div>
  );
}
