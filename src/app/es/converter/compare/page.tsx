import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { CITIES, City } from '@/lib/geo/cities';
import { CompareCitiesClient } from '@/components/converter/CompareCitiesClient';
import { ArrowLeftRight } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/converter/compare'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/converter/compare'
);

export default function EsConverterComparePage() {
  const defaultSlugs = ['madrid-spain', 'new-york-united-states', 'mexico-city-mexico'];
  const initialCities = defaultSlugs.map(slug => CITIES.find(c => c.slug === slug)).filter(Boolean) as City[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Conversor', url: '/es/converter' },
          { name: 'Comparador de Ciudades', url: '/es/converter/compare' },
        ]}
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Conversor', url: '/es/converter' },
          { name: 'Comparador de Ciudades', url: '/es/converter/compare' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Matriz Horaria Interactiva</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            {content.h1}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            {content.description}
          </p>
        </div>
      </div>

      <CompareCitiesClient initialCities={initialCities.length >= 2 ? initialCities : CITIES.slice(0, 3)} />

      {/* Educational Guide & Editorial Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} />

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title="Preguntas Frecuentes sobre la Comparación de Ciudades"
          subtitle="Aprende a comparar múltiples zonas horarias mundiales simultáneamente."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/es/converter/compare"
        title="Explorar Herramientas Horológicas Relacionadas"
        subtitle="Compara horas, planifica reuniones o visualiza el muro de relojes mundiales."
      />
    </div>
  );
}
