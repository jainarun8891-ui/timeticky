import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { BusinessDaysClient } from './BusinessDaysClient';

export const metadata: Metadata = buildPageMetadata(
  "Business Days Calculator: Working Days Between Two Dates (Excl. Weekends)",
  "Calculate working business days between two dates excluding weekends. Add or subtract 30, 60, or 90 business days from today for invoices, contracts, and legal deadlines.",
  "/business-days-calculator"
);

const BUSINESS_DAYS_FAQS = [
  {
    question: "How does the business days calculator calculate working days?",
    answer: "The calculator iterates through the selected date range and counts every business weekday (Monday through Friday), automatically excluding Saturdays and Sundays."
  },
  {
    question: "How do I calculate 30, 60, or 90 business days from today?",
    answer: "Select 'Add / Subtract Business Days', enter your starting date, and input the number of business days (e.g. 30, 60, or 90). The calculator instantly identifies the target completion date excluding weekends."
  },
  {
    question: "Does the calculation include the start and end dates?",
    answer: "By standard business practice, interval duration counts elapsed working days between the start date and the end date. You can also view the total calendar days elapsed alongside working days."
  }
];

export default function BusinessDaysPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Business Days Calculator","url":"/business-days-calculator"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Business Days Calculator', url: '/business-days-calculator' },
        ]}
      />
      <JsonLd type="faq" data={BUSINESS_DAYS_FAQS} />
      <JsonLd
        type="application"
        data={{
          name: "Business Days Calculator",
          category: "BusinessApplication",
          description: "Calculate working days between two dates excluding weekends, or project future business days from today."
        }}
      />
      <BusinessDaysClient />
      <FaqAccordion items={BUSINESS_DAYS_FAQS} title="Frequently Asked Questions About Business Days" />
      <RelatedLinksHub />
    </div>
  );
}
