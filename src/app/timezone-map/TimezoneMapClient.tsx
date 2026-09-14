"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { getTimeDetails } from '@/lib/time/engine';
import { ArrowRight, Clock, Globe } from 'lucide-react';
import { formatTimeInZone } from '@/lib/time/timezones';

interface TimezoneBand {
  offsetStr: string;
  offsetMins: number;
  label: string;
  representative: string;
  x: number; // visual approx %
}

const TIMEZONE_BANDS: TimezoneBand[] = [
  { offsetStr: 'UTC -12', offsetMins: -720, label: 'Baker Island Time (BIT)', representative: 'Etc/GMT+12', x: 2 },
  { offsetStr: 'UTC -11', offsetMins: -660, label: 'Samoa Standard (SST)', representative: 'Pacific/Pago_Pago', x: 6 },
  { offsetStr: 'UTC -10', offsetMins: -600, label: 'Hawaii-Aleutian (HST)', representative: 'Pacific/Honolulu', x: 10 },
  { offsetStr: 'UTC -9', offsetMins: -540, label: 'Alaska Standard (AKST)', representative: 'America/Anchorage', x: 14 },
  { offsetStr: 'UTC -8', offsetMins: -480, label: 'Pacific Standard (PST)', representative: 'America/Los_Angeles', x: 18 },
  { offsetStr: 'UTC -7', offsetMins: -420, label: 'Mountain Standard (MST)', representative: 'America/Denver', x: 22 },
  { offsetStr: 'UTC -6', offsetMins: -360, label: 'Central Standard (CST)', representative: 'America/Chicago', x: 26 },
  { offsetStr: 'UTC -5', offsetMins: -300, label: 'Eastern Standard (EST)', representative: 'America/New_York', x: 30 },
  { offsetStr: 'UTC -4', offsetMins: -240, label: 'Atlantic Standard (AST)', representative: 'America/Halifax', x: 34 },
  { offsetStr: 'UTC -3', offsetMins: -180, label: 'Argentina / Brasilia (ART/BRT)', representative: 'America/Sao_Paulo', x: 38 },
  { offsetStr: 'UTC -2', offsetMins: -120, label: 'South Georgia (GST)', representative: 'Atlantic/South_Georgia', x: 42 },
  { offsetStr: 'UTC -1', offsetMins: -60, label: 'Azores Standard (AZOT)', representative: 'Atlantic/Azores', x: 46 },
  { offsetStr: 'UTC +0', offsetMins: 0, label: 'Greenwich Mean Time (GMT/UTC)', representative: 'Europe/London', x: 50 },
  { offsetStr: 'UTC +1', offsetMins: 60, label: 'Central European (CET)', representative: 'Europe/Paris', x: 54 },
  { offsetStr: 'UTC +2', offsetMins: 120, label: 'Eastern European (EET)', representative: 'Europe/Athens', x: 58 },
  { offsetStr: 'UTC +3', offsetMins: 180, label: 'Moscow / Arabia (MSK/AST)', representative: 'Asia/Riyadh', x: 62 },
  { offsetStr: 'UTC +4', offsetMins: 240, label: 'Gulf Standard (GST)', representative: 'Asia/Dubai', x: 66 },
  { offsetStr: 'UTC +5', offsetMins: 300, label: 'Pakistan / Yekaterinburg', representative: 'Asia/Karachi', x: 70 },
  { offsetStr: 'UTC +5:30', offsetMins: 330, label: 'India Standard Time (IST)', representative: 'Asia/Kolkata', x: 73 },
  { offsetStr: 'UTC +6', offsetMins: 360, label: 'Bangladesh Standard (BST)', representative: 'Asia/Dhaka', x: 76 },
  { offsetStr: 'UTC +7', offsetMins: 420, label: 'Indochina Time (ICT)', representative: 'Asia/Bangkok', x: 80 },
  { offsetStr: 'UTC +8', offsetMins: 480, label: 'China / Singapore (CST/SGT)', representative: 'Asia/Singapore', x: 85 },
  { offsetStr: 'UTC +9', offsetMins: 540, label: 'Japan / Korea (JST/KST)', representative: 'Asia/Tokyo', x: 90 },
  { offsetStr: 'UTC +10', offsetMins: 600, label: 'Australian Eastern (AEST)', representative: 'Australia/Sydney', x: 95 },
  { offsetStr: 'UTC +12', offsetMins: 720, label: 'New Zealand (NZST)', representative: 'Pacific/Auckland', x: 99 },
];

