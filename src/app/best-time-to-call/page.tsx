import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { BestTimeToCallClient } from './BestTimeToCallClient';

export const metadata: Metadata = buildPageMetadata(
  'Best Time to Call Between Cities: International Calling Window',
  'Find the best time to call someone in another city or country without waking them up. Instant overlapping business and waking hours for 500+ global cities.',
  '/best-time-to-call'
);

const FAQS = [
  {
    question: 'How do I find the best time to call someone in another time zone?',
    answer: 'Compare the waking and business hours of both locations. The "golden window" is the 3 to 5 hours of the day where both parties are between 9:00 AM and 5:00 PM (for work calls) or between 8:00 AM and 9:00 PM (for personal calls). Our calculator automatically highlights these matching hours.'
  },
  {
    question: 'What is the best time to call the UK from the US?',
    answer: 'The best time to call the UK from US Eastern Time (New York) is between 9:00 AM and 12:00 PM EST, which corresponds to 2:00 PM to 5:00 PM in London. From US Pacific Time (California), the best window is between 7:00 AM and 9:00 AM PST (3:00 PM to 5:00 PM in London).'
  },
  {
    question: 'What is the best time to call India from the US?',
    answer: 'Because India Standard Time (IST) is 9.5 to 10.5 hours ahead of US Eastern Time, the best time to call is early morning in the US (8:00 AM to 10:00 AM EST), which is evening in India (5:30 PM to 7:30 PM IST).'
  },
  {
    question: 'What is the international etiquette rule for unscheduled calls?',
    answer: 'Standard global etiquette recommends never calling before 8:00 AM or after 9:00 PM in the recipient’s local time unless previously agreed upon or in an emergency. For business calls, standard working hours (9:00 AM to 5:00 PM) should always be prioritized.'
  }
];

export default function BestTimeToCallPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TimeNumbers Best Time to Call Calculator',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Calculate overlapping waking and business hours to find the ideal calling time between any two international cities.'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs items={[{ name: 'Best Time to Call', url: '/best-time-to-call' }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Best Time to Call', url: '/best-time-to-call' },
        ]}
      />
      <JsonLd type="faq" data={FAQS} />

      <BestTimeToCallClient />

      {/* Educational Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How to Pick the Perfect Calling Time Without Doing Timezone Math
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          We have all been there: you need to speak with an overseas colleague, client, or family member, but calculating time differences in your head leads to second-guessing. A simple mistake could mean calling a client during their dinner or ringing your parents at 3:00 AM while they are sound asleep.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Our international calling window calculator compares local civil times hour-by-hour across more than 500 world cities. By filtering out sleeping hours and highlighting overlapping business time, you can lock in a comfortable call time in seconds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Green vs. Yellow Windows
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <strong>Green (Golden Window)</strong> indicates both parties are in their standard workday (9 AM–5 PM) or awake hours (8 AM–9 PM). <strong>Yellow (Shoulder Window)</strong> indicates one party is in their early morning (7–8 AM) or late evening (9–10 PM), which is acceptable for scheduled urgent calls.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Watch Out for Daylight Saving Shifts
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Countries do not change their clocks on the same day! For example, the US and the UK change clocks weeks apart in March and October. Our engine tracks real-time IANA daylight saving rules so your calling window is always accurate.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={FAQS}
        title="Frequently Asked Questions About Calling Across Time Zones"
        subtitle="Common questions about international call etiquette, time differences, and best calling windows."
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explore More Timezone & Meeting Tools" />
    </div>
  );
}
