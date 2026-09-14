"use client";

import React, { useState, useEffect, useRef } from 'react';
import { getTimeDetails, formatTime, formatDate } from '@/lib/time/engine';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { Maximize2, Minimize2, Moon, Sun, Clock, Globe } from 'lucide-react';

export function AnalogClockClient() {
  const [now, setNow] = useState<Date | null>(null);
  const [selectedTz, setSelectedTz] = useState<string>('UTC');
  const [theme, setTheme] = useState<'swiss' | 'dark' | 'minimal'>('swiss');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    try {
      setSelectedTz(Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC');
    } catch {}

    setNow(new Date());
    let animationFrameId: number;

    const update = () => {
      setNow(new Date());
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const cur = now || new Date();
  const timeInfo = getTimeDetails(selectedTz, cur);

  // Compute angles with continuous smooth motion
  const ms = cur.getMilliseconds();
  const seconds = cur.getSeconds() + ms / 1000;
  const minutes = timeInfo.minutes + seconds / 60;
  const hours = (timeInfo.hours % 12) + minutes / 60;

  const secondAngle = seconds * 6; // 360 / 60
  const minuteAngle = minutes * 6; // 360 / 60
  const hourAngle = hours * 30;    // 360 / 12

  const isDarkTheme = theme === 'dark';

  return (
    <div className={`rounded-3xl border transition-all duration-300 p-6 sm:p-12 flex flex-col items-center justify-center space-y-8 ${
      isDarkTheme
        ? 'bg-slate-950 border-slate-800 text-white'
        : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
    }`}>
      {/* Clock Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-xl">
        {/* Timezone Selector */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl text-xs">
          <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <select
            value={selectedTz}
            onChange={(e) => setSelectedTz(e.target.value)}
            className="bg-transparent border-none text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            <option value={Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'}>Local Device Timezone</option>
            <option value="UTC">Coordinated Universal Time (UTC)</option>
            <option value="Europe/London">London (GMT / BST)</option>
            <option value="Europe/Paris">Paris / Berlin (CET / CEST)</option>
            <option value="Asia/Kolkata">Delhi / Mumbai (IST)</option>
            <option value="Asia/Dubai">Dubai (GST)</option>
            <option value="Asia/Singapore">Singapore (SGT)</option>
            <option value="Asia/Tokyo">Tokyo (JST)</option>
            <option value="Australia/Sydney">Sydney (AEST / AEDT)</option>
            <option value="America/New_York">New York (EST / EDT)</option>
            <option value="America/Chicago">Chicago (CST / CDT)</option>
            <option value="America/Los_Angeles">Los Angeles (PST / PDT)</option>
          </select>
        </div>

        {/* Dial Style / Fullscreen */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTheme('swiss')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                theme === 'swiss' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                theme === 'dark' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              Night
            </button>
            <button
              onClick={() => setTheme('minimal')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                theme === 'minimal' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              Minimal
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* SVG Analog Clock Face */}
      <div className="relative w-64 h-64 sm:w-84 sm:h-84 md:w-96 md:h-96 select-none">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full drop-shadow-xl"
        >
          {/* Outer Bezel */}
          <circle
            cx="150"
            cy="150"
            r="144"
            fill={theme === 'dark' ? '#0f172a' : '#ffffff'}
            stroke={theme === 'dark' ? '#334155' : '#cbd5e1'}
            strokeWidth="8"
          />

          {/* Inner Dial Ring */}
          <circle
            cx="150"
            cy="150"
            r="138"
            fill="none"
            stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'}
            strokeWidth="2"
          />

          {/* Hour & Minute Markers */}
          {Array.from({ length: 60 }).map((_, i) => {
            const isHour = i % 5 === 0;
            const angle = (i * 6 * Math.PI) / 180;
            const innerR = isHour ? 116 : 126;
            const outerR = 132;
            const x1 = 150 + innerR * Math.sin(angle);
            const y1 = 150 - innerR * Math.cos(angle);
            const x2 = 150 + outerR * Math.sin(angle);
            const y2 = 150 - outerR * Math.cos(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHour ? (theme === 'dark' ? '#f8fafc' : '#0f172a') : (theme === 'dark' ? '#475569' : '#94a3b8')}
                strokeWidth={isHour ? 3.5 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* Numerals for Classic Theme */}
          {theme === 'swiss' && [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
            const angle = (num * 30 * Math.PI) / 180;
            const r = 98;
            const x = 150 + r * Math.sin(angle);
            const y = 150 - r * Math.cos(angle) + 5;

            return (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                fontSize="15"
                fontFamily="system-ui, sans-serif"
                fontWeight="700"
                fill="#334155"
              >
                {num}
              </text>
            );
          })}

          {/* Date Aperture Window */}
          <g transform="translate(182, 142)">
            <rect
              width="28"
              height="16"
              rx="3"
              fill={theme === 'dark' ? '#1e293b' : '#f8fafc'}
              stroke={theme === 'dark' ? '#475569' : '#cbd5e1'}
              strokeWidth="1"
            />
            <text
              x="14"
              y="12"
              textAnchor="middle"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
              fill={theme === 'dark' ? '#f8fafc' : '#0f172a'}
            >
              {timeInfo.day}
            </text>
          </g>

          {/* Hour Hand */}
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="78"
            stroke={theme === 'dark' ? '#f8fafc' : '#0f172a'}
            strokeWidth="5.5"
            strokeLinecap="round"
            transform={`rotate(${hourAngle} 150 150)`}
          />

          {/* Minute Hand */}
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="48"
            stroke={theme === 'dark' ? '#cbd5e1' : '#334155'}
            strokeWidth="3.5"
            strokeLinecap="round"
            transform={`rotate(${minuteAngle} 150 150)`}
          />

          {/* Seconds Hand with Counterweight (Precision Red) */}
          <line
            x1="150"
            y1="172"
            x2="150"
            y2="34"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${secondAngle} 150 150)`}
          />

          {/* Center Pivot Pin */}
          <circle cx="150" cy="150" r="5" fill="#ef4444" />
          <circle cx="150" cy="150" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Synchronized Digital Readout Below */}
      <div className="text-center space-y-1">
        <div className="text-2xl sm:text-3xl font-mono font-extrabold tracking-tight">
          {formatTime(timeInfo, true, true)}
        </div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {formatDate(timeInfo)} • {timeInfo.abbreviation} ({timeInfo.utcOffsetString})
        </p>
      </div>
    </div>
  );
}
