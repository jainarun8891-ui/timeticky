import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { TimeSliderClient } from '@/components/slider/TimeSliderClient';
import { Sliders, Clock, Globe, Sparkles, Users, BookOpen, Calendar, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Interactive World Time Slider & Scrubber — Multi-City Timezone Converter',
  'Interactive 24-hour world time slider and meeting planner. Compare multiple world cities side-by-side, scrub across hours to find mutual work overlaps, and export schedules directly to Google Calendar or Slack.',
  '/time-slider'
);

const TIME_SLIDER_FAQS: FaqItem[] = [
  {
    question: 'How does the interactive world time slider work?',
    answer:
      'The time slider aligns multiple world cities onto a synchronized 24-hour horizontal track. Each hour block is color-coded: green represents normal 9 AM – 5 PM work hours, yellow indicates early morning or evening shoulder hours, and dark slate indicates sleeping hours. As you click or scrub across any hour, all cities instantly show the exact corresponding local time.'
  },
  {
    question: 'How do I find a fair meeting time for a distributed global team?',
    answer:
      'Look for green horizontal columns where the highest number of cities overlap during normal working hours. For teams spanning the US East Coast, Europe, and India, the best window is typically 1:30 PM to 3:30 PM London time (8:30 AM to 10:30 AM in New York, and 7:00 PM to 9:00 PM in Delhi). For teams where a mutual window is impossible, alternate meeting times weekly so no single team member always attends during night hours.'
  },
  {
    question: 'What happens when a time conversion crosses midnight into the next day?',
    answer:
      'Because timezones differ by up to 24 hours across the International Date Line, late evening in the Western Hemisphere is frequently early morning of the following calendar day in Asia or Australia. Our slider automatically marks the date and day difference so you never schedule on the wrong date.'
  },
  {
    question: 'Can I copy the meeting schedule directly to Slack or Microsoft Teams?',
    answer:
      'Yes! Click the "Copy for Slack / Email" button below the slider to instantly copy a clean, beautifully formatted text block listing the proposed meeting time converted for every attendee\'s local city. You can also click "Add to Google Calendar" to create a pre-filled event.'
  },
  {
    question: 'How does Daylight Saving Time (DST) impact the slider calculations?',
    answer:
      'Our platform uses the canonical IANA time zone database (tzdata), which automatically accounts for daylight saving transitions in real time. When countries change clocks in March, April, October, or November, all time conversions and hourly offsets update with 100% atomic accuracy.'
  }
];

export default function TimeSliderPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeNumbers Interactive World Time Slider & Scrubber',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Interactive 24-hour visual time scrubber and meeting planner. Compare world cities side-by-side, discover mutual working hour overlaps, and generate Slack receipts or Google Calendar invites.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: TIME_SLIDER_FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ name: 'World Time Slider', url: '/time-slider' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="space-y-3 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>Visual Chronometry &amp; Meeting Coordination</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Interactive World Time Slider &amp; Meeting Scrubber
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Tired of mental math when scheduling calls across different countries? Use our interactive 24-hour multi-city slider to compare cities side-by-side. Drag your cursor across the timeline to find mutual working hours, avoid waking teammates up at midnight, and export ready-to-paste calendar invites.
        </p>
      </div>

      {/* Main Interactive Client */}
      <TimeSliderClient locale="en" />

      {/* Humanized Layman Educational Guide Section */}
      <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Remote Work Mastery in Plain English</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            How to Master Cross-Border Scheduling Without the Confusion
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Coordinating a phone call or Zoom video conference across three continents shouldn&apos;t feel like solving advanced calculus. When colleagues in California, London, Dubai, and Singapore work together, traditional calendars fail to communicate the human cost of scheduling a sync. Here is how visual time scrubbing solves international scheduling friction forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Card 1: The 3 Color Zones */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The 3 Human Energy Zones
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our slider organizes every hour into three simple biological bands: <strong>Green (9 AM – 5 PM)</strong> represents sharp focused daytime hours. <strong>Yellow (7–9 AM &amp; 5–9 PM)</strong> is acceptable for quick huddles. <strong>Dark Slate (9 PM – 7 AM)</strong> is sacred personal rest time.
            </p>
          </div>

          {/* Card 2: Date Line Gotchas */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Avoiding the &ldquo;Next Day&rdquo; Trap
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              The most common mistake when booking across the Pacific is forgetting the calendar date. When a San Francisco engineer schedules a Thursday 4:00 PM sprint, in Sydney it is already Friday 10:00 AM. Our visual date indicators prevent embarrassing missed appointments.
            </p>
          </div>

          {/* Card 3: Rotating Pain Protocol */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The Fair Overlap Protocol
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              When working across 12-hour time differences (like US West Coast and India), an overlap during mutual 9-to-5 working hours is mathematically impossible. Top remote engineering organizations rotate the meeting time weekly so that the burden of evening calls is shared equally.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          items={TIME_SLIDER_FAQS}
          title="Frequently Asked Questions About Multi-City Time Coordination"
          subtitle="Simple, practical answers on time conversion, calendar exports, and distributed team meeting etiquette."
        />
      </div>

      {/* Related Chronometry Tools */}
      <RelatedLinksHub
        currentPath="/time-slider"
        title="Explore More Precision Global Time Tools"
        subtitle="Compare world clocks, check stock market trading hours, and calculate exact time differences."
      />
    </main>
  );
}
