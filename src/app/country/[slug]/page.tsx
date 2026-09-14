import { FaqAccordion } from '@/components/common/FaqAccordion';
import { getCountryFaqs } from '@/lib/seo/page-faqs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCountryBySlug, getAllCountries } from '@/lib/geo/countries';
import { getCitiesByCountry } from '@/lib/geo/cities';
import { formatTimeInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe, Clock, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  return getAllCountries().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found' };
  return buildPageMetadata(
    `Current Time in ${country.name}`,
    `Current local times across ${country.name}, capital time in ${country.capital}, timezones used, and daylight saving status.`,
    `/country/${country.slug}`
  );
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const cities = getCitiesByCountry(country.code);
  const now = new Date();
  const capitalTime = formatTimeInZone(now, country.timezones[0], false, true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-blue-600 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-slate-900 dark:text-white">{country.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Time in {country.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Capital: <span className="font-semibold text-slate-700 dark:text-slate-300">{country.capital}</span> • Population: {country.population}
              </p>
            </div>
          </div>

          <div className="text-right bg-blue-50 dark:bg-slate-800 px-5 py-3 rounded-2xl border border-blue-100 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 font-medium block">Capital Time ({country.capital})</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{capitalTime}</span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block">{getUtcOffsetString(now, country.timezones[0])}</span>
          </div>
        </div>

        {country.dstNotes && (
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200">Daylight Saving Rule: </span>
            {country.dstNotes}
          </div>
        )}
      </div>

      {/* Major Cities List */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Major Cities in {country.name}
        </h2>

        {cities.length === 0 ? (
          <p className="text-xs text-slate-400">Primary timezone: {country.timezones.join(', ')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cities.map((city) => {
              const localTime = formatTimeInZone(now, city.timezone, false, false);
              return (
                <Link
                  key={city.id}
                  href={`/time/${city.slug}`}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-all"
                >
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">{city.name}</span>
                    <span className="text-[11px] text-slate-400 block">{city.timezone}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono block">{localTime}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{getUtcOffsetString(now, city.timezone)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    
      <FaqAccordion items={getCountryFaqs(country)} title={`Frequently Asked Questions About ${country.name}`} />
      <RelatedLinksHub />
    </div>
  );
}
