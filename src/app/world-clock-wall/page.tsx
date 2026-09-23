import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import { WorldClockWallClient } from './WorldClockWallClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LayoutGrid, Monitor, ShieldCheck, Clock } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/world-clock-wall'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/world-clock-wall'
);

export default function WorldClockWallPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "World Clock Wall", url: "/world-clock-wall" }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Monitor className="w-3.5 h-3.5" />
            Operations Command Center &amp; Trading Floor Wall
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Synchronized Sweep Second Hand</span>
            </div>
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-cyan-400" />
              <span>Custom Multi-City Grid</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Fullscreen Kiosk Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* World Clock Wall Client Studio */}
      <WorldClockWallClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Global Operations Display" />

      {/* FAQs */}
      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About World Clock Wall"
          subtitle="Learn how to configure multi-clock displays, kiosk mode, and trading floor dashboards."
          items={content.faqs}
        />
      </div>

      {/* Related Links */}
      <RelatedLinksHub
        currentPath="/world-clock-wall"
        title="Explore Additional Global Time Tools"
        subtitle="Compare offsets, plan cross-border meetings, or convert time zones."
      />
    </div>
  );
}
