"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Play, Pause, RotateCcw, Flag, Timer, Copy, Check } from 'lucide-react';

export default function StopwatchPage() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const startRef = useRef(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      startRef.current = performance.now() - ms;
      const loop = () => {
        setMs(performance.now() - startRef.current);
        animRef.current = requestAnimationFrame(loop);
      };
      animRef.current = requestAnimationFrame(loop);
    } else if (animRef.current) cancelAnimationFrame(animRef.current);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [running]);

  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);

  const copyLaps = () => {
    const text = laps.map((l, i) => `Lap ${laps.length - i}: ${(l / 1000).toFixed(2)}s`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Semantic Breadcrumbs & Schema.org JSON-LD */}
        <Breadcrumbs items={[{ name: 'Stopwatch', url: '/stopwatch' }]} />

        {/* Title Header */}
        <div className="space-y-1 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Timer className="w-3.5 h-3.5" />
            Millisecond Precision Chronometer
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Online Precision Stopwatch
          </h1>
        </div>

        {/* Stopwatch Main Display Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-14 shadow-sm text-center relative overflow-hidden space-y-8">
          <div className="font-mono font-black text-6xl sm:text-8xl md:text-9xl text-slate-900 dark:text-white tracking-tight select-none">
            {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}.<span className="text-blue-600 dark:text-blue-400">{String(cs).padStart(2, '0')}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setRunning(!running)}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
            >
              {running ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              <span>{running ? 'Pause' : 'Start'}</span>
            </button>

            <button
              onClick={() => running && setLaps([ms, ...laps])}
              disabled={!running}
              className="px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-base flex items-center gap-2 transition-all disabled:opacity-40"
            >
              <Flag className="w-5 h-5" />
              <span>Lap</span>
            </button>

            <button
              onClick={() => { setRunning(false); setMs(0); setLaps([]); }}
              className="px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-base flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Lap Splits Table */}
          {laps.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recorded Lap Splits ({laps.length})
                </span>
                <button
                  onClick={copyLaps}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy All Laps'}
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                {laps.map((l, i) => (
                  <div key={i} className="py-2.5 flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-500">Lap {laps.length - i}</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{(l / 1000).toFixed(2)}s</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hub Navigation */}
        <RelatedLinksHub title="Explore More Clocks & Timers" />
      </div>
    </div>
  );
}
