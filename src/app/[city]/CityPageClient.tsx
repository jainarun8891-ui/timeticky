"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { City, CITIES } from '@/lib/geo/cities';
import { getTimeDetails, getUtcOffsetString, getTimeDifferenceText } from '@/lib/time/engine';
import { getSolarTimes } from '@/lib/astronomy/calculator';
import { Clock, Sun, Sunrise, Sunset, Globe, Compass, Calendar, ArrowRight, ArrowLeftRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Props {
  city: City;
}

const COMPARISON_CITIES = [
  { name: 'London', tz: 'Europe/London', slug: 'london' },
  { name: 'New York', tz: 'America/New_York', slug: 'new-york' },
  { name: 'Los Angeles', tz: 'America/Los_Angeles', slug: 'los-angeles' },
  { name: 'Toronto', tz: 'America/Toronto', slug: 'toronto' },
  { name: 'Paris', tz: 'Europe/Paris', slug: 'paris' },
  { name: 'Berlin', tz: 'Europe/Berlin', slug: 'berlin' },
  { name: 'Dubai', tz: 'Asia/Dubai', slug: 'dubai' },
  { name: 'Delhi', tz: 'Asia/Kolkata', slug: 'delhi' },
  { name: 'Mumbai', tz: 'Asia/Kolkata', slug: 'mumbai' },
  { name: 'Singapore', tz: 'Asia/Singapore', slug: 'singapore' },
  { name: 'Tokyo', tz: 'Asia/Tokyo', slug: 'tokyo' },
  { name: 'Sydney', tz: 'Australia/Sydney', slug: 'sydney' },
];

export function CityPageClient({ city }: Props) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);
  const [showSeconds, setShowSeconds] = useState(true);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const now = currentTime || new Date();
  const details = useMemo(() => {
    return getTimeDetails(city.timezone, now, !use24Hour);
  }, [city.timezone, now, use24Hour]);

  const solar = useMemo(() => {
    return getSolarTimes(city.lat, city.lng, now, details.utcOffsetMinutes);
  }, [city.lat, city.lng, now, details.utcOffsetMinutes]);

  // Dynamic contextual comparisons
  const comparisons = useMemo(() => {
    return COMPARISON_CITIES.filter(c => c.tz !== city.timezone).map(target => {
      const diff = getTimeDifferenceText(city.timezone, target.tz, now);
      const targetDetails = getTimeDetails(target.tz, now, !use24Hour);
      let sentence = '';
      if (diff.diffHours === 0) {
        sentence = `${target.name} has the exact same local time as ${city.name}.`;
      } else if (diff.diffHours > 0) {
        sentence = `${target.name} is ${diff.summary} of ${city.name}.`;
      } else {
        sentence = `${target.name} is ${diff.summary} of ${city.name}.`;
      }

      return {
        ...target,
        time: targetDetails.timeStr,
        dayPeriod: targetDetails.dayPeriod,
        sentence,
        diffSummary: diff.summary,
      };
    });
  }, [city, now, use24Hour]);

  return (
    <div className="space-y-8">
      {/* Big Clock Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              {city.country} ({city.countryCode})
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              Current Time in {city.name}
            </h1>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {city.timezone} • {details.utcOffsetString}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setUse24Hour(!use24Hour)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs hover:bg-slate-200 transition-all"
            >
              {use24Hour ? '24H' : '12H'}
            </button>
            <button
              onClick={() => setShowSeconds(!showSeconds)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-all"
            >
              {showSeconds ? 'Hide Sec' : 'Show Sec'}
            </button>
          </div>
        </div>

        {/* Huge Digital Numerals */}
        <div className="py-8 sm:py-10">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400 block mb-2">
            {details.dateStr}
          </span>
          <div className="text-6xl sm:text-8xl lg:text-9xl font-mono font-black tracking-tight text-slate-900 dark:text-white select-none">
            {showSeconds ? details.timeStr : details.timeStr.substring(0, details.timeStr.lastIndexOf(':'))}
          </div>
          {!use24Hour && details.dayPeriod && (
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mt-2 block">
              {details.dayPeriod}
            </span>
          )}
        </div>

        {/* Solar & DST Status Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
              <Sunrise className="w-3.5 h-3.5 text-amber-500" /> Sunrise
            </span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {solar.sunrise}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
              <Sunset className="w-3.5 h-3.5 text-orange-500" /> Sunset
            </span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {solar.sunset}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
              <Sun className="w-3.5 h-3.5 text-yellow-500" /> Solar Noon
            </span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {solar.solarNoon}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> Day Length
            </span>
            <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
              {solar.dayLength}
            </span>
          </div>
        </div>
      </div>

      {/* City Geospatial & Political Data Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {city.name} Geographic & Administrative Facts
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">Country</span>
            <strong className="text-slate-900 dark:text-white text-sm block mt-0.5">{city.country}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">Coordinates</span>
            <strong className="text-slate-900 dark:text-white text-sm block mt-0.5 font-mono">
              {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
            </strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">IANA Timezone</span>
            <strong className="text-slate-900 dark:text-white text-sm block mt-0.5 font-mono">{city.timezone}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-medium">Daylight Saving</span>
            <strong className="text-slate-900 dark:text-white text-sm block mt-0.5">
              {details.isDst ? 'Active (Summer Time)' : 'Standard Time (Winter)'}
            </strong>
          </div>
        </div>
      </div>

      {/* Dynamic Comparative Time Difference Table (Item 4) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Real-Time Horology Differential
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Time Difference From {city.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Instantaneous hours ahead or behind across key global metropolises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {comparisons.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {item.diffSummary}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {item.sentence}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-mono font-bold text-slate-900 dark:text-white block">
                  {item.time}
                </span>
                {item.dayPeriod && (
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {item.dayPeriod}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
