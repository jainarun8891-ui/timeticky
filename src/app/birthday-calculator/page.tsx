import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { BirthdayCalculatorClient } from './BirthdayCalculatorClient';

export const metadata: Metadata = buildPageMetadata(
  "Birthday Calculator — How Many Weeks & Days Until My Birthday | GlobalTime",
  "Calculate how many weeks, days, hours, and seconds until your next birthday. Discover your exact chronological age in years, months, and days with live countdown.",
  "/birthday-calculator"
);

export default function BirthdayCalculatorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Birthday Calculator","url":"/birthday-calculator"}]} />
      <BirthdayCalculatorClient />
    </div>
  );
}
