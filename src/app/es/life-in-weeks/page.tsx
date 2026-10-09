import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LifeInWeeksClient } from '@/app/life-in-weeks/LifeInWeeksClient';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/life-in-weeks'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/life-in-weeks'
);

export default function SpanishLifeInWeeksPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ name: 'Tu Vida en Semanas', url: '/es/life-in-weeks' }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Cuadrícula de la Vida en Semanas TimeNumbers (Memento Mori)",
          category: "UtilityApplication",
          description: content.description
        }}
      />

      {/* Main Interactive Client */}
      <LifeInWeeksClient />

      {/* Stoic Philosophy & Longevity Architecture Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* Schema-Verified FAQ Accordion */}
      <FaqAccordion
        items={content.faqs}
        title="Preguntas Frecuentes sobre la Vida en Semanas"
        subtitle="Sabiduría estoica, matemáticas de la longevidad y planificación intencional del tiempo."
      />

      {/* Related Navigation Hub */}
      <RelatedLinksHub
        currentPath="/es/life-in-weeks"
        title="Explora Más Herramientas de Tiempo y Productividad"
      />
    </main>
  );
}
