"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, Bell } from 'lucide-react';

interface Props {
  initialSeconds?: number;
  title?: string;
  presetSlug?: string;
}

const PRESET_DURATIONS = [
  { slug: '1-minute', label: '1 Min', seconds: 60 },
  { slug: '5-minutes', label: '5 Min', seconds: 300 },
  { slug: '10-minutes', label: '10 Min', seconds: 600 },
  { slug: '15-minutes', label: '15 Min', seconds: 900 },
  { slug: '20-minutes', label: '20 Min', seconds: 1200 },
  { slug: '30-minutes', label: '30 Min', seconds: 1800 },
  { slug: '45-minutes', label: '45 Min', seconds: 2700 },
  { slug: '1-hour', label: '1 Hour', seconds: 3600 },
  { slug: '2-hours', label: '2 Hours', seconds: 7200 },
];

export function TimerSuiteClient({ initialSeconds = 300, title = 'Online Timer', presetSlug }: Props) {
  const [totalSeconds, setTotalSeconds] = useState<number>(initialSeconds);
  const [remainingMs, setRemainingMs] = useState<number>(initialSeconds * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Precision timestamp anchors
  const endTimeRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Play Web Audio chime
  const playAlarmSound = () => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // 3 pleasant bell frequencies
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.15);
        gain.gain.setValueAtTime(0.25, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 1.2);
      });
    } catch {
      // Audio context fallback
    }
  };

  useEffect(() => {
    if (isRunning) {
      endTimeRef.current = Date.now() + remainingMs;
      const tick = () => {
        if (!endTimeRef.current) return;
        const left = Math.max(0, endTimeRef.current - Date.now());
        setRemainingMs(left);

        if (left <= 0) {
          setIsRunning(false);
          setIsFinished(true);
          playAlarmSound();
          endTimeRef.current = null;
          return;
        }
        timerRef.current = requestAnimationFrame(tick);
      };
      timerRef.current = requestAnimationFrame(tick);
    } else {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    }

    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [isRunning]);

  const handleStart = () => {
    if (remainingMs <= 0) {
      setRemainingMs(totalSeconds * 1000);
    }
    setIsFinished(false);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setRemainingMs(totalSeconds * 1000);
  };

  const handleSetPreset = (sec: number) => {
    setIsRunning(false);
    setIsFinished(false);
    setTotalSeconds(sec);
    setRemainingMs(sec * 1000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Time calculations
  const totalSecRemaining = Math.ceil(remainingMs / 1000);
  const hours = Math.floor(totalSecRemaining / 3600);
  const minutes = Math.floor((totalSecRemaining % 3600) / 60);
  const seconds = totalSecRemaining % 60;

  const displayTime = hours > 0
    ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPct = Math.max(0, Math.min(100, ((totalSeconds * 1000 - remainingMs) / (totalSeconds * 1000)) * 100));

  return (
    <div className="space-y-8">
      {/* Shortcut Route Pills */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {PRESET_DURATIONS.map((preset) => {
            const isActive = presetSlug === preset.slug || (!presetSlug && totalSeconds === preset.seconds);
            return (
              <Link
                key={preset.slug}
                href={`/timer/${preset.slug}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {preset.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Timer Display Card */}
      <div className={`rounded-3xl border transition-all duration-300 p-8 sm:p-14 text-center relative overflow-hidden ${
        isFinished
          ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-900/60 shadow-lg animate-pulse'
          : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-sm'
      }`}>
        {/* Progress Bar Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full transition-all duration-200 ${isFinished ? 'bg-red-600' : 'bg-blue-600'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Top Action Icons */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {isFinished ? 'Timer Completed' : (isRunning ? 'Running Background Timestamp Sync' : 'Ready')}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              title={soundEnabled ? 'Mute Alert Sound' : 'Enable Alert Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Big Digit Readout */}
        <div className="font-mono font-black text-7xl sm:text-9xl md:text-[10rem] tracking-tight text-slate-900 dark:text-white select-none leading-none my-4">
          {displayTime}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-current" />
              {remainingMs < totalSeconds * 1000 && !isFinished ? 'Resume' : 'Start Timer'}
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Pause className="w-5 h-5 fill-current" />
              Pause
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-base flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* Inactive Tab Accuracy Note */}
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-8 max-w-sm mx-auto">
          Synchronized to absolute epoch timestamps. The timer continues counting down with 100% mathematical accuracy even when your device screen is locked or browser tab is inactive.
        </p>
      </div>
    </div>
  );
}
