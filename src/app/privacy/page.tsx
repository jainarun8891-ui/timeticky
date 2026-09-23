import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { ShieldCheck } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/privacy'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/privacy'
);

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy' }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy by Design</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {content.description}
        </p>
      </div>

      {/* Editorial Content Section */}
      <EditorialContentBlock content={content} badgeLabel="Data Protection & Telemetry Standards" />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={content.faqs} title="Frequently Asked Questions: Privacy & Data Protection" />
      </div>

      <RelatedLinksHub
        currentPath="/privacy"
        title="Explore TimeNumbers Platform"
        subtitle="Experience fast, privacy-focused world clocks and astronomical utilities."
      />
    </div>
  );
}
