import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Terms of Service & Usage Policy — TimeNumbers',
  'Terms and conditions for using TimeNumbers free time calculators, solar ephemeris data, and developer APIs.',
  '/terms'
);
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <Breadcrumbs items={[{"name":"Terms of Service","url":"/terms"}]} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Use</h1>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        TimeNumbers is provided as a free utility. Calculated times and astronomical calculations are delivered in good faith.
      </p>
    </div>
  );
}
