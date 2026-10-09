import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { ShieldCheck } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/data-sources'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/data-sources',
  'es'
);

export default function DataSourcesPageEs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <Breadcrumbs items={[{ name: 'Fuentes de Datos', url: '/es/data-sources' }]} locale="es" />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Fuentes de Datos', url: '/es/data-sources' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold border border-blue-200/80">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Procedencia Científica y Autorizada</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          {content.description}
        </p>
      </div>

      {/* Editorial Content Section */}
      <EditorialContentBlock
        content={content}
        badgeLabel={content.badgeLabel || 'Autoridades Científicas y Referencias'}
        locale="es"
      />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={content.faqs} title="Preguntas Frecuentes: Procedencia Horológica" />
      </div>

      <RelatedLinksHub
        currentPath="/es/data-sources"
        title="Explora Plataformas Horológicas Relacionadas"
        subtitle="Conoce más sobre nuestra sincronización atómica y la infraestructura global de cronometría."
      />
    </div>
  );
}
