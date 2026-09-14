import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TimerSuiteClient } from '../TimerSuiteClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Timer, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface Props {
  params: Promise<{ duration: string }>;
}

const DURATION_MAP: Record<string, { seconds: number; label: string; name: string; description: string }> = {
  '1-minute': {
    seconds: 60,
    label: '1 Minute',
    name: '1 Minute Timer',
    description: 'Set a 1 minute online timer with sound alarm. Accurate tab-inactive countdown for quick intervals, tea steeping, and breathwork.',
  },
  '5-minutes': {
    seconds: 300,
    label: '5 Minutes',
    name: '5 Minute Timer',
    description: 'Set a 5 minute online timer with alarm chime. Ideal for quick breaks, meditation, boiling eggs, or speed presentations.',
  },
  '10-minutes': {
    seconds: 600,
    label: '10 Minutes',
    name: '10 Minute Timer',
    description: 'Set a 10 minute online timer with sound notifications. Perfect for focused work sprints, workouts, and meetings.',
  },
  '15-minutes': {
    seconds: 900,
    label: '15 Minutes',
    name: '15 Minute Timer',
    description: 'Set a 15 minute online timer with audio chime. Ideal for power naps, coffee breaks, and standup meetings.',
  },
  '20-minutes': {
    seconds: 1200,
    label: '20 Minutes',
    name: '20 Minute Timer',
    description: 'Set a 20 minute online timer. Standard Pomodoro rest cycle and yoga interval clock.',
  },
  '30-minutes': {
    seconds: 1800,
    label: '30 Minutes',
    name: '30 Minute Timer',
    description: 'Set a 30 minute countdown timer. Perfect for baking, study intervals, audiobooks, and exercise sessions.',
  },
  '45-minutes': {
    seconds: 2700,
    label: '45 Minutes',
    name: '45 Minute Timer',
    description: 'Set a 45 minute academic class period and deep work session timer with audio alarm.',
  },
  '1-hour': {
    seconds: 3600,
    label: '1 Hour',
    name: '1 Hour Timer',
    description: 'Set a 60 minute online countdown timer. Tab-resilient background timer for study blocks, exams, and roasting.',
  },
  '2-hours': {
    seconds: 7200,
    label: '2 Hours',
    name: '2 Hour Timer',
    description: 'Set a 2 hour online timer with full-screen mode and audible alarm notification upon completion.',
  },
};

export async function generateStaticParams() {
  return Object.keys(DURATION_MAP).map(duration => ({ duration }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { duration } = await params;
  const item = DURATION_MAP[duration.toLowerCase()];

  if (!item) {
    return { title: 'Timer Not Found — GlobalTime' };
  }

  return {
    title: `${item.name} — Online Countdown Timer with Sound`,
    description: item.description,
    alternates: {
      canonical: `https://globaltime.org/timer/${duration.toLowerCase()}`,
    },
    openGraph: {
      title: `${item.name} — GlobalTime`,
      description: item.description,
      url: `https://globaltime.org/timer/${duration.toLowerCase()}`,
    },
  };
}

export default async function TimerDurationPage({ params }: Props) {
  const { duration } = await params;
  const item = DURATION_MAP[duration.toLowerCase()];

  if (!item) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: item.name,
    description: item.description,
    url: `https://globaltime.org/timer/${duration.toLowerCase()}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globaltime.org' },
        { '@type': 'ListItem', position: 2, name: 'Timer', item: 'https://globaltime.org/timer' },
        { '@type': 'ListItem', position: 3, name: item.label, item: `https://globaltime.org/timer/${duration.toLowerCase()}` },
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
        {/* Navigation Breadcrumbs & Header */}
        <div className="space-y-4">
          <Breadcrumbs items={[{ name: 'Timer', url: '/timer' }, { name: item.label, url: `/timer/${duration.toLowerCase()}` }]} />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Timer className="w-3.5 h-3.5" />
                Precision Chronometer Countdown
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {item.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Timer Suite Client */}
        <TimerSuiteClient
          initialSeconds={item.seconds}
          title={item.name}
          presetSlug={duration.toLowerCase()}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Precision Clocks & Timers" />
      </div>
    </div>
  );
}
