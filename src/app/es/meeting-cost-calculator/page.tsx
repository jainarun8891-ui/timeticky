import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { MeetingCostCalculatorClient } from '@/app/meeting-cost-calculator/MeetingCostCalculatorClient';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/meeting-cost-calculator'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/meeting-cost-calculator'
);

export default function SpanishMeetingCostCalculatorPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ name: 'Calculadora Coste de Reuniones', url: '/es/meeting-cost-calculator' }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Calculadora de Coste de Reuniones en Tiempo Real TimeNumbers",
          category: "BusinessApplication",
          description: content.description
        }}
      />

      {/* Main Interactive Client */}
      <MeetingCostCalculatorClient />

      {/* Corporate Economics Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* Schema-Verified FAQ Accordion */}
      <FaqAccordion
        items={content.faqs}
        title="Preguntas Frecuentes sobre el Cálculo del Coste de Reuniones"
        subtitle="Fórmulas, costes indirectos y estrategias de optimización de la productividad laboral."
      />

      {/* Related Navigation Hub */}
      <RelatedLinksHub
        currentPath="/es/meeting-cost-calculator"
        title="Explora Más Herramientas de Tiempo y Productividad"
      />
    </main>
  );
}
