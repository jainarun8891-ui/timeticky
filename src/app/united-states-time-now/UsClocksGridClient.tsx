"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, isDstActive } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';
import { Clock, Sun, Moon, MapPin, ArrowRight, ShieldCheck, Globe, Check } from 'lucide-react';

interface UsZoneConfig {
  id: string;
  name: string;
  shortCode: string;
  dstCode: string;
  iana: string;
  observesDst: boolean;
  majorCities: { name: string; slug: string }[];
  statesCovered: string;
  description: string;
}

const US_ZONES: UsZoneConfig[] = [
  {
    id: 'eastern',
    name: 'Eastern Time',
    shortCode: 'EST',
    dstCode: 'EDT',
    iana: 'America/New_York',
    observesDst: true,
    majorCities: [
      { name: 'New York', slug: 'new-york' },
      { name: 'Washington D.C.', slug: 'washington-dc' },
      { name: 'Miami', slug: 'miami' },
      { name: 'Atlanta', slug: 'atlanta' },
      { name: 'Boston', slug: 'boston' }
    ],
    statesCovered: 'NY, FL, GA, NC, VA, PA, OH, MI, MA, DC + 13 more',
    description: 'Encompasses the US federal capital, Wall Street, and roughly 48% of the American population.'
  },
  {
    id: 'central',
    name: 'Central Time',
    shortCode: 'CST',
    dstCode: 'CDT',
    iana: 'America/Chicago',
    observesDst: true,
    majorCities: [
      { name: 'Chicago', slug: 'chicago' },
      { name: 'Houston', slug: 'houston' },
      { name: 'Dallas', slug: 'dallas' },
      { name: 'Austin', slug: 'austin' },
      { name: 'Minneapolis', slug: 'minneapolis' }
    ],
    statesCovered: 'IL, TX, MN, MO, WI, TN, LA, AL, OK, KS + 10 more',
    description: 'Covers the American industrial heartland, Gulf Coast energy corridors, and Midwest manufacturing.'
  },
  {
    id: 'mountain',
    name: 'Mountain Time',
    shortCode: 'MST',
    dstCode: 'MDT',
    iana: 'America/Denver',
    observesDst: true,
    majorCities: [
      { name: 'Denver', slug: 'denver' },
      { name: 'Salt Lake City', slug: 'salt-lake-city' },
      { name: 'Albuquerque', slug: 'albuquerque' },
      { name: 'Boise', slug: 'boise' },
      { name: 'El Paso', slug: 'el-paso' }
    ],
    statesCovered: 'CO, UT, NM, WY, MT, ID (southern), parts of ND, SD, NE, TX',
    description: 'Spans the Rocky Mountain corridor, tech hubs in Colorado and Utah, and desert southwest states.'
  },
  {
    id: 'arizona',
    name: 'Arizona (MST Year-Round)',
    shortCode: 'MST',
    dstCode: 'MST',
    iana: 'America/Phoenix',
    observesDst: false,
    majorCities: [
      { name: 'Phoenix', slug: 'phoenix' },
      { name: 'Tucson', slug: 'tucson' },
      { name: 'Mesa', slug: 'mesa' },
      { name: 'Scottsdale', slug: 'scottsdale' },
      { name: 'Flagstaff', slug: 'flagstaff' }
    ],
    statesCovered: 'State of Arizona (excluding the Navajo Nation reservation)',
    description: 'Permanently remains on Mountain Standard Time (UTC-7) without seasonal Daylight Saving clock changes.'
  },
  {
    id: 'pacific',
    name: 'Pacific Time',
    shortCode: 'PST',
    dstCode: 'PDT',
    iana: 'America/Los_Angeles',
    observesDst: true,
    majorCities: [
      { name: 'Los Angeles', slug: 'los-angeles' },
      { name: 'San Francisco', slug: 'san-francisco' },
      { name: 'Seattle', slug: 'seattle' },
      { name: 'San Diego', slug: 'san-diego' },
      { name: 'Las Vegas', slug: 'las-vegas' }
    ],
    statesCovered: 'CA, WA, OR (most), NV, ID (northern panhandle)',
    description: 'Hub for Silicon Valley, entertainment industry, West Coast seaports, and aerospace engineering.'
  },
  {
    id: 'alaska',
    name: 'Alaska Time',
    shortCode: 'AKST',
    dstCode: 'AKDT',
    iana: 'America/Anchorage',
    observesDst: true,
    majorCities: [
      { name: 'Anchorage', slug: 'anchorage' },
      { name: 'Fairbanks', slug: 'fairbanks' },
      { name: 'Juneau', slug: 'juneau' }
    ],
    statesCovered: 'State of Alaska (except the westernmost Aleutian Islands)',
    description: '1 hour behind Pacific Time. Spans Alaska’s vast subarctic territory and maritime trade channels.'
  },
  {
    id: 'hawaii',
    name: 'Hawaii-Aleutian Time',
    shortCode: 'HST',
    dstCode: 'HST',
    iana: 'Pacific/Honolulu',
    observesDst: false,
    majorCities: [
      { name: 'Honolulu', slug: 'honolulu' },
      { name: 'Hilo', slug: 'hilo' },
      { name: 'Kahului', slug: 'kahului' }
    ],
    statesCovered: 'State of Hawaii',
    description: 'Permanently on UTC-10 year-round. 2 to 3 hours behind Pacific Time depending on DST seasons.'
  }
];

