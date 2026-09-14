import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { COMMON_TIMEZONE_ABBREVIATIONS, TimezoneAbbrDefinition } from '@/lib/time/timezone-lookup';
import { ConvertComboClient } from './ConvertComboClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const CONVERSION_COMBOS = [
  'est-to-pst',
  'pst-to-est',
  'utc-to-ist',
  'ist-to-utc',
  'gmt-to-est',
  'est-to-gmt',
  'cst-to-est',
  'est-to-cst',
  'utc-to-est',
  'est-to-utc',
  'gmt-to-ist',
  'ist-to-gmt',
  'cet-to-est',
  'est-to-cet',
  'gmt-to-pst',
  'pst-to-gmt',
  'utc-to-pst',
  'pst-to-utc',
  'cst-to-pst',
  'pst-to-cst',
  'utc-to-gmt',
  'gmt-to-utc',
  'est-to-jst',
  'jst-to-est',
  'utc-to-cst',
  'cst-to-utc',
];

export async function generateStaticParams() {
  return CONVERSION_COMBOS.map((combo) => ({ combo }));
}

function parseCombo(combo: string): { fromTz: TimezoneAbbrDefinition; toTz: TimezoneAbbrDefinition } | null {
  const parts = combo.toLowerCase().split('-to-');
  if (parts.length !== 2) return null;

  const [fromSlug, toSlug] = parts;
  const fromTz = COMMON_TIMEZONE_ABBREVIATIONS[fromSlug];
  const toTz = COMMON_TIMEZONE_ABBREVIATIONS[toSlug];

  if (!fromTz || !toTz) return null;
  return { fromTz, toTz };
}

export async function generateMetadata({ params }: { params: Promise<{ combo: string }> }): Promise<Metadata> {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) return { title: 'Timezone Converter' };

  const { fromTz, toTz } = parsed;
  const title = `Convert ${fromTz.abbr} to ${toTz.abbr} — ${fromTz.primaryName} to ${toTz.primaryName} Converter`;
  const desc = `Convert time from ${fromTz.abbr} (${fromTz.primaryName}) to ${toTz.abbr} (${toTz.primaryName}). See live dual clocks, exact relative hour difference, and complete 24-hour conversion table.`;

  return buildPageMetadata(title, desc, `/convert/${combo}`);
}

export default async function ConvertComboPage({ params }: { params: Promise<{ combo: string }> }) {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) notFound();

  const { fromTz, toTz } = parsed;

  const faqs = [
    {
      question: `How many hours difference between ${fromTz.abbr} and ${toTz.abbr}?`,
      answer: `${fromTz.primaryName} (${fromTz.abbr}) is synchronized against ${fromTz.primaryIana}, while ${toTz.primaryName} (${toTz.abbr}) observes ${toTz.primaryIana}. The relative time difference changes during daylight saving transitions.`
    },
    {
      question: `How do I convert a meeting time from ${fromTz.abbr} to ${toTz.abbr}?`,
      answer: `Use our 24-hour interactive slider above to drag to your desired start hour. The matching local time in ${toTz.abbr} is automatically calculated with zero manual math.`
    },
    {
      question: `Does either ${fromTz.abbr} or ${toTz.abbr} observe Daylight Saving Time?`,
      answer: `${fromTz.abbr} ${fromTz.hasDst ? 'observes seasonal daylight saving time clock changes' : 'remains on standard time year-round without daylight saving shifts'}. ${toTz.abbr} ${toTz.hasDst ? 'observes seasonal daylight saving time shifts' : 'remains on standard time year-round'}.`
    }
  ];

  const breadcrumbs = [
    { name: 'Time Converter', url: '/time-converter' },
    { name: `${fromTz.abbr} to ${toTz.abbr}`, url: `/convert/${combo}` }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      <ConvertComboClient fromTz={fromTz} toTz={toTz} comboSlug={combo} />

      <FaqAccordion items={faqs} title={`Frequently Asked Questions: ${fromTz.abbr} to ${toTz.abbr} Conversion`} />

      <RelatedLinksHub />

      {/* Schema.org WebApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `Convert ${fromTz.abbr} to ${toTz.abbr} Time Converter`,
            "url": `https://globaltime.org/convert/${combo}`,
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
