import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TimerSuiteClient } from '../TimerSuiteClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Timer, Clock, ArrowRight, ShieldCheck, Sparkles, BellRing, Target } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface Props {
  params: Promise<{ duration: string }>;
}

const DURATION_MAP: Record<string, { seconds: number; label: string; name: string; description: string; tips: string; idealFor: string }> = {
  '1-minute': {
    seconds: 60,
    label: '1 Minute',
    name: '1 Minute Timer',
    description: 'Set a 1 minute online timer with sound alarm. Accurate tab-inactive countdown for quick intervals, tea steeping, and breathwork.',
    tips: 'Ideal for 4-7-8 breathing exercises, flash speed tasks, stepping away from the screen, or rapid decision drills.',
    idealFor: 'Box breathing, micro-meditation, steeped tea brewing, and quick stretch intervals.'
  },
  '5-minutes': {
    seconds: 300,
    label: '5 Minutes',
    name: '5 Minute Timer',
    description: 'Set a 5 minute online timer with alarm chime. Ideal for quick breaks, meditation, boiling eggs, or speed presentations.',
    tips: 'The standard short break duration in the Pomodoro Technique. Perfect to grab water, rest eyes, and reset focus.',
    idealFor: 'Pomodoro short rests, lightning talks, boiling soft eggs, and desk decluttering.'
  },
  '10-minutes': {
    seconds: 600,
    label: '10 Minutes',
    name: '10 Minute Timer',
    description: 'Set a 10 minute online timer with sound notifications. Perfect for focused work sprints, workouts, and meetings.',
    tips: 'An effective interval for high-intensity interval training (HIIT), daily engineering standups, and focused reading.',
    idealFor: 'Daily team standups, HIIT workouts, speed reading sessions, and quick meditation.'
  },
  '15-minutes': {
    seconds: 900,
    label: '15 Minutes',
    name: '15 Minute Timer',
    description: 'Set a 15 minute online timer with audio chime. Ideal for power naps, coffee breaks, and standup meetings.',
    tips: 'Scientifically proven optimal duration for restorative power naps without entering groggy slow-wave deep sleep.',
    idealFor: 'Restorative power napping, agile sprint planning, coffee meetings, and mindful journaling.'
  },
  '20-minutes': {
    seconds: 1200,
    label: '20 Minutes',
    name: '20 Minute Timer',
    description: 'Set a 20 minute online timer. Standard Pomodoro rest cycle and yoga interval clock.',
    tips: 'Matches the 20-20-20 ophthalmology rule: every 20 minutes, look at an object 20 feet away for 20 seconds.',
    idealFor: 'Yoga flows, eye strain relief cycles, study intervals, and culinary simmer steps.'
  },
  '30-minutes': {
    seconds: 1800,
    label: '30 Minutes',
    name: '30 Minute Timer',
    description: 'Set a 30 minute countdown timer. Perfect for baking, study intervals, audiobooks, and exercise sessions.',
    tips: 'Standard duration for corporate calendar slots, podcast recording blocks, and focused academic homework sets.',
    idealFor: 'Deep study intervals, half-hour client syncs, baking recipes, and cardio runs.'
  },
  '45-minutes': {
    seconds: 2700,
    label: '45 Minutes',
    name: '45 Minute Timer',
    description: 'Set a 45 minute academic class period and deep work session timer with audio alarm.',
    tips: 'The classic academic lecture and university class period length, maximizing memory retention before mental fatigue sets in.',
    idealFor: 'Classroom periods, focused coding sprints, thesis drafting, and gym workouts.'
  },
  '1-hour': {
    seconds: 3600,
    label: '1 Hour',
    name: '1 Hour Timer',
    description: 'Set a 60 minute online countdown timer. Tab-resilient background timer for study blocks, exams, and roasting.',
    tips: 'Gold standard for structured deep work sessions. Silence notifications and dedicate 60 uninterrupted minutes to high-value tasks.',
    idealFor: 'Deep work timeblocking, standard exams, kitchen slow-roasting, and creative writing blocks.'
  },
  '2-hours': {
    seconds: 7200,
    label: '2 Hours',
    name: '2 Hour Timer',
    description: 'Set a 2 hour online timer with full-screen mode and audible alarm notification upon completion.',
    tips: 'Ideal for extended masterclasses, full-length movie screenings, standardized practice tests, and multi-stage baking projects.',
    idealFor: 'Full mock examinations, extended coding sessions, laboratory incubation, and slow braising.'
  },
};

