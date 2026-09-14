const fs = require('fs');

// HeroClockCard.tsx
fs.writeFileSync('src/components/dashboard/HeroClockCard.tsx', `
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, CheckCircle2, ChevronDown, Copy, Check, Maximize2, Share2 } from 'lucide-react';
import { ParisHeroBanner } from '../art/ParisHeroBanner';
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

  // Initial silent server sync
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
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 lg:p-10 overflow-hidden transition-all">
      {/* Scenic Vector Banner Background */}
      <ParisHeroBanner />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[330px]">
        {/* Top Controls Row */}
        <div className="flex items-start justify-between gap-4">
          {/* Change City Button */}
          <div className="relative">
            <button
              onClick={() => setIsCityPickerOpen(!isCityPickerOpen)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm border border-slate-200/70 dark:border-slate-700 backdrop-blur-sm transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Change city</span>
            </button>

            {/* Quick City Picker Dropdown */}
            {isCityPickerOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Hub
                </div>
                {CITIES.slice(0, 7).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      if (onSelectCity) onSelectCity(c);
                      setIsCityPickerOpen(false);
                    }}
                    type="button"
                    className="w-full px-3 py-2 text-left text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 flex items-center justify-between"
                  >
                    <span>{c.name}, {c.country}</span>
                    <span className="text-[10px] text-slate-400">{c.timezone.split('/')[1]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center Location & Exact Time Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsCityPickerOpen(!isCityPickerOpen)}>
              <span className="text-xl">
                {currentCity.countryCode === 'FR' ? '🇫🇷' :
                 currentCity.countryCode === 'US' ? '🇺🇸' :
                 currentCity.countryCode === 'GB' ? '🇬🇧' :
                 currentCity.countryCode === 'JP' ? '🇯🇵' :
                 currentCity.countryCode === 'AE' ? '🇦🇪' :
                 currentCity.countryCode === 'IN' ? '🇮🇳' :
                 currentCity.countryCode === 'AU' ? '🇦🇺' : '🌐'}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {currentCity.name}, {currentCity.country}
              </h1>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>

            {/* Exact Time Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Exact time</span>
            </div>
          </div>

          {/* Right Quote / Perspective Pill */}
          <div className="hidden md:block max-w-[210px] text-right bg-white/75 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">
              “Same planet. A brighter perspective.”
            </p>
            <div className="w-6 h-0.5 bg-blue-500 my-1.5 ml-auto" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Explore time around the world and stay in sync with what matters.
            </p>
          </div>
        </div>

        {/* Hero Clock Display */}
        <div className="my-6 text-center">
          <div className="inline-block">
            <div className="text-6xl sm:text-7xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight font-mono select-all">
              {timeStr}
            </div>

            {/* Date */}
            <div className="mt-2 text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
              {dateStr}
            </div>

            {/* UTC Offset & Timezone Name */}
            <div className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">{utcOffsetStr}</span>
              <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>
              <span>{currentCity.timezone.replace(/_/g, ' ')}</span>
            </div>
          </div>
        </div>

        {/* Bottom Synchronization Bar & Utility Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/70 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Synchronized with atomic time
            </span>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>Precision: {syncPrecision}</span>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              type="button"
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold text-[11px]"
            >
              {is24Hour ? '24h' : '12h'}
            </button>
            <button
              onClick={() => setShowSeconds(!showSeconds)}
              type="button"
              className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold text-[11px]"
            >
              {showSeconds ? 'Hide sec' : 'Show sec'}
            </button>
            <button
              onClick={handleCopy}
              type="button"
              aria-label="Copy time"
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleShare}
              type="button"
              aria-label="Share time"
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => router.push('/clock')}
              type="button"
              aria-label="Fullscreen clock"
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`, 'utf8');

// WorldMapCard.tsx
fs.writeFileSync('src/components/dashboard/WorldMapCard.tsx', `
"use client";

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { WorldMapSvg } from '../art/WorldMapSvg';
import { City, CITIES } from '@/lib/geo/cities';

interface WorldMapCardProps {
  city?: City;
}

export function WorldMapCard({ city = CITIES[0] }: WorldMapCardProps) {
  return (
    <div className="relative w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between transition-all">
      {/* Map Graphic with live coordinate pin */}
      <div className="w-full flex-1 flex items-center justify-center">
        <WorldMapSvg activeLat={city.lat} activeLng={city.lng} className="w-full h-44" />
      </div>

      {/* Card Footer Information */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {city.countryCode === 'FR' ? '🇫🇷' :
             city.countryCode === 'US' ? '🇺🇸' :
             city.countryCode === 'GB' ? '🇬🇧' :
             city.countryCode === 'JP' ? '🇯🇵' :
             city.countryCode === 'AE' ? '🇦🇪' :
             city.countryCode === 'IN' ? '🇮🇳' :
             city.countryCode === 'AU' ? '🇦🇺' : '🌐'}
          </span>
          <div>
            <span className="font-bold text-slate-900 dark:text-white text-sm block">
              {city.name}
            </span>
            <span className="text-[11px] text-slate-400 block font-mono">
              {city.lat.toFixed(4)}° {city.lat >= 0 ? 'N' : 'S'}, {Math.abs(city.lng).toFixed(4)}° {city.lng >= 0 ? 'E' : 'W'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {city.timezone}
          </span>
          <Link
            href={\`/time/\${city.slug}\`}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 transition-colors"
            title="Open location details"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
`, 'utf8');

