import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { Sun, Moon, Clock, ArrowRight, Calendar, Globe, AlertCircle, ShieldAlert } from 'lucide-react';
import { COUNTRIES } from '@/lib/geo/countries';

interface Props {
  params: Promise<{ year: string }>;
}

const SUPPORTED_SEGMENTS = [
  '2025', '2026', '2027', '2028', '2029', '2030',
  'arizona', 'united-states', 'europe', 'non-observing-countries'
];

export async function generateStaticParams() {
  return SUPPORTED_SEGMENTS.map(year => ({ year }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year: slug } = await params;

  if (slug === 'arizona') {
    return {
      title: "Does Arizona Change Time for Daylight Savings? MST Rules & Navajo Exception | TimeNumbers",
      description: "Why Arizona does not observe Daylight Saving Time (DST). Explanation of Mountain Standard Time (MST) year-round, energy savings, and the Navajo Nation exception.",
      alternates: { canonical: "https://timenumbers.com/daylight-saving-time/arizona" }
    };
  }

  if (slug === 'united-states') {
    return {
      title: "United States Daylight Saving Time Schedule — March Clocks Forward | TimeNumbers",
      description: "Exact time clocks change in the United States. Learn when clocks go forward in March and back in November, Uniform Time Act rules, and non-observing states.",
      alternates: { canonical: "https://timenumbers.com/daylight-saving-time/united-states" }
    };
  }

  if (slug === 'europe') {
    return {
      title: "European Union Daylight Saving Time Schedule & Clock Changes | TimeNumbers",
      description: "When do clocks change in Europe? Schedule for European Summer Time (CEST/BST) transitions in March and October across the UK and EU countries.",
      alternates: { canonical: "https://timenumbers.com/daylight-saving-time/europe" }
    };
  }

  if (slug === 'non-observing-countries') {
    return {
      title: "What Countries Do Not Observe Daylight Saving Time? Full Global List | TimeNumbers",
      description: "Complete list of countries and territories that do not observe Daylight Saving Time. Learn why China, India, Japan, Brazil, and most equatorial nations keep standard time.",
      alternates: { canonical: "https://timenumbers.com/daylight-saving-time/non-observing-countries" }
    };
  }

  const y = parseInt(slug, 10);
  if (isNaN(y)) return {};

  return {
    title: `Daylight Saving Time ${y} — Global Transition Dates & Clock Changes | TimeNumbers`,
    description: `Complete Daylight Saving Time (DST) schedule for ${y}. Exact spring-forward and fall-back transition dates and times for the United States, Canada, Europe, Australia, and New Zealand.`,
    alternates: {
      canonical: `https://timenumbers.com/daylight-saving-time/${y}`,
    },
    openGraph: {
      title: `Daylight Saving Time ${y} Schedule & Transition Dates`,
      description: `Exact DST clock change dates and times worldwide for year ${y}.`,
      url: `https://timenumbers.com/daylight-saving-time/${y}`,
      siteName: 'TimeNumbers',
      type: 'website',
    }
  };
}

export default async function DaylightSavingTimeYearPage({ params }: Props) {
  const { year: slug } = await params;

  if (slug === 'arizona') {
    const faqs = [
      {
        question: "Does Arizona change time for daylight savings?",
        answer: "No. Most of the state of Arizona does NOT observe Daylight Saving Time. Arizona remains on Mountain Standard Time (MST, UTC-7) all year round."
      },
      {
        question: "Why doesn't Arizona participate in Daylight Saving Time?",
        answer: "In 1968, the Arizona Legislature opted out of the Uniform Time Act. Due to extreme summer desert heat, an extra hour of daylight in the evening would increase residential energy and air conditioning consumption."
      },
      {
        question: "Does the Navajo Nation in Arizona change clocks?",
        answer: "Yes! The Navajo Nation, which spans northeastern Arizona, parts of New Mexico, and Utah, DOES observe Daylight Saving Time to keep its tribal government synchronized across state boundaries. However, the Hopi Reservation enclosed within the Navajo Nation does NOT observe DST."
      }
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[{"name":"Daylight Saving Time","url":"/daylight-saving-time"},{"name":"Arizona","url":"/daylight-saving-time/arizona"}]} />
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5" />
            <span>Mountain Standard Time (MST Year-Round)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Does Arizona Change Time for Daylight Savings?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Arizona remains on UTC-7 year-round. Discover why clocks do not change in Phoenix, Tucson, and Flagstaff.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Key Takeaway for Travelers &amp; Remote Teams</h2>
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-sm text-amber-900 dark:text-amber-200">
            When the US springs forward in March, Arizona aligns with Pacific Daylight Time (PDT). When the US falls back in November, Arizona aligns with Mountain Standard Time (MST).
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <FaqAccordion items={faqs} title="Frequently Asked Questions About Arizona Time" />
        </section>

        <RelatedLinksHub />
      </div>
    );
  }

  if (slug === 'non-observing-countries') {
    const nonObserving = [
      { name: "China", note: "Abandoned DST in 1992; uses single Beijing Time (UTC+8) nationwide." },
      { name: "India", note: "Never observed nationwide DST; uses Indian Standard Time (IST, UTC+5:30)." },
      { name: "Japan", note: "Abolished DST in 1952 under post-war occupation." },
      { name: "Russia", note: "Abolished seasonal DST in 2014; uses permanent standard time across 11 zones." },
      { name: "Brazil", note: "Scrapped DST in 2019 due to negligible energy savings near the equator." },
      { name: "Turkey", note: "Permanently remains on Summer Time (UTC+3) year-round since 2016." },
      { name: "Saudi Arabia & UAE", note: "No seasonal changes; stable equatorial solar cycle." },
      { name: "Singapore", note: "Located at 1°N latitude; exactly 12 hours of daylight year-round." },
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[{"name":"Daylight Saving Time","url":"/daylight-saving-time"},{"name":"Non-Observing Countries","url":"/daylight-saving-time/non-observing-countries"}]} />
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>Permanent Standard Time</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            What Countries Do Not Observe Daylight Saving Time?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Over 60% of the world&apos;s population lives in nations that keep permanent standard time year-round.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nonObserving.map(c => (
            <div key={c.name} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white text-base">{c.name}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>

        <RelatedLinksHub />
      </div>
    );
  }

  if (slug === 'united-states') {
    const faqs = [
      {
        question: "When does Daylight Saving Time start and end in the United States?",
        answer: "Under the Energy Policy Act of 2005, US Daylight Saving Time begins at 2:00 AM on the second Sunday of March (spring forward 1 hour) and ends at 2:00 AM on the first Sunday of November (fall back 1 hour)."
      },
      {
        question: "Which US states and territories do not observe DST?",
        answer: "Hawaii and most of Arizona do not observe DST. US territories that do not observe DST include Puerto Rico, Guam, American Samoa, the US Virgin Islands, and the Northern Mariana Islands."
      }
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[{"name":"Daylight Saving Time","url":"/daylight-saving-time"},{"name":"United States","url":"/daylight-saving-time/united-states"}]} />
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Federal Uniform Time Act</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            United States Daylight Saving Time Schedule
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Rules, clock change hours, and state exceptions for DST across the United States.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <FaqAccordion items={faqs} title="Frequently Asked Questions About US Daylight Saving Time" />
        </section>

        <RelatedLinksHub />
      </div>
    );
  }

  if (slug === 'europe') {
    const faqs = [
      {
        question: "When do clocks change in Europe?",
        answer: "In the European Union and United Kingdom, Summer Time begins on the last Sunday in March at 01:00 UTC (clocks jump to 02:00 UTC) and ends on the last Sunday in October at 01:00 UTC (clocks fall back)."
      }
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[{"name":"Daylight Saving Time","url":"/daylight-saving-time"},{"name":"Europe","url":"/daylight-saving-time/europe"}]} />
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>European Summer Time (CEST/WEST/EEST)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Europe Daylight Saving Time Schedule
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Transition dates and clock change hours across the United Kingdom and European Union countries.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <FaqAccordion items={faqs} title="Frequently Asked Questions About European DST" />
        </section>

        <RelatedLinksHub />
      </div>
    );
  }

  const y = parseInt(slug, 10);
  if (isNaN(y)) notFound();

  const faqs = [
    {
      question: `Do clocks go forward or backward in March ${y}?`,
      answer: `In March ${y}, clocks go FORWARD by 1 hour ("Spring Forward") at 2:00 AM local time across the United States, Canada, and Europe, causing that night to have 23 hours.`
    },
    {
      question: `When does Daylight Saving Time start and end in ${y}?`,
      answer: `In ${y}, US Daylight Saving Time begins on the second Sunday of March and ends on the first Sunday of November. In the UK and Europe, Summer Time starts on the last Sunday of March and ends on the last Sunday of October.`
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Daylight Saving Time","url":"/daylight-saving-time"},{"name":`${y}`,"url":`/daylight-saving-time/${y}`}]} />

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Daylight Saving Time {y} Schedule
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Global transition dates, exact clock change hours, and spring-forward / fall-back schedule for {y}.
        </p>
      </header>

      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider opacity-80 block">Universal Memory Rule</span>
          <span className="text-xl sm:text-2xl font-black">“Spring Forward 1 Hour, Fall Back 1 Hour”</span>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-bold">March: +1h</span>
          <span className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-bold">November: -1h</span>
        </div>
      </div>

      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={faqs} title={`Frequently Asked Questions About DST ${y}`} />
      </section>

      <RelatedLinksHub />
    </div>
  );
}
