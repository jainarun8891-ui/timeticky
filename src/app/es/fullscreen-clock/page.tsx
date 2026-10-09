import React from 'react';
import { Metadata } from 'next';
import { FullscreenClockClient } from '@/app/fullscreen-clock/FullscreenClockClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';
import { JsonLd } from '@/components/seo/JsonLd';

const content = HUB_PAGES_ES_CONTENT['/fullscreen-clock'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/fullscreen-clock'
);

export default function SpanishFullscreenClockPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Fullscreen Interactive Clock App */}
      <FullscreenClockClient locale="es" />

      {/* Static SEO Guide & Documentation */}
      <div className="bg-slate-900 border-t border-slate-800 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <Breadcrumbs items={[{ name: 'Reloj Pantalla Completa', url: '/es/fullscreen-clock' }]} />
          <JsonLd type="faq" data={content.faqs} />

          {/* Educational Content Section */}
          <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

          {/* Structured FAQs */}
          <FaqAccordion
            title="Preguntas Frecuentes: Reloj a Pantalla Completa"
            subtitle="Guía sobre atajos de teclado, visualización en modo kiosco y cronometraje exacto."
            items={content.faqs}
          />

          <RelatedLinksHub
            currentPath="/es/fullscreen-clock"
            title="Explora Más Relojes de Precisión"
            subtitle="Prueba el reloj analógico continuo, el muro de relojes mundiales o el cronómetro digital."
          />
        </div>
      </div>
    </div>
  );
}
