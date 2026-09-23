"use client";

import React, { useState } from 'react';
import { evaluateMeetingSlots, generateICS, Participant } from '@/lib/meeting/planner';
import { Download, Copy, Check } from 'lucide-react';

export function MeetingPlannerClient() {
  const [participants, setParticipants] = useState<Participant[]>([
    { name: "Paris", timezone: "Europe/Paris", workStartHour: 9, workEndHour: 17 },
    { name: "New York", timezone: "America/New_York", workStartHour: 9, workEndHour: 17 },
    { name: "London", timezone: "Europe/London", workStartHour: 9, workEndHour: 17 },
    { name: "Delhi", timezone: "Asia/Kolkata", workStartHour: 9, workEndHour: 17 }
  ]);
  const [copied, setCopied] = useState(false);

  const slots = evaluateMeetingSlots(participants);
  const bestSlot = slots.find(s => s.score === 'Excellent') || slots.find(s => s.score === 'Good') || slots[12];

  const handleDownloadIcs = () => {
    const icsContent = generateICS("Global Sync Meeting", new Date().toISOString(), bestSlot.utcHour, 1);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meeting-invite.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTimes = () => {
    const summary = participants.map(p => `${p.name}: ${bestSlot.localTimes[p.timezone]}`).join(' | ');
    navigator.clipboard.writeText(`Scheduled Meeting Times: ${summary}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          <span>Recommended Time Slot: {bestSlot.utcHour}:00 UTC ({bestSlot.score} convenience)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyTimes}
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy times'}</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .ics</span>
          </button>
        </div>
      </div>

      {/* 24-Hour Timeline Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
          24-Hour Matrix Overview
        </h2>

        <div className="min-w-[700px] space-y-4">
          {participants.map((p) => (
            <div key={p.name} className="flex items-center gap-4">
              <div className="w-28 text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {p.name}
              </div>
              <div className="flex-1 grid grid-cols-24 gap-1">
                {slots.map((slot) => {
                  const hour = parseInt(slot.localTimes[p.timezone].split(':')[0], 10);
                  const isWork = hour >= p.workStartHour && hour < p.workEndHour;
                  const isSleep = hour < 7 || hour >= 22;

                  return (
                    <div
                      key={slot.utcHour}
                      title={`${slot.utcHour}:00 UTC -> ${slot.localTimes[p.timezone]}`}
                      className={`h-8 rounded text-[9px] font-mono flex items-center justify-center font-semibold transition-colors ${
                        isWork
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : isSleep
                          ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {hour}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
