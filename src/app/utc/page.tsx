import React from 'react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata('Coordinated Universal Time (UTC)', 'Authoritative live UTC reference time.', '/utc');

export default function UtcPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Coordinated Universal Time (UTC)</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">Universal Standard</span>
        <div className="text-3xl sm:text-4xl font-mono font-black my-4 text-slate-900 dark:text-white">
          {new Date().toUTCString()}
        </div>
        <p className="text-xs text-slate-500">UTC is the primary time standard that regulates clocks worldwide without daylight saving changes.</p>
      </div>
    </div>
  );
}