export function UsClocksGridClient() {
  const [now, setNow] = useState(new Date());
  const [is24, setIs24] = useState(false);
  const [showSec, setShowSec] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(t);
  }, []);

  const capitalTime = formatTimeInZone(now, 'America/New_York', is24, showSec);
  const capitalDate = formatDateInZone(now, 'America/New_York');
  const capitalOffset = getUtcOffsetString(now, 'America/New_York');
  const capitalDst = isDstActive(now, 'America/New_York');

  return (
    <div className="space-y-8">
      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Atomic Chronometer Synchronization (NTP Verified)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIs24(!is24)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              is24
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {is24 ? '24-Hour Format' : '12-Hour (AM/PM)'}
          </button>
          <button
            onClick={() => setShowSec(!showSec)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              showSec
                ? 'bg-slate-900 dark:bg-slate-700 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {showSec ? 'Seconds ON' : 'Seconds OFF'}
          </button>
        </div>
      </div>

      {/* Capital Clock Hero Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
              <MapPin className="w-3.5 h-3.5" />
              Official Federal Benchmark • Washington, D.C.
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              United States Capital Time Now
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Civil benchmark for the White House, US Congress, Supreme Court, and federal government agencies.
            </p>
          </div>

          <div className="text-left md:text-right bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/10">
            <div className="text-4xl sm:text-6xl font-black font-mono tracking-tight text-white drop-shadow-sm" suppressHydrationWarning>
              {capitalTime}
            </div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium mt-2" suppressHydrationWarning>
              {capitalDate}
            </div>
            <div className="flex items-center md:justify-end gap-2 mt-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/20">
                {capitalOffset}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/20">
                {capitalDst ? 'Daylight Time (EDT)' : 'Standard Time (EST)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All US Time Zones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Live Clocks Across All US Time Zones
          </h2>
          <span className="text-xs text-slate-500 font-medium">6 Primary Zones + Arizona</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {US_ZONES.map((zone) => {
            const timeStr = formatTimeInZone(now, zone.iana, is24, showSec);
            const dateStr = formatDateInZone(now, zone.iana);
            const offsetStr = getUtcOffsetString(now, zone.iana);
            const dstActive = isDstActive(now, zone.iana);
            const activeCode = dstActive && zone.observesDst ? zone.dstCode : zone.shortCode;

            return (
              <div
                key={zone.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900">
                      {activeCode} • {offsetStr}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {dstActive && zone.observesDst ? 'DST Active' : zone.observesDst ? 'Standard Time' : 'No DST (Year-Round)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {zone.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {zone.description}
                  </p>

                  {/* Digital Clock Display */}
                  <div className="my-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                    <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white" suppressHydrationWarning>
                      {timeStr}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium" suppressHydrationWarning>
                      {dateStr}
                    </div>
                  </div>

                  {/* States Covered */}
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">States: </span>
                    {zone.statesCovered}
                  </div>
                </div>

                {/* Major Cities Quick Links */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Major Cities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {zone.majorCities.map((city) => (
                      <Link
                        key={city.name}
                        href={`/${city.slug}`}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:text-blue-600 transition-colors"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* US Territories Mini-Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          United States Overseas Territories Current Times
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block">Puerto Rico & USVI</span>
            <span className="text-slate-500 block">Atlantic Standard (AST, UTC-4)</span>
            <span className="text-base font-mono font-bold text-blue-600 dark:text-blue-400 mt-1 block">
              {formatTimeInZone(now, 'America/Puerto_Rico', is24, false)}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block">Guam & Northern Mariana</span>
            <span className="text-slate-500 block">Chamorro Standard (ChST, UTC+10)</span>
            <span className="text-base font-mono font-bold text-blue-600 dark:text-blue-400 mt-1 block">
              {formatTimeInZone(now, 'Pacific/Guam', is24, false)}
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white block">American Samoa</span>
            <span className="text-slate-500 block">Samoa Standard (SST, UTC-11)</span>
            <span className="text-base font-mono font-bold text-blue-600 dark:text-blue-400 mt-1 block">
              {formatTimeInZone(now, 'Pacific/Pago_Pago', is24, false)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
