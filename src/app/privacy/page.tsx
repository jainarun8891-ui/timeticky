import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Privacy Policy — TimeNumbers Data Protection Commitment',
  'TimeNumbers respects your privacy. Zero user tracking, no third-party cookies, and anonymous client-side time calculations.',
  '/privacy'
);
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <Breadcrumbs items={[{"name":"Privacy Policy","url":"/privacy"}]} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        We value privacy. We do not track individuals, do not require user accounts, and persist preferences purely in local browser storage.
      </p>
    </div>
  );
}
