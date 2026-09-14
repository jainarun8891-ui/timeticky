"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Coffee, Brain, Sparkles, CheckCircle2 } from 'lucide-react';

type Mode = 'work' | 'shortBreak' | 'longBreak';

const DEFAULT_DURATIONS: Record<Mode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export function PomodoroClient() {
  const [mode, setMode] = useState<Mode>('work');
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_DURATIONS.work);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  const targetTimeRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play pleasant completion chime using native Web Audio
  const playChime = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, idx) => {
        const osc = audioCtxRef.current!.createOscillator();
        const gain = audioCtxRef.current!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtxRef.current!.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.08, audioCtxRef.current!.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current!.currentTime + idx * 0.12 + 0.5);
        osc.connect(gain);
        gain.connect(audioCtxRef.current!.destination);
        osc.start(audioCtxRef.current!.currentTime + idx * 0.12);
        osc.stop(audioCtxRef.current!.currentTime + idx * 0.12 + 0.5);
      });
    } catch {
      // Browser audio restriction safeguard
    }
  };

  // Background tab resilient countdown loop
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      if (!targetTimeRef.current) {
        targetTimeRef.current = Date.now() + timeLeft * 1000;
      }

      interval = setInterval(() => {
        const remainingMs = targetTimeRef.current! - Date.now();
        const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

        setTimeLeft(remainingSec);

        if (remainingSec <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          targetTimeRef.current = null;
          playChime();

          if (mode === 'work') {
            const nextCycles = completedCycles + 1;
            setCompletedCycles(nextCycles);
            if (nextCycles % 4 === 0) {
              setMode('longBreak');
              setTimeLeft(DEFAULT_DURATIONS.longBreak);
            } else {
              setMode('shortBreak');
              setTimeLeft(DEFAULT_DURATIONS.shortBreak);
            }
          } else {
            setMode('work');
            setTimeLeft(DEFAULT_DURATIONS.work);
          }
        }
      }, 250);
    } else {
      targetTimeRef.current = null;
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, completedCycles]);

  const toggleRun = () => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    targetTimeRef.current = null;
    setTimeLeft(DEFAULT_DURATIONS[mode]);
  };

  const switchMode = (newMode: Mode) => {
    setIsRunning(false);
    targetTimeRef.current = null;
    setMode(newMode);
    setTimeLeft(DEFAULT_DURATIONS[newMode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const progressPercent = ((DEFAULT_DURATIONS[mode] - timeLeft) / DEFAULT_DURATIONS[mode]) * 100;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-12 shadow-sm text-center relative overflow-hidden">
        {/* Mode Selector Tabs */}
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 mb-8">
          <button
            onClick={() => switchMode('work')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'work'
                ? 'bg-red-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Focus (25m)</span>
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'shortBreak'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Short Break (5m)</span>
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mode === 'longBreak'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Long Break (15m)</span>
          </button>
        </div>

        {/* Huge Digital Numerals */}
        <div className="py-6 sm:py-10 select-none">
          <div className="text-7xl sm:text-9xl font-black font-mono tracking-tight text-slate-900 dark:text-white leading-none">
            {timeDisplay}
          </div>
          <div className="mt-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400">
            {mode === 'work' ? 'Time to Focus & Deep Work' : 'Time to Rest & Recharge'}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden my-6">
          <div
            className={`h-full transition-all duration-300 ${
              mode === 'work' ? 'bg-red-500' : mode === 'shortBreak' ? 'bg-emerald-500' : 'bg-blue-600'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleRun}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white shadow-md transition-all hover:scale-102 cursor-pointer ${
              isRunning
                ? 'bg-slate-800 hover:bg-slate-700'
                : mode === 'work'
                ? 'bg-red-500 hover:bg-red-600'
                : mode === 'shortBreak'
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (mode === 'work') switchMode('shortBreak');
              else switchMode('work');
            }}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Skip to next session"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Session Stats */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Completed Pomodoros: <strong>{completedCycles}</strong></span>
          </div>
          <div>&bull;</div>
          <div>Cycle: <strong>{(completedCycles % 4) + 1} / 4</strong> before long break</div>
        </div>
      </div>
    </div>
  );
}
