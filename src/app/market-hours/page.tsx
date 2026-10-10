import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { MarketHoursClient } from '@/components/market/MarketHoursClient';
import { TrendingUp, Clock, Globe, Zap, DollarSign, ShieldAlert, BookOpen, Layers, Sparkles } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'World Stock Market Hours & Forex Trading Sessions Live Tracker',
  'Track live stock market hours across NYSE, NASDAQ, London (LSE), Tokyo (TSE), India (NSE), and Hong Kong. Real-time bell countdowns, 24-hour overlap scrubber, and Forex market clocks.',
  '/market-hours'
);

const MARKET_FAQS: FaqItem[] = [
  {
    question: 'What time does the US stock market (NYSE & NASDAQ) open and close?',
    answer:
      'The regular trading session for the New York Stock Exchange (NYSE) and NASDAQ opens at 9:30 AM Eastern Time (EST/EDT) and closes at 4:00 PM Eastern Time, Monday through Friday. Pre-market trading begins as early as 4:00 AM EST, and after-hours trading continues until 8:00 PM EST.'
  },
  {
    question: 'What is the "Golden Overlap" in global market trading?',
    answer:
      'The Golden Overlap occurs between 8:00 AM and 12:00 PM Eastern Time (1:00 PM to 5:00 PM UTC), when both the London Stock Exchange (European session) and the New York markets (American session) are actively open at the exact same time. This 4-hour window accounts for nearly 70% of all global equity and forex liquidity, leading to tighter spreads and higher price movement.'
  },
  {
    question: 'Why do Asian markets have a lunch break while US and European markets do not?',
    answer:
      'Exchanges like the Tokyo Stock Exchange (TSE) and Hong Kong (HKEX) pause trading for an official 60-minute midday lunch break (typically 11:30 AM to 12:30 PM in Tokyo, and 12:00 PM to 1:00 PM in Hong Kong). This traditional practice allows brokers and institutional market makers to reconcile order books, audit margins, and take a breather during lower volume hours.'
  },
  {
    question: 'How does Daylight Saving Time (DST) affect international market hours?',
    answer:
      'Because countries change their clocks on different dates (or do not observe Daylight Saving Time at all, like Japan and India), the time difference between exchanges shifts by one hour twice a year. For example, during the two weeks in March when the US has started Daylight Saving Time but the UK has not, the London-New York market overlap changes by one hour.'
  },
  {
    question: 'Are Forex currency markets really open 24 hours a day?',
    answer:
      'Yes, the foreign exchange (Forex) market operates 24 hours a day, 5 days a week. It opens on Sunday evening at 5:00 PM EST (as the Sydney session begins in Australia) and remains open continuously across four rotating regional sessions until Friday at 5:00 PM EST when New York wraps up.'
  },
  {
    question: 'Is it safe for retail beginners to trade during pre-market or after-hours?',
    answer:
      'Pre-market and after-hours sessions have significantly lower trading volume and fewer participants than the regular session. This causes wider bid-ask spreads, high volatility, and increased slippage. Financial experts recommend beginner investors stick to regular market hours when liquidity is highest and institutional pricing is most stable.'
  }
];

export default function MarketHoursPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeNumbers World Stock Market & Forex Hours Tracker',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Live synchronized world stock market hours and 24/5 Forex sessions clock with bell countdowns, liquidity overlap detection, and local time conversion.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: MARKET_FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ name: 'Market Hours Tracker', url: '/market-hours' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="space-y-3 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Global Financial Chronometry</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          World Stock Market Hours &amp; Forex Trading Sessions Live Clock
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Check whether the stock exchanges in New York, London, Tokyo, Mumbai, and Hong Kong are open right now. Track live opening and closing bell countdowns, discover peak liquidity windows across 24/5 Forex sessions, and convert market hours to your exact local timezone.
        </p>
      </div>

      {/* Main Interactive Client */}
      <MarketHoursClient locale="en" />

      {/* Humanized Layman Educational Guide Section */}
      <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Market Hours Explained in Plain English</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            How Global Financial Trading Hours Work Around the World
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The world never sleeps, and neither do financial markets. As the sun rises and sets across different continents, financial capital flows continuously from Sydney to Tokyo, through London and Frankfurt, and into New York. Understanding when markets open, close, and overlap is one of the most critical factors for every investor, day trader, and global financial analyst.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Card 1: Regular vs Pre/After Market */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Regular Hours vs Pre-Market
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              While the official bell rings at 9:30 AM EST in New York, electronic trading platforms begin processing orders in the pre-market as early as 4:00 AM. After-hours trading runs until 8:00 PM EST. However, volume is much thinner outside regular hours, which means prices can fluctuate wildly on single news events.
            </p>
          </div>

          {/* Card 2: The Golden Overlap */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The Golden Overlap Window
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Between 8:00 AM and 12:00 PM EST (1:00 PM to 5:00 PM UTC), London and New York are open at the same time. This single 4-hour window accounts for nearly 70% of total daily global foreign exchange turnover and the deepest stock liquidity of the day.
            </p>
          </div>

          {/* Card 3: The 24/5 Forex Cycle */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The 24-Hour Currency Relay
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Unlike stock exchanges which open and close for local business hours, foreign exchange markets pass the baton around the globe in a 24-hour relay. From Sydney to Tokyo, London to New York, currencies trade continuously without interruption from Sunday evening through Friday afternoon.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          items={MARKET_FAQS}
          title="Frequently Asked Questions About Global Market Hours"
          subtitle="Clear, simple answers to the most common questions about opening bells, trading sessions, and market timezones."
        />
      </div>

      {/* Related Chronometry Tools */}
      <RelatedLinksHub
        currentPath="/market-hours"
        title="Explore More Precision Global Time Tools"
        subtitle="Compare world clocks, plan international team meetings, and convert timezones without confusion."
      />
    </main>
  );
}
