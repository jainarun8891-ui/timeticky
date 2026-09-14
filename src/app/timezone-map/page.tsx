import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { TimezoneMapClient } from './TimezoneMapClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Globe, Clock, Compass, ShieldCheck, MapPin, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interactive World Time Zone Map — Live Global Clock Bands',
  description: 'Explore the interactive world time zone map. Visualise 24 international longitudinal time bands, live UTC offsets, local time, and major cities across every time zone.',
  alternates: {
    canonical: 'https://globaltime.org/timezone-map',
  },
  openGraph: {
    title: 'Interactive World Time Zone Map — GlobalTime',
    description: 'Explore world time zones by longitudinal meridian, UTC offset, and major metropolitan clusters in real time.',
    url: 'https://globaltime.org/timezone-map',
  },
};

export default function TimezoneMapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Interactive World Time Zone Map',
    description: 'Live interactive world map displaying longitudinal time zone bands and current local times.',
    url: 'https://globaltime.org/timezone-map',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globaltime.org' },
        { '@type': 'ListItem', position: 2, name: 'Time Zones', item: 'https://globaltime.org/time-zones' },
        { '@type': 'ListItem', position: 3, name: 'Time Zone Map', item: 'https://globaltime.org/timezone-map' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{"name":"Time Zones","url":"/time-zones"},{"name":"World Map","url":"/timezone-map"}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header Breadcrumb & Intro */}
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/time-zones" className="hover:text-blue-600 transition-colors">Time Zones</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">Map</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Globe className="w-3.5 h-3.5" />
                Planetary Cartography & Meridians
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Interactive World Time Zone Map
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              Each 15° band of longitude represents approximately one solar hour. Click or hover any longitudinal band below to inspect current regional clocks, offsets, and canonical cities.
            </p>
          </div>
        </div>

        {/* Interactive Map Client */}
        <TimezoneMapClient />

        {/* Deep Explanatory Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 w-fit">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              The 15° Meridian Principle
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Because the Earth completes a 360-degree rotation once every 24 hours, the surface of the globe is geometrically partitioned into 24 standard meridians, each spaced 15 degrees of longitude apart.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Prime Meridian & UTC Anchor
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Coordinated Universal Time (UTC) is anchored at 0° longitude running through the Royal Observatory in Greenwich, London. Eastward meridians add hours (UTC+), while westward meridians subtract hours (UTC-).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 w-fit">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              International Date Line (IDL)
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Located roughly around the 180° meridian in the Pacific Ocean, crossing the International Date Line shifts the calendar date forward or backward by an entire 24-hour cycle.
            </p>
          </div>
        </div>

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Time Platforms & Tools" />
      </div>
    </div>
  );
}
