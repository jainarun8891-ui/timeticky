"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Calendar, Sparkles, Download, Share2, Check,
  BookOpen, Sun, Heart, Flame, Shield, HelpCircle, Compass
} from 'lucide-react';
import {
  calculateLifeStats,
  LIFE_ERAS,
  MEMENTO_MORI_QUOTES,
  LIFE_PROGRAMMATIC_PRESETS,
  LifeEra,
  LifeStats,
  getEraForWeek,
} from '@/lib/life/life-weeks';

interface Props {
  initialBirthdate?: string;
  initialLifespan?: number;
  customHeading?: string;
  customDescription?: string;
}

export function LifeInWeeksClient({
  initialBirthdate = '1996-05-15',
  initialLifespan = 80,
  customHeading,
  customDescription,
}: Props) {
  const [birthdateStr, setBirthdateStr] = useState(initialBirthdate);
  const [lifespan, setLifespan] = useState(initialLifespan);
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Rotate quotes every 10 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MEMENTO_MORI_QUOTES.length);
    }, 10000);
    return () => clearInterval(t);
  }, []);

  // Compute stats
  const stats: LifeStats = calculateLifeStats(birthdateStr, lifespan);

  // High-Performance HTML5 Canvas Renderer (Zero DOM node bloat for 4,160 items)
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 2 : 2;
    const containerWidth = canvas.parentElement?.clientWidth || 800;

    const cols = 52; // 52 weeks in a year
    const rows = lifespan; // 80 years
    const padding = 16;

    const availableWidth = containerWidth - padding * 2;
    const dotSize = Math.max(4, Math.floor(availableWidth / (cols * 1.5)));
    const gap = Math.max(2, Math.floor(dotSize * 0.5));
    const step = dotSize + gap;

    const totalWidth = cols * step - gap + padding * 2;
    const totalHeight = rows * step - gap + padding * 2;

    canvas.width = totalWidth * dpr;
    canvas.height = totalHeight * dpr;
    canvas.style.width = `${totalWidth}px`;
    canvas.style.height = `${totalHeight}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, totalWidth, totalHeight);

    // Draw background
    const isDark = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#0b0f19' : '#ffffff';
    ctx.fillRect(0, 0, totalWidth, totalHeight);

    const nowWeek = stats.currentWeekIndex;

    for (let r = 0; r < rows; r++) {
      const age = r;
      for (let c = 0; c < cols; c++) {
        const weekIndex = r * 52 + c;
        const x = padding + c * step;
        const y = padding + r * step;

        const era = getEraForWeek(weekIndex);

        if (weekIndex < nowWeek) {
          // Lived week (filled luminous circle)
          ctx.fillStyle = era.color;
          ctx.beginPath();
          ctx.arc(x + dotSize / 2, y + dotSize / 2, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (weekIndex === nowWeek) {
          // Current active week (glowing white / accent ring)
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x + dotSize / 2, y + dotSize / 2, dotSize / 2 + 1, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = era.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          // Future week (translucent outline dot)
          ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
          ctx.beginPath();
          ctx.arc(x + dotSize / 2, y + dotSize / 2, dotSize / 2 - 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Hover highlight
        if (hoveredWeek === weekIndex) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x + dotSize / 2, y + dotSize / 2, dotSize / 2 + 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
  }, [lifespan, stats.currentWeekIndex, hoveredWeek]);

  useEffect(() => {
    drawGrid();
    window.addEventListener('resize', drawGrid);
    return () => window.removeEventListener('resize', drawGrid);
  }, [drawGrid]);

  // Handle canvas mousemove for interactive coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    const padding = 16;
    const containerWidth = canvas.clientWidth;
    const cols = 52;
    const availableWidth = containerWidth - padding * 2;
    const dotSize = Math.max(4, Math.floor(availableWidth / (cols * 1.5)));
    const gap = Math.max(2, Math.floor(dotSize * 0.5));
    const step = dotSize + gap;

    const x = e.clientX - rect.left - padding;
    const y = e.clientY - rect.top - padding;

    if (x >= 0 && y >= 0) {
      const col = Math.floor(x / step);
      const row = Math.floor(y / step);
      if (col >= 0 && col < 52 && row >= 0 && row < lifespan) {
        setHoveredWeek(row * 52 + col);
        return;
      }
    }
    setHoveredWeek(null);
  };

  const handleMouseLeave = () => setHoveredWeek(null);

  // 1-Click High-Res Wallpaper / Graphic Export
  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create high-res export canvas with header & quotes
    const exportCanvas = document.createElement('canvas');
    const exportCtx = exportCanvas.getContext('2d');
    if (!exportCtx) return;

    const width = 1200;
    const height = 1600;
    exportCanvas.width = width;
    exportCanvas.height = height;

    // Dark sleek background
    exportCtx.fillStyle = '#0b0f19';
    exportCtx.fillRect(0, 0, width, height);

    // Title & Header
    exportCtx.fillStyle = '#ffffff';
    exportCtx.font = 'bold 38px sans-serif';
    exportCtx.textAlign = 'center';
    exportCtx.fillText('MEMENTO MORI — YOUR LIFE IN WEEKS', width / 2, 70);

    exportCtx.fillStyle = '#94a3b8';
    exportCtx.font = '18px sans-serif';
    exportCtx.fillText(
      `Born ${stats.birthdate.toLocaleDateString()} • ${stats.weeksLived} Weeks Lived (${stats.percentageLived.toFixed(1)}%) • ${stats.weeksRemaining} Weeks Remaining`,
      width / 2,
      105
    );

    // Seneca Quote
    exportCtx.fillStyle = '#38bdf8';
    exportCtx.font = 'italic 20px serif';
    exportCtx.fillText(
      `"${MEMENTO_MORI_QUOTES[0].quote}" — ${MEMENTO_MORI_QUOTES[0].author}`,
      width / 2,
      145
    );

    // Draw Grid centered
    const gridScale = Math.min((width - 80) / canvas.width, (height - 240) / canvas.height);
    const destW = canvas.width * gridScale;
    const destH = canvas.height * gridScale;
    const destX = (width - destW) / 2;
    const destY = 175;

    exportCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, destX, destY, destW, destH);

    // Footer Branding
    exportCtx.fillStyle = '#64748b';
    exportCtx.font = 'bold 16px sans-serif';
    exportCtx.fillText('TIMENUMBERS.COM • PRECISE CHRONOMETRY & PERSPECTIVE', width / 2, height - 35);

    // Download Link
    const link = document.createElement('a');
    link.download = `life-in-weeks-${birthdateStr}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.origin + '/life-in-weeks');
      url.searchParams.set('birthdate', birthdateStr);
      url.searchParams.set('lifespan', lifespan.toString());

      navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hoveredEra = hoveredWeek !== null ? getEraForWeek(hoveredWeek) : null;
  const hoveredAge = hoveredWeek !== null ? Math.floor(hoveredWeek / 52) : null;
  const hoveredWeekOfYear = hoveredWeek !== null ? (hoveredWeek % 52) + 1 : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-semibold border border-rose-200/60 dark:border-rose-800/60">
          <Flame className="w-3.5 h-3.5" />
          Memento Mori • 4,160 Weeks of Human Longevity
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {customHeading || 'Life in Weeks (Memento Mori) Grid'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {customDescription ||
            'An 80-year human life contains roughly 4,160 weeks. Seeing them all in a single visual grid changes how you perceive your hours, deadlines, and precious remaining seasons.'}
        </p>
      </section>

      {/* Stoic Quote Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md flex items-center justify-between gap-4 border border-slate-800">
        <div className="space-y-1">
          <p className="text-sm sm:text-base font-serif italic text-slate-200">
            &ldquo;{MEMENTO_MORI_QUOTES[quoteIndex].quote}&rdquo;
          </p>
          <span className="text-xs text-blue-400 font-bold block">
            — {MEMENTO_MORI_QUOTES[quoteIndex].author}, {MEMENTO_MORI_QUOTES[quoteIndex].source}
          </span>
        </div>
      </div>

      {/* Main Interactive Controls & Stats */}
      <section
        aria-label="Life in Weeks Console"
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8"
      >
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="birthdate-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-rose-500" />
                Birthdate:
              </label>
              <input
                id="birthdate-input"
                type="date"
                value={birthdateStr}
                onChange={(e) => setBirthdateStr(e.target.value)}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="lifespan-input" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Expectancy:
              </label>
              <select
                id="lifespan-input"
                value={lifespan}
                onChange={(e) => setLifespan(parseInt(e.target.value, 10))}
                className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="70">70 Years (3,640 wks)</option>
                <option value="75">75 Years (3,900 wks)</option>
                <option value="80">80 Years (4,160 wks - Standard)</option>
                <option value="85">85 Years (4,420 wks)</option>
                <option value="90">90 Years (4,680 wks - Centenarian Track)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons: Export & Share */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={exportImage}
              aria-label="Download high-resolution Life in Weeks graphic"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm shadow-rose-500/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Wallpaper (PNG)</span>
            </button>
            <button
              type="button"
              onClick={copyShareLink}
              aria-label="Copy share link"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* 5 Vital Perspective Stats (Pre-allocated for Zero CLS) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
              Weeks Lived
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-rose-600 dark:text-rose-400 mt-1">
              {stats.weeksLived.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">{stats.percentageLived.toFixed(1)}% Completed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
              Weeks Left
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white mt-1">
              {stats.weeksRemaining.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">Of {stats.totalWeeks} total</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
              Summers Left
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-amber-500 mt-1">
              {stats.summersRemaining}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">Warm beach seasons</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
              Weekends Left
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-blue-600 dark:text-blue-400 mt-1">
              {stats.weekendsRemaining.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">Saturdays & Sundays</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center col-span-2 sm:col-span-1">
            <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
              Books Left
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-indigo-600 dark:text-indigo-400 mt-1">
              {stats.booksEstimatedRemaining}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold">At 6 books/year</span>
          </div>
        </div>

        {/* Life Eras Color Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {LIFE_ERAS.map((era) => (
            <div key={era.name} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: era.color }} />
              <span>
                {era.name} ({era.startAge}-{era.endAge})
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Coordinate Floating Badge */}
        <div className="h-6 flex items-center justify-center">
          {hoveredWeek !== null && hoveredEra && (
            <div className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-slate-800 flex items-center gap-2 animate-in fade-in">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredEra.color }} />
              <span>
                Age {hoveredAge}, Week {hoveredWeekOfYear} (Total Week #{hoveredWeek + 1}) — {hoveredEra.name}
              </span>
            </div>
          )}
        </div>

        {/* High-Performance Canvas Container (Zero CLS with pre-allocated min-height) */}
        <div
          ref={containerRef}
          className="w-full flex justify-center overflow-x-auto py-2 rounded-2xl bg-slate-50/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80"
        >
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label={`Life in Weeks 4,160 square grid showing ${stats.weeksLived} weeks lived and ${stats.weeksRemaining} weeks remaining.`}
            className="cursor-crosshair max-w-full rounded-xl"
          />
        </div>
      </section>

      {/* Programmatic Milestone Presets Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-rose-500" />
          <span>Life in Weeks Milestone Hubs</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Compare life perspective grids at key psychological age milestones:
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {LIFE_PROGRAMMATIC_PRESETS.map((preset) => (
            <Link
              key={preset.slug}
              href={`/life-in-weeks/${preset.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <span>{preset.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
