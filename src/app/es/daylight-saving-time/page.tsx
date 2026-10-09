import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/geo/countries';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/daylight-saving-time'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/daylight-saving-time',
  'es'
);

export default function DaylightSavingTimePageEs() {
  const observingCountries = Object.values(COUNTRIES).filter(c => c.hasDst);
  const nonObservingCountries = Object.values(COUNTRIES).filter(c => !c.hasDst);

  const dstGuides = [
    {
      title: 'Horario de Verano en Estados Unidos',
      desc: 'El reloj se adelanta el 2.° domingo de marzo y se atrasa el 1.er domingo de noviembre en husos horarios de EE. UU.',
      href: '/es/daylight-saving-time/united-states',
      badge: 'Calendario Federal'
    },
    {
      title: 'Horario de Verano en la Unión Europea',
      desc: 'Cambios de hora sincronizados en CET/CEST, GMT/BST y EET/EEST en Europa.',
      href: '/es/daylight-saving-time/europe',
      badge: 'Directiva Europea'
    },
    {
      title: 'Horario de Verano 2026',
      desc: 'Calendario global completo de transiciones, fechas exactas y ajustes solares para 2026.',
      href: '/es/daylight-saving-time/2026',
      badge: 'Calendario 2026'
    },
    {
      title: 'Horario de Verano 2027',
      desc: 'Planificación anticipada de fechas mundiales de cambio de hora en primavera y otoño para 2027.',
      href: '/es/daylight-saving-time/2027',
      badge: 'Calendario 2027'
    },
    {
      title: 'Reglas de Arizona y Hora de la Montaña',
      desc: 'Por qué Arizona permanece en Tiempo Estándar de la Montaña todo el año y la excepción Navajo.',
      href: '/es/daylight-saving-time/arizona',
      badge: 'Excepción Estatal'
    },
    {
      title: 'Países que no aplican cambio de hora',
      desc: 'Directorio global de naciones que mantienen la hora estándar todo el año (Asia, África, Sudamérica).',
      href: '/es/daylight-saving-time/non-observing-countries',
      badge: 'Directorio Global'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Horario de Verano (DST)', url: '/es/daylight-saving-time' }]} locale="es" />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Horario de Verano', url: '/es/daylight-saving-time' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Observatorio Global de Cambio de Hora</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white border border-white/10">
              {observingCountries.length} Países con Horario de Verano
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white border border-white/10">
              {nonObservingCountries.length} Países con Hora Estándar Permanente
            </span>
          </div>
        </div>
      </div>

      {/* Featured Guides Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Guías Regionales y Calendarios de Horario de Verano
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Información detallada sobre transiciones horarias, legislaciones y fechas oficiales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dstGuides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                  {guide.badge}
                </span>
                <strong className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors block">
                  {guide.title}
                </strong>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {guide.desc}
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 gap-1 group-hover:translate-x-1 transition-transform">
                <span>Ver calendario completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Deep Scientific Editorial Architecture */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title="Preguntas Frecuentes sobre el Horario de Verano (DST)"
          subtitle="Comprende la historia, debate legislativo e impactos biológicos del cambio de hora."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/daylight-saving-time"
        title="Explorar Herramientas Horarias Relacionadas"
        subtitle="Verifica la hora mundial, calcula la diferencia entre ciudades o revisa las horas de amanecer."
        locale="es"
      />
    </div>
  );
}
