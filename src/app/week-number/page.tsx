import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/week-number'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/week-number'
);

export default function WeekNumberPage() {
  const now = new Date();
  const target = new Date(now.valueOf());
  const dayNr = (now.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
  const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);

  const totalWeeksInYear = 52;
  const weeksRemaining = Math.max(0, totalWeeksInYear - weekNumber);

  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / 86400000) + 1;
  const percentElapsed = ((diff / (endOfYear.getTime() - startOfYear.getTime())) * 100).toFixed(1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Week Number","url":"/week-number"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Week Number', url: '/week-number' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Current ISO Week Number Calculator",
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      <header className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          {content.h1}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400">
          {content.description}
        </p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 shadow-sm text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block">
          Current ISO 8601 Week
        </span>
        <div className="text-8xl sm:text-9xl font-black font-mono my-4 text-slate-900 dark:text-white">
          {weekNumber}
        </div>
        <p className="text-xs text-slate-400 font-mono">
          Day {dayOfYear} of 365 • Year {now.getFullYear()} • {percentElapsed}% of year completed
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400">Weeks Remaining</span>
          <div className="text-4xl font-black font-mono text-slate-900 dark:text-white">{weeksRemaining}</div>
          <span className="text-xs text-slate-400">weeks left in {now.getFullYear()}</span>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400">Day of Year</span>
          <div className="text-4xl font-black font-mono text-slate-900 dark:text-white">{dayOfYear}</div>
          <span className="text-xs text-slate-400">out of 365 days</span>
        </div>
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
          <span className="text-xs font-bold uppercase text-slate-400">Year Progress</span>
          <div className="text-4xl font-black font-mono text-blue-600 dark:text-blue-400">{percentElapsed}%</div>
          <span className="text-xs text-slate-400">elapsed through today</span>
        </div>
      </div>

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="ISO 8601 Calendar Telemetry & Sprint Planning" />

      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={content.faqs} title="Frequently Asked Questions About Week Numbers" />
      </section>

      <RelatedLinksHub currentPath="/week-number" />
    </div>
  );
}
