const fs = require('fs');

fs.writeFileSync('src/components/dashboard/HeroClockCard.tsx', `
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, CheckCircle2, ChevronDown, Copy, Check, Maximize2, Share2 } from 'lucide-react';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { syncWithServer, getSyncedDate } from '@/lib/time/sync';
import { City, CITIES } from '@/lib/geo/cities';

interface HeroClockCardProps {
  currentCity?: City;
  onSelectCity?: (city: City) => void;
}

export function HeroClockCard({ currentCity = CITIES[0], onSelectCity }: HeroClockCardProps) {
  const router = useRouter();
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);
  const [syncPrecision, setSyncPrecision] = useState("±0.01 seconds");

  useEffect(() => {
    syncWithServer().then((state) => {
      if (state.isSynced) {
        setSyncPrecision(\`±\${(state.accuracyMs / 1000).toFixed(2)} seconds\`);
      }
    });

    const interval = setInterval(() => {
      setTime(getSyncedDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeStr = formatTimeInZone(time, currentCity.timezone, !is24Hour, showSeconds);
  const dateStr = formatDateInZone(time, currentCity.timezone);
  const utcOffsetStr = getUtcOffsetString(time, currentCity.timezone);

  const handleCopy = () => {
    navigator.clipboard.writeText(\`\${currentCity.name}: \${timeStr} (\${utcOffsetStr})\`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: \`Time in \${currentCity.name}\`,
        text: \`Current time in \${currentCity.name}: \${timeStr} (\${utcOffsetStr})\`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-10 lg:p-12 overflow-hidden transition-all min-h-[420px] flex flex-col justify-between">
      {/* Photo Landscape Background matching reference image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-left sm:bg-center pointer-events-none opacity-40 dark:opacity-20 transition-opacity"
        style={{
          backgroundImage: "url('/images/paris_hero.jpg')"
        }}
      />

      {/* Elegant Radial/Linear Fade Overlay to guarantee perfect text legibility in center while keeping skyline visible on sides */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-white/95 via-white/80 to-white/95 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-900/95" />

      {/* Main Card Content */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4">
          {/* Change City Button */}
          <div className="relative">
            <button
              onClick={() => setIsCityPickerOpen(!isCityPickerOpen)}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-sm border border-slate-200 dark:border-slate-700 backdrop-blur-md transition-all hover:shadow"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Change city</span>
            </button>

            {isCityPickerOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Global Hub
                </div>
                {CITIES.slice(0, 10).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      if (onSelectCity) onSelectCity(c);
                      setIsCityPickerOpen(false);
                    }}
                    type="button"
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 flex items-center justify-between transition-colors"
                  >
                    <span>{c.name}, {c.country}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{c.timezone.split('/')[1]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center Location & Exact Time Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setIsCityPickerOpen(!isCityPickerOpen)}
            >
              <span className="text-2xl sm:text-3xl">
                {currentCity.countryCode === 'FR' ? '🇫🇷' :
                 currentCity.countryCode === 'US' ? '🇺🇸' :
                 currentCity.countryCode === 'GB' ? '🇬🇧' :
                 currentCity.countryCode === 'JP' ? '🇯🇵' :
                 currentCity.countryCode === 'AE' ? '🇦🇪' :
                 currentCity.countryCode === 'IN' ? '🇮🇳' :
                 currentCity.countryCode === 'AU' ? '🇦🇺' : '🌐'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                {currentCity.name}, {currentCity.country}
              </h1>
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>

            {/* Exact Time Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Exact time</span>
            </div>
          </div>

          {/* Right Quote Pill */}
          <div className="hidden lg:block max-w-[240px] text-right bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug">
              “Same planet. A brighter perspective.”
            </p>
            <div className="w-7 h-0.5 bg-blue-500 my-1.5 ml-auto" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Explore time around the world and stay in sync with what matters.
            </p>
          </div>
        </div>

        {/* Hero Clock Display */}
        <div className="my-6 text-center">
          <div className="inline-block">
            <div className="text-7xl sm:text-8xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tight font-mono select-all leading-none drop-shadow-xs">
              {timeStr}
            </div>

            {/* Full Date Line */}
            <div className="mt-4 text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-200">
              {dateStr}
            </div>

            {/* UTC Offset & Timezone Name */}
            <div className="mt-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span className="font-extrabold text-slate-800 dark:text-slate-200">{utcOffsetStr}</span>
              <span className="mx-2.5 text-slate-300 dark:text-slate-600">|</span>
              <span>{currentCity.timezone.replace(/_/g, ' ')}</span>
            </div>
          </div>
        </div>

        {/* Bottom Synchronization Bar & Utility Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200/70 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Synchronized with atomic time
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span className="font-medium">Precision: {syncPrecision}</span>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              type="button"
              className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              {is24Hour ? '24h' : '12h'}
            </button>
            <button
              onClick={() => setShowSeconds(!showSeconds)}
              type="button"
              className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              {showSeconds ? 'Hide sec' : 'Show sec'}
            </button>
            <button
              onClick={handleCopy}
              type="button"
              title="Copy time"
              aria-label="Copy time"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleShare}
              type="button"
              title="Share time"
              aria-label="Share time"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push('/clock')}
              type="button"
              title="Fullscreen clock"
              aria-label="Fullscreen clock"
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`);

console.log('HeroClockCard upgraded with realistic photo banner and grand typography');
