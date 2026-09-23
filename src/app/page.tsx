"use client";

import React, { useState } from 'react';
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar';
import { PrecisionClockHero } from '@/components/home/PrecisionClockHero';
import { HeroClockCard } from '@/components/dashboard/HeroClockCard';
import { WorldMapCard } from '@/components/dashboard/WorldMapCard';
import { WorldClockStrip } from '@/components/dashboard/WorldClockStrip';
import { TimeDifferenceCard } from '@/components/dashboard/TimeDifferenceCard';
import { MeetingPlannerCard } from '@/components/dashboard/MeetingPlannerCard';
import { SunDaylightCard } from '@/components/dashboard/SunDaylightCard';
import { DateCalendarCard } from '@/components/dashboard/DateCalendarCard';
import { QuickTimerCard } from '@/components/dashboard/QuickTimerCard';
import { CountryInfoCard } from '@/components/dashboard/CountryInfoCard';
import { QuoteCard } from '@/components/dashboard/QuoteCard';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { JsonLd } from '@/components/seo/JsonLd';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { City, CITIES } from '@/lib/geo/cities';
import { Clock, Globe, Calendar, ShieldCheck, Sparkles, Compass } from 'lucide-react';

const content = HUB_PAGES_CUSTOM_CONTENT['/'];

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Paris default

  return (
    <div className="w-full min-h-full pb-16">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-5 space-y-6">
        
        {/* Top Full Search Bar with Try suggestions */}
        <GlobalSearchBar />

        {/* Visitor's Live Precision Clock & Quick Directory Navigation (100-pt Item 2) */}
        <PrecisionClockHero />

        {/* Global Hub Spotlight Clock Card (~73%) + World Map Card (~27%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8 xl:col-span-9 flex">
            <HeroClockCard
              currentCity={selectedCity}
              onSelectCity={(city) => setSelectedCity(city)}
            />
          </div>
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <WorldMapCard
              currentCity={selectedCity}
              onSelectCity={(city) => setSelectedCity(city)}
            />
          </div>
        </div>

        {/* Row 2: World Clock 7 Landmarks Horizontal Strip */}
        <WorldClockStrip
          currentCity={selectedCity}
          onSelectCity={(city) => setSelectedCity(city)}
        />

        {/* Row 3: 4 Columns (Time Difference, Meeting Planner, Sun & Daylight, Date & Calendar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          <TimeDifferenceCard currentCity={selectedCity} />
          <MeetingPlannerCard currentCity={selectedCity} />
          <SunDaylightCard currentCity={selectedCity} />
          <DateCalendarCard currentCity={selectedCity} />
        </div>

        {/* Row 4: 3 Columns (Timer/Countdown, Country Info, Quote Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-4 flex w-full">
              <QuickTimerCard className="w-full h-full" />
            </div>
            <div className="lg:col-span-5 flex w-full">
              <CountryInfoCard currentCity={selectedCity} className="w-full h-full" />
            </div>
            <div className="lg:col-span-3 flex w-full">
              <QuoteCard className="w-full h-full" />
            </div>
          </div>

        {/* Editorial Chronometry Guide & SEO Architecture */}
        <section className="bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-8 backdrop-blur-xl shadow-xs">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Stratum-1 Atomic Synchronization</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Exact Time Now — Live Atomic Clock &amp; Global World Time
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Need to know the exact time right now? TimeNumbers delivers atomic-level precision straight to your screen, calibrated directly against Stratum-1 time servers. Whether you are synchronizing an automatic chronograph, verifying server logs, or jumping onto a cross-border video call, our live clock accounts for browser latency and device drift to display true Coordinated Universal Time (UTC) and your exact local time.
            </p>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Beyond your immediate second, explore live clocks across 500+ major metropolitan areas, calculate precise time differences between time zones, and coordinate multi-city team schedules without timezone confusion. Bookmark this page to check your device accuracy anytime, or grab our responsive clock widgets to display real-time clocks on your own web projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Precise Local Time and Device Synchronization
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Hardware monotonic timestamps adjust for round-trip latency to calibrate your device with true atomic second accuracy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                <Globe className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Global World Clock and Time Zone Comparisons
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Track live local times across 500+ cities with IANA timezone rules, astronomical twilight, and instant search.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <Calendar className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                International Meeting Planner &amp; Time Difference Tools
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Color-coded 24-hour overlap grids clearly highlight mutual 9 AM – 5 PM working hours across distributed teams.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Atomic Time Standards, UTC Baselines, and DST Rules
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Authoritative reference for UTC, GMT, spring forward and fall back clock transitions with zero Mad-Libs templating.
              </p>
            </div>
          </div>
        </section>

        {/* Homepage Google SERP FAQ Accordion */}
        <JsonLd type="faq" data={content.faqs} />
        <FaqAccordion items={content.faqs} title="Frequently Asked Questions About Global Time" />

        {/* Global Related Links Directory */}
        <RelatedLinksHub />

      </div>
    </div>
  );
}
