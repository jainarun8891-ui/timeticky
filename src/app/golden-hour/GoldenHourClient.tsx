"use client";

import React, { useState, useMemo } from 'react';
import { Sun, Camera, Compass, Sparkles, MapPin, ChevronDown } from 'lucide-react';
import { CITIES, City } from '@/lib/geo/cities';
import { getSunTimes } from '@/lib/astronomy/sun';

export function GoldenHourClient() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Paris default
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const targetDate = useMemo(() => new Date(date + 'T12:00:00Z'), [date]);

  const sun = useMemo(() => {
    return getSunTimes(targetDate, selectedCity.lat, selectedCity.lng, selectedCity.timezone);
  }, [targetDate, selectedCity]);

  // Compute Golden and Blue hour windows from sunrise and sunset
  // Golden hour is approximately 45-60 min after sunrise and 45-60 min before sunset
  const [srH, srM] = sun.sunrise.split(':').map(Number);
  const [ssH, ssM] = sun.sunset.split(':').map(Number);

  const formatHMM = (h: number, m: number) => {
    const normM = (m + 60) % 60;
    const addH = Math.floor(m / 60);
    const normH = (h + addH + 24) % 24;
    return `${String(normH).padStart(2, '0')}:${String(normM).padStart(2, '0')}`;
  };

  // Morning:
  // Blue hour: ~40 mins before sunrise to ~15 mins before sunrise
  // Golden hour: ~15 mins before sunrise to ~45 mins after sunrise
  const morningBlueHour = `${formatHMM(srH, srM - 40)} – ${formatHMM(srH, srM - 15)}`;
  const morningGoldenHour = `${formatHMM(srH, srM - 15)} – ${formatHMM(srH, srM + 45)}`;

  // Evening:
  // Golden hour: ~45 mins before sunset to ~15 mins after sunset
  // Blue hour: ~15 mins after sunset to ~40 mins after sunset
  const eveningGoldenHour = `${formatHMM(ssH, ssM - 45)} – ${formatHMM(ssH, ssM + 15)}`;
  const eveningBlueHour = `${formatHMM(ssH, ssM + 15)} – ${formatHMM(ssH, ssM + 40)}`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* City Selector & Date Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Location</div>
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const c = CITIES.find(city => city.id === e.target.value);
                if (c) setSelectedCity(c);
              }}
              className="mt-0.5 text-base font-black text-slate-900 dark:text-white bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900">
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-400">Shoot Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Visual Lighting Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Morning Blue Hour */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold uppercase">
              Morning Blue Hour
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
              {morningBlueHour}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cool, diffused royal blue twilight illumination before sunrise.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-medium">
            Best for: City skylines, architectural neon lights.
          </div>
        </div>

        {/* Morning Golden Hour */}
        <div className="bg-gradient-to-br from-amber-500/10 via-white dark:via-slate-900 to-amber-500/5 rounded-3xl border border-amber-300 dark:border-amber-800/80 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[10px] font-mono font-bold uppercase shadow-xs">
              Morning Golden Hour
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-400">
              {morningGoldenHour}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Warm golden beams, long shadows, and soft directional contrast.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/50 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
            Best for: Dewy landscapes, misty morning portraits.
          </div>
        </div>

        {/* Evening Golden Hour */}
        <div className="bg-gradient-to-br from-amber-500/10 via-white dark:via-slate-900 to-amber-500/5 rounded-3xl border border-amber-300 dark:border-amber-800/80 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-[10px] font-mono font-bold uppercase shadow-xs">
              Evening Golden Hour
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-amber-600 dark:text-amber-400">
              {eveningGoldenHour}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Peak warm flattering light with gentle skin-tone rendering.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-200/60 dark:border-amber-900/50 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
            Best for: Outdoor portraits, golden backlighting, sunsets.
          </div>
        </div>

        {/* Evening Blue Hour */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[10px] font-mono font-bold uppercase">
              Evening Blue Hour
            </span>
            <div className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
              {eveningBlueHour}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Deep celestial blue skies with perfect balance against artificial street lamps.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 font-medium">
            Best for: Long exposure cityscapes, reflection pools.
          </div>
        </div>
      </div>

      {/* Solar Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Sunrise</span>
          <span className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">{sun.sunrise}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Solar Noon</span>
          <span className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">{sun.solarNoon}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Sunset</span>
          <span className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">{sun.sunset}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Daylight</span>
          <span className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">{sun.dayLengthFormatted}</span>
        </div>
      </div>
    </div>
  );
}
