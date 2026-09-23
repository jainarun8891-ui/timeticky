import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/compact-calendar'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/compact-calendar'
);

export default function CompactCalendarPage() {
  const year = new Date().getFullYear();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const fullMonthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Calendar","url":"/calendar"},{"name":"Compact Year View","url":"/compact-calendar"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Calendar', url: '/calendar' },
          { name: 'Compact Calendar', url: '/compact-calendar' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            12-Month Panoramic View
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {content.h1}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
            {content.description}
          </p>
        </div>

        <Link
          href="/calendar"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
        >
          View Full Monthly Calendar <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 12-Month Compact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((name, mIdx) => {
          const days = new Date(year, mIdx + 1, 0).getDate();
          return (
            <div key={name} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{fullMonthNames[mIdx]}</h3>
                <span className="text-[10px] text-slate-400 font-mono">{days} Days</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                {Array.from({ length: days }).map((_, i) => (
                  <div key={i} className="py-0.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="High-Density Visual Project Planning" />

      {/* FAQ Accordion */}
      <FaqAccordion
        items={content.faqs}
        title="Compact Calendar FAQs"
        subtitle="Frequently asked questions regarding single-screen calendars, navigation, and weekend formatting."
      />

      {/* Hub Navigation */}
      <RelatedLinksHub currentPath="/compact-calendar" title="Explore Calendars, Dates &amp; Calculators" />
    </div>
  );
}
