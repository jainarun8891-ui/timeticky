"use client";

import React, { useState, useEffect } from 'react';
import { syncWithServer, SyncState } from '@/lib/time/sync';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  Maximize2,
  ShieldCheck,
  Cpu,
  Laptop,
  Smartphone
} from 'lucide-react';
import { HubPageCustomContent } from '@/lib/seo/hub-pages-custom-content';

interface Props {
  content: HubPageCustomContent;
}

export function ClockAccuracyClient({ content }: Props) {
  const [sync, setSync] = useState<SyncState | null>(null);
  const [loading, setLoading] = useState(true);

  const check = () => {
    setLoading(true);
    syncWithServer().then(res => {
      setSync(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    check();
  }, []);

  const offset = sync?.offsetMs ?? 0;
  const absOffset = Math.abs(offset);
  const isExact = absOffset < 200;
  const isSlight = absOffset >= 200 && absOffset < 1000;
  const isFast = offset < -100;
  const isSlow = offset > 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Clock Accuracy", url: "/clock-accuracy" }]} />
      <JsonLd type="faq" data={content.faqs} />

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Stratum-1 Atomic Synchronization</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {content.h1}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          {content.description}
        </p>
      </header>

      {/* Main Measurement Card */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
        <div className="max-w-md mx-auto space-y-6">
          <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center transition-all ${
            isExact
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'
              : isSlight
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50'
          }`}>
            {isExact ? <CheckCircle2 className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
              Device Synchronization Status
            </span>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {loading ? (
                'Measuring offset...'
              ) : isExact ? (
                'Your clock is synchronized!'
              ) : isFast ? (
                `Your clock is fast by ${absOffset} ms`
              ) : (
                `Your clock is slow by ${absOffset} ms`
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Estimated measurement accuracy: ±{sync?.accuracyMs || 10} ms via NTP-synchronized server round-trip.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Calculated Drift</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                {offset > 0 ? `+${offset} ms` : `${offset} ms`}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Atomic Reference</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">UTC (NIST)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={check}
              disabled={loading}
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Measuring...' : 'Re-verify Clock Accuracy'}</span>
            </button>
            <Link
              href="/atomic-clock"
              className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-2 transition-all"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>View Atomic Clock</span>
            </Link>
            <Link
              href="/fullscreen-clock"
              className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs inline-flex items-center gap-2 transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen Seconds</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-sm">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Hardware Clock Diagnostics</span>
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
                  Diagnose quartz oscillator drift caused by processor thermal throttling, CMOS battery aging, or NTP poll latency.
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion items={content.faqs} title="Frequently Asked Questions About Clock Accuracy" />

      <RelatedLinksHub />
    </div>
  );
}
