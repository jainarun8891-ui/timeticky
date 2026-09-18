"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Sparkles, Calendar, Clock, Timer, ArrowRight, Share2 } from 'lucide-react';

const COUNTDOWN_INDEX_FAQS = [
  {
    question: "How does the custom event countdown calculate remaining time?",
    answer: "The countdown calculates the difference in milliseconds between your device's current system time and the target date-time. It decomposes the duration into whole days, hours, minutes, and seconds, updating every 1,000 milliseconds with browser Performance API synchronization."
  },
  {
    question: "What happens when the countdown reaches zero?",
    answer: "Upon reaching zero, the counter stops at 00:00:00, signaling the arrival of the milestone. You can reconfigure the date input at any time to set a new countdown target."
  },
  {
    question: "How do time zones impact event countdowns?",
    answer: "Global events occur at different local times depending on the viewer's longitude. For instance, midnight on New Year's Eve rolls across 24 standard time zones over a 26-hour period. Our dedicated holiday countdowns let you track the arrival of celebrations across specific international time zones."
  },
  {
    question: "Are there pre-configured countdowns for major holidays?",
    answer: "Yes! TimeNumbers provides dedicated real-time countdowns for New Year, Christmas, Halloween, Valentine's Day, Diwali, Holi, and Thanksgiving, complete with cultural notes, astronomical milestones, and time zone progression maps."
  }
];

export default function CountdownPage() {
  const [target, setTarget] = useState('2027-01-01T00:00');
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const ms = new Date(target).getTime() - Date.now();
      if (ms <= 0) setDiff({ d: 0, h: 0, m: 0, s: 0 });
      else {
        setDiff({
          d: Math.floor(ms / 86400000),
          h: Math.floor((ms % 86400000) / 3600000),
          m: Math.floor((ms % 3600000) / 60000),
          s: Math.floor((ms % 60000) / 1000)
        });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <Breadcrumbs items={[{"name":"Event Countdown","url":"/countdown"}]} />

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          Real-Time Chronometer Countdown
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Event Countdown Timer
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Create precision live countdowns for weddings, product launches, birthdays, holidays, and milestones with real-time second updates.
        </p>
      </div>

      {/* Target Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
            Select Target Date & Time:
          </label>
          <input
            type="datetime-local"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Big Counter Display */}
        <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto font-mono text-center pt-2">
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white block">{diff.d}</span>
            <span className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider mt-1 block">Days</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white block">{diff.h}</span>
            <span className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider mt-1 block">Hours</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white block">{diff.m}</span>
            <span className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider mt-1 block">Mins</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-3xl sm:text-5xl font-black text-blue-600 dark:text-blue-400 block">{diff.s}</span>
            <span className="text-xs text-slate-400 font-sans uppercase font-bold tracking-wider mt-1 block">Secs</span>
          </div>
        </div>
      </div>

      {/* Featured Holiday Countdowns Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Popular Global Holiday Countdowns
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Link href="/countdown/new-year" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">January 1</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">New Year</h3>
            <p className="text-xs text-slate-500 mt-1">Live countdown to the stroke of midnight across world timezones.</p>
          </Link>
          <Link href="/countdown/valentines-day" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 block">February 14</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-pink-600 transition-colors">Valentine's Day</h3>
            <p className="text-xs text-slate-500 mt-1">Countdown to romantic celebrations, flowers, and special moments.</p>
          </Link>
          <Link href="/countdown/holi" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">Spring Equinox</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">Holi Festival of Colors</h3>
            <p className="text-xs text-slate-500 mt-1">Live countdown to the vibrant Hindu festival of colors and joy.</p>
          </Link>
          <Link href="/countdown/halloween" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block">October 31</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">Halloween</h3>
            <p className="text-xs text-slate-500 mt-1">Countdown to trick-or-treating and autumn harvest celebrations.</p>
          </Link>
          <Link href="/countdown/diwali" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">Kartik Amavasya</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">Diwali Festival of Lights</h3>
            <p className="text-xs text-slate-500 mt-1">Track days and hours until the auspicious celebration of lights.</p>
          </Link>
          <Link href="/countdown/thanksgiving" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">4th Thursday in Nov</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-700 transition-colors">Thanksgiving Day</h3>
            <p className="text-xs text-slate-500 mt-1">Countdown to American Thanksgiving feast and family reunions.</p>
          </Link>
          <Link href="/countdown/christmas" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">December 25</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">Christmas Day</h3>
            <p className="text-xs text-slate-500 mt-1">Track days and hours until Christmas morning and holiday gatherings.</p>
          </Link>
        </div>
      </section>

      {/* Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Why Event Countdowns Drive Anticipation & Focus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Psychological Impact of Visual Timers</h3>
            <p>
              Visualizing the passage of time in explicit units of days, hours, and seconds turns abstract future deadlines into tangible reality.
              Whether organizing an international conference or counting down to a personal anniversary, visual timers keep teams aligned.
            </p>
            <p>
              In project management environments, countdown displays serve as focal anchors during product sprint launches and software release cutovers.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">International Temporal Alignment</h3>
            <p>
              When hosting global virtual events, announcing a single time zone often leads to confusion for attendees located in opposite hemispheres.
            </p>
            <p>
              Pairing an event countdown with our Time Zone Converter and Meeting Planner ensures that all attendees know the exact hour in their local city.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion
        items={COUNTDOWN_INDEX_FAQS}
        title="Event Countdown FAQs"
        subtitle="Common questions regarding countdown accuracy, time zones, and holiday tracking."
      />

      {/* Hub */}
      <RelatedLinksHub title="Explore More Countdowns & Calendars" />
    </div>
  );
}
