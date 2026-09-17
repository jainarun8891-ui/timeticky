import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'About TimeNumbers — Precision Global Chronometry Platform',
  'Learn about the TimeNumbers mission: providing atomic precision, clean user experience, and privacy-respecting time utilities worldwide.',
  '/about'
);
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import React from 'react';
import { siteConfig } from '@/lib/config/site.config';
export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <Breadcrumbs items={[{"name":"About TimeNumbers","url":"/about"}]} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">About {siteConfig.name}</h1>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {siteConfig.name} provides clean, lightweight, and modern global time calculations. Designed with privacy, speed, and precision in mind.
      </p>
    
      <RelatedLinksHub />
    </div>
  );
}
