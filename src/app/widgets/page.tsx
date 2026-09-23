import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { WidgetsClient } from './WidgetsClient';
import {
  Code,
  Globe,
  Timer,
  ShieldCheck,
  Sparkles,
  Plane,
  Briefcase
} from 'lucide-react';

const content = HUB_PAGES_CUSTOM_CONTENT['/widgets'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/widgets'
);

export default function WidgetsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ name: 'Widgets', url: '/widgets' }]} />
        <JsonLd
          type="breadcrumb"
          data={[
            { name: 'Home', url: '/' },
            { name: 'Clock Widgets', url: '/widgets' },
          ]}
        />
        <JsonLd type="faq" data={content.faqs} />
        <JsonLd
          type="application"
          data={{
            name: content.h1,
            category: "UtilitiesApplication",
            description: content.description
          }}
        />

        <WidgetsClient h1Title={content.h1} description={content.description} />

        {/* Educational Guide Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {content.headings[0]}
            </h2>
            {content.page_text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>

          {content.headings.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {content.headings.slice(1).map((heading, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Lightweight embed iframe, dark/light styles, and instant compatibility with WordPress, Notion, and Squarespace.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">100% Free &amp; Ad-Free</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No tracking scripts, popups, or paid upgrade prompts. Clean, high-performance HTML embed.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 w-fit">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Travel &amp; Hospitality</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ideal for hotels, airline blogs, and tour agencies wanting to show live destination times to clients.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 w-fit">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Remote Teams &amp; Portals</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Embed directly into internal Notion wikis, team Slack canvases, or company intranets.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <FaqAccordion
          items={content.faqs}
          title="Frequently Asked Questions About Embeddable Widgets"
          subtitle="Everything you need to know about implementing TimeNumbers widgets on your website."
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Free Tools & Converters" />
      </div>
    </div>
  );
}
