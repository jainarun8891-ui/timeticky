import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { COMMON_TIMEZONE_ABBREVIATIONS } from '@/lib/time/timezone-lookup';
import { TimeZonesDirectoryClient } from '@/app/time-zones/TimeZonesDirectoryClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Globe, ShieldCheck, Cpu, Compass, Clock } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/time-zones'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/time-zones'
);

export default function SpanishTimeZonesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Directorio de Husos Horarios", url: "/es/time-zones" }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Globe className="w-3.5 h-3.5" />
            Observatorio Global de Husos Horarios IANA
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <Link href="/es/utc" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/30 hover:bg-blue-500/50 text-white font-semibold transition-colors border border-blue-400/40">
              <Clock className="w-3.5 h-3.5 text-cyan-300" />
              <span>Estándar de Tiempo Universal Coordinado (UTC) →</span>
            </Link>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>419 Zonas Canónicas</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Precisión NTP Sub-Milisegundo</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>195+ Países Cubiertos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Major Global Time Zone Abbreviations Hub */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Principales Abreviaturas de Husos Horarios Mundiales
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explora zonas civiles y militares primarias con relojes en vivo, reglas de horario de verano y listado de ciudades.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            {Object.keys(COMMON_TIMEZONE_ABBREVIATIONS).length} Zonas Principales
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {Object.entries(COMMON_TIMEZONE_ABBREVIATIONS).map(([slug, def]) => (
            <Link
              key={slug}
              href={`/timezone/${slug}`}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700/80 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {def.abbr}
                </span>
                <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded">
                  {def.offsetStr}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-400 truncate mt-1">
                {def.primaryName}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Directory Client Component */}
      <TimeZonesDirectoryClient initialZones={ALL_IANA_TIMEZONES} locale="es" />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* FAQs Section */}
      <div className="pt-4">
        <FaqAccordion
          title="Preguntas Frecuentes sobre los Husos Horarios Globales"
          subtitle="Aprende cómo funcionan los husos horarios mundiales, desfases de horario de verano y normas IANA."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/es/time-zones"
        title="Explora Más Directorios de Hora y Ubicación"
        subtitle="Descubre husos horarios, centros de países o consulta la hora mundial en vivo."
      />
    </div>
  );
}
