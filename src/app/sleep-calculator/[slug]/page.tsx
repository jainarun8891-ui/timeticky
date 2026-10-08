import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { SleepCalculatorClient } from '../SleepCalculatorClient';
import {
  POPULAR_SLEEP_PRESETS,
  parseSleepSlug,
  formatTime12,
} from '@/lib/sleep/sleep-calc';
import { Brain, Sparkles, Moon, Sun } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POPULAR_SLEEP_PRESETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSleepSlug(slug);

  if (!parsed) {
    return buildPageMetadata(
      'Sleep Cycle Schedule',
      'Calculate optimal sleep cycles and wake-up times to avoid grogginess.',
      `/sleep-calculator/${slug}`
    );
  }

  return buildPageMetadata(
    parsed.title,
    parsed.description,
    `/sleep-calculator/${slug}`
  );
}

export default async function ProgrammaticSleepPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSleepSlug(slug);

  if (!parsed) {
    notFound();
  }

  const timeFormatted = formatTime12(new Date(2026, 0, 1, parsed.hour, parsed.minute));

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `TimeNumbers Sleep Cycle Calculator — ${parsed.title}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: parsed.description,
  };

  const dynamicFaqs: FaqItem[] = [
    {
      question: parsed.mode === 'wake'
        ? `What is the exact best time to sleep to wake up at ${timeFormatted}?`
        : `What is the best time to wake up if I sleep at ${timeFormatted}?`,
      answer: parsed.mode === 'wake'
        ? `To wake up alert at ${timeFormatted}, you should fall asleep at either 9:46 PM (6 cycles, 9h), 11:16 PM (5 cycles, 7.5h recommended), 12:46 AM (4 cycles, 6h), or 2:16 AM (3 cycles, 4.5h), with a 14-minute runway to fall asleep.`
        : `If you fall asleep at ${timeFormatted}, your natural 90-minute sleep cycle completions occur at intervals of 4.5h, 6.0h, 7.5h, and 9.0h (plus 14 minutes latency). Waking up at 5 cycles gives the highest cognitive recovery.`
    },
    {
      question: 'How does 90-minute sleep cycle timing eliminate morning fatigue?',
      answer:
        'When your alarm rings in the middle of deep slow-wave sleep (Stage 3), your brain experiences sleep inertia—a disorienting fog caused by sudden awakening. Timing your sleep to end at the light sleep conclusion of a 90-minute cycle ensures cortisol and body temperature are naturally primed for awakening.'
    },
    {
      question: 'What if I wake up before my alarm?',
      answer:
        'If you wake up naturally 15 to 20 minutes before your scheduled alarm feeling clear-headed, get out of bed! Your body has naturally finished a sleep cycle. Falling back asleep will pull you into a new cycle, guaranteeing you wake up groggy when the alarm finally rings.'
    }
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Sleep Calculator', url: '/sleep-calculator' },
          { name: parsed.title, url: `/sleep-calculator/${slug}` },
        ]}
      />

      {/* Main Interactive Client pre-configured to this programmatic route */}
      <SleepCalculatorClient
        initialMode={parsed.mode}
        initialHour={parsed.hour}
        initialMinute={parsed.minute}
        customHeading={parsed.title}
        customDescription={parsed.description}
      />

      {/* Programmatic In-Depth SEO Analysis */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-600" />
          <span>Scientific Chrono-Breakdown for {timeFormatted}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              The 14-Minute Latency Window
            </h3>
            <p>
              When planning around {timeFormatted}, remember that getting into bed is not instantaneous sleep. Clinical polysomnography data demonstrates healthy adults take an average of 14 minutes to relax, regulate their breathing, and cross the threshold into Stage 1 sleep.
            </p>
            <p>
              Setting your bedroom temperature to 65°F (18°C) and minimizing blue-light exposure 45 minutes prior drastically speeds up this latency period.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Circadian Synchronization
            </h3>
            <p>
              Your body naturally pulses melatonin in accordance with sunlight and circadian markers. Aligning your wake-up time of {timeFormatted} consistently across weekdays and weekends cements your circadian rhythm, dramatically boosting morning energy.
            </p>
            <p>
              Upon waking at {timeFormatted}, immediately view natural outdoor light for 5 to 10 minutes to trigger morning cortisol and reset your retinal master clock.
            </p>
          </div>
        </div>
      </section>

      {/* Programmatic FAQ Accordion */}
      <FaqAccordion
        items={dynamicFaqs}
        title={`Questions About Sleeping for ${timeFormatted}`}
        subtitle="Detailed circadian calculations, sleep debt recovery, and bedtime strategies."
      />

      {/* Related Links Hub */}
      <RelatedLinksHub title="Explore Related Time & Productivity Tools" />
    </main>
  );
}
