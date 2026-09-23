import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { Clock, Globe, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/utc'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/utc'
);

export default function UtcPage() {
  const utcNow = new Date();
  const utcString = utcNow.toUTCString();
  const isoString = utcNow.toISOString();

  const utcOffsetList = [
    { name: 'UTC-10 (HST)', city: 'Honolulu', offset: '-10 hrs', link: '/utc-offset/utc-minus-10' },
    { name: 'UTC-9 (AKST)', city: 'Anchorage', offset: '-9 hrs', link: '/utc-offset/utc-minus-9' },
    { name: 'UTC-8 (PST)', city: 'Los Angeles / Vancouver', offset: '-8 hrs', link: '/utc-offset/utc-minus-8' },
    { name: 'UTC-7 (MST)', city: 'Denver / Phoenix', offset: '-7 hrs', link: '/utc-offset/utc-minus-7' },
    { name: 'UTC-6 (CST)', city: 'Chicago / Mexico City', offset: '-6 hrs', link: '/utc-offset/utc-minus-6' },
    { name: 'UTC-5 (EST)', city: 'New York / Toronto', offset: '-5 hrs', link: '/utc-offset/utc-minus-5' },
    { name: 'UTC-4 (AST)', city: 'Santiago / Halifax', offset: '-4 hrs', link: '/utc-offset/utc-minus-4' },
    { name: 'UTC-3 (ART/BRT)', city: 'Buenos Aires / São Paulo', offset: '-3 hrs', link: '/utc-offset/utc-minus-3' },
    { name: 'UTC+0 (GMT/WET)', city: 'London / Dublin / Lisbon', offset: '0 hrs', link: '/utc-offset/utc-plus-0' },
    { name: 'UTC+1 (CET)', city: 'Paris / Berlin / Rome', offset: '+1 hr', link: '/utc-offset/utc-plus-1' },
    { name: 'UTC+2 (EET/CAT)', city: 'Cairo / Athens / Johannesburg', offset: '+2 hrs', link: '/utc-offset/utc-plus-2' },
    { name: 'UTC+3 (MSK/EAT)', city: 'Riyadh / Moscow / Nairobi', offset: '+3 hrs', link: '/utc-offset/utc-plus-3' },
    { name: 'UTC+4 (GST)', city: 'Dubai / Baku', offset: '+4 hrs', link: '/utc-offset/utc-plus-4' },
    { name: 'UTC+5 (PKT)', city: 'Karachi / Tashkent', offset: '+5 hrs', link: '/utc-offset/utc-plus-5' },
    { name: 'UTC+5:30 (IST)', city: 'New Delhi / Mumbai', offset: '+5.5 hrs', link: '/utc-offset/utc-plus-5-30' },
    { name: 'UTC+5:45 (NPT)', city: 'Kathmandu', offset: '+5.75 hrs', link: '/utc-offset/utc-plus-5-45' },
    { name: 'UTC+6 (BST)', city: 'Dhaka / Almaty', offset: '+6 hrs', link: '/utc-offset/utc-plus-6' },
    { name: 'UTC+7 (ICT)', city: 'Bangkok / Jakarta / Hanoi', offset: '+7 hrs', link: '/utc-offset/utc-plus-7' },
    { name: 'UTC+8 (CST/SGT)', city: 'Singapore / Beijing / Taipei', offset: '+8 hrs', link: '/utc-offset/utc-plus-8' },
    { name: 'UTC+9 (JST/KST)', city: 'Tokyo / Seoul', offset: '+9 hrs', link: '/utc-offset/utc-plus-9' },
    { name: 'UTC+9:30 (ACST)', city: 'Adelaide / Darwin', offset: '+9.5 hrs', link: '/utc-offset/utc-plus-9-30' },
    { name: 'UTC+10 (AEST)', city: 'Sydney / Melbourne / Brisbane', offset: '+10 hrs', link: '/utc-offset/utc-plus-10' },
    { name: 'UTC+11 (SBT)', city: 'Nouméa / Solomon Islands', offset: '+11 hrs', link: '/utc-offset/utc-plus-11' },
    { name: 'UTC+12 (NZST)', city: 'Auckland / Fiji', offset: '+12 hrs', link: '/utc-offset/utc-plus-12' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Coordinated Universal Time (UTC)', url: '/utc' }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Hero Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>The Planetary Primary Time Standard</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
          {content.description}
        </p>
      </div>

      {/* Live Clock Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-blue-900/40 relative overflow-hidden text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" /> Zero Daylight Saving Shift · Constant Reference
        </div>
        
        <div className="text-3xl sm:text-5xl lg:text-6xl font-mono font-black tracking-tight text-white py-2">
          {utcString.split(' ').slice(4, 5)[0] || '00:00:00'} <span className="text-blue-400 text-xl sm:text-3xl">UTC</span>
        </div>

        <div className="text-sm sm:text-base text-slate-300 font-medium">
          {utcString.split(' ').slice(0, 4).join(' ')}
        </div>

        <div className="pt-2 text-xs font-mono text-slate-400 bg-slate-950/60 py-2 px-4 rounded-xl inline-block border border-slate-800">
          ISO 8601: <span className="text-blue-300">{isoString}</span>
        </div>
      </div>

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Planetary Atomic Standard Guide" />

      {/* Global Offset Grid */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Canonical Global UTC Offsets
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Every standard time zone on Earth is defined as an offset from UTC, ranging from UTC-12 (Baker Island) to UTC+14 (Line Islands, Kiribati):
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {utcOffsetList.map(item => (
            <Link
              key={item.name}
              href={item.link}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 hover:border-blue-500 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                  {item.name}
                </span>
                <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                  {item.offset}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-between">
                <span>{item.city}</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Structured FAQs */}
      <FaqAccordion
        title="Frequently Asked Questions About UTC"
        subtitle="Common questions about Coordinated Universal Time, leap seconds, and international synchronization."
        items={content.faqs}
      />

      <RelatedLinksHub
        currentPath="/utc"
        title="Explore Related Time Utilities"
        subtitle="Convert time zones, check solar hours, or test atomic clock accuracy."
      />
    </div>
  );
}
