"use client";

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { UNIX_TIME_FAQS } from '@/lib/seo/page-faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export default function UnixTimePage() {
  const [t, setT] = useState(Date.now());
  const [c, setC] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setT(Date.now()), 100);
    return () => clearInterval(iv);
  }, []);

  const sec = Math.floor(t / 1000);
  const copy = () => {
    navigator.clipboard.writeText(String(sec));
    setC(true);
    setTimeout(() => setC(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
      <Breadcrumbs items={[{"name":"Unix Timestamp","url":"/unix-time"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Unix Timestamp', url: '/unix-time' },
        ]}
      />
      <JsonLd type="faq" data={UNIX_TIME_FAQS} />
      <JsonLd
        type="application"
        data={{
          name: "Live Unix Timestamp Clock",
          category: "DeveloperApplication",
          description: "Real-time ticking Unix epoch timestamp counter in seconds and milliseconds."
        }}
      />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Current Unix Timestamp</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Epoch Seconds</span>
        <div className="text-6xl sm:text-7xl font-mono font-black text-slate-900 dark:text-white my-4 select-all">{sec}</div>
        <p className="text-xs text-slate-400 font-mono">Milliseconds: {t}</p>
        <button onClick={copy} className="mt-6 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5">
          {c ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}<span>{c ? 'Copied' : 'Copy Timestamp'}</span>
        </button>
      </div>
    
      <FaqAccordion items={UNIX_TIME_FAQS} title="Frequently Asked Questions About Unix Timestamp & Epoch" />
      <RelatedLinksHub />
    </div>
  );
}
