"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  ArrowLeftRight, 
  Sparkles, 
  MapPin, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Info,
  Calendar
} from 'lucide-react';
import { TIMEZONE_VS_PAIRS, TimezoneVsPair } from '@/lib/time/timezone-vs-data';
import { getTimeDetails } from '@/lib/time/engine';

interface TimezoneVsClientProps {
  currentPair?: string;
  locale?: 'en' | 'es';
}

export function TimezoneVsClient({
  currentPair = 'cst-vs-est',
  locale = 'en',
}: TimezoneVsClientProps) {
  const isEs = locale === 'es';
  const prefix = isEs ? '/es' : '';

  const [selectedSlug, setSelectedSlug] = useState<string>(currentPair);
  const [sliderHour, setSliderHour] = useState<number>(12); // noon

  // Active pair data
  const pairData: TimezoneVsPair = useMemo(() => {
    return TIMEZONE_VS_PAIRS[selectedSlug] || TIMEZONE_VS_PAIRS['cst-vs-est'];
  }, [selectedSlug]);

  // Live clocks for both zones
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeA = useMemo(() => getTimeDetails(pairData.ianaA, new Date(now)), [now, pairData.ianaA]);
  const timeB = useMemo(() => getTimeDetails(pairData.ianaB, new Date(now)), [now, pairData.ianaB]);

  // Format 12-hour string helper
  const formatTimeStr = (t: typeof timeA) => {
    const p = t.hours >= 12 ? 'PM' : 'AM';
    const h12 = t.hours % 12 === 0 ? 12 : t.hours % 12;
    return `${h12}:${String(t.minutes).padStart(2, '0')}:${String(t.seconds).padStart(2, '0')} ${p}`;
  };

  // Slider converted hour in Zone B
  const sliderConverted = useMemo(() => {
    const total = (sliderHour + pairData.offsetHours) % 24;
    const norm = total < 0 ? total + 24 : total;
    const h = Math.floor(norm);
    const m = Math.round((norm % 1) * 60);

    const format12 = (valH: number, valM: number) => {
      const p = valH >= 12 ? 'PM' : 'AM';
      const h12 = valH % 12 === 0 ? 12 : valH % 12;
      return `${h12}:${String(valM).padStart(2, '0')} ${p}`;
    };

    return {
      hourB: h,
      minB: m,
      strA: format12(sliderHour, 0),
      strB: format12(h, m),
    };
  }, [sliderHour, pairData.offsetHours]);

  const details = isEs ? pairData.detailsEs : pairData.detailsEn;
  const quickAnswer = isEs ? pairData.quickAnswerEs : pairData.quickAnswerEn;

  return (
    <div className="space-y-10">
      
      {/* Pair Switcher Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <ArrowLeftRight className="w-4 h-4 text-blue-500" />
          {isEs ? 'Comparar otra combinación:' : 'Switch Comparison Pair:'}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.values(TIMEZONE_VS_PAIRS).map((p) => (
            <Link
              key={p.slug}
              href={`${prefix}/timezone/vs/${p.slug}`}
              onClick={() => setSelectedSlug(p.slug)}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-colors ${
                selectedSlug === p.slug
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              {p.zoneA} vs {p.zoneB}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Comparison Dashboard Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
        
        {/* Live Side-by-Side Clocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Zone A Clock */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {pairData.zoneA}
              </span>
              <span>{pairData.nameA}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
              {formatTimeStr(timeA)}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {isEs ? 'Hora civil oficial activa' : 'Official civil atomic time'}
            </div>
          </div>

          {/* Zone B Clock */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {pairData.zoneB}
              </span>
              <span>{pairData.nameB}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
              {formatTimeStr(timeB)}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              {isEs ? 'Hora civil oficial activa' : 'Official civil atomic time'}
            </div>
          </div>
        </div>

        {/* Quick Answer Snippet Box (Position 0 Target) */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-950 text-white shadow-xl border border-blue-800/50 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
            <Sparkles className="w-4 h-4" />
            {isEs ? 'Respuesta Rápida y Directa' : 'Direct Answer in Plain English'}
          </div>
          <p className="text-base sm:text-lg text-slate-100 font-semibold leading-relaxed">
            {quickAnswer}
          </p>
          <div className="text-xs text-blue-300 font-mono pt-1">
            {isEs 
              ? `Diferencia fija: ${pairData.offsetHours === 0 ? 'Misma hora' : `${Math.abs(pairData.offsetHours)} hora(s) de desfase`}`
              : `Offset: ${pairData.offsetHours === 0 ? 'Identical civil time' : `${Math.abs(pairData.offsetHours)} hour(s) difference`}`}
          </div>
        </div>

        {/* Interactive 24-Hour Slider */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                {isEs ? 'Compara cualquier hora arrastrando la barra' : 'Interactive Time Difference Slider'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEs 
                  ? 'Mueve el control para ver qué hora es en una zona cuando en la otra es cierta hora.'
                  : 'Slide to instantly convert matching hours between both timezones.'}
              </p>
            </div>
            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 self-start sm:self-auto">
              {sliderConverted.strA} ({pairData.zoneA}) = {sliderConverted.strB} ({pairData.zoneB})
            </div>
          </div>

          <div>
            <input
              type="range"
              min="0"
              max="23"
              value={sliderHour}
              onChange={(e) => setSliderHour(parseInt(e.target.value, 10))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-2">
              <span>12 AM</span>
              <span>4 AM</span>
              <span>8 AM</span>
              <span>12 PM (Noon)</span>
              <span>4 PM</span>
              <span>8 PM</span>
              <span>11 PM</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">{pairData.zoneA}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 block">
                {sliderConverted.strA}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-400 block font-medium">{pairData.zoneB}</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1 block">
                {sliderConverted.strB}
              </span>
            </div>
          </div>
        </div>

        {/* Affected States & Regions Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {isEs ? `Regiones y Ciudades en ${pairData.zoneA}:` : `Key Cities & States in ${pairData.zoneA}:`}
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.regionsA.map((r, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              {isEs ? `Regiones y Ciudades en ${pairData.zoneB}:` : `Key Cities & States in ${pairData.zoneB}:`}
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.regionsB.map((r, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
