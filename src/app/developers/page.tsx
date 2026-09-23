import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Code2, Terminal, ShieldCheck, Zap, Globe, ArrowRight, BookOpen, Key, CheckCircle } from 'lucide-react';

import { buildPageMetadata } from '@/lib/seo/metadata';

import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';

const content = HUB_PAGES_CUSTOM_CONTENT['/developers'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/developers'
);

import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';

export default function DevelopersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.h1,
    description: content.description,
    url: 'https://www.timenumbers.com/developers',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Developers', item: 'https://www.timenumbers.com/developers' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{"name":"Developers","url":"/developers"}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header Breadcrumbs & Intro */}
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">Developers</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Code2 className="w-3.5 h-3.5" />
                Global Chronometry Infrastructure
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {content.h1}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-2">
                {content.description}
              </p>
            </div>

            <Link
              href="/api-docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm self-start md:self-auto"
            >
              <BookOpen className="w-4 h-4" />
              Interactive API Reference <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sub-Millisecond Response</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculated entirely with in-memory astronomical formulas and canonical IANA tzdata. No database latency or network bottlenecks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit">
              <Key className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Anonymous Free Tier</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              No API keys or credit cards required for standard integration. Up to 100 requests per minute with full CORS support.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Authoritative Sources</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Maintained strictly in sync with the IANA tz database, NOAA solar position algorithms, and ISO-8601 specifications.
            </p>
          </div>
        </div>

        {/* Quickstart Code Examples */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-600" />
                Quickstart Integration
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Query current time or convert coordinates with standard HTTP requests:
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Base: /api/v1
            </span>
          </div>

          {/* cURL Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">1. Fetch Current Atomic UTC Time</span>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <code>curl -X GET &quot;https://www.timenumbers.com/api/v1/time&quot;</code>
            </div>
          </div>

          {/* Timezone Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">2. Inspect Specific IANA Timezone</span>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <code>curl -X GET &quot;https://www.timenumbers.com/api/v1/timezone/Asia/Kolkata&quot;</code>
            </div>
          </div>

          {/* Solar Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">3. Calculate Solar Ephemeris for City</span>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <code>curl -X GET &quot;https://www.timenumbers.com/api/v1/sun/delhi&quot;</code>
            </div>
          </div>

          {/* Conversion Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">4. Convert Time Between Multiple International Zones</span>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <code>curl -X GET &quot;https://www.timenumbers.com/api/v1/convert?from=Asia/Kolkata&amp;to=America/New_York,Europe/London&amp;time=14:30&quot;</code>
            </div>
          </div>
        </div>

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
                    Zero-config anonymous access, sub-millisecond in-memory resolution, and authoritative IANA/NIST standards.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <FaqAccordion items={content.faqs} title="Frequently Asked Questions: TimeNumbers Developer Platform" />
        </div>

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore Developer Tools & Widgets" />
      </div>
    </div>
  );
}
