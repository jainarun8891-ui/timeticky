"use client";

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import React, { useState, useEffect } from 'react';

export default function CountdownPage() {
  const [target, setTarget] = useState('2027-01-01T00:00');
  const [diff, setDiff] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const ms = new Date(target).getTime() - Date.now();
      if (ms <= 0) setDiff({ d: 0, h: 0, m: 0, s: 0 });
      else {
        setDiff({
          d: Math.floor(ms / 86400000),
          h: Math.floor((ms % 86400000) / 3600000),
          m: Math.floor((ms % 3600000) / 60000),
          s: Math.floor((ms % 60000) / 1000)
        });
      }
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
      <Breadcrumbs items={[{"name":"Event Countdown","url":"/countdown"}]} />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Event Countdown</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto font-mono text-center">
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><span className="text-3xl font-black block">{diff.d}</span><span className="text-[10px] text-slate-400 font-sans">Days</span></div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><span className="text-3xl font-black block">{diff.h}</span><span className="text-[10px] text-slate-400 font-sans">Hours</span></div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><span className="text-3xl font-black block">{diff.m}</span><span className="text-[10px] text-slate-400 font-sans">Mins</span></div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><span className="text-3xl font-black text-blue-600 block">{diff.s}</span><span className="text-[10px] text-slate-400 font-sans">Secs</span></div>
        </div>
      </div>
    
      <RelatedLinksHub />
    </div>
  );
}
