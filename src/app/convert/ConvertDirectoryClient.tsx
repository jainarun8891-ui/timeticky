"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Globe, ArrowRight, Sparkles, Clock,
  ChevronRight, Filter, Compass
} from 'lucide-react';
import {
  CANONICAL_CONVERTER_ABBREVIATIONS,
  COMMON_TIMEZONE_ABBREVIATIONS,
  getAllConverterCombos
} from '@/lib/time/timezone-lookup';

export function ConvertDirectoryClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const allCombos = useMemo(() => {
    return getAllConverterCombos().map(combo => {
      const [from, to] = combo.split('-to-');
      const fromDef = COMMON_TIMEZONE_ABBREVIATIONS[from];
      const toDef = COMMON_TIMEZONE_ABBREVIATIONS[to];
      return {
        slug: combo,
        fromAbbr: from.toUpperCase(),
        toAbbr: to.toUpperCase(),
        fromName: fromDef?.primaryName || from.toUpperCase(),
        toName: toDef?.primaryName || to.toUpperCase(),
        fromSlug: from,
        toSlug: to,
        label: `${from.toUpperCase()} to ${to.toUpperCase()} Converter`
      };
    });
  }, []);

  const filteredCombos = useMemo(() => {
    let list = allCombos;
    if (activeTab !== 'all') {
      list = list.filter(c => c.fromSlug === activeTab);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.fromAbbr.toLowerCase().includes(q) ||
        c.toAbbr.toLowerCase().includes(q) ||
        c.fromName.toLowerCase().includes(q) ||
        c.toName.toLowerCase().includes(q) ||
        c.slug.includes(q)
      );
    }
    return list;
  }, [allCombos, activeTab, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search any converter (e.g. 'GMT to EST', 'IST to PST', 'Tokyo', 'London')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Timezone Filter Pills */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter by Source Timezone ({CANONICAL_CONVERTER_ABBREVIATIONS.length} major zones)</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All (552 Converters)
            </button>
            {CANONICAL_CONVERTER_ABBREVIATIONS.map((abbr) => (
              <button
                key={abbr}
                type="button"
                onClick={() => setActiveTab(abbr)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors ${
                  activeTab === abbr
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {abbr.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white font-mono">{filteredCombos.length}</strong> Timezone Converters
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredCombos.slice(0, 120).map((c) => (
            <Link
              key={c.slug}
              href={`/convert/${c.slug}`}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono font-black text-sm">
                  <span className="text-blue-600 dark:text-blue-400">{c.fromAbbr}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-emerald-600 dark:text-emerald-400">{c.toAbbr}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="text-[11px] text-slate-400 mt-2 truncate font-medium">
                {c.fromName} → {c.toName}
              </div>
            </Link>
          ))}
        </div>

        {filteredCombos.length > 120 && (
          <div className="text-center py-6 text-xs text-slate-400">
            Showing top 120 results. Use the search box above to narrow down specific pairs.
          </div>
        )}
      </div>
    </div>
  );
}
