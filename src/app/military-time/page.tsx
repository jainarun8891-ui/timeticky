import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { MilitaryTimeClient } from './MilitaryTimeClient';

export const metadata: Metadata = buildPageMetadata(
  'Military Time Converter & 24-Hour Clock Chart (0000–2400)',
  'Convert 12-hour AM/PM to 24-hour military time instantly. Includes phonetic pronunciation, 2-second conversion math tricks, and a printable 0000 to 2400 chart.',
  '/military-time'
);

const FAQS = [
  {
    question: 'How do you convert PM hours to military time?',
    answer: 'To convert any afternoon or evening hour (PM) to military time, simply add 12 to the regular hour. For example, 5:00 PM + 12 = 17:00 (written as 1700 hours in military time). The minutes always remain the same.'
  },
  {
    question: 'How do you convert AM hours to military time?',
    answer: 'Morning hours from 1:00 AM to 11:59 AM stay virtually the same! Just add a leading zero to single digits: 7:00 AM becomes 0700 hours. Midnight (12:00 AM) is written as 0000.'
  },
  {
    question: 'Why do the military, hospitals, and pilots use 24-hour time?',
    answer: 'They use military 24-hour time to completely eliminate confusion between morning and evening. In emergency medicine, international flight navigation, and defense, accidentally confusing 7:00 AM with 7:00 PM could cause fatal errors. A 24-hour clock ensures each minute of the day has an unmistakable, unique number.'
  },
  {
    question: 'What is 1700 in military time?',
    answer: '1700 in military time is 5:00 PM standard time. It is pronounced aloud as "Seventeen Hundred hours".'
  },
  {
    question: 'What is 2100 in military time?',
    answer: '2100 in military time is 9:00 PM standard time. It is pronounced aloud as "Twenty-One Hundred hours".'
  },
  {
    question: 'Is 2400 or 0000 midnight?',
    answer: 'Both refer to midnight! 0000 marks the very beginning of a new day (0000 hours), whereas 2400 marks the very end of the current day. In digital clocks and modern military logistics, 0000 is used most frequently.'
  }
];

export default function MilitaryTimePage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TimeNumbers Military Time Converter & 24-Hour Chart',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Instant military 24-hour time converter with spoken pronunciation, AM/PM conversion tricks, and complete printable 24-hour chart.'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs items={[{ name: 'Military Time Converter', url: '/military-time' }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Military Time Converter', url: '/military-time' },
        ]}
      />
      <JsonLd type="faq" data={FAQS} />

      <MilitaryTimeClient />

      {/* Plain English Layman's Guide */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How Military Time Works in Plain English
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Most of us grew up using a 12-hour clock, which splits the day into two 12-hour halves: <strong>AM</strong> (morning) and <strong>PM</strong> (afternoon and evening). While this works fine for casual appointments, it can cause confusion. For example, setting an alarm for 7:00 AM instead of 7:00 PM is an easy mistake to make.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          <strong>Military time</strong> eliminates this problem by using a continuous 24-hour count. The day starts at midnight (0000) and counts all the way to 2359. Every moment of the day has its own unique four-digit number, meaning you never need to wonder whether someone means morning or evening.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The 2-Second Math Trick
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Whenever you see a military time higher than 1200 (like 1500 or 2100), just subtract 12 from the first two numbers:
              <br />• 1500 − 12 = <strong>3:00 PM</strong>
              <br />• 1800 − 12 = <strong>6:00 PM</strong>
              <br />• 2200 − 12 = <strong>10:00 PM</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              How to Say It Out Loud
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              In military culture, you read the numbers in pairs. On the hour, say &ldquo;hundred hours&rdquo;:
              <br />• 0800 = &ldquo;Zero Eight Hundred hours&rdquo;
              <br />• 1430 = &ldquo;Fourteen Thirty hours&rdquo;
              <br />• 2015 = &ldquo;Twenty Fifteen hours&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={FAQS}
        title="Frequently Asked Questions About Military Time"
        subtitle="Common questions about conversion math, pronunciation, and 24-hour clock rules."
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explore More Time Tools & Converters" />
    </div>
  );
}
