"use client";

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import {
  Moon, Sun, Clock, Sparkles, Check, Copy, Bed,
  Compass, AlertCircle, Info, ChevronRight, Zap, ShieldCheck
} from 'lucide-react';
import {
  calculateBedtimes,
  calculateWakeTimes,
  calculateSleepNow,
  SleepCycleResult,
  POPULAR_SLEEP_PRESETS,
  formatTime12,
} from '@/lib/sleep/sleep-calc';

interface Props {
  initialMode?: 'wake' | 'bed' | 'now';
  initialHour?: number;
  initialMinute?: number;
  customHeading?: string;
  customDescription?: string;
}

export function SleepCalculatorClient({
  initialMode = 'wake',
  initialHour = 7,
  initialMinute = 0,
  customHeading,
  customDescription,
}: Props) {
  const [mode, setMode] = useState<'wake' | 'bed' | 'now'>(initialMode);
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [latency, setLatency] = useState(14);
  const [copied, setCopied] = useState(false);
  const [, startTransition] = useTransition();

  // Compute results
  let results: SleepCycleResult[] = [];
  if (mode === 'wake') {
    results = calculateBedtimes(hour, minute, latency);
  } else if (mode === 'bed') {
    results = calculateWakeTimes(hour, minute, latency);
  } else {
    results = calculateSleepNow(latency);
  }

  const handleModeChange = (newMode: 'wake' | 'bed' | 'now') => {
    startTransition(() => {
      setMode(newMode);
    });
  };

  const copyResults = () => {
    const header = mode === 'wake'
      ? `🌙 Optimal Bedtimes to Wake Up at ${formatTime12(new Date(2026, 0, 1, hour, minute))}:`
      : mode === 'bed'
      ? `☀️ Optimal Wake-up Times if Sleeping at ${formatTime12(new Date(2026, 0, 1, hour, minute))}:`
      : `🚀 Wake-up Times if Going to Bed Right Now:`;

    const body = results
      .map(
        (r) =>
          `• ${r.timeFormatted} (${r.cycles} cycles / ${r.sleepDurationFormatted}) - ${r.badge}`
      )
      .join('\n');

    const text = `${header}\n${body}\n\nCalculated with TimeTicky Sleep Cycle Calculator\nhttps://www.timenumbers.com/sleep-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          Circadian Chronobiology & 90-Minute Cycles
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {customHeading || 'Sleep Cycle Calculator — Wake Up Energized & Alert'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {customDescription ||
            'Wake up in sync with natural 90-minute REM and slow-wave sleep cycles. Calculate your exact bedtime or wake-up time to permanently eliminate morning grogginess (sleep inertia).'}
        </p>
      </section>

      {/* Main Interactive Calculator Console */}
      <section
        aria-label="Sleep Cycle Calculation Console"
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8"
      >
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 max-w-xl mx-auto gap-1">
          <button
            type="button"
            onClick={() => handleModeChange('wake')}
            aria-selected={mode === 'wake'}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'wake'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Wake-up Time</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('bed')}
            aria-selected={mode === 'bed'}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'bed'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-500" />
            <span>Bedtime</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('now')}
            aria-selected={mode === 'now'}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              mode === 'now'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>Sleep Now</span>
          </button>
        </div>

        {/* Input Controls */}
        <div className="max-w-xl mx-auto space-y-6">
          {mode !== 'now' ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
              <label
                htmlFor="sleep-time-picker"
                className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>
                  {mode === 'wake'
                    ? 'What time do you need to wake up?'
                    : 'What time are you going to sleep?'}
                </span>
              </label>

              <input
                id="sleep-time-picker"
                type="time"
                aria-label={mode === 'wake' ? 'Target wake-up time' : 'Target bedtime'}
                value={`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
                onChange={(e) => {
                  const [h, m] = e.target.value.split(':').map((v) => parseInt(v, 10));
                  if (!isNaN(h) && !isNaN(m)) {
                    setHour(h);
                    setMinute(m);
                  }
                }}
                className="p-3 text-lg font-mono font-bold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
              />
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-3">
              <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                <strong>Live Sleep Calculation:</strong> Assuming you fall asleep right now (plus {latency} minutes sleep onset latency), here are your ideal wake times.
              </span>
            </div>
          )}

          {/* Sleep Latency Fine-Tuning */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-slate-500" />
                Sleep Onset Latency (time to fall asleep):
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                {latency} minutes (Scientific Average: 14m)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="45"
              step="1"
              value={latency}
              onChange={(e) => setLatency(parseInt(e.target.value, 10))}
              aria-label="Sleep latency in minutes"
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Results Header with Share Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{mode === 'wake' ? 'Optimal Bedtimes' : 'Optimal Wake-Up Times'}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                90-Minute Cycles
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Waking up at the conclusion of a cycle ensures you wake from light NREM sleep feeling energized.
            </p>
          </div>

          <button
            type="button"
            onClick={copyResults}
            aria-label="Copy sleep schedule to clipboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Schedule Copied!' : 'Copy Sleep Schedule'}</span>
          </button>
        </div>

        {/* Dynamic Sleep Cycle Result Cards (Reserved layout to prevent CLS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {results.map((result) => {
            const isGold = result.cycles === 5;
            const isPeak = result.cycles === 6;

            return (
              <article
                key={result.cycles}
                className={`p-6 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isGold
                    ? 'bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-300 dark:border-blue-700 shadow-md ring-2 ring-blue-500/20'
                    : isPeak
                    ? 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700'
                    : 'bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800'
                }`}
              >
                {isGold && (
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                    Recommended Sweet Spot
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      {result.cycles} Sleep Cycles
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {result.sleepDurationFormatted} Sleep
                    </span>
                  </div>

                  {/* Semantic Output Time Tag */}
                  <div>
                    <time
                      dateTime={result.isoDateTime}
                      className={`text-3xl sm:text-4xl font-mono font-black block tracking-tight ${
                        isGold
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {result.timeFormatted}
                    </time>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1 inline-flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      {result.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* Sleep Stage Architecture Bar */}
                <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Sleep Stage Breakdown:</span>
                    <span className="font-mono">NREM Light / Deep / REM</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex">
                    <div
                      className="bg-blue-400 h-full"
                      style={{ width: `${result.remStages.nremLight}%` }}
                      title="Light Sleep (N1 + N2)"
                    />
                    <div
                      className="bg-indigo-600 h-full"
                      style={{ width: `${result.remStages.nremDeep}%` }}
                      title="Deep Slow-Wave Sleep (N3)"
                    />
                    <div
                      className="bg-purple-500 h-full"
                      style={{ width: `${result.remStages.rem}%` }}
                      title="REM Dreaming Sleep"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Programmatic Preset Links Grid (SEO Internal Linking) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-blue-600" />
          <span>Popular Wake-Up & Bedtime Schedules</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Explore precision calculations mapped to standard work and school schedules:
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {POPULAR_SLEEP_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/sleep-calculator/${preset.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <span>{preset.label}</span>
              <ChevronRight className="w-3 h-3 opacity-60" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
