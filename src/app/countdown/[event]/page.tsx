import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CountdownEventClient } from '../CountdownEventClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Calendar, Clock, ArrowRight, Sparkles, Globe, Heart } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface Props {
  params: Promise<{ event: string }>;
}

const EVENTS_DATABASE: Record<string, {
  name: string;
  targetIso: string;
  description: string;
  culturalNote: string;
  history: string;
  firstCelebratedIn: string;
}> = {
  'new-year': {
    name: 'New Year 2027',
    targetIso: '2027-01-01T00:00:00Z',
    description: 'Exact real-time countdown to midnight and the arrival of the New Year 2027 across international time zones.',
    culturalNote: 'Celebrated globally at the stroke of midnight as the Gregorian calendar year rolls over from 2026 to 2027.',
    history: 'The celebration of January 1 as the first day of the year was established by Julius Caesar in 45 BCE with the Julian calendar reform, dedicating the month to Janus, the Roman deity of transitions, beginnings, and doorways.',
    firstCelebratedIn: 'Line Islands of Kiribati (UTC+14) and Samoa, where midnight arrives a full 26 hours before Baker Island (UTC-12).'
  },
  'christmas': {
    name: 'Christmas Day',
    targetIso: '2026-12-25T00:00:00Z',
    description: 'Live countdown in days, hours, minutes, and seconds until Christmas Day 2026.',
    culturalNote: 'Commemorated by billions of people worldwide as both a religious celebration and a cultural holiday of generosity and family gathering.',
    history: 'First officially recorded in Rome during 336 CE during the reign of Emperor Constantine, Christmas historically coincided with ancient winter solstice festivities celebrating the return of light and renewal.',
    firstCelebratedIn: 'New Zealand and Eastern Kiribati, where the sun rises on Christmas morning nearly an entire day before North America.'
  },
  'halloween': {
    name: 'Halloween 2026',
    targetIso: '2026-10-31T00:00:00Z',
    description: 'Track how many days, hours, minutes, and seconds remain until Halloween evening.',
    culturalNote: 'Observed on the eve of All Hallows’ Day, featuring costume traditions, community gatherings, and harvest festivities.',
    history: 'Traces its roots over 2,000 years to the ancient Celtic festival of Samhain, an agricultural checkpoint dividing the harvest season from the cold darkness of winter.',
    firstCelebratedIn: 'The Asia-Pacific region, before rolling through European autumn evenings and the Americas.'
  },
  'valentines-day': {
    name: "Valentine's Day 2027",
    targetIso: '2027-02-14T00:00:00Z',
    description: "Live countdown to Valentine's Day. Track the exact time remaining until February 14.",
    culturalNote: 'A celebration honoring affection, companionship, and interpersonal appreciation observed across the globe.',
    history: 'Originated in ancient Roman feast days and Christian martyrdom traditions honoring Saint Valentine, evolving during Geoffrey Chaucer’s medieval courtly love era into a celebration of romantic affection.',
    firstCelebratedIn: 'Oceania and East Asia, where February 14 opens with confectionery gift exchanges.'
  },
  'diwali': {
    name: 'Diwali (Festival of Lights)',
    targetIso: '2026-11-08T00:00:00Z',
    description: 'Exact countdown to Diwali 2026. Discover the days and hours remaining until the Hindu festival of lights.',
    culturalNote: 'Diwali signifies the spiritual victory of light over darkness, good over evil, and wisdom over ignorance.',
    history: 'A major lunisolar festival commemorated across India and the South Asian diaspora on the darkest new moon night (Amavasya) of the Hindu lunar month of Kartika.',
    firstCelebratedIn: 'Fiji, New Zealand, and Australia, followed by millions across the Indian subcontinent.'
  },
  'holi': {
    name: 'Holi (Festival of Colors)',
    targetIso: '2027-03-22T00:00:00Z',
    description: 'Track the countdown to Holi 2027. Live timer counting down to the springtime celebration of colors and joy.',
    culturalNote: 'Holi marks the blossoming of spring, reconciliation of relationships, and playful tossing of vibrant organic powders.',
    history: 'Described in 7th-century Sanskrit texts, Holi is celebrated on the Purnima (full moon day) of the Hindu calendar month of Phalguna, heralding agricultural fertility and the defeat of the demoness Holika.',
    firstCelebratedIn: 'Fiji, Mauritius, India, Nepal, and diaspora hubs across the globe.'
  },
  'thanksgiving': {
    name: 'Thanksgiving Day 2026',
    targetIso: '2026-11-26T00:00:00Z',
    description: 'Live countdown to Thanksgiving in the United States, celebrated on the fourth Thursday of November.',
    culturalNote: 'A national holiday in North America rooted in expressing gratitude for harvest blessings and quality time with family.',
    history: 'Proclaimed an annual national holiday by President Abraham Lincoln in 1863 amidst the American Civil War, solidifying harvest traditions dating back to the 1621 gathering at Plymouth, Massachusetts.',
    firstCelebratedIn: 'Across the four contiguous US time zones (Eastern, Central, Mountain, and Pacific) and Hawaii.'
  }
};

