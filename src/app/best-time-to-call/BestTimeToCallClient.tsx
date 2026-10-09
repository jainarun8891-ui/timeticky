"use client";

import React, { useState, useMemo } from 'react';
import { 
  PhoneCall, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  Sun, 
  Moon, 
  PhoneOff,
  Copy,
  Check,
  Calendar
} from 'lucide-react';
import { CITIES } from '@/lib/geo/cities';
import { getTimeDetails } from '@/lib/time/engine';

interface BestTimeToCallClientProps {
  h1Title?: string;
  locale?: 'en' | 'es';
}

const PRESETS = [
  { label: 'New York ↔ London', cityA: 'new-york-us', cityB: 'london-gb' },
  { label: 'San Francisco ↔ New York', cityA: 'san-francisco-us', cityB: 'new-york-us' },
  { label: 'London ↔ Sydney', cityA: 'london-gb', cityB: 'sydney-au' },
  { label: 'New York ↔ New Delhi', cityA: 'new-york-us', cityB: 'delhi-in' },
  { label: 'Los Angeles ↔ Tokyo', cityA: 'los-angeles-us', cityB: 'tokyo-jp' },
  { label: 'Madrid ↔ Mexico City', cityA: 'madrid-es', cityB: 'mexico-city-mx' },
  { label: 'Madrid ↔ Buenos Aires', cityA: 'madrid-es', cityB: 'buenos-aires-ar' },
];

