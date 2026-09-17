"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Globe, Clock, MapPin, ArrowRight, Compass } from 'lucide-react';
import { Country } from '@/lib/geo/countries';

interface CountryDirectoryClientProps {
  countries: Country[];
}

const REGIONS = ['All', 'Americas', 'Europe', 'Asia', 'Oceania', 'Africa'] as const;

export function CountryDirectoryClient({ countries }: CountryDirectoryClientProps) {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q);

      const matchesRegion =
        selectedRegion === 'All' ||
        c.region.toLowerCase() === selectedRegion.toLowerCase();

      return matchesSearch && matchesRegion;
    });
  }, [countries, search, selectedRegion]);

  return (
    <div className="space-y-6">
      {/* Search & Region Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {/* Search input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search country, code, or capital..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Region pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {REGIONS.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedRegion === region
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing {filteredCountries.length} of {countries.length} countries</span>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCountries.map((country) => (
          <Link
            key={country.code}
            href={`/country/${country.slug}`}
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl leading-none">{country.flag}</span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
                  {country.code}
                </span>
              </div>

              <h2 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {country.name}
              </h2>

              <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Capital: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{country.capital}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Region: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{country.region}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Timezones: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{country.timezones.length}</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>View Country Clocks</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
