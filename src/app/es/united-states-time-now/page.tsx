import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { UsClocksGridClient } from '@/app/united-states-time-now/UsClocksGridClient';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/united-states-time-now'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/united-states-time-now'
);

export default function SpanishUnitedStatesTimeNowPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: content.description,
    url: 'https://www.timenumbers.com/es/united-states-time-now',
    inLanguage: 'es',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.timenumbers.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Hora en Estados Unidos Ahora', item: 'https://www.timenumbers.com/es/united-states-time-now' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs items={[{ name: 'Hora en Estados Unidos Ahora', url: '/es/united-states-time-now' }]} />

        {/* Hero Section */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <span className="text-base">🇺🇸</span>
            Red Oficial de Cronometría de Estados Unidos
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {content.h1}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Interactive Live Clocks Client */}
        <UsClocksGridClient />

        {/* Educational Guide Section */}
        <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

        {/* State-by-State Reference Table */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 shadow-sm overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Zonas Horarias y Principales Ciudades de Estados Unidos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Zona Horaria</th>
                  <th className="py-3 px-4">Abreviatura</th>
                  <th className="py-3 px-4">Desfase UTC Estándar</th>
                  <th className="py-3 px-4">Desfase Verano (DST)</th>
                  <th className="py-3 px-4">Metrópolis Principales</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hora del Este (Eastern)</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">EST / EDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-05:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-04:00</td>
                  <td className="py-3.5 px-4">Nueva York, Washington D.C., Boston, Miami, Atlanta</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hora Central (Central)</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">CST / CDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-06:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-05:00</td>
                  <td className="py-3.5 px-4">Chicago, Dallas, Houston, Austin, Nashville</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hora de la Montaña (Mountain)</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">MST / MDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-06:00</td>
                  <td className="py-3.5 px-4">Denver, Salt Lake City, Albuquerque, Boise</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hora Estándar Montaña (Arizona)</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">MST</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4 font-mono">Sin cambio DST (UTC-07:00)</td>
                  <td className="py-3.5 px-4">Phoenix, Tucson, Mesa, Chandler, Scottsdale</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hora del Pacífico (Pacific)</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">PST / PDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-08:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-07:00</td>
                  <td className="py-3.5 px-4">Los Ángeles, San Francisco, Seattle, San Diego, Las Vegas</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hora de Alaska</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">AKST / AKDT</td>
                  <td className="py-3.5 px-4 font-mono">UTC-09:00</td>
                  <td className="py-3.5 px-4 font-mono">UTC-08:00</td>
                  <td className="py-3.5 px-4">Anchorage, Fairbanks, Juneau, Sitka</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Hora de Hawái-Aleutianas</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">HST</td>
                  <td className="py-3.5 px-4 font-mono">UTC-10:00</td>
                  <td className="py-3.5 px-4 font-mono">Sin cambio DST (UTC-10:00)</td>
                  <td className="py-3.5 px-4">Honolulu, Pearl City, Hilo, Kahului</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Dynamic FAQ Accordion */}
        <FaqAccordion
          items={content.faqs}
          title="Preguntas Frecuentes sobre la Hora en Estados Unidos"
          subtitle="Respuestas directas sobre la hora actual en EE. UU., husos horarios, cambio de horario de verano y capitales."
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub
          currentPath="/es/united-states-time-now"
          title="Explora Más Relojes de EE. UU., Zonas Horarias y Calculadoras"
          subtitle="Consulta la hora local de ciudades, convierte zonas horarias o visualiza el muro de relojes mundiales."
        />
      </div>
    </div>
  );
}
