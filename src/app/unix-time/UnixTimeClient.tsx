"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function UnixTimeClient() {
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
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Epoch Seconds</span>
      <div className="text-6xl sm:text-7xl font-mono font-black text-slate-900 dark:text-white my-4 select-all">{sec}</div>
      <p className="text-xs text-slate-400 font-mono">Milliseconds: {t}</p>
      <button onClick={copy} className="mt-6 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer hover:bg-blue-700 transition-colors">
        {c ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}<span>{c ? 'Copied' : 'Copy Timestamp'}</span>
      </button>
    </div>
  );
}
