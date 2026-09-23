"use client";

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import {
  TrendingUp,
  BarChart3,
  Search,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Layers,
  Award,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SimulationQuery {
  keyword: string;
  category: string;
  kd: number;
  monthlyVol: number;
  type: 'Long-Tail' | 'Mid-Tail' | 'Short-Tail (Head)';
}

const SAMPLE_QUERIES: SimulationQuery[] = [
  { keyword: "time difference between london and tokyo", category: "Comparison", kd: 12, monthlyVol: 35000, type: "Long-Tail" },
  { keyword: "how many business days between two dates", category: "Date Math", kd: 18, monthlyVol: 65000, type: "Long-Tail" },
  { keyword: "time zone overlap calculator for remote teams", category: "B2B Scheduling", kd: 15, monthlyVol: 28000, type: "Long-Tail" },
  { keyword: "convert 9am pst to singapore time", category: "Conversion", kd: 14, monthlyVol: 42000, type: "Long-Tail" },
  { keyword: "is my computer clock fast or slow", category: "Accuracy", kd: 20, monthlyVol: 50000, type: "Long-Tail" },
  { keyword: "time converter", category: "Utility", kd: 58, monthlyVol: 1200000, type: "Mid-Tail" },
  { keyword: "timezone map", category: "Time Zones", kd: 52, monthlyVol: 850000, type: "Mid-Tail" },
  { keyword: "sunrise sunset", category: "Astronomy", kd: 60, monthlyVol: 950000, type: "Mid-Tail" },
  { keyword: "world clock", category: "Core Clock", kd: 86, monthlyVol: 3200000, type: "Short-Tail (Head)" },
  { keyword: "current time", category: "Core Clock", kd: 89, monthlyVol: 5800000, type: "Short-Tail (Head)" },
  { keyword: "exact time", category: "Core Clock", kd: 92, monthlyVol: 7500000, type: "Short-Tail (Head)" },
  { keyword: "time", category: "Mega Head", kd: 98, monthlyVol: 35000000, type: "Short-Tail (Head)" },
];

interface Props {
  h1Title?: string;
  description?: string;
}

export function SeoSimulatorClient({ h1Title, description }: Props) {
  const [da, setDa] = useState<number>(25);
  const [programmaticPages, setProgrammaticPages] = useState<number>(1500);

  // Dynamic calculation of ranking position based on DA vs KD
  const calculateRank = (kd: number) => {
    const diff = da - kd;
    if (diff >= 15) return { pos: 1, label: "Top 3 (#1 - #3)", tier: "rank-1", ctr: 0.28 };
    if (diff >= 5) return { pos: 3, label: "First Page (#4 - #6)", tier: "rank-page-1", ctr: 0.12 };
    if (diff >= -5) return { pos: 8, label: "Bottom Page 1 (#7 - #10)", tier: "rank-low-1", ctr: 0.04 };
    if (diff >= -15) return { pos: 15, label: "Page 2 (#11 - #20)", tier: "rank-page-2", ctr: 0.01 };
    if (diff >= -30) return { pos: 35, label: "Page 4 - 5 (#30 - #50)", tier: "rank-page-5", ctr: 0.001 };
    return { pos: 90, label: "Unranked (> #70)", tier: "unranked", ctr: 0.0 };
  };

  // Compute total monthly traffic estimate
  const totalTraffic = SAMPLE_QUERIES.reduce((acc, q) => {
    const rank = calculateRank(q.kd);
    // Scale traffic with programmatic footprint
    const footprintMultiplier = q.type === 'Long-Tail' ? Math.min(5, 1 + (programmaticPages / 2000)) : 1;
    const est = Math.floor(q.monthlyVol * rank.ctr * footprintMultiplier);
    return acc + est;
  }, 0);

  // Milestone stages
  const currentStage =
    da < 25
      ? { stage: "Stage 1: Long-Tail Programmatic Moat", desc: "Capturing highly specific 4+ word searches where KD < 20. Earning organic backlinks and user trust." }
      : da < 55
      ? { stage: "Stage 2: Mid-Tail Keyword Acceleration", desc: "Breaking into 1M+ search categories (time converters, timezone maps, city directories)." }
      : { stage: "Stage 3: Head-Term Domination", desc: "Outranking Time.is and TimeAndDate.com for 'exact time', 'world clock', and 'current time'." };

  const faqs = [
    {
      question: "Why is targeting short-tail keywords the slowest way to get traffic?",
      answer: "Short-tail head terms like 'exact time' and 'world clock' have astronomical Keyword Difficulty (KD 85-98) and are occupied by legacy domains with 20+ years of accumulated backlinks. New websites lack the Domain Authority (DA) required to bypass Google's trust filters for these competitive terms."
    },
    {
      question: "How does the Programmatic SEO flywheel elevate Domain Authority?",
      answer: "By creating thousands of programmatic long-tail pages (e.g., city-pair time differences, timezone conversions, business day deadlines), you rank immediately for low-competition queries. As users bookmark and link to these pages, link equity flows upward through internal architecture to your homepage and pillar pages, steadily elevating your entire domain's authority."
    },
    {
      question: "What is the relationship between Domain Authority and Keyword Difficulty?",
      answer: "As a general search engine heuristic, a page tends to rank on Page 1 when the website's Domain Authority (DA) meets or exceeds the target query's Keyword Difficulty (KD), provided the content satisfies user intent and has valid technical markup."
    }
  ];

  return (
    <div className="space-y-10">
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>SEO Growth Flywheel Simulator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {h1Title || "Domain Authority vs Keyword Difficulty Simulator"}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          {description || "Visualize how thousands of programmatic long-tail pages build topical authority and eventually pull 10M+ head terms onto Google Page 1."}
        </p>
      </header>

      {/* Interactive Controls & Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sliders Panel (7 cols) */}
        <section className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Simulated Domain Authority (DA)
                </label>
                <span className="font-mono font-black text-2xl text-blue-600 dark:text-blue-400">
                  DA {da}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={da}
                onChange={(e) => setDa(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>New Site (DA 5)</span>
                <span>Growing Authority (DA 40)</span>
                <span>Time.is / Giants (DA 90+)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Programmatic Long-Tail Pages Published
                </label>
                <span className="font-mono font-black text-2xl text-emerald-600 dark:text-emerald-400">
                  {programmaticPages.toLocaleString()} pages
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="10000"
                step="50"
                value={programmaticPages}
                onChange={(e) => setProgrammaticPages(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>50 Core Pages</span>
                <span>2,500 City Combinations</span>
                <span>10,000+ Deep Long-Tail Moat</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block tracking-wider">
              Current Strategy Phase
            </span>
            <div className="font-bold text-sm text-slate-900 dark:text-white">
              {currentStage.stage}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {currentStage.desc}
            </p>
          </div>
        </section>

        {/* Projected Traffic Scorecard (5 cols) */}
        <section className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 block mb-1">
              Projected Monthly Organic Visits
            </span>
            <div className="text-4xl sm:text-5xl font-black font-mono text-emerald-400">
              {totalTraffic.toLocaleString()}+
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Based on CTR models for simulated rank positions across long-tail and head queries.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Long-Tail Status</span>
              <span className="font-bold text-emerald-400">
                {da >= 20 ? "Page 1 Ranking" : "Indexing Phase"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Head Term Status</span>
              <span className={`font-bold ${da >= 70 ? "text-emerald-400" : "text-amber-400"}`}>
                {da >= 70 ? "Page 1 Contender" : "Guarded by Giants"}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Real-time Query Ranking Matrix */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Simulated Search Query Rankings vs Domain Authority</span>
            </h2>
            <p className="text-xs text-slate-500">
              Notice how long-tail queries rank immediately at low DA, while short-tail head terms unlock only as DA exceeds 70+.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            Active DA: {da}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-2">Target Search Query</th>
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2 text-center">Keyword Difficulty</th>
                <th className="py-3 px-2 text-right">Search Volume</th>
                <th className="py-3 px-2 text-center">Projected Google Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {SAMPLE_QUERIES.map((q) => {
                const rank = calculateRank(q.kd);
                const isPage1 = rank.pos <= 10;
                return (
                  <tr key={q.keyword} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-2 font-bold text-slate-900 dark:text-white max-w-xs truncate">
                      {q.keyword}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        q.type === 'Long-Tail'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                          : q.type === 'Mid-Tail'
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                      }`}>
                        {q.type}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center font-mono font-bold">
                      <span className={`${q.kd > 80 ? 'text-rose-500' : q.kd > 40 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        KD {q.kd}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-slate-600 dark:text-slate-400">
                      {q.monthlyVol.toLocaleString()}/mo
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black font-mono ${
                        isPage1
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                          : rank.pos <= 20
                          ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {isPage1 && <CheckCircle2 className="w-3 h-3" />}
                        <span>{rank.label}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Flywheel Explanation Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">1. Programmatic Leaves</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Thousands of programmatic URLs (e.g. <code>/time-difference/tokyo/london</code>) rank effortlessly within 30–60 days because Keyword Difficulty is ultra-low (KD 10–20).
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">2. Link Equity Upstream</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every programmatic page passes internal PageRank through breadcrumbs and contextual pillar links up to <code>/time-zones</code>, <code>/world-clock</code>, and <code>/</code>.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">3. Head Term Domination</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            As aggregate domain signals rise, the homepage naturally enters Page 1 for mega terms like <strong>&quot;exact time&quot;</strong> and <strong>&quot;world clock&quot;</strong> without risky link purchasing.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={faqs} title="Frequently Asked Questions: Long-Tail vs Head Terms" />
      </section>

      <RelatedLinksHub />
    </div>
  );
}
