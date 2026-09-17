import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CountdownEventClient } from '../CountdownEventClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ event: string }>;
}

const EVENTS_DATABASE: Record<string, {
  name: string;
  targetIso: string;
  description: string;
  culturalNote: string;
}> = {
  'new-year': {
    name: 'New Year 2027',
    targetIso: '2027-01-01T00:00:00Z',
    description: 'Exact real-time countdown to midnight and the arrival of the New Year 2027 across international time zones.',
    culturalNote: 'Celebrated globally at the stroke of midnight as the Gregorian calendar year rolls over from 2026 to 2027.'
  },
  'christmas': {
    name: 'Christmas Day',
    targetIso: '2026-12-25T00:00:00Z',
    description: 'Live countdown in days, hours, minutes, and seconds until Christmas Day 2026.',
    culturalNote: 'Commemorated by billions of people worldwide as both a religious celebration and a cultural holiday of generosity and family gathering.'
  },
  'halloween': {
    name: 'Halloween 2026',
    targetIso: '2026-10-31T00:00:00Z',
    description: 'Track how many days, hours, minutes, and seconds remain until Halloween evening.',
    culturalNote: 'Observed on the eve of All Hallows’ Day, featuring costume traditions, community gatherings, and harvest festivities.'
  },
  'valentines-day': {
    name: "Valentine's Day 2027",
    targetIso: '2027-02-14T00:00:00Z',
    description: "Live countdown to Valentine's Day. Track the exact time remaining until February 14.",
    culturalNote: 'A celebration honoring affection, companionship, and interpersonal appreciation observed across the globe.'
  },
  'diwali': {
    name: 'Diwali (Festival of Lights)',
    targetIso: '2026-11-08T00:00:00Z',
    description: 'Exact countdown to Diwali 2026. Discover the days and hours remaining until the Hindu festival of lights.',
    culturalNote: 'Diwali signifies the spiritual victory of light over darkness, good over evil, and wisdom over ignorance.'
  },
  'holi': {
    name: 'Holi (Festival of Colors)',
    targetIso: '2027-03-22T00:00:00Z',
    description: 'Track the countdown to Holi 2027. Live timer counting down to the springtime celebration of colors and joy.',
    culturalNote: 'Holi marks the blossoming of spring, reconciliation of relationships, and playful tossing of vibrant organic powders.'
  },
  'thanksgiving': {
    name: 'Thanksgiving Day 2026',
    targetIso: '2026-11-26T00:00:00Z',
    description: 'Live countdown to Thanksgiving in the United States, celebrated on the fourth Thursday of November.',
    culturalNote: 'A national holiday in North America rooted in expressing gratitude for harvest blessings and quality time with family.'
  }
};

export async function generateStaticParams() {
  return Object.keys(EVENTS_DATABASE).map(event => ({ event }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event } = await params;
  const item = EVENTS_DATABASE[event.toLowerCase()];

  if (!item) {
    return { title: 'Event Countdown Not Found — TimeNumbers' };
  }

  return {
    title: `Countdown to ${item.name} — Exact Days, Hours & Minutes Remaining`,
    description: item.description,
    alternates: {
      canonical: `https://timenumbers.com/countdown/${event.toLowerCase()}`,
    },
    openGraph: {
      title: `Countdown to ${item.name} — TimeNumbers`,
      description: item.description,
      url: `https://timenumbers.com/countdown/${event.toLowerCase()}`,
    },
  };
}

export default async function CountdownEventPage({ params }: Props) {
  const { event } = await params;
  const item = EVENTS_DATABASE[event.toLowerCase()];

  if (!item) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Countdown to ${item.name}`,
    description: item.description,
    url: `https://timenumbers.com/countdown/${event.toLowerCase()}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Countdown', item: 'https://timenumbers.com/countdown' },
        { '@type': 'ListItem', position: 3, name: item.name, item: `https://timenumbers.com/countdown/${event.toLowerCase()}` },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Countdown', url: '/countdown' }, { name: item.name, url: `/countdown/${event.toLowerCase()}` }]} />

        {/* Live Countdown Client */}
        <CountdownEventClient
          eventName={item.name}
          targetIso={item.targetIso}
          description={item.description}
          eventSlug={event.toLowerCase()}
          culturalNote={item.culturalNote}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Countdowns & Calendars" />
      </div>
    </div>
  );
}
