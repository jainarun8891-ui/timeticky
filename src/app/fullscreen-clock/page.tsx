import React from 'react';
import { Metadata } from 'next';
import { FullscreenClockClient } from './FullscreenClockClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';
import { JsonLd } from '@/components/seo/JsonLd';

const content = HUB_PAGES_CUSTOM_CONTENT['/fullscreen-clock'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/fullscreen-clock'
);

export default function FullscreenClockPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Fullscreen Interactive Clock App */}
      <FullscreenClockClient />

      {/* Static SEO Guide & Documentation */}
      <div className="bg-slate-900 border-t border-slate-800 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <Breadcrumbs items={[{ name: 'Full Screen Clock', url: '/fullscreen-clock' }]} />
          <JsonLd type="faq" data={content.faqs} />

          {/* Educational Content Section */}
          <EditorialContentBlock content={content} badgeLabel="Distraction-Free Chronometer" />

          {/* Structured FAQs */}
          <FaqAccordion
            title="Frequently Asked Questions: Full Screen Clock"
            subtitle="Guidance on shortcuts, kiosk display settings, and precision timing."
            items={content.faqs}
          />

          <RelatedLinksHub
            currentPath="/fullscreen-clock"
            title="Explore More Precision Clocks"
            subtitle="Try the sweeping analog clock, world clock wall, or countdown timer."
          />
        </div>
      </div>
    </div>
  );
}
