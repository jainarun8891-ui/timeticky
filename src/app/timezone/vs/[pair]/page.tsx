import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { TIMEZONE_VS_PAIRS, TimezoneVsPair } from '@/lib/time/timezone-vs-data';
import { TimezoneVsClient } from '../TimezoneVsClient';

interface Props {
  params: Promise<{ pair: string }>;
}

export async function generateStaticParams() {
  return Object.keys(TIMEZONE_VS_PAIRS).map((pair) => ({ pair }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const data = TIMEZONE_VS_PAIRS[pair];
  if (!data) return {};

  const title = `${data.zoneA} vs ${data.zoneB} Time Difference — Exact Hours Explained`;
  const desc = data.quickAnswerEn;

  return buildPageMetadata(
    title,
    desc,
    `/timezone/vs/${pair}`
  );
}

export default async function TimezoneVsSinglePage({ params }: Props) {
  const { pair } = await params;
  const data = TIMEZONE_VS_PAIRS[pair];
  if (!data) notFound();

  const faqs = [
    {
      question: `What is the exact time difference between ${data.zoneA} and ${data.zoneB}?`,
      answer: data.quickAnswerEn,
    },
    {
      question: `Do both ${data.zoneA} and ${data.zoneB} observe Daylight Saving Time?`,
      answer: data.detailsEn.dstExplanation,
    },
    {
      question: `Which major cities are in ${data.zoneA}?`,
      answer: `${data.zoneA} (${data.nameA}) covers: ${data.detailsEn.regionsA.join(', ')}.`,
    },
    {
      question: `Which major cities are in ${data.zoneB}?`,
      answer: `${data.zoneB} (${data.nameB}) covers: ${data.detailsEn.regionsB.join(', ')}.`,
    }
  ];

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${data.zoneA} vs ${data.zoneB} Time Difference Calculator`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: data.quickAnswerEn
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Timezone Comparisons', url: '/timezone/vs' },
          { name: `${data.zoneA} vs ${data.zoneB}`, url: `/timezone/vs/${pair}` }
        ]}
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Timezone Comparisons', url: '/timezone/vs' },
          { name: `${data.zoneA} vs ${data.zoneB}`, url: `/timezone/vs/${pair}` }
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      {/* Hero Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {data.zoneA} vs {data.zoneB} Time Difference
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Comparing {data.nameA} ({data.zoneA}) and {data.nameB} ({data.zoneB}). Live side-by-side clocks, interactive slider, and affected regions.
        </p>
      </div>

      {/* Interactive Tool Client */}
      <TimezoneVsClient currentPair={pair} />

      {/* Detailed Plain-English Guide */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {data.detailsEn.heading}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {data.detailsEn.text}
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Daylight Saving Time (DST) Transitions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {data.detailsEn.dstExplanation}
          </p>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={faqs}
        title={`Frequently Asked Questions About ${data.zoneA} vs ${data.zoneB}`}
        subtitle={`Everything you need to know about comparing ${data.zoneA} and ${data.zoneB}.`}
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explore More Timezone Comparisons & Converters" />
    </div>
  );
}
