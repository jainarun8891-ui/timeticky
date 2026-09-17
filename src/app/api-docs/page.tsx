import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ApiDocsClient } from './ApiDocsClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { BookOpen, Code2, Terminal } from 'lucide-react';

import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'REST API Reference (v1)',
  'Interactive API reference for the TimeNumbers REST platform. Test live endpoints for current time, timezones, city coordinates, solar ephemeris, and multi-zone time conversions.',
  '/api-docs'
);

export default function ApiDocsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'TimeNumbers REST API Reference',
    description: 'Interactive API Reference for TimeNumbers v1 REST endpoints.',
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
                Interactive API Reference
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              Send live queries directly against our production API endpoints with full CORS and JSON payload inspection.
            </p>
          </div>
        </div>

        {/* Interactive Reference Client */}
        <ApiDocsClient />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Developer Tools & Clocks" />
      </div>
    </div>
  );
}
