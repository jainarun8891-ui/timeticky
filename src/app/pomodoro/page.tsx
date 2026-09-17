import React from 'react';
import { Metadata } from 'next';
import { PomodoroClient } from './PomodoroClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Online Pomodoro Timer — 25/5 Study & Deep Work Productivity Timer',
  'Free online Pomodoro timer for focus and productivity. Features 25-minute study intervals, 5-minute short breaks, 15-minute long breaks, audio chimes, and zero drift.',
  '/pomodoro'
);

export default function PomodoroPage() {
  const faqs = [
    {
      question: 'What is the Pomodoro Technique?',
      answer: 'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by 5-minute short breaks, and a 15-minute long break after four intervals.'
    },
    {
      question: 'Does this Pomodoro timer work when the browser tab is inactive?',
      answer: 'Yes. TimeNumbers Pomodoro calculates remaining time against absolute wall-clock epoch timestamps (Date.now()) rather than relying on throttled browser intervals. It will never drift or pause when you switch tabs.'
    },
    {
      question: 'Why is 25 minutes the standard Pomodoro interval?',
      answer: '25 minutes is proven to be long enough to accomplish meaningful deep work without triggering cognitive fatigue, while short enough to maintain intense mental clarity.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Pomodoro Timer', url: '/pomodoro' }]} />

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Online Pomodoro Productivity Timer
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Scientifically proven 25-minute deep focus intervals and restorative breaks.
        </p>
      </div>

      <PomodoroClient />

      <FaqAccordion items={faqs} title="Frequently Asked Questions About the Pomodoro Technique" />

      <RelatedLinksHub />

      {/* Schema.org SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "TimeNumbers Pomodoro Timer",
            "url": "https://www.timenumbers.com/pomodoro",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
