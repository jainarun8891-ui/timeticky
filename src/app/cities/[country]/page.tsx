import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCountries, getCountryBySlug } from '@/lib/geo/countries';
import { getCitiesByCountry, POPULAR_CITIES } from '@/lib/geo/cities';
import { CitiesDirectoryClient } from '../CitiesDirectoryClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Building2, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

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
    return {
      title: 'Country Cities Not Found — GlobalTime',
    };
  }

  return {
    title: `Cities in ${country.name} — Current Local Time & Major Clocks`,
    description: `Current local time in major cities across ${country.name}. Capital time in ${country.capital}, timezone offsets, and daylight saving status.`,
    alternates: {
      canonical: `https://globaltime.org/cities/${slug}`,
    },
    openGraph: {
      title: `Cities in ${country.name} — GlobalTime`,
      description: `Explore major cities in ${country.name} with live synchronized clocks and time difference.`,
      url: `https://globaltime.org/cities/${slug}`,
    },
  };
}

export default async function CountryCitiesPage({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const cities = getCitiesByCountry(country.code);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Cities in ${country.name}`,
    description: `Metropolitan cities and current clocks in ${country.name}.`,
    url: `https://globaltime.org/cities/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globaltime.org' },
        { '@type': 'ListItem', position: 2, name: 'Cities', item: 'https://globaltime.org/cities' },
        { '@type': 'ListItem', position: 3, name: country.name, item: `https://globaltime.org/cities/${slug}` },
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

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore All Global Locations & Calendars" />
      </div>
    </div>
  );
}
