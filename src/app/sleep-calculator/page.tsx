import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { SleepCalculatorClient } from './SleepCalculatorClient';
import { Moon, Bed, ShieldCheck, Zap, Brain, Activity } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Sleep Cycle Calculator — Optimal Bedtime & Wake Up Refreshed',
  'Calculate your optimal bedtime and wake-up time based on 90-minute sleep cycles. Avoid morning grogginess and sleep inertia with scientific circadian timing.',
  '/sleep-calculator'
);

const SLEEP_FAQS: FaqItem[] = [
  {
    question: 'How long is a natural human sleep cycle?',
    answer:
      'A complete sleep cycle lasts approximately 90 to 110 minutes in healthy adults. During this window, your brain progresses through Stage 1 (light transition), Stage 2 (light sleep with sleep spindles), Stage 3 (deep slow-wave delta sleep), and finally REM (rapid eye movement dreaming sleep). Waking up at the end of a 90-minute cycle leaves you feeling naturally alert.'
  },
  {
    question: 'Why do I feel exhausted even after sleeping 8 or 9 hours?',
    answer:
      'Waking up feeling disoriented and fatigued is known as "sleep inertia." This typically happens when your alarm forces you awake during Stage 3 deep slow-wave sleep. Even if you got 8 hours of total sleep, cutting off a cycle midway floods your brain with adenosine and grogginess that can take 30 to 90 minutes to dissipate.'
  },
  {
    question: 'What is the 14-minute rule for falling asleep?',
    answer:
      'Sleep latency is the amount of time it takes to transition from full wakefulness to stage 1 sleep. Clinical sleep studies indicate the healthy human average is approximately 14 minutes. The TimeNumbers Sleep Calculator automatically factors this 14-minute runway into every bedtime calculation so you reach target cycles accurately.'
  },
  {
    question: 'How many sleep cycles does an adult need per night?',
    answer:
      'Most adults require 5 full cycles (7.5 hours of sleep) or 6 full cycles (9.0 hours of sleep) for optimal hormonal regulation, memory consolidation, and muscular repair. 4 cycles (6.0 hours) is sufficient for busy periods, but sleeping fewer than 4 cycles regularly creates cumulative sleep debt.'
  },
  {
    question: 'Is it better to sleep 7.5 hours than 8 hours?',
    answer:
      'Yes, in many cases! 7.5 hours represents exactly 5 complete 90-minute cycles (450 minutes). If you sleep 8 hours, your alarm will likely sound 30 minutes into your 6th cycle—often during deep delta sleep—triggering severe sleep inertia despite having slept longer.'
  }
];

export default function SleepCalculatorPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeNumbers Sleep Cycle Calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Scientific sleep cycle calculator to calculate optimal wake-up times and bedtimes based on 90-minute ultradian circadian rhythms.',
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs items={[{ name: 'Sleep Calculator', url: '/sleep-calculator' }]} />

      {/* Main Interactive Client */}
      <SleepCalculatorClient />

      {/* Scientific Chronobiology Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <Brain className="w-4 h-4" />
            Sleep Science & Chronobiology
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            How the 90-Minute Sleep Cycle Formula Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Human sleep is not a uniform state of unconsciousness. Instead, the brain cycles repeatedly through distinct neurological stages throughout the night. Understanding this rhythm allows you to time your alarm for effortless, energized mornings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              N1-N2
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Light Sleep Phase</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Heart rate slows, body temperature drops, and muscle activity decreases. Waking up during this stage feels easy and natural, with instant cognitive clarity.
            </p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              N3
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Deep Slow-Wave Sleep</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Delta brainwaves dominate. Human growth hormone (HGH) releases to rebuild tissue and synthesize cellular proteins. Waking here triggers harsh sleep inertia.
            </p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
              REM
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Dreaming & Memory</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Rapid eye movement sleep processes emotional memories and synthesizes complex creative problem solving. Cycles conclude right after REM.
            </p>
          </article>
        </div>

        {/* Circadian Rules Box */}
        <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 space-y-3">
          <h3 className="font-bold text-blue-950 dark:text-blue-200 text-sm sm:text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            3 Golden Rules for Maximum Sleep Cycle Efficiency
          </h3>
          <ul className="text-xs sm:text-sm text-blue-900/80 dark:text-blue-300 space-y-1.5 list-disc list-inside">
            <li><strong>Respect the 14-Minute Latency:</strong> If you get into bed at 11:00 PM, you will likely fall asleep at 11:14 PM. Always account for transition time.</li>
            <li><strong>Consistency Over Length:</strong> Waking up at the exact same time 7 days a week sets your internal suprachiasmatic nucleus clock far better than sleeping in on weekends.</li>
            <li><strong>Beware Late Caffeine:</strong> Caffeine has an average metabolic half-life of 5 to 7 hours. Avoid espresso or energy drinks past 2:00 PM to preserve deep slow-wave sleep.</li>
          </ul>
        </div>
      </section>

      {/* Schema-Verified FAQ Accordion */}
      <FaqAccordion
        items={SLEEP_FAQS}
        title="Frequently Asked Questions About Sleep Cycles"
        subtitle="Scientific insights into REM phases, sleep inertia, and circadian rhythm optimization."
      />

      {/* Related Navigation Hub */}
      <RelatedLinksHub title="Explore More Time & Productivity Tools" />
    </main>
  );
}
