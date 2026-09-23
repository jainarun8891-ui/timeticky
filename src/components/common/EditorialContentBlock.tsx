import React from 'react';
import { Compass } from 'lucide-react';

interface Props {
  content: {
    h1?: string;
    headings: string[];
    page_text: string;
    category?: string;
  };
  badgeLabel?: string;
}

export function EditorialContentBlock({ content, badgeLabel = "Chronometric Analysis & Standards" }: Props) {
  if (!content) return null;
  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-sm">
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>{badgeLabel}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {content.headings[0]}
        </h2>
        {content.page_text.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {paragraph}
          </p>
        ))}
      </div>

      {content.headings.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {content.headings.slice(1).map((heading, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {heading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Comprehensive reference data, atomic synchronization standards, and international temporal guidelines.
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
