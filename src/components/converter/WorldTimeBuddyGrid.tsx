"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock, Sun, Moon, Briefcase, Sparkles, Copy, Check, Calendar,
  ArrowLeftRight, Plus, Trash2, Search, X, Share2, Download,
  ChevronLeft, ChevronRight, CheckCircle2, Globe
} from 'lucide-react';
import { TimezoneAbbrDefinition, COMMON_TIMEZONE_ABBREVIATIONS, findTimezoneAbbr } from '@/lib/time/timezone-lookup';
import { formatTimeInZone, formatDateInZone, getUtcOffsetString, getOffsetMinutes } from '@/lib/time/timezones';
import { getSyncedDate } from '@/lib/time/sync';
import { generateGoogleCalendarUrl, generateICS } from '@/lib/meeting/planner';
import { POPULAR_CITIES, City } from '@/lib/geo/cities';

export interface GridRow {
  id: string;
  title: string;
  subtitle: string;
  iana: string;
  abbr: string;
  isSource?: boolean;
  isTarget?: boolean;
  canRemove?: boolean;
}

interface WorldTimeBuddyGridProps {
  fromTz: TimezoneAbbrDefinition;
  toTz: TimezoneAbbrDefinition;
  comboSlug: string;
}

export function WorldTimeBuddyGrid({ fromTz, toTz, comboSlug }: WorldTimeBuddyGridProps) {
  const [currentInstant, setCurrentInstant] = useState<Date>(getSyncedDate());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours());
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const [is24Hour, setIs24Hour] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isShareCopied, setIsShareCopied] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [citySearch, setCitySearch] = useState<string>('');

  // Rows currently active on the visual board
  const [rows, setRows] = useState<GridRow[]>([
    {
      id: `src-${fromTz.slug}`,
      title: `${fromTz.abbr} — ${fromTz.primaryName}`,
      subtitle: fromTz.meanings[0]?.regions?.slice(0, 2).join(', ') || fromTz.primaryIana,
      iana: fromTz.primaryIana,
      abbr: fromTz.abbr,
      isSource: true,
      canRemove: false
    },
    {
      id: `tgt-${toTz.slug}`,
      title: `${toTz.abbr} — ${toTz.primaryName}`,
      subtitle: toTz.meanings[0]?.regions?.slice(0, 2).join(', ') || toTz.primaryIana,
      iana: toTz.primaryIana,
      abbr: toTz.abbr,
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
          title: `${fromTz.abbr} — ${fromTz.primaryName}`,
          subtitle: fromTz.meanings[0]?.regions?.slice(0, 2).join(', ') || fromTz.primaryIana,
          iana: fromTz.primaryIana,
          abbr: fromTz.abbr,
          isSource: true,
          canRemove: false
        },
        {
          id: `tgt-${toTz.slug}`,
          title: `${toTz.abbr} — ${toTz.primaryName}`,
          subtitle: toTz.meanings[0]?.regions?.slice(0, 2).join(', ') || toTz.primaryIana,
          iana: toTz.primaryIana,
          abbr: toTz.abbr,
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

  // Calculate now minute indicator in source timezone
  const nowFraction = useMemo(() => {
    const timeStr = formatTimeInZone(currentInstant, sourceRow.iana, true, true);
    const [h, m, s] = timeStr.split(':').map(Number);
    return h + m / 60 + s / 3600;
  }, [currentInstant, sourceRow.iana]);

  // Compute 24 columns based on selectedDate and sourceRow timezone
  const hourColumns = useMemo(() => {
    const cols = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    for (let h = 0; h < 24; h++) {
      // Find the UTC moment corresponding to hour h:00 in the source timezone
      // 1. Create a dummy date in local timezone
      const localRef = new Date(Date.UTC(year, month, day, h, 0, 0));
      // 2. Get the offset of source timezone at this approximate instant
      const srcOffsetMin = getOffsetMinutes(localRef, sourceRow.iana);
      // 3. Exact UTC timestamp for source timezone at h:00
      const utcMs = Date.UTC(year, month, day, h, 0, 0) - srcOffsetMin * 60 * 1000;
      const exactUtcDate = new Date(utcMs);

      // Now evaluate local time for EVERY active row at this exact moment
      const rowTimes = rows.map(r => {
        const timeStr = formatTimeInZone(exactUtcDate, r.iana, is24Hour, false);
        const timeStr24 = formatTimeInZone(exactUtcDate, r.iana, true, false);
        const [hourNum, minNum] = timeStr24.split(':').map(Number);

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
          timeStr,
          hourNum,
          minNum,
          isNight,
          isBusiness,
          isShoulder,
          dayDiff,
          formattedDate: rDateStr
        };
      });

      // Overlap evaluation: is it convenient for ALL rows?
      const allAwake = rowTimes.every(rt => rt.hourNum >= 7 && rt.hourNum < 22);
      const allBusiness = rowTimes.every(rt => rt.hourNum >= 9 && rt.hourNum <= 18);
      const partialOverlap = rowTimes.filter(rt => rt.isBusiness).length >= Math.ceil(rows.length * 0.7);

      cols.push({
        sourceHour: h,
        utcDate: exactUtcDate,
        rowTimes,
        allAwake,
        allBusiness,
        partialOverlap
      });
    }

    return cols;
  }, [selectedDate, sourceRow.iana, rows, is24Hour]);

  // Find the single best overlap window hour
  const bestOverlapHour = useMemo(() => {
    // 1. Look for allBusiness
    const perfectCol = hourColumns.find(c => c.allBusiness);
    if (perfectCol) return perfectCol.sourceHour;
    // 2. Look for allAwake + partialOverlap
    const goodCol = hourColumns.find(c => c.allAwake && c.partialOverlap);
    if (goodCol) return goodCol.sourceHour;
    // 3. Fallback to allAwake
    const awakeCol = hourColumns.find(c => c.allAwake);
    if (awakeCol) return awakeCol.sourceHour;
    return 14; // 2 PM default
  }, [hourColumns]);

  // Overlap window text summary (e.g. 2:00 PM – 5:00 PM GMT)
  const overlapWindowSummary = useMemo(() => {
    const businessCols = hourColumns.filter(c => c.allBusiness || (c.allAwake && c.partialOverlap));
    if (businessCols.length === 0) {
      return "Limited standard working overlap. Consider early morning or evening slots.";
    }
    const startCol = businessCols[0];
    const endCol = businessCols[businessCols.length - 1];
    const targetRow = rows.find(r => r.isTarget) || rows[1];

    const srcStart = startCol.rowTimes.find(rt => rt.rowId === sourceRow.id)?.timeStr;
    const srcEnd = endCol.rowTimes.find(rt => rt.rowId === sourceRow.id)?.timeStr;
    const tgtStart = targetRow ? startCol.rowTimes.find(rt => rt.rowId === targetRow.id)?.timeStr : '';
    const tgtEnd = targetRow ? endCol.rowTimes.find(rt => rt.rowId === targetRow.id)?.timeStr : '';

    return `${srcStart} – ${srcEnd} ${sourceRow.abbr} (${tgtStart} – ${tgtEnd} ${targetRow?.abbr || ''})`;
  }, [hourColumns, sourceRow, rows]);

  // Current selected column data
  const activeCol = hourColumns[selectedHour] || hourColumns[0];

  // Actions
  const handleCopySchedule = () => {
    if (!activeCol) return;
    const dateStr = formatDateInZone(activeCol.utcDate, sourceRow.iana);
    let text = `📅 Meeting Schedule (${dateStr}):\n`;
    activeCol.rowTimes.forEach(rt => {
      const row = rows.find(r => r.id === rt.rowId);
      const diffTag = rt.dayDiff > 0 ? ` (+${rt.dayDiff}d)` : rt.dayDiff < 0 ? ` (${rt.dayDiff}d)` : '';
      text += `• ${rt.timeStr}${diffTag} ${rt.abbr} (${row?.title.split('—')[1]?.trim() || row?.subtitle})\n`;
    });
    text += `\nShared via GlobalTime World Clock: https://globaltime.org/convert/${comboSlug}?h=${selectedHour}`;

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
    link.setAttribute('download', `globaltime-meeting-${dateIso}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddCity = (city: City) => {
    if (rows.some(r => r.iana === city.timezone)) {
      setIsAddModalOpen(false);
      return;
    }
    const newRow: GridRow = {
      id: `city-${city.id}`,
      title: `${city.name}, ${city.country}`,
      subtitle: city.timezone,
      iana: city.timezone,
      abbr: city.timezone.split('/')[1]?.replace(/_/g, ' ') || 'TZ',
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
      title: `${abbrDef.abbr} — ${abbrDef.primaryName}`,
      subtitle: abbrDef.meanings[0]?.regions?.slice(0, 2).join(', ') || abbrDef.primaryIana,
      iana: abbrDef.primaryIana,
      abbr: abbrDef.abbr,
      canRemove: true
    };
    setRows(prev => [...prev, newRow]);
    setIsAddModalOpen(false);
    setCitySearch('');
  };

  const handleRemoveRow = (id: string) => {
    setRows(prev => prev.filter(r => r.id !== id));
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

  // Filter for Add Modal
  const filteredCities = useMemo(() => {
    if (!citySearch.trim()) return POPULAR_CITIES.slice(0, 10);
    const q = citySearch.toLowerCase();
    return POPULAR_CITIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.timezone.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [citySearch]);

  const filteredAbbrs = useMemo(() => {
    if (!citySearch.trim()) return Object.values(COMMON_TIMEZONE_ABBREVIATIONS).slice(0, 8);
    const q = citySearch.toLowerCase();
    return Object.values(COMMON_TIMEZONE_ABBREVIATIONS).filter(a =>
      a.abbr.toLowerCase().includes(q) ||
      a.primaryName.toLowerCase().includes(q) ||
      a.slug.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [citySearch]);

  const isToday = useMemo(() => {
    const now = new Date();
    return selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();
  }, [selectedDate]);

  return (
    <div className="space-y-6 select-none">
      {/* Visual Board Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Top Control Ribbon */}
        <div className="p-4 sm:p-6 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
          {/* Left: Date Picker & Navigation */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 shadow-xs">
              <button
                type="button"
                onClick={() => {
                  const d = new Date(selectedDate);
                  d.setDate(d.getDate() - 1);
                  setSelectedDate(d);
                }}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate(new Date())}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-colors ${
                  isToday
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
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
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 hidden sm:inline">
              {formatDateInZone(selectedDate, sourceRow.iana)}
            </span>
          </div>

          {/* Right: Format Toggle, Swap, Overlap Jump, Add Row */}
          <div className="flex items-center flex-wrap gap-2">
            {/* 12h / 24h Toggle */}
            <div className="inline-flex rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setIs24Hour(false)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${!is24Hour ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                12H
              </button>
              <button
                type="button"
                onClick={() => setIs24Hour(true)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${is24Hour ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                24H
              </button>
            </div>

            {/* Snap to Best Overlap Button */}
            <button
              type="button"
              onClick={() => setSelectedHour(bestOverlapHour)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors shadow-xs"
              title="Snap scrubber to ideal international meeting window"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden md:inline">Snap to</span> Overlap
            </button>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors shadow-xs"
              title="Swap primary and target timezones"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-blue-500" />
              <span className="hidden sm:inline">Swap</span>
            </button>

            {/* Add Zone Button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Zone</span>
            </button>
          </div>
        </div>

        {/* Legend Ribbon */}
        <div className="px-4 sm:px-6 py-2 bg-slate-100/60 dark:bg-slate-950/40 border-b border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-emerald-500/20 border border-emerald-500/50 inline-block" />
              <span>Business (9am – 6pm)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-amber-500/20 border border-amber-500/40 inline-block" />
              <span>Shoulder Hours</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-slate-900 border border-slate-700 inline-block" />
              <span>Night / Sleep</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md border-2 border-amber-400 bg-amber-400/20 inline-block" />
              <span className="font-bold text-amber-600 dark:text-amber-400">✨ Overlap Window</span>
            </span>
          </div>

          <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
            Click any hour tile to select & schedule
          </div>
        </div>

        {/* The Grid Body: Horizontal Scrollable Strip */}
        <div className="relative overflow-x-auto">
          <div className="min-w-[960px] divide-y divide-slate-100 dark:divide-slate-800">
            {/* Header Row: Hour Markers */}
            <div className="flex items-center bg-slate-50/90 dark:bg-slate-900/90 sticky top-0 z-10">
              {/* Pinned Left Header */}
              <div className="w-64 sm:w-72 shrink-0 p-3 pl-4 sm:pl-6 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider border-r border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 sticky left-0 z-20">
                Location & Timezone
              </div>

              {/* 24 Hour Column Labels */}
              <div className="flex-1 grid relative" style={{ gridTemplateColumns: "repeat(24, minmax(42px, 1fr))" }}>
                {hourColumns.map((col) => {
                  const isHovered = hoveredHour === col.sourceHour;
                  const isSelected = selectedHour === col.sourceHour;
                  const srcTimeLabel = col.rowTimes.find(rt => rt.rowId === sourceRow.id)?.timeStr || '';

                  return (
                    <div
                      key={col.sourceHour}
                      onMouseEnter={() => setHoveredHour(col.sourceHour)}
                      onMouseLeave={() => setHoveredHour(null)}
                      onClick={() => setSelectedHour(col.sourceHour)}
                      className={`py-2 text-center text-[10.5px] font-mono font-bold cursor-pointer transition-colors relative border-r border-slate-100 dark:border-slate-800/60 ${
                        isSelected
                          ? 'bg-blue-600 text-white font-black'
                          : isHovered
                          ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span>{srcTimeLabel.replace(':00', '')}</span>
                      {col.allBusiness && (
                        <span className="absolute -top-1 right-0.5 w-2 h-2 rounded-full bg-emerald-500" title="Business Overlap" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timezone Rows */}
            {rows.map((row) => {
              const liveTime = formatTimeInZone(currentInstant, row.iana, is24Hour, true);
              const liveDate = formatDateInZone(currentInstant, row.iana);
              const offset = getUtcOffsetString(currentInstant, row.iana);

              return (
                <div
                  key={row.id}
                  className="flex items-center group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  {/* Left Column: Pinned Zone Info */}
                  <div className="w-64 sm:w-72 shrink-0 p-3 pl-4 sm:pl-6 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 sticky left-0 z-20 flex items-center justify-between">
                    <div className="truncate pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">
                          {row.abbr}
                        </span>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                          {row.title.split('—')[0].trim()}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-medium truncate">
                        <span className="truncate">{row.subtitle}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-500 dark:text-slate-400 shrink-0">{offset}</span>
                      </div>
                      <div className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{liveTime}</span>
                      </div>
                    </div>

                    {row.canRemove && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(row.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
                        title="Remove timezone from board"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* 24 Hour Strip */}
                  <div className="flex-1 grid relative p-1.5 gap-1" style={{ gridTemplateColumns: "repeat(24, minmax(42px, 1fr))" }}>
                    {hourColumns.map((col) => {
                      const rowTime = col.rowTimes.find(rt => rt.rowId === row.id);
                      if (!rowTime) return null;

                      const isSelected = selectedHour === col.sourceHour;
                      const isHovered = hoveredHour === col.sourceHour;
                      const isOverlap = col.allBusiness || (col.allAwake && col.partialOverlap);

                      // Determine Tile Styling
                      let tileClass = '';
                      if (rowTime.isBusiness) {
                        tileClass = 'bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-950 dark:text-emerald-200 border-emerald-400/40 font-bold';
                      } else if (rowTime.isShoulder) {
                        tileClass = 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-900 dark:text-amber-200 border-amber-400/30';
                      } else {
                        // Night
                        tileClass = 'bg-slate-900/90 text-slate-400 border-slate-800/80';
                      }

                      // Selection ring
                      if (isSelected) {
                        tileClass += ' ring-2 ring-blue-500 shadow-md scale-[1.03] z-10';
                      } else if (isHovered) {
                        tileClass += ' ring-1 ring-blue-400/80';
                      }

                      // Golden Overlap highlight
                      if (isOverlap && rowTime.isBusiness) {
                        tileClass += ' border-amber-400/80 ring-1 ring-amber-400/50';
                      }

                      return (
                        <div
                          key={col.sourceHour}
                          onMouseEnter={() => setHoveredHour(col.sourceHour)}
                          onMouseLeave={() => setHoveredHour(null)}
                          onClick={() => setSelectedHour(col.sourceHour)}
                          className={`h-14 rounded-xl border flex flex-col items-center justify-between p-1.5 cursor-pointer text-center relative transition-all duration-150 ${tileClass}`}
                        >
                          {/* Top Tag: Icon or Day Diff */}
                          <div className="w-full flex items-center justify-between text-[9px] font-mono leading-none">
                            {rowTime.dayDiff !== 0 ? (
                              <span className={`px-1 py-0.2 rounded font-black text-[8.5px] ${
                                rowTime.dayDiff > 0 ? 'bg-blue-600 text-white' : 'bg-rose-600 text-white'
                              }`}>
                                {rowTime.dayDiff > 0 ? `+${rowTime.dayDiff}d` : `${rowTime.dayDiff}d`}
                              </span>
                            ) : (
                              <span />
                            )}

                            {rowTime.isBusiness ? (
                              <Briefcase className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            ) : rowTime.isShoulder ? (
                              <Sun className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                            ) : (
                              <Moon className="w-2.5 h-2.5 text-indigo-400 shrink-0" />
                            )}
                          </div>

                          {/* Time Text */}
                          <div className="font-mono text-[11px] leading-tight font-black">
                            {rowTime.timeStr.replace(':00', '')}
                          </div>

                          {/* Bottom Dot for Golden Overlap */}
                          <div className="w-full flex justify-center">
                            {isOverlap && rowTime.isBusiness ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            ) : (
                              <span className="h-1.5" />
                            )}
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

        {/* Selected Hour Action Drawer / Schedule Bar */}
        {activeCol && (
          <div className="p-4 sm:p-6 bg-slate-900 text-white border-t border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Selected Slot Time Readout */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDateInZone(activeCol.utcDate, sourceRow.iana)}</span>
                  <span>•</span>
                  <span>Hour Slot Selected</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm sm:text-base font-mono font-bold">
                  {activeCol.rowTimes.map((rt) => {
                    const row = rows.find(r => r.id === rt.rowId);
                    return (
                      <span key={rt.rowId} className="inline-flex items-center gap-1.5">
                        <span className="text-white font-black">{rt.timeStr}</span>
                        <span className="text-blue-400 font-bold">{rt.abbr}</span>
                        {rt.dayDiff !== 0 && (
                          <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                            rt.dayDiff > 0 ? 'bg-blue-500/40 text-blue-200' : 'bg-rose-500/40 text-rose-200'
                          }`}>
                            {rt.dayDiff > 0 ? `+${rt.dayDiff}d` : `${rt.dayDiff}d`}
                          </span>
                        )}
                        <span className="text-slate-600 last:hidden">•</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* 1-Click Action Buttons */}
              <div className="flex items-center flex-wrap gap-2.5">
                {/* Copy Time for Slack/Email */}
                <button
                  type="button"
                  onClick={handleCopySchedule}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'Copied for Slack!' : 'Copy for Slack / Email'}</span>
                </button>

                {/* Add to Google Calendar */}
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-bold border border-slate-700 transition-colors shadow-sm"
                  title="Open Google Calendar with pre-filled event and times"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Google Calendar</span>
                </button>

                {/* Download .ics (Outlook/Apple Calendar) */}
                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                  title="Download .ics event for Outlook or Apple Calendar"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.ics</span>
                </button>

                {/* Copy Share Link */}
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                  title="Copy shareable link with selected hour"
                >
                  {isShareCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{isShareCopied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* Smart Overlap Window Notification */}
            <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-xl">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Best International Meeting Overlap:</strong> {overlapWindowSummary}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Add City / Timezone Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
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
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
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

            {/* Modal Results */}
            <div className="max-h-72 overflow-y-auto p-4 space-y-4">
              {/* Popular Cities */}
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Global Cities
                </div>
                <div className="space-y-1">
                  {filteredCities.map((city) => (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => handleAddCity(city)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center justify-between transition-colors group"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                          {city.name}
                        </span>
                        <span className="text-slate-400 text-[11px] ml-1.5">
                          {city.country} • {city.timezone}
                        </span>
                      </div>
                      <Plus className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Timezone Abbreviations */}
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1">
                  Timezone Abbreviations
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {filteredAbbrs.map((a) => (
                    <button
                      key={a.slug}
                      type="button"
                      onClick={() => handleAddAbbr(a)}
                      className="text-left p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center justify-between transition-colors group border border-slate-100 dark:border-slate-800"
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
