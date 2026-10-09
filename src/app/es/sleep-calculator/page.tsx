import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { SleepCalculatorClient } from '@/app/sleep-calculator/SleepCalculatorClient';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/sleep-calculator'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/sleep-calculator'
);

export default function SpanishSleepCalculatorPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ name: 'Calculadora de Sueño', url: '/es/sleep-calculator' }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Calculadora de Ciclos de Sueño TimeNumbers",
          category: "HealthApplication",
          description: content.description
        }}
      />

      {/* Main Interactive Client */}
      <SleepCalculatorClient />

      {/* Scientific Chronobiology Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* Schema-Verified FAQ Accordion */}
      <FaqAccordion
        items={content.faqs}
        title="Preguntas Frecuentes sobre los Ciclos de Sueño"
        subtitle="Conocimientos científicos sobre fases REM, inercia del sueño y optimización del ritmo circadiano."
      />

      {/* Related Navigation Hub */}
      <RelatedLinksHub
        currentPath="/es/sleep-calculator"
        title="Explora Más Herramientas de Tiempo y Productividad"
      />
    </main>
  );
}
