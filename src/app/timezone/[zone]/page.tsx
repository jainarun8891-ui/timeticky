import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findTimezoneAbbr, findIanaZoneBySlug, offsetToSlug, COMMON_TIMEZONE_ABBREVIATIONS } from '@/lib/time/timezone-lookup';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { POPULAR_CITIES } from '@/lib/geo/cities';
import { TimezoneDetailClient } from '@/components/common/TimezoneDetailClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { Globe, Clock, ShieldCheck, Compass, ArrowRight, ExternalLink } from 'lucide-react';

interface Props {
  params: Promise<{ zone: string }>;
}

import { buildPageMetadata } from '@/lib/seo/metadata';
import { TIMEZONE_CUSTOM_CONTENT } from '@/lib/seo/timezone-custom-content';

export async function generateStaticParams() {
  const customSlugs = Object.keys(TIMEZONE_CUSTOM_CONTENT).map(zone => ({ zone }));
  const abbrSlugs = Object.keys(COMMON_TIMEZONE_ABBREVIATIONS).map(slug => ({ zone: slug }));
  const popularIanaSlugs = [
    'asia-kolkata',
    'america-new-york',
    'europe-london',
    'europe-paris',
    'asia-tokyo',
    'asia-dubai',
    'asia-singapore',
    'australia-sydney',
    'america-los-angeles',
    'america-chicago',
    'america-toronto',
    'europe-berlin',
  ].map(slug => ({ zone: slug }));

  const seen = new Set<string>();
  const combined: { zone: string }[] = [];
  for (const item of [...customSlugs, ...abbrSlugs, ...popularIanaSlugs]) {
    if (!seen.has(item.zone)) {
      seen.add(item.zone);
      combined.push(item);
    }
  }
  return combined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone } = await params;
  const slug = zone.toLowerCase();
  const custom = TIMEZONE_CUSTOM_CONTENT[slug];
  if (custom) {
    return buildPageMetadata(custom.title, custom.description, `/timezone/${slug}`);
  }

  const abbr = findTimezoneAbbr(slug);
  const iana = findIanaZoneBySlug(slug);

  const titleName = abbr ? `${abbr.primaryName} (${abbr.abbr})` : (iana ? `${iana.id} (${iana.abbreviation})` : zone.toUpperCase());
  const offset = abbr ? abbr.offsetStr : (iana ? iana.formattedOffset : 'UTC');
  const cityName = iana ? iana.id.split('/').pop()?.replace(/_/g, ' ') : '';
  const displayLabel = abbr ? `${abbr.abbr} Time` : (cityName ? `${cityName} Time` : `${zone.toUpperCase()} Time`);
  const targetName = abbr ? abbr.abbr : (cityName ? cityName : zone.toUpperCase());

  return buildPageMetadata(
    `What Time is it in ${targetName}? Current ${displayLabel} Now`,
    `What time is it in ${titleName} right now? Live atomic clock, standard UTC offset ${offset}, Daylight Saving Time (DST) status, military time, and major world city clocks.`,
    `/timezone/${slug}`
  );
}

