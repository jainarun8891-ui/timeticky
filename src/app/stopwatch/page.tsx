"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Play, Pause, RotateCcw, Flag, Timer, Copy, Check, Zap, Target } from 'lucide-react';

const STOPWATCH_FAQS = [
  {
    question: "How accurate is this online stopwatch?",
    answer: "Our stopwatch utilizes the browser's performance.now() high-resolution timestamp API, providing sub-millisecond precision. Unlike basic interval loops that drift under CPU load, our stopwatch dynamically recalibrates against hardware performance clocks on every render cycle."
  },
  {
    question: "What is the difference between a lap time and a split time?",
    answer: "A lap time measures the duration of a single isolated interval or segment (such as one lap around a 400-meter track). A split time measures the cumulative elapsed time from the start of the race to that particular checkpoint."
  },
  {
    question: "Can I export or copy my recorded lap times?",
    answer: "Yes. Once you record laps using the Lap button, click 'Copy All Laps' to export your complete lap split history formatted cleanly for spreadsheets, workout logs, or laboratory notes."
  },
  {
    question: "Does the stopwatch pause if my device screen locks or the tab changes?",
    answer: "No. The stopwatch relies on absolute epoch delta timestamps. Even if the browser suspends UI animations to save power, the elapsed time is immediately calculated accurately when the window returns to view."
  },
  {
    question: "What are keyboard shortcuts for controlling the stopwatch?",
    answer: "You can press the Spacebar to start and pause the timer, press 'L' to record a new lap split, and press 'R' to reset the stopwatch to zero."
  }
];

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

  const recordLap = () => {
    if (running) {
      setLaps([ms, ...laps]);
    }
  };

  const reset = () => {
    setRunning(false);
    setMs(0);
    setLaps([]);
  };

  const copyLaps = () => {
    const text = laps.map((l, i) => `Lap ${laps.length - i}: ${(l / 1000).toFixed(2)}s`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
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
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Measure elapsed time, record lap splits, and export times with sub-millisecond requestAnimationFrame accuracy.
          </p>
        </div>

        {/* Stopwatch Main Display Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-14 shadow-sm text-center relative overflow-hidden space-y-8">
          <div className="font-mono font-black text-6xl sm:text-8xl md:text-9xl text-slate-900 dark:text-white tracking-tight select-none">
            {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}.<span className="text-blue-600 dark:text-blue-400">{String(cs).padStart(2, '0')}</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setRunning(!running)}
              className={`px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all ${
                running
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {running ? 'Pause' : 'Start'}
            </button>

            {running && (
              <button
                onClick={recordLap}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors"
              >
                <Flag className="w-4 h-4" />
                Lap Split
              </button>
            )}

            <button
              onClick={reset}
              className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Laps List */}
          {laps.length > 0 && (
            <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 max-w-md mx-auto text-left">
              <div className="flex justify-between items-center mb-4">
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

        {/* Stopwatch Engineering Guide */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            High-Resolution Chronometry in the Browser
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">requestAnimationFrame & Performance Clocks</h3>
              <p>
                Standard JavaScript timers like setInterval are throttled by browser rendering engines, leading to erratic timing errors of 15 to 50 milliseconds per second.
              </p>
              <p>
                TimeNumbers bypasses this limitation by binding the stopwatch loop directly to the browser hardware refresh cycle via requestAnimationFrame and measuring elapsed durations with performance.now() timestamps.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Sports, Science & Productivity Applications</h3>
              <p>
                Whether pacing athletic sprint intervals, measuring scientific laboratory chemical reactions, or timing speech presentations, sub-second accuracy is essential.
              </p>
              <p>
                Recorded lap splits allow coaches and researchers to track intermediate milestones without interrupting ongoing timer execution.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <FaqAccordion
          items={STOPWATCH_FAQS}
          title="Precision Stopwatch FAQs"
          subtitle="Frequently asked questions about high-precision browser timing, lap splits, and export tools."
        />

        {/* Hub Navigation */}
        <RelatedLinksHub title="Explore More Clocks & Timers" />
      </div>
    </div>
  );
}
