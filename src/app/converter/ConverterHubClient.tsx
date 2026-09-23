"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { TimeConverterClient } from '@/app/time-converter/TimeConverterClient';
import { CITIES } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, getTimeDifference } from '@/lib/time/timezones';
import {
  CANONICAL_CONVERTER_ABBREVIATIONS,
  COMMON_TIMEZONE_ABBREVIATIONS,
  getAllConverterCombos
} from '@/lib/time/timezone-lookup';
import { POPULAR_TIME_DIFFERENCE_PAIRS, findCityByRootSlug } from '@/lib/geo/city-lookup';
import {
  Search, ArrowRight, ChevronRight, Filter, Users, Calendar,
  Plane, Layers, Clock, Globe, Sparkles
} from 'lucide-react';

export function ConverterHubClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [quickCityAId, setQuickCityAId] = useState('delhi-in');
  const [quickCityBId, setQuickCityBId] = useState('new-york-us');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const quickCityA = useMemo(() => CITIES.find(c => c.id === quickCityAId) || CITIES[0], [quickCityAId]);
  const quickCityB = useMemo(() => CITIES.find(c => c.id === quickCityBId) || CITIES[1], [quickCityBId]);

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
    <div className="space-y-12">
      {/* 1. Primary Interactive Multi-Zone Visual Converter */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Interactive 24-Hour Timeline Grid</span>
        </div>
        <TimeConverterClient />
      </div>

      {/* 2. Co-Located Conversion Modules */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Specialized Conversion & Scheduling Suites
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access deep comparative horology tools, meeting planners, and circadian fatigue calculators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/converter/compare"
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 flex items-center justify-center text-blue-600 mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 transition-colors">
                Time Zone Comparator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Compare up to 10 cities side-by-side with atomic clock precision.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-blue-600">
              <span>Open Comparator</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/meeting-planner"
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/60 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 flex items-center justify-center text-emerald-600 mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-600 transition-colors">
                Global Meeting Planner
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Matrix grid highlighting golden hours across multiple continents.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-emerald-600">
              <span>Plan Meetings</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/overlap-calculator"
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-purple-500/60 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800 flex items-center justify-center text-purple-600 mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-purple-600 transition-colors">
                Working Hours Overlap
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Calculate real-time business overlap hours between international remote teams.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-purple-600">
              <span>Calculate Overlap</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/jet-lag-calculator"
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500/60 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800 flex items-center justify-center text-amber-600 mb-3">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 transition-colors">
                Jet Lag & Flight Fatigue
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Circadian shift schedules, light therapy plans, and melatonin guidelines.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-amber-600">
              <span>View Protocol</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* 3. Instant Two-City Time Difference Calculator */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Instant Pair Comparison</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Quick City-to-City Time Difference
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Compare live clocks, day shifts, and working overlap between any two world cities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              From Location (Here)
            </label>
            <select
              value={quickCityAId}
              onChange={(e) => setQuickCityAId(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white text-sm outline-none"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
              ))}
            </select>
            {quickCityA && (
              <div className="mt-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white block">
                  {formatTimeInZone(now, quickCityA.timezone, false, true)}
                </span>
                <span className="text-xs text-slate-500 block mt-1">
                  {formatDateInZone(now, quickCityA.timezone)}
                </span>
                <span className="text-[11px] text-blue-600 font-semibold font-mono">
                  {getUtcOffsetString(now, quickCityA.timezone)} • {quickCityA.timezone}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              To Location (There)
            </label>
            <select
              value={quickCityBId}
              onChange={(e) => setQuickCityBId(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-white text-sm outline-none"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}, {c.country}</option>
              ))}
            </select>
            {quickCityB && (
              <div className="mt-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white block">
                  {formatTimeInZone(now, quickCityB.timezone, false, true)}
                </span>
                <span className="text-xs text-slate-500 block mt-1">
                  {formatDateInZone(now, quickCityB.timezone)}
                </span>
                <span className="text-[11px] text-blue-600 font-semibold font-mono">
                  {getUtcOffsetString(now, quickCityB.timezone)} • {quickCityB.timezone}
                </span>
              </div>
            )}
          </div>
        </div>

        {quickCityA && quickCityB && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-bold">
              <span>{quickCityB.name} is</span>
              <strong className="text-blue-800 dark:text-blue-200 font-black">
                {getTimeDifference(quickCityA.timezone, quickCityB.timezone, now).formatted}
              </strong>
              <span>{quickCityA.name}</span>
            </div>

            <Link
              href={`/converter/difference/${quickCityA.id.replace(/-[a-z]{2}$/, '')}-to-${quickCityB.id.replace(/-[a-z]{2}$/, '')}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View Full 24-Hour Comparison Table</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* 4. Popular City Pair Differences */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Popular City Pair Differences
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Exact hour offset and time difference between major metropolitan centers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {POPULAR_TIME_DIFFERENCE_PAIRS.slice(0, 12).map((pair) => {
            const cityA = findCityByRootSlug(pair.cityA);
            const cityB = findCityByRootSlug(pair.cityB);
            const nameA = cityA?.name || pair.cityA;
            const nameB = cityB?.name || pair.cityB;
            const slug = `${pair.cityA}-to-${pair.cityB}`;
            return (
              <Link
                key={slug}
                href={`/converter/difference/${slug}`}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xs transition-all flex items-center justify-between group"
              >
                <div className="truncate">
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors truncate">
                    {nameA} vs {nameB}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {nameA} to {nameB} Time Difference
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5 shrink-0 ml-2" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Conversion Combos Directory (552 Combos) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Quick Conversion Combos Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search or filter across all 552 canonical cross-timezone pairs (GMT, EST, PST, CST, IST, CET, etc.).
          </p>
        </div>

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

          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter by Source Timezone ({CANONICAL_CONVERTER_ABBREVIATIONS.length} major zones)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All (552 Combos)
              </button>
              {CANONICAL_CONVERTER_ABBREVIATIONS.map((abbr) => (
                <button
                  key={abbr}
                  type="button"
                  onClick={() => setActiveTab(abbr)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer ${
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
                href={`/converter/${c.slug}`}
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
    </div>
  );
}
