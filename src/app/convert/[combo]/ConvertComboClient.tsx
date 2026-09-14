"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Clock, Globe, ArrowRight, Sun, Moon, Calendar, Sparkles } from 'lucide-react';
import { TimezoneAbbrDefinition } from '@/lib/time/timezone-lookup';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { getTimeDifferenceText } from '@/lib/time/engine';
import { getSyncedDate } from '@/lib/time/sync';

interface Props {
  fromTz: TimezoneAbbrDefinition;
  toTz: TimezoneAbbrDefinition;
  comboSlug: string;
}

export function ConvertComboClient({ fromTz, toTz, comboSlug }: Props) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [sliderHour, setSliderHour] = useState<number>(new Date().getHours());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getSyncedDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeDiff = useMemo(() => {
    return getTimeDifferenceText(fromTz.primaryIana, toTz.primaryIana, currentTime);
  }, [fromTz.primaryIana, toTz.primaryIana, currentTime]);

  const fromLiveTime = formatTimeInZone(currentTime, fromTz.primaryIana, false, true);
  const toLiveTime = formatTimeInZone(currentTime, toTz.primaryIana, false, true);
  const fromLiveDate = formatDateInZone(currentTime, fromTz.primaryIana);
  const toLiveDate = formatDateInZone(currentTime, toTz.primaryIana);
  const fromOffset = getUtcOffsetString(currentTime, fromTz.primaryIana);
  const toOffset = getUtcOffsetString(currentTime, toTz.primaryIana);

  // 24-hour comparative table
  const hourlyRows = useMemo(() => {
    const rows = [];
    const base = new Date(currentTime);
    base.setMinutes(0, 0, 0);

    for (let h = 0; h < 24; h++) {
      const dFrom = new Date(base);
      dFrom.setHours(h);

      // Convert timestamp into target zone
      const fromTimeStr = formatTimeInZone(dFrom, fromTz.primaryIana, false, false);
      const toTimeStr = formatTimeInZone(dFrom, toTz.primaryIana, false, false);
      const fromHourNum = h;

      // Determine day period
      const isDaytime = h >= 7 && h <= 19;

      rows.push({
        hour: h,
        fromTime: fromTimeStr,
        toTime: toTimeStr,
        isDaytime,
      });
    }
    return rows;
  }, [fromTz.primaryIana, toTz.primaryIana, currentTime]);

  // Selected slider time conversion
  const sliderSelectedDate = useMemo(() => {
    const d = new Date(currentTime);
    d.setHours(sliderHour, 0, 0, 0);
    return d;
  }, [currentTime, sliderHour]);

  const sliderFromTime = formatTimeInZone(sliderSelectedDate, fromTz.primaryIana, false, false);
  const sliderToTime = formatTimeInZone(sliderSelectedDate, toTz.primaryIana, false, false);

  const swapCombo = `${toTz.slug}-to-${fromTz.slug}`;

  return (
    <div className="space-y-8">
      {/* Hero Conversion Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Instant Timezone Translator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Convert {fromTz.abbr} to {toTz.abbr}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
          {fromTz.primaryName} ({fromOffset}) to {toTz.primaryName} ({toOffset})
        </p>
      </div>

      {/* Dual Big Clock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {/* Source Zone */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                {fromTz.abbr}
              </span>
              <span className="text-xs text-slate-400 font-mono">{fromOffset}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {fromTz.primaryName}
            </h2>
            <div className="text-5xl sm:text-6xl font-mono font-black tracking-tight text-slate-900 dark:text-white my-4">
              {fromLiveTime}
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium border-t border-slate-100 dark:border-slate-800 pt-3">
            {fromLiveDate}
          </div>
        </div>

        {/* Target Zone */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950 text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                {toTz.abbr}
              </span>
              <span className="text-xs text-slate-400 font-mono">{toOffset}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {toTz.primaryName}
            </h2>
            <div className="text-5xl sm:text-6xl font-mono font-black tracking-tight text-blue-600 dark:text-blue-400 my-4">
              {toLiveTime}
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
            <span>{toLiveDate}</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{timeDiff.summary}</span>
          </div>
        </div>
      </div>

      {/* Swap Button & Quick Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
        <div className="text-xs text-slate-600 dark:text-slate-300">
          <strong>Relative Difference:</strong> {toTz.abbr} is {timeDiff.summary} of {fromTz.abbr}.
        </div>
        <Link
          href={`/convert/${swapCombo}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold hover:text-blue-600 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-blue-500" />
          <span>Swap: Convert {toTz.abbr} to {fromTz.abbr}</span>
        </Link>
      </div>

      {/* Interactive 24-Hour Slider */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Interactive Time Slider
            </h3>
            <p className="text-xs text-slate-400">
              Drag the slider to preview matching times across both zones
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-sm font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              {sliderFromTime} {fromTz.abbr}
            </span>
            <ArrowRight className="w-4 h-4 text-blue-500" />
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              {sliderToTime} {toTz.abbr}
            </span>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={23}
          value={sliderHour}
          onChange={(e) => setSliderHour(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />

        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>12:00 AM</span>
          <span>06:00 AM</span>
          <span>12:00 PM (Noon)</span>
          <span>06:00 PM</span>
          <span>11:00 PM</span>
        </div>
      </div>

      {/* 24-Hour Comparison Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white">
          Complete 24-Hour Conversion Table: {fromTz.abbr} to {toTz.abbr}
        </h3>
        <p className="text-xs text-slate-400">
          Hour-by-hour cross-reference table for scheduling international calls and events.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
          {hourlyRows.map((row) => (
            <div
              key={row.hour}
              className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition-colors ${
                row.hour === currentTime.getHours()
                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 font-mono">
                {row.isDaytime ? (
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                )}
                <span>{row.fromTime} {fromTz.abbr}</span>
              </div>
              <div className="flex items-center gap-1 font-mono font-bold">
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <span>{row.toTime} {toTz.abbr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
