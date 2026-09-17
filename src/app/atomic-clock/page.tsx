import React from 'react';
import { Metadata } from 'next';
import { AtomicClockClient } from './AtomicClockClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Online Atomic Clock — Exact UTC Milliseconds',
  'Accurate online atomic clock synchronized directly with NIST and BIPM atomic time standards. Features millisecond precision, drift measurement, 12/24 hour display, and acoustic beat.',
  '/atomic-clock'
);

export default function AtomicClockPage() {
  const faqs = [
    {
      question: 'How accurate is this online atomic clock?',
      answer: 'This clock synchronizes against authoritative Network Time Protocol (NTP) Stratum-1 time servers connected to atomic frequency standards (NIST and BIPM). Local drift is corrected dynamically, maintaining sub-millisecond precision.'
    },
    {
      question: 'What is an atomic clock and how does it work?',
      answer: 'An atomic clock measures the resonant frequency of atoms, most commonly Cesium-133. One second is officially defined by the International System of Units (SI) as 9,192,631,770 oscillations of the microwave radiation corresponding to the transition between two hyperfine levels of the ground state of Cesium-133.'
    },
    {
      question: 'Why does my device clock differ from the atomic clock?',
      answer: 'Consumer computer and smartphone quartz oscillators experience thermal drift and battery fluctuations. Unless continuously synced with an NTP daemon, device clocks can easily drift between 1 and 15 seconds per week.'
    },
    {
      question: 'What is the difference between UTC, GMT, and Atomic Time (TAI)?',
      answer: 'International Atomic Time (TAI) is a uniform time scale based on hundreds of atomic clocks. UTC is the civil standard kept synchronized with Earth rotation by inserting leap seconds. GMT is an astronomical time zone originally centered at Greenwich, London.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Atomic Clock', url: '/atomic-clock' }]} />

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          NIST-Synchronized Online Atomic Clock
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sub-millisecond atomic time calibration referenced against Stratum-1 time servers.
        </p>
      </div>

      <AtomicClockClient />

      <FaqAccordion items={faqs} title="Frequently Asked Questions About Atomic Time & NTP Accuracy" />

      <RelatedLinksHub />

      {/* Schema.org SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "TimeNumbers Online Atomic Clock",
            "url": "https://www.timenumbers.com/atomic-clock",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
