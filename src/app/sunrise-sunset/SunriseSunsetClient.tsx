"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CITIES, City } from '@/lib/geo/cities';
import { getSolarTimes } from '@/lib/astronomy/calculator';
import { getUtcOffsetMinutes } from '@/lib/time/engine';
import { Sun, Sunset, Sunrise, Clock, Compass, Calendar, Camera, Eye, MapPin } from 'lucide-react';

interface Props {
  initialCity?: City;
}

export function SunriseSunsetClient({ initialCity }: Props) {
  const [selectedCityId, setSelectedCityId] = useState(initialCity?.id || 'delhi-in');
  const [selectedDate, setSelectedDate] = useState('2026-09-14');

  const city = useMemo(() => {
    return CITIES.find(c => c.id === selectedCityId) || CITIES[0];
  }, [selectedCityId]);

  const solar = useMemo(() => {
    const d = new Date(`${selectedDate}T12:00:00`);
    const offsetMins = getUtcOffsetMinutes(city.timezone, d);
    return getSolarTimes(city.lat, city.lng, d, offsetMins);
  }, [city, selectedDate]);

  return (
    <div className="space-y-8">
      {/* City & Date Picker Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Solar Ephemeris Calculation
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {city.name}, {city.country}
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Lat {city.lat.toFixed(2)}°, Lng {city.lng.toFixed(2)}° • {city.timezone}
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

      {/* Primary Sunrise & Sunset Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold uppercase text-amber-500 flex items-center justify-center gap-1.5 mb-1">
            <Sunrise className="w-4 h-4" /> Sunrise
          </span>
          <strong className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white block">
            {solar.sunrise}
          </strong>
          <span className="text-[11px] text-slate-400 mt-1 block">Upper limb crosses horizon</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold uppercase text-orange-500 flex items-center justify-center gap-1.5 mb-1">
            <Sunset className="w-4 h-4" /> Sunset
          </span>
          <strong className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white block">
            {solar.sunset}
          </strong>
          <span className="text-[11px] text-slate-400 mt-1 block">Sun vanishes below horizon</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold uppercase text-yellow-500 flex items-center justify-center gap-1.5 mb-1">
            <Sun className="w-4 h-4" /> Solar Noon
          </span>
          <strong className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white block">
            {solar.solarNoon}
          </strong>
          <span className="text-[11px] text-slate-400 mt-1 block">Sun at highest altitude</span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs font-bold uppercase text-indigo-500 flex items-center justify-center gap-1.5 mb-1">
            <Clock className="w-4 h-4" /> Total Daylight
          </span>
          <strong className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white block">
            {solar.dayLength}
          </strong>
          <span className="text-[11px] text-slate-400 mt-1 block">Between rise and set</span>
        </div>
      </div>

      {/* Twilight Breakdown Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Atmospheric Twilight Schedule in {city.name}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Sun angles relative to horizon: Civil (0° to 6°), Nautical (6° to 12°), Astronomical (12° to 18°).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-400 block">Civil Twilight</span>
            <div className="flex justify-between text-sm font-mono font-bold text-slate-900 dark:text-white">
              <span>Dawn: {solar.civilTwilight.dawn}</span>
              <span>Dusk: {solar.civilTwilight.dusk}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Sufficient natural light for outdoor activities without artificial lighting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-400 block">Nautical Twilight</span>
            <div className="flex justify-between text-sm font-mono font-bold text-slate-900 dark:text-white">
              <span>Dawn: {solar.nauticalTwilight.dawn}</span>
              <span>Dusk: {solar.nauticalTwilight.dusk}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Horizon visible at sea; bright navigational stars can be sighted.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-400 block">Astronomical Twilight</span>
            <div className="flex justify-between text-sm font-mono font-bold text-slate-900 dark:text-white">
              <span>Dawn: {solar.astronomicalTwilight.dawn}</span>
              <span>Dusk: {solar.astronomicalTwilight.dusk}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Threshold between twilight and complete optical night sky darkness.
            </p>
          </div>
        </div>

        {/* Photography Golden Hour */}
        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">
                Photographer Golden Hour Windows
              </strong>
              <span className="text-xs text-slate-600 dark:text-slate-300">
                Morning: <strong>{solar.goldenHour.morning}</strong> • Evening: <strong>{solar.goldenHour.evening}</strong>
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
            Optimal Soft Light
          </span>
        </div>
      </div>
    </div>
  );
}
