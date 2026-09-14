const fs = require('fs');

// QuickTimerCard.tsx
fs.writeFileSync('src/components/dashboard/QuickTimerCard.tsx', `
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Timer as TimerIcon, Play, Pause, RotateCcw } from 'lucide-react';

export function QuickTimerCard() {
  const [activeTab, setActiveTab] = useState<'countdown' | 'stopwatch' | 'timer'>('countdown');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Synthesized Web Audio chime (no external MP3 file dependency!)
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            clearInterval(timerRef.current!);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (!isRunning && remainingSeconds === 0) {
      const h = parseInt(hours, 10) || 0;
      const m = parseInt(minutes, 10) || 0;
      const s = parseInt(seconds, 10) || 0;
      const total = h * 3600 + m * 60 + s;
      setRemainingSeconds(total > 0 ? total : 25 * 60);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    const h = parseInt(hours, 10) || 0;
    const m = parseInt(minutes, 10) || 0;
    const s = parseInt(seconds, 10) || 0;
    setRemainingSeconds(h * 3600 + m * 60 + s);
  };

  const dispH = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
  const dispM = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
  const dispS = String(remainingSeconds % 60).padStart(2, '0');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <TimerIcon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            Timer / Countdown
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Stay on track
          </p>
        </div>
      </div>

      {/* Mode Switcher Pill */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full text-xs font-semibold mb-4">
        {(['countdown', 'stopwatch', 'timer'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            type="button"
            className={\`flex-1 py-1.5 rounded-full capitalize transition-all \${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Input / Display Digits */}
      <div className="flex items-center justify-center gap-2 my-2 font-mono">
        <div className="flex items-center gap-1">
          <input
            type="text"
            maxLength={2}
            value={isRunning ? dispH : hours}
            disabled={isRunning}
            onChange={(e) => {
              setHours(e.target.value.padStart(2, '0'));
              setRemainingSeconds(parseInt(e.target.value || '0', 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10));
            }}
            className="w-12 h-10 text-center text-lg font-bold bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-400 font-sans font-medium">h</span>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="text"
            maxLength={2}
            value={isRunning ? dispM : minutes}
            disabled={isRunning}
            onChange={(e) => {
              setMinutes(e.target.value.padStart(2, '0'));
              setRemainingSeconds(parseInt(hours, 10) * 3600 + parseInt(e.target.value || '0', 10) * 60 + parseInt(seconds, 10));
            }}
            className="w-12 h-10 text-center text-lg font-bold bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-400 font-sans font-medium">m</span>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="text"
            maxLength={2}
            value={isRunning ? dispS : seconds}
            disabled={isRunning}
            onChange={(e) => {
              setSeconds(e.target.value.padStart(2, '0'));
              setRemainingSeconds(parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(e.target.value || '0', 10));
            }}
            className="w-12 h-10 text-center text-lg font-bold bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
          <span className="text-xs text-slate-400 font-sans font-medium">s</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleStart}
          type="button"
          className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>

        <button
          onClick={handleReset}
          type="button"
          aria-label="Reset timer"
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
`, 'utf8');

// CountryInfoCard.tsx
fs.writeFileSync('src/components/dashboard/CountryInfoCard.tsx', `
"use client";

import React from 'react';
import Link from 'next/link';
import { City, CITIES } from '@/lib/geo/cities';
import { getCountryByCode } from '@/lib/geo/countries';

interface CountryInfoCardProps {
  currentCity?: City;
}

export function CountryInfoCard({ currentCity = CITIES[0] }: CountryInfoCardProps) {
  const country = getCountryByCode(currentCity.countryCode);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between transition-all">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-xl">
          {country?.flag || '🇫🇷'}
        </span>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
            About {country?.name || 'France'}
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            Country information & timezone context
          </p>
        </div>
      </div>

      {/* Scenic vector / illustration block */}
      <div className="relative h-16 w-full rounded-xl overflow-hidden bg-gradient-to-r from-blue-100 to-amber-50 dark:from-slate-800 dark:to-slate-700/60 my-2 flex items-center justify-center">
        <svg viewBox="0 0 400 80" className="w-full h-full object-cover opacity-60">
          <path d="M0 60 Q 100 30 200 60 T 400 60 V 80 H 0 Z" fill="#93c5fd" />
          <path d="M120 20 L 125 45 H 115 Z" fill="#475569" />
          <path d="M110 45 H 130 V 70 H 110 Z" fill="#334155" />
          <circle cx="280" cy="25" r="14" fill="#fcd34d" />
        </svg>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs my-1">
        <div>
          <span className="text-slate-400 text-[10px] block">Capital</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{country?.capital || 'Paris'}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block">Population</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{country?.population || '68.4 million'}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block">Currency</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{country?.currency || 'Euro (EUR)'}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] block">Timezone</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{country?.timezones[0] || 'Europe/Paris'}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <Link
          href={\`/country/\${country?.slug || 'france'}\`}
          className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-semibold transition-colors"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
`, 'utf8');

// QuoteCard.tsx
fs.writeFileSync('src/components/dashboard/QuoteCard.tsx', `
import React from 'react';

export function QuoteCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between transition-all">
      <div className="text-3xl text-blue-500/30 font-serif leading-none">
        “
      </div>

      <div className="my-auto py-2">
        <blockquote className="text-base font-bold text-slate-900 dark:text-white leading-snug">
          “Time is a shared experience.”
        </blockquote>
        <div className="w-8 h-0.5 bg-blue-500 my-2" />
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
          Different places. A more connected world.
        </p>
      </div>

      <div className="pt-2 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
        Global Perspective
      </div>
    </div>
  );
}
`, 'utf8');

console.log('Bottom cards written successfully');
