import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';

export default function CompactCalendarPage() {
  const year = new Date().getFullYear();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <Breadcrumbs items={[{"name":"Calendar","url":"/calendar"},{"name":"Compact Year View","url":"/compact-calendar"}]} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{year} Year Overview</h1>
        <Link href="/calendar" className="text-xs text-blue-600 font-semibold">Monthly Calendar →</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((name, mIdx) => {
          const days = new Date(year, mIdx + 1, 0).getDate();
          return (
            <div key={name} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-2">{name}</h3>
              <div className="grid grid-cols-7 gap-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                {Array.from({ length: days }).map((_, i) => (
                  <div key={i} className="py-0.5">{i + 1}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
