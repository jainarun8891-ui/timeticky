import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Clock } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/about'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/about'
);

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'About TimeNumbers', url: '/about' }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>Atomic Time & Planetary Chronometry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {content.description}
        </p>
      </div>

      {/* Editorial Content Section */}
      <EditorialContentBlock content={content} badgeLabel="Our Horological Philosophy" />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={content.faqs} title="Frequently Asked Questions: About TimeNumbers" />
      </div>

      <RelatedLinksHub
        currentPath="/about"
        title="Explore What TimeNumbers Offers"
        subtitle="Check out live atomic clocks, time difference tools, and planetary solar maps."
      />
    </div>
  );
}
