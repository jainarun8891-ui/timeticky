import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { OverlapCalculatorClient } from './OverlapCalculatorClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_CUSTOM_CONTENT['/overlap-calculator'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/overlap-calculator'
);

export default function OverlapCalculatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: "Overlap Calculator", url: "/overlap-calculator" }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Time Zone Overlap Calculator",
          category: "BusinessApplication",
          description: content.description
        }}
      />

      <OverlapCalculatorClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel="Distributed Team Synchronization" />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title="Frequently Asked Questions: Remote Team Overlap"
          subtitle="Learn how to balance synchronous and asynchronous workflows across distributed time zones."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/overlap-calculator"
        title="Explore Related Horology Tools"
        subtitle="Compare times, plan cross-border meetings, or view the world clock wall."
      />
    </div>
  );
}
