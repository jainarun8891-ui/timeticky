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
import { Globe, Clock, ShieldCheck, Compass, ArrowRight, ExternalLink } from 'lucide-react';

interface Props {
  params: Promise<{ zone: string }>;
}

export async function generateStaticParams() {
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

  return [...abbrSlugs, ...popularIanaSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone } = await params;
  const slug = zone.toLowerCase();
  const abbr = findTimezoneAbbr(slug);
  const iana = findIanaZoneBySlug(slug);

  const titleName = abbr ? `${abbr.primaryName} (${abbr.abbr})` : (iana ? `${iana.id} (${iana.abbreviation})` : zone.toUpperCase());
  const offset = abbr ? abbr.offsetStr : (iana ? iana.formattedOffset : 'UTC');

  return {
    title: `Current Time in ${titleName} — Live Clock, Offset & Cities`,
    description: `Exact current time in ${titleName}. Standard offset ${offset}, Daylight Saving Time status, IANA identifier, and live synchronized clocks for major cities worldwide.`,
    alternates: {
      canonical: `https://globaltime.org/timezone/${slug}`,
    },
    openGraph: {
      title: `${titleName} Time — Live Clock & Offset`,
      description: `Exact time in ${titleName}. UTC offset ${offset}, DST rules, and member cities.`,
      url: `https://globaltime.org/timezone/${slug}`,
    },
  };
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
    url: `https://globaltime.org/timezone/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globaltime.org' },
        { '@type': 'ListItem', position: 2, name: 'Time Zones', item: 'https://globaltime.org/time-zones' },
        { '@type': 'ListItem', position: 3, name: title, item: `https://globaltime.org/timezone/${slug}` },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Time Zones', url: '/time-zones' }, { name: displayAbbr, url: `/timezone/${slug}` }]} />

        {/* Live Detail Client */}
        <TimezoneDetailClient
          title={title}
          representativeTz={representativeTz}
          offsetStr={offsetStr}
          abbreviation={displayAbbr}
          cities={finalCities}
          hasDst={hasDst}
          notes={notes}
          isAmbiguous={isAmbiguous}
        />

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

        {/* Global Links Hub */}
        <RelatedLinksHub title="Explore Related Tools & Zones" />
      </div>
    </div>
  );
}
