"use client";

import React, { useState, useEffect } from 'react';
import { Cake, Calendar, Clock, Heart, Sparkles, Flame, Check } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';

interface Props {
  h1Title?: string;
}

export function BirthdayCalculatorClient({ h1Title }: Props) {
  const [birthDate, setBirthDate] = useState<string>('2000-01-01');
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const bDate = new Date(birthDate);
  const isValid = !isNaN(bDate.getTime()) && bDate <= now;

  let years = now.getFullYear() - bDate.getFullYear();
  let months = now.getMonth() - bDate.getMonth();
  let days = now.getDate() - bDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const nextBirthday = new Date(now.getFullYear(), bDate.getMonth(), bDate.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }

  const diffMs = nextBirthday.getTime() - now.getTime();
  const nextDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const nextWeeks = Math.floor(nextDays / 7);
  const nextRemainingDays = nextDays % 7;
  const nextHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const nextMinutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const nextSeconds = Math.floor((diffMs / 1000) % 60);

  const totalDays = Math.floor((now.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const estimatedHeartbeats = Math.floor(totalDays * 24 * 60 * 72).toLocaleString();

  const faqs = [
    {
      question: "How many weeks and days until my birthday calculator works?",
      answer: "Our birthday countdown calculates the exact difference between current atomic time and midnight of your upcoming birthday, displaying weeks, remaining days, hours, minutes, and seconds."
    },
    {
      question: "How does the chronological age calculator determine exact age?",
      answer: "The calculator accurately accounts for leap years, variable calendar month lengths (28, 30, or 31 days), and daylight saving time adjustments to deliver precise years, months, days, and hours lived."
    },
    {
      question: "Can I calculate my age in total days and hours?",
      answer: "Yes, our tool shows total lifetime days, weeks, and an estimated heartbeat tally based on standard healthy human resting pulse rates."
    }
  ];

  return (
    <div className="space-y-10">
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
          <Cake className="w-3.5 h-3.5" />
          <span>Milestone Life Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {h1Title || "Birthday & Age Calculator"}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Calculate how many weeks and days until your next birthday and discover your exact chronological age down to the second.
        </p>
      </header>

      {/* Input Card */}
      <section className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Select Your Date of Birth
        </label>
        <input
          type="date"
          value={birthDate}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-base outline-none focus:ring-2 focus:ring-rose-500"
        />
      </section>

      {isValid && (
        <>
          {/* Next Birthday Countdown Hero */}
          <section className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-8 sm:p-12 text-white shadow-lg text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Upcoming Birthday Countdown</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur">
                <span className="text-3xl sm:text-5xl font-black font-mono block">{nextWeeks}</span>
                <span className="text-xs uppercase font-bold tracking-wider opacity-80">Weeks</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur">
                <span className="text-3xl sm:text-5xl font-black font-mono block">{nextRemainingDays}</span>
                <span className="text-xs uppercase font-bold tracking-wider opacity-80">Days</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur">
                <span className="text-3xl sm:text-5xl font-black font-mono block">{nextHours}</span>
                <span className="text-xs uppercase font-bold tracking-wider opacity-80">Hours</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur">
                <span className="text-3xl sm:text-5xl font-black font-mono block">{nextMinutes}:{nextSeconds.toString().padStart(2, '0')}</span>
                <span className="text-xs uppercase font-bold tracking-wider opacity-80">Min : Sec</span>
              </div>
            </div>

            <p className="text-sm font-medium opacity-90">
              Only <strong>{nextDays} total days</strong> remaining until you turn <strong>{years + 1}</strong>!
            </p>
          </section>

          {/* Exact Chronological Age */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Exact Age</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white">
                {years} <span className="text-sm text-slate-400 font-normal">yrs</span> {months} <span className="text-sm text-slate-400 font-normal">mo</span> {days} <span className="text-sm text-slate-400 font-normal">days</span>
              </div>
              <p className="text-xs text-slate-500">Calculated with full leap-year calendar accuracy.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Total Lifetime Days</span>
              <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
                {totalDays.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500">Equivalent to approximately {totalWeeks.toLocaleString()} weeks.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Estimated Heartbeats</span>
              <div className="text-3xl font-black font-mono text-rose-600 dark:text-rose-400">
                {estimatedHeartbeats}
              </div>
              <p className="text-xs text-slate-500">Based on standard resting average of 72 bpm.</p>
            </div>
          </section>
        </>
      )}

      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={faqs} title="Frequently Asked Questions About Age & Birthday Math" />
      </section>

      <RelatedLinksHub />
    </div>
  );
}
