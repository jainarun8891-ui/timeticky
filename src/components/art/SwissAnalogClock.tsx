"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface SwissAnalogClockProps {
  time: Date;
  timezone: string;
  className?: string;
  size?: number;
}

export function SwissAnalogClock({ time, timezone, className = "", size = 260 }: SwissAnalogClockProps) {
  // Extract local hour, min, sec in the specified timezone
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    day: 'numeric'
  }).formatToParts(time);

  const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
  const second = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);
  const dayOfMonth = parts.find(p => p.type === 'day')?.value || '1';

  // Smooth angles
  const hourAngle = ((hour % 12) + minute / 60 + second / 3600) * 30;
  const minuteAngle = (minute + second / 60) * 6;
  const secondAngle = second * 6;

  // 24h angle for subdial
  const subdialAngle = ((hour + minute / 60) / 24) * 360;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        className="drop-shadow-xl"
      >
        <defs>
          {/* Dial Gradient */}
          <radialGradient id="dialGradLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </radialGradient>
          <radialGradient id="dialGradDark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#141824" />
            <stop offset="75%" stopColor="#0d111a" />
            <stop offset="100%" stopColor="#07090e" />
          </radialGradient>

          {/* Metallic Bezel Gradient */}
          <linearGradient id="bezelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="25%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Second Hand Glow Filter */}
          <filter id="handGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#ef4444" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Outer Polished Bezel Ring */}
        <circle cx="150" cy="150" r="146" fill="url(#bezelGrad)" />
        <circle cx="150" cy="150" r="141" className="fill-slate-200 dark:fill-zinc-800" />
        <circle cx="150" cy="150" r="139" className="fill-white dark:fill-[#0c101d]" />

        {/* 2. Dial Face Background */}
        <circle
          cx="150"
          cy="150"
          r="137"
          className="fill-[url(#dialGradLight)] dark:fill-[url(#dialGradDark)] transition-colors"
        />

        {/* 3. 60 Minute / Second Tick Ring */}
        {Array.from({ length: 60 }).map((_, i) => {
          const isHour = i % 5 === 0;
          const angle = i * 6;
          const len = isHour ? 12 : 5;
          const strokeW = isHour ? 2.5 : 1;

          return (
            <line
              key={i}
              x1="150"
              y1={13 + (isHour ? 0 : 4)}
              x2="150"
              y2={13 + len}
              transform={`rotate(${angle} 150 150)`}
              className={isHour ? 'stroke-slate-900 dark:stroke-white' : 'stroke-slate-300 dark:stroke-zinc-700'}
              strokeWidth={strokeW}
              strokeLinecap="round"
            />
          );
        })}

        {/* 4. 12 Luminescent Hour Markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const num = i === 0 ? 12 : i;
          const angle = i * 30;
          // Radians for text position
          const rad = ((angle - 90) * Math.PI) / 180;
          const r = 106;
          const x = 150 + r * Math.cos(rad);
          const y = 150 + r * Math.sin(rad) + 5;

          return (
            <text
              key={num}
              x={x}
              y={y}
              textAnchor="middle"
              className="fill-slate-900 dark:fill-white font-mono font-black text-sm tracking-tight select-none"
            >
              {num}
            </text>
          );
        })}

        {/* 5. Date Window at 3 o'clock (x=210, y=140) */}
        <g transform="translate(202, 139)">
          <rect width="28" height="22" rx="4" className="fill-slate-100 dark:fill-zinc-900 stroke-slate-300 dark:stroke-zinc-700" strokeWidth="1" />
          <text x="14" y="15" textAnchor="middle" className="fill-slate-900 dark:fill-white font-mono font-black text-xs">
            {dayOfMonth}
          </text>
        </g>

        {/* 6. Subdial at 6 o'clock: 24h Day/Night Indicator (Center at 150, 205) */}
        <g transform="translate(150, 205)">
          <circle cx="0" cy="0" r="28" className="fill-slate-100 dark:fill-zinc-900/80 stroke-slate-200 dark:stroke-zinc-800" strokeWidth="1" />
          <text x="0" y="-18" textAnchor="middle" className="fill-slate-400 font-mono text-[8px] font-bold">24H</text>
          {/* Subdial Rotating Hand */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-20"
            transform={`rotate(${subdialAngle} 0 0)`}
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="3" fill="#3b82f6" />
        </g>

        {/* 7. Brand Mark on Dial */}
        <text x="150" y="100" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200 font-black text-[11px] tracking-widest uppercase">
          GLOBALTIME
        </text>
        <text x="150" y="112" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-mono text-[8px] font-semibold tracking-wider uppercase">
          ATOMIC CHRONOMETER
        </text>

        {/* 8. Hour Hand */}
        <g transform={`rotate(${hourAngle} 150 150)`} className="transition-transform duration-300">
          <polygon
            points="146,155 146,80 150,65 154,80 154,155"
            className="fill-slate-900 dark:fill-white"
          />
          {/* Luminous Core Inlay */}
          <line x1="150" y1="140" x2="150" y2="85" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* 9. Minute Hand */}
        <g transform={`rotate(${minuteAngle} 150 150)`} className="transition-transform duration-300">
          <polygon
            points="147,158 147,45 150,30 153,45 153,158"
            className="fill-slate-800 dark:fill-slate-200"
          />
          {/* Luminous Core Inlay */}
          <line x1="150" y1="145" x2="150" y2="48" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        </g>

        {/* 10. Precision Second Hand (Crimson Red with Counterbalance) */}
        <g transform={`rotate(${secondAngle} 150 150)`} filter="url(#handGlow)">
          <line x1="150" y1="175" x2="150" y2="24" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="150" cy="165" r="4.5" fill="#ef4444" />
          <circle cx="150" cy="50" r="3" fill="#ef4444" />
        </g>

        {/* 11. Center Jewel & Cap Pin */}
        <circle cx="150" cy="150" r="6" className="fill-slate-900 dark:fill-white" />
        <circle cx="150" cy="150" r="3" fill="#ef4444" />
        <circle cx="150" cy="150" r="1" fill="#ffffff" />
      </svg>
    </div>
  );
}
