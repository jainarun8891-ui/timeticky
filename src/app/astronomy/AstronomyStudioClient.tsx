"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { getSolarTimes, getMoonPhase } from '@/lib/astronomy/calculator';
import { POPULAR_CITIES } from '@/lib/geo/cities';
import { Sun, Moon, Sunrise, Sunset, Eye, Camera, Clock, Compass, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export function AstronomyStudioClient() {
  const [selectedCityId, setSelectedCityId] = useState('paris-fr');
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => setCurrentDate(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const activeCity = useMemo(() => {
    return POPULAR_CITIES.find(c => c.id === selectedCityId) || POPULAR_CITIES[0];
  }, [selectedCityId]);

  // Calculate timezone offset minutes
  const tzOffsetMinutes = useMemo(() => {
    const now = currentDate || new Date();
    try {
      const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
      const tzDate = new Date(now.toLocaleString('en-US', { timeZone: activeCity.timezone }));
      return Math.round((tzDate.getTime() - utcDate.getTime()) / 60000);
    } catch {
      return 0;
    }
  }, [activeCity, currentDate]);

  const now = currentDate || new Date();
  const solar = useMemo(() => {
    return getSolarTimes(activeCity.lat, activeCity.lng, now, tzOffsetMinutes);
  }, [activeCity, now, tzOffsetMinutes]);

  const moon = useMemo(() => {
    return getMoonPhase(now);
  }, [now]);

  // City local time string
  const cityTimeString = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: activeCity.timezone,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
    } catch {
      return '--:--';
    }
  }, [activeCity, now]);

  return (
    <div className="space-y-8">
      {/* City Switcher Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Observation Location
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {activeCity.name}, {activeCity.country}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Lat {activeCity.lat.toFixed(2)}°, Lng {activeCity.lng.toFixed(2)}° • {activeCity.timezone}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Current Local Time</span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-slate-900 dark:text-white">
              {cityTimeString}
            </span>
          </div>

          <select
            value={selectedCityId}
            onChange={(e) => setSelectedCityId(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {POPULAR_CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}, {c.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Solar & Lunar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sun & Daylight Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Sun className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Sun & Solar Path
                  </h3>
                  <span className="text-xs text-slate-400">
                    Day Length: {solar.dayLength}
                  </span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                solar.isDaytime
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                  : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400'
              }`}>
                {solar.isDaytime ? 'Daytime' : 'Nighttime'}
              </span>
            </div>

            {/* Sun Arc / Progress Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1"><Sunrise className="w-3.5 h-3.5 text-amber-500" /> Sunrise {solar.sunrise}</span>
                <span className="text-blue-600 dark:text-blue-400">Noon {solar.solarNoon}</span>
                <span className="flex items-center gap-1"><Sunset className="w-3.5 h-3.5 text-orange-500" /> Sunset {solar.sunset}</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${solar.dayProgressPercent}%` }}
                />
              </div>
              <div className="text-center text-[11px] text-slate-400">
                Daylight completed: <strong className="text-slate-900 dark:text-white">{solar.dayProgressPercent}%</strong>
              </div>
            </div>

            {/* Twilight Breakdown Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Atmospheric Twilight Phases
              </span>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Civil Twilight</span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-1">
                    {solar.civilTwilight.dawn} – {solar.civilTwilight.dusk}
                  </span>
                  <span className="text-[9px] text-slate-400">Artificial light not needed</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Nautical</span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-1">
                    {solar.nauticalTwilight.dawn} – {solar.nauticalTwilight.dusk}
                  </span>
                  <span className="text-[9px] text-slate-400">Sea horizon visible</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Astronomical</span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block mt-1">
                    {solar.astronomicalTwilight.dawn} – {solar.astronomicalTwilight.dusk}
                  </span>
                  <span className="text-[9px] text-slate-400">Full darkness threshold</span>
                </div>
              </div>
            </div>

            {/* Photographer Golden & Blue Hours */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <div>
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                    Golden Hour Photography
                  </span>
                  <span className="text-[11px] text-amber-700 dark:text-amber-400">
                    Morning: {solar.goldenHour.morning} • Evening: {solar.goldenHour.evening}
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                Warm Light
              </span>
            </div>
          </div>
        </div>

        {/* Moon & Lunar Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Lunar Phase Observatory
                  </h3>
                  <span className="text-xs text-slate-400">
                    Synodic Cycle (29.5 days)
                  </span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                {moon.stage.toUpperCase()}
              </span>
            </div>

            {/* Moon Phase Display */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex items-center gap-5">
                {/* SVG Moon Visualization */}
                <div className="relative w-20 h-20 rounded-full bg-slate-800 border-2 border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                  <div
                    className="w-16 h-16 rounded-full bg-amber-100 dark:bg-slate-100 shadow-[0_0_20px_rgba(255,255,255,0.4)] relative overflow-hidden"
                    style={{
                      opacity: Math.max(0.15, moon.illumination / 100),
                    }}
                  >
                    <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-slate-300/40" />
                    <div className="absolute bottom-4 right-3 w-4 h-4 rounded-full bg-slate-300/40" />
                    <div className="absolute top-8 right-6 w-2 h-2 rounded-full bg-slate-300/40" />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider block">
                    Current Phase
                  </span>
                  <h4 className="text-xl font-bold text-white mt-0.5">
                    {moon.phaseName}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Moon Age: <strong className="text-indigo-300">{moon.ageDays} days</strong> into cycle
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
                <span className="text-3xl font-mono font-black text-amber-300 block">
                  {moon.illumination}%
                </span>
                <span className="text-xs text-slate-400 block mt-0.5">
                  Surface Illumination
                </span>
              </div>
            </div>

            {/* Upcoming Milestones */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Next Full Moon</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    In ~{moon.nextFullMoonDays} days
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Moon className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Next New Moon</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    In ~{moon.nextNewMoonDays} days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
