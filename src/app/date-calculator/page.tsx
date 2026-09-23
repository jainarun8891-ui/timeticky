import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { DateCalculatorClient } from './DateCalculatorClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Calendar, Plus, ShieldCheck } from 'lucide-react';

import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';

const content = HUB_PAGES_CUSTOM_CONTENT['/date-calculator'];

export const metadata = buildPageMetadata(
  content.title,
  content.description,
  '/date-calculator'
);

export default function DateCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Date Add & Subtract","url":"/date-calculator"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Date Calculator', url: '/date-calculator' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: content.h1,
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Calendar className="w-3.5 h-3.5" />
            Calendar Addition & Subtraction Engine
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Gregorian Calendar Math</span>
            </div>
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Business Days Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Zero Network Latency</span>
            </div>
          </div>
        </div>
      </div>

      <DateCalculatorClient />

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
                  Reliable month-end snapping, leap year math, and explicit weekday identification.
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Date Math"
          subtitle="Learn how leap years and varying month lengths affect date calculations."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/date-calculator"
        title="Explore Related Date & Calendar Utilities"
        subtitle="Compare date intervals, view the full calendar, or check ISO week numbers."
      />
    </div>
  );
}
