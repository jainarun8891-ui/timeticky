"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getTimeDetails, formatTime, formatDate } from '@/lib/time/engine';
import { Maximize2, Minimize2, Settings, ArrowLeft, Moon, Sun } from 'lucide-react';

export function FullscreenClockClient() {
  const [now, setNow] = useState<Date | null>(null);
  const [is24Hour, setIs24Hour] = useState(true);
  const [showSeconds, setShowSeconds] = useState(true);
  const [showMillis, setShowMillis] = useState(false);
  const [selectedTz, setSelectedTz] = useState<string>('UTC');
  const [isDark, setIsDark] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isDimmed, setIsDimmed] = useState(false);
  const [pixelShift, setPixelShift] = useState({ x: 0, y: 0 });
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Microscopic pixel shift every 3 minutes for OLED burn-in prevention
  useEffect(() => {
    const shiftInterval = setInterval(() => {
      const angle = (Date.now() / 180000) * 2 * Math.PI;
      setPixelShift({
        x: Math.round(Math.cos(angle) * 3),
        y: Math.round(Math.sin(angle) * 3)
      });
    }, 180000);
    return () => clearInterval(shiftInterval);
  }, []);

  useEffect(() => {
    try {
      setSelectedTz(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    } catch {}

    setNow(new Date());

    let frameId: number;
    if (showMillis) {
      const update = () => {
        setNow(new Date());
        frameId = requestAnimationFrame(update);
      };
      frameId = requestAnimationFrame(update);
    } else {
      const timer = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(timer);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [showMillis]);

  // Handle auto-hiding controls on mouse idle
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      const key = e.key.toLowerCase();
      if (key === 'f') {
        toggleFullscreen();
      } else if (key === 's') {
        setShowSeconds(s => !s);
      } else if (key === 'm') {
        setShowMillis(m => !m);
      } else if (key === 'd') {
        setIsDark(d => !d);
      } else if (key === 't') {
        setIs24Hour(h => !h);
      } else if (e.key === 'ArrowDown') {
        setIsDimmed(dm => !dm);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cur = now || new Date();
  const timeInfo = getTimeDetails(selectedTz, cur);

  // Time string calculation
  const hours = is24Hour ? timeInfo.hours : (timeInfo.hours % 12 || 12);
  const hStr = String(hours).padStart(2, '0');
  const mStr = String(timeInfo.minutes).padStart(2, '0');
  const sStr = String(timeInfo.seconds).padStart(2, '0');
  const msStr = String(cur.getMilliseconds()).padStart(3, '0').slice(0, 2);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 transition-colors duration-300 select-none overflow-hidden ${
      isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'
    } ${!showControls ? 'cursor-none' : ''}`}>
      <h1 className="sr-only">Full Screen Online Digital Clock</h1>

      {/* Top Floating Control Bar */}
      <div className={`flex items-center justify-between transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <Link
          href="/"
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
            isDark ? 'border-slate-800 text-slate-400 hover:text-white bg-slate-900/60' : 'border-slate-200 text-slate-600 hover:text-slate-900 bg-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to TimeNumbers
        </Link>

        {/* Quick Shortcut Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            {is24Hour ? '24H' : '12H'}
          </button>
          <button
            onClick={() => setShowSeconds(!showSeconds)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              showSeconds
                ? 'bg-blue-600 border-blue-600 text-white'
                : (isDark ? 'border-slate-800 bg-slate-900/60 text-slate-400' : 'border-slate-200 bg-white text-slate-600')
            }`}
          >
            Sec (S)
          </button>
          <button
            onClick={() => setShowMillis(!showMillis)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              showMillis
                ? 'bg-blue-600 border-blue-600 text-white'
                : (isDark ? 'border-slate-800 bg-slate-900/60 text-slate-400' : 'border-slate-200 bg-white text-slate-600')
            }`}
          >
            Ms (M)
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-xl border transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
            }`}
            title="Toggle Night Theme (D)"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Clock Hero */}
      <div
        className={`flex-1 flex flex-col items-center justify-center text-center transition-all duration-500 ${
          isDimmed ? 'opacity-30 filter brightness-75' : 'opacity-100'
        }`}
        style={{ transform: `translate(${pixelShift.x}px, ${pixelShift.y}px)` }}
      >
        <div className="font-mono font-black tracking-tight leading-none text-[clamp(4.5rem,18vw,20rem)] select-all drop-shadow-sm flex items-baseline justify-center">
          <span>{hStr}:{mStr}</span>
          {showSeconds && (
            <span className="text-[clamp(2.5rem,10vw,11rem)] text-blue-500 opacity-90 ml-2">
              :{sStr}
            </span>
          )}
          {showMillis && (
            <span className="text-[clamp(1.5rem,5vw,5rem)] text-slate-400 font-bold ml-2">
              .{msStr}
            </span>
          )}
          {!is24Hour && (
            <span className="text-[clamp(1.2rem,4vw,4rem)] text-slate-400 font-extrabold uppercase ml-4">
              {timeInfo.hours >= 12 ? 'PM' : 'AM'}
            </span>
          )}
        </div>

        <div className="mt-8 sm:mt-12 space-y-2">
          <p className="text-[clamp(1.1rem,2.5vw,2.2rem)] font-bold text-slate-400 tracking-normal">
            {formatDate(timeInfo)}
          </p>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-500">
            <span>{timeInfo.abbreviation}</span>
            <span>•</span>
            <span>{timeInfo.utcOffsetString}</span>
            <span>•</span>
            <span>{selectedTz}</span>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Hints */}
      <div className={`flex items-center justify-between text-[11px] text-slate-500 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <span>Shortcuts: <strong>F</strong> Fullscreen • <strong>S</strong> Seconds • <strong>M</strong> Milliseconds • <strong>D</strong> Theme</span>
        <span>Controls auto-hide after 3s idle</span>
      </div>
    </div>
  );
}
