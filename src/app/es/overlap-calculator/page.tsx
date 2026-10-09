import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { OverlapCalculatorClient } from '@/app/overlap-calculator/OverlapCalculatorClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/overlap-calculator'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/overlap-calculator'
);

export default function SpanishOverlapCalculatorPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: "Calculadora de Solapamiento", url: "/es/overlap-calculator" }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Calculadora de Solapamiento de Horarios",
          category: "BusinessApplication",
          description: content.description
        }}
      />

      <OverlapCalculatorClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title="Preguntas Frecuentes sobre el Solapamiento de Equipos Remotos"
          subtitle="Aprende a equilibrar el trabajo síncrono y asíncrono en zonas horarias distribuidas."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/es/overlap-calculator"
        title="Explora Herramientas Horológicas Relacionadas"
        subtitle="Compara horarios, planifica reuniones internacionales o visualiza el muro de relojes mundiales."
      />
    </div>
  );
}