export async function generateStaticParams() {
  return Object.keys(EVENTS_DATABASE).map(event => ({ event }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { event } = await params;
  const item = EVENTS_DATABASE[event.toLowerCase()];

  if (!item) {
    return buildPageMetadata('Event Countdown Not Found', 'Countdown event not found.', `/countdown/${event.toLowerCase()}`);
  }

  return buildPageMetadata(
    `Countdown to ${item.name}`,
    item.description,
    `/countdown/${event.toLowerCase()}`
  );
}

export default async function CountdownEventPage({ params }: Props) {
  const { event } = await params;
  const item = EVENTS_DATABASE[event.toLowerCase()];

  if (!item) {
    notFound();
  }

  const eventFaqs = [
    {
      question: `How does the countdown to ${item.name} calculate time remaining?`,
      answer: `The timer computes the exact millisecond difference between the current moment and the target date-time in UTC. It breaks this duration down into whole days, hours, minutes, and seconds, updating in real time using high-precision browser timestamps.`
    },
    {
      question: `What are the historical origins of ${item.name}?`,
      answer: `${item.history}`
    },
    {
      question: `Which international time zone celebrates ${item.name} first?`,
      answer: `Because Earth rotates eastward, ${item.firstCelebratedIn}`
    },
    {
      question: `Does the countdown continue to run in background tabs?`,
      answer: `Yes. The countdown uses continuous epoch timestamps rather than simple interval increments. Whether your phone screen turns off or you switch tabs, the countdown will reflect the exact remaining duration the instant you return.`
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Countdown to ${item.name}`,
    description: item.description,
    url: `https://www.timenumbers.com/countdown/${event.toLowerCase()}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Countdown', item: 'https://www.timenumbers.com/countdown' },
        { '@type': 'ListItem', position: 3, name: item.name, item: `https://www.timenumbers.com/countdown/${event.toLowerCase()}` },
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

        {/* Cultural & Astronomical Context Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Historical Context & Global Observance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Calendar Architecture & Traditions</h3>
              <p>
                {item.culturalNote}
              </p>
              <p>
                {item.history}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Time Zone Progression</h3>
              <p>
                As the world turns, celebrations ripple across the 24 primary longitudinal time zones.
                Pacific island nations in UTC+13 and UTC+14 celebrate first, followed by East Asia, South Asia, Europe, and the Americas.
              </p>
              <p>
                TimeNumbers allows families, organizers, and international teams to stay synchronized with precise countdowns, regardless of geographic distance.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Event FAQ Accordion */}
        <FaqAccordion
          items={eventFaqs}
          title={`Frequently Asked Questions About ${item.name}`}
          subtitle={`Astronomical schedules, historical background, and time zone progression for ${item.name}.`}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Countdowns & Calendars" />
      </div>
    </div>
  );
}
