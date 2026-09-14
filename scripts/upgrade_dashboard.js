const fs = require('fs');

// WorldMapCard.tsx
fs.writeFileSync('src/components/dashboard/WorldMapCard.tsx', `
"use client";

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { WorldMapSvg } from '../art/WorldMapSvg';
import { City, CITIES } from '@/lib/geo/cities';

interface WorldMapCardProps {
  city?: City;
}

export function WorldMapCard({ city = CITIES[0] }: WorldMapCardProps) {
  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-md">
      {/* Map Graphic with live coordinate pin */}
      <div className="w-full flex-1 flex items-center justify-center min-h-[220px]">
        <WorldMapSvg activeLat={city.lat} activeLng={city.lng} className="w-full h-52 sm:h-60" />
      </div>

      {/* Card Footer Information */}
      <div className="mt-4 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <span className="text-3xl">
            {city.countryCode === 'FR' ? '🇫🇷' :
             city.countryCode === 'US' ? '🇺🇸' :
             city.countryCode === 'GB' ? '🇬🇧' :
             city.countryCode === 'JP' ? '🇯🇵' :
             city.countryCode === 'AE' ? '🇦🇪' :
             city.countryCode === 'IN' ? '🇮🇳' :
             city.countryCode === 'AU' ? '🇦🇺' : '🌐'}
          </span>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white text-base block leading-tight">
              {city.name}
            </span>
            <span className="text-xs text-slate-400 block font-mono mt-0.5">
              {city.lat.toFixed(4)}° {city.lat >= 0 ? 'N' : 'S'}, {Math.abs(city.lng).toFixed(4)}° {city.lng >= 0 ? 'E' : 'W'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
            {city.timezone}
          </span>
          <Link
            href={\`/time/\${city.slug}\`}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 transition-colors"
            title="Open location details"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
`, 'utf8');

// WorldClockStrip.tsx
fs.writeFileSync('src/components/dashboard/WorldClockStrip.tsx', `
"use client";

import React, { useState, useEffect } from 'react';
import { Globe, Plus, Sun, Moon } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';
import { EiffelTowerSvg } from '../art/EiffelTowerSvg';
import { StatueOfLibertySvg } from '../art/StatueOfLibertySvg';
import { BigBenSvg } from '../art/BigBenSvg';
import { TokyoTowerSvg } from '../art/TokyoTowerSvg';
import { BurjAlArabSvg } from '../art/BurjAlArabSvg';
import { IndiaGateSvg } from '../art/IndiaGateSvg';
import { SydneyOperaHouseSvg } from '../art/SydneyOperaHouseSvg';
import { GenericSkylineSvg } from '../art/GenericSkylineSvg';

interface WorldClockStripProps {
  selectedCityId?: string;
  onSelectCity?: (city: City) => void;
}

export function WorldClockStrip({ selectedCityId = "paris-fr", onSelectCity }: WorldClockStripProps) {
  const [now, setNow] = useState(new Date());
  const [citiesList, setCitiesList] = useState<City[]>(CITIES.slice(0, 7));

  useEffect(() => {
    const timer = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderLandmark = (landmarkId?: string) => {
    switch (landmarkId) {
      case 'eiffel': return <EiffelTowerSvg className="w-10 h-16" />;
      case 'liberty': return <StatueOfLibertySvg className="w-10 h-16" />;
      case 'bigben': return <BigBenSvg className="w-10 h-16" />;
      case 'tokyotower': return <TokyoTowerSvg className="w-10 h-16" />;
      case 'burj': return <BurjAlArabSvg className="w-10 h-16" />;
      case 'indiagate': return <IndiaGateSvg className="w-10 h-16" />;
      case 'operahouse': return <SydneyOperaHouseSvg className="w-10 h-16" />;
      default: return <GenericSkylineSvg className="w-10 h-16" />;
    }
  };

  const isDaytime = (city: City) => {
    const hour = parseInt(formatTimeInZone(now, city.timezone, false, false).split(':')[0], 10);
    return hour >= 6 && hour < 19;
  };

  return (
    <section className="w-full my-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Globe className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
              World Clock
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Local times around the world
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const extra = CITIES.find(c => !citiesList.some(item => item.id === c.id));
            if (extra) setCitiesList([...citiesList, extra]);
          }}
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add cities</span>
        </button>
      </div>

      {/* Horizontal Strip of 7 City Cards matching reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {citiesList.map((city) => {
          const isSelected = city.id === selectedCityId;
          const timeString = formatTimeInZone(now, city.timezone, false, false);
          const dateString = new Intl.DateTimeFormat("en-US", {
            timeZone: city.timezone,
            weekday: "short",
            month: "short",
            day: "numeric"
          }).format(now);
          const isDay = isDaytime(city);

          return (
            <div
              key={city.id}
              onClick={() => onSelectCity && onSelectCity(city)}
              className={\`relative cursor-pointer bg-white dark:bg-slate-900 rounded-[26px] p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg \${
                isSelected
                  ? 'border-blue-500 ring-4 ring-blue-500/15 shadow-md bg-blue-50/20 dark:bg-slate-800/60'
                  : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 shadow-xs'
              }\`}
            >
              {/* Landmark Vector Art */}
              <div className="flex justify-center mb-3.5">
                {renderLandmark(city.landmarkId)}
              </div>

              {/* City & Country */}
              <div className="text-center">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  {city.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5 font-medium">
                  {city.country}
                </p>

                {/* Big Digits */}
                <div className="text-2xl font-black text-slate-900 dark:text-white my-1.5 font-mono tracking-tight">
                  {timeString}
                </div>

                {/* Date */}
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {dateString}
                </p>

                {/* Day / Night Indicator Pill */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700/60">
                  {isDay ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span>Day</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Night</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
`, 'utf8');

// page.tsx (with wide layout max-w-[1720px])
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
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Paris by default

  return (
    <div className="w-full min-h-full pb-16">
      {/* 1. Global Search Pill */}
      <GlobalSearchBar />

      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        {/* 2. Hero Row (Hero Live Clock on Left, World Map on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 flex">
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
        <section className="mt-16 pt-10 border-t border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-5xl mx-auto space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            How Global Time and Synchronization Work
          </h2>
          <p>
            GlobalTime synchronizes in real time with authoritative server time via NTP-calibrated timestamps. By measuring round-trip network latency and filtering jitter, your browser clock offset is continuously compensated to maintain second-level precision without requiring GPS permissions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-xs">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-1.5">
                Why Timezone Selection Matters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Time zones reflect regional administrative standards rather than mere lines of longitude. Countries observe distinct Daylight Saving Time transitions, half-hour offsets (such as India Standard Time UTC+5:30), and quarter-hour adjustments (Nepal UTC+5:45).
              </p>
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-xs">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-1.5">
                What UTC Means
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks. Successor to Greenwich Mean Time (GMT), UTC remains constant across the planet and does not observe daylight saving shifts.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
`);

console.log('Upgraded WorldMapCard, WorldClockStrip, and page.tsx');
