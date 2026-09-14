"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { CITIES, City } from '@/lib/geo/cities';
import { WORLD_LAND_PATH, WORLD_BORDERS_PATH, WORLD_MAP_WIDTH, WORLD_MAP_HEIGHT } from '@/lib/geo/world-paths';
import { getSolarTerminatorSvgPath, isLocationInDaylight } from '@/lib/geo/solar-terminator';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { getTimeDetails } from '@/lib/time/engine';
import { getSolarTimes } from '@/lib/astronomy/calculator';
import { getSyncedDate } from '@/lib/time/sync';
import { getCountryFlagEmoji, formatCoordinates } from '@/lib/geo/flags';
import {
  Sun,
  Moon,
  GitBranch,
  Grid,
  Maximize2,
  Minimize2,
  Search,
  RotateCcw,
  Sparkles,
  Compass,
  ArrowRight,
  Clock,
  Sunrise,
  Sunset,
  Calendar,
  ExternalLink,
  Layers,
  MapPin
} from 'lucide-react';

const CONTINENTS = [
  { id: 'all', label: 'All Continents' },
  { id: 'americas', label: 'Americas' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia', label: 'Asia & Middle East' },
  { id: 'africa', label: 'Africa' },
  { id: 'oceania', label: 'Oceania' },
];

function getContinentForCity(c: City): string {
  if (['US', 'CA', 'MX', 'BR', 'AR', 'CL', 'PE', 'CO'].includes(c.countryCode)) return 'americas';
  if (['FR', 'GB', 'DE', 'IT', 'ES', 'NL', 'CH', 'SE', 'GR', 'IE', 'AT', 'PL'].includes(c.countryCode)) return 'europe';
  if (['JP', 'CN', 'KR', 'SG', 'HK', 'TH', 'ID', 'IN', 'AE', 'SA'].includes(c.countryCode)) return 'asia';
  if (['EG', 'ZA', 'KE', 'NG'].includes(c.countryCode)) return 'africa';
  if (['AU', 'NZ'].includes(c.countryCode)) return 'oceania';
  return 'americas';
}

export function WorldMapStudioClient() {
  const [baseDate, setBaseDate] = useState<Date>(getSyncedDate());
  const [offsetHours, setOffsetHours] = useState<number>(0);
  const [activeCity, setActiveCity] = useState<City>(CITIES[0]); // Paris default
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [hoverCoords, setHoverCoords] = useState<{ xPercent: number; yPercent: number } | null>(null);
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNightShadow, setShowNightShadow] = useState(true);
  const [showNightLights, setShowNightLights] = useState(true);
  const [showConnections, setShowConnections] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [use24Hour, setUse24Hour] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setBaseDate(getSyncedDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Effective simulated time (base date + slider offset)
  const effectiveDate = useMemo(() => {
    if (offsetHours === 0) return baseDate;
    return new Date(baseDate.getTime() + offsetHours * 3600 * 1000);
  }, [baseDate, offsetHours]);

  // Equirectangular projection: [960 x 480]
  const getCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * WORLD_MAP_WIDTH;
    const y = ((90 - lat) / 180) * WORLD_MAP_HEIGHT;
    return { x, y };
  };

  const activePos = getCoords(activeCity.lat, activeCity.lng);

  // Astronomical Solar Terminator path
  const terminatorPath = useMemo(() => {
    return getSolarTerminatorSvgPath(effectiveDate, WORLD_MAP_WIDTH, WORLD_MAP_HEIGHT);
  }, [effectiveDate]);

  // Geodesic connection arcs from active city to 8 key world hubs
  const connectionArcs = useMemo(() => {
    const keyHubs = CITIES.slice(0, 10).filter(c => c.id !== activeCity.id);
    return keyHubs.map(hub => {
      const target = getCoords(hub.lat, hub.lng);
      const dx = target.x - activePos.x;
      const dy = target.y - activePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const midX = (activePos.x + target.x) / 2;
      const midY = (activePos.y + target.y) / 2;
      const arcLift = Math.min(80, Math.max(30, dist * 0.18));
      const ctrlX = midX;
      const ctrlY = Math.max(20, midY - arcLift);

      return {
        id: hub.id,
        name: hub.name,
        d: `M ${activePos.x.toFixed(1)} ${activePos.y.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${target.x.toFixed(1)} ${target.y.toFixed(1)}`
      };
    });
  }, [activeCity.id, activePos.x, activePos.y]);

  // Filtered cities list
  const filteredCities = useMemo(() => {
    return CITIES.filter(c => {
      const matchCont = selectedContinent === 'all' || getContinentForCity(c) === selectedContinent;
      const matchQuery = !searchQuery.trim() ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.timezone.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCont && matchQuery;
    });
  }, [selectedContinent, searchQuery]);

  // Active city details
  const activeDetails = useMemo(() => {
    return getTimeDetails(activeCity.timezone, effectiveDate, !use24Hour);
  }, [activeCity.timezone, effectiveDate, use24Hour]);

  const activeSolar = useMemo(() => {
    return getSolarTimes(activeCity.lat, activeCity.lng, effectiveDate, activeDetails.utcOffsetMinutes);
  }, [activeCity.lat, activeCity.lng, effectiveDate, activeDetails.utcOffsetMinutes]);

  const activeIsDay = useMemo(() => {
    return isLocationInDaylight(activeCity.lat, activeCity.lng, effectiveDate);
  }, [activeCity.lat, activeCity.lng, effectiveDate]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFs);
    return () => document.removeEventListener('fullscreenchange', handleFs);
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-6">
      {/* 1. Master Map Command Center Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-4 sm:p-6 lg:p-7 space-y-5">
        
        {/* Top Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          {/* Left: Title & Live indicator */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Planetary World Clock & Solar Map
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>{offsetHours === 0 ? 'Live Real-Time' : `${offsetHours > 0 ? '+' : ''}${offsetHours}h Simulated`}</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                46 global cities with live astronomical solar terminator, day/night zones & great-circle sync arcs
              </p>
            </div>
          </div>

          {/* Right: Layer Toggles & Fullscreen */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-xs font-semibold">
            <button
              onClick={() => setShowNightShadow(!showNightShadow)}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                showNightShadow
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Toggle Day/Night Terminator"
            >
              {showNightShadow ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Day & Night</span>
            </button>

            <button
              onClick={() => setShowNightLights(!showNightLights)}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                showNightLights
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Toggle City Night Civilization Lights"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Night Lights</span>
            </button>

            <button
              onClick={() => setShowConnections(!showConnections)}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                showConnections
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Toggle Flight & Time Sync Arcs"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sync Arcs</span>
            </button>

            <button
              onClick={() => setShowGrid(!showGrid)}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                showGrid
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Toggle 15° Meridian Grid"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">15° Grid</span>
            </button>

            <button
              onClick={() => setUse24Hour(!use24Hour)}
              type="button"
              className="px-2.5 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-mono"
              title="Toggle 12h/24h Format"
            >
              {use24Hour ? '24H' : '12H'}
            </button>

            <button
              onClick={toggleFullscreen}
              type="button"
              className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 24-Hour Time Scrubber & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          {/* Time Scrubber */}
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                24h Solar Scrubber:
              </span>
            </div>

            <div className="flex-1 w-full flex items-center gap-3">
              <input
                type="range"
                min="-12"
                max="12"
                step="0.5"
                value={offsetHours}
                onChange={(e) => setOffsetHours(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 min-w-[50px] text-right">
                {offsetHours === 0 ? 'Live' : `${offsetHours > 0 ? '+' : ''}${offsetHours}h`}
              </span>
            </div>

            {offsetHours !== 0 && (
              <button
                onClick={() => setOffsetHours(0)}
                type="button"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Live</span>
              </button>
            )}
          </div>

          {/* City Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 46 global cities..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Continent Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {CONTINENTS.map(cont => {
            const count = cont.id === 'all'
              ? CITIES.length
              : CITIES.filter(c => getContinentForCity(c) === cont.id).length;
            const isSelected = selectedContinent === cont.id;

            return (
              <button
                key={cont.id}
                onClick={() => setSelectedContinent(cont.id)}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cont.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Expansive Cinematic SVG Map Canvas */}
        <div
          ref={mapCanvasRef}
          className="relative w-full aspect-[2/1] min-h-[360px] sm:min-h-[500px] lg:min-h-[620px] bg-[#030612] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center select-none"
          onMouseLeave={() => {
            setHoveredCity(null);
            setHoverCoords(null);
          }}
        >
          <svg
            viewBox="0 0 960 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Solar Night Gradient */}
              <linearGradient id="worldMapNightGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#020617" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0.85" />
              </linearGradient>

              {/* Holographic Radar Sweep */}
              <linearGradient id="worldMapRadarSweep" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.08" />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
              </linearGradient>

              {/* Active Beacon Glow */}
              <radialGradient id="worldMapActiveBeacon" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#2563eb" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </radialGradient>

              {/* Pin Shadow */}
              <filter id="worldMapPinShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Ocean Floor */}
            <rect width="960" height="480" fill="#030612" />

            {/* 15° Coordinate Meridians & Tropics */}
            {showGrid && (
              <g stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.6">
                <line x1="0" y1="64" x2="960" y2="64" />     {/* Arctic */}
                <line x1="0" y1="178" x2="960" y2="178" strokeDasharray="3 3" /> {/* Cancer */}
                <line x1="0" y1="240" x2="960" y2="240" stroke="#334155" strokeWidth="0.8" /> {/* Equator */}
                <line x1="0" y1="302" x2="960" y2="302" strokeDasharray="3 3" /> {/* Capricorn */}
                <line x1="0" y1="416" x2="960" y2="416" />   {/* Antarctic */}

                {/* 24 Hourly Meridians */}
                {Array.from({ length: 25 }).map((_, i) => {
                  const x = i * 40;
                  const isPrime = i === 12; // Greenwich Prime Meridian (0°)
                  return (
                    <line
                      key={i}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="480"
                      stroke={isPrime ? '#3b82f6' : '#1e293b'}
                      strokeWidth={isPrime ? 1 : 0.5}
                      strokeDasharray={isPrime ? 'none' : '2 4'}
                      strokeOpacity={isPrime ? 0.8 : 0.5}
                    />
                  );
                })}
              </g>
            )}

            {/* Continents Vector Geometry */}
            <g fill="#0f172a" stroke="#1e293b" strokeWidth="0.7" strokeLinejoin="round">
              <path d={WORLD_LAND_PATH} />
            </g>

            {/* Sovereign Boundaries Mesh */}
            <g fill="none" stroke="#172554" strokeWidth="0.5" strokeLinejoin="round" strokeOpacity="0.6">
              <path d={WORLD_BORDERS_PATH} />
            </g>

            {/* Astronomical Day / Night Solar Terminator */}
            {showNightShadow && (
              <g>
                <path
                  d={terminatorPath}
                  fill="url(#worldMapNightGrad)"
                  className="pointer-events-none transition-all duration-700"
                />
                {/* Luminous twilight line */}
                <path
                  d={terminatorPath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="0.9"
                  strokeOpacity="0.4"
                  className="pointer-events-none"
                />
              </g>
            )}

            {/* Twinkling Night Civilization Lights */}
            {showNightShadow && showNightLights && (
              <g className="pointer-events-none">
                {CITIES.map(city => {
                  const isDay = isLocationInDaylight(city.lat, city.lng, effectiveDate);
                  if (isDay) return null;
                  const pos = getCoords(city.lat, city.lng);
                  return (
                    <g key={'night-' + city.id} className="animate-twinkle">
                      <circle cx={pos.x} cy={pos.y} r="3.5" fill="#fbbf24" fillOpacity="0.75" />
                      <circle cx={pos.x} cy={pos.y} r="1.5" fill="#fef08a" />
                    </g>
                  );
                })}
              </g>
            )}

            {/* Great-Circle Flight & Time Sync Arcs */}
            {showConnections && (
              <g className="pointer-events-none">
                {connectionArcs.map(arc => (
                  <g key={arc.id}>
                    <path
                      d={arc.d}
                      fill="none"
                      stroke="#60a5fa"
                      strokeWidth="1.2"
                      strokeOpacity="0.25"
                      strokeLinecap="round"
                    />
                    <path
                      d={arc.d}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.6"
                      strokeDasharray="4 8"
                      strokeOpacity="0.75"
                      strokeLinecap="round"
                      className="animate-dash-flow"
                    />
                  </g>
                ))}
              </g>
            )}

            {/* Holographic Scanning Beam */}
            <g className="pointer-events-none overflow-hidden">
              <rect
                x="-140"
                y="0"
                width="140"
                height="480"
                fill="url(#worldMapRadarSweep)"
                className="animate-radar-sweep opacity-75"
              />
            </g>

            {/* 46 Global City Pins */}
            {filteredCities.map(city => {
              const pos = getCoords(city.lat, city.lng);
              const isActive = city.id === activeCity.id;
              const isDay = isLocationInDaylight(city.lat, city.lng, effectiveDate);

              return (
                <g
                  key={city.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setActiveCity(city)}
                  onMouseEnter={() => {
                    setHoveredCity(city);
                    setHoverCoords({
                      xPercent: (pos.x / WORLD_MAP_WIDTH) * 100,
                      yPercent: (pos.y / WORLD_MAP_HEIGHT) * 100
                    });
                  }}
                  className="cursor-pointer group/pin"
                >
                  {/* Invisible generous hover touch hit-area */}
                  <circle cx="0" cy="0" r="16" fill="transparent" />

                  {isActive ? (
                    <>
                      {/* Animated multi-ring sonar wave */}
                      <circle cx="0" cy="0" r="18" stroke="#3b82f6" fill="none" className="animate-sonar" />
                      <circle cx="0" cy="0" r="28" fill="url(#worldMapActiveBeacon)" className="animate-ping opacity-50" />
                      <circle cx="0" cy="0" r="11" fill="#3b82f6" fillOpacity="0.3" className="animate-pulse" />
                      {/* Active Center Jewel */}
                      <circle cx="0" cy="0" r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2" filter="url(#worldMapPinShadow)" />
                      <circle cx="0" cy="0" r="2" fill="#ffffff" />
                    </>
                  ) : (
                    <>
                      {/* Inactive city pin */}
                      <circle
                        cx="0"
                        cy="0"
                        r="4"
                        fill={isDay ? '#38bdf8' : '#f59e0b'}
                        stroke="#ffffff"
                        strokeWidth="1.2"
                        className="group-hover/pin:scale-150 transition-transform duration-150"
                        filter="url(#worldMapPinShadow)"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r="9"
                        fill={isDay ? '#38bdf8' : '#f59e0b'}
                        className="opacity-0 group-hover/pin:opacity-40 transition-opacity"
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* 3. High-Resolution Beautiful Crafted Floating Tooltip Card */}
          {hoveredCity && hoverCoords && (
            <div
              style={{
                left: `${hoverCoords.xPercent}%`,
                top: `${hoverCoords.yPercent}%`,
              }}
              className={`absolute z-50 pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95 ${
                hoverCoords.yPercent > 35
                  ? '-translate-y-full pb-4'
                  : 'translate-y-3 pt-4'
              } ${
                hoverCoords.xPercent > 72
                  ? '-translate-x-[92%]'
                  : hoverCoords.xPercent < 28
                  ? '-translate-x-[8%]'
                  : '-translate-x-1/2'
              }`}
            >
              <div className="bg-slate-950/95 text-white border border-slate-700/80 shadow-2xl rounded-3xl p-4 sm:p-5 min-w-[270px] max-w-[320px] backdrop-blur-2xl ring-1 ring-white/20">
                {/* Header: Flag, City, Country, Astronomical status */}
                <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl leading-none">{getCountryFlagEmoji(hoveredCity.countryCode)}</span>
                    <div>
                      <div className="font-black text-base text-white tracking-tight leading-tight">
                        {hoveredCity.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {hoveredCity.country}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
                    isLocationInDaylight(hoveredCity.lat, hoveredCity.lng, effectiveDate)
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                      : 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/80'
                  }`}>
                    {isLocationInDaylight(hoveredCity.lat, hoveredCity.lng, effectiveDate) ? (
                      <>
                        <Sun className="w-3 h-3 text-amber-400" />
                        <span>Daylight</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3 h-3 text-indigo-400" />
                        <span>Night</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Primary Digital Clock */}
                <div className="space-y-1">
                  <div className="text-3xl font-mono font-black text-cyan-400 tracking-tight leading-none">
                    {formatTimeInZone(effectiveDate, hoveredCity.timezone, false, true)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatDateInZone(effectiveDate, hoveredCity.timezone)}</span>
                  </div>
                </div>

                {/* Timezone and Offset Metadata */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Offset:</span>
                    <strong className="text-white">{getUtcOffsetString(effectiveDate, hoveredCity.timezone)}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">IANA Zone:</span>
                    <span className="text-blue-400 truncate max-w-[160px]">{hoveredCity.timezone}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Coordinates:</span>
                    <span className="text-slate-300">{formatCoordinates(hoveredCity.lat, hoveredCity.lng)}</span>
                  </div>
                </div>

                {/* Action Prompt */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-blue-400 font-bold">
                  <span>Click pin to inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. Active City Spotlight Drawer */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Active City Headline & Live Clock */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl flex-shrink-0">
              {getCountryFlagEmoji(activeCity.countryCode)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeCity.name}, {activeCity.country}
                </h3>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {activeDetails.abbreviation || activeDetails.timeZoneAbbr}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {activeCity.timezone} &bull; {activeDetails.utcOffsetString} &bull; {activeIsDay ? '☀️ Daytime' : '🌙 Nighttime'}
              </div>
            </div>
          </div>

          {/* Center: Solar Metrics Pill */}
          <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700 text-center">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
                <Sunrise className="w-3 h-3 text-amber-500" /> Sunrise
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block mt-0.5">
                {activeSolar.sunrise}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
                <Sunset className="w-3 h-3 text-orange-500" /> Sunset
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block mt-0.5">
                {activeSolar.sunset}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-center gap-1">
                <Sun className="w-3 h-3 text-yellow-500" /> Noon
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block mt-0.5">
                {activeSolar.solarNoon}
              </span>
            </div>
          </div>

          {/* Right: Direct Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              href={`/time/${activeCity.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <span>View City Clock</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={`/astronomy`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs border border-slate-200/80 dark:border-slate-700 transition-colors"
            >
              <span>Astronomy Lab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
