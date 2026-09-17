import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { SunriseSunsetClient } from './SunriseSunsetClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Sun, Sunrise, Sunset, ShieldCheck, MapPin, ArrowRight, Camera } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Sunrise and Sunset Times Worldwide — Solar Noon & Twilight Calculator',
  'Check accurate sunrise, sunset, day length, and twilight hours for any city worldwide. Includes civil, nautical, and astronomical dawn and dusk calculations.',
  '/sunrise-sunset'
);

const SUN_FAQS = [
  {
    question: "How are sunrise and sunset times calculated?",
    answer: "We calculate sunrise and sunset based on the exact minute the top edge of the sun crosses the horizon, using the trusted solar position models developed by NOAA. We also factor in atmospheric refraction—the way Earth's air gently bends light rays—so your times reflect what you actually see in the sky."
  },
  {
    question: "What is Solar Noon?",
    answer: "Solar Noon is the peak of the solar day—the exact moment when the sun reaches its highest point in the sky for your specific longitude. It represents true astronomical midday, dividing today's daylight into two equal halves."
  }
];

const POPULAR_SOLAR_CITIES = [
  { name: 'Delhi', country: 'India', href: '/sunrise-sunset/delhi', desc: 'Tropical twilight, IST solar noon & seasonal day length variations' },
  { name: 'New York', country: 'United States', href: '/sunrise-sunset/new-york', desc: 'Eastern solar calendar, Manhattanhenge alignments & golden hour' },
  { name: 'London', country: 'United Kingdom', href: '/sunrise-sunset/london', desc: 'Greenwich meridian solar noon, BST summer solstice & winter dusk' },
  { name: 'Tokyo', country: 'Japan', href: '/sunrise-sunset/tokyo', desc: 'Early eastern dawn, JST solar apex & Mount Fuji silhouettes' },
  { name: 'Paris', country: 'France', href: '/sunrise-sunset/paris', desc: 'Long European summer twilight, CET daylight duration & solar zenith' },
];

export default function SunriseSunsetPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Sunrise & Sunset","url":"/sunrise-sunset"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Sunrise & Sunset', url: '/sunrise-sunset' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Sun className="w-3.5 h-3.5" />
            Solar Ephemeris Calculator
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Sunrise & Sunset Times
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover exact sunrise, sunset, daylight duration, civil twilight, and solar noon for any city worldwide.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-amber-400" />
              <span>NOAA Solar Algorithm</span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset className="w-4 h-4 text-orange-400" />
              <span>Atmospheric Refraction Adjusted</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Full Twilight Breakdown</span>
            </div>
          </div>
        </div>
      </div>

      <SunriseSunsetClient />

      {/* Featured Cities & Photography Links */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sunrise className="w-4 h-4 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Featured Global Metropolises — Today's Dawn & Dusk
            </h2>
          </div>
          <Link
            href="/golden-hour"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Golden Hour Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_SOLAR_CITIES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-amber-300 dark:hover:border-amber-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {c.country}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href="/golden-hour"
            className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/80 dark:border-amber-800/60 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  Photography Tool
                </span>
                <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                Golden Hour Calculator
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculates precise blue hour, golden hour, and magic hour lighting angles for photographers worldwide.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Solar Times"
          subtitle="Learn how sunrise and twilight angles are computed worldwide."
          items={SUN_FAQS}
        />
      </div>

      <RelatedLinksHub
        currentPath="/sunrise-sunset"
        title="Explore Related Solar & Chronometry Tools"
        subtitle="View moon phase data, compare time zones, or check clock accuracy."
      />
    </div>
  );
}
