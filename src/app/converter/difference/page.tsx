import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { POPULAR_TIME_DIFFERENCE_PAIRS, findCityByRootSlug } from '@/lib/geo/city-lookup';
import { getTimeDifferenceText, getUtcOffsetMinutes } from '@/lib/time/engine';
import { HUB_PAGES_CUSTOM_CONTENT } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';
import { CityDifferenceHubClient, DiffPairItem } from './CityDifferenceHubClient';
import { ArrowLeftRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

const content = HUB_PAGES_CUSTOM_CONTENT['/converter/difference'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/converter/difference'
);

export default function CityDifferenceDirectoryPage() {
  const now = new Date();

  // Resolve all 92 programmatic pairs with real-time horological offsets
  const preparedPairs: DiffPairItem[] = POPULAR_TIME_DIFFERENCE_PAIRS.map((pair) => {
    const cityA = findCityByRootSlug(pair.cityA);
    const cityB = findCityByRootSlug(pair.cityB);

    const nameA = cityA?.name || pair.cityA;
    const nameB = cityB?.name || pair.cityB;
    const countryA = cityA?.country || 'Global';
    const countryB = cityB?.country || 'Global';
    const tzA = cityA?.timezone || 'UTC';
    const tzB = cityB?.timezone || 'UTC';

    const diff = getTimeDifferenceText(tzB, tzA, now);

    // Calculate business overlap hours (9 AM to 6 PM)
    const offA = getUtcOffsetMinutes(tzA, now);
    const offB = getUtcOffsetMinutes(tzB, now);
    const diffMins = offB - offA;

    let overlapCount = 0;
    for (let h = 0; h < 24; h++) {
      const isBizA = h >= 9 && h < 18;
      const targetMins = (h * 60 + diffMins + 1440 * 2) % 1440;
      const targetH = Math.floor(targetMins / 60);
      const isBizB = targetH >= 9 && targetH < 18;
      if (isBizA && isBizB) {
        overlapCount++;
      }
    }

    return {
      slug: `${pair.cityA}-to-${pair.cityB}`,
      cityA: pair.cityA,
      nameA,
      countryA,
      tzA,
      cityB: pair.cityB,
      nameB,
      countryB,
      tzB,
      diffSummary: diff.summary,
      diffHours: diff.diffHours,
      isEqual: diff.diffHours === 0,
      overlapHours: overlapCount,
    };
  });

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Bilateral World City Time Differences',
    description: 'Directory of major world city time differences, exact hours ahead or behind, and business hour overlap.',
    numberOfItems: preparedPairs.length,
    itemListElement: preparedPairs.map((pair, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${pair.nameA} to ${pair.nameB} Time Difference`,
      url: `https://www.timenumbers.com/converter/difference/${pair.slug}`,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { name: 'Converter', url: '/converter' },
          { name: 'Time Differences', url: '/converter/difference' },
        ]}
      />

      <JsonLd type="faq" data={content.faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            92 Verified City Corridors
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Real-Time Atomic Clock Offsets</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Cross-Border Business Overlap</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Seasonal DST Shift Detection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Directory & Search Grid */}
      <CityDifferenceHubClient pairs={preparedPairs} />

      {/* Editorial Content Block */}
      <EditorialContentBlock content={content} badgeLabel="Bilateral Chronometry Guide" />

      {/* FAQs */}
      <div className="pt-2">
        <FaqAccordion
          title="Frequently Asked Questions About City Time Differences"
          subtitle="Essential insights into calculating global time gaps, seasonal clock changes, and reciprocal scheduling."
          items={content.faqs}
        />
      </div>

      {/* Related Links Hub */}
      <RelatedLinksHub
        currentPath="/converter/difference"
        title="Explore Related Horology Tools & Directories"
        subtitle="Access 552 timezone converters, multi-city comparisons, and meeting planners."
      />
    </div>
  );
}
