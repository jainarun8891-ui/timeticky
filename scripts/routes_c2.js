const fs = require('fs');
const path = require('path');

function write(p, c) {
  const fp = path.join('src', p);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, c.trim() + '\n', 'utf8');
  console.log('Wrote:', p);
}

// 7. stopwatch
write('app/stopwatch/page.tsx', `
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function StopwatchPage() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const startRef = useRef(0);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      startRef.current = performance.now() - ms;
      const loop = () => {
        setMs(performance.now() - startRef.current);
        animRef.current = requestAnimationFrame(loop);
      };
      animRef.current = requestAnimationFrame(loop);
    } else if (animRef.current) cancelAnimationFrame(animRef.current);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [running]);

  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Precision Stopwatch</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
        <div className="text-6xl sm:text-7xl font-mono font-black text-slate-900 dark:text-white">
          {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}.<span className="text-blue-600">{String(cs).padStart(2, '0')}</span>
        </div>
        <div className="flex justify-center gap-3 mt-6">
          <button onClick={() => setRunning(!running)} className="px-5 py-2 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5">
            {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}<span>{running ? 'Pause' : 'Start'}</span>
          </button>
          <button onClick={() => running && setLaps([ms, ...laps])} disabled={!running} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 disabled:opacity-40"><Flag className="w-3.5 h-3.5" /></button>
          <button onClick={() => { setRunning(false); setMs(0); setLaps([]); }} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>
        {laps.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-mono max-h-48 overflow-y-auto">
            {laps.map((l, i) => (
              <div key={i} className="py-1 flex justify-between text-slate-500">
                <span>Lap {laps.length - i}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{(l / 1000).toFixed(2)}s</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
`);

// 8. timer
write('app/timer/page.tsx', `
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function TimerPage() {
  const [total, setTotal] = useState(300);
  const [left, setLeft] = useState(300);
  const [running, setRunning] = useState(false);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setLeft(prev => {
          if (prev <= 1) { setRunning(false); clearInterval(ref.current!); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else if (ref.current) clearInterval(ref.current);
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const m = Math.floor(left / 60);
  const s = left % 60;

  const setM = (mins: number) => {
    setRunning(false);
    setTotal(mins * 60);
    setLeft(mins * 60);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Online Timer</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex justify-center gap-2 mb-6">
          {[1, 5, 10, 15, 25].map(v => (
            <button key={v} onClick={() => setM(v)} className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-200">
              {v}m
            </button>
          ))}
        </div>
        <div className="text-7xl sm:text-8xl font-mono font-black text-slate-900 dark:text-white my-4">
          {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
        </div>
        <div className="flex justify-center gap-3 mt-6">
          <button onClick={() => setRunning(!running)} className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5">
            {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}<span>{running ? 'Pause' : 'Start'}</span>
          </button>
          <button onClick={() => { setRunning(false); setLeft(total); }} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>
      </div>
    </div>
  );
}
`);

// 9. countdown
write('app/countdown/page.tsx', `
"use client";
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
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Event Countdown</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto font-mono text-center">
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><span className="text-3xl font-black block">{diff.d}</span><span className="text-[10px] text-slate-400 font-sans">Days</span></div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><span className="text-3xl font-black block">{diff.h}</span><span className="text-[10px] text-slate-400 font-sans">Hours</span></div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><span className="text-3xl font-black block">{diff.m}</span><span className="text-[10px] text-slate-400 font-sans">Mins</span></div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl"><span className="text-3xl font-black text-blue-600 block">{diff.s}</span><span className="text-[10px] text-slate-400 font-sans">Secs</span></div>
        </div>
      </div>
    </div>
  );
}
`);

// 10. unix-time & unix-time-converter
write('app/unix-time/page.tsx', `
"use client";
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
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Current Unix Timestamp</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Epoch Seconds</span>
        <div className="text-6xl sm:text-7xl font-mono font-black text-slate-900 dark:text-white my-4 select-all">{sec}</div>
        <p className="text-xs text-slate-400 font-mono">Milliseconds: {t}</p>
        <button onClick={copy} className="mt-6 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5">
          {c ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}<span>{c ? 'Copied' : 'Copy Timestamp'}</span>
        </button>
      </div>
    </div>
  );
}
`);

write('app/unix-time-converter/page.tsx', `
"use client";
import React, { useState } from 'react';

export default function UnixConverterPage() {
  const [val, setVal] = useState(String(Math.floor(Date.now() / 1000)));
  const num = parseInt(val, 10);
  const valid = !isNaN(num);
  const d = valid ? new Date(num > 10000000000 ? num : num * 1000) : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white text-center">Unix Time Converter</h1>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Enter Timestamp</label>
          <input type="text" value={val} onChange={e => setVal(e.target.value)} className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 font-mono font-bold text-base outline-none" />
        </div>
        {d && !isNaN(d.getTime()) && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs space-y-2">
            <div className="flex justify-between"><span className="text-slate-400">UTC:</span><span className="font-mono font-bold">{d.toUTCString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Local:</span><span className="font-mono font-bold">{d.toLocaleString()}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
`);

// 11. utc
write('app/utc/page.tsx', `
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
`);

console.log('Routes C2 written');
