import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { OverlapCalculatorClient } from './OverlapCalculatorClient';

export const metadata: Metadata = buildPageMetadata(
  "Time Zone Overlap Calculator for Remote Teams | TimeNumbers",
  "Calculate overlapping working hours across international time zones (USA, UK, India, Japan, Australia). Find the best meeting time for distributed remote teams.",
  "/overlap-calculator"
);

export default function OverlapCalculatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Overlap Calculator","url":"/overlap-calculator"}]} />
      <OverlapCalculatorClient />
    </div>
  );
}
