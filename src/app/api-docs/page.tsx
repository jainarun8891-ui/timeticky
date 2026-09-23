import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ApiDocsClient } from './ApiDocsClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { BookOpen, Code2, Terminal } from 'lucide-react';

import { buildPageMetadata } from '@/lib/seo/metadata';

import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';

const content = HUB_PAGES_CUSTOM_CONTENT['/api-docs'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/api-docs'
);

import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';

export default function ApiDocsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.h1,
    description: content.description,
    url: 'https://www.timenumbers.com/api-docs',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Developers', item: 'https://www.timenumbers.com/developers' },
        { '@type': 'ListItem', position: 3, name: 'API Reference', item: 'https://www.timenumbers.com/api-docs' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{"name":"Developers","url":"/developers"},{"name":"API Reference","url":"/api-docs"}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs & Header */}
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/developers" className="hover:text-blue-600 transition-colors">Developers</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">API Reference</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Terminal className="w-3.5 h-3.5" />
                REST v1 Specification
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {content.h1}
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              {content.description}
            </p>
          </div>
        </div>

        {/* Interactive Reference Client */}
        <ApiDocsClient />

        {/* Educational Guide Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {content.headings[0]}
            </h2>
            {content.page_text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>

          {content.headings.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {content.headings.slice(1).map((heading, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Canonical IANA tzdata, astronomical ephemeris formulas, and edge CDN cache headers.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <FaqAccordion items={content.faqs} title="Frequently Asked Questions: REST API Integration" />
        </div>

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Developer Tools & Clocks" />
      </div>
    </div>
  );
}
