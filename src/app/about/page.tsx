import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Clock, ExternalLink, Sparkles } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/about'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/about'
);

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'About TimeNumbers', url: '/about' }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>Atomic Time & Planetary Chronometry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {content.description}
        </p>
      </div>

      {/* Editorial Content Section */}
      <EditorialContentBlock content={content} badgeLabel="Our Horological Philosophy" />

      {/* Sister Platform & Digital Ecosystem (Contextual Dofollow Link for Domain Authority) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-slate-50 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900/90 border border-amber-200/80 dark:border-amber-800/60 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Our Digital Ecosystem &amp; Sister Products
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Beyond chronometry and precision global world clocks, our digital studio crafts web platforms celebrating mindfulness, tradition, and spiritual heritage. Discover our sister devotional audio and Vedic wisdom platform:
        </p>
        <div className="pt-2">
          <a
            href="https://www.bhaktivoice.com"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-200/90 dark:border-amber-700/60 hover:border-orange-500 dark:hover:border-orange-500 shadow-sm hover:shadow-md transition-all group max-w-xl"
            title="BhaktiVoice - Divine Bhajans, Mantras, Aartis & Spiritual Audio"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
              ॐ
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  BhaktiVoice (www.bhaktivoice.com)
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-orange-500 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                Divine Bhajans, Vedic Mantras, Daily Aartis &amp; Spiritual Wisdom
              </p>
            </div>
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={content.faqs} title="Frequently Asked Questions: About TimeNumbers" />
      </div>

      <RelatedLinksHub
        currentPath="/about"
        title="Explore What TimeNumbers Offers"
        subtitle="Check out live atomic clocks, time difference tools, and planetary solar maps."
      />
    </div>
  );
}
