"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Copy, Check, Share2, Maximize2, Sun, Moon, 
  ExternalLink, Search, Sparkles, Clock, Globe,
  Volume2, VolumeX, Compass, Eye, Image as ImageIcon,
  Sliders, Flame
} from 'lucide-react';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { syncWithServer, getSyncedDate } from '@/lib/time/sync';
import { getSunTimes } from '@/lib/astronomy/sun';
import { getMoonPhase, getCityClimate } from '@/lib/astronomy/climate-moon';
import { playEscapementTick, playMinuteChime } from '@/lib/audio/ticker';
import { SwissAnalogClock } from '@/components/art/SwissAnalogClock';
import { City, CITIES } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';

interface ModernHeroClockProps {
  currentCity: City;
  onSelectCity: (city: City) => void;
  onOpenSearch?: () => void;
}

const FEATURED_CITIES = [
  { id: 'tokyo-jp', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', img: '/images/tokyo_hero.jpg', vibe: 'Neon Twilight & Mount Fuji' },
  { id: 'new-york-us', name: 'New York', country: 'USA', flag: '🇺🇸', img: '/images/newyork_hero.jpg', vibe: 'Golden Hour Manhattan' },
  { id: 'paris-fr', name: 'Paris', country: 'France', flag: '🇫🇷', img: '/images/paris_hero.jpg', vibe: 'Seine River & Eiffel Tower' },
  { id: 'london-gb', name: 'London', country: 'UK', flag: '🇬🇧', img: '/images/paris_hero.jpg', vibe: 'Thames & Big Ben' },
  { id: 'dubai-ae', name: 'Dubai', country: 'UAE', flag: '🇦🇪', img: '/images/newyork_hero.jpg', vibe: 'Burj Khalifa Horizon' },
  { id: 'new-delhi-in', name: 'New Delhi', country: 'India', flag: '🇮🇳', img: '/images/tokyo_hero.jpg', vibe: 'India Gate Twilight' },
  { id: 'sydney-au', name: 'Sydney', country: 'Australia', flag: '🇦🇺', img: '/images/tokyo_hero.jpg', vibe: 'Harbour & Opera House' },
  { id: 'san-francisco-us', name: 'San Francisco', country: 'USA', flag: '🇺🇸', img: '/images/newyork_hero.jpg', vibe: 'Golden Gate Mist' }
];

export function ModernHeroClock({ currentCity, onSelectCity, onOpenSearch }: ModernHeroClockProps) {
  const router = useRouter();
  const [time, setTime] = useState<Date>(new Date());
  const [clockMode, setClockMode] = useState<'digital' | 'analog' | 'split'>('digital');
  const [is24Hour, setIs24Hour] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [bgIntensity, setBgIntensity] = useState<'vivid' | 'medium' | 'off'>('vivid');
  const [copied, setCopied] = useState(false);
  const [accuracy, setAccuracy] = useState('±0.01s');

  useEffect(() => {
    syncWithServer().then((state) => {
      if (state.isSynced) {
        setAccuracy(`±${(state.accuracyMs / 1000).toFixed(2)}s`);
      }
    });

    const interval = setInterval(() => {
      const now = getSyncedDate();
      setTime(now);

      if (soundEnabled) {
        const sec = now.getSeconds();
        if (sec === 0) {
          playMinuteChime();
        } else {
          playEscapementTick(sec % 2 === 0);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const timeStr = formatTimeInZone(time, currentCity.timezone, !is24Hour, showSeconds);
  const dateStr = formatDateInZone(time, currentCity.timezone);
  const utcOffsetStr = getUtcOffsetString(time, currentCity.timezone);

  const sunTimes = getSunTimes(time, currentCity.lat, currentCity.lng, currentCity.timezone);
  const dayProgress = Math.max(0, Math.min(100, sunTimes.dayProgressPercent));
  const isDay = sunTimes.sunElevationAngle > -0.833;

  const moon = getMoonPhase(time);
  const climate = getCityClimate(currentCity.name, isDay);

  const startOfYear = new Date(time.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((time.getTime() - startOfYear.getTime()) / 86400000);
  const isLeap = (time.getFullYear() % 4 === 0 && time.getFullYear() % 100 !== 0) || (time.getFullYear() % 400 === 0);
  const totalDays = isLeap ? 366 : 365;

  const cityMeta = FEATURED_CITIES.find(c => c.name.toLowerCase() === currentCity.name.toLowerCase()) || FEATURED_CITIES[0];
  const bgImage = cityMeta.img;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${currentCity.name}: ${timeStr} (${utcOffsetStr})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Current Time in ${currentCity.name}`,
        text: `The exact time in ${currentCity.name} is ${timeStr} (${utcOffsetStr})`,
        url: window.location.href
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const getFlag = (code: string) => {
    switch (code) {
      case 'FR': return '🇫🇷';
      case 'US': return '🇺🇸';
      case 'GB': return '🇬🇧';
      case 'JP': return '🇯🇵';
      case 'AE': return '🇦🇪';
      case 'IN': return '🇮🇳';
      case 'AU': return '🇦🇺';
      case 'SG': return '🇸🇬';
      case 'BR': return '🇧🇷';
      case 'EG': return '🇪🇬';
      default: return '🌐';
    }
  };

  return (
    <section className="w-full relative overflow-hidden rounded-[32px] border border-slate-200 dark:border-slate-700 p-6 sm:p-10 shadow-2xl shadow-black/80 bg-[#080b16] transition-all duration-300">
      {/* VIVID Cinematic Landscape Background */}
      {bgIntensity !== 'off' && (
        <>
          <div
            className={`absolute inset-0 z-0 bg-cover bg-center pointer-events-none transition-all duration-700 ${
              bgIntensity === 'vivid'
                ? 'opacity-85 filter saturate-140 contrast-110 scale-102'
                : 'opacity-40 filter saturate-100'
            }`}
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          {/* Dramatic Vignette to keep text readable while keeping image vivid and dramatic */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#070913] via-[#070913]/55 to-[#070913]/70 pointer-events-none" />
          <div className="absolute inset-0 z-0 bg-radial from-transparent via-[#070913]/30 to-[#070913]/80 pointer-events-none" />
        </>
      )}

      {/* Top Quick City Switcher Ribbon */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-200/90 dark:border-slate-800 no-scrollbar">
        {FEATURED_CITIES.map((c) => {
          const isSelected = c.id === currentCity.id || c.name.toLowerCase() === currentCity.name.toLowerCase();
          return (
            <button
              key={c.id}
              onClick={() => {
                const found = CITIES.find(item => item.id === c.id || item.name.toLowerCase() === c.name.toLowerCase());
                if (found) onSelectCity(found);
              }}
              type="button"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all duration-150 backdrop-blur-md ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-102 font-bold ring-1 ring-white/30'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-zinc-300 hover:bg-slate-100 dark:bg-slate-800 hover:text-white border border-slate-200/90 dark:border-slate-800'
              }`}
            >
              <span className="leading-none">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          );
        })}

        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 text-zinc-300 hover:text-white hover:border-white/20 transition-colors backdrop-blur-md"
          >
            <Search className="w-3 h-3 text-blue-400" />
            <span>Search 500+ cities...</span>
          </button>
        )}
      </div>

      {/* Main Studio Body with Glassmorphic Cockpit HUD */}
      <div className="relative z-10 my-2">
        {/* Top Badges Row: Location, Weather, Moon Phase, Mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-3xl shadow-md backdrop-blur-md">
              {getFlag(currentCity.countryCode)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {currentCity.name}, {currentCity.country}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono text-xs font-bold">
                  {utcOffsetStr}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mt-0.5">
                <span>{currentCity.timezone}</span>
                <span>•</span>
                <span className="text-amber-400 font-sans">{cityMeta.vibe}</span>
              </div>
            </div>
          </div>

          {/* Telemetry & Display Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Live Weather HUD */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-zinc-200 backdrop-blur-md shadow-xs">
              <span className="text-sm leading-none">{climate.icon}</span>
              <span className="font-bold text-white">{climate.temperatureC}°C</span>
              <span className="text-zinc-400">({climate.temperatureF}°F)</span>
              <span className="hidden sm:inline text-zinc-400">• {climate.condition}</span>
            </div>

            {/* Moon Phase HUD */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-zinc-200 backdrop-blur-md shadow-xs">
              <span className="text-sm leading-none">{moon.emoji}</span>
              <span className="text-zinc-300">{moon.phaseName}</span>
              <span className="text-cyan-400 font-mono font-bold">{moon.illumination}%</span>
            </div>

            {/* Clock Mode Switcher */}
            <div className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700 backdrop-blur-md">
              {(['digital', 'split', 'analog'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setClockMode(m)}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                    clockMode === m
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Central Cockpit HUD for Time Display */}
        <div className="bg-slate-50 dark:bg-slate-800/60 backdrop-blur-2xl border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 my-4 ring-1 ring-white/10">
          {clockMode === 'digital' && (
            <div className="flex flex-col items-center text-center py-2 sm:py-6">
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[116px] font-black tracking-tight text-white font-mono leading-none select-all drop-shadow-2xl">
                {timeStr}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-300 font-medium">
                <span className="font-bold text-white">{dateStr}</span>
                <span className="text-white/30">•</span>
                <span className="text-zinc-300">Day {dayOfYear} of {totalDays}</span>
                <span className="text-white/30">•</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>NTP Atomic Clock Synced ({accuracy})</span>
                </span>
              </div>
            </div>
          )}

          {clockMode === 'analog' && (
            <div className="flex flex-col items-center justify-center py-4">
              <SwissAnalogClock time={time} timezone={currentCity.timezone} size={280} />
              <div className="mt-4 font-mono text-3xl font-black text-white tracking-tight">
                {timeStr}
              </div>
              <div className="text-xs text-zinc-400 font-semibold mt-1">
                {dateStr} • {utcOffsetStr}
              </div>
            </div>
          )}

          {clockMode === 'split' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-2">
              <div className="md:col-span-5 flex justify-center">
                <SwissAnalogClock time={time} timezone={currentCity.timezone} size={240} />
              </div>
              <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-black font-mono tracking-tight text-white leading-none drop-shadow-lg">
                  {timeStr}
                </div>
                <div className="text-base font-bold text-zinc-200 mt-3">
                  {dateStr}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-mono text-zinc-400">
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                    {utcOffsetStr}
                  </span>
                  <span>Day {dayOfYear} of {totalDays}</span>
                  <span>•</span>
                  <span className="text-emerald-400">Synced {accuracy}</span>
                </div>
              </div>
            </div>
          )}

          {/* Celestial Daylight Horizon Bar */}
          <div className="w-full max-w-3xl mx-auto mt-6 pt-6 border-t border-slate-200/90 dark:border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-2">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Sun className="w-3.5 h-3.5" />
                <span>Sunrise {sunTimes.sunrise}</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-zinc-200">
                <span>Solar Noon {sunTimes.solarNoon}</span>
                <span className="text-cyan-400">({sunTimes.dayLengthFormatted} daylight)</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400">
                <Moon className="w-3.5 h-3.5" />
                <span>Sunset {sunTimes.sunset}</span>
              </div>
            </div>

            {/* Daylight Gradient Progress Bar */}
            <div className="relative h-3 w-full bg-white/10 rounded-full overflow-visible p-0.5 border border-slate-200/90 dark:border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 rounded-full transition-all duration-1000 shadow-lg shadow-amber-500/40"
                style={{ width: `${dayProgress}%` }}
              />
              {/* Glowing Sun Pin */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 flex items-center justify-center"
                style={{ left: `${dayProgress}%` }}
              >
                <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-white shadow-xl shadow-amber-500/80 flex items-center justify-center animate-pulse">
                  <Sun className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 text-[10px] text-zinc-400 font-medium">
              <span>Dawn {sunTimes.civilDawn}</span>
              <span className="text-amber-300/90 font-semibold">{isDay ? '☀️ Sun above horizon' : '🌙 Night (Sun below horizon)'}</span>
              <span>Dusk {sunTimes.civilDusk}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Utility Toolbar */}
      <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/90 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Left: 12h/24h, Seconds, Sound, Backdrop Intensity */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 12h / 24h */}
          <div className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 backdrop-blur-md">
            <button
              onClick={() => setIs24Hour(true)}
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                is24Hour
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              24h
            </button>
            <button
              onClick={() => setIs24Hour(false)}
              type="button"
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                !is24Hour
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              12h
            </button>
          </div>

          {/* Seconds Toggle */}
          <button
            onClick={() => setShowSeconds(!showSeconds)}
            type="button"
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border backdrop-blur-md ${
              showSeconds
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-zinc-400'
            }`}
          >
            {showSeconds ? "Seconds ON" : "Seconds OFF"}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border backdrop-blur-md ${
              soundEnabled
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-zinc-400 hover:text-white'
            }`}
            title={soundEnabled ? "Mute Clock Ticker" : "Enable Mechanical Escapement Sound"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? "Sound ON" : "Muted"}</span>
          </button>

          {/* Backdrop Intensity Switcher */}
          <button
            onClick={() => {
              if (bgIntensity === 'vivid') setBgIntensity('medium');
              else if (bgIntensity === 'medium') setBgIntensity('off');
              else setBgIntensity('vivid');
            }}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-zinc-300 hover:text-white transition-colors backdrop-blur-md"
            title="Cycle Background Wallpaper Intensity"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Wallpaper: {bgIntensity}</span>
          </button>
        </div>

        {/* Right: Copy, Share, Fullscreen, City Page */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-slate-200 dark:border-slate-700 backdrop-blur-md transition-all hover:scale-102"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copied ? "Copied!" : "Copy time"}</span>
          </button>

          <button
            onClick={handleShare}
            type="button"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 border border-slate-200/90 dark:border-slate-800 transition-colors backdrop-blur-md"
            title="Share time"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => router.push(`/clock?tz=${encodeURIComponent(currentCity.timezone)}`)}
            type="button"
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 border border-slate-200/90 dark:border-slate-800 transition-colors backdrop-blur-md"
            title="Open Fullscreen Studio"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => router.push(`/${getCityRootSlug(currentCity)}`)}
            type="button"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:underline ml-1"
          >
            <span>City Page</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  );
}
