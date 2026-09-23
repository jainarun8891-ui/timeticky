"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTimeDetails, formatTime, formatDate, getTimeDifferenceText } from '@/lib/time/engine';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { Clock, Globe, ArrowRight, ShieldCheck, Sun, Moon, Info, Calendar } from 'lucide-react';

export interface CitySnippet {
  id: string;
  name: string;
  country: string;
  timezone: string;
  flag?: string;
}

interface Props {
  title: string;
  representativeTz: string;
  offsetStr: string;
  abbreviation: string;
  cities: CitySnippet[];
  hasDst: boolean;
  notes?: string;
  isAmbiguous?: boolean;
  description?: string;
}

export function TimezoneDetailClient({
  title,
  representativeTz,
  offsetStr,
  abbreviation,
  cities,
  hasDst,
  notes,
  isAmbiguous,
  description
}: Props) {
  const [now, setNow] = useState<Date | null>(null);
  const [is24Hour, setIs24Hour] = useState(false);
  const [localTz, setLocalTz] = useState<string>('UTC');

  useEffect(() => {
    setNow(new Date());
    try {
      setLocalTz(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    } catch {
      // fallback
    }
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cur = now || new Date();
  const timeInfo = getTimeDetails(representativeTz, cur);
  const localDiff = getTimeDifferenceText(localTz, representativeTz, cur);

  return (
    <div className="space-y-8">
      {/* Precision Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold uppercase tracking-wider">
                {offsetStr}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold uppercase">
                {abbreviation}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                timeInfo.isDst
                  ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
                  : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
              }`}>
                {timeInfo.isDst ? 'DST Active (Summer Time)' : 'Standard Time (No DST)'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              {description || (
                <>
                  Representative reference: <span className="font-mono text-slate-700 dark:text-slate-300">{representativeTz}</span>.
                  Calculated using live astronomical and IANA civil chronometry rules.
                </>
              )}
            </p>
          </div>

          {/* 12h / 24h Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-xl self-start md:self-center">
            <button
              onClick={() => setIs24Hour(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !is24Hour ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              12-Hour
            </button>
            <button
              onClick={() => setIs24Hour(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                is24Hour ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              24-Hour
            </button>
          </div>
        </div>

        {/* Big Time Display */}
        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl sm:text-7xl font-mono font-extrabold text-slate-900 dark:text-white tracking-tight">
              {formatTime(timeInfo, is24Hour, true)}
            </span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
              {timeInfo.abbreviation}
            </span>
          </div>

          <div className="space-y-1 sm:text-right">
            <div className="flex items-center sm:justify-end gap-2 text-slate-700 dark:text-slate-200 font-semibold text-base sm:text-lg">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formatDate(timeInfo)}</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Day {timeInfo.dayOfYear} of {timeInfo.year} • Week {timeInfo.weekNumber}
            </div>
          </div>
        </div>

        {/* Local Comparison Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between gap-4 text-xs sm:text-sm text-blue-900 dark:text-blue-200">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span>
              <strong>Your location vs this zone:</strong> {localDiff.summary}.
            </span>
          </div>
          <Link
            href={`/time-converter?from=${encodeURIComponent(representativeTz)}`}
            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
          >
            Convert time <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Ambiguity Warning Card if applicable */}
      {isAmbiguous && notes && (
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              Multiple Global Meanings for {abbreviation}
            </h3>
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              {notes}
            </p>
          </div>
        </div>
      )}

      {/* Major Cities in this Zone */}
      {cities.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Major Cities in this Zone
            </h2>
            <span className="text-xs text-slate-500">Live synchronized clocks</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => {
              const cityTime = getTimeDetails(city.timezone, cur);
              return (
                <Link
                  key={city.id}
                  href={`/${getCityRootSlug(city)}`}
                  className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{city.flag || '📍'}</span>
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {city.name}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {city.country}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {formatTime(cityTime, is24Hour, false)}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {cityTime.abbreviation}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
