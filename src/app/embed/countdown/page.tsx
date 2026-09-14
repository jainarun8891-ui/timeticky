"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function EmbedCountdownContent() {
  const params = useSearchParams();
  const eventName = params.get('event') || 'New Year 2027';
  const targetDateStr = params.get('target') || '2027-01-01T00:00:00Z';
  const theme = params.get('theme') || 'light';

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const target = new Date(targetDateStr).getTime();
  const diff = Math.max(0, target - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const isDark = theme === 'dark';

  return (
    <div className={`w-full h-full p-4 flex flex-col justify-between font-sans select-none ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <div className="flex justify-between items-center text-xs font-bold">
        <span className="truncate">{eventName}</span>
        <span className="text-[10px] text-rose-500 font-mono">Live Timer</span>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center my-1">
        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
          <span className="font-mono font-black text-xl block">{days}</span>
          <span className="text-[9px] uppercase font-bold text-slate-400">Days</span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
          <span className="font-mono font-black text-xl block">{hours}</span>
          <span className="text-[9px] uppercase font-bold text-slate-400">Hours</span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
          <span className="font-mono font-black text-xl block">{minutes}</span>
          <span className="text-[9px] uppercase font-bold text-slate-400">Mins</span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
          <span className="font-mono font-black text-xl block">{seconds}</span>
          <span className="text-[9px] uppercase font-bold text-slate-400">Secs</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-slate-400">
        <span>Countdown</span>
        <a
          href="https://globaltime.org/countdown"
          target="_blank"
          rel="noopener"
          className="text-rose-500 hover:underline font-bold inline-flex items-center gap-1"
        >
          Powered by GlobalTime
        </a>
      </div>
    </div>
  );
}

export default function EmbedCountdown() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-slate-400">Loading countdown...</div>}>
      <EmbedCountdownContent />
    </Suspense>
  );
}
