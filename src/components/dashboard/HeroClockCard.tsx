"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, ChevronDown, Check, Search, X } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { getTimeDetails } from '@/lib/time/engine';
import { getSyncedDate, syncWithServer } from '@/lib/time/sync';
import { getCountryFlagEmoji } from '@/lib/geo/flags';

interface HeroClockCardProps {
  currentCity: City;
  onSelectCity?: (city: City) => void;
}

export function HeroClockCard({ currentCity, onSelectCity }: HeroClockCardProps) {
  const router = useRouter();
  const [activeCity, setActiveCity] = useState<City>(currentCity);
  const [time, setTime] = useState<Date>(new Date());
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Synchronize activeCity whenever the currentCity prop changes (e.g. from parent or page navigation)
  useEffect(() => {
    setActiveCity(currentCity);
  }, [currentCity]);

  useEffect(() => {
    syncWithServer();
    const interval = setInterval(() => {
      const now = getSyncedDate();
      setTime(now);
      const ts = formatTimeInZone(now, activeCity.timezone, false, true);
      if (typeof document !== 'undefined') {
        document.title = `${ts} • Time in ${activeCity.name}, ${activeCity.country} • TimeNumbers`;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Click outside listener to reliably close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsCityPickerOpen(false);
        setSearchQuery('');
      }
    };
    if (isCityPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Auto-focus search input when opened
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCityPickerOpen]);

  const handleSelectCity = (c: City) => {
    // 1. Immediately update active city in local state so name, flag, time, and timezone change with 0ms delay
    setActiveCity(c);
    setIsCityPickerOpen(false);
    setSearchQuery('');

    // 2. If parent supplied an onSelectCity callback (like the homepage), call it
    if (onSelectCity) {
      onSelectCity(c);
    } else {
      // 3. Otherwise (e.g. on /time/[slug]), navigate to that city's dedicated URL
      router.push(`/time/${c.slug}`);
    }
  };

  const timeStr = formatTimeInZone(time, activeCity.timezone, false, true); // HH:mm:ss 24h
  const dateStr = formatDateInZone(time, activeCity.timezone);
  const utcOffsetStr = getUtcOffsetString(time, activeCity.timezone);
  const details = useMemo(() => {
    return getTimeDetails(activeCity.timezone, time, false);
  }, [activeCity.timezone, time]);

  // Dynamic scenic background based on city
  const bgImage = useMemo(() => {
    if (activeCity.id === 'paris-fr' || activeCity.countryCode === 'FR') {
      return "url('/images/paris_hero.jpg')";
    }
    if (activeCity.id === 'new-york-us' || activeCity.countryCode === 'US') {
      return "url('/images/newyork_hero.jpg')";
    }
    if (activeCity.id === 'tokyo-jp' || activeCity.countryCode === 'JP') {
      return "url('/images/tokyo_hero.jpg')";
    }
    return "url('/images/france_thumb.jpg')";
  }, [activeCity]);

  // Filtered city list for search
  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return CITIES;
    const q = searchQuery.toLowerCase().trim();
    return CITIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.timezone.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const quickCities = useMemo(() => [
    CITIES.find(c => c.id === 'paris-fr') || CITIES[0],
    CITIES.find(c => c.id === 'new-york-us') || CITIES[1],
    CITIES.find(c => c.id === 'london-gb') || CITIES[2],
    CITIES.find(c => c.id === 'tokyo-jp') || CITIES[3],
    CITIES.find(c => c.id === 'dubai-ae') || CITIES[4],
    CITIES.find(c => c.id === 'new-delhi-in') || CITIES[5],
    CITIES.find(c => c.id === 'sydney-au') || CITIES[6],
  ], []);

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 min-h-[340px] flex flex-col justify-between">
      {/* Scenic City Landscape Background (contained so rounded corners clip while dropdown floats above) */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none z-0">
        <div
          className="absolute left-0 top-0 bottom-0 w-[42%] bg-cover bg-left transition-all duration-700 opacity-90"
          style={{
            backgroundImage: bgImage,
            maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)'
          }}
        />
        {/* Light Gradient Overlay to blend scenery smoothly into card */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-white dark:via-slate-900/60 dark:to-slate-900" />
      </div>

      {/* Top Row: City Picker & Location Details (Higher Stacking Context z-30) */}
      <div className="relative z-30 flex items-center justify-between gap-4">
        {/* Left: Change city interactive button & dropdown container */}
        <div ref={pickerRef} className="relative">
          <button
            onClick={() => setIsCityPickerOpen(!isCityPickerOpen)}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-800/95 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-bold shadow-xs border border-slate-200/90 dark:border-slate-700 backdrop-blur-md transition-all hover:scale-102 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Change city</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCityPickerOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Fully Interactive Searchable City Dropdown Modal */}
          {isCityPickerOpen && (
            <div className="absolute left-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Search input */}
              <div className="relative mb-2">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search city or country..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Quick Jump Chips */}
              {!searchQuery && (
                <div className="mb-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 px-1">
                    Popular Hubs
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {quickCities.map(qc => (
                      <button
                        key={qc.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCity(qc);
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-medium transition-colors ${
                          qc.id === activeCity.id
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {getCountryFlagEmoji(qc.countryCode)} {qc.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Scrollable list of cities */}
              <div className="max-h-64 overflow-y-auto space-y-0.5 pr-1">
                {filteredCities.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-400">
                    No cities matching &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  filteredCities.map((c) => {
                    const isSelected = c.id === activeCity.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCity(c);
                        }}
                        className={`w-full px-3 py-2 text-left rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/60 dark:border-blue-800'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{getCountryFlagEmoji(c.countryCode)}</span>
                          <div>
                            <div className="leading-tight">{c.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{c.country}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {c.timezone.split('/').pop()?.replace(/_/g, ' ')}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Center: City name & Exact Time pill (Clickable to also open city picker) */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsCityPickerOpen(!isCityPickerOpen)}
            title="Click to change city"
          >
            <span className="text-2xl leading-none">{getCountryFlagEmoji(activeCity.countryCode)}</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
              {activeCity.name}, {activeCity.country}
            </h2>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Exact time</span>
          </div>
        </div>

        {/* Right: Inspirational quote from reference UI */}
        <div className="hidden lg:block text-right max-w-[210px]">
          <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-snug">
            &ldquo;Same planet.<br />A brighter perspective.&rdquo;
          </p>
          <div className="w-6 h-0.5 bg-blue-500 my-1.5 ml-auto" />
          <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
            Explore time around the world and stay in sync with what matters.
          </p>
        </div>
      </div>

      {/* Center: Big Clock Display (Stacking Context z-10) */}
      <div className="relative z-10 text-center my-3 sm:my-5">
        <div className="text-6xl sm:text-7xl lg:text-[88px] font-black tracking-tight text-slate-900 dark:text-white font-mono leading-none select-all drop-shadow-xs" suppressHydrationWarning>
          {timeStr}
        </div>

        <div className="mt-3 text-base sm:text-lg font-black text-slate-900 dark:text-white" suppressHydrationWarning>
          {dateStr}
        </div>

        <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 font-sans flex items-center justify-center gap-2" suppressHydrationWarning>
          <span suppressHydrationWarning>{utcOffsetStr}</span>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <span suppressHydrationWarning>{details.timeZoneAbbr || activeCity.timezone}</span>
          <span className="text-slate-300 dark:text-slate-700">&bull;</span>
          <span suppressHydrationWarning>{details.isDst ? 'Daylight Saving Time' : 'Standard Time'}</span>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Synchronized with atomic time &bull; Precision: &plusmn;0.01 seconds</span>
        </div>
      </div>

      {/* Bottom spacer to align card */}
      <div className="relative z-10 h-1" />
    </div>
  );
}
