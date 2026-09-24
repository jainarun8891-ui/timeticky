import React from 'react';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug, POPULAR_TIME_DIFFERENCE_PAIRS, getRelatedDifferencePairs } from '@/lib/geo/city-lookup';
import { TimeDifferencePairClient } from '@/components/converter/TimeDifferencePairClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getCityDifferenceData, getCityDifferenceFaqs } from '@/lib/seo/page-faqs';
import { CITY_DIFFERENCE_CUSTOM_CONTENT } from '@/lib/seo/city-difference-custom-content';
import { Clock, Compass, ArrowLeftRight, ArrowRight, Globe } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const customSlugs = Object.keys(CITY_DIFFERENCE_CUSTOM_CONTENT);
  const pairSlugs = POPULAR_TIME_DIFFERENCE_PAIRS.map(p => `${p.cityA}-to-${p.cityB}`);
  const allSlugs = Array.from(new Set([...customSlugs, ...pairSlugs]));
  return allSlugs.map(slug => ({ slug }));
}

function parsePairSlug(rawSlug: string): { slugA: string; slugB: string } | null {
  if (!rawSlug || !rawSlug.includes('-to-')) return null;
  const parts = rawSlug.toLowerCase().split('-to-');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return { slugA: parts[0], slugB: parts[1] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parsePairSlug(slug);
  if (!parsed) return buildPageMetadata('Time Difference Not Found', 'City time difference not found.', `/converter/difference/${slug}`);

  const cityA = findCityByRootSlug(parsed.slugA);
  const cityB = findCityByRootSlug(parsed.slugB);
  if (!cityA || !cityB) return buildPageMetadata('Time Difference Not Found', 'City time difference not found.', `/converter/difference/${slug}`);

  const cleanA = getCityRootSlug(cityA);
  const cleanB = getCityRootSlug(cityB);
  const canonicalSlug = `${cleanA}-to-${cleanB}`;

  const custom = CITY_DIFFERENCE_CUSTOM_CONTENT[canonicalSlug];
  if (custom) {
    return buildPageMetadata(custom.title, custom.description, `/converter/difference/${canonicalSlug}`);
  }

  const data = getCityDifferenceData(cityA, cityB);
  const diffSentence = data.diff.isEqual
    ? `${cityB.name} and ${cityA.name} share the same local time.`
    : `${cityB.name} is exactly ${data.diff.formatted} of ${cityA.name}.`;

  return buildPageMetadata(
    `${cityA.name} to ${cityB.name} Time Difference (Exact Hours & Overlap)`,
    `${diffSentence} Calculate overlapping business hours and find the best time to schedule cross-border meetings between ${cityA.name} and ${cityB.name}.`,
    `/converter/difference/${canonicalSlug}`
  );
}

export default async function ConverterCityDifferencePage({ params }: Props) {
  const { slug } = await params;
  const parsed = parsePairSlug(slug);
  if (!parsed) notFound();

  const cityA = findCityByRootSlug(parsed.slugA);
  const cityB = findCityByRootSlug(parsed.slugB);

  if (!cityA || !cityB) {
    notFound();
  }

  const cleanA = getCityRootSlug(cityA);
  const cleanB = getCityRootSlug(cityB);
  const canonicalSlug = `${cleanA}-to-${cleanB}`;

  if (slug !== canonicalSlug) {
    permanentRedirect(`/converter/difference/${canonicalSlug}`);
  }

  const custom = CITY_DIFFERENCE_CUSTOM_CONTENT[canonicalSlug];
  const dynamicFaqs = getCityDifferenceFaqs(cityA, cityB);
  const faqs = custom?.faqs || dynamicFaqs;

  const data = getCityDifferenceData(cityA, cityB);
  const diffSentence = data.diff.isEqual
    ? `${cityB.name} and ${cityA.name} share the same local time.`
    : `${cityB.name} is exactly ${data.diff.formatted} of ${cityA.name}.`;

  const breadcrumbs = [
    { name: 'Converter', url: '/converter' },
    { name: 'Time Differences', url: '/converter/difference' },
    { name: `${cityA.name} to ${cityB.name}`, url: `/converter/difference/${canonicalSlug}` }
  ];

  const reciprocalSlug = `${cleanB}-to-${cleanA}`;
  const relatedPairs = getRelatedDifferencePairs(cleanA, cleanB, 8).map(p => {
    const rCityA = findCityByRootSlug(p.cityA);
    const rCityB = findCityByRootSlug(p.cityB);
    return {
      slug: `${p.cityA}-to-${p.cityB}`,
      nameA: rCityA?.name || p.cityA,
      nameB: rCityB?.name || p.cityB,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd type="faq" data={faqs} />

      {/* Header Banner with single canonical H1 */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Clock className="w-3.5 h-3.5" />
            Bilateral Time Zone Comparison
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {custom?.h1 || `${cityA.name} to ${cityB.name} Time Difference`}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {custom?.description || `${diffSentence} Compare live atomic clocks, calculate overlapping working hours, and schedule meetings seamlessly.`}
          </p>
        </div>
      </div>

      <TimeDifferencePairClient cityA={cityA} cityB={cityB} />

      {/* Reciprocal Comparison & City Hub Link Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Reciprocal Pair Card */}
        <Link
          href={`/converter/difference/${reciprocalSlug}`}
          className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Reverse Direction</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {cityB.name} to {cityA.name} Time Difference
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              View {cityA.name} from the perspective of {cityB.name} with reciprocal business overlap.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>View Reciprocal Clocks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* City A Time Hub */}
        <Link
          href={`/time/${cleanA}`}
          className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5 text-blue-500" />
              <span>Reference City Profile</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Current Time in {cityA.name}, {cityA.country}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Live atomic clock, daylight saving schedule, sunrise and sunset in {cityA.name}.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>Explore {cityA.name} Clocks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* City B Time Hub */}
        <Link
          href={`/time/${cleanB}`}
          className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <span>Target City Profile</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Current Time in {cityB.name}, {cityB.country}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Live atomic clock, daylight saving schedule, sunrise and sunset in {cityB.name}.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span>Explore {cityB.name} Clocks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Related Bilateral Differences Grid */}
      {relatedPairs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Interconnected Corridors</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Related City Time Differences
              </h2>
            </div>
            <Link
              href="/converter/difference"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>View All 92 Differences Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {relatedPairs.map((r) => (
              <Link
                key={r.slug}
                href={`/converter/difference/${r.slug}`}
                className="group p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-700/60 border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between"
              >
                <div className="truncate">
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {r.nameA} vs {r.nameB}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {r.nameA} to {r.nameB} Difference
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {custom && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-sm">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Transcontinental Coordination</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {custom.headings[0] || `${cityA.name} to ${cityB.name} Time Difference`}
            </h2>
            {custom.page_text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {paragraph}
              </p>
            ))}
          </div>

          {custom.headings.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {custom.headings.slice(1).map((heading, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Compare reciprocal schedules, verify working hour alignments, and schedule with confidence.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={faqs} />
      </div>

      <RelatedLinksHub />
    </div>
  );

}
