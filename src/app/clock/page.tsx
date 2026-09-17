"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Maximize2, Minimize2, Moon, Sun, Clock, ShieldCheck, Zap, Radio } from 'lucide-react';
import { getSyncedDate } from '@/lib/time/sync';

const CLOCK_FAQS = [
  {
    question: "How does this online digital clock maintain atomic accuracy?",
    answer: "TimeNumbers synchronizes with Network Time Protocol (NTP) servers anchored to international atomic clock standards (UTC). We perform real-time drift estimation to calibrate your browser clock against true UTC down to milliseconds."
  },
  {
    question: "Why does my computer or phone clock sometimes drift?",
    answer: "Consumer electronic clocks rely on quartz crystal oscillators, which are susceptible to temperature fluctuations, battery aging, and hardware manufacturing variances. Without frequent internet time synchronization, standard computer clocks can drift by several seconds per month."
  },
  {
    question: "What is the benefit of the 24-hour time format?",
    answer: "The 24-hour time notation (00:00 to 23:59) eliminates the ambiguity between morning (AM) and evening (PM) hours. It is the mandatory global standard in civil aviation, emergency healthcare, military logistics, astronomy, and international maritime navigation."
  },
  {
    question: "How can I use this digital clock in fullscreen mode?",
    answer: "Click the fullscreen icon located in the upper right control bar. The clock will expand to encompass your entire display with high-contrast typography, making it ideal as a desk clock, classroom display, or video broadcast backdrop."
  },
  {
    question: "Does the digital clock keep running when the browser tab is hidden?",
    answer: "Yes. The clock computes its display based on the live system clock rather than relying on background interval counters. Whenever you bring the tab back into focus, the displayed time is immediately 100% synchronized."
  }
];

export default function ClockPage() {
  const [time, setTime] = useState(new Date());
  const [is24, setIs24] = useState(false);
  const [showSec, setShowSec] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(getSyncedDate()), 1000);
    return () => clearInterval(t);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const h = is24 ? time.getHours() : (time.getHours() % 12 || 12);
  const str = `${String(h).padStart(is24 ? 2 : 1, '0')}:${String(time.getMinutes()).padStart(2, '0')}${showSec ? ':' + String(time.getSeconds()).padStart(2, '0') : ''}`;
  const period = !is24 ? (time.getHours() >= 12 ? 'PM' : 'AM') : '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Semantic Breadcrumbs & Schema.org JSON-LD */}
        <Breadcrumbs items={[{ name: 'Digital Clock', url: '/clock' }]} />

        {/* Main Clock Stage Card */}
        <div className={`w-full rounded-3xl border transition-all duration-300 p-8 sm:p-16 flex flex-col items-center justify-center select-none relative overflow-hidden ${
          isDark
            ? 'bg-slate-950 border-slate-800 text-white shadow-lg shadow-black/40'
            : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
        }`}>
          {/* Subtle Radial Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Info Header */}
          <div className="flex items-center justify-between w-full mb-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 text-blue-600" />
              <h1 className="text-xs font-semibold text-slate-600 dark:text-slate-300">Synchronized Live Atomic Chronometer</h1>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
              <button
                onClick={() => setIs24(!is24)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  is24 ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {is24 ? '24H' : '12H'}
              </button>
              <button
                onClick={() => setShowSec(!showSec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  showSec ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {showSec ? 'Seconds' : 'Minutes Only'}
              </button>
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                title="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                title="Fullscreen Mode"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Time Display */}
          <div className="text-center space-y-4 my-6">
            <div className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black font-mono tracking-tight leading-none drop-shadow-sm flex items-baseline justify-center">
              <span>{str}</span>
              {period && (
                <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-extrabold text-blue-600 dark:text-blue-400 ml-4">
                  {period}
                </span>
              )}
            </div>

            <p className="text-base sm:text-xl font-bold text-slate-500 dark:text-slate-400">
              {time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Informative Science Guide */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Atomic Timekeeping & Digital Precision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Network Time Protocol (NTP) Synchronicity</h3>
              <p>
                Civil time is coordinated globally through the International Bureau of Weights and Measures (BIPM), which pools data from hundreds of atomic cesium beam standards and hydrogen masers worldwide to establish International Atomic Time (TAI) and Coordinated Universal Time (UTC).
              </p>
              <p>
                Our web clock queries high-stratum time servers to measure transmission delay and offset variance, delivering time synchronization that exceeds the accuracy of unassisted device operating systems.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">High-Legibility Digital Display Design</h3>
              <p>
                Whether monitoring live television broadcast countdowns, bidding on digital auctions, or coordinating time-critical financial trades, precision seconds are indispensable.
              </p>
              <p>
                TimeNumbers features responsive monospaced typography with customizable 12-hour/24-hour switching, full-screen capability, and dark room night mode to protect vision during extended sessions.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <FaqAccordion
          items={CLOCK_FAQS}
          title="Digital Clock FAQs"
          subtitle="Answers to common questions regarding atomic clock synchronization and digital time displays."
        />

        {/* Related Links Hub */}
        <RelatedLinksHub title="Explore More Clocks & Tools" />
      </div>
    </div>
  );
}
