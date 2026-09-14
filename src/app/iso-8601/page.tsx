import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Iso8601Client } from './Iso8601Client';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Code2, Clock, ShieldCheck } from 'lucide-react';

export const metadata = buildPageMetadata(
  'ISO 8601 Date & Time String Parser & Converter',
  'Parse, validate, and convert ISO 8601 timestamps into local date, canonical UTC strings, Unix timestamps, and component breakdowns.',
  '/iso-8601'
);

const ISO_FAQS = [
  {
    question: "What is the ISO 8601 standard?",
    answer: "ISO 8601 is an international standard issued by the International Organization for Standardization covering the worldwide exchange and communication of date and time-related data. The primary format is YYYY-MM-DDTHH:mm:ssZ (e.g., 2026-09-14T13:45:00Z)."
  },
  {
    question: "What does the 'T' and 'Z' signify in ISO 8601?",
    answer: "The letter 'T' acts as a delimiter separating the calendar date component from the time-of-day component. The letter 'Z' stands for 'Zulu time', signifying zero UTC offset (UTC+0)."
  }
];

export default function Iso8601Page() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"ISO 8601 Parser","url":"/iso-8601"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'ISO 8601 Converter', url: '/iso-8601' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Code2 className="w-3.5 h-3.5" />
            Standardized Data Interchange
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            ISO 8601 Date & Time Parser
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Parse, validate, and convert ISO 8601 formatted timestamps into human-readable representations, UTC canonical strings, and Unix epoch offsets.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>RFC 3339 & ISO-8601 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Full Millisecond Precision</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Local Offline Parser</span>
            </div>
          </div>
        </div>
      </div>

      <Iso8601Client />

      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About ISO 8601"
          subtitle="Learn the syntax, timezone designators, and RFC 3339 conventions."
          items={ISO_FAQS}
        />
      </div>

      <RelatedLinksHub
        currentPath="/iso-8601"
        title="Explore Related Developer Tools"
        subtitle="Convert Unix timestamps, inspect clock accuracy, or explore REST APIs."
      />
    </div>
  );
}
