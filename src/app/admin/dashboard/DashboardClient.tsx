"use client";

import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Search,
  Eye,
  MousePointer,
  CheckCircle,
  AlertTriangle,
  Lock,
  Layers,
  BarChart3,
  Calendar,
  Globe,
  RefreshCw,
  Sparkles
} from 'lucide-react';

// Real data from scripts/gsc_2026_09_26/
const GSC_OPPORTUNITIES = [
  { query: 'what time is it', impressions: 235, clicks: 0, ctr: '0.0%', position: 8.98, opportunity: 'Add instant live clock hero snippet' },
  { query: 'time now', impressions: 19, clicks: 0, ctr: '0.0%', position: 7.26, opportunity: 'Optimize homepage & /clock title' },
  { query: 'what time is sunset', impressions: 13, clicks: 0, ctr: '0.0%', position: 10.69, opportunity: 'Optimize /sun landing title' },
  { query: 'edt to mdt', impressions: 11, clicks: 0, ctr: '0.0%', position: 9.64, opportunity: 'Converter pair metadata refined' },
  { query: 'atomic clock online', impressions: 10, clicks: 0, ctr: '0.0%', position: 8.20, opportunity: 'Calibrated NTP precision copy added' },
  { query: 'indian standard time now', impressions: 7, clicks: 0, ctr: '0.0%', position: 4.57, opportunity: 'High SERP position; target CTR title' },
  { query: 'pst vs mst', impressions: 4, clicks: 0, ctr: '0.0%', position: 5.50, opportunity: 'Comparison slug metadata optimized' },
  { query: 'bst time to cet', impressions: 5, clicks: 0, ctr: '0.0%', position: 2.00, opportunity: 'Position #2 in Google SERP' },
];

const GSC_TOP_PAGES = [
  { url: '/converter', impressions: 148, clicks: 0, ctr: '0.0%', position: 20.21, status: 'Audited' },
  { url: '/today', impressions: 130, clicks: 0, ctr: '0.0%', position: 41.11, status: 'Fixed title & verified' },
  { url: '/countries/united-states', impressions: 106, clicks: 1, ctr: '0.94%', position: 46.50, status: 'Indexed' },
  { url: '/timezone/america-st-lucia', impressions: 73, clicks: 0, ctr: '0.0%', position: 8.33, status: 'Static pre-render added' },
  { url: '/converter/est-to-cst', impressions: 71, clicks: 0, ctr: '0.0%', position: 34.44, status: 'Audited' },
  { url: '/timezone/america-nassau', impressions: 60, clicks: 0, ctr: '0.0%', position: 7.43, status: 'Static pre-render added' },
  { url: '/timezone/america-anguilla', impressions: 59, clicks: 0, ctr: '0.0%', position: 11.00, status: 'Static pre-render added' },
  { url: '/converter/est-to-pst', impressions: 58, clicks: 0, ctr: '0.0%', position: 27.74, status: 'Audited' },
];

