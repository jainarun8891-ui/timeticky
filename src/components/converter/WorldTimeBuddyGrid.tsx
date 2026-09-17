"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar, Clock, Sun, Moon, Briefcase, Sparkles, Copy, Check,
  ArrowLeftRight, Plus, Trash2, Search, X, Share2, Download,
  ChevronLeft, ChevronRight, Info, Globe, ChevronDown
} from 'lucide-react';
import { TimezoneAbbrDefinition, COMMON_TIMEZONE_ABBREVIATIONS } from '@/lib/time/timezone-lookup';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, getOffsetMinutes } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';
import { generateGoogleCalendarUrl, generateICS } from '@/lib/meeting/planner';
import { POPULAR_CITIES, City } from '@/lib/geo/cities';
import { CountryFlag } from '@/components/common/CountryFlag';

export interface GridRow {
  id: string;
  title: string;
  subtitle: string;
  iana: string;
  abbr: string;
  countryCode: string;
  isSource?: boolean;
  isTarget?: boolean;
  canRemove?: boolean;
}

interface WorldTimeBuddyGridProps {
  fromTz: TimezoneAbbrDefinition;
  toTz: TimezoneAbbrDefinition;
  comboSlug: string;
}

// Map timezone abbreviation or IANA to country code for the flag avatar
function getCountryCodeForTz(abbr: string, iana: string): string {
  const norm = abbr.toLowerCase();
  if (norm === 'gmt' || norm === 'bst') return 'GB';
  if (['est', 'edt', 'cst', 'cdt', 'mst', 'mdt', 'pst', 'pdt'].includes(norm)) return 'US';
  if (norm === 'ist') return 'IN';
  if (['cet', 'cest'].includes(norm)) return 'DE';
  if (['wet', 'west'].includes(norm)) return 'PT';
  if (['eet', 'eest'].includes(norm)) return 'GR';
  if (['awst', 'aest', 'aedt', 'acst', 'acdt'].includes(norm)) return 'AU';
  if (norm === 'kst') return 'KR';
  if (norm === 'jst') return 'JP';
  if (norm === 'utc') return 'GLOBAL';

  if (iana.includes('London')) return 'GB';
  if (iana.includes('New_York') || iana.includes('Chicago') || iana.includes('Denver') || iana.includes('Los_Angeles')) return 'US';
  if (iana.includes('Kolkata') || iana.includes('Calcutta')) return 'IN';
  if (iana.includes('Tokyo')) return 'JP';
  if (iana.includes('Sydney') || iana.includes('Perth') || iana.includes('Adelaide')) return 'AU';
  if (iana.includes('Paris')) return 'FR';
  if (iana.includes('Berlin')) return 'DE';
  if (iana.includes('Seoul')) return 'KR';
  if (iana.includes('Lisbon')) return 'PT';
  if (iana.includes('Athens')) return 'GR';

  return 'GLOBAL';
}

