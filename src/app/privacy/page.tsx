import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { ShieldCheck, Lock, EyeOff, Server, Database, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Privacy Policy & Data Protection',
  'TimeNumbers data protection commitment: Zero user tracking, no third-party behavioral cookies, and client-side time calculation architecture.',
  '/privacy'
);

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Privacy Policy', url: '/privacy' }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy by Design</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Last updated: January 1, 2026. Learn how TimeNumbers protects your privacy through local-first computing and zero cross-site tracking.
        </p>
      </div>

      {/* Content Sections */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            1. Our Fundamental Privacy Commitment
          </h2>
          <p>
            At TimeNumbers, we firmly believe that checking the current time, converting time zones, or calculating date differences should never compromise your digital privacy. We operate on a strict <strong>Privacy by Design</strong> architectural model: we do not require account registration, do not collect personal identities, and do not sell or monetize personal browsing behavioral data.
          </p>
          <p>
            Unlike traditional utility portals cluttered with invasive user tracking and multi-tier advertising networks, TimeNumbers operates as a clean, high-performance chronometry tool built to serve accurate atomic time without monitoring who you are.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-blue-600" />
            2. What Data We Do NOT Collect
          </h2>
          <p>
            To provide total transparency, the following categories of data are neither requested, captured, nor stored by TimeNumbers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li><strong>No Names or Contact Records:</strong> We do not ask for your name, email address, phone number, or social media logins.</li>
            <li><strong>No Precise GPS Location:</strong> City searches are conducted by matching typed text strings against an offline IANA database. We do not access device GPS sensors or latitude/longitude coordinates without your explicit interaction.</li>
            <li><strong>No Financial or Payment Data:</strong> All services are provided free of charge without credit cards or billing profiles.</li>
            <li><strong>No Cross-Site Tracking:</strong> We do not embed surveillance pixels, canvas fingerprinting scripts, or third-party behavioral profiling trackers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            3. Client-Side Computing & Local Storage
          </h2>
          <p>
            All chronometry calculations — including 24-hour time zone conversions, solar dawn and dusk ephemeris algorithms, and timer countdown ticks — execute natively in your web browser using JavaScript internationalization APIs (`Intl.DateTimeFormat`).
          </p>
          <p>
            Your customization settings (such as 12-hour vs 24-hour display preference, selected dark mode theme, pinned world cities on your dashboard, and custom timer alarms) are persisted exclusively in your browser’s `localStorage`. This data remains on your physical device at all times and is never transmitted to our remote servers. You can clear this data at any time by wiping your browser site storage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-600" />
            4. Server Logs & Network Edge Security
          </h2>
          <p>
            When your browser requests a web page or interacts with our NTP synchronization endpoints, our edge Content Delivery Network (CDN) servers temporarily record standard technical HTTP request headers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Anonymized IP address (used strictly for geographical routing to the nearest regional server cluster).</li>
            <li>Requested URL path (e.g., `/new-york`, `/convert/gmt-to-est`).</li>
            <li>HTTP status code and payload size transmitted.</li>
            <li>User-Agent browser identification string (to optimize viewport rendering).</li>
          </ul>
          <p>
            These transient access logs are retained strictly for server health diagnosis, network DDoS mitigation, and traffic capacity monitoring. Server log entries are automatically purged on a rolling 7-day schedule and are never linked to personal identities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            5. Cookie Policy & GDPR / CCPA Compliance
          </h2>
          <p>
            TimeNumbers does not set marketing, re-targeting, or behavioral cookies. Any HTTP cookies utilized are strictly essential technical session tokens (such as load-balancer session pinning or dark mode cookie preferences for SSR hydration).
          </p>
          <p>
            Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), users have rights regarding data access, erasure, and restriction. Because TimeNumbers does not collect personal identity records or user accounts, we maintain no database of identifiable user data to delete or disclose.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            6. Privacy Inquiries
          </h2>
          <p>
            If you have questions, feedback, or concerns regarding our privacy architecture or data security standards, please reach out via our contact page. We welcome technical scrutiny and are dedicated to maintaining an open, privacy-first platform.
          </p>
        </section>

      </div>

      <RelatedLinksHub
        currentPath="/privacy"
        title="Explore TimeNumbers Platform"
        subtitle="Experience fast, privacy-focused world clocks and astronomical utilities."
      />
    </div>
  );
}
