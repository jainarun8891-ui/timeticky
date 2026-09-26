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
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const dynamicParams = true;

export const POPULAR_CONVERSION_COMBOS = [
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

import { getTimezoneComboData, getTimezoneComboFaqs, formatHourAmPm } from '@/lib/seo/page-faqs';
import { CONVERTER_COMBO_CUSTOM_CONTENT } from '@/lib/seo/converter-combo-custom-content';
import { Clock, Compass, Table } from 'lucide-react';

export async function generateStaticParams() {
  const customSlugs = Object.keys(CONVERTER_COMBO_CUSTOM_CONTENT);
  const allCombos = Array.from(new Set([...customSlugs, ...POPULAR_CONVERSION_COMBOS]));
  return allCombos.map(combo => ({ combo }));
}

function parseCombo(rawCombo: string): { fromTz: TimezoneAbbrDefinition; toTz: TimezoneAbbrDefinition; cleanSlug: string } | null {
  if (!rawCombo || !rawCombo.includes('-to-')) return null;
  const [fromRaw, toRaw] = rawCombo.toLowerCase().split('-to-');
  if (!fromRaw || !toRaw || fromRaw === toRaw) return null;

  const fromTz = COMMON_TIMEZONE_ABBREVIATIONS[fromRaw];
  const toTz = COMMON_TIMEZONE_ABBREVIATIONS[toRaw];

  if (!fromTz || !toTz) return null;
  return { fromTz, toTz, cleanSlug: `${fromTz.slug}-to-${toTz.slug}` };
}

export async function generateMetadata({ params }: { params: Promise<{ combo: string }> }): Promise<Metadata> {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) return buildPageMetadata('Converter Not Found', 'Timezone combination not found.', `/converter/${combo}`);

  const { fromTz, toTz, cleanSlug } = parsed;
  const custom = CONVERTER_COMBO_CUSTOM_CONTENT[cleanSlug];
  const data = getTimezoneComboData(fromTz, toTz);

  const vsTerm = `${fromTz.abbr} vs ${toTz.abbr}`;
  const title = `${fromTz.abbr} to ${toTz.abbr} Time Converter (${vsTerm} Difference & Chart)`;
  const baseDesc = custom?.description || `${data.relationshipText} Calculate overlapping business hours and schedule calls between ${fromTz.abbr} and ${toTz.abbr}.`;
  const desc = baseDesc.includes('vs') ? baseDesc : `${data.relationshipText} Easily convert ${fromTz.abbr} to ${toTz.abbr} (${vsTerm}) with live 24-hour visual comparison slider, business overlap scheduler, and exact hourly conversion table.`;

  return buildPageMetadata(title, desc, `/converter/${cleanSlug}`);
}

export default async function ConvertComboPage({ params }: { params: Promise<{ combo: string }> }) {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) notFound();

  const { fromTz, toTz, cleanSlug } = parsed;
  const custom = CONVERTER_COMBO_CUSTOM_CONTENT[cleanSlug];
  const faqs = custom?.faqs || getTimezoneComboFaqs(fromTz, toTz);
  const data = getTimezoneComboData(fromTz, toTz);

  const breadcrumbs = [
    { name: 'Converter', url: '/converter' },
    { name: `${fromTz.abbr} to ${toTz.abbr} Converter`, url: `/converter/${cleanSlug}` }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd type="faq" data={faqs} />

      {/* Header Banner with single canonical H1 & Featured Snippet Quick Answer */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Clock className="w-3.5 h-3.5" />
            Timezone Conversion Hub
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {custom?.h1 || `${fromTz.abbr} to ${toTz.abbr} Time Converter`}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {custom?.description || `${data.relationshipText} Calculate overlapping business hours and find the best time to schedule cross-timezone calls between ${fromTz.abbr} and ${toTz.abbr}.`}
          </p>

          {/* Featured Snippet Quick Answer Box */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-white text-xs sm:text-sm leading-relaxed mt-4">
            <span className="font-bold text-amber-300">Quick Answer: </span>
            <span>{data.relationshipText} </span>
            <span className="text-slate-200">
              When it is 12:00 PM (Noon) in {fromTz.abbr}, it is {formatHourAmPm(12 + data.diffHours)} in {toTz.abbr}.{' '}
              {data.overlapHours > 0
                ? `Optimal business overlap: ${data.overlapHours} mutual working hours.`
                : 'Zero standard daytime business hours overlap.'}
            </span>
          </div>
        </div>
      </div>

      <ConvertComboClient fromTz={fromTz} toTz={toTz} comboSlug={cleanSlug} />

      {/* Server-Rendered Quick Hourly Conversion Table for Google Featured Snippets */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Table className="w-3.5 h-3.5" />
            <span>Quick Hourly Reference Table</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {fromTz.abbr} to {toTz.abbr} Hourly Conversion Chart ({fromTz.abbr} vs {toTz.abbr})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Instant hour-by-hour reference table for common meeting times, morning calls, and evening handoffs between {fromTz.abbr} ({fromTz.primaryName}) and {toTz.abbr} ({toTz.primaryName}).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">{fromTz.abbr} Time ({fromTz.primaryName})</th>
                <th className="py-3 px-4">{toTz.abbr} Time ({toTz.primaryName})</th>
                <th className="py-3 px-4 hidden sm:table-cell">Collaboration Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => {
                const targetHour = hour + data.diffHours;
                const fromFormatted = formatHourAmPm(hour);
                const toFormatted = formatHourAmPm(targetHour);
                const isFromBiz = hour >= 9 && hour <= 17;
                const isToBiz = ((targetHour % 24) + 24) % 24 >= 9 && ((targetHour % 24) + 24) % 24 <= 17;
                const isShared = isFromBiz && isToBiz;

                return (
                  <tr key={hour} className={isShared ? 'bg-emerald-50/50 dark:bg-emerald-950/20 font-semibold' : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'}>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {fromFormatted} {fromTz.abbr}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {toFormatted} {toTz.abbr}
                    </td>
                    <td className="py-2.5 px-4 hidden sm:table-cell text-xs">
                      {isShared ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Shared Business Working Hour
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">
                          {isFromBiz ? `Standard work hour in ${fromTz.abbr}` : (isToBiz ? `Standard work hour in ${toTz.abbr}` : 'Outside standard office hours')}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {custom && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Verified Chronometric Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {custom.headings[0] || `${fromTz.abbr} to ${toTz.abbr} Time Conversion`}
            </h2>
            {custom.page_text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}
          </div>

          {custom.headings.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {custom.headings.slice(1).map((heading, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Compare reciprocal schedules, verify working hour alignments, and schedule with confidence.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={faqs} title={`Frequently Asked Questions: ${fromTz.abbr} to ${toTz.abbr} Time Conversion`} />
      </div>

      <RelatedLinksHub />

      {/* Schema.org HowTo Rich Snippet */}
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": `How to Convert Time from ${fromTz.abbr} to ${toTz.abbr}`,
            "description": `Step-by-step guide to converting hours and scheduling calls between ${fromTz.primaryName} and ${toTz.primaryName}.`,
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

      {/* Schema.org WebApplication JSON-LD */}
      <script type="application/ld+json" suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `Convert ${fromTz.abbr} to ${toTz.abbr} Time Converter`,
            "url": `https://www.timenumbers.com/converter/${cleanSlug}`,
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
    </div>
  );
}
