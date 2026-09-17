import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCountries, getCountryBySlug } from '@/lib/geo/countries';
import { getCitiesByCountry, POPULAR_CITIES } from '@/lib/geo/cities';
import { CitiesDirectoryClient } from '../CitiesDirectoryClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Building2, Globe, ArrowRight, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return getAllCountries().map(c => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    return buildPageMetadata('Country Cities Not Found', 'Country cities directory not found.', `/cities/${slug}`);
  }

  return buildPageMetadata(
    `Cities in ${country.name} — Local Clocks`,
    `Current local time in major cities across ${country.name}. Capital time in ${country.capital}, timezone offsets, and daylight saving status.`,
    `/cities/${slug}`
  );
}

export default async function CountryCitiesPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const cities = getCitiesByCountry(country.code);

  const countryFaqs = [
    {
      question: `What is the capital city of ${country.name} and what timezone does it use?`,
      answer: `The capital city of ${country.name} is ${country.capital}. Clocks in ${country.capital} operate under the official ${country.region} time standard with verified astronomical precision.`
    },
    {
      question: `Does ${country.name} observe Daylight Saving Time (DST)?`,
      answer: country.hasDst
        ? `${country.name} observes Daylight Saving Time. ${country.dstNotes || 'Clocks advance one hour during the summer period to optimize daylight utilization.'}`
        : `${country.name} does not observe Daylight Saving Time. Civil clocks remain consistent year-round without seasonal one-hour shifts.`
    },
    {
      question: `How many official time zones span across ${country.name}?`,
      answer: `${country.name} encompasses ${country.timezones.length} standard IANA time zone identifier${country.timezones.length > 1 ? 's' : ''} (${country.timezones.slice(0, 3).join(', ')}${country.timezones.length > 3 ? ' and others' : ''}). When traveling or scheduling meetings across multiple regions, verifying local regional offsets is recommended.`
    },
    {
      question: `What are typical commercial business hours in ${country.name}?`,
      answer: `Standard corporate and financial office hours across ${country.name} generally span Monday through Friday from 09:00 to 17:00 or 18:00 local time. International conference calls should ideally be scheduled within these windows for optimal responsiveness.`
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Cities in ${country.name}`,
    description: `Metropolitan cities and current clocks in ${country.name}.`,
    url: `https://www.timenumbers.com/cities/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://www.timenumbers.com/cities' },
        { '@type': 'ListItem', position: 3, name: country.name, item: `https://www.timenumbers.com/cities/${slug}` },
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
        {/* Navigation Breadcrumbs & Header */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ name: 'Cities', url: '/cities' }, { name: country.name, url: `/cities/${slug}` }]} />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <span className="text-base">{country.flag}</span>
                {country.name} Municipal Clocks
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Cities in {country.name}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Explore verified real-time digital clocks, sunrise schedules, and timezone offsets for major metropolitan hubs across {country.name}.
              </p>
            </div>

            <Link
              href={`/country/${country.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View Full {country.name} Country Profile <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filtered Cities Client */}
        <CitiesDirectoryClient
          initialCities={cities}
          countryFilter={country.name}
          countryName={country.name}
        />

        {/* Country Time Guide Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Time Architecture and Regional Offsets in {country.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">National Capital and Administrative Time</h3>
              <p>
                As the sovereign capital of {country.name}, {country.capital} anchors national governance, banking institutions, and diplomatic operations.
                Civil time in {country.capital} sets the benchmark for nationwide broadcast networks, financial market opening bells, and commercial logistics.
              </p>
              <p>
                With an estimated population of {country.population}, {country.name} represents a major geopolitical and commercial center in the {country.region} theater.
                Synchronizing schedules with its commercial capitals ensures efficient cross-border trade and remote enterprise workflows.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Daylight Saving Status & Seasonal Adjustments</h3>
              <p>
                {country.hasDst
                  ? `${country.name} participates in seasonal Daylight Saving Time shifts. ${country.dstNotes || 'During summer months, clocks advance by one hour to align daylight with consumer activity and reduce evening electrical load.'}`
                  : `${country.name} maintains a steady standard time throughout all twelve months of the year without seasonal clock manipulation, providing predictable scheduling for foreign partners.`}
              </p>
              <p>
                All municipal clocks on TimeNumbers are synchronized to atomic NTP standards and cross-referenced with the IANA time zone database to ensure zero seconds drift across every region.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic FAQ Accordion */}
        <FaqAccordion
          items={countryFaqs}
          title={`Frequently Asked Questions About Time in ${country.name}`}
          subtitle={`Essential timekeeping details, capital offsets, and scheduling tips for ${country.name}.`}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore All Global Locations & Calendars" />
      </div>
    </div>
  );
}
