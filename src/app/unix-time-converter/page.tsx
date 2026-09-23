import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { UnixConverterClient } from './UnixConverterClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';

import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';

const content = HUB_PAGES_CUSTOM_CONTENT['/unix-time-converter'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/unix-time-converter'
);

export default function UnixTimeConverterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Unix Time","url":"/unix-time"},{"name":"Converter","url":"/unix-time-converter"}]} />
      <JsonLd type="faq" data={content.faqs} />
      <UnixConverterClient h1Title={content.h1} />

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
                  10-digit seconds vs 13-digit milliseconds, leap second smearing, and Python/JavaScript/Go snippets.
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={content.faqs} title="Frequently Asked Questions: Unix Timestamps" />
      </div>
      <RelatedLinksHub />
    </div>
  );
}
