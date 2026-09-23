import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { ConverterHubClient } from './ConverterHubClient';
import { ArrowLeftRight, Clock, ShieldCheck, Share2 } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/converter'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/converter'
);

export default function ConverterHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Converter', url: '/converter' }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            Universal Multi-Zone Horology Hub
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
              <span>Interactive 24-Hour Slider</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Business Working Hours Indicator</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Shareable URL State</span>
            </div>
          </div>
        </div>
      </div>

      {/* Master Interactive Converter Hub Client */}
      <ConverterHubClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Cross-Border Synchronization" />

      {/* FAQs */}
      <div className="pt-2">
        <FaqAccordion
          title="Frequently Asked Questions About Multi-Zone Time Conversion"
          subtitle="Authoritative answers to common questions about global time conversion, DST, and scheduling."
          items={content.faqs}
        />
      </div>

      {/* Related Links Hub */}
      <RelatedLinksHub
        currentPath="/converter"
        title="Explore Related Horology Tools"
        subtitle="Compare times, plan cross-border meetings, or view the world clock wall."
      />

      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TimeNumbers Multi-Zone Time Converter Hub",
            "url": "https://www.timenumbers.com/converter",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
