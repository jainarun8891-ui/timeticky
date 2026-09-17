import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { DST_FAQS } from '@/lib/seo/page-faqs';
import React from 'react';
import Link from 'next/link';
import { TIMEZONES } from '@/lib/time/timezones';
import { COUNTRIES } from '@/lib/geo/countries';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Calendar, Globe, ArrowRight, Clock, ShieldAlert } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Daylight Saving Time (DST) Hub',
  'Comprehensive guide to active Daylight Saving Time regions, upcoming transition dates, and countries that do not observe clock changes.',
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
      <Breadcrumbs items={[{"name":"Daylight Saving Time","url":"/daylight-saving-time"}]} />
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Daylight Saving Time (DST) Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Track clock changes, spring-forward/fall-back schedules, and timezone shift history worldwide.
        </p>
      </div>

      {/* Regional & Annual Transition Guides */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Regional & Annual Daylight Saving Guides
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
    
      <FaqAccordion items={DST_FAQS} title="Frequently Asked Questions About Daylight Saving Time 2025" />
      <RelatedLinksHub />
    </div>
  );
}
