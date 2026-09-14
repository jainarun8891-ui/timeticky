"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { POPULAR_CITIES, City } from '@/lib/geo/cities';
import { LayoutGrid, Maximize2, Minimize2, Plus, X, Sun, Moon, Clock, Monitor, RefreshCw, Volume2, Sparkles, Sliders } from 'lucide-react';

const PRESET_FINANCIAL = ['new-york-us', 'london-gb', 'tokyo-jp', 'hong-kong-hk', 'singapore-sg', 'sydney-au', 'zurich-ch', 'paris-fr'];
const PRESET_TECH = ['san-francisco-us', 'london-gb', 'bengaluru-in', 'tokyo-jp', 'berlin-de', 'new-york-us', 'singapore-sg', 'paris-fr'];
const PRESET_SOLAR = ['sydney-au', 'tokyo-jp', 'dubai-ae', 'paris-fr', 'london-gb', 'new-york-us', 'san-francisco-us', 'los-angeles-us'];

export function WorldClockWallClient() {
  const [selectedCityIds, setSelectedCityIds] = useState<string[]>(PRESET_FINANCIAL);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [displayMode, setDisplayMode] = useState<'digital' | 'analog'>('digital');
  const [use24Hour, setUse24Hour] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchToAdd, setSearchToAdd] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const wallContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      wallContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const activeCities = useMemo(() => {
    return selectedCityIds
      .map(id => POPULAR_CITIES.find(c => c.id === id))
      .filter((c): c is City => Boolean(c));
  }, [selectedCityIds]);

  const now = currentTime || new Date();

  const getCityDateParts = (timezone: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24Hour,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      const parts = formatter.formatToParts(now);
      const hour = parts.find(p => p.type === 'hour')?.value || '00';
      const minute = parts.find(p => p.type === 'minute')?.value || '00';
      const second = parts.find(p => p.type === 'second')?.value || '00';
      const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value || '';
      const weekday = parts.find(p => p.type === 'weekday')?.value || '';
      const month = parts.find(p => p.type === 'month')?.value || '';
      const day = parts.find(p => p.type === 'day')?.value || '';

      const raw24H = parseInt(
        new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour: 'numeric', hour12: false })
          .formatToParts(now)
          .find(p => p.type === 'hour')?.value || '12',
        10
      );

      const isDay = raw24H >= 6 && raw24H < 18;

      return {
        timeStr: `${hour}:${minute}:${second}`,
        dayPeriod,
        dateStr: `${weekday}, ${month} ${day}`,
        isDay,
        rawHour: raw24H,
        minuteNum: parseInt(minute, 10),
        secondNum: parseInt(second, 10),
      };
    } catch {
      return {
        timeStr: '--:--:--',
        dayPeriod: '',
        dateStr: '---',
        isDay: true,
        rawHour: 12,
        minuteNum: 0,
        secondNum: 0,
      };
    }
  };

  const removeCity = (cityId: string) => {
    setSelectedCityIds(prev => prev.filter(id => id !== cityId));
  };

  const addCity = (cityId: string) => {
    if (!selectedCityIds.includes(cityId)) {
      setSelectedCityIds(prev => [...prev, cityId]);
    }
    setIsAdding(false);
    setSearchToAdd('');
  };

  const availableCitiesToAdd = useMemo(() => {
    return POPULAR_CITIES.filter(c => {
      if (selectedCityIds.includes(c.id)) return false;
      if (!searchToAdd.trim()) return true;
      const q = searchToAdd.toLowerCase().trim();
      return c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
    }).slice(0, 10);
  }, [selectedCityIds, searchToAdd]);

  return (
    <div ref={wallContainerRef} className="space-y-6">
      {/* Wall Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Presets:
          </span>
          <button
            onClick={() => setSelectedCityIds(PRESET_FINANCIAL)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 transition-all"
          >
            Financial Markets
          </button>
          <button
            onClick={() => setSelectedCityIds(PRESET_TECH)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 transition-all"
          >
            Global Tech Hubs
          </button>
          <button
            onClick={() => setSelectedCityIds(PRESET_SOLAR)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 transition-all"
          >
            24h Planetary Cycle
          </button>
        </div>

        {/* View Switches & Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Display Mode (Digital vs Analog) */}
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setDisplayMode('digital')}
              className={`px-3 py-1 rounded-lg transition-all ${
                displayMode === 'digital'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Digital
            </button>
            <button
              onClick={() => setDisplayMode('analog')}
              className={`px-3 py-1 rounded-lg transition-all ${
                displayMode === 'analog'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Swiss Analog
            </button>
          </div>

          {/* 12h / 24h Toggle */}
          {displayMode === 'digital' && (
            <button
              onClick={() => setUse24Hour(!use24Hour)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all"
            >
              {use24Hour ? '24H' : '12H'}
            </button>
          )}

          {/* Add City Button */}
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Clock
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all"
            title="Toggle Fullscreen Kiosk Mode (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Add City Modal / Dropdown */}
      {isAdding && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-blue-900 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Add Clock to Wall
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <input
            type="text"
            value={searchToAdd}
            onChange={(e) => setSearchToAdd(e.target.value)}
            placeholder="Search city to pin (e.g. Rome, Dubai, Singapore)..."
            className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 max-h-48 overflow-y-auto">
            {availableCitiesToAdd.map((c) => (
              <button
                key={c.id}
                onClick={() => addCity(c.id)}
                className="p-2.5 rounded-xl text-left bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-slate-200/60 dark:border-slate-700 transition-all flex flex-col"
              >
                <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {c.name}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {c.country}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clock Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeCities.map((city) => {
          const parts = getCityDateParts(city.timezone);

          return (
            <div
              key={city.id}
              className="relative group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Close / Remove button on hover */}
              <button
                onClick={() => removeCity(city.id)}
                className="absolute right-3.5 top-3.5 p-1 rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition-all"
                title="Remove clock"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* City Title & Day/Night Badge */}
              <div className="space-y-1">
                <div className="flex items-center justify-between pr-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
                    {city.country}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {parts.isDay ? (
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                    <span>{parts.isDay ? 'Day' : 'Night'}</span>
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white truncate">
                  {city.name}
                </h3>
              </div>

              {/* Center Clock Display: Digital or Analog */}
              <div className="my-6 flex items-center justify-center">
                {displayMode === 'digital' ? (
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-mono font-black tracking-tight text-slate-900 dark:text-white">
                      {parts.timeStr}
                    </div>
                    {parts.dayPeriod && (
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 block mt-1">
                        {parts.dayPeriod}
                      </span>
                    )}
                  </div>
                ) : (
                  /* Swiss Luxury Analog Dial SVG */
                  <div className="relative w-36 h-36 rounded-full bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-4 border-slate-200 dark:border-slate-700 shadow-inner flex items-center justify-center">
                    {/* Hour Markers */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                      <div
                        key={deg}
                        className={`absolute w-0.5 rounded-full ${
                          i % 3 === 0
                            ? 'h-3 bg-slate-800 dark:bg-slate-200'
                            : 'h-1.5 bg-slate-400 dark:bg-slate-600'
                        }`}
                        style={{
                          transform: `rotate(${deg}deg) translateY(-58px)`,
                        }}
                      />
                    ))}

                    {/* Hour Hand */}
                    <div
                      className="absolute w-1.5 h-9 bg-slate-900 dark:bg-white rounded-full origin-bottom shadow-sm"
                      style={{
                        bottom: '50%',
                        transform: `rotate(${((parts.rawHour % 12) + parts.minuteNum / 60) * 30}deg)`,
                      }}
                    />

                    {/* Minute Hand */}
                    <div
                      className="absolute w-1 h-13 bg-slate-600 dark:bg-slate-300 rounded-full origin-bottom shadow-sm"
                      style={{
                        bottom: '50%',
                        transform: `rotate(${(parts.minuteNum + parts.secondNum / 60) * 6}deg)`,
                      }}
                    />

                    {/* Second Hand (Sweeping Orange) */}
                    <div
                      className="absolute w-0.5 h-15 bg-amber-500 rounded-full origin-bottom"
                      style={{
                        bottom: '50%',
                        transform: `rotate(${parts.secondNum * 6}deg)`,
                      }}
                    />

                    {/* Center Pin */}
                    <div className="absolute w-3 h-3 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900 z-10" />
                  </div>
                )}
              </div>

              {/* Bottom Date & Timezone */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {parts.dateStr}
                </span>
                <span className="font-mono text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  {city.timezone.split('/').pop()?.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
