import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { WorldMapStudioClient } from '@/components/map/WorldMapStudioClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Globe, Compass, Sun, Moon, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Interactive World Time Map — Live Global Clocks, Day/Night Terminator & Timezones | GlobalTime',
  description: 'Explore real-time global time on a high-precision interactive world map. Hover over 46 global cities to inspect live digital clocks, solar terminator boundaries, day/night illumination, and great-circle time sync arcs.',
  alternates: {
    canonical: 'https://globaltime.org/world-map',
  },
  openGraph: {
    title: 'Interactive World Time Map — Live Global Clocks & Day/Night Boundary',
    description: 'Explore real-time global time on a high-precision interactive world map with 46 live city clocks and solar terminator.',
    url: 'https://globaltime.org/world-map',
    siteName: 'GlobalTime',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive World Time Map — GlobalTime',
    description: 'Explore real-time global time on a high-precision interactive world map with 46 live city clocks and solar terminator.',
  }
};

const WORLD_MAP_FAQS = [
  {
    question: 'What is the Day/Night Solar Terminator line shown on the map?',
    answer: 'The solar terminator (also called the twilight zone or grey line) is the mathematical boundary separating the sunlit day hemisphere of Earth from the dark night hemisphere. Because Earth is tilted at an axial angle of approximately 23.44°, this boundary shifts continuously throughout the year, causing longer summer days and shorter winter days.'
  },
  {
    question: 'How accurate are the live clocks displayed when hovering over city pins?',
    answer: 'Every city clock on the GlobalTime world map computes time in-memory directly from canonical IANA time zone rules and native browser internationalization engine. Clocks are synchronized against atomic standards and maintain precision of ±0.01 seconds without background tab drift.'
  },
  {
    question: 'What do the curved lines connecting cities on the map represent?',
    answer: 'The illuminated curved arcs represent great-circle geodesic paths connecting key global financial, technological, and transport hubs. These represent the shortest flight trajectories across Earth’s spherical surface and visualize international time synchronizations.'
  },
  {
    question: 'Why are there 24 longitudinal lines across the world map?',
    answer: 'Earth rotates 360° of longitude in approximately 24 hours, which equates to 15° of longitude per hour. The 1884 International Meridian Conference in Washington, D.C. established the Prime Meridian (0°) through Greenwich, London, creating 24 standard 15-degree longitudinal time zone bands.'
  },
  {
    question: 'Can I simulate future or past time on the map?',
    answer: 'Yes. Use the interactive 24-Hour Solar Scrubber slider at the top of the map to shift the simulated hour up to ±12 hours. You can observe the solar terminator glide across continents in real time and inspect simulated city times.'
  }
];

export default function WorldMapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GlobalTime Interactive World Time Map',
    url: 'https://globaltime.org/world-map',
    description: 'High-precision interactive world time map featuring real-time solar terminator, live clocks across 46 global cities, day/night boundary, and time zone meridians.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All'
  };

  return (
    <div className="w-full min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-6 space-y-8">
        {/* Universal SEO Breadcrumbs */}
        <Breadcrumbs
          items={[{ name: 'World Map', url: '/world-map' }]}
        />

        {/* Page Hero Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Interactive Planetary Time Observatory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Interactive World Time & Astronomical Map
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-4xl font-normal leading-relaxed">
            Track real-time global time zones, astronomical solar illumination, and planetary day/night boundaries across 46 major world cities. Hover over any city pin for an instant live clock, solar ephemeris, and UTC offset.
          </p>
        </div>

        {/* Interactive World Map Studio Client */}
        <WorldMapStudioClient />

        {/* Educational Content & Telemetry Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              The Astronomical Solar Terminator
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              The luminous curve traversing the map represents the exact astronomical boundary where the sun is on the local horizon. The curvature changes with Earth’s axial tilt throughout the four seasons.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Greenwich Prime Meridian (0°)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Anchored at the Royal Observatory in Greenwich, London, the Prime Meridian marks 0° longitude. Time zones west subtract hours (UTC-), while time zones east add hours (UTC+) up to the International Date Line (180°).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Atomic NTP Clock Synchronization
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every city clock ticks in exact synchronization with international UTC atomic time standards, ensuring microsecond accuracy across desktop, tablet, and mobile browsers.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <FaqAccordion items={WORLD_MAP_FAQS} title="Frequently Asked Questions About the World Time Map" />

        {/* Universal Related Links Directory */}
        <RelatedLinksHub />
      </div>
    </div>
  );
}
