import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { DialingCodesClient } from './DialingCodesClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Phone, Globe, ShieldCheck, Clock } from 'lucide-react';

export const metadata = buildPageMetadata(
  'International Dialing Codes Directory & Calling Etiquette Guide',
  'Search international country calling codes (+1, +44, +81, etc.), format phone numbers, and check current local time and business hours before calling abroad.',
  '/dialing-codes'
);

const DIALING_FAQS = [
  {
    question: "What is an international country calling code?",
    answer: "An international calling code is a numerical prefix defined by the International Telecommunication Union (ITU-T recommendation E.164) that allows callers to route telephone calls across international telecommunication networks into a specific country or territory."
  },
  {
    question: "What does the plus sign (+) mean in an international phone number?",
    answer: "The plus sign (+) indicates that the caller should dial their local international exit code (also called the International Direct Dialing prefix or IDD). On mobile phones, holding down the '0' key will insert the '+', and the network will automatically supply the correct exit code."
  },
  {
    question: "What is an international exit code?",
    answer: "An exit code is dialed before the country code when placing a call from a fixed landline. For example, callers from the United States and Canada dial 011, while callers from Europe, Australia, and most of the world dial 00."
  },
  {
    question: "What should I do with leading zeros in local phone numbers?",
    answer: "In most countries (such as the UK, France, Germany, and Australia), you must omit the initial '0' (the domestic trunk prefix) when dialing internationally. For example, a UK number like 07911 123456 becomes +44 7911 123456. Italy is a notable exception that retains the leading zero."
  }
];

export default function DialingCodesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"International Dialing Codes","url":"/dialing-codes"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Dialing Codes', url: '/dialing-codes' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Phone className="w-3.5 h-3.5" />
            ITU-T E.164 International Telephony Guide
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Global Dialing Codes & Calling Assistant
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Quickly find international country calling prefixes, format phone numbers for overseas dialing, and verify local time to avoid waking business partners.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>200+ Country Codes (+1, +44, etc.)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Calling Windows</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>E.164 Dialing Standard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dialing Client Component */}
      <DialingCodesClient />

      {/* FAQs */}
      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About International Phone Numbers"
          subtitle="Everything you need to know about country codes, exit codes, and international etiquette."
          items={DIALING_FAQS}
        />
      </div>

      {/* Ubiquitous Related Links */}
      <RelatedLinksHub
        currentPath="/dialing-codes"
        title="Explore Time Zone & Meeting Tools"
        subtitle="Coordinate international schedules across time zones with precision."
      />
    </div>
  );
}
