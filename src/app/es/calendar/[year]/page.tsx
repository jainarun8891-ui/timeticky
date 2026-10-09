import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight, Printer, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  params: Promise<{ year: string }>;
}

const SUPPORTED_YEARS = ['2025', '2026', '2027', '2028', '2029', '2030'];

export async function generateStaticParams() {
  return SUPPORTED_YEARS.map(year => ({ year }));
}

import { buildPageMetadata } from '@/lib/seo/metadata';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';

function getCalendarYearFaqsEs(year: number) {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const startDay = new Date(year, 0, 1).toLocaleDateString('es-ES', { weekday: 'long' });
  const endDay = new Date(year, 11, 31).toLocaleDateString('es-ES', { weekday: 'long' });
  return [
    {
      question: `¿Cuántos días tiene el año ${year}?`,
      answer: `El año ${year} tiene exactamente ${isLeap ? '366 días (año bisiesto)' : '365 días (año común estándar)'}. Febrero contiene ${isLeap ? '29 días' : '28 días'}.`
    },
    {
      question: `¿Es ${year} un año bisiesto?`,
      answer: isLeap
        ? `Sí, ${year} es un año bisiesto oficial. En el calendario gregoriano, los años divisibles por 4 son bisiestos (con excepción de los múltiplos de 100 no divisibles por 400), añadiendo un día extra (29 de febrero) para sincronizar el calendario con la órbita de 365,242 días de la Tierra.`
        : `No, ${year} es un año común de 365 días. Los años bisiestos ocurren cada cuatro años para compensar las horas fraccionarias de la órbita terrestre.`
    },
    {
      question: `¿En qué día de la semana comienza y termina el año ${year}?`,
      answer: `El 1 de enero de ${year} comienza en ${startDay}, y el último día del año, 31 de diciembre de ${year}, concluye en ${endDay}.`
    }
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  const y = parseInt(year, 10);
  if (isNaN(y)) return {};

  return buildPageMetadata(
    `Calendario ${y} — Calendario de 12 Meses Imprimible`,
    `Calendario completo de 12 meses para el año ${y} con números de semana, fases lunares, marcadores astronómicos y vista imprimible. Días festivos y cálculos de años bisiestos.`,
    `/calendar/${y}`,
    'es'
  );
}

const MONTH_NAMES_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const WEEKDAY_NAMES_ES = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function renderMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(year, month);
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, isCurrent: false });
  }
  for (let i = 1; i <= totalDays; i++) {
    cells.push({ day: i, isCurrent: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length % 7, isCurrent: false });
  }

  return cells;
}

export default async function CalendarYearPageEs({ params }: Props) {
  const { year } = await params;
  const y = parseInt(year, 10);

  if (isNaN(y) || y < 1900 || y > 2100) {
    notFound();
  }

  const leap = isLeapYear(y);
  const totalDays = leap ? 366 : 365;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemPage',
    name: `Calendario para el Año ${y}`,
    url: `https://www.timenumbers.com/es/calendar/${y}`,
    description: `Calendario gregoriano completo de 12 meses imprimible para el año ${y}.`
  };

  const faqs = getCalendarYearFaqsEs(y);

  return (
    <div className="w-full min-h-screen pb-16">
      <JsonLd type="faq" data={faqs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-6 space-y-8">
        <Breadcrumbs
          items={[
            { name: 'Calendario', url: '/es/calendar' },
            { name: `Calendario ${y}`, url: `/es/calendar/${y}` }
          ]}
          locale="es"
        />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200/90 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Calendario Astronómico Gregoriano Completo</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Calendario del Año {y}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Vista anual completa con los 12 meses de {y}. {totalDays} días totales ({leap ? 'Año Bisiesto' : 'Año Estándar'}).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/es/calendar/${y - 1}`}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{y - 1}</span>
            </Link>
            <Link
              href={`/es/calendar/${y + 1}`}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <span>{y + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 12 Months Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MONTH_NAMES_ES.map((monthName, mIdx) => {
            const cells = renderMonthGrid(y, mIdx);
            return (
              <div
                key={monthName}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {monthName}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {getDaysInMonth(y, mIdx)} días
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {WEEKDAY_NAMES_ES.map(day => (
                    <div key={day} className="py-1">{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {cells.map((cell, cIdx) => (
                    <div
                      key={cIdx}
                      className={`h-7 rounded-lg flex items-center justify-center text-xs font-medium ${
                        cell.isCurrent
                          ? 'text-slate-900 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                          : 'text-slate-300 dark:text-slate-700 opacity-40'
                      }`}
                    >
                      {cell.day}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Year Fast Navigation */}
        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Explorar otros años</span>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Acceso rápido a calendarios multianuales</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUPPORTED_YEARS.map(yr => (
              <Link
                key={yr}
                href={`/es/calendar/${yr}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  yr === String(y)
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {yr}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 shadow-sm">
          <FaqAccordion items={faqs} title={`Preguntas Frecuentes sobre el Calendario ${y}`} />
        </section>

        <RelatedLinksHub currentPath={`/calendar/${y}`} locale="es" />
      </div>
    </div>
  );
}
