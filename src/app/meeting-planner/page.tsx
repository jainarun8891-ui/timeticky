"use client";

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { MEETING_PLANNER_FAQS } from '@/lib/seo/page-faqs';
import { JsonLd } from '@/components/seo/JsonLd';
import React, { useState } from 'react';
import { evaluateMeetingSlots, generateICS, generateGoogleCalendarUrl, Participant } from '@/lib/meeting/planner';
import { Users, Download, Calendar, Copy, Check } from 'lucide-react';

export default function MeetingPlannerPage() {
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{"name":"Meeting Planner","url":"/meeting-planner"}]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Home', url: '/' },
          { name: 'Meeting Planner', url: '/meeting-planner' },
        ]}
      />
      <JsonLd type="faq" data={MEETING_PLANNER_FAQS} />
      <JsonLd
        type="application"
        data={{
          name: "Global Meeting Planner",
          category: "BusinessApplication",
          description: "Find overlapping working hours across multiple global timezones and export calendar invites."
        }}
      />
      <div>
        <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Collaboration Tools</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
          Global Meeting Planner
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Find overlapping business working hours across multiple global timezones. Score convenience and export calendar invites.
        </p>
      </div>

      {/* Action Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
          <span>Recommended Time Slot: {bestSlot.utcHour}:00 UTC ({bestSlot.score} convenience)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyTimes}
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy times'}</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-colors"
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
    
      <FaqAccordion items={MEETING_PLANNER_FAQS} title="Frequently Asked Questions About Multi-Zone Meeting Planning" />
      <RelatedLinksHub />
    </div>
  );
}
