import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { TIMEZONE_VS_PAIRS } from '@/lib/time/timezone-vs-data';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { TimezoneVsClient } from './TimezoneVsClient';

export const metadata: Metadata = buildPageMetadata(
  'Time Zone VS Comparisons — Live Side-by-Side Clocks',
  'Compare time zones side by side with live clocks and 24-hour sliders. Clear answers for CST vs EST, PST vs MST, GMT vs UTC, EDT vs EST, and more.',
  '/timezone/vs'
);

const FAQS = [
  {
    question: 'What is the difference between CST and EST?',
    answer: 'Central Standard Time (CST) is exactly 1 hour behind Eastern Standard Time (EST). When it is 12:00 PM in New York (EST), it is 11:00 AM in Chicago (CST).'
  },
  {
    question: 'What is the difference between PST and MST?',
    answer: 'Pacific Standard Time (PST) is 1 hour behind Mountain Standard Time (MST). When it is 12:00 PM in Denver (MST), it is 11:00 AM in Los Angeles (PST).'
  },
  {
    question: 'Are GMT and UTC the same thing?',
    answer: 'Yes, GMT and UTC share the exact same time. However, UTC is a scientific atomic time standard, while GMT is a civil time zone observed in the UK and Ireland during winter.'
  },
  {
    question: 'What is the difference between EST and EDT?',
    answer: 'EST is Eastern Standard Time (observed in winter, UTC-5), while EDT is Eastern Daylight Time (observed in summer, UTC-4). They represent the same region in different seasons.'
  }
];

export default function TimezoneVsIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: 'Timezone Comparisons', url: '/timezone/vs' }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Timezone Comparisons', url: '/timezone/vs' },
        ]}
      />
      <JsonLd type="faq" data={FAQS} />

      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800">
          <Clock className="w-3.5 h-3.5" />
          Side-by-Side Timezone Directory
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Time Zone VS Comparisons
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Compare major time zones head-to-head. Understand hour differences, daylight saving transitions, and affected cities in plain English.
        </p>
      </div>

      {/* Featured Interactive Comparison */}
      <TimezoneVsClient currentPair="cst-vs-est" />

      {/* Complete Directory Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          All Popular Time Zone Comparisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(TIMEZONE_VS_PAIRS).map((p) => (
            <Link
              key={p.slug}
              href={`/timezone/vs/${p.slug}`}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {p.zoneA} vs {p.zoneB}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">
                {p.quickAnswerEn}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={FAQS}
        title="Frequently Asked Questions About Time Zone Differences"
        subtitle="Quick, plain-English answers to common timezone questions."
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explore More Time & Timezone Converters" />
    </div>
  );
}
