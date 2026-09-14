"use client";

import React, { useState } from 'react';
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar';
import { PrecisionClockHero } from '@/components/home/PrecisionClockHero';
import { HeroClockCard } from '@/components/dashboard/HeroClockCard';
import { WorldMapCard } from '@/components/dashboard/WorldMapCard';
import { WorldClockStrip } from '@/components/dashboard/WorldClockStrip';
import { TimeDifferenceCard } from '@/components/dashboard/TimeDifferenceCard';
import { MeetingPlannerCard } from '@/components/dashboard/MeetingPlannerCard';
import { SunDaylightCard } from '@/components/dashboard/SunDaylightCard';
import { DateCalendarCard } from '@/components/dashboard/DateCalendarCard';
import { QuickTimerCard } from '@/components/dashboard/QuickTimerCard';
import { CountryInfoCard } from '@/components/dashboard/CountryInfoCard';
import { QuoteCard } from '@/components/dashboard/QuoteCard';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { HOME_FAQS } from '@/lib/seo/page-faqs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { City, CITIES } from '@/lib/geo/cities';

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Paris default

  return (
    <div className="w-full min-h-full pb-16">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-5 space-y-6">
        
        {/* Top Full Search Bar with Try suggestions */}
        <GlobalSearchBar />

        {/* Visitor's Live Precision Clock & Quick Directory Navigation (100-pt Item 2) */}
        <PrecisionClockHero />

        {/* Global Hub Spotlight Clock Card (~73%) + World Map Card (~27%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8 xl:col-span-9 flex">
            <HeroClockCard
              currentCity={selectedCity}
              onSelectCity={(city) => setSelectedCity(city)}
            />
          </div>
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <WorldMapCard
              currentCity={selectedCity}
              onSelectCity={(city) => setSelectedCity(city)}
            />
          </div>
        </div>

        {/* Row 2: World Clock 7 Landmarks Horizontal Strip */}
        <WorldClockStrip
          currentCity={selectedCity}
          onSelectCity={(city) => setSelectedCity(city)}
        />

        {/* Row 3: 4 Columns (Time Difference, Meeting Planner, Sun & Daylight, Date & Calendar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          <TimeDifferenceCard currentCity={selectedCity} />
          <MeetingPlannerCard currentCity={selectedCity} />
          <SunDaylightCard currentCity={selectedCity} />
          <DateCalendarCard currentCity={selectedCity} />
        </div>

        {/* Row 4: 3 Columns (Timer/Countdown, Country Info, Quote Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-4 flex w-full">
              <QuickTimerCard className="w-full h-full" />
            </div>
            <div className="lg:col-span-5 flex w-full">
              <CountryInfoCard currentCity={selectedCity} className="w-full h-full" />
            </div>
            <div className="lg:col-span-3 flex w-full">
              <QuoteCard className="w-full h-full" />
            </div>
          </div>

        {/* Homepage Google SERP FAQ Accordion */}
        <FaqAccordion items={HOME_FAQS} title="Frequently Asked Questions About Global Time" />

        {/* Global Related Links Directory */}
        <RelatedLinksHub />

      </div>
    </div>
  );
}
