import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { AlarmClockClient } from './AlarmClockClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Bell, Clock, Volume2, ShieldCheck } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Online Alarm Clock — Loud Bedside Alarm',
  'Set multi-alarms online with customizable synthetic audio chimes (zen bell, marimba, pulse), snooze, nightstand dimming, and fullscreen bedside display.',
  '/alarm'
);

const ALARM_FAQS = [
  {
    question: "Will this online alarm clock ring if my computer goes to sleep?",
    answer: "Web browsers can only execute timers while your computer remains awake. To ensure your alarm rings reliably, adjust your computer power settings to prevent automatic sleep mode or keep the tab active."
  },
  {
    question: "How do the audio sounds work without downloading MP3 files?",
    answer: "All alarm chimes are synthesized smoothly in your browser using natural acoustic harmonic frequencies (zen singing bowls, warm marimba, and crisp digital pulses). Because no external sound files have to be loaded, the alarm rings instantaneously with zero lag, even if your internet connection drops."
  },
  {
    question: "Can I use Fullscreen Nightstand Mode on a tablet or bedside phone?",
    answer: "Yes! Click the Maximize icon or press 'F' on your keyboard to enter fullscreen mode. You can also toggle the Moon icon for an ultra-dim nightstand display designed to reduce blue light in dark bedrooms."
  },
  {
    question: "How does the Snooze feature operate?",
    answer: "When an alarm triggers, you can choose to snooze for 5 minutes or 10 minutes. The alarm automatically arms a temporary follow-up timer and will ring again after the selected interval."
  }
];

export default function AlarmPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Online Alarm Clock","url":"/alarm"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Online Alarm Clock', url: '/alarm' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Bell className="w-3.5 h-3.5" />
            High-Precision Audio Synthesis & Bedside Clock
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Online Alarm Clock & Chimes
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Configure multiple customizable alarms with zero-dependency Web Audio synthetic chimes, snooze, and fullscreen nightstand kiosk mode.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Web Audio Synthetic Chimes</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Snooze & Multi-Alarm Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Bedside Nightstand Display</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alarm Client Component */}
      <AlarmClockClient />

      {/* FAQs */}
      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Online Alarm Clock"
          subtitle="Tips on ensuring your alarm rings on time and optimizing bedside nightstand displays."
          items={ALARM_FAQS}
        />
      </div>

      {/* Related Links */}
      <RelatedLinksHub
        currentPath="/alarm"
        title="Explore Related Productivity Clocks"
        subtitle="Discover our stopwatch, countdown timer, and atomic clock accuracy testing."
      />
    </div>
  );
}
