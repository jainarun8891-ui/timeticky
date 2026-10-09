import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { DateCalculatorClient } from '@/app/date-calculator/DateCalculatorClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Calendar } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/date-calculator'];

export const metadata = buildPageMetadata(
  content.title,
  content.description,
  '/date-calculator',
  'es'
);

export default function DateCalculatorPageEs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Sumar y Restar Fechas", url: "/es/date-calculator" }]} locale="es" />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Calculadora de Fechas', url: '/es/date-calculator' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: content.h1,
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Calendar className="w-3.5 h-3.5" />
            Motor de Suma y Resta de Calendario
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      <DateCalculatorClient locale="es" />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          items={content.faqs}
          title="Preguntas Frecuentes sobre Suma y Resta de Fechas"
        />
      </div>

      <RelatedLinksHub currentPath="/date-calculator" locale="es" />
    </div>
  );
}
