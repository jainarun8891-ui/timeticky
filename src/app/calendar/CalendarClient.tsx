"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Printer, ArrowRight, Sun, Globe, CheckCircle2 } from 'lucide-react';
import { HubPageCustomContent } from '@/lib/seo/hub-pages-custom-content';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

interface Props {
  content: HubPageCustomContent | any;
  locale?: 'en' | 'es';
}

export function CalendarClient({ content, locale = 'en' }: Props) {
  const isEs = locale === 'es';
  const [d, setD] = useState(new Date());
  const y = d.getFullYear();
  const m = d.getMonth();
  const months = isEs
    ? [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ]
    : [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
  const weekDays = isEs
    ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const first = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();

  const days = [];
  for (let i = first - 1; i >= 0; i--) days.push({ num: prevDays - i, cur: false });
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() && m === new Date().getMonth() && y === new Date().getFullYear();
    days.push({ num: i, cur: true, isToday });
  }
  while (days.length % 7 !== 0) days.push({ num: days.length, cur: false });

  const prevMonth = () => setD(new Date(y, m - 1, 1));
  const nextMonth = () => setD(new Date(y, m + 1, 1));
  const baseHref = isEs ? '/es' : '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Semantic Breadcrumbs & Schema.org JSON-LD */}
        <Breadcrumbs items={[{ name: isEs ? 'Calendario' : 'Calendar', url: `${baseHref}/calendar` }]} locale={locale} />
        <JsonLd
          type="breadcrumb"
          data={[
            { name: isEs ? 'Inicio' : 'Home', url: isEs ? '/es' : '/' },
            { name: isEs ? 'Calendario' : 'Calendar', url: `${baseHref}/calendar` },
          ]}
        />
        <JsonLd type="faq" data={content.faqs} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              {isEs ? 'Calendario Astronómico Gregoriano' : 'Gregorian Astronomical Calendar'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {content.h1}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {content.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href={`${baseHref}/calendar/2026`}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              2026
            </Link>
            <Link
              href={`${baseHref}/calendar/2027`}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              2027
            </Link>
            <Link
              href={`${baseHref}/calendar/2028`}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
            >
              2028
            </Link>
            <Link
              href={`${baseHref}/compact-calendar`}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              {isEs ? 'Compacto' : 'Compact'}
            </Link>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
              title={isEs ? 'Imprimir calendario' : 'Print Calendar'}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Calendar Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {months[m]} {y}
            </h2>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title={isEs ? 'Mes anterior' : 'Previous Month'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title={isEs ? 'Mes siguiente' : 'Next Month'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs uppercase tracking-wider text-slate-400">
            {weekDays.map(day => (
              <div key={day} className="py-2">{day}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((item, idx) => (
              <div
                key={idx}
                className={`h-14 sm:h-16 rounded-2xl p-2 flex flex-col justify-between transition-all ${
                  item.isToday
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : item.cur
                    ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                    : 'text-slate-300 dark:text-slate-700 opacity-40'
                }`}
              >
                <span className="text-sm font-semibold">{item.num}</span>
                {item.isToday && (
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">{isEs ? 'Hoy' : 'Today'}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Guide Section */}
        <EditorialContentBlock content={content} badgeLabel={content.badgeLabel || "Multi-Year Planning & Gregorian Chronometry"} />

        {/* FAQ Accordion */}
        <FaqAccordion
          items={content.faqs}
          title={isEs ? 'Preguntas Frecuentes sobre el Calendario Anual' : 'Frequently Asked Questions About Yearly Calendars'}
          subtitle={isEs ? 'Aprende sobre el sistema gregoriano, numeración ISO y festivos.' : 'Learn about the Gregorian calendar system, ISO week numbering, printing modes, and public holidays.'}
        />

        {/* Hub Navigation */}
        <RelatedLinksHub currentPath="/calendar" title={isEs ? 'Explorar más calendarios y herramientas' : 'Explore More Calendars & Tools'} locale={locale} />
      </div>
    </div>
  );
}
