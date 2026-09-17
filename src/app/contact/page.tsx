import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ContactClient } from './ContactClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Mail, MessageSquare } from 'lucide-react';

import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Contact Support & Feature Inquiries',
  'Contact the TimeNumbers team for timezone corrections, developer API partnerships, civil DST decree updates, and horological feature requests.',
  '/contact'
);

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact TimeNumbers',
    description: 'Get in touch for timezone corrections and developer inquiries.',
    url: 'https://www.timenumbers.com/contact',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.timenumbers.com' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://www.timenumbers.com/contact' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{"name":"Contact","url":"/contact"}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs & Header */}
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">Contact</span>
          </nav>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <Mail className="w-3.5 h-3.5" />
              Communication Desk
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Contact & Corrections Desk
            </h1>
          </div>
        </div>

        {/* Contact Client */}
        <ContactClient />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explore More Tools & Platforms" />
      </div>
    </div>
  );
}
