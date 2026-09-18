import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { UsClocksGridClient } from './UsClocksGridClient';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { Clock, MapPin, Globe, ShieldCheck, Sun, Calendar, Sparkles, Building2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  "United States America Time Now — Exact Clocks Across All US Time Zones",
  "What time is it in America right now? Check exact live atomic clocks across all US time zones: Eastern, Central, Mountain, Pacific, Alaska, Hawaii, and Washington D.C.",
  "/united-states-time-now"
);

const US_TIME_FAQS = [
  {
    question: "What time is it right now in the United States of America?",
    answer: "Because the United States spans six standard time zones across the 50 states, there is no single nationwide time. The capital city, Washington, D.C., operates on Eastern Time (ET, UTC-5 during standard time and UTC-4 during Daylight Saving Time). At any given moment, the time is 1 hour earlier in Central Time, 2 hours earlier in Mountain Time, 3 hours earlier in Pacific Time, 4 hours earlier in Alaska Time, and 5 to 6 hours earlier in Hawaii-Aleutian Time."
  },
  {
    question: "How do I know what the time of United States now is across different zones?",
    answer: "To check what the exact time of United States now is, consult our real-time atomic clocks above. If America time is now 12:00 PM Eastern in New York and Washington D.C., the time is 11:00 AM Central in Chicago, 10:00 AM Mountain in Denver, 9:00 AM Pacific in Los Angeles, 8:00 AM Alaska in Anchorage, and 6:00 or 7:00 AM in Honolulu."
  },
  {
    question: "If someone asks 'what time is US now', which time zone is typically assumed?",
    answer: "When someone asks what time is US now without naming a specific state, they usually refer to Eastern Time (ET). Eastern Time is the standard reference for US federal government agencies in Washington, D.C., national television broadcast schedules, and Wall Street financial markets. For West Coast operations, Pacific Time (PT) is 3 hours behind."
  },
  {
    question: "How many time zones are in America?",
    answer: "The United States officially encompasses nine standard time zones by federal law: six covering the 50 states (Eastern, Central, Mountain, Pacific, Alaska, and Hawaii-Aleutian) and three covering overseas territories (Atlantic Standard Time in Puerto Rico and the US Virgin Islands, Chamorro Standard Time in Guam and the Northern Mariana Islands, and Samoa Standard Time in American Samoa)."
  },
  {
    question: "What is the current time in Washington, D.C. (the US capital)?",
    answer: "Washington, D.C. is located in the Eastern Time Zone (America/New_York). It observes Eastern Standard Time (EST, UTC-5) in the late autumn and winter months, and Eastern Daylight Time (EDT, UTC-4) from the second Sunday in March through the first Sunday in November."
  },
  {
    question: "Does all of America change time for Daylight Saving Time (DST)?",
    answer: "No. Two states—Hawaii and the majority of Arizona—do not observe Daylight Saving Time. Hawaii opted out in 1967 due to its tropical latitude with minimal seasonal daylight variation. Arizona opted out in 1968 to avoid extending scorching desert summer sunlight into evening hours (though the Navajo Nation reservation in northeastern Arizona does observe DST). Furthermore, Puerto Rico, Guam, American Samoa, and the US Virgin Islands remain on standard time year-round."
  },
  {
    question: "What is the time difference between New York and California?",
    answer: "There is an exact 3-hour time difference between New York (Eastern Time) and California (Pacific Time). When it is 12:00 PM (noon) in New York City, it is 9:00 AM in Los Angeles and San Francisco. Both regions enter and exit Daylight Saving Time on the exact same schedule, so the 3-hour spread remains constant throughout the entire year."
  },
  {
    question: "Why do US time zones have 1-hour boundaries instead of local solar noon?",
    answer: "Before 1883, thousands of American towns determined time independently by local solar noon, resulting in over 300 conflicting local times. On November 18, 1883—known as 'The Day of Two Noons'—major American and Canadian railroad corporations jointly established four standardized 15-degree longitudinal time belts (Eastern, Central, Mountain, and Pacific) to prevent fatal train collisions and streamline transcontinental timetables. Congress formally codified these zones under the Standard Time Act of 1918."
  }
];

export default function UnitedStatesTimeNowPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'United States America Time Now',
    description: 'Current real-time clocks and timezone map across all United States regions and territories.',
    url: 'https://www.timenumbers.com/united-states-time-now',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'United States Time Now', item: 'https://www.timenumbers.com/united-states-time-now' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={US_TIME_FAQS} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'United States Time Now', url: '/united-states-time-now' }]} />

        {/* Hero Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <span className="text-base">🇺🇸</span>
            Official United States Chronometer Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            United States America Time Now
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            What is now the time in America? Check exact live atomic clocks across all US time zones with millisecond precision, including Washington D.C., Eastern, Central, Mountain, Pacific, Alaska, and Hawaii.
          </p>
        </div>

        {/* Interactive Live Clocks Client */}
        <UsClocksGridClient />

        {/* Informational Guide 1: Overview */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Now the Time in America: Live US Time Zone Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-4">
              <p>
                When inquiring what the exact <strong>time of United States now</strong> is, or what <strong>America time is now</strong>, the answer depends entirely on the geographical state or territory in question. If you are checking what <strong>time is US now</strong> for a cross-country conference call, flight departure, or family check-in, the continental United States stretches over 2,800 miles (4,500 km) from the Atlantic coastline in Maine to the Pacific shores of California, spanning four contiguous continental time zones.
              </p>
              <p>
                Beyond the contiguous 48 states, the non-contiguous states of Alaska and Hawaii extend America’s total domestic longitudinal reach across six distinct standard time zones, creating a total time differential of up to six hours between Honolulu and New York City.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Every clock displayed on TimeNumbers is synchronized directly against Network Time Protocol (NTP) stratum-1 atomic clocks governed by the National Institute of Standards and Technology (NIST) in Boulder, Colorado, and the US Naval Observatory (USNO) in Washington, D.C.
              </p>
              <p>
                Whether coordinating cross-border teleconferences, confirming stock market trading hours on the New York Stock Exchange (NYSE), or verifying flight arrival gates, our real-time American clocks provide verified temporal accuracy.
              </p>
            </div>
          </div>
        </section>

        {/* Informational Guide 2: The 6 US Time Zones */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 6 Standard Time Zones of the United States
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Eastern Time (ET)</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">EST / EDT (UTC-5 / UTC-4)</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Anchors 23 states along the eastern seaboard, including New York, Florida, Georgia, Pennsylvania, Ohio, and North Carolina, alongside the federal capital in Washington D.C.
              </p>
              <div className="text-xs font-semibold text-slate-500">Key Metros: New York City, Boston, Philadelphia, Miami, Atlanta</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Central Time (CT)</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">CST / CDT (UTC-6 / UTC-5)</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Spans 20 states across the Great Plains, Mississippi Valley, and Gulf Coast. Exactly 1 hour behind Eastern Time.
              </p>
              <div className="text-xs font-semibold text-slate-500">Key Metros: Chicago, Houston, Dallas-Fort Worth, Austin, Minneapolis</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Mountain Time (MT)</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">MST / MDT (UTC-7 / UTC-6)</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Covers the Rocky Mountain states including Colorado, Utah, New Mexico, Wyoming, Montana, and southern Idaho. Exactly 2 hours behind Eastern Time.
              </p>
              <div className="text-xs font-semibold text-slate-500">Key Metros: Denver, Salt Lake City, Albuquerque, Boise, El Paso</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Pacific Time (PT)</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">PST / PDT (UTC-8 / UTC-7)</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Encompasses California, Washington, Oregon, and Nevada. Hub for tech innovation, venture capital, and maritime Pacific Rim commerce. Exactly 3 hours behind Eastern Time.
              </p>
              <div className="text-xs font-semibold text-slate-500">Key Metros: Los Angeles, San Francisco, Seattle, San Diego, Las Vegas</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Alaska Time (AKT)</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">AKST / AKDT (UTC-9 / UTC-8)</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Covers almost the entire state of Alaska. Exactly 4 hours behind Eastern Time and 1 hour behind Pacific Time.
              </p>
              <div className="text-xs font-semibold text-slate-500">Key Metros: Anchorage, Fairbanks, Juneau, Ketchikan</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Hawaii-Aleutian Time (HST)</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">HST (UTC-10 Year-Round)</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Encompasses the Hawaiian archipelago and the westernmost Aleutian Islands of Alaska. Hawaii does not observe Daylight Saving Time.
              </p>
              <div className="text-xs font-semibold text-slate-500">Key Metros: Honolulu, Hilo, Kahului, Kailua-Kona</div>
            </div>
          </div>
        </section>

        {/* Informational Guide 3: Daylight Saving Time Rules */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Daylight Saving Time (DST) Rules in the USA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">The Federal Uniform Time Act Schedule</h3>
              <p>
                In the United States, Daylight Saving Time begins annually on the <strong>second Sunday in March</strong> at 02:00 local time, when clocks advance forward by one hour to 03:00 (&quot;spring forward&quot;).
              </p>
              <p>
                DST concludes on the <strong>first Sunday in November</strong> at 02:00 local time, when clocks are turned back one hour to 01:00 (&quot;fall back&quot;), restoring standard astronomical time for the winter months.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Exceptions: Why Arizona and Hawaii Opt Out</h3>
              <p>
                Under Section 3(a) of the Uniform Time Act of 1966, states possess the legal authority to exempt their entire jurisdiction from observing Daylight Saving Time.
              </p>
              <p>
                <strong>Arizona:</strong> Opted out in 1968 because higher summer temperatures make extending evening sunlight counterproductive, as residents prefer sunset to bring cooler desert temperatures and reduce air conditioning electricity consumption.
              </p>
              <p>
                <strong>Hawaii:</strong> Opted out in 1967 because its proximity to the equator results in less than 2.5 hours of seasonal difference in sunrise and sunset times throughout the year, rendering clock changes unnecessary.
              </p>
            </div>
          </div>
        </section>

        {/* Informational Guide 4: Bi-Coastal Business Alignment */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bi-Coastal Working Hours: Navigating the 3-Hour East-West Gap
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              For commercial enterprises operating across the United States, managing the 3-hour difference between the East Coast (New York, Boston, Atlanta) and West Coast (San Francisco, Los Angeles, Seattle) is a daily operational reality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900 text-center">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block uppercase">Eastern Time (ET)</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">09:00 AM – 06:00 PM</span>
                <span className="text-xs text-slate-500 mt-1 block">New York Standard Office Window</span>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900 text-center">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block uppercase">Golden Overlap Window</span>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono mt-1 block">01:00 PM – 05:00 PM ET</span>
                <span className="text-xs text-slate-500 mt-1 block">10:00 AM – 02:00 PM Pacific Time</span>
              </div>
              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900 text-center">
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block uppercase">Pacific Time (PT)</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1 block">09:00 AM – 06:00 PM</span>
                <span className="text-xs text-slate-500 mt-1 block">California Standard Office Window</span>
              </div>
            </div>
            <p>
              The <strong>Golden Overlap Window</strong> between 1:00 PM and 5:00 PM Eastern (10:00 AM and 2:00 PM Pacific) is the prime period when bi-coastal corporate teams, financial markets, and remote software engineers hold all-hands meetings, sprint demos, and executive syncs without obligating either coast to work outside normal business hours.
            </p>
          </div>
        </section>

        {/* State-by-State Reference Table */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 shadow-sm overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            United States Time Zones & Major Cities Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Time Zone</th>
                  <th className="py-3 px-4">Abbreviation</th>
                  <th className="py-3 px-4">Standard UTC Offset</th>
                  <th className="py-3 px-4">Daylight UTC Offset</th>
                  <th className="py-3 px-4">Major Metros</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Eastern Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">EST / EDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-05:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-04:00</td>
                  <td className="py-3.5 px-4">New York, Washington D.C., Boston, Miami, Atlanta</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Central Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">CST / CDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-06:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-05:00</td>
                  <td className="py-3.5 px-4">Chicago, Dallas, Houston, Austin, Nashville</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Mountain Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">MST / MDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-06:00</td>
                  <td className="py-3.5 px-4">Denver, Salt Lake City, Albuquerque, Boise</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Mountain Standard (AZ)</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">MST</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4 font-mono">No DST (UTC-07:00)</td>
                  <td className="py-3.5 px-4">Phoenix, Tucson, Mesa, Chandler, Scottsdale</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Pacific Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">PST / PDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-08:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4">Los Angeles, San Francisco, Seattle, San Diego, Las Vegas</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Alaska Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">AKST / AKDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-09:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-08:00</td>
                  <td className="py-3.5 px-4">Anchorage, Fairbanks, Juneau, Sitka</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hawaii-Aleutian Time</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">HST</td>
                  <td className="py-3.5 px-4 font-mono">UTC-10:00</td>
                  <td className="py-3.5 px-4 font-mono">No DST (UTC-10:00)</td>
                  <td className="py-3.5 px-4">Honolulu, Pearl City, Hilo, Kahului</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Dynamic FAQ Accordion */}
        <FaqAccordion
          items={US_TIME_FAQS}
          title="Frequently Asked Questions About Time in America"
          subtitle="Direct answers to questions regarding current US time, timezone boundaries, Daylight Saving Time, and capital clocks."
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore Related US Clocks, Time Zones & Calculators" />
      </div>
    </div>
  );
}
