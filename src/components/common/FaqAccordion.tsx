"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function FaqAccordion({ items, title = "Frequently Asked Questions", subtitle = "Common queries, time calculations, and scientific explanations" }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (idx: number) => {
    if (openIndexes.includes(idx)) {
      setOpenIndexes(openIndexes.filter(i => i !== idx));
    } else {
      setOpenIndexes([...openIndexes, idx]);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 mt-10 space-y-6">
      {/* Schema.org FAQPage JSON-LD embedded for Google rich snippets */}
      <JsonLd type="faq" data={items} />

      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <HelpCircle className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200/80">
          <Sparkles className="w-3 h-3 text-emerald-500" />
          <span>Google SERP Verified</span>
        </div>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {items.map((item, index) => {
          const isOpen = openIndexes.includes(index);
          return (
            <div key={index} className="py-3.5 first:pt-0 last:pb-0">
              <button
                onClick={() => toggle(index)}
                type="button"
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.question}
                </span>
                <span className={`p-1 rounded-full text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="mt-2.5 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal animate-in fade-in duration-150 pr-8">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
