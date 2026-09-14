import { FaqAccordion } from '@/components/common/FaqAccordion';
import { getTimezoneFaqs } from '@/lib/seo/page-faqs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TIMEZONES, getTimeZoneBySlug, formatTimeInZone, isDstActive } from '@/lib/time/timezones';
import { getCitiesByTimezone } from '@/lib/geo/cities';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Clock, Globe, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  return TIMEZONES.map(t => ({ slug: t.shortName.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tz = getTimeZoneBySlug(slug);
  if (!tz) return { title: 'Time Zone Not Found' };
  return buildPageMetadata(
    `${tz.name} (${tz.shortName}) Now`,
    `Current time in ${tz.name} (${tz.shortName}), UTC offset ${tz.formattedOffset}, countries using it, and DST rules.`,
    `/time-zone/${tz.shortName.toLowerCase()}`
  );
}

export default async function TimeZoneDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tz = getTimeZoneBySlug(slug);
  if (!tz) notFound();

  const now = new Date();
  const time = formatTimeInZone(now, tz.id === 'UTC' ? 'UTC' : tz.id, false, true);
  const cities = getCitiesByTimezone(tz.id);
  const dstActive = isDstActive(now, tz.id === 'UTC' ? 'UTC' : tz.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <Link href="/time-zones" className="hover:text-blue-600">
          Time Zones
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-slate-900 dark:text-white">{tz.shortName}</span>
      </nav>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {tz.region} Timezone
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
              {tz.name} ({tz.shortName})
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Standard Offset: {tz.formattedOffset} • IANA: {tz.id}
            </p>
          </div>

          <div className="text-center bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-2xl border border-slate-200/70 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 font-medium block">Live Time</span>
            <span className="text-3xl font-mono font-black text-slate-900 dark:text-white block">{time}</span>
            <span className="text-[10px] text-emerald-600 font-semibold">● Atomic Synced</span>
          </div>
        </div>

        {tz.isAmbiguous && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
            <span className="font-bold">Note on Ambiguity: </span>
            {tz.ambiguityNote}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Daylight Saving Status:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {tz.hasDst ? (dstActive ? 'Currently active (clocks shifted 1 hour)' : 'Observed during summer months') : 'Does not observe Daylight Saving Time'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Countries / Territories:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {tz.countries.join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Cities using this Timezone */}
      {cities.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Major Cities in {tz.shortName}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/time/${city.slug}`}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700"
              >
                <span className="font-bold text-sm text-slate-900 dark:text-white block">{city.name}</span>
                <span className="text-xs text-slate-400 block">{city.country}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    
      <FaqAccordion items={getTimezoneFaqs(tz)} title={`Frequently Asked Questions About ${tz.name} (${tz.shortName})`} />
      <RelatedLinksHub />
    </div>
  );
}
