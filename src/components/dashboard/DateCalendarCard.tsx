"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, CheckCircle2, MinusCircle } from 'lucide-react';
import { City } from '@/lib/geo/cities';
import { getTimeDetails } from '@/lib/time/engine';
import { getSyncedDate } from '@/lib/time/sync';

interface DateCalendarCardProps {
  currentCity: City;
}

export function DateCalendarCard({ currentCity }: DateCalendarCardProps) {
  const [now, setNow] = useState(getSyncedDate());

  useEffect(() => {
    const timer = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(timer);
  }, []);

  const details = useMemo(() => {
    return getTimeDetails(currentCity.timezone, now, false);
  }, [currentCity.timezone, now]);

  const totalDays = details.isLeapYear ? 366 : 365;
  const daysRemaining = Math.max(0, totalDays - details.dayOfYear);

  // Check whether this timezone observes DST at all
  const tzHasDst = useMemo(() => {
    try {
      const year = now.getFullYear();
      const jan = new Date(year, 0, 15);
      const jul = new Date(year, 6, 15);
      const janPart = new Intl.DateTimeFormat('en-US', { timeZone: currentCity.timezone, timeZoneName: 'short' }).formatToParts(jan);
      const julPart = new Intl.DateTimeFormat('en-US', { timeZone: currentCity.timezone, timeZoneName: 'short' }).formatToParts(jul);
      const janAbbr = janPart.find(p => p.type === 'timeZoneName')?.value;
      const julAbbr = julPart.find(p => p.type === 'timeZoneName')?.value;
      return janAbbr !== julAbbr;
    } catch {
      return false;
    }
  }, [currentCity.timezone, now]);

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
              Date &amp; Calendar
            </h2>
            <p className="text-[11px] text-slate-400">
              Live calendar context for {currentCity.name}
            </p>
          </div>
        </div>

        {/* Live Date in City Timezone */}
        <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white my-2.5">
          <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          <span suppressHydrationWarning>{details.dateStr}</span>
        </div>

        {/* Dynamic Metric Rows */}
        <div className="space-y-2 text-xs mt-2">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span className="text-slate-400">Week number</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono" suppressHydrationWarning>
              {details.weekNumber}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span className="text-slate-400">Day of year</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono" suppressHydrationWarning>
              {details.dayOfYear} of {totalDays}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span className="text-slate-400">Days remaining</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono" suppressHydrationWarning>
              {daysRemaining}
            </span>
          </div>

          {/* Dynamic Daylight Saving Time Row */}
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 pt-1.5 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-slate-400">Daylight saving time</span>
            {details.isDst ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>Active</span>
              </span>
            ) : tzHasDst ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <span>Standard Time</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <MinusCircle className="w-2.5 h-2.5" />
                <span>None</span>
              </span>
            )}
          </div>

          <div className="text-[10px] text-slate-400 text-right font-medium truncate">
            {details.isDst
              ? `Observing ${details.timeZoneAbbr} (${details.utcOffsetString})`
              : tzHasDst
              ? `Standard time (${details.utcOffsetString})`
              : `Year-round ${details.timeZoneAbbr} (${details.utcOffsetString})`}
          </div>
        </div>
      </div>
    </div>
  );
}
