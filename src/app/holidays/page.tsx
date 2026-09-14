import React from 'react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata('World Public Holidays', 'Public holidays and observances across major countries.', '/holidays');

export default function HolidaysPage() {
  const holidays = [
    { name: "New Year's Day", date: "Jan 1, 2026", type: "Public Holiday", country: "Global" },
    { name: "Republic Day", date: "Jan 26, 2026", type: "National Day", country: "India" },
    { name: "Good Friday", date: "Apr 3, 2026", type: "Religious Holiday", country: "International" },
    { name: "Labor Day", date: "May 1, 2026", type: "Public Holiday", country: "Global" },
    { name: "Independence Day", date: "Jul 4, 2026", type: "Federal Holiday", country: "United States" },
    { name: "Bastille Day", date: "Jul 14, 2026", type: "National Holiday", country: "France" },
    { name: "Christmas Day", date: "Dec 25, 2026", type: "Public Holiday", country: "Global" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Public Holidays & Observances</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 text-xs">
        {holidays.map((h, i) => (
          <div key={i} className="py-3 flex justify-between items-center">
            <div><span className="font-bold text-slate-900 dark:text-white block">{h.name}</span><span className="text-slate-400">{h.country}</span></div>
            <div className="text-right"><span className="font-mono font-bold text-slate-800 dark:text-slate-200 block">{h.date}</span><span className="text-blue-600 font-semibold">{h.type}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
