import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import { ContactClient } from './ContactClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Mail } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/contact'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/contact'
);

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: content.title,
    description: content.description,
    url: 'https://www.timenumbers.com/contact',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.timenumbers.com/contact' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{"name":"Contact","url":"/contact"}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs & Header */}
        <div className="space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <Mail className="w-3.5 h-3.5" />
              Communication Desk
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {content.h1}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              {content.description}
            </p>
          </div>
        </div>

        {/* Contact Client */}
        <ContactClient />

        {/* Editorial Guide Section */}
        <EditorialContentBlock content={content} badgeLabel="Data Corrections & Support Protocol" />

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <FaqAccordion items={content.faqs} title="Frequently Asked Questions: Contact & Support" />
        </div>

        {/* Global Hub Navigation */}
        <RelatedLinksHub
          currentPath="/contact"
          title="Explore More Tools & Platforms"
          subtitle="Check out live atomic clocks, time difference tools, and planetary solar maps."
        />
      </div>
    </div>
  );
}
