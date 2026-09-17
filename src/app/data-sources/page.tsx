import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Database, ShieldCheck, Clock, Globe } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Data Sources & Horological Provenance — TimeNumbers',
  'Learn about the authoritative data sources behind TimeNumbers: the IANA Time Zone Database (tzdb), NOAA solar ephemeris models, and Stratum-1 atomic NTP synchronization standards.',
  '/data-sources'
);

export default function DataSourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Breadcrumbs items={[{ name: 'Data Sources', url: '/data-sources' }]} />
      
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold border border-blue-200/80">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Authoritative Provenance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Data Sources & Horological Standards
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          At TimeNumbers, accuracy is our highest priority. Every clock tick, timezone conversion, and astronomical calculation is anchored in globally recognized scientific and civil standards.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">IANA Time Zone Database (tzdb)</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Maintained by Paul Eggert and the international internet engineering community, the IANA tz database provides canonical historical and future daylight saving rules, leap second records, and civil time offsets worldwide.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">NOAA Solar Ephemeris</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Our sunrise, sunset, solar noon, and twilight calculations utilize the NOAA Solar Position Algorithm, factoring in the equation of time, solar declination, and atmospheric refraction for sub-minute accuracy.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Stratum-1 Atomic Synchronization</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Client drift is benchmarked against primary Stratum-1 Network Time Protocol (NTP) servers synchronized with atomic frequency standards maintained by NIST, BIPM, and GPS constellations.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">GeoNames Global Geocoding</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            City coordinates, administrative boundaries, populations, and country designations are cross-referenced with the open GeoNames geographical database for global geographic accuracy.
          </p>
        </div>
      </div>

      <RelatedLinksHub />
    </div>
  );
}
