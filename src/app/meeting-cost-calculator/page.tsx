import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { MeetingCostCalculatorClient } from './MeetingCostCalculatorClient';
import { DollarSign, Clock, Users, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Meeting Cost Calculator — Real-Time Ticking Meeting Dollar Meter',
  'Calculate the true financial cost of business meetings in real time. Live ticking dollar odometer, salary burn rate formulas, and actionable meeting efficiency tips.',
  '/meeting-cost-calculator'
);

const MEETING_FAQS: FaqItem[] = [
  {
    question: 'How do you calculate the true financial cost of a corporate meeting?',
    answer:
      'The formula is: Meeting Cost = Attendees × Hourly Rate × Meeting Duration (in hours). Hourly rate is derived from annual compensation divided by standard annual working hours (2,080 hours for a 40-hour work week). To calculate true economic cost, an overhead multiplier of 1.25x to 1.4x is added to cover employer payroll taxes, healthcare benefits, equipment, and office facilities.'
  },
  {
    question: 'What is the fully burdened labor cost multiplier?',
    answer:
      'A fully burdened labor rate accounts for the total cost of an employee beyond gross base salary. It includes statutory employment taxes (FICA, unemployment), 401(k) retirement matches, health and dental insurance, computer hardware, and software subscriptions. Typically, burdened labor is 1.25x to 1.35x base wages.'
  },
  {
    question: 'How much money do organizations waste on unproductive meetings annually?',
    answer:
      'Research from Harvard Business School and workplace studies estimates that unnecessary, poorly organized meetings cost US corporations over $37 billion each year. Senior executives report spending up to 23 hours per week in meetings, with more than 60% rated as unproductive or lacking clear agendas.'
  },
  {
    question: 'What is the Amazon "Two-Pizza Rule" for meetings?',
    answer:
      'Pioneered by Jeff Bezos, the Two-Pizza Rule states that no internal meeting should ever have more people than two large pizzas can feed (typically 6 to 8 participants). Smaller groups foster direct accountability, prevent social loafing, and drastically reduce the cumulative financial burn rate per minute.'
  },
  {
    question: 'How can teams cut meeting costs without hurting communication?',
    answer:
      '1. Require written pre-reads before every sync. 2. Default all 60-minute calendar invites to 25 or 45 minutes to encourage focused discussion. 3. Empower team members to decline meetings that lack a published agenda. 4. Replace status-update syncs with asynchronous video recordings (Loom) or Slack threads.'
  }
];

export default function MeetingCostCalculatorPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeTicky Real-Time Meeting Cost Calculator',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Real-time financial meeting cost calculator with live ticking odometer, salary burn rate formulas, and team efficiency diagnostics.',
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs items={[{ name: 'Meeting Cost Calculator', url: '/meeting-cost-calculator' }]} />

      {/* Main Interactive Client */}
      <MeetingCostCalculatorClient />

      {/* Corporate Economics Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            Meeting Economics & Organizational ROI
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            The Hidden Cost of Calendar Bloat
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            When a manager schedules an hour-long meeting with 10 senior engineers and product managers, they are not spending 1 hour—they are investing 10 collective hours of engineering output. At an average fully burdened rate of $80/hour, that single sync costs $800 in raw capital, not counting context-switching penalties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Context Switching Tax</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              University research shows it takes an average of 23 minutes and 15 seconds to regain deep focus after a meeting interruption. A 30-minute sync effectively burns an hour of productivity.
            </p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">The Two-Pizza Rule</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Capping meeting attendance at 6 to 8 people keeps discussions agile and eliminates passive attendees who browse Slack or emails while payroll money burns.
            </p>
          </article>

          <article className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Async-First Culture</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              High-efficiency companies like GitLab and Amazon replace informational broadcast meetings with concise written documentation, saving millions annually.
            </p>
          </article>
        </div>
      </section>

      {/* Schema-Verified FAQ Accordion */}
      <FaqAccordion
        items={MEETING_FAQS}
        title="Frequently Asked Questions About Meeting Cost Calculation"
        subtitle="Formulas, labor burden rates, and productivity optimization strategies."
      />

      {/* Related Navigation Hub */}
      <RelatedLinksHub title="Explore Related Time & Productivity Tools" />
    </main>
  );
}
