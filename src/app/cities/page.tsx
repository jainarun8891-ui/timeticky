import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { CitiesDirectoryClient } from './CitiesDirectoryClient';
import { getAllCountries } from '@/lib/geo/countries';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Building2, Globe } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/cities'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/cities'
);

export default function CitiesPage() {
  const countries = getAllCountries();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{ name: "Cities Directory", url: "/cities" }]} />
      <JsonLd type="faq" data={content.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: content.title,
            description: content.description,
            url: 'https://www.timenumbers.com/cities',
          })
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs & Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Building2 className="w-3.5 h-3.5" />
                Global Metropolitan Index
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {content.h1}
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              {content.description}
            </p>
          </div>
        </div>

        {/* Browse Cities by Country Hub */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Browse Cities by Country
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {countries.map((c) => (
              <Link
                key={c.code}
                href={`/cities/${c.slug}`}
                className="px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-slate-200/60 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-all flex items-center gap-1.5"
              >
                <span>{c.flag}</span>
                <span>{c.name} Cities</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Interactive Filter Client */}
        <CitiesDirectoryClient />

        {/* Educational Guide Section */}
        <EditorialContentBlock content={content} badgeLabel="Metropolitan Horology Guide" />

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <FaqAccordion items={content.faqs} title="Frequently Asked Questions: Global Cities Directory" />
        </div>

        {/* Global Hub Navigation */}
        <RelatedLinksHub
          currentPath="/cities"
          title="Explore More Time & Location Directories"
          subtitle="Discover time zones, country hubs, or check current world time."
        />
      </div>
    </div>
  );
}
