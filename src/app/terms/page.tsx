import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Scale } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/terms'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/terms'
);

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Terms of Service', url: '/terms' }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal & Service Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {content.description}
        </p>
      </div>

      {/* Editorial Content Section */}
      <EditorialContentBlock content={content} badgeLabel="Terms of Service & Usage Policy" />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={content.faqs} title="Frequently Asked Questions: Terms & Licensing" />
      </div>

      <RelatedLinksHub
        currentPath="/terms"
        title="Explore TimeNumbers Platform"
        subtitle="Access atomic clocks, international converters, and astronomical tables."
      />
    </div>
  );
}
