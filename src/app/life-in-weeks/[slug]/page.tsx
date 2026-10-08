import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LifeInWeeksClient } from '../LifeInWeeksClient';
import { LIFE_PROGRAMMATIC_PRESETS } from '@/lib/life/life-weeks';
import { Flame, Brain, Calendar, Compass } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LIFE_PROGRAMMATIC_PRESETS.map((p) => ({ slug: p.slug }));
}

function resolveAgeFromSlug(slug: string): number | null {
  const preset = LIFE_PROGRAMMATIC_PRESETS.find((p) => p.slug === slug);
  if (preset) return preset.age;

  const match = slug.match(/^age-(\d{1,2})$/i);
  if (match) {
    const age = parseInt(match[1], 10);
    if (age > 0 && age <= 100) return age;
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const age = resolveAgeFromSlug(slug);

  if (age === null) {
    return buildPageMetadata(
      'Life in Weeks Grid',
      'Visualize your lifespan in a 4,160-week Memento Mori matrix.',
      `/life-in-weeks/${slug}`
    );
  }

  const weeksLived = age * 52;
  const weeksLeft = Math.max(0, 80 * 52 - weeksLived);

  return buildPageMetadata(
    `Life in Weeks at Age ${age} — Memento Mori Longevity Grid`,
    `At age ${age}, you have lived approximately ${weeksLived} weeks with ${weeksLeft} weeks remaining out of an 80-year life. Visualize your personal Memento Mori grid.`,
    `/life-in-weeks/${slug}`
  );
}

export default async function ProgrammaticLifePage({ params }: Props) {
  const { slug } = await params;
  const age = resolveAgeFromSlug(slug);

  if (age === null) {
    notFound();
  }

  // Calculate synthetic birthdate for this age based on current year
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const birthdateStr = `${birthYear}-06-15`;

  const weeksLived = age * 52;
  const weeksLeft = Math.max(0, 80 * 52 - weeksLived);
  const percentageLived = ((weeksLived / (80 * 52)) * 100).toFixed(1);

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `TimeNumbers Life in Weeks at Age ${age}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: `Memento Mori 4,160-week longevity grid tailored for age ${age}.`,
  };

  const dynamicFaqs: FaqItem[] = [
    {
      question: `How much of life is lived by age ${age}?`,
      answer: `Assuming an average life expectancy of 80 years (4,160 weeks), at age ${age} you have completed approximately ${weeksLived} weeks, representing ${percentageLived}% of your total life journey. You have roughly ${weeksLeft} weeks remaining.`
    },
    {
      question: `What life era is age ${age} according to developmental psychology?`,
      answer: age < 30
        ? 'Ages 18-29 represent the foundational era of exploration, identity formation, career acceleration, and maximum neuroplasticity.'
        : age < 50
        ? 'Ages 30-49 represent the peak compounding era of career leadership, deep domain mastery, family building, and high-impact achievement.'
        : 'Ages 50+ represent the era of mentorship, executive wisdom, philosophical perspective, and shaping your long-term legacy.'
    },
    {
      question: `How many summers do you have left at age ${age}?`,
      answer: `Assuming an 80-year lifespan, at age ${age} you have approximately ${Math.max(0, 80 - age)} summers remaining to experience warm ocean breezes and outdoor adventures.`
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
          { name: 'Life in Weeks', url: '/life-in-weeks' },
          { name: `Age ${age}`, url: `/life-in-weeks/${slug}` },
        ]}
      />

      {/* Main Interactive Client */}
      <LifeInWeeksClient
        initialBirthdate={birthdateStr}
        customHeading={`Your Life in Weeks at Age ${age}`}
        customDescription={`You have lived ${weeksLived.toLocaleString()} weeks (${percentageLived}%). Here is your exact visual perspective of the ${weeksLeft.toLocaleString()} weeks remaining.`}
      />

      {/* Programmatic Age Milestone Context */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-rose-500" />
          <span>The Psychology of Turning Age {age}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              The Reality of Compounding
            </h3>
            <p>
              At age {age}, small daily habits—reading 20 pages a day, lifting weights 3 times a week, or investing consistently—compound with enormous force over your remaining {weeksLeft.toLocaleString()} weeks.
            </p>
            <p>
              Conversely, unconscious time sinks like mindless social scrolling compound negatively. Seeing your remaining boxes clarifies what deserves your attention.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Intentional Seasonality
            </h3>
            <p>
              Divide your remaining years into deliberate seasons. Rather than hoping you will eventually take that dream journey or write that book, schedule it directly into your upcoming blocks of 52 weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Programmatic FAQ Accordion */}
      <FaqAccordion
        items={dynamicFaqs}
        title={`Questions About Longevity at Age ${age}`}
        subtitle="Chronological perspective, remaining milestones, and intentional habit design."
      />

      {/* Related Links Hub */}
      <RelatedLinksHub title="Explore Related Time & Productivity Tools" />
    </main>
  );
}
