"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  ArrowLeftRight, 
  Copy, 
  Check, 
  Volume2, 
  Info, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  Sun,
  Moon
} from 'lucide-react';

interface MilitaryTimeClientProps {
  h1Title?: string;
  locale?: 'en' | 'es';
}

const PHONETIC_HOURS_EN: Record<number, string> = {
  0: 'Zero Hundred',
  1: 'Zero One Hundred',
  2: 'Zero Two Hundred',
  3: 'Zero Three Hundred',
  4: 'Zero Four Hundred',
  5: 'Zero Five Hundred',
  6: 'Zero Six Hundred',
  7: 'Zero Seven Hundred',
  8: 'Zero Eight Hundred',
  9: 'Zero Nine Hundred',
  10: 'Ten Hundred',
  11: 'Eleven Hundred',
  12: 'Twelve Hundred',
  13: 'Thirteen Hundred',
  14: 'Fourteen Hundred',
  15: 'Fifteen Hundred',
  16: 'Sixteen Hundred',
  17: 'Seventeen Hundred',
  18: 'Eighteen Hundred',
  19: 'Nineteen Hundred',
  20: 'Twenty Hundred',
  21: 'Twenty-One Hundred',
  22: 'Twenty-Two Hundred',
  23: 'Twenty-Three Hundred',
};

const NUMBER_WORDS_EN = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
  'Twenty', 'Twenty-One', 'Twenty-Two', 'Twenty-Three', 'Twenty-Four', 'Twenty-Five', 'Twenty-Six', 'Twenty-Seven', 'Twenty-Eight', 'Twenty-Nine',
  'Thirty', 'Thirty-One', 'Thirty-Two', 'Thirty-Three', 'Thirty-Four', 'Thirty-Five', 'Thirty-Six', 'Thirty-Seven', 'Thirty-Eight', 'Thirty-Nine',
  'Forty', 'Forty-One', 'Forty-Two', 'Forty-Three', 'Forty-Four', 'Forty-Five', 'Forty-Six', 'Forty-Forty-Seven', 'Forty-Eight', 'Forty-Nine',
  'Fifty', 'Fifty-One', 'Fifty-Two', 'Fifty-Three', 'Fifty-Four', 'Fifty-Five', 'Fifty-Six', 'Fifty-Seven', 'Fifty-Eight', 'Fifty-Nine'
];

