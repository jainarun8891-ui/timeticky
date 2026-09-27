"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Calendar, Clock, Share2, Maximize2, Minimize2, Check,
  Sparkles, Plus, ExternalLink, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  eventName: string;
  targetIso: string;
  description: string;
  eventSlug: string;
  culturalNote?: string;
  emoji?: string;
}

const POPULAR_COUNTDOWNS = [
  { slug: 'new-year', name: 'New Year', emoji: '🎆' },
  { slug: 'christmas', name: 'Christmas', emoji: '🎄' },
  { slug: 'halloween', name: 'Halloween', emoji: '🎃' },
  { slug: 'valentines-day', name: "Valentine's Day", emoji: '❤️' },
  { slug: 'diwali', name: 'Diwali', emoji: '🪔' },
  { slug: 'holi', name: 'Holi', emoji: '🎨' },
  { slug: 'thanksgiving', name: 'Thanksgiving', emoji: '🦃' },
];

export function CountdownEventClient({
  eventName,
  targetIso,
  description,
  eventSlug,
  culturalNote,
  emoji = '⏳',
}: Props) {
  const [now, setNow] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const firedConfettiRef = useRef(false);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cur = now || new Date();
  const targetDate = new Date(targetIso);
  const diffMs = targetDate.getTime() - cur.getTime();
  const isPast = diffMs <= 0;

  // Trigger celebration confetti when time reaches zero
  useEffect(() => {
    if (isPast && !firedConfettiRef.current && typeof window !== 'undefined') {
      firedConfettiRef.current = true;
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [isPast]);

  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(`Countdown to ${eventName} on TimeTicky!`);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }
  };

  const shareToWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(`Countdown to ${eventName}: ${window.location.href}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  const toggleFullscreen = () => {
    if (typeof document === 'undefined') return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="space-y-8">
      {/* Event Preset Navigation Pills */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {POPULAR_COUNTDOWNS.map((item) => {
              const isActive = eventSlug === item.slug;
              return (
                <Link
                  key={item.slug}
                  href={`/countdown/${item.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/countdown"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Custom Countdown</span>
          </Link>
        </div>
      </div>

      {/* Main Countdown Hero Card */}
      <section
        aria-label={`Countdown to ${eventName}`}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm relative overflow-hidden text-center space-y-8"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Action Header */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <span className="text-base">{emoji}</span>
            <span>Live Precision Countdown</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={shareToTwitter}
              aria-label="Share on X / Twitter"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer hidden sm:inline-flex"
            >
              Post to X
            </button>
            <button
              type="button"
              onClick={shareToWhatsApp}
              aria-label="Share on WhatsApp"
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer hidden sm:inline-flex"
            >
              WhatsApp
            </button>
            <button
              type="button"
              onClick={copyShareLink}
              aria-label="Copy share link"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
              title="Fullscreen presentation mode"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title and Target Info with Semantic <time> */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Countdown to {eventName}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            {description}
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>Target: </span>
            <time dateTime={targetDate.toISOString()}>
              {targetDate.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} at {targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
          </div>
        </div>

        {/* Big Digit Counters with Semantic <time> */}
        {!isPast ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
            <article className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <time dateTime={`P${days}D`} className="text-4xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white block">
                {days}
              </time>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                Days
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <time dateTime={`PT${hours}H`} className="text-4xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white block">
                {String(hours).padStart(2, '0')}
              </time>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                Hours
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <time dateTime={`PT${minutes}M`} className="text-4xl sm:text-6xl font-mono font-black text-slate-900 dark:text-white block">
                {String(minutes).padStart(2, '0')}
              </time>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                Minutes
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
              <time dateTime={`PT${seconds}S`} className="text-4xl sm:text-6xl font-mono font-black text-blue-600 dark:text-blue-400 block">
                {String(seconds).padStart(2, '0')}
              </time>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                Seconds
              </div>
            </article>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black">🎉 {eventName} has arrived!</h2>
            <p className="text-sm">The scheduled target moment has reached zero.</p>
          </div>
        )}

        {/* Cultural / Context Note */}
        {culturalNote && (
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto border-t border-slate-100 dark:border-slate-800 pt-6">
            <strong>About this event:</strong> {culturalNote}
          </p>
        )}
      </section>
    </div>
  );
}
