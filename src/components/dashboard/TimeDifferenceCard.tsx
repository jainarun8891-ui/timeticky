"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, ChevronRight } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { getTimeDifferenceText } from '@/lib/time/engine';
import { getCountryFlagEmoji } from '@/lib/geo/flags';

interface TimeDifferenceCardProps {
  currentCity: City;
}

const GLOBAL_BENCHMARK_HUBS = [
  'new-york-us',
  'london-gb',
  'tokyo-jp',
  'dubai-ae',
  'new-delhi-in',
  'sydney-au',
  'paris-fr',
  'singapore-sg',
  'los-angeles-us'
];

export function TimeDifferenceCard({ currentCity }: TimeDifferenceCardProps) {
  const comparisons = useMemo(() => {
    const now = new Date();
    // Select 6 benchmark hubs that are not the current city
    const targets = GLOBAL_BENCHMARK_HUBS
      .map(id => CITIES.find(c => c.id === id))
      .filter((c): c is City => !!c && c.id !== currentCity.id && c.timezone !== currentCity.timezone)
      .slice(0, 6);

    return targets.map(target => {
      const diff = getTimeDifferenceText(currentCity.timezone, target.timezone, now);
      const isBehind = diff.diffMinutes < 0;
      const formattedDiff = diff.diffMinutes === 0
        ? 'Same time'
        : diff.summary;

      return {
        id: target.id,
        name: target.name,
        countryCode: target.countryCode,
        diff: formattedDiff,
        isBehind,
        link: `/time-difference/${getCityRootSlug(currentCity)}/${getCityRootSlug(target)}`
      };
    });
  }, [currentCity]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
              Time Difference
            </h2>
            <p className="text-[11px] text-slate-400">
              How does time in {currentCity.name} compare?
            </p>
          </div>
        </div>

        {/* List of dynamic comparison cities */}
        <div className="space-y-1.5 mt-2">
          {comparisons.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="flex items-center justify-between text-xs py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl px-2 transition-colors group border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm leading-none">{getCountryFlagEmoji(item.countryCode)}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-1 font-semibold">
                <span className={item.isBehind ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-amber-600 dark:text-amber-400 font-bold'}>
                  {item.diff}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
