import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { AnalogClockClient } from '@/app/analog-clock/AnalogClockClient';
import { Clock, ShieldCheck, Watch, Eye } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';
import { JsonLd } from '@/components/seo/JsonLd';

const content = HUB_PAGES_ES_CONTENT['/analog-clock'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/analog-clock'
);

export default function SpanishAnalogClockPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Reloj Analógico', url: '/es/analog-clock' }]} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Clock className="w-3.5 h-3.5" />
            Horología de Barrido Continuo
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Watch className="w-4 h-4 text-emerald-400" />
              <span>Barrido Fluido a 60 FPS</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Compensación de Deriva Atómica</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Percepción Espacial del Tiempo</span>
            </div>
          </div>
        </div>
      </div>

      <JsonLd type="faq" data={content.faqs} />

      {/* Interactive Analog Clock Client */}
      <AnalogClockClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* FAQs */}
      <FaqAccordion
        title="Preguntas Frecuentes sobre Relojes Analógicos"
        subtitle="Respuestas sobre escapes de barrido continuo, resonancia de cuarzo y geometría de la esfera."
        items={content.faqs}
      />

      {/* Cross Links */}
      <RelatedLinksHub
        currentPath="/es/analog-clock"
        title="Explora Relojes de Precisión y Herramientas Horológicas"
        subtitle="Comprueba la precisión del reloj, abre el modo pantalla completa o consulta la hora de referencia atómica."
      />

      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TimeNumbers Reloj Analógico Online",
            "url": "https://www.timenumbers.com/es/analog-clock",
            "inLanguage": "es",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
