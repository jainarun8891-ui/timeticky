"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Binary, Timer as TimerIcon, Play, Pause, RotateCcw, 
  Flag, Copy, Check, ArrowRight, Bell, Sparkles
} from 'lucide-react';

export function PrecisionToolsSuite() {
  const [activeTab, setActiveTab] = useState<'unix' | 'stopwatch' | 'timer'>('unix');

  // Unix Epoch State
  const [epoch, setEpoch] = useState<number>(0);
  const [epochCopied, setEpochCopied] = useState(false);
  const [customEpoch, setCustomEpoch] = useState('');
  const [convertedDate, setConvertedDate] = useState<string | null>(null);

  useEffect(() => {
    setEpoch(Math.floor(Date.now() / 1000));
    const timer = setInterval(() => {
      setEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEpoch = () => {
    navigator.clipboard.writeText(String(epoch));
    setEpochCopied(true);
    setTimeout(() => setEpochCopied(false), 2000);
  };

  const handleConvertEpoch = (val: string) => {
    setCustomEpoch(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      const d = new Date(num * 1000);
      setConvertedDate(d.toUTCString());
    } else {
      setConvertedDate(null);
    }
  };

  // Stopwatch State
  const [swTime, setSwTime] = useState(0); // in ms
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const swRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (swRunning) {
      const start = Date.now() - swTime;
      swRef.current = setInterval(() => {
        setSwTime(Date.now() - start);
      }, 10);
    } else if (swRef.current) {
      clearInterval(swRef.current);
    }
    return () => {
      if (swRef.current) clearInterval(swRef.current);
    };
  }, [swRunning]);

  const handleLap = () => {
    if (swRunning) setLaps([swTime, ...laps]);
  };

  const handleSwReset = () => {
    setSwRunning(false);
    setSwTime(0);
    setLaps([]);
  };

  const formatSw = (ms: number) => {
    const mins = String(Math.floor(ms / 60000)).padStart(2, '0');
    const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
    const centis = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return { mins, secs, centis };
  };

  // Timer State
  const [tmMinutes, setTmMinutes] = useState('25');
  const [tmRemaining, setTmRemaining] = useState(25 * 60);
  const [tmRunning, setTmRunning] = useState(false);
  const tmRef = useRef<NodeJS.Timeout | null>(null);

  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1);
    } catch (e) {}
  };

  useEffect(() => {
    if (tmRunning) {
      tmRef.current = setInterval(() => {
        setTmRemaining((prev) => {
          if (prev <= 1) {
            setTmRunning(false);
            clearInterval(tmRef.current!);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (tmRef.current) {
      clearInterval(tmRef.current);
    }
    return () => {
      if (tmRef.current) clearInterval(tmRef.current);
    };
  }, [tmRunning]);

  return (
    <section className="w-full bg-white dark:bg-zinc-950/70 rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 p-6 sm:p-8 shadow-xs">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/90 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white tracking-tight">
            Precision Time Utilities
          </h2>
          <p className="text-xs text-zinc-400">
            Developer tools, millisecond stopwatch, and productivity timer
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-full bg-slate-100 dark:bg-zinc-900 p-1 border border-slate-200/60 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('unix')}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'unix'
                ? 'bg-blue-600 text-white shadow-md font-bold'
                : 'text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
            }`}
          >
            Unix Epoch
          </button>
          <button
            onClick={() => setActiveTab('stopwatch')}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'stopwatch'
                ? 'bg-blue-600 text-white shadow-md font-bold'
                : 'text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
            }`}
          >
            Stopwatch
          </button>
          <button
            onClick={() => setActiveTab('timer')}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'timer'
                ? 'bg-blue-600 text-white shadow-md font-bold'
                : 'text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
            }`}
          >
            Focus Timer
          </button>
        </div>
      </div>

      {/* Tab 1: Unix Epoch */}
      {activeTab === 'unix' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-in fade-in duration-150">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 shadow-lg">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Current Unix Timestamp (Seconds since Jan 01 1970 UTC)
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white my-2">
              {epoch}
            </div>
            <button
              onClick={handleCopyEpoch}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all hover:scale-102"
            >
              {epochCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{epochCopied ? "Copied to clipboard" : "Copy Unix Timestamp"}</span>
            </button>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-300 block">
              Quick Epoch to Date Converter
            </label>
            <input
              type="text"
              placeholder="Enter unix timestamp (e.g. 1789368000)..."
              value={customEpoch}
              onChange={(e) => handleConvertEpoch(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs font-mono text-white placeholder-zinc-500 border border-slate-200/90 dark:border-slate-800 focus:border-blue-500 focus:outline-hidden"
            />
            {convertedDate && (
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
                <strong>UTC Date:</strong> {convertedDate}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Precision Stopwatch */}
      {activeTab === 'stopwatch' && (
        <div className="flex flex-col items-center py-4 animate-in fade-in duration-150">
          {(() => {
            const { mins, secs, centis } = formatSw(swTime);
            return (
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white mb-6">
                <span>{mins}</span>:<span>{secs}</span>.<span className="text-blue-600 dark:text-blue-400 text-4xl sm:text-5xl">{centis}</span>
              </div>
            );
          })()}

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSwRunning(!swRunning)}
              type="button"
              className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:scale-102 ${
                swRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {swRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{swRunning ? "Pause" : "Start"}</span>
            </button>

            <button
              onClick={handleLap}
              disabled={!swRunning}
              type="button"
              className="px-4 py-2.5 rounded-full font-bold text-xs bg-white/10 hover:bg-white/15 text-zinc-200 border border-slate-200/90 dark:border-slate-800 disabled:opacity-40 transition-colors"
            >
              <Flag className="w-4 h-4 inline mr-1.5" />
              <span>Lap</span>
            </button>

            <button
              onClick={handleSwReset}
              type="button"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white border border-slate-200/90 dark:border-slate-800 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Laps List */}
          {laps.length > 0 && (
            <div className="w-full max-w-md space-y-1.5 max-h-40 overflow-y-auto border-t border-slate-200/90 dark:border-slate-800 pt-3">
              {laps.map((lap, idx) => {
                const { mins, secs, centis } = formatSw(lap);
                return (
                  <div key={idx} className="flex justify-between text-xs font-mono py-1 px-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-white/5">
                    <span className="text-slate-400">Lap {laps.length - idx}</span>
                    <span className="font-bold text-white">{mins}:{secs}.{centis}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Focus Timer */}
      {activeTab === 'timer' && (
        <div className="flex flex-col items-center py-4 animate-in fade-in duration-150">
          <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white mb-4">
            <span>{String(Math.floor(tmRemaining / 60)).padStart(2, '0')}</span>:
            <span className="text-blue-600 dark:text-blue-400">{String(tmRemaining % 60).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            {['5', '15', '25', '45', '60'].map((mins) => (
              <button
                key={mins}
                onClick={() => {
                  setTmMinutes(mins);
                  setTmRemaining(parseInt(mins, 10) * 60);
                  setTmRunning(false);
                }}
                type="button"
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  tmMinutes === mins
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-zinc-400 hover:text-white hover:bg-white/15'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTmRunning(!tmRunning)}
              type="button"
              className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:scale-102 ${
                tmRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {tmRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{tmRunning ? "Pause" : "Start"}</span>
            </button>

            <button
              onClick={() => {
                setTmRunning(false);
                setTmRemaining(parseInt(tmMinutes, 10) * 60);
              }}
              type="button"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/15 text-zinc-300 hover:text-white border border-slate-200/90 dark:border-slate-800 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
