const fs = require('fs');

fs.writeFileSync('src/app/page.tsx', `
"use client";

import React, { useState } from 'react';
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar';
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
import { City, CITIES } from '@/lib/geo/cities';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Paris by default matching reference

  return (
    <div className="w-full min-h-full pb-12">
      {/* 1. Global Search Pill */}
      <GlobalSearchBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 2. Hero Row (Hero Live Clock on Left, World Map on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <HeroClockCard
              currentCity={selectedCity}
              onSelectCity={(city) => setSelectedCity(city)}
            />
          </div>
          <div className="lg:col-span-4 flex">
            <WorldMapCard city={selectedCity} />
          </div>
        </div>

        {/* 3. World Clock Horizontal City Cards */}
        <WorldClockStrip
          selectedCityId={selectedCity.id}
          onSelectCity={(city) => setSelectedCity(city)}
        />

        {/* 4. Middle Row: 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TimeDifferenceCard currentCity={selectedCity} />
          <MeetingPlannerCard currentCity={selectedCity} />
          <SunDaylightCard currentCity={selectedCity} />
          <DateCalendarCard currentCity={selectedCity} />
        </div>

        {/* 5. Bottom Row: 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickTimerCard />
          <CountryInfoCard currentCity={selectedCity} />
          <QuoteCard />
        </div>

        {/* 6. Factual Informational Section (Requirement #67) */}
        <section className="mt-14 pt-8 border-t border-slate-200/70 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            How Global Time and Synchronization Work
          </h2>
          <p>
            GlobalTime synchronizes in real time with authoritative server time via NTP-calibrated timestamps. By measuring round-trip network latency and filtering jitter, your browser clock offset is continuously compensated to maintain second-level precision without requiring GPS permissions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-1">
                Why Timezone Selection Matters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Time zones reflect regional administrative standards rather than mere lines of longitude. Countries observe distinct Daylight Saving Time transitions, half-hour offsets (such as India Standard Time UTC+5:30), and quarter-hour adjustments (Nepal UTC+5:45).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-1">
                What UTC Means
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks. Successor to Greenwich Mean Time (GMT), UTC remains constant across the planet and does not observe daylight saving shifts.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
`, 'utf8');

console.log('src/app/page.tsx updated');
