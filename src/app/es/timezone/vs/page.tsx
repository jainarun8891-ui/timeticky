import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { TIMEZONE_VS_PAIRS } from '@/lib/time/timezone-vs-data';
import { ArrowRight, Clock } from 'lucide-react';
import { TimezoneVsClient } from '@/app/timezone/vs/TimezoneVsClient';

export const metadata: Metadata = buildPageMetadata(
  'Comparador de Zonas Horarias — Relojes Cara a Cara en Vivo',
  'Compara husos horarios cara a cara con relojes sincronizados y deslizador de 24 horas. Respuestas directas para CST vs EST, PST vs MST, GMT vs UTC y más.',
  '/timezone/vs',
  'es'
);

const FAQS_ES = [
  {
    question: '¿Cuál es la diferencia entre CST y EST?',
    answer: 'La hora estándar central (CST) está exactamente 1 hora por detrás de la hora estándar oriental (EST). Cuando son las 12:00 PM en Nueva York (EST), son las 11:00 AM en Chicago (CST).'
  },
  {
    question: '¿Cuál es la diferencia entre PST y MST?',
    answer: 'La hora estándar del Pacífico (PST) está 1 hora por detrás de la hora de la montaña (MST). Cuando son las 12:00 PM en Denver (MST), son las 11:00 AM en Los Ángeles (PST).'
  },
  {
    question: '¿GMT y UTC tienen la misma hora?',
    answer: 'Sí, GMT y UTC comparten exactamente la misma hora. No obstante, UTC es el estándar científico atómico internacional, mientras que GMT es el huso horario civil de invierno en el Reino Unido.'
  },
  {
    question: '¿Cuál es la diferencia entre EST y EDT?',
    answer: 'EST es la hora estándar del este (invierno, UTC-5), mientras que EDT es la hora de verano del este (primavera y verano, UTC-4). Representan la misma región en distintas épocas del año.'
  }
];

export default function TimezoneVsIndexPageEs() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs
        items={[{ name: 'Comparador de Zonas Horarias', url: '/es/timezone/vs' }]}
        locale="es"
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Comparador de Zonas Horarias', url: '/es/timezone/vs' },
        ]}
      />
      <JsonLd type="faq" data={FAQS_ES} />

      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800">
          <Clock className="w-3.5 h-3.5" />
          Directorio Comparativo de Husos Horarios
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Comparador de Zonas Horarias (VS)
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Compara las principales zonas horarias directamente. Descubre desfases de horas, fechas de horario de verano y ciudades incluidas en un lenguaje claro.
        </p>
      </div>

      {/* Featured Interactive Comparison */}
      <TimezoneVsClient currentPair="cst-vs-est" locale="es" />

      {/* Complete Directory Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Todas las Comparaciones de Zonas Populares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(TIMEZONE_VS_PAIRS).map((p) => (
            <Link
              key={p.slug}
              href={`/es/timezone/vs/${p.slug}`}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group space-y-2 block"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {p.zoneA} vs {p.zoneB}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">
                {p.quickAnswerEs}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={FAQS_ES}
        title="Preguntas Frecuentes sobre Diferencias de Husos Horarios"
        subtitle="Respuestas claras en español para entender los horarios internacionales."
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explora Más Herramientas de Zonas Horarias" />
    </div>
  );
}
