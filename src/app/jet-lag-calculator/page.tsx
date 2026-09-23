import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import { JetLagCalculatorClient } from './JetLagCalculatorClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Plane, Compass, Sparkles, ShieldCheck } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/jet-lag-calculator'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/jet-lag-calculator'
);

export default function JetLagCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Jet Lag & Flight Time", url: "/jet-lag-calculator" }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Jet Lag Calculator",
          category: "HealthApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Plane className="w-3.5 h-3.5" />
            Aviation Chronobiology &amp; Travel Optimization
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Great Circle Orthodromic Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Hour-by-Hour Light Prescription</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>East/West Phase Adaptation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Jet Lag Studio Client Component */}
      <JetLagCalculatorClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Circadian Chronobiology Guide" />

      {/* FAQs */}
      <div className="pt-2">
        <FaqAccordion
          title="Frequently Asked Questions About Jet Lag & Circadian Adaptation"
          subtitle="Learn the scientific principles behind circadian phase shifts and recovery protocols."
          items={content.faqs}
        />
      </div>

      {/* Related Links */}
      <RelatedLinksHub
        currentPath="/jet-lag-calculator"
        title="Explore Related Travel & Time Tools"
        subtitle="Plan cross-border meetings, check international time differences, and convert time zones."
      />
    </div>
  );
}
