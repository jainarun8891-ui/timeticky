"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { Play, Pause, RotateCcw, Flag, Timer, Copy, Check, Zap, Target } from 'lucide-react';
import { HubPageCustomContent } from '@/lib/seo/hub-pages-custom-content';

interface Props {
  content: HubPageCustomContent;
}

export function StopwatchClient({ content }: Props) {
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

  const recordLap = () => {
    if (running) {
      setLaps(prev => [ms, ...prev]);
    }
  };

  const reset = () => {
    setRunning(false);
    setMs(0);
    setLaps([]);
  };

  // Keyboard Shortcuts: Spacebar = Start/Pause, 'L' = Lap, 'R' = Reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setRunning(r => !r);
      } else if (e.key === 'l' || e.key === 'L') {
        if (running) {
          e.preventDefault();
          recordLap();
        }
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        reset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [running, ms]);

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Semantic Breadcrumbs & Schema.org JSON-LD */}
        <Breadcrumbs items={[{ name: 'Stopwatch', url: '/stopwatch' }]} />
        <JsonLd type="faq" data={content.faqs} />
        <JsonLd
          type="application"
          data={{
            name: "Online Precision Stopwatch",
            category: "UtilitiesApplication",
            description: content.description
          }}
        />

        {/* Title Header */}
        <div className="space-y-1 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Timer className="w-3.5 h-3.5" />
            Millisecond Precision Chronometer
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {content.h1}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {content.description}
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

          <div className="pt-2 text-xs text-slate-400">
            Keyboard Shortcuts: <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono text-[10px]">Space</kbd> Start/Pause &middot; <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono text-[10px]">L</kbd> Lap Split &middot; <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 font-mono text-[10px]">R</kbd> Reset
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

        {/* Educational Guide Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>Sub-Millisecond Chronometry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {content.headings[0]}
            </h2>
            {content.page_text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}
          </div>

          {content.headings.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {content.headings.slice(1).map((heading, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {heading}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Accurate interval measurements, split mathematics, and athletic training applications.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FAQ Accordion */}
        <FaqAccordion
          items={content.faqs}
          title="Frequently Asked Questions About Online Stopwatch"
          subtitle="Answers on hardware timing accuracy, lap tracking, background tab persistence, and shortcuts."
        />

        {/* Hub Navigation */}
        <RelatedLinksHub title="Explore More Clocks & Timers" />
      </div>
    </div>
  );
}
