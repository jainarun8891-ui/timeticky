import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { DST_FAQS } from '@/lib/seo/page-faqs';
import React from 'react';
import { TIMEZONES } from '@/lib/time/timezones';
import { COUNTRIES } from '@/lib/geo/countries';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata(
  'Daylight Saving Time (DST) Hub',
  'Comprehensive guide to active Daylight Saving Time regions, upcoming transition dates, and countries that do not observe clock changes.',
  '/daylight-saving-time'
);

export default function DaylightSavingTimePage() {
  const observingCountries = Object.values(COUNTRIES).filter(c => c.hasDst);
  const nonObservingCountries = Object.values(COUNTRIES).filter(c => !c.hasDst);

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Observing DST */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Countries Observing DST
            </h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
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
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
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
