import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LifeInWeeksClient } from './LifeInWeeksClient';
import { Flame, Brain, Clock, ShieldCheck, Heart, Sparkles, Sun, BookOpen } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Life in Weeks (Memento Mori) Grid — 4,160 Weeks Longevity Visualizer',
  'Visualize your entire 80-year human life in a single grid of 4,160 weeks. Discover weeks lived, remaining summers, weekends, and generate high-resolution Memento Mori wallpaper.',
  '/life-in-weeks'
);

const LIFE_FAQS: FaqItem[] = [
  {
    question: 'What is the Memento Mori "Life in Weeks" concept?',
    answer:
      'Memento Mori is a Latin phrase meaning "Remember you will die." The Life in Weeks framework visualizes an 80-year human lifespan as a finite grid of 4,160 individual squares (52 weeks × 80 years). By mapping your current age onto this grid, time transforms from an abstract concept into a tangible, finite visual reality.'
  },
  {
    question: 'How many weeks are in an average human lifespan?',
    answer:
      'A typical human life of 80 years consists of approximately 4,160 weeks. If you live to age 90, that is 4,680 weeks. At age 30, you have already lived roughly 1,560 weeks, leaving around 2,600 weeks remaining.'
  },
  {
    question: 'Why is measuring life in weeks more effective than years or days?',
    answer:
      'Days feel too numerous and fleeting, making them easy to procrastinate away. Years, on the other hand, feel too grand and distant. Weeks represent the ideal cognitive sweet spot: 52 weeks is long enough to accomplish a meaningful milestone, yet short enough that you feel each one slip away.'
  },
  {
    question: 'What does Seneca say about the shortness of life?',
    answer:
      'In his famous 49 CE treatise "On the Shortness of Life" (De Brevitate Vitae), the Roman Stoic Seneca wrote: "It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a sufficiently generous estimate has been given to us for the highest achievements, if it were all well invested."'
  },
  {
    question: 'How does visualizing remaining summers change behavior?',
    answer:
      'Psychological studies show that mortality salience—reflecting constructively on the finite nature of time—increases empathy, decreases material anxiety, and motivates people to prioritize deep relationships, creative projects, and health over trivial distractions.'
  }
];

export default function LifeInWeeksPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeTicky Life in Weeks (Memento Mori) Grid',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'High-performance 4,160-week Memento Mori life grid visualizer with remaining summers, weekends, and Stoic philosophy insights.',
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs items={[{ name: 'Life in Weeks', url: '/life-in-weeks' }]} />

      {/* Main Interactive Client */}
      <LifeInWeeksClient />

      {/* Stoic Philosophy & Longevity Architecture Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            Perspective & Stoic Philosophy
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Why 4,160 Weeks Matters
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            We live our daily lives as though time is an endless tap. We postpone phone calls with elderly parents, procrastinate on our creative ambitions, and spend thousands of hours arguing on the internet. But looking at your 4,160 squares dispels the illusion of infinite time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              <Sun className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">The Tail End of Time</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              By the time you graduate high school at age 18, you have already spent roughly 90% of all the in-person days you will ever spend with your parents.
            </p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Finite Book Reading</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              If you read 5 books a year and have 40 years left, you will only read 200 more books in your entire lifetime. Be ruthless about what you choose to consume.
            </p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">The Present Moment</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The pulsing dot on the grid is this exact week. It is the only square you will ever possess. Spend it with intentionality and presence.
            </p>
          </article>
        </div>
      </section>

      {/* Schema-Verified FAQ Accordion */}
      <FaqAccordion
        items={LIFE_FAQS}
        title="Frequently Asked Questions About Life in Weeks"
        subtitle="Stoic wisdom, longevity math, and intentional life planning."
      />

      {/* Related Navigation Hub */}
      <RelatedLinksHub title="Explore Related Time & Productivity Tools" />
    </main>
  );
}
