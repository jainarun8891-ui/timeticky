"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { CITIES, City } from '@/lib/geo/cities';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, getTimeDifference } from '@/lib/time/timezones';
import { ArrowLeftRight, Plus, X, Globe, Clock, Users, Building2, CheckCircle2 } from 'lucide-react';

const COMPARE_FAQS = [
  {
    question: "How is the time difference between two cities computed?",
    answer: "The time difference is calculated by subtracting the UTC offset of the reference city from the target city's UTC offset. If City A is in UTC-5 and City B is in UTC+1, the difference is +6 hours (City B is 6 hours ahead of City A). The computation automatically adjusts whenever either location enters or exits Daylight Saving Time."
  },
  {
    question: "How do I determine business meeting overlaps between distant cities?",
    answer: "Standard business hours are commonly regarded as 09:00 to 17:00 (5:00 PM) local time. To find overlapping hours, convert each city's 9-to-5 window into UTC. The overlapping hours are the common UTC window where both teams are on the clock. For instance, New York (UTC-5) and London (UTC+0) have a 3-hour overlap between 09:00-12:00 EST / 14:00-17:00 GMT."
  },
  {
    question: "Why do time differences change between the same cities during the year?",
    answer: "Time differences fluctuate because regions observe Daylight Saving Time on different dates or not at all. For example, the United States changes clocks on the second Sunday of March, while the United Kingdom and Europe shift on the last Sunday of March. During that two-week gap, the difference between New York and London shrinks from 5 hours to 4 hours."
  },
  {
    question: "What happens when comparing cities across the International Date Line?",
    answer: "When comparing cities across the International Date Line (such as Honolulu, Hawaii at UTC-10 and Tokyo, Japan at UTC+9), Tokyo is 19 hours ahead. When it is 10:00 AM on Monday in Honolulu, it is already 5:00 AM on Tuesday in Tokyo."
  },
  {
    question: "Can I add more than two cities to this comparison tool?",
    answer: "Yes. TimeNumbers allows you to compare up to 10 international locations simultaneously on a single matrix. You can easily add or remove metropolitan hubs using the quick-select chips below the cards."
  },
  {
    question: "How does TimeNumbers maintain millisecond-level synchronization?",
    answer: "Our engine synchronizes with Network Time Protocol (NTP) atomic reference clocks and applies client-side drift compensation. All time zone conversions are resolved against the official IANA Time Zone Database (tzdata)."
  }
];

export default function CompareIndexPage() {
  const defaultSlugs = ['delhi-india', 'london-united-kingdom', 'new-york-united-states'];
  const initialCities = defaultSlugs.map(slug => CITIES.find(c => c.slug === slug)).filter(Boolean) as City[];
  const [selectedCities, setSelectedCities] = useState<City[]>(
    initialCities.length >= 2 ? initialCities : CITIES.slice(0, 3)
  );
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const addCity = (city: City) => {
    if (selectedCities.length < 10 && !selectedCities.some(c => c.id === city.id)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const removeCity = (cityId: string) => {
    if (selectedCities.length > 2) {
      setSelectedCities(selectedCities.filter(c => c.id !== cityId));
    }
  };

  const baseCity = selectedCities[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Compare", url: "/compare" }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Compare Cities', url: '/compare' },
        ]}
      />
      <JsonLd type="faq" data={COMPARE_FAQS} />
      <JsonLd
        type="application"
        data={{
          name: "Compare Cities Time Difference",
          category: "UtilitiesApplication",
          description: "Side-by-side time difference calculator for global cities."
        }}
      />

      {/* Hero Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          Multi-City Comparison Matrix
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Compare World Cities Time Difference
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          Side-by-side time comparison matrix for global metropolitan centers with business meeting overlap windows, working hours alignment, and real-time atomic clocks.
        </p>
      </div>

      {/* Selected City Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedCities.map((city, idx) => {
          const timeStr = formatTimeInZone(now, city.timezone, false, true);
          const dateStr = formatDateInZone(now, city.timezone);
          const offsetStr = getUtcOffsetString(now, city.timezone);
          const diff = idx > 0 ? getTimeDifference(baseCity.timezone, city.timezone, now) : null;

          return (
            <div key={city.id} className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
              {selectedCities.length > 2 && (
                <button
                  onClick={() => removeCity(city.id)}
                  type="button"
                  aria-label="Remove city"
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">
                  {idx === 0 ? 'Reference Anchor' : 'Compared to ' + baseCity.name}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  {city.name}
                </h2>
                <p className="text-xs text-slate-400">{city.country}</p>

                <div className="my-4 text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {timeStr}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  {dateStr}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 font-mono">{offsetStr}</span>
                {diff && (
                  <span className={`font-bold ${diff.isAhead ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`}>
                    {diff.formatted}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Available to Add */}
      {selectedCities.length < 10 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Add Another Location to Comparison Matrix
          </h3>
          <div className="flex flex-wrap gap-2">
            {CITIES.filter(c => !selectedCities.some(sc => sc.id === c.id)).slice(0, 10).map((c) => (
              <button
                key={c.id}
                onClick={() => addCity(c)}
                type="button"
                className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Educational Article Section 1 */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Coordinating Distributed Teams Across Global Meridians
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">The Challenge of Cross-Border Collaboration</h3>
            <p>
              In contemporary multinational enterprises, team members are frequently dispersed across 8 to 14 hours of longitudinal separation. Coordinating real-time software deployments, emergency triage calls, and executive quarterly briefings requires an intuitive understanding of global business hours.
            </p>
            <p>
              By comparing local clocks side by side, managers can immediately identify the sweet spot where neither team is forced into unreasonable early morning or late night hours.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">The Golden Meeting Window Rule</h3>
            <p>
              As a general best practice for international operations, aim for shared synchronous meetings during the &quot;Golden Window&quot;—the 2 to 4 hour bracket where normal working hours (09:00 to 18:00) naturally overlap between two distant regions.
            </p>
            <p>
              When synchronous overlap is impossible—such as between San Francisco and Singapore—teams rely on asynchronous standups and recorded video briefings to keep momentum moving across consecutive calendar days.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion
        items={COMPARE_FAQS}
        title="Time Comparison FAQs"
        subtitle="Frequently asked questions about comparing international city times, meeting planning, and UTC offsets."
      />

      {/* Related Hub */}
      <RelatedLinksHub title="Explore More Time & Comparison Calculators" />
    </div>
  );
}
