import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { MeetingPlannerClient } from './MeetingPlannerClient';
import { Users } from 'lucide-react';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/meeting-planner'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/meeting-planner'
);

export default function MeetingPlannerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: "Meeting Planner", url: "/meeting-planner" }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Global Meeting Planner",
          category: "BusinessApplication",
          description: content.description
        }}
      />

      {/* Top Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Collaboration Tools</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          {content.h1}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {content.description}
        </p>
      </div>

      {/* Interactive Planner Grid */}
      <MeetingPlannerClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Global Collaboration Guide" />

      {/* FAQs */}
      <div className="pt-2">
        <FaqAccordion
          title="Frequently Asked Questions About Multi-Zone Meeting Planning"
          subtitle="Clear answers on scheduling international conference calls across disparate time zones."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/meeting-planner"
        title="Explore Related Horology Tools"
        subtitle="Compare times, plan cross-border meetings, or view the world clock wall."
      />
    </div>
  );
}
