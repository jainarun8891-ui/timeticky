import React from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 mt-16 py-10 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-6">
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

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 font-medium text-xs">
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2 uppercase tracking-wider">
              Clocks & Wall
            </h5>
            <ul className="space-y-1.5">
              <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">World Clock</Link></li>
              <li><Link href="/world-clock-wall" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Multi-Clock Wall</Link></li>
              <li><Link href="/time-zones" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">400+ Time Zones</Link></li>
              <li><Link href="/atomic-clock" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Atomic Clock</Link></li>
              <li><Link href="/clock-accuracy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Clock Accuracy</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2 uppercase tracking-wider">
              Travel & Calling
            </h5>
            <ul className="space-y-1.5">
              <li><Link href="/jet-lag-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Jet Lag Calculator</Link></li>
              <li><Link href="/dialing-codes" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dialing Codes</Link></li>
              <li><Link href="/overlap-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Overlap Calculator</Link></li>
              <li><Link href="/meeting-planner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Meeting Planner</Link></li>
              <li><Link href="/business-days-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Business Days</Link></li>
              <li><Link href="/birthday-calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Birthday & Age</Link></li>
              <li><Link href="/time-difference" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Time Difference</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2 uppercase tracking-wider">
              Horology & Space
            </h5>
            <ul className="space-y-1.5">
              <li><Link href="/astronomy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Astronomy Lab</Link></li>
              <li><Link href="/daylight-saving-time" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Daylight Saving 2025</Link></li>
              <li><Link href="/unix-time" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Unix Timestamp</Link></li>
              <li><Link href="/learn" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Horology Academy</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2 uppercase tracking-wider">
              Timers & Audio
            </h5>
            <ul className="space-y-1.5">
              <li><Link href="/alarm" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Online Alarm Clock</Link></li>
              <li><Link href="/stopwatch" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Online Stopwatch</Link></li>
              <li><Link href="/timer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Countdown Timer</Link></li>
              <li><Link href="/calendar" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Global Calendar</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2 uppercase tracking-wider">
              Articles & Guides
            </h5>
            <ul className="space-y-1.5">
              <li><Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Chronometry Blog</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Global Time FAQs</Link></li>
              <li><Link href="/widgets" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Embed Clocks</Link></li>
              <li><Link href="/data-sources" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Data Sources</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2 uppercase tracking-wider">
              About & Legal
            </h5>
            <ul className="space-y-1.5">
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About TimeNumbers</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} {siteConfig.name}. All global times synchronized to UTC atomic reference standard.
        </div>
      </div>
    </footer>
  );
}
