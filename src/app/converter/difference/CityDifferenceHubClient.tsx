"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

export interface DiffPairItem {
  slug: string;
  cityA: string;
  nameA: string;
  countryA: string;
  tzA: string;
  cityB: string;
  nameB: string;
  countryB: string;
  tzB: string;
  diffSummary: string;
  diffHours: number;
  isEqual: boolean;
  overlapHours: number;
}

interface Props {
  pairs: DiffPairItem[];
}

export function CityDifferenceHubClient({ pairs }: Props) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'new-york' | 'london' | 'us' | 'transatlantic' | 'asia-pacific'>('all');

  const filteredPairs = useMemo(() => {
    let result = pairs;

    if (activeFilter === 'new-york') {
      result = result.filter(p => p.cityA === 'new-york' || p.cityB === 'new-york');
    } else if (activeFilter === 'london') {
      result = result.filter(p => p.cityA === 'london' || p.cityB === 'london');
    } else if (activeFilter === 'us') {
      result = result.filter(p => p.countryA === 'United States' && p.countryB === 'United States');
    } else if (activeFilter === 'transatlantic') {
      result = result.filter(
        p => (p.countryA === 'United States' && (p.countryB === 'United Kingdom' || p.countryB === 'France' || p.countryB === 'Germany')) ||
             (p.countryB === 'United States' && (p.countryA === 'United Kingdom' || p.countryA === 'France' || p.countryA === 'Germany'))
      );
    } else if (activeFilter === 'asia-pacific') {
      result = result.filter(
        p => ['Japan', 'Singapore', 'India', 'Australia', 'Hong Kong'].includes(p.countryA) ||
             ['Japan', 'Singapore', 'India', 'Australia', 'Hong Kong'].includes(p.countryB)
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(p =>
        p.nameA.toLowerCase().includes(q) ||
        p.nameB.toLowerCase().includes(q) ||
        p.countryA.toLowerCase().includes(q) ||
        p.countryB.toLowerCase().includes(q) ||
        p.slug.includes(q)
      );
    }

    return result;
  }, [pairs, search, activeFilter]);

  // Major anchor hub city shortcuts
  const anchorCities = [
    { label: 'All Pairs', count: pairs.length, key: 'all' },
    { label: 'New York Corridors', count: pairs.filter(p => p.cityA === 'new-york' || p.cityB === 'new-york').length, key: 'new-york' },
    { label: 'London Corridors', count: pairs.filter(p => p.cityA === 'london' || p.cityB === 'london').length, key: 'london' },
    { label: 'US Domestic Routes', count: pairs.filter(p => p.countryA === 'United States' && p.countryB === 'United States').length, key: 'us' },
    { label: 'Transatlantic Financial', count: pairs.filter(p => (p.countryA === 'United States' && (p.countryB === 'United Kingdom' || p.countryB === 'France' || p.countryB === 'Germany')) || (p.countryB === 'United States' && (p.countryA === 'United Kingdom' || p.countryA === 'France' || p.countryA === 'Germany'))).length, key: 'transatlantic' },
    { label: 'Asia & Pacific Hubs', count: pairs.filter(p => ['Japan', 'Singapore', 'India', 'Australia', 'Hong Kong'].includes(p.countryA) || ['Japan', 'Singapore', 'India', 'Australia', 'Hong Kong'].includes(p.countryB)).length, key: 'asia-pacific' },
  ];

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-5">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by city or country (e.g., 'New York', 'São Paulo', 'Honolulu', 'London', 'Tokyo')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {anchorCities.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
        <span>
          Showing <strong className="text-slate-900 dark:text-white">{filteredPairs.length}</strong> bilateral city difference guides
        </span>
        <span>
          Total indexed routes: <strong className="text-blue-600 dark:text-blue-400">{pairs.length} pairs</strong>
        </span>
      </div>

      {/* 92 City Pair Grid - All server rendered HTML links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPairs.map((p) => {
          return (
            <Link
              key={p.slug}
              href={`/converter/difference/${p.slug}`}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Header: Cities & Direction */}
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
                      {p.countryA}
                    </span>
                    <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                      {p.nameA}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  <div className="min-w-0 text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
                      {p.countryB}
                    </span>
                    <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate block">
                      {p.nameB}
                    </span>
                  </div>
                </div>

                {/* Subtitle / Descriptive sentence */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                  {p.nameB} is {p.diffSummary} of {p.nameA}. View live atomic clocks & business overlap matrix.
                </p>
              </div>

              {/* Badges / Metrics */}
              <div className="flex items-center justify-between gap-2 pt-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-blue-700 dark:text-blue-300 font-mono font-bold text-[11px]">
                  <Clock className="w-3 h-3 text-blue-500 shrink-0" />
                  {p.diffSummary}
                </span>

                {p.overlapHours > 0 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{p.overlapHours}h Overlap</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Limited Overlap
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {filteredPairs.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-3">
          <Clock className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No matching city differences found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for another metropolis like &quot;New York&quot;, &quot;Honolulu&quot;, &quot;São Paulo&quot;, or &quot;London&quot;.
          </p>
          <button
            onClick={() => { setSearch(''); setActiveFilter('all'); }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
