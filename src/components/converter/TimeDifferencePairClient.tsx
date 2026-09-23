"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { City } from '@/lib/geo/cities';
import { getTimeDetails, getTimeDifferenceText, getUtcOffsetMinutes } from '@/lib/time/engine';
import { Clock, Sun, Moon, ArrowRight, Briefcase, CheckCircle2, Calendar, Compass } from 'lucide-react';

interface Props {
  cityA: City;
  cityB: City;
}

export function TimeDifferencePairClient({ cityA, cityB }: Props) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const now = currentTime || new Date();
  const detailsA = useMemo(() => getTimeDetails(cityA.timezone, now, !use24Hour), [cityA, now, use24Hour]);
  const detailsB = useMemo(() => getTimeDetails(cityB.timezone, now, !use24Hour), [cityB, now, use24Hour]);

  const diff = useMemo(() => getTimeDifferenceText(cityB.timezone, cityA.timezone, now), [cityA, cityB, now]);

  // Generate 24-hour comparison table
  const hourlyMatrix = useMemo(() => {
    const hours = [];
    const offA = getUtcOffsetMinutes(cityA.timezone, now);
    const offB = getUtcOffsetMinutes(cityB.timezone, now);

    for (let h = 0; h < 24; h++) {
      // Local time in city A
      const timeAStr = `${String(h).padStart(2, '0')}:00`;
      const isBizA = h >= 9 && h < 18;

      // Corresponding local time in city B
      const diffMins = offB - offA;
      let targetMins = (h * 60 + diffMins + 1440 * 2) % 1440;
      const targetH = Math.floor(targetMins / 60);
      const targetM = targetMins % 60;
      const timeBStr = `${String(targetH).padStart(2, '0')}:${String(targetM).padStart(2, '0')}`;
      const isBizB = targetH >= 9 && targetH < 18;

      const isOverlap = isBizA && isBizB;

      hours.push({
        hourA: timeAStr,
        hourB: timeBStr,
        isBizA,
        isBizB,
        isOverlap,
      });
    }
    return hours;
  }, [cityA, cityB, now]);

  return (
    <div className="space-y-8">
      {/* Dual Live Clocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City A Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Reference City</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{cityA.name}</h2>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">{detailsA.utcOffsetString}</span>
          </div>
          <div className="py-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">{detailsA.dateStr}</span>
            <div className="text-5xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white">{detailsA.timeStr}</div>
            <span className="text-xs text-slate-400 font-mono mt-1 block">{cityA.timezone}</span>
          </div>
        </div>

        {/* City B Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Target City</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{cityB.name}</h2>
            </div>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{detailsB.utcOffsetString}</span>
          </div>
          <div className="py-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">{detailsB.dateStr}</span>
            <div className="text-5xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white">{detailsB.timeStr}</div>
            <span className="text-xs text-slate-400 font-mono mt-1 block">{cityB.timezone}</span>
          </div>
        </div>
      </div>

      {/* Difference Summary Callout */}
      <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
          Exact Difference Summary
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {cityB.name} is <span className="text-blue-600 dark:text-blue-400">{diff.summary}</span> of {cityA.name}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
          {diff.diffHours === 0
            ? `${cityA.name} and ${cityB.name} currently share the identical local standard time.`
            : `When it is 12:00 PM (Noon) in ${cityA.name}, it is ${diff.diffHours > 0 ? `${diff.diffHours} hours ahead` : `${Math.abs(diff.diffHours)} hours behind`} in ${cityB.name}.`
          }
        </p>
      </div>

      {/* 24-Hour Comparison & Overlap Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              24-Hour Time Conversion & Business Overlap
            </h3>
            <p className="text-xs text-slate-400">
              Highlighted green rows represent mutual office hours (9:00 AM – 6:00 PM).
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Shared Business Hours
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
          {hourlyMatrix.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition-colors ${
                item.isOverlap
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-slate-400 font-normal">{cityA.name.slice(0, 3)}:</span>
                <span>{item.hourA}</span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-slate-400 font-normal">{cityB.name.slice(0, 3)}:</span>
                <span className={item.isOverlap ? 'text-emerald-600 dark:text-emerald-400' : ''}>{item.hourB}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
