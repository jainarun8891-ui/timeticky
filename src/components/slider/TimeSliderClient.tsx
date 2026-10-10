"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CITIES, City } from '@/lib/geo/cities';
import { getCountryFlagEmoji } from '@/lib/geo/flags';
import {
  Clock,
  Plus,
  Trash2,
  Calendar,
  Share2,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Search,
  ExternalLink,
  Sliders,
  Users,
  Sun,
  Moon,
  ArrowRight,
  Info
} from 'lucide-react';

interface TimeSliderClientProps {
  locale?: 'en' | 'es';
}

export function TimeSliderClient({ locale = 'en' }: TimeSliderClientProps) {
  const isEs = locale === 'es';

  // 1. Selected Cities (Default: Delhi, New York, London, Tokyo, San Francisco)
  const defaultCities = useMemo(() => {
    const list: City[] = [];
    const findCity = (id: string) => CITIES.find(c => c.id === id);

    const delhi = findCity('delhi-in');
    const ny = findCity('new-york-us');
    const london = findCity('london-gb');
    const tokyo = findCity('tokyo-jp');
    const sf = findCity('san-francisco-us') || findCity('los-angeles-us');

    if (delhi) list.push(delhi);
    if (ny) list.push(ny);
    if (london) list.push(london);
    if (tokyo) list.push(tokyo);
    if (sf) list.push(sf);

    return list.length > 0 ? list : CITIES.slice(0, 4);
  }, []);

  const [cities, setCities] = useState<City[]>(defaultCities);
  const [selectedHour, setSelectedHour] = useState<number>(14); // 2:00 PM default
  const [use24Hour, setUse24Hour] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState<Date>(new Date());

  const searchRef = useRef<HTMLDivElement>(null);

  // Live real-time ticker
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync visitor's local timezone city to the top on hydration
  useEffect(() => {
    try {
      let resolvedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (resolvedTz === 'Asia/Calcutta') resolvedTz = 'Asia/Kolkata';
      if (resolvedTz) {
        const localMatch = CITIES.find(c => c.timezone === resolvedTz);
        if (localMatch && !cities.some(c => c.id === localMatch.id)) {
          setCities(prev => [localMatch, ...prev.filter(c => c.id !== localMatch.id)]);
        }
      }
    } catch {}
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter available cities for adding
  const searchResults = useMemo(() => {
    if (!citySearch.trim()) return CITIES.slice(0, 8);
    const q = citySearch.toLowerCase();
    return CITIES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.aliases.some(a => a.toLowerCase().includes(q))
    ).slice(0, 10);
  }, [citySearch]);

  const addCity = (city: City) => {
    if (!cities.some(c => c.id === city.id)) {
      setCities(prev => [...prev, city]);
    }
    setCitySearch('');
    setIsSearchOpen(false);
  };

  const removeCity = (cityId: string) => {
    if (cities.length <= 1) return;
    setCities(prev => prev.filter(c => c.id !== cityId));
  };

  // Base date set to current date at 00:00:00 UTC
  const baseMidnightUtc = useMemo(() => {
    const d = new Date(now);
    d.setUTCHours(0, 0, 0, 0);
    return d;
  }, [now]);

  // Construct target selected time
  const targetTime = useMemo(() => {
    return new Date(baseMidnightUtc.getTime() + selectedHour * 3600000);
  }, [baseMidnightUtc, selectedHour]);

  // Evaluate hour status: Work (9-17) / Shoulder (7-9 & 17-21) / Sleep (21-7)
  const getHourCategory = (hour24: number) => {
    if (hour24 >= 9 && hour24 < 17) return 'work';
    if ((hour24 >= 7 && hour24 < 9) || (hour24 >= 17 && hour24 < 21)) return 'shoulder';
    return 'sleep';
  };

  // Format hour label for display
  const formatHourLabel = (hour24: number) => {
    if (use24Hour) {
      return `${String(hour24).padStart(2, '0')}:00`;
    }
    const ampm = hour24 >= 12 ? 'pm' : 'am';
    const h12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    return `${h12}${ampm}`;
  };

  // Format meeting summary text for Slack/Email copy
  const meetingSummaryText = useMemo(() => {
    const lines = [
      `📅 Proposed Multi-City Meeting Time:`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    ];
    cities.forEach(c => {
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: c.timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: !use24Hour
      }).format(targetTime);
      lines.push(`${c.name} (${c.country}): ${timeStr}`);
    });
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`Generated via TimeNumbers (https://www.timenumbers.com/time-slider)`);
    return lines.join('\n');
  }, [cities, targetTime, use24Hour]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingSummaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Calendar Link generator
  const googleCalendarUrl = useMemo(() => {
    const startIso = targetTime.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const end = new Date(targetTime.getTime() + 60 * 60 * 1000); // 1 hour duration
    const endIso = end.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const title = encodeURIComponent('Cross-Border Team Meeting');
    const details = encodeURIComponent(meetingSummaryText);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}`;
  }, [targetTime, meetingSummaryText]);

  // Compute best overlap score for 24 hours
  const overlapScores = useMemo(() => {
    return Array.from({ length: 24 }).map((_, h) => {
      const testTime = new Date(baseMidnightUtc.getTime() + h * 3600000);
      let workCount = 0;
      let shoulderCount = 0;

      cities.forEach(c => {
        const hStr = new Intl.DateTimeFormat('en-US', { timeZone: c.timezone, hour: 'numeric', hour12: false }).format(testTime);
        const cityH = parseInt(hStr, 10);
        const cat = getHourCategory(cityH);
        if (cat === 'work') workCount++;
        else if (cat === 'shoulder') shoulderCount++;
      });

      return {
        hour: h,
        workCount,
        shoulderCount,
        score: workCount * 2 + shoulderCount
      };
    });
  }, [cities, baseMidnightUtc]);

  const bestHour = useMemo(() => {
    const sorted = [...overlapScores].sort((a, b) => b.score - a.score);
    return sorted[0];
  }, [overlapScores]);

  return (
    <div className="w-full space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {/* Left: Best Overlap Suggestion Pill */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                {isEs ? 'Mejor Ventana de Solapamiento' : 'Optimal Overlap Window'}
              </span>
              <button
                onClick={() => setSelectedHour(bestHour.hour)}
                className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 cursor-pointer transition-colors"
                title="Jump to optimal overlap"
              >
                {bestHour.workCount} {isEs ? 'ciudades en horario laboral' : 'cities in work hours'} ({formatHourLabel(bestHour.hour)} UTC)
              </button>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              {isEs ? 'Desliza el cursor o haz clic en cualquier celda para sincronizar' : 'Slide or click any hourly block to synchronize clocks'}
            </div>
          </div>
        </div>

        {/* Right: Controls (Add City & 12h/24h) */}
        <div className="flex items-center gap-3">
          {/* 12h / 24h Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold">
            <button
              onClick={() => setUse24Hour(false)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !use24Hour ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              12H
            </button>
            <button
              onClick={() => setUse24Hour(true)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                use24Hour ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs' : 'text-slate-500'
              }`}
            >
              24H
            </button>
          </div>

          {/* Add City Dropdown */}
          <div ref={searchRef} className="relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isEs ? 'Añadir Ciudad' : 'Add City'}</span>
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={citySearch}
                    onChange={e => setCitySearch(e.target.value)}
                    placeholder={isEs ? 'Buscar ciudad o país...' : 'Search city or country...'}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {searchResults.map(c => (
                    <button
                      key={c.id}
                      onClick={() => addCity(c)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span>{getCountryFlagEmoji(c.countryCode)}</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                          {c.name}
                        </span>
                        <span className="text-[11px] text-slate-400">({c.country})</span>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Interactive Scrubber Timeline Grid */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        
        {/* Top Header Hour Ruler */}
        <div className="p-4 sm:p-5 bg-slate-50/70 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-44 sm:w-64 shrink-0 font-bold text-xs text-slate-400 uppercase tracking-wider">
              {isEs ? 'Ciudades & Zona Horaria' : 'City & Timezone'}
            </div>
            <div className="flex-1 overflow-x-auto">
              <div className="grid grid-cols-24 gap-1 min-w-[700px]">
                {Array.from({ length: 24 }).map((_, h) => {
                  const isSelected = h === selectedHour;
                  return (
                    <button
                      key={h}
                      onClick={() => setSelectedHour(h)}
                      className={`h-9 rounded-lg flex flex-col items-center justify-center text-[10px] font-mono transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white font-extrabold shadow-md ring-2 ring-blue-400 scale-105'
                          : 'bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                      }`}
                      title={`Select ${h}:00 UTC`}
                    >
                      <span className="leading-none">{h}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* City Rows */}
        {cities.map((city, idx) => {
          // Format current live time in this city
          const liveTimeStr = new Intl.DateTimeFormat('en-US', {
            timeZone: city.timezone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: !use24Hour
          }).format(now);

          // Format target selected time in this city
          const selectedTimeStr = new Intl.DateTimeFormat('en-US', {
            timeZone: city.timezone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: !use24Hour
          }).format(targetTime);

          const selectedDateStr = new Intl.DateTimeFormat('en-US', {
            timeZone: city.timezone,
            weekday: 'short',
            day: 'numeric'
          }).format(targetTime);

          // Get offset
          const offsetFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: city.timezone,
            timeZoneName: 'shortOffset'
          });
          const offsetStr = offsetFormatter.formatToParts(now).find(p => p.type === 'timeZoneName')?.value || '';

          return (
            <div
              key={city.id}
              className={`p-4 sm:p-5 flex items-center gap-3 transition-colors ${
                idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/40 dark:bg-slate-950/20'
              }`}
            >
              {/* City Info Block */}
              <div className="w-44 sm:w-64 shrink-0 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getCountryFlagEmoji(city.countryCode)}</span>
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                      {city.name}
                    </span>
                  </div>
                  {cities.length > 1 && (
                    <button
                      onClick={() => removeCity(city.id)}
                      className="p-1 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove city"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {city.country} &bull; <span className="font-mono">{offsetStr}</span>
                  </span>
                  <span className="font-mono font-black text-blue-600 dark:text-blue-400">
                    {selectedTimeStr}
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  {isEs ? 'En vivo:' : 'Live clock:'} {liveTimeStr}
                </div>
              </div>

              {/* 24-Hour Tiles Track */}
              <div className="flex-1 overflow-x-auto">
                <div className="grid grid-cols-24 gap-1 min-w-[700px]">
                  {Array.from({ length: 24 }).map((_, h) => {
                    const testTime = new Date(baseMidnightUtc.getTime() + h * 3600000);
                    const hStr = new Intl.DateTimeFormat('en-US', {
                      timeZone: city.timezone,
                      hour: 'numeric',
                      hour12: false
                    }).format(testTime);
                    const cityH = parseInt(hStr, 10);
                    const cat = getHourCategory(cityH);
                    const isSelected = h === selectedHour;

                    return (
                      <button
                        key={h}
                        onClick={() => setSelectedHour(h)}
                        className={`h-14 rounded-xl flex flex-col items-center justify-center p-1 text-[11px] font-mono transition-all cursor-pointer relative ${
                          isSelected
                            ? 'ring-2 ring-blue-600 dark:ring-blue-400 scale-102 z-10 font-black shadow-md'
                            : 'hover:scale-102'
                        } ${
                          cat === 'work'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/80 font-bold'
                            : cat === 'shoulder'
                            ? 'bg-amber-100/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border border-amber-200/80 dark:border-amber-800/60 font-semibold'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60'
                        }`}
                        title={`${city.name}: ${formatHourLabel(cityH)}`}
                      >
                        <span className="leading-none text-xs">{cityH}</span>
                        <span className="text-[9px] text-slate-400 mt-1">
                          {cat === 'work' ? '💼' : cat === 'shoulder' ? '🌅' : '🌙'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Visual Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 inline-block"></span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isEs ? 'Horario Laboral Óptimo (9:00 – 17:00)' : 'Core Work Hours (9:00 AM – 5:00 PM)'}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 inline-block"></span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {isEs ? 'Horario Flexible (7:00-9:00 & 17:00-21:00)' : 'Fair Shoulder Hours (7–9 AM & 5–9 PM)'}
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 inline-block"></span>
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              {isEs ? 'Horario de Descanso / Noche (21:00 – 7:00)' : 'Sleeping / Off-Hours (9 PM – 7 AM)'}
            </span>
          </span>
        </div>
      </div>

      {/* 4. Selected Time Action Box (Slack Export & Google Calendar) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 dark:from-blue-950/30 dark:via-slate-900 dark:to-indigo-950/30 border border-blue-200/80 dark:border-blue-900/60 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold">
            <Calendar className="w-3 h-3" />
            <span>{isEs ? 'Franja Seleccionada para Reunión' : 'Selected Meeting Schedule'}</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {formatHourLabel(selectedHour)} UTC &bull; {cities[0]?.name}:{' '}
            {new Intl.DateTimeFormat('en-US', {
              timeZone: cities[0]?.timezone,
              hour: 'numeric',
              minute: '2-digit',
              hour12: !use24Hour
            }).format(targetTime)}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isEs
              ? 'Todos los horarios están calculados y listos para compartir con tu equipo.'
              : 'All cross-border clocks are calculated and ready to share with your global team.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isEs ? '¡Copiado!' : 'Copied to Clipboard!') : (isEs ? 'Copiar para Slack / Email' : 'Copy for Slack / Email')}</span>
          </button>

          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{isEs ? 'Añadir a Google Calendar' : 'Add to Google Calendar'}</span>
            <ExternalLink className="w-3 h-3 text-blue-200" />
          </a>
        </div>
      </div>
    </div>
  );
}