export function BestTimeToCallClient({
  h1Title,
  locale = 'en',
}: BestTimeToCallClientProps) {
  const isEs = locale === 'es';

  const [cityAId, setCityAId] = useState<string>('new-york-us');
  const [cityBId, setCityBId] = useState<string>('london-gb');
  const [copied, setCopied] = useState(false);

  const cityA = useMemo(() => CITIES.find(c => c.id === cityAId) || CITIES[1], [cityAId]);
  const cityB = useMemo(() => CITIES.find(c => c.id === cityBId) || CITIES[2], [cityBId]);

  // Generate 24 hours comparison
  const hoursGrid = useMemo(() => {
    const baseDate = new Date();
    // Get offsets by formatting UTC date in both timezones
    const nowUtc = Date.now();
    const timeA = getTimeDetails(cityA.timezone, new Date(nowUtc));
    const timeB = getTimeDetails(cityB.timezone, new Date(nowUtc));

    // Difference in hours
    const diffHours = (timeB.hours + timeB.minutes / 60) - (timeA.hours + timeA.minutes / 60);

    const rows = [];
    for (let hA = 0; hA < 24; hA++) {
      let hB = (hA + diffHours) % 24;
      if (hB < 0) hB += 24;

      const hourBInt = Math.floor(hB);
      const minB = Math.round((hB % 1) * 60);

      // Status classification
      // Waking hours: 08:00 to 21:00
      // Business hours: 09:00 to 17:00
      const isA_Waking = hA >= 8 && hA < 21;
      const isB_Waking = hourBInt >= 8 && hourBInt < 21;

      const isA_Business = hA >= 9 && hA < 17;
      const isB_Business = hourBInt >= 9 && hourBInt < 17;

      let status: 'golden' | 'acceptable' | 'sleep' = 'sleep';
      let statusLabel = isEs ? 'No Llamar (Durmiendo)' : 'Do Not Call (Sleeping)';

      if (isA_Business && isB_Business) {
        status = 'golden';
        statusLabel = isEs ? 'Horario Laboral Óptimo' : 'Golden Business Window';
      } else if (isA_Waking && isB_Waking) {
        status = 'golden';
        statusLabel = isEs ? 'Horario Despiertos Óptimo' : 'Golden Waking Window';
      } else if (isA_Waking && (hourBInt >= 7 && hourBInt < 22)) {
        status = 'acceptable';
        statusLabel = isEs ? 'Horario Límite (Mañana/Noche)' : 'Shoulder Hours (Borderline)';
      }

      const format12 = (h: number, m: number = 0) => {
        const p = h >= 12 ? 'PM' : 'AM';
        const dH = h % 12 === 0 ? 12 : h % 12;
        return `${dH}:${String(m).padStart(2, '0')} ${p}`;
      };

      rows.push({
        hourA: hA,
        hourB: hourBInt,
        timeAStr: format12(hA, 0),
        timeBStr: format12(hourBInt, minB),
        status,
        statusLabel,
      });
    }

    return { rows, diffHours, timeA, timeB };
  }, [cityA, cityB, isEs]);

  // Find continuous golden hours window
  const goldenWindows = useMemo(() => {
    const goldenRows = hoursGrid.rows.filter(r => r.status === 'golden');
    if (goldenRows.length === 0) return null;

    const startRow = goldenRows[0];
    const endRow = goldenRows[goldenRows.length - 1];

    return {
      startA: startRow.timeAStr,
      endA: endRow.timeAStr,
      startB: startRow.timeBStr,
      endB: endRow.timeBStr,
      durationHours: goldenRows.length
    };
  }, [hoursGrid]);

  const handleCopy = () => {
    if (!goldenWindows) return;
    const text = isEs
      ? `Mejor hora para llamar a ${cityB.name} desde ${cityA.name}: entre las ${goldenWindows.startA} y las ${goldenWindows.endA} (hora de ${cityA.name}), que corresponde a las ${goldenWindows.startB} y las ${goldenWindows.endB} (hora de ${cityB.name}).`
      : `Best time to call ${cityB.name} from ${cityA.name}: between ${goldenWindows.startA} and ${goldenWindows.endA} (${cityA.name} time), corresponding to ${goldenWindows.startB} to ${goldenWindows.endB} (${cityB.name} time).`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800">
          <PhoneCall className="w-3.5 h-3.5" />
          {isEs ? 'Ventana Óptima de Llamadas Internacionales' : 'International Calling Window Calculator'}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {h1Title || (isEs ? 'Mejor Hora para Llamar entre Ciudades y Países' : 'Best Time to Call Between Cities & Countries')}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {isEs 
            ? 'Encuentra las horas en las que ambas partes están despiertas y disponibles. Evita despertar a clientes, amigos o familiares a medianoche.'
            : 'Find the sweet spot when both people are awake and during normal daytime hours. Never accidentally wake someone up in the middle of the night.'}
        </p>
      </div>

      {/* Main Selector & Results Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
        
        {/* City Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {isEs ? '1. Tu Ubicación (Desde donde llamas)' : '1. Your Location (Where You Call From)'}
            </label>
            <select
              value={cityAId}
              onChange={(e) => setCityAId(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
              {isEs ? '2. Su Ubicación (A quien llamas)' : '2. Their Location (Who You Are Calling)'}
            </label>
            <select
              value={cityBId}
              onChange={(e) => setCityBId(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-400 font-medium">
            {isEs ? 'Rutas Frecuentes:' : 'Popular Call Corridors:'}
          </span>
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => { setCityAId(p.cityA); setCityBId(p.cityB); }}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                cityAId === p.cityA && cityBId === p.cityB
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Recommendation Spotlight Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              {isEs ? 'Recomendación en Lenguaje Claro' : 'Plain English Recommendation'}
            </div>
            {goldenWindows && (
              <button
                onClick={handleCopy}
                className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar Recomendación' : 'Copy Recommendation')}
              </button>
            )}
          </div>

          {goldenWindows ? (
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                {isEs ? (
                  <>
                    La mejor hora para llamar a <strong className="text-white">{cityB.name}</strong> desde <strong className="text-white">{cityA.name}</strong> es entre las <span className="text-emerald-400 font-bold font-mono">{goldenWindows.startA}</span> y las <span className="text-emerald-400 font-bold font-mono">{goldenWindows.endA}</span> (hora local en {cityA.name}).
                  </>
                ) : (
                  <>
                    The best time to call <strong className="text-white">{cityB.name}</strong> from <strong className="text-white">{cityA.name}</strong> is between <span className="text-emerald-400 font-bold font-mono">{goldenWindows.startA}</span> and <span className="text-emerald-400 font-bold font-mono">{goldenWindows.endA}</span> ({cityA.name} local time).
                  </>
                )}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold">
                  {isEs ? `Equivale a ${goldenWindows.startB} – ${goldenWindows.endB} en ${cityB.name}` : `Matches ${goldenWindows.startB} – ${goldenWindows.endB} in ${cityB.name}`}
                </span>
                <span className="text-slate-400">
                  {isEs ? `Ventana de ${goldenWindows.durationHours} horas de solapamiento ideal` : `${goldenWindows.durationHours} hours of golden overlap window`}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800 text-amber-200 text-xs sm:text-sm">
              {isEs 
                ? 'No hay solapamiento de horario laboral estándar directo debido a la gran diferencia horaria. Se recomienda coordinar llamadas durante las horas límite de mañana o noche.'
                : 'Due to an extreme timezone differential, there is no direct overlap during standard 9-to-5 working hours. Early morning or evening shoulder hours are required.'}
            </div>
          )}
        </div>

        {/* 24-Hour Calling Matrix Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              {isEs ? 'Guía Hora por Hora (Línea de Tiempo de 24 Horas)' : 'Hour-by-Hour Calling Matrix (24-Hour Timeline)'}
            </h2>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                {isEs ? 'Óptimo' : 'Golden'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                {isEs ? 'Límite' : 'Shoulder'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                {isEs ? 'Noche' : 'Sleeping'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {hoursGrid.rows.map((row) => {
              const isGolden = row.status === 'golden';
              const isAcceptable = row.status === 'acceptable';

              return (
                <div
                  key={row.hourA}
                  className={`p-3 rounded-2xl border transition-all space-y-1.5 ${
                    isGolden
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-300/80 dark:border-emerald-800'
                      : isAcceptable
                      ? 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-300/80 dark:border-amber-800'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                      {row.timeAStr} <span className="text-[10px] text-slate-400 font-sans">({cityA.name})</span>
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                      {row.timeBStr} <span className="text-[10px] text-slate-400 font-sans">({cityB.name})</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span className={`font-semibold ${
                      isGolden ? 'text-emerald-700 dark:text-emerald-400' : isAcceptable ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400'
                    }`}>
                      {row.statusLabel}
                    </span>
                    {isGolden ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : isAcceptable ? (
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Etiquette & Layman Advice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'La Regla de las 8 a 9' : 'The 8-to-9 Calling Rule'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'Como norma general de cortesía, nunca llames antes de las 8:00 AM ni después de las 9:00 PM de la hora local del receptor, salvo emergencias.'
              : 'As a golden etiquette rule, never initiate an unscheduled call before 8:00 AM or after 9:00 PM in the other person&apos;s local timezone.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'Cuidado con el Fin de Semana' : 'Watch Out for Day Crossovers'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'Si llamas desde América a Asia u Oceanía un viernes por la tarde, allí ya puede ser sábado por la mañana. Siempre confirma el día de la semana.'
              : 'When calling across the International Date Line (like US to Australia), your Friday afternoon is already their Saturday morning! Check the date before calling.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'Enviar Mensaje Previo' : 'Send a Quick Heads-Up First'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'Para llamadas internacionales, un breve mensaje por WhatsApp, Slack o correo proponiendo la hora evita llamadas perdidas e interrupciones.'
              : 'For international calls, sending a quick Slack message or text to propose a specific time avoids interruptions and respects work-life balance.'}
          </p>
        </div>
      </div>
    </div>
  );
}
