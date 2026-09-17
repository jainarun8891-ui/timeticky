import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { siteConfig } from '@/lib/config/site.config';
import { Clock, Globe, Zap, ShieldCheck, Compass, Cpu, Sparkles } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'About Us — Chronometry Mission',
  'Learn about the TimeNumbers mission: providing atomic precision, clean user experience, and privacy-respecting time utilities worldwide.',
  '/about'
);

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'About TimeNumbers', url: '/about' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>Atomic Time & Planetary Chronometry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About {siteConfig.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {siteConfig.name} is a high-precision, privacy-first global time observatory and digital horology suite engineered for remote workers, travelers, astronomers, and software developers worldwide.
        </p>
      </div>

      {/* Core Mission & Story */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            1. Our Mission: Simplifying Global Coordination
          </h2>
          <p>
            In an increasingly distributed global economy, cross-border teams coordinate daily across multiple longitudinal meridians and shifting daylight saving schedules. Yet for over two decades, the web’s time portals remained slow, ad-choked, battery-draining, and visually outdated.
          </p>
          <p>
            We created {siteConfig.name} to redefine digital horology. Our platform delivers instantaneous, sub-second accurate timekeeping, sophisticated meeting overlap matrices, and astronomical solar tables wrapped in an elegant, distraction-free user experience.
          </p>
        </section>

        {/* Technical Pillar Cards */}
        <section className="space-y-4 pt-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            2. Precision Chronometry Architecture
          </h2>
          <p>
            Precision timekeeping requires more than querying a standard system clock. {siteConfig.name} combines four foundational engineering layers to guarantee horological integrity:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4" /> Stratum-1 Atomic Sync
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Synchronized directly with NIST and BIPM caesium atomic clocks via low-latency Network Time Protocol (NTP) servers, measuring and correcting device clock drift in real time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                <Globe className="w-4 h-4" /> Canonical IANA Database
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Backed by the latest Internet Assigned Numbers Authority (IANA) tzdata release, maintaining historical and future daylight saving time decrees across 400+ international zones.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" /> NOAA Solar Algorithms
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Calculates sunrise, sunset, solar noon, dawn, dusk, civil twilight, and golden hour windows using authoritative NOAA solar ephemeris and Jean Meeus astronomical formulas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Zero-Drift Client Engine
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Uses high-resolution monotonic hardware timers (`performance.now()`) to maintain exact tick intervals even when browser tabs enter background throttling mode.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            3. Our Guiding Principles
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li><strong>Zero Tracking & Privacy Respect:</strong> We never log your browsing habits, never deploy invasive ad-trackers, and persist all customizations locally on your device.</li>
            <li><strong>Blazing Fast Performance:</strong> Built with modern server-side prerendering and edge CDN delivery to load in milliseconds on mobile devices across 2G, 3G, and 5G connections.</li>
            <li><strong>High Contrast & Accessible:</strong> Designed with clean typography, clear numerical legibility, full keyboard navigability, and native Dark/OLED mode for night viewing.</li>
            <li><strong>Ad-Free Utility:</strong> We keep the interface distraction-free so you can check the time, start a timer, or schedule a meeting without banners or popups.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            4. Connect With Our Chronometry Desk
          </h2>
          <p>
            Have feedback, a feature request, or an upcoming civil daylight saving decree correction to report? We actively review suggestions from time enthusiasts, developers, and global travelers. Feel free to contact our engineering team anytime.
          </p>
        </section>

      </div>

      <RelatedLinksHub
        currentPath="/about"
        title="Explore What TimeNumbers Offers"
        subtitle="Check out live atomic clocks, time difference tools, and planetary solar maps."
      />
    </div>
  );
}
