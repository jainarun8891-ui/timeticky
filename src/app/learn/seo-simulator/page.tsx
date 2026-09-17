import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { SeoSimulatorClient } from './SeoSimulatorClient';

export const metadata: Metadata = buildPageMetadata(
  "SEO Simulator — Domain Authority vs Keyword Difficulty | TimeNumbers",
  "Interactive simulator demonstrating how programmatic long-tail pages build Domain Authority (DA) to outrank legacy incumbents for competitive short-tail keywords.",
  "/learn/seo-simulator"
);

export default function SeoSimulatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Learn","url":"/learn"},{"name":"SEO Simulator","url":"/learn/seo-simulator"}]} />
      <SeoSimulatorClient />
    </div>
  );
}
