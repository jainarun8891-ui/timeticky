"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { CITIES, City } from '@/lib/geo/cities';
import { WORLD_LAND_PATH, WORLD_BORDERS_PATH, WORLD_MAP_WIDTH, WORLD_MAP_HEIGHT } from '@/lib/geo/world-paths';
import { getSolarTerminatorSvgPath, isLocationInDaylight } from '@/lib/geo/solar-terminator';
import { formatTimeInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';
import { getCountryFlagEmoji } from '@/lib/geo/flags';

interface ExactWorldMapSvgProps {
  activeCity?: City;
  onSelectCity?: (city: City) => void;
  showNightShadow?: boolean;
  showConnections?: boolean;
  showGrid?: boolean;
  className?: string;
  isExpanded?: boolean;
}

// Global hubs for flight / sync connections
const MAJOR_HUBS = [
  { id: 'paris-fr', name: 'Paris', country: 'France', countryCode: 'FR', lat: 48.8566, lng: 2.3522, tz: 'Europe/Paris' },
  { id: 'london-gb', name: 'London', country: 'UK', countryCode: 'GB', lat: 51.5074, lng: -0.1278, tz: 'Europe/London' },
  { id: 'new-york-us', name: 'New York', country: 'USA', countryCode: 'US', lat: 40.7128, lng: -74.006, tz: 'America/New_York' },
  { id: 'tokyo-jp', name: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6895, lng: 139.6917, tz: 'Asia/Tokyo' },
  { id: 'dubai-ae', name: 'Dubai', country: 'UAE', countryCode: 'AE', lat: 25.2048, lng: 55.2708, tz: 'Asia/Dubai' },
  { id: 'new-delhi-in', name: 'New Delhi', country: 'India', countryCode: 'IN', lat: 28.6139, lng: 77.209, tz: 'Asia/Kolkata' },
  { id: 'sydney-au', name: 'Sydney', country: 'Australia', countryCode: 'AU', lat: -33.8688, lng: 151.2093, tz: 'Australia/Sydney' },
  { id: 'singapore-sg', name: 'Singapore', country: 'Singapore', countryCode: 'SG', lat: 1.3521, lng: 103.8198, tz: 'Asia/Singapore' },
  { id: 'saopaulo-br', name: 'São Paulo', country: 'Brazil', countryCode: 'BR', lat: -23.5505, lng: -46.6333, tz: 'America/Sao_Paulo' },
  { id: 'sanfrancisco-us', name: 'San Francisco', country: 'USA', countryCode: 'US', lat: 37.7749, lng: -122.4194, tz: 'America/Los_Angeles' },
  { id: 'cairo-eg', name: 'Cairo', country: 'Egypt', countryCode: 'EG', lat: 30.0444, lng: 31.2357, tz: 'Africa/Cairo' },
  { id: 'johannesburg-za', name: 'Johannesburg', country: 'South Africa', countryCode: 'ZA', lat: -26.2041, lng: 28.0473, tz: 'Africa/Johannesburg' },
];

export function ExactWorldMapSvg({
  activeCity = CITIES[0],
  onSelectCity,
  showNightShadow = true,
  showConnections = true,
  showGrid = true,
  className = "w-full h-full",
  isExpanded = false
}: ExactWorldMapSvgProps) {
  const [now, setNow] = useState<Date>(getSyncedDate());
  const [hoveredHub, setHoveredHub] = useState<typeof MAJOR_HUBS[0] | null>(null);
  const [hoveredCoords, setHoveredCoords] = useState<{ xPercent: number; yPercent: number } | null>(null);

  // Keep time synced
  useEffect(() => {
    const interval = setInterval(() => setNow(getSyncedDate()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Map projection coordinates: Equirectangular [960 x 480]
  const getCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * WORLD_MAP_WIDTH;
    const y = ((90 - lat) / 180) * WORLD_MAP_HEIGHT;
    return { x, y };
  };

  const activePos = getCoords(activeCity.lat, activeCity.lng);

  // Real-time solar terminator path
  const terminatorPath = useMemo(() => {
    return getSolarTerminatorSvgPath(now, WORLD_MAP_WIDTH, WORLD_MAP_HEIGHT);
  }, [now]);

  // Curved geodesic connection arcs from active city to global hubs
  const connectionArcs = useMemo(() => {
    return MAJOR_HUBS
      .filter(hub => Math.abs(hub.lat - activeCity.lat) > 2 || Math.abs(hub.lng - activeCity.lng) > 2)
      .map(hub => {
        const target = getCoords(hub.lat, hub.lng);
        const dx = target.x - activePos.x;
        const dy = target.y - activePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Control point for smooth arc curvature
        const midX = (activePos.x + target.x) / 2;
        const midY = (activePos.y + target.y) / 2;
        // Curve upward slightly
        const arcLift = Math.min(70, Math.max(25, dist * 0.18));
        const ctrlX = midX;
        const ctrlY = Math.max(20, midY - arcLift);

        return {
          id: hub.id,
          name: hub.name,
          d: `M ${activePos.x.toFixed(1)} ${activePos.y.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${target.x.toFixed(1)} ${target.y.toFixed(1)}`,
          target
        };
      });
  }, [activeCity.lat, activeCity.lng, activePos.x, activePos.y]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none group"
      onMouseLeave={() => {
        setHoveredHub(null);
        setHoveredCoords(null);
      }}
    >
      <svg
        viewBox="0 0 960 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Night solar shadow radial vignette */}
          <linearGradient id="nightGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#020617" stopOpacity="0.80" />
            <stop offset="50%" stopColor="#020617" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.80" />
          </linearGradient>

          {/* Holographic scanning beam */}
          <linearGradient id="radarSweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>

          {/* Active city beacon glow */}
          <radialGradient id="activeBeaconGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#2563eb" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>

          {/* Pin drop shadow glow */}
          <filter id="glowPin" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* 1. Subtle Ocean Background */}
        <rect width="960" height="480" className="fill-transparent" />

        {/* 2. Precision Coordinate Grid (Equator, Tropics, Prime Meridian, 24 Longitude Lines) */}
        {showGrid && (
          <g className="stroke-slate-300/40 dark:stroke-slate-700/50" strokeWidth="0.5">
            {/* Latitude Parallels */}
            <line x1="0" y1="64" x2="960" y2="64" />     {/* 66.5° N Arctic Circle */}
            <line x1="0" y1="178" x2="960" y2="178" strokeDasharray="4 4" /> {/* 23.5° N Tropic of Cancer */}
            <line x1="0" y1="240" x2="960" y2="240" strokeWidth="0.8" className="stroke-slate-400/60 dark:stroke-slate-600" /> {/* 0° Equator */}
            <line x1="0" y1="302" x2="960" y2="302" strokeDasharray="4 4" /> {/* 23.5° S Tropic of Capricorn */}
            <line x1="0" y1="416" x2="960" y2="416" />   {/* 66.5° S Antarctic Circle */}

            {/* 24 Longitude Meridians (15° intervals = 1 hour each) */}
            {Array.from({ length: 25 }).map((_, i) => {
              const x = i * 40;
              const isPrime = i === 12; // 0° Prime Meridian (Greenwich)
              return (
                <line
                  key={i}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="480"
                  strokeWidth={isPrime ? 1 : 0.6}
                  stroke={isPrime ? "#3b82f6" : undefined}
                  strokeDasharray={isPrime ? "none" : "3 4"}
                  opacity={isPrime ? 0.7 : 0.4}
                />
              );
            })}
          </g>
        )}

        {/* 3. Exact Geographic Continents (Natural Earth 110m High-Precision Land Path) */}
        <g
          className="fill-blue-100/70 dark:fill-slate-800 stroke-blue-200 dark:stroke-slate-700"
          strokeWidth="0.75"
          strokeLinejoin="round"
        >
          <path d={WORLD_LAND_PATH} />
        </g>

        {/* 4. Exact National Boundaries (Country Borders Mesh) */}
        <g
          fill="none"
          stroke="#23314d"
          strokeWidth="0.6"
          strokeLinejoin="round"
        >
          <path d={WORLD_BORDERS_PATH} />
        </g>

        {/* 5. Real-Time Astronomical Day / Night Solar Terminator Shadow */}
        {showNightShadow && (
          <g>
            <path
              d={terminatorPath}
              fill="url(#nightGradient)"
              className="pointer-events-none transition-all duration-1000"
            />
            {/* Subtle luminous boundary line */}
            <path
              d={terminatorPath}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.8"
              strokeOpacity="0.35"
              className="pointer-events-none"
            />
          </g>
        )}

        {/* 6. Night City Lights (Twinkling golden dots on night side) */}
        {showNightShadow && (
          <g className="pointer-events-none">
            {MAJOR_HUBS.map(hub => {
              const inDay = isLocationInDaylight(hub.lat, hub.lng, now);
              if (inDay) return null;
              const pos = getCoords(hub.lat, hub.lng);
              return (
                <g key={'night-' + hub.id} className="animate-twinkle">
                  <circle cx={pos.x} cy={pos.y} r="3" fill="#fbbf24" fillOpacity="0.75" filter="url(#glowPin)" />
                  <circle cx={pos.x} cy={pos.y} r="1.5" fill="#fef08a" />
                </g>
              );
            })}
          </g>
        )}

        {/* 7. Animated Great Circle Connection Arcs */}
        {showConnections && (
          <g className="pointer-events-none">
            {connectionArcs.map(arc => (
              <g key={arc.id}>
                {/* Static background route line */}
                <path
                  d={arc.d}
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="1.2"
                  strokeOpacity="0.25"
                  strokeLinecap="round"
                />
                {/* Dynamic animated flowing pulses */}
                <path
                  d={arc.d}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1.6"
                  strokeDasharray="5 10"
                  strokeOpacity="0.75"
                  strokeLinecap="round"
                  className="animate-dash-flow"
                />
              </g>
            ))}
          </g>
        )}

        {/* 8. Holographic Radar Sweep Scanning Beam */}
        <g className="pointer-events-none overflow-hidden">
          <rect
            x="-120"
            y="0"
            width="120"
            height="480"
            fill="url(#radarSweepGrad)"
            className="animate-radar-sweep opacity-70"
          />
        </g>

        {/* 9. Major World Hub City Pins */}
        {MAJOR_HUBS.map(hub => {
          const pos = getCoords(hub.lat, hub.lng);
          const isActive = hub.name.toLowerCase() === activeCity.name.toLowerCase() ||
            (Math.abs(hub.lat - activeCity.lat) < 0.5 && Math.abs(hub.lng - activeCity.lng) < 0.5);

          return (
            <g
              key={hub.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => {
                const found = CITIES.find(c => c.name.toLowerCase() === hub.name.toLowerCase() || c.id === hub.id) || {
                  id: hub.id,
                  name: hub.name,
                  country: hub.country,
                  countryCode: hub.countryCode,
                  timezone: hub.tz,
                  lat: hub.lat,
                  lng: hub.lng,
                  slug: hub.name.toLowerCase().replace(/\s+/g, '-')
                };
                onSelectCity && onSelectCity(found as City);
              }}
              onMouseEnter={() => {
                setHoveredHub(hub);
                setHoveredCoords({
                  xPercent: (pos.x / WORLD_MAP_WIDTH) * 100,
                  yPercent: (pos.y / WORLD_MAP_HEIGHT) * 100
                });
              }}
              className="cursor-pointer group/pin"
            >
              {/* Invisible large touch/hover area */}
              <circle cx="0" cy="0" r="16" fill="transparent" />

              {isActive ? (
                <>
                  {/* Multi-ring animated sonar wave */}
                  <circle cx="0" cy="0" r="16" stroke="#2563eb" fill="none" className="animate-sonar" />
                  <circle cx="0" cy="0" r="28" fill="url(#activeBeaconGlow)" className="animate-ping opacity-50" />
                  <circle cx="0" cy="0" r="10" fill="#3b82f6" fillOpacity="0.25" className="animate-pulse" />
                  {/* Active Core Bead */}
                  <circle cx="0" cy="0" r="5.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" filter="url(#glowPin)" />
                  <circle cx="0" cy="0" r="2" fill="#ffffff" />
                </>
              ) : (
                <>
                  {/* Inactive hub marker */}
                  <circle
                    cx="0"
                    cy="0"
                    r="4"
                    className="fill-slate-600 dark:fill-slate-300 group-hover/pin:fill-blue-500 transition-all duration-200"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {/* Hover ripple */}
                  <circle
                    cx="0"
                    cy="0"
                    r="9"
                    className="opacity-0 group-hover/pin:opacity-30 fill-blue-500 transition-opacity"
                  />
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* 10. High-Resolution Modern Floating HTML Tooltip Popup (Never scaled down by SVG!) */}
      {hoveredHub && hoveredCoords && (
        <div
          style={{
            left: `${hoveredCoords.xPercent}%`,
            top: `${hoveredCoords.yPercent}%`,
          }}
          className={`absolute z-50 pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95 ${
            hoveredCoords.yPercent > 35
              ? '-translate-y-full pb-3.5'
              : 'translate-y-3 pt-3.5'
          } ${
            hoveredCoords.xPercent > 75
              ? '-translate-x-[90%]'
              : hoveredCoords.xPercent < 25
              ? '-translate-x-[10%]'
              : '-translate-x-1/2'
          }`}
        >
          <div className="bg-slate-950/95 text-white border border-slate-700/90 shadow-2xl rounded-2xl p-3.5 min-w-[220px] backdrop-blur-xl ring-1 ring-white/15">
            {/* Header: Flag, City, Daylight/Night badge */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">{getCountryFlagEmoji(hoveredHub.countryCode)}</span>
                <span className="font-extrabold text-sm text-white tracking-tight">
                  {hoveredHub.name}
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                isLocationInDaylight(hoveredHub.lat, hoveredHub.lng, now)
                  ? 'bg-amber-950/70 text-amber-300 border border-amber-800/60'
                  : 'bg-indigo-950/70 text-indigo-300 border border-indigo-800/60'
              }`}>
                <span>{isLocationInDaylight(hoveredHub.lat, hoveredHub.lng, now) ? '☀️ Day' : '🌙 Night'}</span>
              </span>
            </div>

            {/* Time & Offset */}
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl font-mono font-black text-cyan-400 tracking-tight leading-none">
                {formatTimeInZone(now, hoveredHub.tz, false, true)}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-400">
                {getUtcOffsetString(now, hoveredHub.tz)}
              </span>
            </div>

            {/* Footer: Country & Action Hint */}
            <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="truncate max-w-[120px] font-medium">{hoveredHub.country}</span>
              <span className="text-blue-400 text-[10px] font-bold tracking-wide">Click to view</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
