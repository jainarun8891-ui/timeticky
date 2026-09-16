import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { ConvertDirectoryClient } from './ConvertDirectoryClient';
import { Sparkles, Globe, Clock, Layers } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Time Zone Converters Directory — 552 Cross-Timezone Visual Tools',
  'Browse and search all 552 international timezone converter combinations. Compare GMT, EST, PST, CST, IST, CET, BST, AEST, and more with our WorldTimeBuddy-grade interactive timeline grid.',
  '/convert'
);

const DIRECTORY_FAQS = [
  {
    question: "How do I use the interactive visual timezone converter?",
    answer: "Select any timezone pair from the directory (such as GMT to EST or PST to IST). On each converter page, you will find our WorldTimeBuddy-grade visual grid where you can drag a synchronized column scrubber across 24 hours, identify business overlap windows, and copy meeting times for Slack or calendar in 1 click."
  },
  {
    question: "How are daylight saving time changes handled?",
    answer: "All time conversions are calculated using the official IANA Time Zone Database (tzdb). Whenever regions enter or exit Daylight Saving Time (such as EST switching to EDT, or GMT switching to BST), all hour calculations update automatically without manual intervention."
  },
  {
    question: "Can I add more than two timezones to compare simultaneously?",
    answer: "Yes! On every converter page, click the '+ Add Zone' button in the toolbar to stack 3rd, 4th, 5th, or more timezones and cities directly onto the visual board to compare teams worldwide."
  },
  {
    question: "Can I schedule a meeting directly from the converter?",
    answer: "Click any hour tile on the grid to pin that slot. From there, you can 1-click 'Add to Google Calendar', download an .ics file for Outlook and Apple Calendar, or copy a cleanly formatted multi-zone summary for your team."
  }
];

export default function ConvertDirectoryPage() {
  const breadcrumbs = [
    { name: 'Time Converter', url: '/time-converter' },
    { name: 'Timezone Converters Directory', url: '/convert' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Complete Timezone Translation Network</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          World Timezone Converters
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          Comprehensive directory of all 552 international timezone converter combinations.
          Powered by our modern WorldTimeBuddy-grade visual grid with business overlap detection.
        </p>
      </div>

      {/* Master Client Directory */}
      <ConvertDirectoryClient />

      {/* FAQs */}
      <FaqAccordion items={DIRECTORY_FAQS} title="Frequently Asked Questions About Timezone Conversion" />

      {/* Cross Links */}
      <RelatedLinksHub />

      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "GlobalTime Timezone Converters Directory",
            "url": "https://globaltime.org/convert",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
