import React from 'react';
import { Metadata } from 'next';
import { FullscreenClockClient } from './FullscreenClockClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Maximize2, Monitor, Keyboard, ShieldCheck, Clock, Zap } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Full Screen Digital Clock — Kiosk Display',
  'Full-screen precision online digital clock. Auto-hiding controls, high-contrast typography, millisecond precision, and keyboard shortcuts for meetings, classrooms, and kiosks.',
  '/fullscreen-clock'
);

export default function FullscreenClockPage() {
  const faqs = [
    {
      question: "How do I toggle full screen mode?",
      answer: "Click the Maximize icon in the top toolbar or press the 'F' key on your keyboard. In full-screen mode, browser navigation bars, tabs, and operating system toolbars are hidden for an immersive display. Press 'Escape' or 'F' again to exit."
    },
    {
      question: "Will the clock keep ticking accurately if my device is unplugged or on battery saver?",
      answer: "Yes. The clock computes time using native system hardware interrupts and performance counters. It automatically corrects for background tab throttling and maintains microsecond synchronization with official atomic time."
    },
    {
      question: "How do I hide the control buttons for a clean kiosk display?",
      answer: "Controls automatically fade away after 3.5 seconds of mouse inactivity. To show the toolbar again, simply move your mouse cursor or tap anywhere on touch devices."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Fullscreen Interactive Clock App */}
      <FullscreenClockClient />

      {/* Static SEO Guide & Documentation (Scrollable below or for crawlers) */}
      <div className="bg-slate-900 border-t border-slate-800 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <Breadcrumbs items={[{ name: 'Full Screen Clock', url: '/fullscreen-clock' }]} />

          {/* Intro Overview */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 text-blue-300 border border-blue-800 text-xs font-bold">
              <Monitor className="w-3.5 h-3.5" />
              <span>Distraction-Free Chronometer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              About the Full Screen Digital Clock
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Designed for classrooms, corporate conference rooms, television production studios, trading floors, and ambient smart displays, the TimeNumbers Full Screen Clock provides an ultra-clean, high-contrast digital chronometer view that eliminates visual clutter.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
                <Maximize2 className="w-4 h-4" /> Kiosk & Ambient Display
              </div>
              <p className="text-slate-400 leading-relaxed">
                Expands edge-to-edge with auto-hiding controls, preventing screen distraction on office wall monitors, iPads, and living room smart TVs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Keyboard className="w-4 h-4" /> Keyboard Shortcuts
              </div>
              <p className="text-slate-400 leading-relaxed">
                Press &lsquo;F&rsquo; for full-screen, &lsquo;D&rsquo; for dark/light theme, &lsquo;T&rsquo; for 12/24-hour format, and &lsquo;S&rsquo; for toggling seconds display.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" /> Millisecond Precision
              </div>
              <p className="text-slate-400 leading-relaxed">
                Optional 60fps millisecond counter rendered via requestAnimationFrame for precision science experiments and athletic timing.
              </p>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="bg-slate-800/40 rounded-3xl border border-slate-800 p-8 space-y-4 text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Popular Use Cases & Setup Tips
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              <li><strong>Classroom & Exam Hall Timers:</strong> Display an authoritative, clearly visible digital clock on projection screens during standardized testing and university lectures.</li>
              <li><strong>Webinar & Video Call Backgrounds:</strong> Keep track of meeting start and end times during Zoom, Microsoft Teams, and Google Meet presentations.</li>
              <li><strong>Bedside & Desk Nightstand:</strong> Switch to OLED Pure Dark mode to reduce ambient room light and conserve laptop battery overnight.</li>
              <li><strong>Trading Desks & Call Centers:</strong> Select any international IANA time zone to monitor overseas market opening bells in London, Tokyo, or New York.</li>
            </ul>
          </div>

          {/* Structured FAQs */}
          <FaqAccordion
            title="Frequently Asked Questions: Full Screen Clock"
            subtitle="Guidance on shortcuts, kiosk display settings, and precision timing."
            items={faqs}
          />

          <RelatedLinksHub
            currentPath="/fullscreen-clock"
            title="Explore More Precision Clocks"
            subtitle="Try the sweeping analog clock, world clock wall, or countdown timer."
          />
        </div>
      </div>
    </div>
  );
}
