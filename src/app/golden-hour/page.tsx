import React from 'react';
import { Metadata } from 'next';
import { GoldenHourClient } from './GoldenHourClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Camera, Sun, Eye, Aperture } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/golden-hour'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/golden-hour'
);

export default function GoldenHourPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Golden Hour', url: '/golden-hour' }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Golden Hour', url: '/golden-hour' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Camera className="w-3.5 h-3.5" />
            Natural Lighting Ephemeris Calculator
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Solar Elevation (-4° to +6°)</span>
            </div>
            <div className="flex items-center gap-2">
              <Aperture className="w-4 h-4 text-cyan-400" />
              <span>Blue Hour Twilight (-6° to -4°)</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Rayleigh Scattering Optics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Client */}
      <GoldenHourClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Natural Lighting Physics & Timing" />

      {/* FAQs */}
      <FaqAccordion
        items={content.faqs}
        title="Frequently Asked Questions About Golden &amp; Blue Hour"
        subtitle="Learn how solar geometry, latitude, and atmospheric optics influence natural light."
      />

      {/* Cross Links */}
      <RelatedLinksHub
        currentPath="/golden-hour"
        title="Explore Astronomy &amp; Solar Ephemeris Tools"
        subtitle="Calculate sunrise and sunset times, view live moon phases, or track daylight hours worldwide."
      />

      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TimeNumbers Golden Hour Calculator",
            "url": "https://www.timenumbers.com/golden-hour",
            "applicationCategory": "PhotographyApplication",
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
