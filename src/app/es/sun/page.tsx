import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { SunriseSunsetClient } from '@/components/tools/SunriseSunsetClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Sun, ArrowRight } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/sun'];

export const metadata = buildPageMetadata(
  content.title,
  content.description,
  '/sun',
  'es'
);

const POPULAR_SOLAR_CITIES_ES = [
  { name: 'Nueva Delhi', country: 'India', href: '/es/sun/delhi', desc: 'Crepúsculo tropical, mediodía solar IST y duración estacional de la luz solar' },
  { name: 'Nueva York', country: 'Estados Unidos', href: '/es/sun/new-york', desc: 'Calendario solar este, alineaciones de Manhattanhenge y hora dorada' },
  { name: 'Londres', country: 'Reino Unido', href: '/es/sun/london', desc: 'Mediodía solar en el meridiano de Greenwich, solsticio de verano y ocaso' },
  { name: 'Tokio', country: 'Japón', href: '/es/sun/tokyo', desc: 'Amanecer temprano oriental, cenit solar JST y siluetas del Monte Fuji' },
  { name: 'París', country: 'Francia', href: '/es/sun/paris', desc: 'Largo crepúsculo de verano europeo, duración del día CET y cenit solar' },
  { name: 'Sídney', country: 'Australia', href: '/es/sun/sydney', desc: 'Ciclos solares del hemisferio sur, amanecer en Bondi y solsticio de verano' },
];

export default function SunIndexPageEs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: "Amanecer y Atardecer", url: "/es/sun" }]} locale="es" />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Amanecer y Atardecer', url: '/es/sun' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Calculadora de Horas de Amanecer y Atardecer",
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Sun className="w-3.5 h-3.5" />
            <span>Motor de Efemérides Solares NOAA de Alta Precisión</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {content.h1}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      <SunriseSunsetClient />

      {/* Popular Metropolises Fast Links */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Horarios Solares de las Principales Metrópolis
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Acceso rápido a las predicciones diarias de amanecer, crepúsculo y mediodía solar en grandes ciudades.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {POPULAR_SOLAR_CITIES_ES.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-amber-50/50 dark:hover:bg-slate-700/50 border border-slate-100 dark:border-slate-800 transition-all group flex items-start justify-between gap-3"
            >
              <div>
                <span className="text-xs text-slate-400 block">{c.country}</span>
                <strong className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Horario Solar en {c.name}
                </strong>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{c.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title="Preguntas Frecuentes sobre Horas de Salida y Puesta del Sol"
          subtitle="Aprende cómo funcionan los algoritmos NOAA, la refracción atmosférica y las fases crepusculares."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/sun"
        title="Explorar Herramientas Solares y Cronometría Relacionadas"
        subtitle="Consulta ventanas de hora dorada, fases lunares o convierte zonas horarias del mundo."
        locale="es"
      />
    </div>
  );
}