export function MilitaryTimeClient({
  h1Title,
  locale = 'en',
}: MilitaryTimeClientProps) {
  const isEs = locale === 'es';

  // Current time default
  const [hour, setHour] = useState(14);
  const [minute, setMinute] = useState(30);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [periodTab, setPeriodTab] = useState<'all' | 'morning' | 'afternoon' | 'night'>('all');

  // Convert to 12-hour components
  const period = hour >= 12 ? 'PM' : 'AM';
  const display12Hour = hour % 12 === 0 ? 12 : hour % 12;

  // Formatted Strings
  const militaryStr = `${String(hour).padStart(2, '0')}${String(minute).padStart(2, '0')}`;
  const time24Str = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  const time12Str = `${display12Hour}:${String(minute).padStart(2, '0')} ${period}`;
  const utcStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}Z`;

  // Spoken Pronunciation in plain English / Spanish
  const spokenPronunciation = useMemo(() => {
    if (isEs) {
      if (minute === 0) {
        return `${String(hour).padStart(2, '0')}:00 horas (${hour === 1 ? 'La una' : `Las ${hour}`} en punto)`;
      }
      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} horas (${hour} horas con ${minute} minutos)`;
    }

    if (minute === 0) {
      if (hour === 0) return 'Zero Zero Zero Zero hours (or Midnight)';
      if (hour === 12) return 'Twelve Hundred hours (or Noon)';
      return `${PHONETIC_HOURS_EN[hour]} hours`;
    }

    const hourWord = hour < 10 ? `Zero ${NUMBER_WORDS_EN[hour]}` : NUMBER_WORDS_EN[hour];
    const minWord = minute < 10 ? `Zero ${NUMBER_WORDS_EN[minute]}` : NUMBER_WORDS_EN[minute];
    return `${hourWord} ${minWord} hours`;
  }, [hour, minute, isEs]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Full 24-hour table rows (00:00 to 23:00)
  const fullChart = useMemo(() => {
    return Array.from({ length: 24 }, (_, h) => {
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const p = h >= 12 ? 'PM' : 'AM';
      const mil = `${String(h).padStart(2, '0')}00`;
      const t24 = `${String(h).padStart(2, '0')}:00`;
      const t12 = `${h12}:00 ${p}`;
      const desc = isEs
        ? (h === 0 ? 'Medianoche' : h === 12 ? 'Mediodía' : h < 12 ? 'Mañana' : h < 19 ? 'Tarde' : 'Noche')
        : (h === 0 ? 'Midnight' : h === 12 ? 'Noon' : h < 12 ? 'Morning' : h < 18 ? 'Afternoon' : 'Night');
      
      const spoken = isEs
        ? `${String(h).padStart(2, '0')}:00 horas`
        : (h === 0 ? 'Zero Hundred hours (Midnight)' : h === 12 ? 'Twelve Hundred hours (Noon)' : `${PHONETIC_HOURS_EN[h]} hours`);

      return { hour: h, mil, t24, t12, desc, spoken };
    });
  }, [isEs]);

  const filteredChart = useMemo(() => {
    return fullChart.filter(row => {
      if (periodTab === 'morning' && row.hour >= 12) return false;
      if (periodTab === 'afternoon' && (row.hour < 12 || row.hour >= 18)) return false;
      if (periodTab === 'night' && row.hour < 18) return false;

      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        row.mil.includes(q) ||
        row.t24.includes(q) ||
        row.t12.toLowerCase().includes(q) ||
        row.desc.toLowerCase().includes(q)
      );
    });
  }, [fullChart, periodTab, searchFilter]);

  return (
    <div className="space-y-10">
      {/* Hero Title & Subtitle */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800">
          <Clock className="w-3.5 h-3.5" />
          {isEs ? 'Conversor Oficial y Tabla de 24 Horas' : 'Official 24-Hour Military Time Converter & Chart'}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {h1Title || (isEs ? 'Conversor de Hora Militar a Hora Normal' : 'Military Time Converter & 24-Hour Clock')}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {isEs 
            ? 'Convierte cualquier hora al formato militar de 24 horas al instante. Aprende cómo se pronuncia y consulta la tabla completa sin complicaciones.'
            : 'Convert standard 12-hour AM/PM time into military 24-hour time instantly. Hear the phonetic pronunciation and master the simple 2-second trick.'}
        </p>
      </div>

      {/* Main Interactive Converter Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
        
        {/* Converter Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Interactive Input Controls */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-blue-500" />
              {isEs ? 'Elige o ajusta cualquier hora' : 'Adjust or Select Any Time'}
            </h2>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: isEs ? 'Medianoche (0000)' : 'Midnight (0000)', h: 0, m: 0 },
                { label: isEs ? '6:00 AM (0600)' : '6:00 AM (0600)', h: 6, m: 0 },
                { label: isEs ? 'Mediodía (1200)' : 'Noon (1200)', h: 12, m: 0 },
                { label: isEs ? '5:00 PM (1700)' : '5:00 PM (1700)', h: 17, m: 0 },
                { label: isEs ? '9:00 PM (2100)' : '9:00 PM (2100)', h: 21, m: 0 },
                { label: isEs ? '11:59 PM (2359)' : '11:59 PM (2359)', h: 23, m: 59 },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => { setHour(btn.h); setMinute(btn.m); }}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium border transition-all ${
                    hour === btn.h && minute === btn.m
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Sliders for Hour & Minute */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>{isEs ? 'Hora (Formato 24h):' : 'Hour (24-Hour Slider):'}</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{String(hour).padStart(2, '0')}:00</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="23"
                  value={hour}
                  onChange={(e) => setHour(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  <span>{isEs ? 'Minuto:' : 'Minute:'}</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{String(minute).padStart(2, '0')} mins</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="59"
                  value={minute}
                  onChange={(e) => setMinute(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Current System Time Sync Button */}
            <button
              onClick={() => {
                const now = new Date();
                setHour(now.getHours());
                setMinute(now.getMinutes());
              }}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              {isEs ? 'Usar la hora actual de mi dispositivo' : 'Set to my current device time'}
            </button>
          </div>

          {/* Right Column: Live Converted Output Cards */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {isEs ? 'Resultado de Conversión' : 'Converted Live Time'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                {period}
              </span>
            </div>

            {/* Giant Military Time Display */}
            <div className="space-y-1">
              <span className="text-xs uppercase text-slate-400 font-medium tracking-wide">
                {isEs ? 'Hora Militar' : 'Military Time'}
              </span>
              <div className="flex items-baseline justify-between">
                <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
                  {militaryStr}
                  <span className="text-base text-slate-400 font-normal ml-2">hrs</span>
                </div>
                <button
                  onClick={() => handleCopy(`${militaryStr} hours`, 'mil')}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Copy Military Time"
                >
                  {copiedKey === 'mil' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Secondary Formats: Standard 12h & 24h & UTC */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-medium">
                  {isEs ? 'Hora Estándar (12h)' : 'Standard (12-Hour)'}
                </span>
                <span className="text-lg font-bold font-mono text-white mt-0.5 block">
                  {time12Str}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-medium">
                  {isEs ? 'Reloj Civil (24h)' : 'Civil Time (24h)'}
                </span>
                <span className="text-lg font-bold font-mono text-white mt-0.5 block">
                  {time24Str}
                </span>
              </div>
            </div>

            {/* Phonetic Pronunciation Box */}
            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-300">
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                {isEs ? 'Cómo se dice / pronunciación:' : 'How to say it aloud:'}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-mono font-medium">
                “{spokenPronunciation}”
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Layman Explanation: The 2-Second Trick */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'Horas de la Mañana (AM)' : 'Morning Hours (AM)'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'Desde la 1:00 AM hasta las 11:59 AM es exactamente igual. Si es un solo dígito, solo pon un cero adelante (por ejemplo, las 7 AM son las 0700).'
              : 'From 1:00 AM to 11:59 AM, the numbers look the exact same. Just put a zero in front of single-digit hours (e.g. 7:00 AM becomes 0700). Zero math needed!'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'El Truco de los 2 Segundos (PM)' : 'The 2-Second Trick (PM)'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'Por la tarde o noche, simplemente suma 12 a la hora estándar (5 PM + 12 = 1700). Para volver a la hora normal, resta 12 (1700 − 12 = 5 PM).'
              : 'For any afternoon or evening hour, just add 12 to standard time (5 PM + 12 = 1700). To convert backwards, just subtract 12 (1700 − 12 = 5 PM).'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Moon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'La Medianoche (0000)' : 'Midnight (0000)'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'La medianoche se escribe 0000 (o 2400 si marca el final exacto del día). Un minuto después de medianoche son las 0001 horas.'
              : 'Midnight marks the start of a new day and is written as 0000. Exactly 2400 can be used to denote the ending of a calendar day.'}
          </p>
        </div>
      </div>

      {/* 24-Hour Military Time Reference Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {isEs ? 'Tabla Completa de Horas Militares (00:00 a 23:00)' : 'Complete 24-Hour Military Time Chart'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isEs 
                ? 'Referencia rápida para comparar hora militar, hora de 24 horas y hora normal AM/PM.'
                : 'Interactive reference comparing military time, 24-hour civil format, and standard 12-hour AM/PM.'}
            </p>
          </div>

          {/* Table Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={isEs ? 'Buscar hora (ej. 1700, 5 PM)...' : 'Filter time (e.g. 1700, 5 PM)...'}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          {[
            { id: 'all', label: isEs ? 'Todas (24h)' : 'All 24 Hours' },
            { id: 'morning', label: isEs ? 'Mañana (0000–1100)' : 'Morning (0000–1100)' },
            { id: 'afternoon', label: isEs ? 'Tarde (1200–1700)' : 'Afternoon (1200–1700)' },
            { id: 'night', label: isEs ? 'Noche (1800–2300)' : 'Night (1800–2300)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPeriodTab(tab.id as any)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                periodTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-3 px-3 font-semibold">{isEs ? 'Hora Militar' : 'Military Time'}</th>
                <th className="py-3 px-3 font-semibold">{isEs ? 'Formato 24h' : '24-Hour Time'}</th>
                <th className="py-3 px-3 font-semibold">{isEs ? 'Hora Estándar (12h)' : 'Standard Time (12h)'}</th>
                <th className="py-3 px-3 font-semibold">{isEs ? 'Pronunciación Hablada' : 'Phonetic Reading'}</th>
                <th className="py-3 px-3 font-semibold text-right">{isEs ? 'Acción' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {filteredChart.map((row) => (
                <tr 
                  key={row.hour}
                  className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                >
                  <td className="py-2.5 px-3 font-bold text-blue-600 dark:text-blue-400">
                    {row.mil}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">
                    {row.t24}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {row.t12}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-xs text-slate-500">
                    {row.spoken}
                  </td>
                  <td className="py-2.5 px-3 text-right font-sans">
                    <button
                      onClick={() => handleCopy(`${row.mil} hours (${row.t12})`, `row-${row.hour}`)}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs transition-colors"
                    >
                      {copiedKey === `row-${row.hour}` ? (isEs ? 'Copiado' : 'Copied!') : (isEs ? 'Copiar' : 'Copy')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
