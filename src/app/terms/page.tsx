import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { ShieldCheck, FileText, AlertCircle, Scale, Globe } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Terms of Service & Usage Policy',
  'Terms and conditions for using TimeNumbers global chronometry calculators, world time utilities, solar ephemeris data, and developer APIs.',
  '/terms'
);

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Terms of Service', url: '/terms' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal & Service Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Last updated: January 1, 2026. Please read these terms carefully before accessing or utilizing the TimeNumbers platform.
        </p>
      </div>

      {/* Content Sections */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using TimeNumbers (accessible via timenumbers.com), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our Privacy Policy. If you do not agree to these terms, please do not use our chronometry tools, solar ephemeris engines, or public developer endpoints.
          </p>
          <p>
            These terms govern all visits to the website, interactions with our web applications, usage of embeddable time widgets, and requests sent to our public REST and NTP-calibrated time APIs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            2. Scope of Services & Horological Utilities
          </h2>
          <p>
            TimeNumbers provides high-precision time calculations, planetary solar and lunar ephemeris tables, IANA time zone cross-conversions, meeting overlap matrices, and interactive full-screen digital and analog clocks.
          </p>
          <p>
            All utilities are provided free of charge for personal, educational, and non-automated commercial planning. While we strive to maintain sub-millisecond precision through NTP Stratum-1 synchronization and official IANA Time Zone Database definitions, client-side display accuracy is inherently dependent on your operating system clock, network latency, and browser execution thread throttling.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            3. Disclaimer of Horological & Astronomical Warranties
          </h2>
          <p>
            All calculations, solar dawn and dusk predictions, moon phase illuminations, and Daylight Saving Time transition schedules are published in good faith for informational and organizational convenience. They must not be relied upon as the sole reference for safety-critical operations, aviation navigation, marine piloting, maritime celestial navigation, or legal filings requiring notarized timestamps.
          </p>
          <p>
            Governmental civil authorities frequently modify Daylight Saving Time mandates, standard meridian offsets, and municipal boundaries on short notice. TimeNumbers continuously ingests canonical tzdata releases from the Internet Assigned Numbers Authority (IANA), but assumes no legal liability for scheduling discrepancies or financial losses arising from time zone changes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            4. Acceptable Use & API Fair Play
          </h2>
          <p>
            You agree to use TimeNumbers only for lawful purposes. You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Execute denial-of-service (DoS) attacks or generate abusive, automated high-frequency HTTP requests against our servers.</li>
            <li>Scrape bulk ephemeris data without explicit authorization or reasonable request pacing (maximum 60 requests per minute for public endpoints).</li>
            <li>Bypass rate limiting or technical safeguards deployed across our edge CDN network.</li>
            <li>Misrepresent data derived from TimeNumbers as official state or national time authority certifications.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-500" />
            5. Intellectual Property & Embed Licenses
          </h2>
          <p>
            The software, interface design, interactive SVG clock components, bespoke styling, typography, and original horological articles published on TimeNumbers are protected by copyright, trademark, and international intellectual property treaties.
          </p>
          <p>
            You are granted a revocable, non-exclusive license to embed our public time widgets on your website via provided iframe snippets, provided you do not remove attribution links, alter copyright notices, or disguise widget origin.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            6. Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by applicable law, TimeNumbers, its developers, authors, and infrastructure contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, missed flight connections, business interruptions, or scheduling failures resulting from the use or inability to use our platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            7. Governing Law & Inquiries
          </h2>
          <p>
            These Terms shall be interpreted and governed by international commercial principles and applicable cyber law. If you have questions regarding these terms, developer API licensing, or academic syndication, please submit an inquiry via our contact desk.
          </p>
        </section>

      </div>

      <RelatedLinksHub
        currentPath="/terms"
        title="Explore TimeNumbers Platform"
        subtitle="Access atomic clocks, international converters, and astronomical tables."
      />
    </div>
  );
}
