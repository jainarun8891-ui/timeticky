import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import { TimezoneMapClient } from '@/app/timezone-map/TimezoneMapClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Globe } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/timezone-map'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/timezone-map'
);

export default function SpanishTimezoneMapPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: content.description,
    url: 'https://www.timenumbers.com/es/timezone-map',
    inLanguage: 'es',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.timenumbers.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Husos Horarios', item: 'https://www.timenumbers.com/es/time-zones' },
        { '@type': 'ListItem', position: 3, name: 'Mapa de Husos Horarios', item: 'https://www.timenumbers.com/es/timezone-map' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs items={[{"name":"Husos Horarios","url":"/es/time-zones"},{"name":"Mapa Mundial","url":"/es/timezone-map"}]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header Breadcrumb & Intro */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Globe className="w-3.5 h-3.5" />
                Cartografía Planetaria y Meridianos
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {content.h1}
              </h1>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
              {content.description}
            </p>
          </div>
        </div>

        {/* Interactive Map Client */}
        <TimezoneMapClient />

        {/* Educational Guide Section */}
        <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

        {/* FAQs */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <FaqAccordion items={content.faqs} title="Preguntas Frecuentes: Mapa Mundial de Husos Horarios" />
        </div>

        <RelatedLinksHub
          currentPath="/es/timezone-map"
          title="Explora Más Directorios de Hora y Ubicación"
          subtitle="Descubre husos horarios, centros de países o consulta la hora mundial en vivo."
        />
      </div>
    </div>
  );
}