export default async function TimezonePage({ params }: Props) {
  const { zone } = await params;
  const slug = zone.toLowerCase();
  const abbr = findTimezoneAbbr(slug);
  const iana = findIanaZoneBySlug(slug);

  if (!abbr && !iana) {
    notFound();
  }

  const title = abbr ? `${abbr.primaryName} (${abbr.abbr})` : `${iana!.id} (${iana!.city})`;
  const representativeTz = abbr ? abbr.primaryIana : iana!.id;
  const offsetStr = abbr ? abbr.offsetStr : iana!.formattedOffset;
  const displayAbbr = abbr ? abbr.abbr : iana!.abbreviation;
  const hasDst = abbr ? abbr.hasDst : true;
  const isAmbiguous = abbr ? (abbr.meanings.length > 1) : false;
  const notes = abbr ? abbr.notes : undefined;

  // Find cities matching this timezone or offset
  const cities = POPULAR_CITIES.filter(c => {
    if (abbr) {
      return abbr.meanings.some(m => m.iana === c.timezone) || c.timezone === abbr.primaryIana;
    }
    return c.timezone === iana!.id;
  }).slice(0, 12);

  // If few cities directly in timezone, backfill from offset
  const matchingOffsetCities = POPULAR_CITIES.filter(c => {
    const tzEntry = ALL_IANA_TIMEZONES.find(z => z.id === c.timezone);
    return tzEntry && tzEntry.formattedOffset === offsetStr;
  }).slice(0, 6);

  const finalCities = cities.length >= 3 ? cities : Array.from(new Set([...cities, ...matchingOffsetCities]));

  const offsetSlug = offsetToSlug(offsetStr);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${title} Live Time & Offset`,
    description: `Accurate atomic time for ${title}. Offset ${offsetStr}.`,
    url: `https://www.timenumbers.com/timezone/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Time Zones', item: 'https://www.timenumbers.com/time-zones' },
        { '@type': 'ListItem', position: 3, name: title, item: `https://www.timenumbers.com/timezone/${slug}` },
      ],
    },
  };

  const tzFaqs = [
    {
      question: `What time is it in ${title} right now?`,
      answer: `The live clock above displays the exact, calibrated local time currently observed across the ${title} region. Our chronometers sync to atomic reference standards to maintain millisecond precision.`
    },
    {
      question: `What is the standard UTC offset for ${title}?`,
      answer: `${title} is anchored to a standard civil offset of ${offsetStr}. Locations observing this zone are situated ${offsetStr.startsWith('+') ? `${offsetStr.replace('+', '')} hours ahead of` : offsetStr.startsWith('-') ? `${offsetStr.replace('-', '')} hours behind` : 'at'} Coordinated Universal Time (UTC).`
    },
    {
      question: `Does ${title} observe Daylight Saving Time (DST)?`,
      answer: `${title} ${hasDst ? 'observes seasonal Daylight Saving Time transitions, shifting clocks by +1 hour in the spring and resetting in the autumn' : 'remains on standard time year-round with no seasonal clock adjustments'}.`
    },
    {
      question: `Which major cities operate within ${title}?`,
      answer: `Major metropolitan hubs connected to this zone include ${finalCities.slice(0, 4).map(c => c.name).join(', ')}${finalCities.length > 4 ? ', and others' : ''}. Use the comparative grid above to explore individual city clocks.`
    }
  ];

  const custom = TIMEZONE_CUSTOM_CONTENT[slug];
  const faqs = custom?.faqs || tzFaqs;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Time Zones', url: '/time-zones' }, { name: displayAbbr, url: `/timezone/${slug}` }]} />

        {/* Live Detail Client */}
        <TimezoneDetailClient
          title={custom?.h1 || title}
          description={custom?.description}
          representativeTz={representativeTz}
          offsetStr={offsetStr}
          abbreviation={displayAbbr}
          cities={finalCities}
          hasDst={hasDst}
          notes={notes}
          isAmbiguous={isAmbiguous}
        />

        {/* Custom Educational Guide Section */}
        {custom && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-sm">
            <div className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Dedicated Timezone Analysis</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {custom.headings[0] || `${title} Time Standards`}
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
                      Observances, offset conventions, and international coordination for {title}.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Ambiguity Disambiguation Table if multiple meanings */}
        {abbr && abbr.meanings.length > 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Disambiguation: Meanings of {abbr.abbr} Worldwide
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Because three-letter timezone abbreviations are not internationally unique, {abbr.abbr} refers to multiple standard civil offsets depending on context.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {abbr.meanings.map((m, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-900 dark:text-white">{m.name}</span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                      {m.offsetStr}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {m.description}
                  </p>
                  <div className="text-[11px] text-slate-500">
                    <strong>Regions:</strong> {m.regions.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Metadata Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Timezone Specifications & Offset Anchors
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs text-slate-500 block">Civil Offset</span>
              <Link href={`/utc-offset/${offsetSlug}`} className="font-mono font-bold text-blue-600 hover:underline">
                {offsetStr}
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs text-slate-500 block">Primary IANA ID</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {representativeTz}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs text-slate-500 block">Daylight Saving</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {hasDst ? 'Observes Seasonal DST' : 'Year-Round Constant'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
              <span className="text-xs text-slate-500 block">Interactive Map</span>
              <Link href="/timezone-map" className="font-bold text-blue-600 hover:underline">
                View on World Map →
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic FAQ Accordion */}
        <FaqAccordion items={faqs} title={`Frequently Asked Questions: ${custom?.h1 || title}`} />

        {/* Global Links Hub */}
        <RelatedLinksHub title="Explore Related Tools & Zones" />
      </div>
    </div>
  );
}
