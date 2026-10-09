import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { CountdownGeneratorStudio } from '@/app/countdown/CountdownGeneratorStudio';

const content = HUB_PAGES_ES_CONTENT['/countdown'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/countdown',
  'es'
);

export default function SpanishCountdownPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeNumbers Generador de Cuenta Regresiva y Cronómetros en Vivo',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requiere navegador web moderno con JavaScript habilitado',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: content.description,
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/es' },
          { name: 'Cuenta Atrás', url: '/es/countdown' },
        ]}
      />

      {/* Main Interactive Studio */}
      <CountdownGeneratorStudio locale="es" />

      {/* Featured Holiday Countdowns Grid */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Cuentas Regresivas Populares de Festividades Globales
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Link
            href="/es/countdown/new-year"
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group"
          >
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">1 de enero</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Año Nuevo
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cuenta regresiva en vivo hacia la medianoche en las zonas horarias del mundo.
            </p>
          </Link>
          <Link
            href="/es/countdown/valentines-day"
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group"
          >
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 block">14 de febrero</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-pink-600 transition-colors">
              San Valentín
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cuenta regresiva para celebraciones románticas, flores y momentos especiales.
            </p>
          </Link>
          <Link
            href="/es/countdown/holi"
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group"
          >
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block">Equinoccio de Primavera</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
              Holi Festival de Colores
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cuenta regresiva en vivo para el vibrante festival de colores y primavera.
            </p>
          </Link>
          <Link
            href="/es/countdown/halloween"
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group"
          >
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 block">31 de octubre</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
              Halloween
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cuenta regresiva para la noche de brujas y celebraciones de otoño.
            </p>
          </Link>
          <Link
            href="/es/countdown/diwali"
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group"
          >
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">Kartik Amavasya</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
              Diwali Festival de las Luces
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Sigue los días y horas hasta la auspiciosa celebración de las luces.
            </p>
          </Link>
          <Link
            href="/es/countdown/thanksgiving"
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group"
          >
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">4º Jueves de Noviembre</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-700 transition-colors">
              Día de Acción de Gracias
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Cuenta regresiva para la tradicional cena y reuniones familiares.
            </p>
          </Link>
          <Link
            href="/es/countdown/christmas"
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200/70 dark:border-slate-700 transition-colors group"
          >
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">25 de diciembre</span>
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              Navidad
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Sigue los días y horas hasta la mañana de Navidad y encuentros festivos.
            </p>
          </Link>
        </div>
      </section>

      {/* Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {content.headings[0] || 'Arquitectura de Cronometraje en Tiempo Real de Alta Precisión'}
        </h2>
        <p className="whitespace-pre-line">
          {content.page_text}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {content.headings.slice(1).map((heading, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{heading}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion
        items={content.faqs}
        title="Preguntas Frecuentes sobre la Cuenta Atrás Online"
        subtitle="Respuestas claras sobre funcionamiento, sincronización y personalización del contador."
      />

      {/* Global Hub Navigation */}
      <RelatedLinksHub title="Explora Más Herramientas de Tiempo y Calendarios" currentPath="/es/countdown" />
    </main>
  );
}