// WorldClockStrip.tsx
fs.writeFileSync('src/components/dashboard/WorldClockStrip.tsx', `
"use client";

import React, { useState, useEffect } from 'react';
import { Globe, Plus, Sun, Moon } from 'lucide-react';
import { City, CITIES } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getOffsetMinutes } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';
import { EiffelTowerSvg } from '../art/EiffelTowerSvg';
import { StatueOfLibertySvg } from '../art/StatueOfLibertySvg';
import { BigBenSvg } from '../art/BigBenSvg';
import { TokyoTowerSvg } from '../art/TokyoTowerSvg';
import { BurjAlArabSvg } from '../art/BurjAlArabSvg';
import { IndiaGateSvg } from '../art/IndiaGateSvg';
import { SydneyOperaHouseSvg } from '../art/SydneyOperaHouseSvg';
import { GenericSkylineSvg } from '../art/GenericSkylineSvg';

interface WorldClockStripProps {
  selectedCityId?: string;
  onSelectCity?: (city: City) => void;
}

export function WorldClockStrip({ selectedCityId = "paris-fr", onSelectCity }: WorldClockStripProps) {
  const [now, setNow] = useState(new Date());
  const [citiesList, setCitiesList] = useState<City[]>(CITIES.slice(0, 7));

  useEffect(() => {
    const timer = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderLandmark = (landmarkId?: string) => {
    switch (landmarkId) {
      case 'eiffel': return <EiffelTowerSvg className="w-8 h-12" />;
      case 'liberty': return <StatueOfLibertySvg className="w-8 h-12" />;
      case 'bigben': return <BigBenSvg className="w-8 h-12" />;
      case 'tokyotower': return <TokyoTowerSvg className="w-8 h-12" />;
      case 'burj': return <BurjAlArabSvg className="w-8 h-12" />;
      case 'indiagate': return <IndiaGateSvg className="w-8 h-12" />;
      case 'operahouse': return <SydneyOperaHouseSvg className="w-8 h-12" />;
      default: return <GenericSkylineSvg className="w-8 h-12" />;
    }
  };

  const isDaytime = (city: City) => {
    const hour = parseInt(formatTimeInZone(now, city.timezone, false, false).split(':')[0], 10);
    return hour >= 6 && hour < 19;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              World Clock
            </h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Local times around the world
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            // Quick rotate or append
            const extra = CITIES.find(c => !citiesList.some(item => item.id === c.id));
            if (extra) setCitiesList([...citiesList, extra]);
          }}
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-semibold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add cities</span>
        </button>
      </div>

      {/* Horizontal Strip of City Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {citiesList.map((city) => {
          const isSelected = city.id === selectedCityId;
          const timeString = formatTimeInZone(now, city.timezone, false, false);
          const dateString = new Intl.DateTimeFormat("en-US", {
            timeZone: city.timezone,
            weekday: "short",
            month: "short",
            day: "numeric"
          }).format(now);
          const isDay = isDaytime(city);

          return (
            <div
              key={city.id}
              onClick={() => onSelectCity && onSelectCity(city)}
              className={\`relative cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-4 border transition-all hover:shadow-md \${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
              }\`}
            >
              {/* Landmark Vector Art */}
              <div className="flex justify-center mb-3">
                {renderLandmark(city.landmarkId)}
              </div>

              {/* City & Country */}
              <div className="text-center">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {city.name}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                  {city.country}
                </p>

                {/* Big Digits */}
                <div className="text-xl font-extrabold text-slate-900 dark:text-white my-1 font-mono tracking-tight">
                  {timeString}
                </div>

                {/* Date */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {dateString}
                </p>

                {/* Day / Night Indicator */}
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {isDay ? (
                    <>
                      <Sun className="w-3 h-3 text-amber-500" />
                      <span>Day</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3 h-3 text-indigo-500" />
                      <span>Night</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
`, 'utf8');

console.log('HeroClockCard, WorldMapCard, and WorldClockStrip written successfully');
