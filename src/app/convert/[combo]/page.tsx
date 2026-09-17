import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  COMMON_TIMEZONE_ABBREVIATIONS,
  TimezoneAbbrDefinition,
  CANONICAL_CONVERTER_ABBREVIATIONS
} from '@/lib/time/timezone-lookup';
import { ConvertComboClient } from './ConvertComboClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';

// Allow dynamic rendering for all 552 cross-converter combinations on demand
export const dynamicParams = true;

// Pre-render the most popular high-traffic combinations
export const POPULAR_CONVERSION_COMBOS = [
  'gmt-to-est', 'est-to-gmt', 'gmt-to-pst', 'pst-to-gmt',
  'gmt-to-cst', 'cst-to-gmt', 'gmt-to-ist', 'ist-to-gmt',
  'gmt-to-cet', 'cet-to-gmt', 'gmt-to-utc', 'utc-to-gmt',
  'est-to-pst', 'pst-to-est', 'est-to-cst', 'cst-to-est',
  'est-to-ist', 'ist-to-est', 'est-to-cet', 'cet-to-est',
  'est-to-utc', 'utc-to-est', 'pst-to-cst', 'cst-to-pst',
  'pst-to-ist', 'ist-to-pst', 'pst-to-cet', 'cet-to-pst',
  'pst-to-utc', 'utc-to-pst', 'cst-to-ist', 'ist-to-cst',
  'utc-to-ist', 'ist-to-utc', 'cet-to-ist', 'ist-to-cet',
  'bst-to-est', 'est-to-bst', 'bst-to-ist', 'ist-to-bst',
  'bst-to-pst', 'pst-to-bst', 'aest-to-gmt', 'gmt-to-aest',
  'aest-to-est', 'est-to-aest', 'kst-to-est', 'est-to-kst',
  'kst-to-gmt', 'gmt-to-kst', 'mst-to-est', 'est-to-mst',
  'mst-to-pst', 'pst-to-mst', 'wet-to-cet', 'cet-to-wet',
  'eet-to-cet', 'cet-to-eet', 'awst-to-aest', 'aest-to-awst'
];

export async function generateStaticParams() {
  return POPULAR_CONVERSION_COMBOS.map((combo) => ({ combo }));
}

function parseCombo(combo: string): { fromTz: TimezoneAbbrDefinition; toTz: TimezoneAbbrDefinition; cleanSlug: string } | null {
  const clean = combo.toLowerCase().replace(/-converter$/i, '');
  const parts = clean.split('-to-');
  if (parts.length !== 2) return null;

  const [fromSlug, toSlug] = parts;
  const fromTz = COMMON_TIMEZONE_ABBREVIATIONS[fromSlug];
  const toTz = COMMON_TIMEZONE_ABBREVIATIONS[toSlug];

  if (!fromTz || !toTz) return null;
  return { fromTz, toTz, cleanSlug: `${fromSlug}-to-${toSlug}` };
}

export async function generateMetadata({ params }: { params: Promise<{ combo: string }> }): Promise<Metadata> {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) return { title: 'Timezone Converter — TimeNumbers' };

  const { fromTz, toTz, cleanSlug } = parsed;
  const title = `Convert ${fromTz.abbr} to ${toTz.abbr} — ${fromTz.primaryName} to ${toTz.primaryName} Converter`;
  const desc = `Convert time from ${fromTz.abbr} (${fromTz.primaryName}) to ${toTz.abbr} (${toTz.primaryName}). Features interactive WorldTimeBuddy-grade visual grid, 24-hour comparative matrix, business hours overlap finder, and 1-click meeting calendar sync.`;

  return buildPageMetadata(title, desc, `/convert/${cleanSlug}`);
}

export default async function ConvertComboPage({ params }: { params: Promise<{ combo: string }> }) {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) notFound();

  const { fromTz, toTz, cleanSlug } = parsed;

  const faqs = [
    {
      question: `What is the time difference between ${fromTz.abbr} and ${toTz.abbr}?`,
      answer: `${fromTz.primaryName} (${fromTz.abbr}, ${fromTz.offsetStr}) is centered around ${fromTz.primaryIana}, while ${toTz.primaryName} (${toTz.abbr}, ${toTz.offsetStr}) is observed in ${toTz.primaryIana}. The relative difference can shift when either region enters or exits daylight saving time.`
    },
    {
      question: `What is the best time for a meeting between ${fromTz.abbr} and ${toTz.abbr}?`,
      answer: `Use our interactive visual timeline grid above to identify overlapping business hours (9:00 AM – 6:00 PM). Click the 'Snap to Overlap' button to instantly highlight the optimal working window where teams in both timezones are awake and working.`
    },
    {
      question: `Does ${fromTz.abbr} or ${toTz.abbr} observe Daylight Saving Time (DST)?`,
      answer: `${fromTz.abbr} ${fromTz.hasDst ? 'observes seasonal Daylight Saving Time clock adjustments' : 'remains on standard time year-round with no seasonal clock shifts'}. ${toTz.abbr} ${toTz.hasDst ? 'observes seasonal Daylight Saving Time clock adjustments' : 'remains on standard time year-round'}.`
    },
    {
      question: `How do I share a converted meeting time with colleagues in ${toTz.abbr}?`,
      answer: `Click any hour block on the interactive grid and press 'Copy for Slack / Email' or 'Google Calendar'. The tool generates a clear, timezone-labeled summary and direct calendar links for both parties.`
    }
  ];

  const breadcrumbs = [
    { name: 'Time Converter', url: '/time-converter' },
    { name: `${fromTz.abbr} to ${toTz.abbr} Converter`, url: `/convert/${cleanSlug}` }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      <ConvertComboClient fromTz={fromTz} toTz={toTz} comboSlug={cleanSlug} />

      <FaqAccordion items={faqs} title={`Frequently Asked Questions: ${fromTz.abbr} to ${toTz.abbr} Time Conversion`} />

      <RelatedLinksHub />

      {/* Schema.org WebApplication & FAQPage JSON-LD */}
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `Convert ${fromTz.abbr} to ${toTz.abbr} Time Converter`,
            "url": `https://timenumbers.com/convert/${cleanSlug}`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires JavaScript. Requires HTML5.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  );
}
