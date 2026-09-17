import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { JetLagCalculatorClient } from './JetLagCalculatorClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Plane, Compass, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Flight Time & Jet Lag Circadian Protocol Calculator',
  'Calculate flight duration, local arrival times across time zones, and generate an hour-by-hour science-backed light and sleep adjustment protocol to defeat jet lag.',
  '/jet-lag-calculator'
);

const JET_LAG_FAQS = [
  {
    question: "Why is jet lag significantly worse when flying East than flying West?",
    answer: "The human circadian master clock naturally runs slightly longer than 24 hours (around 24.2 hours). Flying West requires extending your day ('phase delay'), which is biologically natural. Flying East requires compressing your day ('phase advance'), forcing your brain to fall asleep hours earlier than your internal biological clock expects."
  },
  {
    question: "How does light exposure reset the circadian rhythm?",
    answer: "Intrinsically photosensitive retinal ganglion cells (ipRGCs) in your eyes detect blue wavelengths (460–480 nm) in daylight and transmit signals directly to the suprachiasmatic nucleus (SCN) in the hypothalamus, instantly halting melatonin production and setting your biological clock to daytime."
  },
  {
    question: "When should I take melatonin for jet lag?",
    answer: "For eastward travel across multiple time zones, take a low dose (0.5 mg to 3 mg) of melatonin approximately 30 minutes before your planned bedtime in your new destination. Avoid taking melatonin upon waking or during the local destination daytime."
  },
  {
    question: "How does flight distance and speed factor into flight time calculation?",
    answer: "TimeNumbers calculates flight duration using great-circle orthodromic distance (the shortest route over the curved Earth surface), calibrated for modern commercial passenger aircraft cruising speeds (820–850 km/h) plus standard runway taxi and approach buffers."
  }
];

export default function JetLagCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Jet Lag & Flight Time","url":"/jet-lag-calculator"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Jet Lag Calculator', url: '/jet-lag-calculator' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Plane className="w-3.5 h-3.5" />
            Aviation Chronobiology & Travel Optimization
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Flight Time & Jet Lag Calculator
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Calculate accurate international flight travel times, local arrival hours, and get a chronobiology-backed circadian light and sleep prescription to eliminate jet lag.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Great Circle Orthodromic Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Hour-by-Hour Light Prescription</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>East/West Phase Adaptation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Jet Lag Studio Client Component */}
      <JetLagCalculatorClient />

      {/* FAQs */}
      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Jet Lag & Circadian Adaptation"
          subtitle="Learn the scientific principles behind circadian phase shifts and recovery protocols."
          items={JET_LAG_FAQS}
        />
      </div>

      {/* Related Links */}
      <RelatedLinksHub
        currentPath="/jet-lag-calculator"
        title="Explore Related Travel & Time Tools"
        subtitle="Plan cross-border meetings, check international time differences, and convert time zones."
      />
    </div>
  );
}
