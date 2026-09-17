import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { AstronomyStudioClient } from './AstronomyStudioClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Sun, Moon, Compass, Sparkles } from 'lucide-react';

export const metadata = buildPageMetadata(
  'Solar & Lunar Astronomy Lab — Ephemeris',
  'Real-time solar calculations, sunrise, sunset, civil and nautical twilight times, golden hour windows, and live moon phase illumination percentage for any world city.',
  '/astronomy'
);

const ASTRONOMY_FAQS = [
  {
    question: "What is the difference between Civil, Nautical, and Astronomical twilight?",
    answer: "Civil twilight occurs when the sun is 0° to 6° below the horizon; natural light is sufficient for terrestrial activities. Nautical twilight occurs between 6° and 12° below the horizon; the sea horizon is still visible for sailors to take stellar sights. Astronomical twilight occurs between 12° and 18° below the horizon, after which the sky reaches true astronomical darkness for stargazing."
  },
  {
    question: "What is the 'Golden Hour' in photography?",
    answer: "The Golden Hour is the period shortly after sunrise or before sunset (when the sun is between 6° below to 6° above the horizon). During this time, sunlight passes through more atmosphere, scattering blue light and bathing landscapes in soft, warm, diffused red and golden hues."
  },
  {
    question: "Why does Solar Noon rarely match 12:00 PM on a clock?",
    answer: "Solar Noon is the exact moment the sun crosses the local celestial meridian (highest point in the sky). It differs from 12:00 PM standard clock time due to the equation of time (Earth's elliptical orbit and axial tilt) and because standard time zones span broad geographic longitudinal swathes."
  },
  {
    question: "How long is a lunar month?",
    answer: "A synodic lunar month (the time between one new moon and the next) averages 29.530588 days (approximately 29 days, 12 hours, and 44 minutes). This is slightly longer than the sidereal month (27.3 days) because Earth continues orbiting the sun while the moon orbits Earth."
  }
];

export default function AstronomyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{"name":"Solar & Lunar Astronomy","url":"/astronomy"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Astronomy Lab', url: '/astronomy' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Celestial Horology & Solar Mechanics
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Solar & Lunar Astronomy Lab
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Track precision solar paths, daylight length, atmospheric twilight phases, and real-time lunar illumination across any location on Earth.
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>NOAA Solar Algorithm</span>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>29.5-Day Synodic Moon Cycle</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Civil, Nautical & Astronomical Twilight</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Astronomy Studio */}
      <AstronomyStudioClient />

      {/* FAQs Section */}
      <div className="pt-4">
        <FaqAccordion
          title="Frequently Asked Questions About Solar & Lunar Mechanics"
          subtitle="Discover how solar cycles, twilight angles, and lunar phases govern time on Earth."
          items={ASTRONOMY_FAQS}
        />
      </div>

      {/* Related Links Hub */}
      <RelatedLinksHub
        currentPath="/astronomy"
        title="Explore Related Horology Tools"
        subtitle="Combine solar time with time zone converters, world clocks, and atomic accuracy testing."
      />
    </div>
  );
}
