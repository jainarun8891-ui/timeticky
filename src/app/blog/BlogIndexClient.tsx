"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, User, ArrowRight, Search, Sparkles, Tag } from 'lucide-react';
import { BLOG_ARTICLES, Article } from '@/lib/blog/articles';

interface Props {
  h1Title?: string;
  description?: string;
}

export function BlogIndexClient({ h1Title, description }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Horology', 'Global Time', 'Productivity', 'Engineering', 'Science'];

  const filtered = BLOG_ARTICLES.filter(a => {
    const matchesCat = activeCategory === 'All' || a.category === activeCategory;
    const matchesQuery = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const featured = BLOG_ARTICLES[0];

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Global Time Chronometry Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {h1Title || "Horology, Time Zones & Chronometry"}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
          {description || "In-depth architectural guides, astronomical science, and global productivity frameworks for our connected planet."}
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-3 shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles & keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder-slate-400 border border-slate-200 dark:border-slate-700 outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Featured Article Card */}
      {activeCategory === 'All' && !searchQuery && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-8 hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 h-64 rounded-2xl overflow-hidden bg-cover bg-center border border-slate-200/80" style={{ backgroundImage: "url('/images/paris_hero.jpg')" }} />
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800">
                  Featured Article
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {featured.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight hover:text-blue-600 transition-colors">
                <Link href={`/blog/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">
                    {featured.author.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {featured.author}
                  </span>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((art) => (
          <article
            key={art.slug}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px]">
                  {art.category}
                </span>
                <span className="text-slate-400 font-medium text-[11px]">
                  {art.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                <Link href={`/blog/${art.slug}`}>
                  {art.title}
                </Link>
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                {art.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {art.keywords.slice(0, 3).map((kw) => (
                  <span key={kw} className="text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded-md font-mono">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="text-slate-400 font-medium text-[11px]">
                {art.dateFormatted} • {art.author.split(' ')[0]} {art.author.split(' ')[1]}
              </div>
              <Link
                href={`/blog/${art.slug}`}
                className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
