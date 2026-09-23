import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { UsClocksGridClient } from './UsClocksGridClient';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/united-states-time-now'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/united-states-time-now'
);

export default function UnitedStatesTimeNowPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: content.description,
    url: 'https://www.timenumbers.com/united-states-time-now',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'United States Time Now', item: 'https://www.timenumbers.com/united-states-time-now' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'United States Time Now', url: '/united-states-time-now' }]} />

        {/* Hero Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <span className="text-base">🇺🇸</span>
            Official United States Chronometer Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {content.h1}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Interactive Live Clocks Client */}
        <UsClocksGridClient />

        {/* Educational Guide Section */}
        <EditorialContentBlock content={content} badgeLabel="American Horology Guide" />

        {/* State-by-State Reference Table */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 shadow-sm overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            United States Time Zones &amp; Major Cities Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Time Zone</th>
                  <th className="py-3 px-4">Abbreviation</th>
                  <th className="py-3 px-4">Standard UTC Offset</th>
                  <th className="py-3 px-4">Daylight UTC Offset</th>
                  <th className="py-3 px-4">Major Metros</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Eastern Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">EST / EDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-05:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-04:00</td>
                  <td className="py-3.5 px-4">New York, Washington D.C., Boston, Miami, Atlanta</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Central Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">CST / CDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-06:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-05:00</td>
                  <td className="py-3.5 px-4">Chicago, Dallas, Houston, Austin, Nashville</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Mountain Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">MST / MDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-06:00</td>
                  <td className="py-3.5 px-4">Denver, Salt Lake City, Albuquerque, Boise</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Mountain Standard (AZ)</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">MST</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4 font-mono">No DST (UTC-07:00)</td>
                  <td className="py-3.5 px-4">Phoenix, Tucson, Mesa, Chandler, Scottsdale</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Pacific Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">PST / PDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-08:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4">Los Angeles, San Francisco, Seattle, San Diego, Las Vegas</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Alaska Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">AKST / AKDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-09:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-08:00</td>
                  <td className="py-3.5 px-4">Anchorage, Fairbanks, Juneau, Sitka</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hawaii-Aleutian Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">HST</td>
                  <td className="py-3.5 px-4 font-mono">UTC-10:00</td>
                  <td className="py-3.5 px-4 font-mono">No DST (UTC-10:00)</td>
                  <td className="py-3.5 px-4">Honolulu, Pearl City, Hilo, Kahului</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Dynamic FAQ Accordion */}
        <FaqAccordion
          items={content.faqs}
          title="Frequently Asked Questions About Time in America"
          subtitle="Direct answers to questions regarding current US time, timezone boundaries, Daylight Saving Time, and capital clocks."
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub
          currentPath="/united-states-time-now"
          title="Explore Related US Clocks, Time Zones &amp; Calculators"
          subtitle="Check local city time, convert time zones, or view the world clock wall."
        />
      </div>
    </div>
  );
}