export function TimezoneMapClient() {
  const [selectedBand, setSelectedBand] = useState(TIMEZONE_BANDS[12]); // UTC+0 default
  const [hoveredBand, setHoveredBand] = useState<TimezoneBand | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cur = now || new Date();

  const details = useMemo(() => {
    return getTimeDetails(selectedBand.representative, cur);
  }, [selectedBand, cur]);

  const memberZones = useMemo(() => {
    return ALL_IANA_TIMEZONES.filter(z => z.formattedOffset === selectedBand.offsetStr).slice(0, 12);
  }, [selectedBand]);

  return (
    <div className="space-y-8">
      {/* Interactive Map Canvas Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Interactive 24-Hour Planetary Bands
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Select a Longitudinal Time Zone Band
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Hover or click any longitudinal slice to inspect time zones
          </div>
        </div>

        {/* SVG World Map Bands Container */}
        <div
          className="relative w-full h-64 sm:h-80 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 p-4 select-none"
          onMouseLeave={() => {
            setHoveredBand(null);
            setHoveredIndex(null);
          }}
        >
          {/* Subtle World Map Outline Grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Longitudinal Slices */}
          <div className="relative w-full h-full flex items-stretch">
            {TIMEZONE_BANDS.map((band, idx) => {
              const isSelected = selectedBand.offsetStr === band.offsetStr;
              return (
                <button
                  key={band.offsetStr}
                  onClick={() => setSelectedBand(band)}
                  onMouseEnter={() => {
                    setHoveredBand(band);
                    setHoveredIndex(idx);
                  }}
                  className={`flex-1 h-full transition-all duration-150 relative group flex flex-col justify-between py-2 border-r border-slate-800/40 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/40 border-x-2 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20'
                      : 'hover:bg-blue-500/20'
                  }`}
                  title={`${band.offsetStr} — ${band.label}`}
                >
                  <span className={`text-[9px] font-mono font-bold rotate-90 origin-top-left ml-2 whitespace-nowrap ${
                    isSelected ? 'text-blue-300' : 'text-slate-500 opacity-60'
                  }`}>
                    {band.offsetStr.replace('UTC ', '')}
                  </span>

                  {isSelected && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mx-auto animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* High-Resolution Floating Tooltip Popup for Map Bands */}
          {hoveredBand && hoveredIndex !== null && (
            <div
              style={{
                left: `${((hoveredIndex + 0.5) / TIMEZONE_BANDS.length) * 100}%`,
                top: '16px'
              }}
              className={`absolute z-50 pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95 ${
                hoveredIndex > 18
                  ? '-translate-x-[90%]'
                  : hoveredIndex < 6
                  ? '-translate-x-[10%]'
                  : '-translate-x-1/2'
              }`}
            >
              <div className="bg-slate-900/95 text-white border border-slate-700/90 shadow-2xl rounded-2xl p-3 min-w-[220px] backdrop-blur-xl ring-1 ring-white/10">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-1.5">
                  <span className="font-mono font-bold text-xs text-blue-400">
                    {hoveredBand.offsetStr}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                    {hoveredBand.representative.split('/').pop()?.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-100 truncate mb-1">
                  {hoveredBand.label}
                </div>
                <div className="flex items-baseline justify-between text-cyan-300 font-mono font-black text-base">
                  <span>{formatTimeInZone(cur, hoveredBand.representative, false, true)}</span>
                  <span className="text-[10px] font-sans font-normal text-slate-400">Click to select</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Offset Navigation Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {TIMEZONE_BANDS.map((band) => {
            const isSelected = selectedBand.offsetStr === band.offsetStr;
            return (
              <button
                key={band.offsetStr}
                onClick={() => setSelectedBand(band)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {band.offsetStr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Band Details Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Clock Card for Selected Band */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Current Local Time in Band
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {selectedBand.label}
            </h3>
            <span className="text-xs font-mono text-slate-400 block mt-0.5">
              Standard Offset: <strong>{selectedBand.offsetStr}</strong> &bull; Ref: {selectedBand.representative}
            </span>
          </div>

          <div className="my-6">
            <div className="text-5xl font-mono font-black text-slate-900 dark:text-white">
              {details.timeStr}
            </div>
            <span className="text-xs text-slate-500 font-medium block mt-1">
              {details.dateStr}
            </span>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Daylight Saving Status</span>
            <strong className="text-slate-900 dark:text-white">{details.isDst ? 'DST Active' : 'Standard Time'}</strong>
          </div>
        </div>

        {/* Member Cities & IANA Timezones in Band */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Major Cities & Time Zones in {selectedBand.offsetStr}
            </h4>
            <span className="text-xs text-slate-400">
              {memberZones.length} canonical zones listed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {memberZones.map((z) => (
              <div
                key={z.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <strong className="text-xs font-bold text-slate-900 dark:text-white block truncate">
                    {z.city}
                  </strong>
                  <span className="text-[10px] font-mono text-slate-400 block truncate">
                    {z.id}
                  </span>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono shrink-0 ml-2">
                  {z.formattedOffset}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href={`/utc-offset/${selectedBand.offsetStr.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View dedicated {selectedBand.offsetStr} offset guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
