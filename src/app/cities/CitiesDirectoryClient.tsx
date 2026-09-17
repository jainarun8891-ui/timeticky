"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { POPULAR_CITIES, City } from '@/lib/geo/cities';
import { getTimeDetails, formatTime } from '@/lib/time/engine';
import { Search, Globe, Users, ArrowRight, Building2, MapPin, Clock } from 'lucide-react';

interface Props {
  initialCities?: City[];
  countryFilter?: string;
  countryName?: string;
}

export function CitiesDirectoryClient({ initialCities, countryFilter, countryName }: Props) {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [activeLetter, setActiveLetter] = useState<string>('All');
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cur = now || new Date();

  const baseCities = useMemo(() => {
    let list = initialCities || POPULAR_CITIES;
    if (countryFilter) {
      list = list.filter(c => c.country.toLowerCase() === countryFilter.toLowerCase() || c.countryCode.toLowerCase() === countryFilter.toLowerCase());
    }
    return list;
  }, [initialCities, countryFilter]);

  const regions = useMemo(() => {
    const set = new Set<string>();
    baseCities.forEach(c => {
      if (c.region) set.add(c.region);
    });
    return ['All', ...Array.from(set).sort()];
  }, [baseCities]);

  const letters = useMemo(() => {
    const chars = new Set<string>();
    baseCities.forEach(c => {
      const first = c.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(first)) chars.add(first);
    });
    return ['All', ...Array.from(chars).sort()];
  }, [baseCities]);

  const filteredCities = useMemo(() => {
    const q = search.trim().toLowerCase();
    return baseCities.filter(c => {
      const matchQuery = !q || c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q) || c.timezone.toLowerCase().includes(q);
      const matchRegion = selectedRegion === 'All' || c.region === selectedRegion;
      const matchLetter = activeLetter === 'All' || c.name.toUpperCase().startsWith(activeLetter);
      return matchQuery && matchRegion && matchLetter;
    }).sort((a, b) => {
      if (sortBy === 'population') {
        const popA = typeof a.population === 'number' ? a.population : (parseInt(String(a.population || '').replace(/\D/g, ''), 10) || 0);
        const popB = typeof b.population === 'number' ? b.population : (parseInt(String(b.population || '').replace(/\D/g, ''), 10) || 0);
        return popB - popA;
      }
      return a.name.localeCompare(b.name);
    });
  }, [baseCities, search, selectedRegion, activeLetter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Control Filters Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Search Bar & Sort Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter cities by name, country, or timezone..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-stretch sm:self-auto">
            <button
              onClick={() => setSortBy('name')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                sortBy === 'name' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Alphabetical (A-Z)
            </button>
            <button
              onClick={() => setSortBy('population')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                sortBy === 'population' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              By Population
            </button>
          </div>
        </div>

        {/* Region Pills */}
        {!countryFilter && regions.length > 2 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-400 mr-1">Region:</span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedRegion === reg
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        )}

        {/* Alphabet Jump Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-medium text-slate-400 mr-1">Jump:</span>
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                activeLetter === letter
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* City Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing <strong>{filteredCities.length}</strong> canonical metropolitan locations</span>
        <span>Clocks ticking synchronously with IANA tzdata</span>
      </div>

      {/* Grid of City Cards with Live Synchronized Clocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCities.map((city) => {
          const t = getTimeDetails(city.timezone, cur);
          const popDisplay = city.population || '';

          return (
            <Link
              key={city.id}
              href={`/${city.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all shadow-sm flex items-center justify-between"
            >
              <div className="space-y-1 min-w-0 pr-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl flex-shrink-0">
                    {city.isCapital ? '🏛️' : '📍'}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">
                    {city.name}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 truncate">
                  <span>{city.country}</span>
                  {popDisplay && (
                    <>
                      <span>•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {popDisplay}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {formatTime(t, false, false)}
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  {t.abbreviation} ({t.utcOffsetString})
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredCities.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <MapPin className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No matching cities found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or reset the filters.
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedRegion('All'); setActiveLetter('All'); }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl shadow-sm hover:bg-blue-700 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
