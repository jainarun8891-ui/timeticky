import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { CITIES, City } from '@/lib/geo/cities';
import { CompareCitiesClient } from '@/components/converter/CompareCitiesClient';
import { ArrowLeftRight } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/converter/compare'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/converter/compare'
);

export default function ConverterComparePage() {
  const defaultSlugs = ['delhi-india', 'london-united-kingdom', 'new-york-united-states'];
  const initialCities = defaultSlugs.map(slug => CITIES.find(c => c.slug === slug)).filter(Boolean) as City[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Converter', url: '/converter' },
          { name: 'Compare Cities', url: '/converter/compare' },
        ]}
      />

      <JsonLd type="faq" data={content.faqs} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Interactive Time Zone Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            {content.h1}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {content.description}
          </p>
        </div>
      </div>

      <CompareCitiesClient initialCities={initialCities} />

      {/* Educational Guide & Editorial Section */}
      <EditorialContentBlock content={content} badgeLabel="Synchronized Horology Reference" />

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title="Frequently Asked Questions About Comparing Cities"
          subtitle="Learn how to compare multiple world time zones side-by-side with ease."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/converter/compare"
        title="Explore Related Horology Tools"
        subtitle="Compare times, plan cross-border meetings, or view the world clock wall."
      />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TimeNumbers World Time Zone Comparator",
            "url": "https://www.timenumbers.com/converter/compare",
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
