import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { WorldMapStudioClient } from '@/components/map/WorldMapStudioClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/world-map'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/world-map'
);

export default function WorldMapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.title,
    url: 'https://www.timenumbers.com/world-map',
    description: content.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All'
  };

  return (
    <div className="w-full min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6 space-y-8">
        {/* Universal SEO Breadcrumbs */}
        <Breadcrumbs
          items={[{ name: 'World Map', url: '/world-map' }]}
        />

        {/* Page Hero Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Interactive Planetary Time Observatory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {content.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl font-normal leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Interactive World Map Studio Client */}
        <WorldMapStudioClient />

        {/* Educational Content & Telemetry Section */}
        <EditorialContentBlock content={content} badgeLabel="Global Cartography & Solar Day/Night Guide" />

        {/* FAQs */}
        <div className="pt-2">
          <FaqAccordion
            title="Frequently Asked Questions About the Interactive World Map"
            subtitle="Understand cartographic projections, the solar terminator line, and world time visualization."
            items={content.faqs}
          />
        </div>

        {/* Ubiquitous Related Links */}
        <RelatedLinksHub
          currentPath="/world-map"
          title="Explore Related Horological Visualizers"
          subtitle="Explore live atomic clocks, time zone converters, and astronomy charts."
        />
      </div>
    </div>
  );
}
