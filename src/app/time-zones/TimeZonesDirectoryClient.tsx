"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { IanaTimeZone } from '@/lib/time/iana-database';
import { Search, Globe, Clock, Filter, Copy, Check, ArrowUpRight, Compass } from 'lucide-react';

interface Props {
  initialZones: IanaTimeZone[];
}

export function TimeZonesDirectoryClient({ initialZones }: Props) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [selectedOffset, setSelectedOffset] = useState<string>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [displayLimit, setDisplayLimit] = useState(60);

  // Live ticking clock
  useEffect(() => {
    setCurrentTime(new Date());
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const continents: { label: string; value: string; count: number }[] = useMemo(() => {
    const counts: Record<string, number> = { All: initialZones.length };
    initialZones.forEach(z => {
      counts[z.region] = (counts[z.region] || 0) + 1;
    });

    return [
      { label: 'All Zones', value: 'All', count: initialZones.length },
      { label: 'Americas', value: 'Americas', count: counts['Americas'] || 0 },
      { label: 'Europe', value: 'Europe', count: counts['Europe'] || 0 },
      { label: 'Asia', value: 'Asia', count: counts['Asia'] || 0 },
      { label: 'Africa', value: 'Africa', count: counts['Africa'] || 0 },
      { label: 'Australia & Pacific', value: 'Australia & Pacific', count: counts['Australia & Pacific'] || 0 },
      { label: 'Atlantic & Indian', value: 'Atlantic & Indian', count: counts['Atlantic & Indian'] || 0 },
      { label: 'UTC', value: 'UTC', count: counts['UTC'] || 0 },
    ];
  }, [initialZones]);

  const commonOffsets = [
    'All',
    'UTC -8',
    'UTC -5',
    'UTC -4',
    'UTC +0',
    'UTC +1',
    'UTC +2',
    'UTC +3',
    'UTC +5:30',
    'UTC +8',
    'UTC +9',
    'UTC +10',
  ];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filtering
  const filteredZones = useMemo(() => {
    return initialZones.filter(z => {
      // Continent filter
      if (selectedContinent !== 'All' && z.region !== selectedContinent) {
        return false;
      }

      // Offset filter
      if (selectedOffset !== 'All' && z.formattedOffset !== selectedOffset) {
        return false;
      }

      // Letter filter
      if (selectedLetter !== 'All' && !z.city.toUpperCase().startsWith(selectedLetter)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchId = z.id.toLowerCase().includes(q);
        const matchCity = z.city.toLowerCase().includes(q);
        const matchOffset = z.formattedOffset.toLowerCase().includes(q);
        const matchAbbr = z.abbreviation.toLowerCase().includes(q);
        const matchRegion = z.region.toLowerCase().includes(q);
        if (!matchId && !matchCity && !matchOffset && !matchAbbr && !matchRegion) {
          return false;
        }
      }

      return true;
    });
  }, [initialZones, selectedContinent, selectedOffset, selectedLetter, searchQuery]);

  const visibleZones = useMemo(() => {
    return filteredZones.slice(0, displayLimit);
  }, [filteredZones, displayLimit]);

  const copyToClipboard = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatZoneTime = (zoneId: string) => {
    if (!currentTime) return '--:--:--';
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: zoneId === 'UTC' ? 'UTC' : zoneId,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(currentTime);
    } catch {
      return '--:--:--';
    }
  };

  return (
    <div className="space-y-8">
      {/* Control Panel / Search Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800 mb-2">
              <Globe className="w-3.5 h-3.5" />
              Complete IANA Database ({initialZones.length} Zones)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Search & Filter Global Time Zones
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Showing <strong className="text-blue-600 dark:text-blue-400 font-bold">{filteredZones.length}</strong> of {initialZones.length} time zones
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayLimit(60);
            }}
            placeholder="Search by city, country, IANA id (e.g. America/New_York), UTC offset (+5:30, -5), or code..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Continent Filter Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Filter By Continent / Region
          </label>
          <div className="flex flex-wrap gap-2">
            {continents.map((c) => {
              const active = selectedContinent === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => {
                    setSelectedContinent(c.value);
                    setDisplayLimit(60);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{c.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      active ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {c.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Offset Filters */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Filter By Standard UTC Offset
          </label>
          <div className="flex flex-wrap gap-1.5">
            {commonOffsets.map((offset) => {
              const active = selectedOffset === offset;
              return (
                <button
                  key={offset}
                  onClick={() => {
                    setSelectedOffset(offset);
                    setDisplayLimit(60);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700'
                  }`}
                >
                  {offset}
                </button>
              );
            })}
          </div>
        </div>

        {/* Alphabet Navigation Bar */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Browse By City Alphabet (A-Z)
          </label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => {
                setSelectedLetter('All');
                setDisplayLimit(60);
              }}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                selectedLetter === 'All'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            {alphabet.map((letter) => {
              const active = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(letter);
                    setDisplayLimit(60);
                  }}
                  className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center transition-all ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of Time Zones */}
      {visibleZones.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
          <Compass className="w-12 h-12 mx-auto text-slate-400 mb-3 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No time zones match your search</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Try resetting your filters or searching for another city, country, or UTC offset.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedContinent('All');
              setSelectedOffset('All');
              setSelectedLetter('All');
            }}
            className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visibleZones.map((tz) => {
            const timeStr = formatZoneTime(tz.id);
            const isCopied = copiedId === tz.id;

            return (
              <div
                key={tz.id}
                className="group relative p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      {tz.region}
                    </span>
                    <button
                      onClick={(e) => copyToClipboard(tz.id, e)}
                      title="Copy canonical IANA identifier"
                      className="p-1 rounded-md text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {tz.city}
                  </h3>

                  <p className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                    {tz.id}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-mono font-bold text-slate-900 dark:text-white block">
                      {timeStr}
                    </span>
                    <span className="inline-block text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                      {tz.formattedOffset} {tz.abbreviation && `(${tz.abbreviation})`}
                    </span>
                  </div>

                  <Link
                    href={`/time-zone-converter?tz=${encodeURIComponent(tz.id)}`}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-all"
                    title="Open in Time Zone Converter"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination / Load More */}
      {filteredZones.length > displayLimit && (
        <div className="text-center pt-4">
          <p className="text-xs text-slate-500 mb-3">
            Showing {visibleZones.length} of {filteredZones.length} matching time zones
          </p>
          <div className="inline-flex gap-3">
            <button
              onClick={() => setDisplayLimit((prev) => prev + 60)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-all"
            >
              Load Next 60 Zones
            </button>
            <button
              onClick={() => setDisplayLimit(filteredZones.length)}
              className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all"
            >
              Show All ({filteredZones.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
