import { FaqAccordion } from '@/components/common/FaqAccordion';
import { getCountryFaqs } from '@/lib/seo/page-faqs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getCountryBySlug, getAllCountries } from '@/lib/geo/countries';
import { getCitiesByCountry } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { formatTimeInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChevronRight, Compass } from 'lucide-react';
import { COUNTRY_CUSTOM_CONTENT } from '@/lib/seo/country-custom-content';

export async function generateStaticParams() {
  return getAllCountries().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'world') return buildPageMetadata('Country Time Directory', 'Global country time index.', '/countries');
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found' };

  const custom = COUNTRY_CUSTOM_CONTENT[country.slug];
  if (custom) {
    return buildPageMetadata(custom.title, custom.description, `/countries/${country.slug}`);
  }

  return buildPageMetadata(
    `Current Time in ${country.name} Right Now — Official Clocks & Time Zones`,
    `What time is it in ${country.name} right now? Check current local time in ${country.capital} and major cities with live running seconds, UTC offsets, and DST rules.`,
    `/countries/${country.slug}`
  );
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'world') {
    permanentRedirect('/countries');
  }
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const custom = COUNTRY_CUSTOM_CONTENT[country.slug];
  const faqs = custom?.faqs || getCountryFaqs(country);
  const cities = getCitiesByCountry(country.code);
  const now = new Date();
  const capitalTime = formatTimeInZone(now, country.timezones[0], false, true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Standardized Breadcrumbs (auto-generates Schema.org JSON-LD without duplicate tags) */}
      <Breadcrumbs
        items={[
          { name: 'Countries', url: '/countries' },
          { name: country.name, url: `/countries/${country.slug}` },
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {custom?.h1 || `Time in ${country.name}`}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {custom?.description ? custom.description : `Capital: ${country.capital} • Population: ${country.population}`}
              </p>
            </div>
          </div>

          <div className="text-right bg-blue-50 dark:bg-slate-800 px-5 py-3 rounded-2xl border border-blue-100 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 font-medium block">Capital Time ({country.capital})</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{capitalTime}</span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block">{getUtcOffsetString(now, country.timezones[0])}</span>
          </div>
        </div>

        {country.slug === 'united-states' && (
          <div className="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-sm text-blue-950 dark:text-blue-200 block">
                Looking for live clocks across all US time zones?
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-300">
                View real-time atomic clocks for Eastern, Central, Mountain, Pacific, Alaska, and Hawaii.
              </span>
            </div>
            <Link
              href="/united-states-time-now"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors text-center"
            >
              US Time Now Hub →
            </Link>
          </div>
        )}

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
                  href={`/time/${getCityRootSlug(city)}`}
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

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
          <span className="text-slate-500">Need specific city time and local schedules in {country.name}?</span>
          <Link
            href={`/cities/${country.slug}`}
            className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Browse All {country.name} Cities</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {custom && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>National Chronometry & Time Zones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {custom.headings[0] || `Time in ${country.name}`}
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
                    National timekeeping policies, statutory observances, and regional time zone distribution in {country.name}.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <FaqAccordion items={faqs} title={`Frequently Asked Questions About ${country.name}`} />
      <RelatedLinksHub />
    </div>
  );
}
