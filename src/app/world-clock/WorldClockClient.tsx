"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { CITIES, City } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { getTimeDetails, getTimeDifferenceText } from '@/lib/time/engine';
import {
  Clock,
  Plus,
  Trash2,
  Share2,
  Copy,
  Check,
  Search,
  Sun,
  Moon,
  ArrowUp,
  ArrowDown,
  Globe,
  Compass
} from 'lucide-react';

const DEFAULT_CITY_IDS = ['new-york-us', 'london-gb', 'paris-fr', 'delhi-in', 'tokyo-jp', 'dubai-ae', 'singapore-sg', 'sydney-au'];

export function WorldClockClient() {
  const [cityIds, setCityIds] = useState<string[]>(DEFAULT_CITY_IDS);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);
  const [copiedTimeId, setCopiedTimeId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [localTz, setLocalTz] = useState('UTC');

  // Load from localStorage or URL params
  useEffect(() => {
    try {
      const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      setLocalTz(resolved);

      const params = new URLSearchParams(window.location.search);
      const urlCities = params.get('cities');
      if (urlCities) {
        const ids = urlCities.split(',').filter(Boolean);
        if (ids.length > 0) {
          setCityIds(ids);
          return;
        }
      }

      const saved = localStorage.getItem('gt_world_clock_cities');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCityIds(parsed);
        }
      }
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gt_world_clock_cities', JSON.stringify(cityIds));
    } catch {}
  }, [cityIds]);

  // Live ticking clock
  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const now = currentTime || new Date();

  const citiesList = useMemo(() => {
    return cityIds
      .map(id => CITIES.find(c => c.id === id || c.slug === id || c.name.toLowerCase() === id.toLowerCase()))
      .filter((c): c is City => Boolean(c));
  }, [cityIds]);

  const removeCity = (id: string) => {
    setCityIds(prev => prev.filter(cId => cId !== id));
  };

  const moveCity = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= cityIds.length) return;
    const copy = [...cityIds];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    setCityIds(copy);
  };

  const addCity = (id: string) => {
    if (!cityIds.includes(id)) {
      setCityIds(prev => [...prev, id]);
    }
    setIsAdding(false);
    setSearchQuery('');
  };

  const copyTime = (city: City, timeStr: string) => {
    navigator.clipboard.writeText(`${city.name}: ${timeStr} (${city.timezone})`);
    setCopiedTimeId(city.id);
    setTimeout(() => setCopiedTimeId(null), 2000);
  };

  const shareConfig = () => {
    const url = `${window.location.origin}/world-clock?cities=${cityIds.join(',')}`;
    navigator.clipboard.writeText(url);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const availableCities = useMemo(() => {
    if (!searchQuery.trim()) return CITIES.filter(c => !cityIds.includes(c.id)).slice(0, 8);
    const q = searchQuery.toLowerCase().trim();
    return CITIES.filter(c => !cityIds.includes(c.id) && (c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q))).slice(0, 10);
  }, [searchQuery, cityIds]);

  return (
    <div className="space-y-6">
      {/* Action Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Your World Clock Dashboard
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {citiesList.length} monitored cities • Local time reference: {localTz}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUse24Hour(!use24Hour)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-xs hover:bg-slate-200 transition-all"
          >
            {use24Hour ? '24H' : '12H'}
          </button>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add City
          </button>

          <button
            onClick={shareConfig}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-all"
            title="Copy shareable link"
          >
            {shareToast ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            {shareToast ? 'Link Copied!' : 'Share'}
          </button>
        </div>
      </div>

      {/* Add City Modal */}
      {isAdding && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-blue-200 dark:border-blue-900 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Add City to World Clock
            </h3>
            <button
              onClick={() => setIsAdding(false)}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Close
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search global city or country (e.g. Toronto, Rome, Singapore)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableCities.map((c) => (
              <button
                key={c.id}
                onClick={() => addCity(c.id)}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-slate-200/60 dark:border-slate-700 text-left transition-all"
              >
                <strong className="text-xs text-slate-900 dark:text-white block truncate">{c.name}</strong>
                <span className="text-[10px] text-slate-400 truncate block">{c.country}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Monitored Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {citiesList.map((city, index) => {
          const details = getTimeDetails(city.timezone, now, !use24Hour);
          const diff = getTimeDifferenceText(localTz, city.timezone, now);
          const rawHour = details.hours;
          const isDay = rawHour >= 6 && rawHour < 18;

          return (
            <div
              key={city.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {city.country}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      <Link href={`/${getCityRootSlug(city)}`} className="hover:text-blue-600 transition-colors">
                        {city.name}
                      </Link>
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveCity(index, 'up')}
                      disabled={index === 0}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveCity(index, 'down')}
                      disabled={index === citiesList.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeCity(city.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600"
                      title="Remove city"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="my-4">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white">
                    {details.timeStr}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span>{details.dateStr.split(',')[0]}, {details.month} {details.day}</span>
                    {!use24Hour && details.dayPeriod && (
                      <span className="font-bold text-blue-600 dark:text-blue-400 uppercase">
                        {details.dayPeriod}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  {isDay ? (
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                  ) : (
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  )}
                  <span className="text-slate-500 font-medium">{diff.summary}</span>
                </div>

                <button
                  onClick={() => copyTime(city, details.timeStr)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Copy time"
                >
                  {copiedTimeId === city.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
