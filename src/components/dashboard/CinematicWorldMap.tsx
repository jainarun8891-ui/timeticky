"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sun, Moon, GitBranch, Grid, Maximize2, Radio, 
  ExternalLink, Compass, X, Sparkles 
} from 'lucide-react';
import { ExactWorldMapSvg } from '../art/ExactWorldMapSvg';
import { City, CITIES } from '@/lib/geo/cities';
import { getSunTimes } from '@/lib/astronomy/sun';

interface CinematicWorldMapProps {
  currentCity: City;
  onSelectCity: (city: City) => void;
}

export function CinematicWorldMap({ currentCity, onSelectCity }: CinematicWorldMapProps) {
  const [showNightShadow, setShowNightShadow] = useState(true);
  const [showConnections, setShowConnections] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sun = getSunTimes(new Date(), currentCity.lat, currentCity.lng, currentCity.timezone);

  return (
    <section className="w-full bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
      {/* Map Section Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200/90 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-md">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-tight">
                Global Time & Astronomical Map
              </h2>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Natural Earth vector geography with live astronomical solar terminator, twinkling night lights, and flight sync arcs
            </p>
          </div>
        </div>

        {/* Feature Toggles Toolbar */}
        <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/60 p-1 rounded-2xl border border-slate-200/90 dark:border-slate-800 backdrop-blur-md">
          <button
            onClick={() => setShowNightShadow(!showNightShadow)}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              showNightShadow
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Toggle Solar Terminator"
          >
            {showNightShadow ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Day & Night</span>
          </button>

          <button
            onClick={() => setShowConnections(!showConnections)}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              showConnections
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Toggle Flight / Sync Arcs"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sync Arcs</span>
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              showGrid
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
            title="Toggle Timezone Grid"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">15° Grid</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Expand Fullscreen Canvas"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expansive World Map SVG Canvas in Deep Space Ocean */}
      <div className="w-full flex items-center justify-center min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] overflow-hidden rounded-2xl bg-[#030612] border border-slate-200/90 dark:border-slate-800 shadow-2xl p-2 sm:p-4">
        <ExactWorldMapSvg
          activeCity={currentCity}
          onSelectCity={onSelectCity}
          showNightShadow={showNightShadow}
          showConnections={showConnections}
          showGrid={showGrid}
          className="w-full h-full max-h-[560px]"
        />
      </div>

      {/* Map Footer Metadata & Quick Teleport */}
      <div className="mt-4 pt-4 border-t border-slate-200/90 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-zinc-400">
          <span className="inline-flex items-center gap-1.5 font-mono text-cyan-400">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>{Math.abs(currentCity.lat).toFixed(2)}°{currentCity.lat >= 0 ? 'N' : 'S'}, {Math.abs(currentCity.lng).toFixed(2)}°{currentCity.lng >= 0 ? 'E' : 'W'}</span>
          </span>
          <span className="text-white/20">•</span>
          <span>Sunrise: <strong className="text-amber-400 font-mono">{sun.sunrise}</strong></span>
          <span className="text-white/20">•</span>
          <span>Sunset: <strong className="text-indigo-400 font-mono">{sun.sunset}</strong></span>
        </div>

        <Link
          href={`/time/${currentCity.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline"
        >
          <span>Detailed Astronomical Data</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Fullscreen Map Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-7xl bg-[#080b16] rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/90 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h3 className="text-base font-black text-white">
                  Fullscreen Interactive World Time Map
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 flex items-center justify-center bg-[#030612] overflow-hidden min-h-[500px]">
              <ExactWorldMapSvg
                activeCity={currentCity}
                onSelectCity={(c) => {
                  onSelectCity(c);
                  setIsModalOpen(false);
                }}
                showNightShadow={showNightShadow}
                showConnections={showConnections}
                showGrid={showGrid}
                className="w-full h-full max-h-[75vh]"
                isExpanded={true}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