export function WorldTimeBuddyGrid({ fromTz, toTz, comboSlug }: WorldTimeBuddyGridProps) {
  const [currentInstant, setCurrentInstant] = useState<Date>(getSyncedDate());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours());
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShareCopied, setIsShareCopied] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [citySearch, setCitySearch] = useState<string>('');

  // Rows currently active on the visual board
  const [rows, setRows] = useState<GridRow[]>([
    {
      id: `src-${fromTz.slug}`,
      title: fromTz.abbr,
      subtitle: fromTz.meanings[0]?.regions?.slice(0, 2).join(', ') || fromTz.primaryIana.split('/')[1]?.replace(/_/g, ' '),
      iana: fromTz.primaryIana,
      abbr: fromTz.abbr,
      countryCode: getCountryCodeForTz(fromTz.abbr, fromTz.primaryIana),
      isSource: true,
      canRemove: false
    },
    {
      id: `tgt-${toTz.slug}`,
      title: toTz.abbr,
      subtitle: toTz.meanings[0]?.regions?.slice(0, 2).join(', ') || toTz.primaryIana.split('/')[1]?.replace(/_/g, ' '),
      iana: toTz.primaryIana,
      abbr: toTz.abbr,
      countryCode: getCountryCodeForTz(toTz.abbr, toTz.primaryIana),
      isTarget: true,
      canRemove: false
    }
  ]);

  // Sync rows if props change
  useEffect(() => {
    setRows(prev => {
      const extra = prev.filter(r => !r.isSource && !r.isTarget);
      return [
        {
          id: `src-${fromTz.slug}`,
          title: fromTz.abbr,
          subtitle: fromTz.meanings[0]?.regions?.slice(0, 2).join(', ') || fromTz.primaryIana.split('/')[1]?.replace(/_/g, ' '),
          iana: fromTz.primaryIana,
          abbr: fromTz.abbr,
          countryCode: getCountryCodeForTz(fromTz.abbr, fromTz.primaryIana),
          isSource: true,
          canRemove: false
        },
        {
          id: `tgt-${toTz.slug}`,
          title: toTz.abbr,
          subtitle: toTz.meanings[0]?.regions?.slice(0, 2).join(', ') || toTz.primaryIana.split('/')[1]?.replace(/_/g, ' '),
          iana: toTz.primaryIana,
          abbr: toTz.abbr,
          countryCode: getCountryCodeForTz(toTz.abbr, toTz.primaryIana),
          isTarget: true,
          canRemove: false
        },
        ...extra
      ];
    });
  }, [fromTz, toTz]);

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInstant(getSyncedDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sourceRow = rows.find(r => r.isSource) || rows[0];

  // Compute 24 columns based on selectedDate and sourceRow timezone
  const hourColumns = useMemo(() => {
    const cols = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    for (let h = 0; h < 24; h++) {
      const localRef = new Date(Date.UTC(year, month, day, h, 0, 0));
      const srcOffsetMin = getOffsetMinutes(localRef, sourceRow.iana);
      const utcMs = Date.UTC(year, month, day, h, 0, 0) - srcOffsetMin * 60 * 1000;
      const exactUtcDate = new Date(utcMs);

      const rowTimes = rows.map(r => {
        const timeStr24 = formatTimeInZone(exactUtcDate, r.iana, true, false);
        const [hourNum, minNum] = timeStr24.split(':').map(Number);
        const timeStr12 = formatTimeInZone(exactUtcDate, r.iana, false, false);

        // Day status
        const isNight = hourNum < 6 || hourNum >= 22;
        const isBusiness = hourNum >= 9 && hourNum < 18;
        const isShoulder = !isNight && !isBusiness;

        // Day difference relative to source zone
        const srcDateStr = formatDateInZone(exactUtcDate, sourceRow.iana);
        const rDateStr = formatDateInZone(exactUtcDate, r.iana);
        let dayDiff = 0;
        if (srcDateStr !== rDateStr) {
          const srcD = new Date(srcDateStr);
          const rD = new Date(rDateStr);
          dayDiff = Math.round((rD.getTime() - srcD.getTime()) / (86400 * 1000));
        }

        return {
          rowId: r.id,
          abbr: r.abbr,
          timeStr24,
          timeStr12,
          hourNum,
          minNum,
          isNight,
          isBusiness,
          isShoulder,
          dayDiff,
          formattedDate: rDateStr
        };
      });

      // Overlap evaluation
      const allBusiness = rowTimes.every(rt => rt.hourNum >= 9 && rt.hourNum <= 18);
      const allAwake = rowTimes.every(rt => rt.hourNum >= 7 && rt.hourNum < 22);
      const partialOverlap = rowTimes.filter(rt => rt.isBusiness).length >= Math.ceil(rows.length * 0.7);

      cols.push({
        sourceHour: h,
        utcDate: exactUtcDate,
        rowTimes,
        allBusiness,
        allAwake,
        partialOverlap
      });
    }

    return cols;
  }, [selectedDate, sourceRow.iana, rows]);

  // Find the single best overlap window hour
  const bestOverlapHour = useMemo(() => {
    const perfectCol = hourColumns.find(c => c.allBusiness);
    if (perfectCol) return perfectCol.sourceHour;
    const goodCol = hourColumns.find(c => c.allAwake && c.partialOverlap);
    if (goodCol) return goodCol.sourceHour;
    const awakeCol = hourColumns.find(c => c.allAwake);
    if (awakeCol) return awakeCol.sourceHour;
    return 14;
  }, [hourColumns]);

  // Overlap window text summary
  const overlapWindowSummary = useMemo(() => {
    const businessCols = hourColumns.filter(c => c.allBusiness || (c.allAwake && c.partialOverlap));
    if (businessCols.length === 0) {
      return "Limited standard working overlap. Consider early morning or evening slots.";
    }
    const startCol = businessCols[0];
    const endCol = businessCols[businessCols.length - 1];
    const targetRow = rows.find(r => r.isTarget) || rows[1];

    const srcStart = is24Hour
      ? startCol.rowTimes.find(rt => rt.rowId === sourceRow.id)?.timeStr24
      : startCol.rowTimes.find(rt => rt.rowId === sourceRow.id)?.timeStr12;
    const srcEnd = is24Hour
      ? endCol.rowTimes.find(rt => rt.rowId === sourceRow.id)?.timeStr24
      : endCol.rowTimes.find(rt => rt.rowId === sourceRow.id)?.timeStr12;

    const tgtStart = targetRow ? (is24Hour
      ? startCol.rowTimes.find(rt => rt.rowId === targetRow.id)?.timeStr24
      : startCol.rowTimes.find(rt => rt.rowId === targetRow.id)?.timeStr12) : '';
    const tgtEnd = targetRow ? (is24Hour
      ? endCol.rowTimes.find(rt => rt.rowId === targetRow.id)?.timeStr24
      : endCol.rowTimes.find(rt => rt.rowId === targetRow.id)?.timeStr12) : '';

    return `${srcStart} – ${srcEnd} ${sourceRow.abbr} (${tgtStart} – ${tgtEnd} ${targetRow?.abbr || ''})`;
  }, [hourColumns, sourceRow, rows, is24Hour]);

  const activeCol = hourColumns[selectedHour] || hourColumns[0];

  // Actions
  const handleCopySchedule = () => {
    if (!activeCol) return;
    const dateStr = formatDateInZone(activeCol.utcDate, sourceRow.iana);
    let text = `📅 Meeting Schedule (${dateStr}):\n`;
    activeCol.rowTimes.forEach(rt => {
      const row = rows.find(r => r.id === rt.rowId);
      const timeDisplay = is24Hour ? rt.timeStr24 : rt.timeStr12;
      const diffTag = rt.dayDiff > 0 ? ` (+${rt.dayDiff}d)` : rt.dayDiff < 0 ? ` (${rt.dayDiff}d)` : '';
      text += `• ${timeDisplay}${diffTag} ${rt.abbr} (${row?.subtitle})\n`;
    });
    text += `\nShared via TimeNumbers: https://www.timenumbers.com/convert/${comboSlug}?h=${selectedHour}`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleCopyShareLink = () => {
    const url = `${window.location.origin}/convert/${comboSlug}?h=${selectedHour}`;
    navigator.clipboard.writeText(url);
    setIsShareCopied(true);
    setTimeout(() => setIsShareCopied(false), 2500);
  };

  const handleAddToCalendar = () => {
    if (!activeCol) return;
    const title = `Sync: ${sourceRow.abbr} to ${rows[1]?.abbr || 'Global'} Meeting`;
    const dateIso = activeCol.utcDate.toISOString().split('T')[0];
    const utcHour = activeCol.utcDate.getUTCHours();
    const url = generateGoogleCalendarUrl(title, dateIso, utcHour, 1);
    window.open(url, '_blank');
  };

  const handleDownloadIcs = () => {
    if (!activeCol) return;
    const title = `Meeting: ${sourceRow.abbr} & ${rows[1]?.abbr || 'Global'} Sync`;
    const dateIso = activeCol.utcDate.toISOString().split('T')[0];
    const utcHour = activeCol.utcDate.getUTCHours();
    const icsContent = generateICS(title, dateIso, utcHour, 1);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `timenumbers-meeting-${dateIso}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSwap = () => {
    const src = rows.find(r => r.isSource);
    const tgt = rows.find(r => r.isTarget);
    if (!src || !tgt) return;

    setRows(prev => {
      return prev.map(r => {
        if (r.id === src.id) {
          return { ...tgt, id: `src-${tgt.abbr.toLowerCase()}`, isSource: true, isTarget: false, canRemove: false };
        }
        if (r.id === tgt.id) {
          return { ...src, id: `tgt-${src.abbr.toLowerCase()}`, isSource: false, isTarget: true, canRemove: false };
        }
        return r;
      });
    });
  };

  const handleAddCity = (city: City) => {
    if (rows.some(r => r.iana === city.timezone)) {
      setIsAddModalOpen(false);
      return;
    }
    const newRow: GridRow = {
      id: `city-${city.id}`,
      title: city.name,
      subtitle: `${city.country}`,
      iana: city.timezone,
      abbr: city.timezone.split('/')[1]?.replace(/_/g, ' ') || 'TZ',
      countryCode: city.countryCode || 'GLOBAL',
      canRemove: true
    };
    setRows(prev => [...prev, newRow]);
    setIsAddModalOpen(false);
    setCitySearch('');
  };

  const handleAddAbbr = (abbrDef: TimezoneAbbrDefinition) => {
    if (rows.some(r => r.abbr === abbrDef.abbr)) {
      setIsAddModalOpen(false);
      return;
    }
    const newRow: GridRow = {
      id: `abbr-${abbrDef.slug}`,
      title: abbrDef.abbr,
      subtitle: abbrDef.meanings[0]?.regions?.slice(0, 2).join(', ') || abbrDef.primaryIana.split('/')[1]?.replace(/_/g, ' '),
      iana: abbrDef.primaryIana,
      abbr: abbrDef.abbr,
      countryCode: getCountryCodeForTz(abbrDef.abbr, abbrDef.primaryIana),
      canRemove: true
    };
    setRows(prev => [...prev, newRow]);
    setIsAddModalOpen(false);
    setCitySearch('');
  };

  const handleRemoveRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const formattedDateTitle = useMemo(() => {
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [selectedDate]);

  return (
    <div className="space-y-6 select-none">
      {/* MAIN CONTAINER: Matches exact reference card */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden relative">

        {/* 1. HEADER WITH WATERMARK & SCRIPT */}
        <div className="p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4 relative overflow-hidden border-b border-slate-100 dark:border-slate-800/80">
          {/* Subtle world map dots graphic in the background */}
          <div className="absolute right-0 top-0 bottom-0 w-96 pointer-events-none opacity-[0.06] dark:opacity-[0.03] overflow-hidden flex items-center justify-end pr-6">
            <svg viewBox="0 0 400 200" className="w-full h-full text-blue-600 dark:text-white" fill="currentColor">
              <circle cx="50" cy="50" r="2"/><circle cx="70" cy="45" r="2.5"/><circle cx="90" cy="60" r="2"/>
              <circle cx="120" cy="40" r="3"/><circle cx="150" cy="55" r="2.5"/><circle cx="180" cy="45" r="2"/>
              <circle cx="210" cy="50" r="2.5"/><circle cx="240" cy="65" r="3"/><circle cx="270" cy="55" r="2"/>
              <circle cx="300" cy="45" r="2.5"/><circle cx="330" cy="60" r="2"/><circle cx="360" cy="50" r="2.5"/>
              <circle cx="60" cy="80" r="2.5"/><circle cx="100" cy="90" r="2"/><circle cx="140" cy="85" r="2.5"/>
              <circle cx="200" cy="95" r="3"/><circle cx="260" cy="90" r="2"/><circle cx="320" cy="85" r="2.5"/>
            </svg>
          </div>

          {/* Left Title & Icon */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-13 h-13 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 shadow-xs shrink-0">
              <Calendar className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Interactive Multi–Zone Visual Grid
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                Hover or drag across the hours to align schedules, discover business overlaps, and click to schedule.
              </p>
            </div>
          </div>

          {/* Right Script: "Find time together" */}
          <div className="hidden md:flex flex-col items-end pr-4 text-blue-400/90 font-serif italic text-base relative z-10">
            <span>Find time together</span>
            <svg viewBox="0 0 120 20" className="w-24 h-4 text-blue-400/70" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5,5 Q60,18 115,8" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 2. CONTROL BAR */}
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Date navigation */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700 p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  const d = new Date(selectedDate);
                  d.setDate(d.getDate() - 1);
                  setSelectedDate(d);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate(new Date())}
                className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  const d = new Date(selectedDate);
                  d.setDate(d.getDate() + 1);
                  setSelectedDate(d);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Date Display */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{formattedDateTitle}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* 12H / 24H Toggle */}
            <div className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/80 dark:border-slate-700 text-xs font-bold">
              <button
                type="button"
                onClick={() => setIs24Hour(false)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  !is24Hour
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                12H
              </button>
              <button
                type="button"
                onClick={() => setIs24Hour(true)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  is24Hour
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                24H
              </button>
            </div>

            {/* Snap to Overlap */}
            <button
              type="button"
              onClick={() => setSelectedHour(bestOverlapHour)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700 text-xs font-bold hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Snap to Overlap</span>
            </button>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-blue-500" />
              <span>Swap</span>
            </button>

            {/* + Add Zone Button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Zone</span>
            </button>
          </div>
        </div>

        {/* 3. LEGEND BAR */}
        <div className="px-6 py-2.5 border-t border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-3">
          <div className="flex items-center gap-5 flex-wrap">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
              <span className="text-[11.5px] font-medium">Business Hours (9am – 6pm)</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
              <span className="text-[11.5px] font-medium">Shoulder Hours</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B]" />
              <span className="text-[11.5px] font-medium">Night / Sleep</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FB923C]" />
              <span className="text-[11.5px] font-bold text-amber-700 dark:text-amber-400">Overlap Window</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11.5px] text-slate-400">
            <Info className="w-3.5 h-3.5" />
            <span>Click any hour tile to select & schedule</span>
          </div>
        </div>

        {/* 4. THE VISUAL GRID */}
        <div className="relative overflow-x-auto">
          <div className="min-w-[1020px]">
            {/* Header: Location & 24 Hour Numbers */}
            <div className="flex items-center py-2.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 sticky top-0 z-20">
              {/* Pinned Left Location Header */}
              <div className="w-64 sm:w-72 shrink-0 pl-6 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider sticky left-0 z-30 bg-slate-50/95 dark:bg-slate-900/95">
                Location & Timezone
              </div>

              {/* 24 Hour Numbers */}
              <div
                className="flex-1 grid gap-1.5 pr-6"
                style={{ gridTemplateColumns: 'repeat(24, minmax(40px, 1fr))' }}
              >
                {hourColumns.map((col) => {
                  const isSelected = selectedHour === col.sourceHour;
                  const isHovered = hoveredHour === col.sourceHour;
                  const hourLabel = is24Hour
                    ? String(col.sourceHour).padStart(2, '0')
                    : col.sourceHour === 0
                    ? '12a'
                    : col.sourceHour === 12
                    ? '12p'
                    : col.sourceHour > 12
                    ? `${col.sourceHour - 12}p`
                    : `${col.sourceHour}a`;

                  return (
                    <div
                      key={col.sourceHour}
                      onClick={() => setSelectedHour(col.sourceHour)}
                      onMouseEnter={() => setHoveredHour(col.sourceHour)}
                      onMouseLeave={() => setHoveredHour(null)}
                      className={`text-center font-mono text-[11.5px] font-bold py-1 rounded-lg cursor-pointer transition-colors ${
                        isSelected
                          ? 'text-blue-600 dark:text-blue-400 font-black'
                          : isHovered
                          ? 'text-blue-500'
                          : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {hourLabel}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timezone Rows */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {rows.map((row) => {
                const liveTime = formatTimeInZone(currentInstant, row.iana, is24Hour, true);
                const offset = getUtcOffsetString(currentInstant, row.iana);

                return (
                  <div
                    key={row.id}
                    className="flex items-center group hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors py-2"
                  >
                    {/* Pinned Left Location Details */}
                    <div className="w-64 sm:w-72 shrink-0 pl-6 pr-4 sticky left-0 z-30 bg-white/95 dark:bg-slate-900/95 flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Circular Country Flag Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200/90 dark:border-slate-700 flex items-center justify-center shrink-0 bg-slate-100 dark:bg-slate-800 shadow-2xs">
                          {row.countryCode === 'GLOBAL' ? (
                            <Globe className="w-5 h-5 text-blue-600" />
                          ) : (
                            <CountryFlag code={row.countryCode} className="w-8 h-5 object-cover" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                            {row.title}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium truncate leading-tight mt-0.5">
                            {row.subtitle}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10.5px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-full inline-block">
                              • {offset}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>{liveTime}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {row.canRemove && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(row.id)}
                          className="p-1 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                          title="Remove timezone"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* 24 Hour Tiles Strip */}
                    <div
                      className="flex-1 grid gap-1.5 pr-6"
                      style={{ gridTemplateColumns: 'repeat(24, minmax(40px, 1fr))' }}
                    >
                      {hourColumns.map((col) => {
                        const rowTime = col.rowTimes.find(rt => rt.rowId === row.id);
                        if (!rowTime) return null;

                        const isSelected = selectedHour === col.sourceHour;
                        const isHovered = hoveredHour === col.sourceHour;
                        const isOverlapWindow = col.allBusiness || (col.allAwake && col.partialOverlap);

                        // Hour number label
                        const displayHour = is24Hour
                          ? String(rowTime.hourNum).padStart(2, '0')
                          : rowTime.hourNum === 0
                          ? '12'
                          : rowTime.hourNum > 12
                          ? String(rowTime.hourNum - 12)
                          : String(rowTime.hourNum);

                        // Determine tile visual variant based on exact user screenshot:
                        // 1. Overlap: light coral #FFEDD5 with interlocking rings icon
                        // 2. Business: light mint #D1FAE5 with briefcase icon
                        // 3. Shoulder: light amber #FEF3C7 with sun icon
                        // 4. Night: dark navy #1E293B with moon icon
                        let tileBg = '';
                        let tileText = '';
                        let tileIcon = null;

                        if (isOverlapWindow && (rowTime.isBusiness || rowTime.hourNum >= 18)) {
                          tileBg = 'bg-[#FFEDD5] dark:bg-[#7C2D12]/30 border-orange-300/80';
                          tileText = 'text-orange-950 dark:text-orange-200';
                          tileIcon = (
                            <svg className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <circle cx="9" cy="12" r="6" />
                              <circle cx="15" cy="12" r="6" />
                            </svg>
                          );
                        } else if (rowTime.isBusiness) {
                          tileBg = 'bg-[#D1FAE5] dark:bg-[#064E3B]/30 border-emerald-300/80';
                          tileText = 'text-emerald-950 dark:text-emerald-200';
                          tileIcon = <Briefcase className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />;
                        } else if (rowTime.isShoulder) {
                          tileBg = 'bg-[#FEF3C7] dark:bg-[#78350F]/25 border-amber-300/80';
                          tileText = 'text-amber-950 dark:text-amber-200';
                          tileIcon = <Sun className="w-3.5 h-3.5 text-amber-500" />;
                        } else {
                          // Night / Sleep
                          tileBg = 'bg-[#1E293B] border-slate-800';
                          tileText = 'text-white';
                          tileIcon = <Moon className="w-3.5 h-3.5 text-blue-300" />;
                        }

                        // Selected column outline
                        const selectedClasses = isSelected
                          ? 'border-2 border-blue-500 ring-2 ring-blue-500/25 scale-[1.04] shadow-md z-10'
                          : isHovered
                          ? 'ring-1 ring-blue-400/60'
                          : 'border border-transparent';

                        return (
                          <div
                            key={col.sourceHour}
                            onClick={() => setSelectedHour(col.sourceHour)}
                            onMouseEnter={() => setHoveredHour(col.sourceHour)}
                            onMouseLeave={() => setHoveredHour(null)}
                            className={`h-[62px] rounded-2xl flex flex-col items-center justify-between p-1.5 cursor-pointer transition-all duration-150 ${tileBg} ${tileText} ${selectedClasses}`}
                          >
                            {/* Top Icon */}
                            <div className="pt-0.5">
                              {tileIcon}
                            </div>

                            {/* Hour Number */}
                            <div className="font-mono text-xs font-black pb-0.5">
                              {displayHour}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. BOTTOM SCHEDULED ACTION DRAWER (DARK BAR EXACT TO REFERENCE) */}
        {activeCol && (
          <div className="m-4 sm:m-6 bg-[#0F172A] rounded-2xl border border-slate-800 p-5 text-white shadow-xl space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Left readout with calendar icon */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    {formatDateInZone(activeCol.utcDate, sourceRow.iana)} • Selected Hour
                  </div>
                  <div className="flex items-center gap-2.5 font-mono text-lg sm:text-xl font-black mt-0.5">
                    {activeCol.rowTimes.map((rt) => {
                      const timeStr = is24Hour ? rt.timeStr24 : rt.timeStr12;
                      return (
                        <span key={rt.rowId} className="inline-flex items-center gap-1">
                          <span className="text-white">{timeStr}</span>
                          <span className="text-blue-400 font-bold">{rt.abbr}</span>
                          {rt.dayDiff !== 0 && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-rose-500/30 text-rose-300">
                              {rt.dayDiff > 0 ? `+${rt.dayDiff}d` : `${rt.dayDiff}d`}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center flex-wrap gap-2">
                {/* Copy for Slack / Email */}
                <button
                  type="button"
                  onClick={handleCopySchedule}
                  className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
                    isCopied ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied!' : 'Copy for Slack / Email'}</span>
                </button>

                {/* Google Calendar */}
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Google Calendar</span>
                </button>

                {/* .ics file */}
                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  title="Download .ics calendar event"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.ics</span>
                </button>

                {/* Share Link */}
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  title="Copy direct shareable link"
                >
                  {isShareCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{isShareCopied ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Amber Overlap Banner */}
            <div className="bg-[#1C160C] border border-amber-900/60 rounded-xl p-3 flex items-center justify-between text-xs text-amber-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-bold text-amber-400">Best International Meeting Overlap</span>
                <span className="text-amber-700">|</span>
                <span className="text-amber-200/90">{overlapWindowSummary}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
          </div>
        )}
      </div>

      {/* Add City / Timezone Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Add Timezone or City to Board
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search city (e.g. Tokyo, Sydney) or timezone (e.g. IST, CET)..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="max-h-72 overflow-y-auto p-4 space-y-4">
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Global Cities
                </div>
                <div className="space-y-1">
                  {POPULAR_CITIES.filter(c => !citySearch || c.name.toLowerCase().includes(citySearch.toLowerCase()) || c.country.toLowerCase().includes(citySearch.toLowerCase())).slice(0, 8).map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleAddCity(city)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <CountryFlag code={city.countryCode} className="w-5 h-3.5" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                            {city.name}
                          </span>
                          <span className="text-slate-400 text-[11px] ml-1.5">
                            {city.country} • {city.timezone}
                          </span>
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Timezone Abbreviations
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.values(COMMON_TIMEZONE_ABBREVIATIONS).filter(a => !citySearch || a.abbr.toLowerCase().includes(citySearch.toLowerCase()) || a.primaryName.toLowerCase().includes(citySearch.toLowerCase())).slice(0, 8).map((a) => (
                    <button
                      key={a.slug}
                      type="button"
                      onClick={() => handleAddAbbr(a)}
                      className="text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center justify-between transition-colors group border border-slate-100 dark:border-slate-800 cursor-pointer"
                    >
                      <div className="truncate pr-1">
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                          {a.abbr}
                        </span>
                        <div className="text-[10px] text-slate-400 truncate">
                          {a.primaryName}
                        </div>
                      </div>
                      <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
