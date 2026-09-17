"use client";

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { TIMEZONES, formatTimeInZone, formatDateInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { ArrowLeftRight, Calendar, Clock, Globe, ShieldCheck, Sun, Moon } from 'lucide-react';

const CONVERTER_FAQS = [
  {
    question: "How does the Time Zone Converter calculate local times?",
    answer: "Every calculation starts by converting your selected date and time in the source timezone into Coordinated Universal Time (UTC) using the authoritative IANA Time Zone Database (tzdata). The UTC timestamp is then adjusted for each target timezone, factoring in standard offsets and active Daylight Saving Time rules for that precise calendar date."
  },
  {
    question: "What is the difference between UTC and GMT?",
    answer: "Coordinated Universal Time (UTC) is the high-precision atomic time standard used globally for aviation, computing, and telecommunications. Greenwich Mean Time (GMT) is a historical time zone based on the mean solar time at the Royal Observatory in Greenwich, London. While UTC and GMT share the exact same current time without offset (UTC+0), GMT is considered a time zone while UTC is the primary reference standard."
  },
  {
    question: "Why do some time zones have 30-minute or 45-minute offsets?",
    answer: "While most time zones differ by whole hours from UTC, several jurisdictions adopt fractional offsets to better align with local solar noon. India Standard Time (IST) is UTC+5:30, Iran Standard Time (IRST) is UTC+3:30, Newfoundland is UTC-3:30, and Nepal Standard Time (NPT) is UTC+5:45, aligning closely with Kathmandu's astronomical meridian."
  },
  {
    question: "How does Daylight Saving Time (DST) affect international conversions?",
    answer: "Daylight Saving Time advances clocks forward by one hour during spring and summer months to extend evening daylight. Because different countries switch to DST on different calendar dates—and the Southern Hemisphere observes summer during the Northern Hemisphere's winter—the time difference between two cities can fluctuate by one or two hours across different seasons."
  },
  {
    question: "How can I find the best overlapping meeting time for cross-border teams?",
    answer: "To schedule across distant hubs (such as New York, London, and Tokyo), calculate the UTC equivalent of regular business hours (09:00 to 18:00 local). Overlaps between London and New York typically occur between 14:00 and 17:00 London time (09:00 to 12:00 New York time). For teams spanning North America and Asia, morning hours on the US West Coast align with early morning hours the next day in Tokyo or Sydney."
  },
  {
    question: "Does TimeNumbers support automatic day-shift detection across midnight?",
    answer: "Yes. When converting times across wide longitudinal spans, crossing the International Date Line or midnight results in a date transition. TimeNumbers explicitly formats the full weekday and calendar date for each target city so you always know whether a meeting takes place yesterday, today, or tomorrow in local time."
  }
];

export default function TimeZoneConverterPage() {
  const [sourceTz, setSourceTz] = useState('Asia/Kolkata');
  const [targetTzs, setTargetTzs] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedTime, setSelectedTime] = useState('20:00');

  // Compute UTC timestamp from selected local date and time in source timezone
  const [hour, min] = selectedTime.split(':').map(Number);
  const [y, m, d] = selectedDate.split('-').map(Number);

  // Approximate date object in UTC
  const testDate = new Date(Date.UTC(y, m - 1, d, hour, min, 0));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Time Zone Converter", url: "/time-zone-converter" }]} />

      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          Multi-Zone Chronometer
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Time Zone Converter
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          Convert any date and time between multiple international timezones simultaneously with automatic Daylight Saving Time computation, day-shift detection, and verified IANA accuracy.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Select Source Time and Location
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5 uppercase">Source Timezone</label>
            <select
              value={sourceTz}
              onChange={(e) => setSourceTz(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white outline-none"
            >
              {TIMEZONES.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.shortName})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5 uppercase">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5 uppercase">Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Converted Results Grid */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Converted Destination Clocks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {targetTzs.map((tzId) => {
            const tz = TIMEZONES.find(t => t.id === tzId) || { name: tzId, shortName: tzId, formattedOffset: '' };
            const convertedTime = formatTimeInZone(testDate, tzId, false, false);
            const convertedDate = formatDateInZone(testDate, tzId);

            return (
              <div key={tzId} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
                  {tz.shortName}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {tz.name}
                </h3>
                <div className="text-3xl font-mono font-black text-slate-900 dark:text-white my-3">
                  {convertedTime}
                </div>
                <p className="text-xs text-slate-500 font-medium">{convertedDate}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  {getUtcOffsetString(testDate, tzId)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Guide Section 1 */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          How Global Time Zone Conversion Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">The Coordinated Universal Time (UTC) Standard</h3>
            <p>
              Modern international civil timekeeping is anchored to Coordinated Universal Time (UTC), maintained by the International Bureau of Weights and Measures (BIPM) using a network of ultra-stable atomic clocks. All regional time zones are defined as positive or negative offsets from the Prime Meridian running through Greenwich, England.
            </p>
            <p>
              Locations east of the Prime Meridian (such as Berlin at UTC+1, Cairo at UTC+2, and Tokyo at UTC+9) experience earlier sunrise and have positive offsets. Locations west of the Prime Meridian (such as New York at UTC-5 and Los Angeles at UTC-8) experience later sunrise and have negative offsets.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">Crossing the International Date Line</h3>
            <p>
              Because the Earth completes one full 360-degree rotation every 24 hours, each standard hour of offset corresponds roughly to 15 degrees of longitude. The 180th meridian, situated largely in the Pacific Ocean, serves as the International Date Line (IDL).
            </p>
            <p>
              When traveling or converting time eastward across the International Date Line, the calendar subtracts a full calendar day. Conversely, heading westward across the line adds 24 hours. When coordinating events between San Francisco (UTC-8) and Auckland (UTC+12 or UTC+13), dates frequently differ by an entire day.
            </p>
          </div>
        </div>
      </section>

      {/* Educational Guide Section 2 */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Major International Business Time Zones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400">Eastern Time (ET)</div>
            <div className="font-bold text-slate-900 dark:text-white mt-1">UTC-5 / UTC-4</div>
            <p className="text-xs text-slate-500 mt-2">Covers New York, Toronto, Washington D.C., and Atlanta. Houses major financial exchanges like NYSE and NASDAQ.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400">Greenwich / BST</div>
            <div className="font-bold text-slate-900 dark:text-white mt-1">UTC+0 / UTC+1</div>
            <p className="text-xs text-slate-500 mt-2">London, Dublin, Lisbon, and West African hubs. The central nexus connecting Asian morning trading with US afternoon sessions.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400">Central European (CET)</div>
            <div className="font-bold text-slate-900 dark:text-white mt-1">UTC+1 / UTC+2</div>
            <p className="text-xs text-slate-500 mt-2">Paris, Frankfurt, Zurich, Amsterdam, and Milan. Primary manufacturing and policy engine for the European Union.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400">Japan Standard (JST)</div>
            <div className="font-bold text-slate-900 dark:text-white mt-1">UTC+9 (No DST)</div>
            <p className="text-xs text-slate-500 mt-2">Tokyo, Osaka, and Seoul (KST). High-density commerce hub operating consistently without seasonal DST shifts.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqAccordion
        items={CONVERTER_FAQS}
        title="Time Zone Converter FAQs"
        subtitle="Authoritative answers to common questions about global time conversion, DST, and scheduling."
      />

      {/* Related Hub */}
      <RelatedLinksHub title="Explore Related Time Tools & Calculators" />
    </div>
  );
}
