"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Clock, Plus, Sun, Moon, Briefcase, 
  ArrowLeftRight, Search, X, Check, Trash2, Globe
} from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { getSyncedDate } from '@/lib/time/sync';
import { formatTimeInZone, getTimeDifference } from '@/lib/time/timezones';

interface WorldClockGridProps {
  currentCity: City;
  onSelectCity: (city: City) => void;
}

export function ModernWorldClockGrid({ currentCity, onSelectCity }: WorldClockGridProps) {
  const [now, setNow] = useState(getSyncedDate());
  const [pinnedCities, setPinnedCities] = useState<City[]>(CITIES.slice(0, 8));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getFlag = (code: string) => {
    switch (code) {
      case 'FR': return '🇫🇷';
      case 'US': return '🇺🇸';
      case 'GB': return '🇬🇧';
      case 'JP': return '🇯🇵';
      case 'AE': return '🇦🇪';
      case 'IN': return '🇮🇳';
      case 'AU': return '🇦🇺';
      case 'SG': return '🇸🇬';
      case 'BR': return '🇧🇷';
      case 'EG': return '🇪🇬';
      case 'DE': return '🇩🇪';
      case 'CA': return '🇨🇦';
      case 'IT': return '🇮🇹';
      case 'ES': return '🇪🇸';
      default: return '🌐';
    }
  };

  const getBusinessStatus = (date: Date, tz: string) => {
    const hour = parseInt(formatTimeInZone(date, tz, false, false).split(':')[0], 10);
    if (hour >= 9 && hour < 17) {
      return { label: 'Open', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
    }
    if (hour >= 7 && hour < 22) {
      return { label: 'Off-hours', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
    }
    return { label: 'Night', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' };
  };

  const isDaytime = (date: Date, tz: string) => {
    const hour = parseInt(formatTimeInZone(date, tz, false, false).split(':')[0], 10);
    return hour >= 6 && hour < 19;
  };

  const filteredSearchCities = CITIES.filter(c =>
    !pinnedCities.some(p => p.id === c.id) &&
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
     c.timezone.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 8);

  const addCity = (city: City) => {
    setPinnedCities([...pinnedCities, city]);
    setIsAddModalOpen(false);
    setSearchQuery('');
  };

  const removeCity = (cityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (pinnedCities.length > 2) {
      setPinnedCities(pinnedCities.filter(c => c.id !== cityId));
    }
  };

  return (
    <section className="w-full bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/90 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30 shadow-md">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              World Clock & International Hubs
            </h2>
            <p className="text-xs text-zinc-400">
              Live local hours, business indicators, and time differences relative to {currentCity.name}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-102"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add city</span>
        </button>
      </div>

      {/* Modern High-Craft City Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {pinnedCities.map((city) => {
          const isSelected = city.id === currentCity.id;
          const timeString = formatTimeInZone(now, city.timezone, false, false);
          const isDay = isDaytime(now, city.timezone);
          const status = getBusinessStatus(now, city.timezone);
          const diff = getTimeDifference(currentCity.timezone, city.timezone);

          let diffLabel = "Same time";
          if (diff.diffHours > 0) diffLabel = `+${diff.diffHours}h ahead`;
          else if (diff.diffHours < 0) diffLabel = `${Math.abs(diff.diffHours)}h behind`;

          return (
            <div
              key={city.id}
              onClick={() => onSelectCity(city)}
              className={`relative group p-4 rounded-2xl border cursor-pointer transition-all modern-card ${
                isSelected
                  ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/15'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-white/5 hover:border-white/20 hover:bg-slate-100 dark:bg-slate-800 shadow-md'
              }`}
            >
              {/* Top Row: Flag, City, Remove on hover */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl leading-none">{getFlag(city.countryCode)}</span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-white leading-tight truncate">
                      {city.name}
                    </h3>
                    <span className="text-[11px] text-zinc-400 font-medium block truncate">
                      {city.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>

                  {pinnedCities.length > 2 && (
                    <button
                      onClick={(e) => removeCity(city.id, e)}
                      type="button"
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-zinc-500 hover:text-red-400 transition-opacity"
                      title="Remove city"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Center: Digital Time Display */}
              <div className="flex items-baseline justify-between my-2">
                <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white drop-shadow-sm">
                  {timeString}
                </div>

                <div className="flex items-center gap-1 text-zinc-400 text-xs">
                  {isDay ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                </div>
              </div>

              {/* Bottom Row: Difference & Date */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/90 dark:border-slate-800 text-[10px] text-zinc-400 font-medium">
                <span className="truncate">
                  {new Intl.DateTimeFormat('en-US', { timeZone: city.timezone, weekday: 'short', month: 'short', day: 'numeric' }).format(now)}
                </span>

                <span className={`font-mono font-semibold px-2 py-0.5 rounded ${
                  isSelected
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-zinc-300 border border-slate-200/90 dark:border-slate-800'
                }`}>
                  {diffLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add City Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-white">
                Pin Global Location
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                type="button"
                className="p-1 rounded-full text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search city, country, or timezone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-white placeholder-zinc-500 border border-slate-200/90 dark:border-slate-800 focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {filteredSearchCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => addCity(city)}
                  type="button"
                  className="w-full p-2.5 rounded-xl text-left flex items-center justify-between hover:bg-white/5 text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getFlag(city.countryCode)}</span>
                    <div>
                      <span className="font-bold text-white block group-hover:text-blue-400">
                        {city.name}, {city.country}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {city.timezone}
                      </span>
                    </div>
                  </div>
                  <Plus className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}

              {filteredSearchCities.length === 0 && (
                <div className="py-6 text-center text-xs text-zinc-500">
                  No unpinned cities matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