export async function generateStaticParams() {
  return Object.keys(DURATION_MAP).map(duration => ({ duration }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { duration } = await params;
  const item = DURATION_MAP[duration.toLowerCase()];

  if (!item) {
    return buildPageMetadata('Timer Not Found', 'Timer duration not found.', `/timer/${duration.toLowerCase()}`);
  }

  return buildPageMetadata(
    `${item.name} — Online Countdown Timer`,
    item.description,
    `/timer/${duration.toLowerCase()}`
  );
}

export default async function TimerDurationPage({ params }: Props) {
  const { duration } = await params;
  const item = DURATION_MAP[duration.toLowerCase()];

  if (!item) {
    notFound();
  }

  const timerFaqs = [
    {
      question: `How accurate is the online ${item.name}?`,
      answer: `TimeNumbers implements high-resolution timestamps derived from the browser Performance API and system clocks rather than simple setInterval ticks. This eliminates clock drift even during CPU throttling or heavy background processing.`
    },
    {
      question: `Will the ${item.name} continue counting down if I switch browser tabs?`,
      answer: `Yes. TimeNumbers calculates elapsed time based on absolute epoch timestamps. If your browser throttles inactive tabs to save battery, the timer immediately reconciles its state upon returning, guaranteeing that the alarm chimes precisely when ${item.label} expires.`
    },
    {
      question: `What are the most popular applications for a ${item.label} countdown?`,
      answer: `Common applications for this duration include: ${item.idealFor}. ${item.tips}`
    },
    {
      question: `Can I run this timer in full-screen mode?`,
      answer: `Yes. Click the full-screen button on the countdown interface to expand the display to fill your entire monitor. This is popular for classroom lectures, gym workout floors, kitchen displays, and presentation speaker views.`
    },
    {
      question: `Does the countdown require an active internet connection to work?`,
      answer: `Once the page loads, all timer calculations, sound synthesizers, and visual animations run entirely on your local device. Even if your internet connection drops momentarily, your ${item.name} will continue counting down without interruption.`
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: item.name,
    description: item.description,
    url: `https://www.timenumbers.com/timer/${duration.toLowerCase()}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Timer', item: 'https://www.timenumbers.com/timer' },
        { '@type': 'ListItem', position: 3, name: item.label, item: `https://www.timenumbers.com/timer/${duration.toLowerCase()}` },
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
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        {/* Timer Suite Client */}
        <TimerSuiteClient
          initialSeconds={item.seconds}
          title={item.name}
          presetSlug={duration.toLowerCase()}
        />

        {/* Productivity Guide Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Timeboxing Strategies for {item.label} Intervals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">The Science of Fixed-Interval Focus</h3>
              <p>
                Parkinson&apos;s Law famously dictates that &quot;work expands so as to fill the time available for its completion.&quot;
                By locking your session into a strict {item.label} window, you create positive cognitive urgency that eliminates digital distraction and decision fatigue.
              </p>
              <p>
                {item.tips} When your mind knows that an audible chime will signal the end of the block, it can commit 100% of cognitive bandwidth to the task at hand.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Background Resilience and Audio Chimes</h3>
              <p>
                Modern web browsers frequently suspend or throttle background tabs to conserve CPU cycles and battery life.
                TimeNumbers overcomes tab throttling by tracking performance timestamps against device system clocks.
              </p>
              <p>
                Whether you minimize the window, navigate to research articles, or switch to desktop spreadsheets, the countdown stays exact to the millisecond and delivers an audible alert the moment time expires.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic FAQ Accordion */}
        <FaqAccordion
          items={timerFaqs}
          title={`${item.name} FAQs`}
          subtitle={`Everything you need to know about running a ${item.label} countdown on TimeNumbers.`}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Precision Clocks & Timers" />
      </div>
    </div>
  );
}
