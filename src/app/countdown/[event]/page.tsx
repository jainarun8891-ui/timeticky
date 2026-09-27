import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { CountdownEventClient } from '../CountdownEventClient';
import { buildPageMetadata } from '@/lib/seo/metadata';
import {
  CANONICAL_COUNTDOWN_EVENTS,
  resolveEventData,
} from '@/lib/countdown/countdown-utils';

interface Props {
  params: Promise<{ event: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return Object.keys(CANONICAL_COUNTDOWN_EVENTS).map((event) => ({ event }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { event } = await params;
  const sParams = await searchParams;
  const item = resolveEventData(event, sParams);

  const cleanTitle = `Countdown to ${item.name} — Live Precision Timer`;
  const cleanDesc = item.description;

  return buildPageMetadata(
    cleanTitle,
    cleanDesc,
    `/countdown/${item.slug}`
  );
}

export default async function CountdownEventPage({ params, searchParams }: Props) {
  const { event } = await params;
  const sParams = await searchParams;
  const item = resolveEventData(event, sParams);

  const eventFaqs = [
    {
      question: `How does the countdown to ${item.name} calculate time remaining?`,
      answer: `The timer computes the exact millisecond difference between the current moment and ${item.targetIso}. It breaks this duration down into whole days, hours, minutes, and seconds, updating in real time using atomic epoch clock timestamps.`
    },
    {
      question: `Can I share this live countdown to ${item.name} with friends and coworkers?`,
      answer: `Yes! Copy the URL from your address bar or click the "Share" button above. The URL contains all target parameters, allowing anyone on any device to view the synchronized countdown with rich preview cards on WhatsApp, Slack, iMessage, and X (Twitter).`
    },
    {
      question: `Does the countdown continue to run accurately in background tabs?`,
      answer: `Yes. TimeTicky utilizes continuous epoch timestamps rather than simple interval increments. Whether your phone screen turns off or you switch apps, the countdown will reflect the exact remaining duration the instant you return.`
    },
    {
      question: `What happens when the countdown to ${item.name} reaches zero?`,
      answer: `When the countdown reaches zero, TimeTicky automatically triggers a celebratory confetti explosion and presents a congratulatory completion card.`
    }
  ];

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Countdown to ${item.name}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: item.description,
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Countdown', url: '/countdown' },
            { name: item.name, url: `/countdown/${item.slug}` },
          ]}
        />

        {/* Live Countdown Client */}
        <CountdownEventClient
          eventName={item.name}
          targetIso={item.targetIso}
          description={item.description}
          eventSlug={item.slug}
          culturalNote={item.culturalNote}
          emoji={item.emoji}
        />

        {/* Context / History Section */}
        {item.history ? (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Historical Context & Global Observance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Calendar Architecture & Traditions</h3>
                <p>{item.culturalNote}</p>
                <p>{item.history}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Time Zone Progression</h3>
                <p>
                  As the Earth rotates eastward, celebrations ripple across the 24 primary longitudinal time zones.
                </p>
                <p>
                  TimeTicky allows families, organizers, and international teams to stay synchronized with precise countdowns, regardless of geographic distance.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              About This Custom Countdown
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              This live countdown timer was generated via TimeTicky&apos;s universal chronometer. Every second is measured against atomic NTP clocks to ensure your group countdown stays synchronized to the exact millisecond across all participants worldwide.
            </p>
          </section>
        )}

        {/* Dynamic Event FAQ Accordion */}
        <FaqAccordion
          items={eventFaqs}
          title={`Frequently Asked Questions About ${item.name}`}
          subtitle={`Synchronized timing, sharing options, and execution details for ${item.name}.`}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Countdowns & Calendars" />
      </div>
    </main>
  );
}
