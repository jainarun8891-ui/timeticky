"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Timer, Clock, Hourglass, Play, Pause, RotateCcw } from 'lucide-react';

export function QuickTimerCard({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<'countdown' | 'stopwatch' | 'timer'>('countdown');
  const [h, setH] = useState('00');
  const [m, setM] = useState('25');
  const [s, setS] = useState('00');
  const [running, setRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync inputs to totalSeconds when in countdown mode and paused
  const handleInputChange = (type: 'h' | 'm' | 's', val: string) => {
    if (running) return;
    const clean = val.replace(/\D/g, '').slice(0, 2);
    const num = parseInt(clean || '0', 10);

    let newH = h;
    let newM = m;
    let newS = s;

    if (type === 'h') {
      newH = String(Math.min(num, 99)).padStart(2, '0');
      setH(newH);
    } else if (type === 'm') {
      newM = String(Math.min(num, 59)).padStart(2, '0');
      setM(newM);
    } else {
      newS = String(Math.min(num, 59)).padStart(2, '0');
      setS(newS);
    }

    setTotalSeconds(parseInt(newH, 10) * 3600 + parseInt(newM, 10) * 60 + parseInt(newS, 10));
  };

  // Switch modes cleanly
  const switchMode = (newMode: 'countdown' | 'stopwatch' | 'timer') => {
    setRunning(false);
    setMode(newMode);
    if (newMode === 'countdown') {
      setH('00');
      setM('25');
      setS('00');
      setTotalSeconds(25 * 60);
    } else if (newMode === 'stopwatch') {
      setStopwatchSeconds(0);
      setH('00');
      setM('00');
      setS('00');
    } else if (newMode === 'timer') {
      setH('00');
      setM('15');
      setS('00');
      setTotalSeconds(15 * 60);
    }
  };

  // Timer Tick Engine
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        if (mode === 'countdown' || mode === 'timer') {
          setTotalSeconds(prev => {
            if (prev <= 1) {
              setRunning(false);
              setH('00');
              setM('00');
              setS('00');
              return 0;
            }
            const next = prev - 1;
            const curH = Math.floor(next / 3600);
            const curM = Math.floor((next % 3600) / 60);
            const curS = next % 60;
            setH(String(curH).padStart(2, '0'));
            setM(String(curM).padStart(2, '0'));
            setS(String(curS).padStart(2, '0'));
            return next;
          });
        } else if (mode === 'stopwatch') {
          setStopwatchSeconds(prev => {
            const next = prev + 1;
            const curH = Math.floor(next / 3600);
            const curM = Math.floor((next % 3600) / 60);
            const curS = next % 60;
            setH(String(curH).padStart(2, '0'));
            setM(String(curM).padStart(2, '0'));
            setS(String(curS).padStart(2, '0'));
            return next;
          });
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, mode]);

  const handleReset = () => {
    setRunning(false);
    if (mode === 'stopwatch') {
      setStopwatchSeconds(0);
      setH('00');
      setM('00');
      setS('00');
    } else {
      setH('00');
      setM('25');
      setS('00');
      setTotalSeconds(25 * 60);
    }
  };

  return (
    <div className={`w-full h-full bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between ${className}`}>
      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Timer className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
              Timer / Countdown
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Stay on track
            </p>
          </div>
        </div>

        {/* 3 Pills switcher */}
        <div className="flex items-center bg-slate-100/90 dark:bg-slate-800/80 p-1 rounded-full w-full gap-1 my-3.5">
          <button
            onClick={() => switchMode('countdown')}
            type="button"
            className={`flex-1 py-1.5 px-2 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all ${
              mode === 'countdown'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <Timer className="w-3 h-3 shrink-0" />
            <span>Countdown</span>
          </button>
          <button
            onClick={() => switchMode('stopwatch')}
            type="button"
            className={`flex-1 py-1.5 px-2 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all ${
              mode === 'stopwatch'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <Clock className="w-3 h-3 shrink-0" />
            <span>Stopwatch</span>
          </button>
          <button
            onClick={() => switchMode('timer')}
            type="button"
            className={`flex-1 py-1.5 px-2 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all ${
              mode === 'timer'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <Hourglass className="w-3 h-3 shrink-0" />
            <span>Timer</span>
          </button>
        </div>
      </div>

      {/* Input Boxes: 00 h 25 m 00 s + Start */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5">
          <input
            type="text"
            value={h}
            onChange={(e) => handleInputChange('h', e.target.value)}
            disabled={running || mode === 'stopwatch'}
            aria-label="Hours"
            className="w-11 h-9 text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono font-bold text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-80"
          />
          <span className="text-xs font-medium text-slate-400 select-none">h</span>

          <input
            type="text"
            value={m}
            onChange={(e) => handleInputChange('m', e.target.value)}
            disabled={running || mode === 'stopwatch'}
            aria-label="Minutes"
            className="w-11 h-9 text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono font-bold text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-80"
          />
          <span className="text-xs font-medium text-slate-400 select-none">m</span>

          <input
            type="text"
            value={s}
            onChange={(e) => handleInputChange('s', e.target.value)}
            disabled={running || mode === 'stopwatch'}
            aria-label="Seconds"
            className="w-11 h-9 text-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 font-mono font-bold text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-80"
          />
          <span className="text-xs font-medium text-slate-400 select-none">s</span>
        </div>

        <div className="flex items-center gap-1.5">
          {(running || (mode === 'stopwatch' && stopwatchSeconds > 0) || (mode !== 'stopwatch' && totalSeconds !== 25 * 60)) && (
            <button
              onClick={handleReset}
              type="button"
              title="Reset"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => setRunning(!running)}
            type="button"
            className={`px-6 h-9 rounded-xl text-white text-xs font-black shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
              running
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {running ? (
              <>
                <Pause className="w-3 h-3 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-white" />
                <span>Start</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
