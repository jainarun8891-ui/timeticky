"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  DollarSign, Play, Pause, RotateCcw, Users, Clock,
  Sparkles, Check, Share2, Copy, AlertTriangle, Coffee,
  TrendingUp, Award, Zap, ShieldAlert, FileText
} from 'lucide-react';
import {
  SUPPORTED_CURRENCIES,
  MEETING_PRESETS,
  calculateMeetingRates,
  calculateEquivalents,
  formatCurrencyAmount,
  generateSlackReceipt,
  MeetingCostParams,
} from '@/lib/meeting/cost-calc';

export function MeetingCostCalculatorClient() {
  const [attendees, setAttendees] = useState(8);
  const [salary, setSalary] = useState(130000);
  const [duration, setDuration] = useState(45); // minutes
  const [overhead, setOverhead] = useState(1.25); // 1.25x fully burdened
  const [currency, setCurrency] = useState(SUPPORTED_CURRENCIES[0]);
  const [meetingTitle, setMeetingTitle] = useState('Sprint Planning Sync');

  // Live Timer State
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with URL query params on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const a = parseInt(urlParams.get('attendees') || '', 10);
      const s = parseInt(urlParams.get('salary') || '', 10);
      const d = parseInt(urlParams.get('duration') || '', 10);
      const c = urlParams.get('currency');
      const t = urlParams.get('title');

      if (!isNaN(a) && a > 0) setAttendees(a);
      if (!isNaN(s) && s > 0) setSalary(s);
      if (!isNaN(d) && d > 0) setDuration(d);
      if (t) setMeetingTitle(t);
      if (c) {
        const foundCurr = SUPPORTED_CURRENCIES.find((item) => item.code === c);
        if (foundCurr) setCurrency(foundCurr);
      }
    }
  }, []);

  // Tick odometer every 100ms when running
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 0.1);
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const rates = calculateMeetingRates({
    attendees,
    averageSalary: salary,
    durationMinutes: duration,
    overheadMultiplier: overhead,
    currencySymbol: currency.symbol,
  });

  const burnedCost = rates.ratePerSecond * elapsedSeconds;
  const scheduledDurationSec = duration * 60;
  const progressPercent = Math.min(100, (elapsedSeconds / scheduledDurationSec) * 100);
  const isOvertime = elapsedSeconds > scheduledDurationSec;

  const equivalents = calculateEquivalents(burnedCost);

  const toggleRun = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
  };

  const copyReceipt = () => {
    const text = generateSlackReceipt(
      meetingTitle,
      attendees,
      duration,
      burnedCost > 0 ? burnedCost : rates.scheduledTotalCost,
      rates.ratePerMinute,
      currency.symbol
    );
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.origin + '/meeting-cost-calculator');
      url.searchParams.set('attendees', attendees.toString());
      url.searchParams.set('salary', salary.toString());
      url.searchParams.set('duration', duration.toString());
      url.searchParams.set('currency', currency.code);
      url.searchParams.set('title', meetingTitle);

      navigator.clipboard.writeText(url.toString());
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
          <TrendingUp className="w-3.5 h-3.5" />
          Real-Time Meeting Chrono-Economics
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Real-Time Meeting Cost Calculator
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          See the exact dollar burn rate ticking per second. Factor in attendees, fully burdened salaries, and opportunity cost to decide if this sync could have been an email.
        </p>
      </section>

      {/* Main Console & Ticking Odometer */}
      <section
        aria-label="Meeting Cost Console"
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8"
      >
        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {MEETING_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setAttendees(preset.attendees);
                setDuration(preset.duration);
                setSalary(preset.salary);
                setMeetingTitle(preset.label);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border border-slate-200/70 dark:border-slate-700/70 cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Big Live Ticking Odometer Display (Reserved layout metrics to prevent CLS) */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-ping' : 'bg-slate-600'}`} />
              {isRunning ? 'Meeting In Progress — Ticking Live' : 'Odometer Paused'}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyShareLink}
                aria-label="Copy meeting calculator share link"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Link Copied' : 'Share Preset'}</span>
              </button>
              <button
                type="button"
                onClick={copyReceipt}
                aria-label="Copy meeting receipt for Slack"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReceipt ? 'Receipt Copied' : 'Slack Receipt'}</span>
              </button>
            </div>
          </div>

          {/* Odometer Main Numbers */}
          <div className="space-y-2 py-4">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block font-semibold">
              Total Financial Cost Burned So Far
            </span>
            <div className="tabular-nums font-mono font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              {formatCurrencyAmount(burnedCost, currency.symbol)}
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-400 flex items-center justify-center gap-3">
              <span>Elapsed: {Math.floor(elapsedSeconds / 60)}m {Math.floor(elapsedSeconds % 60)}s</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">{rates.formattedRatePerSecond} / second</span>
              <span>•</span>
              <span>{rates.formattedRatePerMinute} / minute</span>
            </div>
          </div>

          {/* Timer Controls (Play / Pause / Reset) */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={toggleRun}
              aria-label={isRunning ? 'Pause meeting timer' : 'Start meeting timer'}
              className={`px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-lg cursor-pointer ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              <span>{isRunning ? 'Pause Meeting Burn' : 'Start Meeting Burn'}</span>
            </button>

            <button
              type="button"
              onClick={resetTimer}
              aria-label="Reset meeting timer"
              className="px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          {/* Budget Progress Bar */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Scheduled Target: {duration} mins</span>
              <span className={isOvertime ? 'text-rose-400 font-bold' : ''}>
                {isOvertime ? '⚠️ Overtime Overrun!' : `Projected Cost: ${rates.formattedScheduledCost}`}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-200 ${
                  isOvertime
                    ? 'bg-rose-500 animate-pulse'
                    : progressPercent > 80
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Input Parameters Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Attendees */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <label htmlFor="input-attendees" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                Attendees:
              </span>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{attendees} people</span>
            </label>
            <input
              id="input-attendees"
              type="number"
              min="1"
              max="500"
              value={attendees}
              onChange={(e) => setAttendees(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
            />
            <input
              type="range"
              min="1"
              max="50"
              value={attendees}
              onChange={(e) => setAttendees(parseInt(e.target.value, 10))}
              aria-label="Attendees slider"
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Average Salary */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <label htmlFor="input-salary" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Avg Annual Salary:
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {currency.symbol}{salary.toLocaleString()}
              </span>
            </label>
            <input
              id="input-salary"
              type="number"
              step="5000"
              min="10000"
              max="1000000"
              value={salary}
              onChange={(e) => setSalary(Math.max(1000, parseInt(e.target.value, 10) || 10000))}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
            />
            <span className="text-[11px] text-slate-400 block">
              ${(salary / 2080).toFixed(0)}/hr base labor rate
            </span>
          </div>

          {/* Meeting Duration */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <label htmlFor="input-duration" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Scheduled Duration:
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{duration} min</span>
            </label>
            <input
              id="input-duration"
              type="number"
              min="5"
              max="480"
              step="5"
              value={duration}
              onChange={(e) => setDuration(Math.max(5, parseInt(e.target.value, 10) || 5))}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white"
            />
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
              aria-label="Duration slider"
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Overhead & Currency Config */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Currency & Multiplier:
            </div>
            <div className="flex gap-2">
              <select
                value={currency.code}
                onChange={(e) => {
                  const c = SUPPORTED_CURRENCIES.find((item) => item.code === e.target.value);
                  if (c) setCurrency(c);
                }}
                aria-label="Currency selector"
                className="w-1/2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} ({c.code})
                  </option>
                ))}
              </select>

              <select
                value={overhead.toString()}
                onChange={(e) => setOverhead(parseFloat(e.target.value))}
                aria-label="Benefits multiplier"
                className="w-1/2 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="1.0">1.0x (Raw Salary)</option>
                <option value="1.25">1.25x (+Benefits)</option>
                <option value="1.5">1.5x (Exec Overhead)</option>
              </select>
            </div>
            <span className="text-[11px] text-slate-400 block">
              1.25x covers healthcare, taxes & software licenses.
            </span>
          </div>
        </div>

        {/* Burn Rate Stats Cards (Pre-allocated min-height to eliminate CLS) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Cost Per Second
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white">
              {rates.formattedRatePerSecond}
            </div>
            <p className="text-xs text-slate-500">Continuous money outflow each second</p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Cost Per Minute
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-600 dark:text-emerald-400">
              {rates.formattedRatePerMinute}
            </div>
            <p className="text-xs text-slate-500">Every 60-second tangent or delay</p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Scheduled Total
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-blue-600 dark:text-blue-400">
              {rates.formattedScheduledCost}
            </div>
            <p className="text-xs text-slate-500">Planned {duration}-minute session budget</p>
          </article>
        </div>

        {/* Fun Relatable Equivalents (Viral Shareability) */}
        {equivalents.length > 0 && (
          <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-3">
            <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-600" />
              <span>What This Elapsed Meeting Has Burned in Real Terms:</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {equivalents.map((item) => (
                <div
                  key={item.name}
                  className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-amber-800/60 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-2xs"
                >
                  <span className="text-base">{item.icon}</span>
                  <span>
                    <strong>{item.count}</strong> {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
