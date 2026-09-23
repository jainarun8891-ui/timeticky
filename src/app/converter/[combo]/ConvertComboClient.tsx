"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftRight, Clock, Globe, ArrowRight, Sun, Moon,
  Calendar, Sparkles, Briefcase, Zap, ShieldCheck, ChevronRight
} from 'lucide-react';
import {
  TimezoneAbbrDefinition,
  CANONICAL_CONVERTER_ABBREVIATIONS,
  COMMON_TIMEZONE_ABBREVIATIONS
} from '@/lib/time/timezone-lookup';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { getTimeDifferenceText } from '@/lib/time/engine';
import { getSyncedDate } from '@/lib/time/sync';
import { WorldTimeBuddyGrid } from '@/components/converter/WorldTimeBuddyGrid';

interface Props {
  fromTz: TimezoneAbbrDefinition;
  toTz: TimezoneAbbrDefinition;
  comboSlug: string;
}

export function ConvertComboClient({ fromTz, toTz, comboSlug }: Props) {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState<Date>(getSyncedDate());
  const [quickFrom, setQuickFrom] = useState<string>(fromTz.slug);
  const [quickTo, setQuickTo] = useState<string>(toTz.slug);

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

  const swapCombo = `${toTz.slug}-to-${fromTz.slug}`;

  // Quick switch navigation
  const handleQuickJump = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickFrom && quickTo && quickFrom !== quickTo) {
      router.push(`/converter/${quickFrom}-to-${quickTo}`);
    }
  };

  // 24-hour comparative table
  const hourlyRows = useMemo(() => {
    const rows = [];
    const base = new Date(currentTime);
    base.setMinutes(0, 0, 0);

    for (let h = 0; h < 24; h++) {
      const dFrom = new Date(base);
      dFrom.setHours(h);

      const fromTimeStr = formatTimeInZone(dFrom, fromTz.primaryIana, false, false);
      const toTimeStr = formatTimeInZone(dFrom, toTz.primaryIana, false, false);
      const isDaytime = h >= 7 && h <= 19;
      const isBusiness = h >= 9 && h <= 17;

      rows.push({
        hour: h,
        fromTime: fromTimeStr,
        toTime: toTimeStr,
        isDaytime,
        isBusiness,
      });
    }
    return rows;
  }, [currentTime, fromTz.primaryIana, toTz.primaryIana]);

  // Related popular combinations
  const relatedFromCombos = useMemo(() => {
    const list = ['utc', 'gmt', 'est', 'pst', 'cst', 'ist', 'cet', 'bst', 'aest', 'jst'];
    return list
      .filter(abbr => abbr !== fromTz.slug && abbr !== toTz.slug)
      .slice(0, 6)
      .map(abbr => ({
        slug: `${fromTz.slug}-to-${abbr}`,
        label: `${fromTz.abbr} to ${abbr.toUpperCase()}`
      }));
  }, [fromTz, toTz]);

  const relatedToCombos = useMemo(() => {
    const list = ['utc', 'gmt', 'est', 'pst', 'cst', 'ist', 'cet', 'bst', 'aest', 'jst'];
    return list
      .filter(abbr => abbr !== fromTz.slug && abbr !== toTz.slug)
      .slice(0, 6)
      .map(abbr => ({
        slug: `${abbr}-to-${toTz.slug}`,
        label: `${abbr.toUpperCase()} to ${toTz.abbr}`
      }));
  }, [fromTz, toTz]);

  return (
    <div className="space-y-8">
      {/* Real-Time Live Clock Comparison Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Timezone Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Source Timezone
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {fromTz.abbr} — {fromTz.primaryName}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
              {fromOffset}
            </span>
          </div>

          <div className="py-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
              {fromLiveDate}
            </span>
            <div className="text-5xl sm:text-6xl font-mono font-black tracking-tight text-slate-900 dark:text-white">
              {fromLiveTime}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 block">
              IANA: {fromTz.primaryIana}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>DST: <strong>{fromTz.hasDst ? 'Observes DST' : 'Fixed Standard'}</strong></span>
            <span>Key Hub: <strong>{fromTz.meanings[0]?.regions[0] || fromTz.primaryIana}</strong></span>
          </div>
        </div>

        {/* Target Timezone Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Destination Timezone
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {toTz.abbr} — {toTz.primaryName}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
              {toOffset}
            </span>
          </div>

          <div className="py-6 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
              {toLiveDate}
            </span>
            <div className="text-5xl sm:text-6xl font-mono font-black tracking-tight text-slate-900 dark:text-white">
              {toLiveTime}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 block">
              IANA: {toTz.primaryIana}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Differential: <strong className="text-emerald-600 font-bold">{timeDiff.summary}</strong></span>
            <span>Key Hub: <strong>{toTz.meanings[0]?.regions[0] || toTz.primaryIana}</strong></span>
          </div>
        </div>
      </div>

      {/* Swap Button Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700">
        <div className="text-xs text-slate-600 dark:text-slate-300">
          <strong>Instant Direction Toggle:</strong> Need to view the inverse time difference?
        </div>
        <Link
          href={`/converter/${swapCombo}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold hover:text-blue-600 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-blue-500" />
          <span>Convert {toTz.abbr} to {fromTz.abbr} instead</span>
        </Link>
      </div>

      {/* THE CENTERPIECE: WorldTimeBuddy Visual Timeline Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Interactive Multi-Zone Visual Grid
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hover or drag across the hours to align schedules, discover business overlaps, and click to schedule.
            </p>
          </div>
        </div>

        <WorldTimeBuddyGrid fromTz={fromTz} toTz={toTz} comboSlug={comboSlug} />
      </div>

      {/* Quick Converter Switcher Dropdown Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
          <Globe className="w-4 h-4 text-blue-600" />
          <span>Quick Timezone Converter Selector</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Jump to any of the 552 international timezone converter combinations in one click:
        </p>

        <form onSubmit={handleQuickJump} className="grid grid-cols-1 sm:grid-cols-7 gap-3 items-center">
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
              From Timezone
            </label>
            <select
              value={quickFrom}
              onChange={(e) => setQuickFrom(e.target.value)}
              className="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {CANONICAL_CONVERTER_ABBREVIATIONS.map(abbr => {
                const def = COMMON_TIMEZONE_ABBREVIATIONS[abbr];
                return (
                  <option key={abbr} value={abbr}>
                    {def ? `${def.abbr} — ${def.primaryName}` : abbr.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="sm:col-span-1 flex justify-center pt-4 sm:pt-4">
            <ArrowRight className="w-5 h-5 text-blue-600 hidden sm:inline" />
            <span className="sm:hidden text-xs font-bold text-slate-400">to</span>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
              To Timezone
            </label>
            <select
              value={quickTo}
              onChange={(e) => setQuickTo(e.target.value)}
              className="w-full p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
            >
              {CANONICAL_CONVERTER_ABBREVIATIONS.map(abbr => {
                const def = COMMON_TIMEZONE_ABBREVIATIONS[abbr];
                return (
                  <option key={abbr} value={abbr}>
                    {def ? `${def.abbr} — ${def.primaryName}` : abbr.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="sm:col-span-1 pt-4 sm:pt-4">
            <button
              type="submit"
              disabled={quickFrom === quickTo}
              className="w-full py-2.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-black shadow-xs transition-colors cursor-pointer"
            >
              Convert
            </button>
          </div>
        </form>
      </div>

      {/* 24-Hour Comparison Matrix Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Complete 24-Hour Conversion Table: {fromTz.abbr} to {toTz.abbr}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Hour-by-hour cross-reference table for scheduling calls, webinars, and international broadcasts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
          {hourlyRows.map((row) => (
            <div
              key={row.hour}
              className={`p-3 rounded-2xl border text-xs flex items-center justify-between transition-colors ${
                row.hour === currentTime.getHours()
                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
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
              <ArrowRight className="w-3 h-3 text-slate-400" />
              <div className="flex items-center gap-1.5 font-mono font-bold">
                <span className="text-blue-600 dark:text-blue-400">{row.toTime} {toTz.abbr}</span>
                {row.isBusiness && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Working Hours" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Converters Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Converters from Source Zone */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Popular {fromTz.abbr} Converters</span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {relatedFromCombos.map((rc) => (
              <Link
                key={rc.slug}
                href={`/converter/${rc.slug}`}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
              >
                <span>{rc.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Converters to Target Zone */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Popular Converters to {toTz.abbr}</span>
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {relatedToCombos.map((rc) => (
              <Link
                key={rc.slug}
                href={`/converter/${rc.slug}`}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between group"
              >
                <span>{rc.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
