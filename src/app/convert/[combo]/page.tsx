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
// Pre-render the most popular high-traffic combinations including top GSC impression performers
export const POPULAR_CONVERSION_COMBOS = [
  // GSC Top Performing & Striking-Distance Combinations
  'edt-to-ist', 'ist-to-edt', 'kst-to-cdt', 'cdt-to-kst',
  'cdt-to-ist', 'ist-to-cdt', 'kst-to-mst', 'mst-to-kst',
  'cest-to-utc', 'utc-to-cest', 'cest-to-est', 'est-to-cest',
  'pdt-to-est', 'est-to-pdt', 'cest-to-cdt', 'cdt-to-cest',
  'kst-to-mdt', 'mdt-to-kst', 'edt-to-kst', 'kst-to-edt',
  'pdt-to-cdt', 'cdt-to-pdt', 'cest-to-gmt', 'gmt-to-cest',
  'mdt-to-est', 'est-to-mdt', 'edt-to-est', 'est-to-edt',
  'edt-to-awst', 'awst-to-edt', 'edt-to-cdt', 'cdt-to-edt',
  'pdt-to-mdt', 'mdt-to-pdt', 'cdt-to-bst', 'bst-to-cdt',
  'eest-to-gmt', 'gmt-to-eest', 'ist-to-mdt', 'mdt-to-ist',
  'pdt-to-gmt', 'gmt-to-pdt', 'eest-to-est', 'est-to-eest',
  'bst-to-west', 'west-to-bst', 'mdt-to-eest', 'eest-to-mdt',
  'pst-to-edt', 'edt-to-pst', 'cst-to-cdt', 'cdt-to-cst',
  'mst-to-mdt', 'mdt-to-mst', 'awst-to-eest', 'eest-to-awst',
  'gmt-to-eet', 'eet-to-gmt', 'mdt-to-cdt', 'cdt-to-mdt',
  'pdt-to-cest', 'cest-to-pdt', 'kst-to-west', 'west-to-kst',
  'pdt-to-aest', 'aest-to-pdt', 'edt-to-gmt', 'gmt-to-edt',
  'edt-to-mdt', 'mdt-to-edt', 'mst-to-bst', 'bst-to-mst',

  // Core High-Traffic Baseline Combinations
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
  // High-CTR search intent matching (e.g. "EDT to IST Converter: Live Time & Difference")
  const title = `${fromTz.abbr} to ${toTz.abbr} Converter: Live Time & Difference`;
  const desc = `Convert ${fromTz.abbr} (${fromTz.primaryName}) to ${toTz.abbr} (${toTz.primaryName}). Real-time 24-hour visual conversion table, hour difference, and business meeting scheduler.`;

  return buildPageMetadata(title, desc, `/convert/${cleanSlug}`);
}

export default async function ConvertComboPage({ params }: { params: Promise<{ combo: string }> }) {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) notFound();

  const { fromTz, toTz, cleanSlug } = parsed;

  const faqs = [
    {
      question: `What is the current time difference between ${fromTz.abbr} and ${toTz.abbr}?`,
      answer: `${fromTz.primaryName} (${fromTz.abbr}) operates at ${fromTz.offsetStr}, while ${toTz.primaryName} (${toTz.abbr}) operates at ${toTz.offsetStr}. When either region begins or ends Daylight Saving Time, the relative gap adjusts automatically on this board.`
    },
    {
      question: `When is the best overlapping time for a call between ${fromTz.abbr} and ${toTz.abbr}?`,
      answer: `Use the interactive 24-hour visual grid above to spot shared working hours (typically 9:00 AM to 5:00 PM). Click 'Snap to Overlap' to highlight the ideal meeting window where teams in both timezones are comfortably awake and working.`
    },
    {
      question: `Do clocks shift for Daylight Saving Time in ${fromTz.abbr} or ${toTz.abbr}?`,
      answer: `${fromTz.abbr} ${fromTz.hasDst ? 'observes seasonal Daylight Saving Time adjustments' : 'stays on standard time year-round with no clock shifts'}. ${toTz.abbr} ${toTz.hasDst ? 'observes seasonal Daylight Saving Time adjustments' : 'stays on standard time year-round'}. Our converter updates automatically on transition dates.`
    },
    {
      question: `How do I copy and share the converted meeting time with colleagues?`,
      answer: `Click any hour slot on the visual board and select 'Copy for Slack / Email' or 'Google Calendar'. The tool generates a clean, timezone-labeled invitation ready to send to your team in one click.`
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

      {/* Schema.org HowTo Rich Snippet */}
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to Convert ${fromTz.abbr} to ${toTz.abbr}`,
            "description": `Step-by-step instructions to convert time from ${fromTz.primaryName} to ${toTz.primaryName} and find shared team meeting hours.`,
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": `Find your local ${fromTz.abbr} hour`,
                "text": `Locate your current or desired hour on the ${fromTz.abbr} horizontal timeline grid.`
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": `Read the aligned ${toTz.abbr} time`,
                "text": `Follow the synchronized vertical column down to see the exact corresponding time in ${toTz.abbr}.`
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Check working hours overlap",
                "text": "Look for the green and amber highlighted hour blocks where both timezones are within daytime business hours."
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Export to calendar or messaging",
                "text": "Click 'Copy for Slack / Email' or 'Google Calendar' to generate an instant meeting invitation with all timezones included."
              }
            ]
          })
        }}
      />

      {/* Schema.org WebApplication & FAQPage JSON-LD */}
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `Convert ${fromTz.abbr} to ${toTz.abbr} Time Converter`,
            "url": `https://www.timenumbers.com/convert/${cleanSlug}`,
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
