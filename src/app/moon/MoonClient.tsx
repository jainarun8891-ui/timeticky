"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CITIES, City } from '@/lib/geo/cities';
import { getMoonPhase } from '@/lib/astronomy/calculator';
import { Moon, Sparkles, Calendar, Compass, Clock } from 'lucide-react';

interface Props {
  initialCity?: City;
}

export function MoonClient({ initialCity }: Props) {
  const [selectedCityId, setSelectedCityId] = useState(initialCity?.id || 'delhi-in');
  const [selectedDate, setSelectedDate] = useState('2026-09-14');

  const city = useMemo(() => {
    return CITIES.find(c => c.id === selectedCityId) || CITIES[0];
  }, [selectedCityId]);

  const moon = useMemo(() => {
    const d = new Date(`${selectedDate}T12:00:00`);
    return getMoonPhase(d);
  }, [selectedDate]);

  return (
    <div className="space-y-8">
      {/* City & Date Picker Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Lunar Ephemeris Observatory
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {city.name}, {city.country}
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Lat {city.lat.toFixed(2)}°, Lng {city.lng.toFixed(2)}° • Synodic Lunar Cycle
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}, {c.country}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Moon Phase Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="flex items-center gap-6">
          {/* Moon SVG Visual */}
          <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-indigo-500/40 flex items-center justify-center shadow-lg shadow-indigo-500/20 relative shrink-0">
            <div
              className="w-20 h-20 rounded-full bg-amber-100 shadow-[0_0_25px_rgba(255,255,255,0.4)] relative overflow-hidden"
              style={{ opacity: Math.max(0.2, moon.illumination / 100) }}
            >
              <div className="absolute top-4 left-5 w-4 h-4 rounded-full bg-slate-300/40" />
              <div className="absolute bottom-5 right-4 w-5 h-5 rounded-full bg-slate-300/40" />
              <div className="absolute top-10 right-8 w-3 h-3 rounded-full bg-slate-300/40" />
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 block">
              Current Lunar Phase
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              {moon.phaseName}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Moon Age: <strong className="text-indigo-300">{moon.ageDays} days</strong> into 29.5-day synodic cycle
            </p>
          </div>
        </div>

        <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
          <div className="text-5xl sm:text-6xl font-mono font-black text-amber-300">
            {moon.illumination}%
          </div>
          <span className="text-xs text-slate-400 block mt-1">
            Surface Illumination
          </span>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-900/60 text-indigo-200 border border-indigo-700/60 mt-3">
            {moon.stage.toUpperCase()} MOON
          </span>
        </div>
      </div>

      {/* Upcoming Lunar Milestones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Next Full Moon
            </span>
            <strong className="text-xl font-bold text-slate-900 dark:text-white block mt-0.5">
              In ~{moon.nextFullMoonDays} days
            </strong>
            <span className="text-xs text-slate-500">100% full optical disc illumination</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Next New Moon
            </span>
            <strong className="text-xl font-bold text-slate-900 dark:text-white block mt-0.5">
              In ~{moon.nextNewMoonDays} days
            </strong>
            <span className="text-xs text-slate-500">Beginning of next 29.5-day synodic cycle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
