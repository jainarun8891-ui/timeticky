import React from 'react';
import { Metadata } from 'next';
import { GoldenHourClient } from './GoldenHourClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(
  'Golden Hour Calculator — Exact Photography Lighting & Blue Hour Times',
  'Free online golden hour and blue hour calculator for photographers. Calculate morning and evening golden hour times, sun elevation angles, and solar noon for any city worldwide.',
  '/golden-hour'
);

export default function GoldenHourPage() {
  const faqs = [
    {
      question: 'What is the Golden Hour in photography?',
      answer: 'The Golden Hour (often called magic hour) is the period shortly after sunrise or before sunset during which daylight is redder and softer than when the sun is higher in the sky. The sun is between approximately -4° and +6° above the horizon.'
    },
    {
      question: 'What is the Blue Hour and when does it occur?',
      answer: 'The Blue Hour occurs during twilight when the sun is between -4° and -6° below the horizon. The sky takes on a rich, deep blue hue, and residual sunlight creates a balanced exposure against artificial street lights.'
    },
    {
      question: 'How long does the golden hour last?',
      answer: 'Near the equator, the golden hour can be as short as 20–30 minutes because the sun rises and sets at a steep angle. In higher latitudes (such as Northern Europe, Canada, or Scandinavia), the golden hour can last several hours during summer months.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Golden Hour', url: '/golden-hour' }]} />

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Golden Hour &amp; Blue Hour Calculator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Precision solar angles and optimal natural lighting windows for photography and videography.
        </p>
      </div>

      <GoldenHourClient />

      <FaqAccordion items={faqs} title="Frequently Asked Questions About Golden Hour & Natural Lighting" />

      <RelatedLinksHub />

      {/* Schema.org WebApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TimeNumbers Golden Hour Calculator",
            "url": "https://timenumbers.com/golden-hour",
            "applicationCategory": "PhotographyApplication",
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
