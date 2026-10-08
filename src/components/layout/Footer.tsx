import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 mt-16 py-10 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          {/* Left: Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
              <Globe className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              {siteConfig.name}
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              A more connected world
            </span>
          </div>

          {/* Right: Tagline */}
          <div className="text-xs font-medium text-slate-400 dark:text-slate-500 text-center md:text-right">
            Precision Chronometry • Canonical IANA Timezones • Sub-Millisecond NTP Synchronization
          </div>
        </div>

        {/* Links Grid: 7 Structured Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 font-medium text-xs">
          {/* 1. Clocks & Dials */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              Clocks & Dials
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href="/world-clock" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">World Clock Dashboard</Link></li>
              <li><Link prefetch={false} href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Global Clocks Home</Link></li>
              <li><Link prefetch={false} href="/clock" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Exact Time Clock</Link></li>
              <li><Link prefetch={false} href="/analog-clock" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Analog Clock Dial</Link></li>
              <li><Link prefetch={false} href="/fullscreen-clock" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Fullscreen Desk Clock</Link></li>
              <li><Link prefetch={false} href="/world-clock-wall" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Multi-Clock World Wall</Link></li>
              <li><Link prefetch={false} href="/atomic-clock" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Atomic Clock Standard</Link></li>
              <li><Link prefetch={false} href="/clock-accuracy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Clock Accuracy Test</Link></li>
            </ul>
          </div>

          {/* 2. Timers & Productivity */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              Timers & Audio
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href="/pomodoro" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pomodoro Timer</Link></li>
              <li><Link prefetch={false} href="/timer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Countdown Timer</Link></li>
              <li><Link prefetch={false} href="/countdown" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Countdown Events</Link></li>
              <li><Link prefetch={false} href="/life-in-weeks" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold text-rose-600 dark:text-rose-400">Life in Weeks (Memento Mori)</Link></li>
              <li><Link prefetch={false} href="/stopwatch" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Online Stopwatch</Link></li>
              <li><Link prefetch={false} href="/alarm" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Online Alarm Clock</Link></li>
              <li><Link prefetch={false} href="/calendar" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Global Calendar</Link></li>
              <li><Link prefetch={false} href="/holidays" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">World Public Holidays</Link></li>
              <li><Link prefetch={false} href="/today" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Today&apos;s Date & Details</Link></li>
              <li><Link prefetch={false} href="/week-number" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">ISO Week Number</Link></li>
            </ul>
          </div>

          {/* 3. Calculators & Converters */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              Calculators
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href="/converter" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Time Zone Converter</Link></li>
              <li><Link prefetch={false} href="/sleep-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold text-blue-600 dark:text-blue-400">Sleep Cycle Calculator</Link></li>
              <li><Link prefetch={false} href="/meeting-cost-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold text-emerald-600 dark:text-emerald-400">Meeting Cost Calculator</Link></li>
              <li><Link prefetch={false} href="/converter/difference" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">City Time Differences</Link></li>
              <li><Link prefetch={false} href="/converter/compare" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compare World Cities</Link></li>
              <li><Link prefetch={false} href="/converter" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">552 Timezone Pairs</Link></li>
              <li><Link prefetch={false} href="/meeting-planner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Meeting Planner Grid</Link></li>
              <li><Link prefetch={false} href="/overlap-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Overlap Calculator</Link></li>
              <li><Link prefetch={false} href="/date-difference" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Date Difference</Link></li>
              <li><Link prefetch={false} href="/date-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Date Add / Subtract</Link></li>
              <li><Link prefetch={false} href="/business-days-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Business Days</Link></li>
              <li><Link prefetch={false} href="/birthday-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Birthday & Age</Link></li>
            </ul>
          </div>

          {/* 4. Timezones & Travel */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              Timezones & Map
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href="/united-states-time-now" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">US Time Now</Link></li>
              <li><Link prefetch={false} href="/time-zones" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">400+ Time Zones</Link></li>
              <li><Link prefetch={false} href="/timezone-map" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Interactive Time Map</Link></li>
              <li><Link prefetch={false} href="/world-map" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">World Sun Map (Live)</Link></li>
              <li><Link prefetch={false} href="/cities" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">World Cities Directory</Link></li>
              <li><Link prefetch={false} href="/countries" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Country Time Directory</Link></li>
              <li><Link prefetch={false} href="/meeting-planner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Meeting Planner</Link></li>
              <li><Link prefetch={false} href="/overlap-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Overlap Calculator</Link></li>
              <li><Link prefetch={false} href="/dialing-codes" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dialing Codes</Link></li>
              <li><Link prefetch={false} href="/jet-lag-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Jet Lag Calculator</Link></li>
            </ul>
          </div>

          {/* 5. Solar, Lunar & Ephemeris */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              Sun & Moon Lab
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href="/sun" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Astronomy & Sun Hub</Link></li>
              <li><Link prefetch={false} href="/golden-hour" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Golden Hour Times</Link></li>
              <li><Link prefetch={false} href="/sun" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sunrise & Sunset</Link></li>
              <li><Link prefetch={false} href="/sun/new-york" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sun: New York</Link></li>
              <li><Link prefetch={false} href="/sun/london" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sun: London</Link></li>
              <li><Link prefetch={false} href="/sun/delhi" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sun: Delhi</Link></li>
              <li><Link prefetch={false} href="/sun/tokyo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sun: Tokyo</Link></li>
              <li><Link prefetch={false} href="/sun/paris" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sun: Paris</Link></li>
              <li><Link prefetch={false} href="/moon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Moon Phases</Link></li>
              <li><Link prefetch={false} href="/moon/new-york" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Moon: New York</Link></li>
              <li><Link prefetch={false} href="/moon/london" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Moon: London</Link></li>
              <li><Link prefetch={false} href="/moon/delhi" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Moon: Delhi</Link></li>
              <li><Link prefetch={false} href="/moon/tokyo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Moon: Tokyo</Link></li>
            </ul>
          </div>

          {/* 6. Daylight Saving & Standards */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              DST & Standards
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href="/utc" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Coordinated Universal Time (UTC)</Link></li>
              <li><Link prefetch={false} href="/daylight-saving-time" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">DST Hub</Link></li>
              <li><Link prefetch={false} href="/daylight-saving-time/2026" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Daylight Saving 2026</Link></li>
              <li><Link prefetch={false} href="/daylight-saving-time/2027" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Daylight Saving 2027</Link></li>
              <li><Link prefetch={false} href="/daylight-saving-time/united-states" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">United States DST</Link></li>
              <li><Link prefetch={false} href="/daylight-saving-time/europe" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Europe Summer Time</Link></li>
              <li><Link prefetch={false} href="/daylight-saving-time/arizona" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Arizona MST Rules</Link></li>
              <li><Link prefetch={false} href="/daylight-saving-time/non-observing-countries" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Non-Observing Nations</Link></li>
              <li><Link prefetch={false} href="/unix-time" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Unix Timestamp Studio</Link></li>
              <li><Link prefetch={false} href="/unix-time-converter" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Unix Epoch Converter</Link></li>
              <li><Link prefetch={false} href="/iso-8601" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">ISO 8601 Parser</Link></li>
              <li><Link prefetch={false} href="/api-docs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Developer Time API</Link></li>
              <li><Link prefetch={false} href="/learn" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Horology Academy</Link></li>
              <li><Link prefetch={false} href="/learn/seo-simulator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">SERP Simulator</Link></li>
            </ul>
          </div>

          {/* 7. Company & Support */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              About & Legal
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About TimeNumbers</Link></li>
              <li><Link prefetch={false} href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact & Support</Link></li>
              <li><Link prefetch={false} href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Chronometry Blog</Link></li>
              <li><Link prefetch={false} href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Global Time FAQs</Link></li>
              <li><Link prefetch={false} href="/widgets" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Embed Clock Widgets</Link></li>
              <li><Link prefetch={false} href="/data-sources" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Data Sources</Link></li>
              <li><Link prefetch={false} href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link prefetch={false} href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Global Metropolitan City Clocks (Canonical Direct Links) */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Popular World City Clocks
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
            <Link prefetch={false} href="/time/new-york" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">New York</Link>
            <Link prefetch={false} href="/time/london" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">London</Link>
            <Link prefetch={false} href="/time/tokyo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tokyo</Link>
            <Link prefetch={false} href="/time/paris" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Paris</Link>
            <Link prefetch={false} href="/time/berlin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Berlin</Link>
            <Link prefetch={false} href="/time/zurich" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Zurich</Link>
            <Link prefetch={false} href="/time/madrid" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Madrid</Link>
            <Link prefetch={false} href="/time/mumbai" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mumbai</Link>
            <Link prefetch={false} href="/time/bengaluru" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Bengaluru</Link>
            <Link prefetch={false} href="/time/hong-kong" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hong Kong</Link>
            <Link prefetch={false} href="/time/rome" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Rome</Link>
            <Link prefetch={false} href="/time/chicago" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Chicago</Link>
            <Link prefetch={false} href="/time/los-angeles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Los Angeles</Link>
            <Link prefetch={false} href="/time/san-francisco" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">San Francisco</Link>
            <Link prefetch={false} href="/time/washington-dc" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Washington D.C.</Link>
            <Link prefetch={false} href="/time/sao-paulo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">São Paulo</Link>
            <Link prefetch={false} href="/time/toronto" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Toronto</Link>
            <Link prefetch={false} href="/time/seoul" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Seoul</Link>
            <Link prefetch={false} href="/time/cairo" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cairo</Link>
            <Link prefetch={false} href="/time/dubai" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dubai</Link>
            <Link prefetch={false} href="/time/sydney" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sydney</Link>
            <Link prefetch={false} href="/time/singapore" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Singapore</Link>
          </div>
        </div>


        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400" suppressHydrationWarning>
          © {new Date().getFullYear()} {siteConfig.name}. All global times synchronized to UTC atomic reference standard.
        </div>
      </div>
    </footer>
  );
}
