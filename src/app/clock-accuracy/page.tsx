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

export default function ClockAccuracyPage() {
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

  const faqs = [
    {
      question: "Is my computer clock fast or slow?",
      answer: offset === 0
        ? "Your computer clock is currently synchronized with atomic time (0 ms offset)."
        : isFast
        ? `Your computer clock is fast by approximately ${absOffset} milliseconds compared to atomic time.`
        : isSlow
        ? `Your computer clock is slow by approximately ${absOffset} milliseconds compared to atomic time.`
        : "Your device clock is accurate to within standard network latency tolerances."
    },
    {
      question: "How to check if my computer clock is accurate?",
      answer: "GlobalTime measures the network round-trip time between your browser and our Stratum-1 NTP synchronized server infrastructure. The calculated offset represents the exact drift of your local device clock against coordinated universal atomic time (UTC)."
    },
    {
      question: "Why does my computer clock lose or gain time?",
      answer: "Hardware clocks rely on quartz crystal oscillators, which fluctuate with temperature changes, battery wear (CMOS battery on motherboards), and CPU workloads. Most modern operating systems periodically re-sync with internet time servers (NTP) to correct this natural drift."
    },
    {
      question: "How do I fix a fast or slow clock on Windows or Mac?",
      answer: "On Windows: Open Settings > Time & Language > Date & Time, and click 'Sync now' under Additional settings. On macOS: Open System Settings > General > Date & Time, toggle 'Set time and date automatically' off and on."
    }
  ];

  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Clock Accuracy","url":"/clock-accuracy"}]} />
      

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Stratum-1 Atomic Synchronization</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Clock Accuracy Verification
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Measure whether your computer, mobile device, or office display clock is fast, slow, or perfectly synchronized with official atomic time.
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

      {/* Guide Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Laptop className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Windows 10 &amp; 11</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Open <strong>Settings &gt; Time &amp; Language &gt; Date &amp; Time</strong>. Scroll to <em>Additional settings</em> and click the <strong>Sync now</strong> button to re-sync with time.windows.com.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Apple macOS</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Go to <strong>System Settings &gt; General &gt; Date &amp; Time</strong>. Ensure <em>Set time and date automatically</em> is enabled via time.apple.com.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">iOS &amp; Android</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Toggle <strong>Set Automatically</strong> off and on in your device date and time settings. Cellular network towers automatically broadcast NITZ time signals.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={faqs} title="Frequently Asked Questions About Clock Accuracy" />
      </section>

      <RelatedLinksHub />
    </div>
  );
}
