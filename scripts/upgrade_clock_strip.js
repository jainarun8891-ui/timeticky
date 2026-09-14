const fs = require('fs');

fs.writeFileSync('src/components/dashboard/WorldClockStrip.tsx', `
"use client";

import React, { useState, useEffect } from 'react';
import { Globe, Plus, Sun, Moon } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { formatTimeInZone } from '@/lib/time/timezones';
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
      case 'eiffel': return <EiffelTowerSvg className="w-7 h-10" />;
      case 'liberty': return <StatueOfLibertySvg className="w-7 h-10" />;
      case 'bigben': return <BigBenSvg className="w-7 h-10" />;
      case 'tokyotower': return <TokyoTowerSvg className="w-7 h-10" />;
      case 'burj': return <BurjAlArabSvg className="w-7 h-10" />;
      case 'indiagate': return <IndiaGateSvg className="w-7 h-10" />;
      case 'operahouse': return <SydneyOperaHouseSvg className="w-7 h-10" />;
      default: return <GenericSkylineSvg className="w-7 h-10" />;
    }
  };

  const isDaytime = (city: City) => {
    const hour = parseInt(formatTimeInZone(now, city.timezone, false, false).split(':')[0], 10);
    return hour >= 6 && hour < 19;
  };

  return (
    <section className="w-full my-2">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
              World Clock
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
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
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add cities</span>
        </button>
      </div>

      {/* Streamlined, Compact Height Horizontal City Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
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
              className={\`relative cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-3.5 border transition-all duration-200 hover:-translate-y-1 hover:shadow-md \${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-sm bg-blue-50/20 dark:bg-slate-800/60'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
              }\`}
            >
              {/* Top Row: Compact Landmark + City & Country */}
              <div className="flex items-center gap-2 mb-1">
                <div className="shrink-0 flex items-center justify-center">
                  {renderLandmark(city.landmarkId)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight truncate">
                    {city.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-medium">
                    {city.country}
                  </p>
                </div>
              </div>

              {/* Big Digits */}
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white my-1 font-mono tracking-tight text-center">
                {timeString}
              </div>

              {/* Bottom Row: Date & Day/Night Pill */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/60 text-[10px]">
                <span className="text-slate-500 dark:text-slate-400 font-semibold truncate">
                  {dateString}
                </span>

                <span className={\`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full font-bold \${
                  isDay
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                    : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400'
                }\`}>
                  {isDay ? <Sun className="w-2.5 h-2.5 text-amber-500" /> : <Moon className="w-2.5 h-2.5 text-indigo-500" />}
                  <span>{isDay ? 'Day' : 'Night'}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
`);

console.log('WorldClockStrip upgraded with compact, streamlined height');
