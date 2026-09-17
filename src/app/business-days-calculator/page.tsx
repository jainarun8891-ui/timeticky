import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { BusinessDaysClient } from './BusinessDaysClient';

export const metadata: Metadata = buildPageMetadata(
  "Business Days Calculator — Working Days",
  "Calculate how many business days between two dates excluding weekends. Calculate 30, 60, or 90 business days from today for legal and contract deadlines.",
  "/business-days-calculator"
);

export default function BusinessDaysPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Business Days Calculator","url":"/business-days-calculator"}]} />
      <BusinessDaysClient />
    </div>
  );
}
