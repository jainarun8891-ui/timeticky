import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/geo/countries';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/daylight-saving-time'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/daylight-saving-time'
);

export default function DaylightSavingTimePage() {
  const observingCountries = Object.values(COUNTRIES).filter(c => c.hasDst);
  const nonObservingCountries = Object.values(COUNTRIES).filter(c => !c.hasDst);

  const dstGuides = [
    {
      title: 'United States DST Schedule',
      desc: 'Clocks forward 2nd Sunday in March, back 1st Sunday in November across US timezones.',
      href: '/daylight-saving-time/united-states',
      badge: 'Federal Schedule'
    },
    {
      title: 'European Union Summer Time',
      desc: 'Synchronized clock changes across CET/CEST, GMT/BST, and EET/EEST.',
      href: '/daylight-saving-time/europe',
      badge: 'EU Directive'
    },
    {
      title: 'Daylight Saving Time 2026',
      desc: 'Complete global transition calendar, exact countdowns, and sunrise adjustments for 2026.',
      href: '/daylight-saving-time/2026',
      badge: '2026 Calendar'
    },
    {
      title: 'Daylight Saving Time 2027',
      desc: 'Forward planning calendar for worldwide spring and autumn clock shift dates in 2027.',
      href: '/daylight-saving-time/2027',
      badge: '2027 Calendar'
    },
    {
      title: 'Arizona Mountain Time Rules',
      desc: 'Why Arizona stays on Mountain Standard Time year-round & the Navajo exception.',
      href: '/daylight-saving-time/arizona',
      badge: 'State Exception'
    },
    {
      title: 'Non-Observing Countries',
      desc: 'Full global directory of nations that do not shift clocks (Asia, Africa, South America).',
      href: '/daylight-saving-time/non-observing-countries',
      badge: 'Standard Time'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: "Daylight Saving Time", url: "/daylight-saving-time" }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Daylight Saving Time', url: '/daylight-saving-time' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {content.description}
        </p>
      </div>

      {/* Featured Snippet: 2026 Clock Change Dates Quick Answer Box */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <Clock className="w-3.5 h-3.5" />
            <span>2026 Global Clock Shift Schedule</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                Spring Forward (Start DST 2026)
              </span>
              <p className="text-lg sm:text-xl font-black">
                Sunday, March 8, 2026 (USA &amp; Canada)
              </p>
              <p className="text-sm text-slate-300">
                Sunday, March 29, 2026 (UK &amp; European Union)
              </p>
              <p className="text-xs text-slate-400">
                Clocks advance 1 hour forward at 2:00 AM local time. You lose 1 hour of sleep.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                Fall Back (End DST 2026)
              </span>
              <p className="text-lg sm:text-xl font-black">
                Sunday, October 25, 2026 (UK &amp; Europe)
              </p>
              <p className="text-sm text-slate-300">
                Sunday, November 1, 2026 (USA &amp; Canada)
              </p>
              <p className="text-xs text-slate-400">
                Clocks shift 1 hour back at 2:00 AM local time. You gain 1 hour of sleep.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Daylight Saving Schedule & Policy Guide" />

      {/* Regional & Annual Transition Guides */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Regional &amp; Annual Daylight Saving Guides
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dstGuides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/50 dark:border-blue-800">
                    {guide.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  {guide.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Observing DST */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Countries Observing DST
            </h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs max-h-96 overflow-y-auto pr-2">
            {observingCountries.map(c => (
              <div key={c.code} className="py-3">
                <div className="flex justify-between items-center font-bold text-slate-800 dark:text-slate-200">
                  <span>{c.flag} {c.name}</span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">Observes DST</span>
                </div>
                {c.dstNotes && (
                  <p className="text-slate-400 text-[11px] mt-1">{c.dstNotes}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Non-observing */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Countries Without DST (Standard Time Year-Round)
            </h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs max-h-96 overflow-y-auto pr-2">
            {nonObservingCountries.map(c => (
              <div key={c.code} className="py-3">
                <div className="flex justify-between items-center font-bold text-slate-800 dark:text-slate-200">
                  <span>{c.flag} {c.name}</span>
                  <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">No Clock Changes</span>
                </div>
                {c.dstNotes && (
                  <p className="text-slate-400 text-[11px] mt-1">{c.dstNotes}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    
      <FaqAccordion
        title="Frequently Asked Questions About Daylight Saving Time"
        subtitle="Understand the health, energy, and scheduling implications of shifting clocks."
        items={content.faqs}
      />
      <RelatedLinksHub currentPath="/daylight-saving-time" />
    </div>
  );
}
