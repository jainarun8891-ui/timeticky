"use client";

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Search, Sparkles, Clock, Globe, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { 
  HOME_FAQS, 
  MEETING_PLANNER_FAQS, 
  TIME_DIFFERENCE_FAQS, 
  DST_FAQS, 
  UNIX_TIME_FAQS, 
  CLOCK_ACCURACY_FAQS 
} from '@/lib/seo/page-faqs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';

export default function MasterFaqPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'accuracy' | 'timezones' | 'dst' | 'meeting' | 'unix'>('all');

  const allFaqs = [
    ...HOME_FAQS.map(f => ({ ...f, section: 'General & Accuracy' })),
    ...CLOCK_ACCURACY_FAQS.map(f => ({ ...f, section: 'General & Accuracy' })),
    ...TIME_DIFFERENCE_FAQS.map(f => ({ ...f, section: 'Time Zones & Difference' })),
    ...DST_FAQS.map(f => ({ ...f, section: 'Daylight Saving Time' })),
    ...MEETING_PLANNER_FAQS.map(f => ({ ...f, section: 'Meeting Planning' })),
    ...UNIX_TIME_FAQS.map(f => ({ ...f, section: 'Unix & Developer' }))
  ];

  const filtered = allFaqs.filter(f => {
    const matchesSearch = f.question.toLowerCase().includes(search.toLowerCase()) || 
                          f.answer.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'accuracy') return matchesSearch && f.section === 'General & Accuracy';
    if (activeTab === 'timezones') return matchesSearch && f.section === 'Time Zones & Difference';
    if (activeTab === 'dst') return matchesSearch && f.section === 'Daylight Saving Time';
    if (activeTab === 'meeting') return matchesSearch && f.section === 'Meeting Planning';
    if (activeTab === 'unix') return matchesSearch && f.section === 'Unix & Developer';
    return matchesSearch;
  });

  return (
    <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 space-y-10">
      <Breadcrumbs items={[{"name":"Frequently Asked Questions","url":"/faq"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: "Home", url: "/" },
          { name: "Frequently Asked Questions", url: "/faq" }
        ]}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-2xs">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base & Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
          Comprehensive answers on atomic clock calibration, timezone calculations, daylight saving schedules, and international meeting frameworks.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search any question or keyword (e.g. atomic, DST 2025, NTP, UTC)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder-slate-400 outline-hidden shadow-xs focus:border-blue-500"
        />
      </div>

      {/* Category Pills */}
      <div className="flex justify-center overflow-x-auto no-scrollbar gap-1.5 py-1">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'accuracy', label: 'Atomic Sync & NTP' },
          { id: 'timezones', label: 'Time Zones & Offsets' },
          { id: 'dst', label: 'Daylight Saving 2025' },
          { id: 'meeting', label: 'Meeting Planner' },
          { id: 'unix', label: 'Unix & Developers' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filtered Accordion */}
      <div className="max-w-4xl mx-auto">
        <FaqAccordion
          items={filtered}
          title={`${filtered.length} Answered Questions`}
          subtitle="Click on any question below to view detailed chronometry explanations and reference sources."
        />
      </div>

      {/* Ubiquitous Related Links */}
      <RelatedLinksHub />
    </div>
  );
}
