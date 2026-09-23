import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { Calendar, Globe, Building2, Clock, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = buildPageMetadata(
  'World Public Holidays 2026: Official National & Bank Holidays',
  'Global public holidays calendar for 2026 and 2027. Official national holidays, statutory bank closures, astronomical observances, and business day calculation schedule for 80+ countries.',
  '/holidays'
);

export default function HolidaysPage() {
  const holidays = [
    { name: "New Year's Day", date: "Jan 1, 2026", type: "Public Holiday", country: "Global / Multi-National", desc: "Celebrated globally as the first day of the Gregorian calendar." },
    { name: "Martin Luther King Jr. Day", date: "Jan 19, 2026", type: "Federal Holiday", country: "United States", desc: "Federal holiday honoring the civil rights leader, observed third Monday of January." },
    { name: "Republic Day", date: "Jan 26, 2026", type: "National Holiday", country: "India", desc: "Honors the enactment of the Constitution of India in 1950." },
    { name: "Lunar New Year / Spring Festival", date: "Feb 17, 2026", type: "Cultural & Statutory", country: "East & Southeast Asia", desc: "Major traditional festival marking the arrival of the lunisolar new year." },
    { name: "Good Friday", date: "Apr 3, 2026", type: "Statutory / Bank Holiday", country: "UK, EU, Canada, Global", desc: "Christian holiday commemorated before Easter Sunday; worldwide bank closure." },
    { name: "Easter Monday", date: "Apr 6, 2026", type: "Statutory / Bank Holiday", country: "UK, EU, Australia, Canada", desc: "Official public holiday observed in the Commonwealth and European Union." },
    { name: "International Workers' Day (Labor Day)", date: "May 1, 2026", type: "Public Holiday", country: "Global / 80+ Countries", desc: "Honors the international labor movement and working class achievements." },
    { name: "Memorial Day", date: "May 25, 2026", type: "Federal Holiday", country: "United States", desc: "Federal holiday honoring military personnel, observed final Monday of May." },
    { name: "Independence Day", date: "Jul 4, 2026", type: "Federal Holiday", country: "United States", desc: "Commemorates the adoption of the Declaration of Independence in 1776." },
    { name: "Bastille Day (National Day)", date: "Jul 14, 2026", type: "National Holiday", country: "France", desc: "French national celebration of the storming of the Bastille fortress." },
    { name: "Diwali (Festival of Lights)", date: "Nov 8, 2026", type: "National & Cultural", country: "India, Singapore, Global", desc: "Major festival celebrating the victory of light over darkness." },
    { name: "Thanksgiving Day", date: "Nov 26, 2026", type: "Federal Holiday", country: "United States", desc: "National day of giving thanks, observed on the fourth Thursday of November." },
    { name: "Christmas Day", date: "Dec 25, 2026", type: "Public Holiday", country: "Global / Multi-National", desc: "Christian holiday celebrating the birth of Jesus; worldwide commercial closure." },
    { name: "Boxing Day", date: "Dec 26, 2026", type: "Statutory / Bank Holiday", country: "UK, Canada, Australia", desc: "Commonwealth public holiday celebrated the day after Christmas." }
  ];

  const faqs = [
    {
      question: "What happens when a public holiday falls on a Saturday or Sunday?",
      answer: "In most jurisdictions (including the United States, United Kingdom, Canada, and Australia), holidays that land on a weekend roll over to an 'in-lieu' substitute statutory holiday on the following Monday (or Friday if Saturday). This ensures employees receive their allotted paid holiday and banks remain closed for settlement."
    },
    {
      question: "How do public holidays affect business day calculations?",
      answer: "Business day calculators exclude Saturdays, Sundays, and official jurisdiction-specific statutory holidays. Financial settlement systems like Fedwire (US) and TARGET2 (Europe) do not process interbank transactions on recognized holidays, adding to payment settlement latency."
    },
    {
      question: "Why do Easter and lunar holiday dates shift each year?",
      answer: "Gregorian holidays like New Year's Day (Jan 1) and US Independence Day (Jul 4) are fixed solar calendar dates. In contrast, moveable feasts like Easter follow a lunisolar calculation (first Sunday after the first ecclesiastical full moon following the vernal equinox). Lunar New Year, Diwali, and Eid likewise follow precise astronomical moon phases."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Public Holidays', url: '/holidays' }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Public Holidays', url: '/holidays' },
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Statutory & Cultural Calendar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          World Public Holidays & Observances
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          Comprehensive guide to statutory bank closures, national days, religious celebrations, and civil observances across major international economies.
        </p>
      </div>

      {/* Holiday Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Major International Public Holidays (2026)
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {holidays.map((h, i) => (
            <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white block">{h.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">{h.country} — {h.desc}</span>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 block">{h.date}</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{h.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            1. Classification of Public Holidays
          </h2>
          <p>
            Around the globe, official holidays generally fall into three distinct legal and regulatory classifications:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li><strong>Federal & National Statutory Holidays:</strong> Established by national legislative decree (such as US Federal holidays enacted by Congress or UK Bank Holidays established by royal proclamation). Government offices, embassies, financial exchanges, and central banks are legally mandated to close.</li>
            <li><strong>State, Provincial & Regional Holidays:</strong> Celebrated within specific federal states or autonomous regions (such as Patriots&rsquo; Day in Massachusetts, USA, or St. Andrew&rsquo;s Day in Scotland).</li>
            <li><strong>Cultural & Religious Moveable Feasts:</strong> Holidays whose dates fluctuate according to astronomical, lunar, or solar calculations, including Easter, Ramadan/Eid, Diwali, and Rosh Hashanah.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            2. Business Day Deadlines & Financial Settlement Impact
          </h2>
          <p>
            Commercial contracts, statutory filings, court filing deadlines, and real estate escrow agreements often stipulate performance within a specific number of &ldquo;business days&rdquo; (such as 30 or 60 working days).
          </p>
          <p>
            When calculating business day duration using our <Link href="/business-days-calculator" className="text-blue-600 underline font-semibold">Business Days Calculator</Link>, official statutory holidays must be subtracted alongside weekends to guarantee contractual compliance and avoid interest penalties on international wire transfers.
          </p>
        </section>
      </div>

      {/* Structured FAQs */}
      <FaqAccordion
        title="Frequently Asked Questions About Public Holidays"
        subtitle="Learn how holidays impact payroll, bank settlements, and calendar calculations."
        items={faqs}
      />

      <RelatedLinksHub
        currentPath="/holidays"
        title="Explore Related Date & Calendar Tools"
        subtitle="Calculate business days, date differences, or examine printable calendars."
      />
    </div>
  );
}