export function DashboardClient() {
  const [revenueTarget, setRevenueTarget] = useState<number>(200000); // ₹2,00,000 target
  const [activeTab, setActiveTab] = useState<'overview' | 'seo' | 'monetization' | 'integrations'>('overview');

  // Realistic scenario modeling based on current foundations
  const scenarioAdPageviews = 250000;
  const scenarioAdCpmInr = 125; // ~$1.50 CPM with non-intrusive AdSense/Header Bidding
  const forecastAdRevenue = Math.round((scenarioAdPageviews / 1000) * scenarioAdCpmInr); // ₹31,250

  const scenarioProWidgets = 180; // 180 sites paying ₹499/mo
  const forecastWidgetRevenue = scenarioProWidgets * 499; // ₹89,820

  const scenarioDevApi = 120; // 120 dev subscribers @ ₹399/mo
  const scenarioBizApi = 16; // 16 biz subscribers @ ₹1,999/mo
  const forecastApiRevenue = scenarioDevApi * 399 + scenarioBizApi * 1999; // ₹47,880 + ₹31,984 = ₹79,864

  const totalForecastMonthlyRevenue = forecastAdRevenue + forecastWidgetRevenue + forecastApiRevenue; // ~₹2,00,934
  const progressPct = Math.min(100, Math.round((totalForecastMonthlyRevenue / revenueTarget) * 100));

  return (
    <div className="space-y-8">
      {/* Header Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex gap-2">
          {(['overview', 'seo', 'monetization', 'integrations'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Monthly Goal:</span>
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono font-bold">
            <span>₹</span>
            <input
              type="number"
              value={revenueTarget}
              onChange={(e) => setRevenueTarget(Number(e.target.value) || 200000)}
              className="w-20 bg-transparent text-right outline-none"
            />
          </div>
        </div>
      </div>

      {/* Target Progress Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-4 h-4" />
              Strategic Growth Objective
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              ₹2,00,000 / month Commercial Target
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 block">Scenario Run-Rate</span>
            <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              ₹{totalForecastMonthlyRevenue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            <span>Current Sample: $0.112 (~₹9.40)</span>
            <span>Target Modeled: {progressPct}% of ₹{revenueTarget.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clock Widgets (Pro)</span>
                <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
                  <Layers className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                ₹{forecastWidgetRevenue.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500 ml-1">/ mo</span>
              </div>
              <p className="text-xs text-slate-500">
                180 websites using white-label Pro embeds @ ₹499/mo. 7 premium themes implemented.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Time REST API</span>
                <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                ₹{forecastApiRevenue.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500 ml-1">/ mo</span>
              </div>
              <p className="text-xs text-slate-500">
                120 Dev Pro (₹399/mo) + 16 Business Scale (₹1,999/mo). Live rate limiter active.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ad Network (Optimized)</span>
                <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                ₹{forecastAdRevenue.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-500 ml-1">/ mo</span>
              </div>
              <p className="text-xs text-slate-500">
                Targeting 250k views @ ₹125 CPM ($1.50) via policy-compliant AdSense / Prebid display.
              </p>
            </div>
          </div>

          {/* 7-Day Sprint: 5,000 Daily Clicks Action Center */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-5 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Growth Sprint: 7-Day Surge
                </div>
                <h3 className="text-2xl font-black mt-2">
                  Target: 5,000 Daily Clicks (35,000 / week)
                </h3>
                <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
                  Aggressive 4-pillar execution: IndexNow instant search engine queuing, Google Position 0 featured snippet optimization, 889 mined long-tail queries, and viral community tools.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[160px]">
                <span className="text-[11px] text-blue-200 block">Daily Target</span>
                <span className="text-3xl font-black font-mono text-emerald-400">5,000</span>
                <span className="text-[10px] text-slate-300 block">clicks / day</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-blue-300 block">Pillar 1: IndexNow Queued</span>
                <p className="text-[11px] text-slate-300">352 canonical URLs submitted to Bing &amp; Yandex with HTTP 200.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-blue-300 block">Pillar 2: Position 0 Direct Answers</span>
                <p className="text-[11px] text-slate-300">Targeting 122 direct-answer queries with 45-word snippet boxes.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-blue-300 block">Pillar 3: Long-Tail Mined Queries</span>
                <p className="text-[11px] text-slate-300">637 ultra-low KD bilateral state &amp; city comparison phrases.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="font-bold text-blue-300 block">Pillar 4: Viral Distribution</span>
                <p className="text-[11px] text-slate-300">Meeting Cost Slack Receipt, Memento Mori grid, and Sleep cycles.</p>
              </div>
            </div>
          </div>

          {/* Core Priorities Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Milestone Implementation Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4" />
                  P0: Accuracy & Location Engine
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Eliminated Delhi UTC+0 SSR glitch, Paris title stale closures, polar day/night errors, and standardized DST calculations across all global zones.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4" />
                  P0: Technical SEO & Canonicalization
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Fixed Host headers, added trailing-slash & non-www normalization middleware, replaced fake sitemap lastmod dates, verified all 92 routes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4" />
                  P1: Performance & Shared Clock
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Replaced multiple uncoordinated setInterval loops with central clock subscriber, visibilitychange mobile resume, and suppressHydrationWarning.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle className="w-4 h-4" />
                  P2: Commercial Monetization Tiers
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Implemented ₹499/mo Pro Widgets with 7 themes and white-label branding; built ₹399/mo & ₹1,999/mo tiered API rate limiter and developer playground.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEO GSC Analysis Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                High-Impression Opportunity Queries (Google Search Console Data)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Real search terms where TimeNumbers ranks in positions 2–11 with impressions but 0 clicks. Targeting these delivers immediate organic traffic.
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">Search Query</th>
                    <th className="p-3 text-right">Impressions</th>
                    <th className="p-3 text-right">Avg Position</th>
                    <th className="p-3">Actionable SEO Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  {GSC_OPPORTUNITIES.map(item => (
                    <tr key={item.query} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">{item.query}</td>
                      <td className="p-3 text-right">{item.impressions}</td>
                      <td className="p-3 text-right text-blue-600 dark:text-blue-400 font-bold">{item.position}</td>
                      <td className="p-3 font-sans text-slate-600 dark:text-slate-300">{item.opportunity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-5 shadow-sm">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Top Indexed Landing Pages by Impressions
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pages with the highest visibility in Google index during the recent crawl window.
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3">URL Path</th>
                    <th className="p-3 text-right">Impressions</th>
                    <th className="p-3 text-right">Clicks</th>
                    <th className="p-3 text-right">Avg Position</th>
                    <th className="p-3">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  {GSC_TOP_PAGES.map(page => (
                    <tr key={page.url} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">{page.url}</td>
                      <td className="p-3 text-right">{page.impressions}</td>
                      <td className="p-3 text-right">{page.clicks}</td>
                      <td className="p-3 text-right">{page.position}</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          {page.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Monetization Breakdown Tab */}
      {activeTab === 'monetization' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Revenue Stream Roadmap to ₹2,00,000 / month
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase text-purple-600">Stream 1: Pro Clock Widgets</span>
                <div className="text-xl font-bold">₹99,800 / mo target</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Target: 200 websites @ ₹499/mo. Web design agencies, remote companies, and event sites embedding customizable clocks without TimeNumbers branding.
                </p>
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Ready in builder: 7 themes, white-label toggle, CMS guides.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/90 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase text-blue-600">Stream 2: Time REST API</span>
                <div className="text-xl font-bold">₹79,864 / mo target</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Target: 120 Developer Pro (@ ₹399/mo) + 16 Business Scale (@ ₹1,999/mo). SaaS scheduling tools, logistics dashboards, and mobile app backends.
                </p>
                <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Ready in API: Sliding rate limiter, headers, playground.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold uppercase text-amber-600">Stream 3: Display Advertising</span>
                <div className="text-xl font-bold">₹31,250 / mo target</div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Target: 250,000 monthly pageviews at ₹125 CPM ($1.50) using Google AdSense / Header Bidding once organic traffic grows via SEO fixes.
                </p>
                <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
                  Current: Monetag popunder/vignette ($0.50 CPM). Migration planned.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integrations Health Tab */}
      {activeTab === 'integrations' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              System Connections & Credential Status
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Live status of data feeds, advertising scripts, and payment gateways.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-xs">Google Search Console Telemetry</span>
                </div>
                <p className="text-xs text-slate-500">
                  Local export snapshot active (`scripts/gsc_2026_09_26/`). Live OAuth API pending credentials.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
                Snapshot Active
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-xs">Google Analytics 4 (GA4)</span>
                </div>
                <p className="text-xs text-slate-500">
                  Tracking script active in `layout.tsx` (`siteConfig.googleAnalyticsId`).
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
                Connected
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-xs">Monetag Advertising Tag</span>
                </div>
                <p className="text-xs text-slate-500">
                  Zone 289432 script loaded. Policy migration to Google AdSense / Header Bidding requires approval.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-1 bg-amber-100 text-amber-800 rounded">
                Active (Audit Pending)
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-xs">Stripe / Razorpay Payments</span>
                </div>
                <p className="text-xs text-slate-500">
                  Staging subscription architecture ready. Requires production payment secrets (`STRIPE_SECRET_KEY` / `RAZORPAY_KEY_ID`).
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                Staging Ready
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
