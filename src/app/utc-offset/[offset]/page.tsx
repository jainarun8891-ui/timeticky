import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { parseOffsetSlug, getLocationsForOffset } from '@/lib/time/timezone-lookup';
import { TimezoneDetailClient } from '@/components/common/TimezoneDetailClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { Clock, Globe, ArrowRight, ShieldCheck, Layers } from 'lucide-react';

interface Props {
  params: Promise<{ offset: string }>;
}

export async function generateStaticParams() {
  const commonOffsets = [
    'utc-plus-0',
    'utc-plus-1',
    'utc-plus-2',
    'utc-plus-3',
    'utc-plus-4',
    'utc-plus-5',
    'utc-plus-5-30',
    'utc-plus-5-45',
    'utc-plus-6',
    'utc-plus-7',
    'utc-plus-8',
    'utc-plus-9',
    'utc-plus-9-30',
    'utc-plus-10',
    'utc-plus-11',
    'utc-plus-12',
    'utc-minus-3',
    'utc-minus-4',
    'utc-minus-5',
    'utc-minus-6',
    'utc-minus-7',
    'utc-minus-8',
    'utc-minus-9',
    'utc-minus-10',
  ];

  return commonOffsets.map(offset => ({ offset }));
}

import { buildPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { offset } = await params;
  const parsed = parseOffsetSlug(offset);

  if (!parsed) {
    return buildPageMetadata('UTC Offset Not Found', 'UTC offset timezone band not found.', `/utc-offset/${offset.toLowerCase()}`);
  }

  return buildPageMetadata(
    `What Time is it in ${parsed.formattedOffset}? Exact ${parsed.formattedOffset} Time Now`,
    `What time is it in ${parsed.formattedOffset} right now? Exact local time for countries and cities observing ${parsed.formattedOffset}, IANA time zones, UTC difference, and live clocks.`,
    `/utc-offset/${offset.toLowerCase()}`
  );
}

export default async function UtcOffsetPage({ params }: Props) {
  const { offset } = await params;
  const parsed = parseOffsetSlug(offset);

  if (!parsed) {
    notFound();
  }

  const { zones, cities } = getLocationsForOffset(parsed.formattedOffset);

  // Pick representative timezone for live calculations
  const representativeTz = zones.length > 0 ? zones[0].id : 'UTC';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${parsed.formattedOffset} Time Zone & Clocks`,
    description: `Current time in ${parsed.formattedOffset}. Member cities, IANA zones, and time difference.`,
    url: `https://www.timenumbers.com/utc-offset/${offset.toLowerCase()}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Time Zones', item: 'https://www.timenumbers.com/time-zones' },
        { '@type': 'ListItem', position: 3, name: parsed.formattedOffset, item: `https://www.timenumbers.com/utc-offset/${offset.toLowerCase()}` },
      ],
    },
  };

  const offsetFaqs = [
    {
      question: `What is ${parsed.formattedOffset} time right now?`,
      answer: `Clocks in the ${parsed.formattedOffset} zone are currently ticking at ${parsed.formattedOffset} relative to Coordinated Universal Time (UTC). Check the live synchronized chronometer above for the exact time to the second.`
    },
    {
      question: `Which countries and cities use the ${parsed.formattedOffset} offset?`,
      answer: `Locations in this longitudinal offset band include ${cities.slice(0, 4).map(c => c.name).join(', ')}${cities.length > 4 ? ', and others' : ''}, encompassing ${zones.length} distinct IANA timezone identifiers.`
    },
    {
      question: `How many hours difference is ${parsed.formattedOffset} from UTC?`,
      answer: `${parsed.formattedOffset} is exactly ${parsed.formattedOffset.replace('UTC', '').trim() || '0'} hours relative to UTC / GMT prime meridian.`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={offsetFaqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Time Zones', url: '/time-zones' }, { name: parsed.formattedOffset, url: `/utc-offset/${offset.toLowerCase()}` }]} />

        {/* Live Detail Client */}
        <TimezoneDetailClient
          title={`Time in ${parsed.formattedOffset}`}
          representativeTz={representativeTz}
          offsetStr={parsed.formattedOffset}
          abbreviation={parsed.label}
          cities={cities.slice(0, 12)}
          hasDst={true}
          notes={`The standard time offset ${parsed.formattedOffset} is observed by territories situated at or near the corresponding longitudinal meridian.`}
        />

        {/* IANA Time Zones in this Offset */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                IANA Time Zones in {parsed.formattedOffset}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Canonical identifiers within the tz database matching this civil offset.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {zones.length} {zones.length === 1 ? 'zone' : 'zones'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {zones.map((z) => (
              <Link
                key={z.id}
                href={`/timezone/${z.slug}`}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-800 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">
                    {z.id}
                  </div>
                  <div className="text-xs text-slate-500">
                    {z.city} ({z.region})
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <FaqAccordion items={offsetFaqs} title={`Frequently Asked Questions: ${parsed.formattedOffset}`} />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore All Time Zones & Offsets" />
      </div>
    </div>
  );
}
