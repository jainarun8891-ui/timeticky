import React from 'react';
import { Metadata } from 'next';
import { GoldenHourClient } from '@/app/golden-hour/GoldenHourClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Camera, Sun, Eye, Aperture } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/golden-hour'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/golden-hour',
  'es'
);

export default function GoldenHourPageEs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Hora Dorada', url: '/es/golden-hour' }]} locale="es" />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Hora Dorada', url: '/es/golden-hour' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Camera className="w-3.5 h-3.5" />
            Calculadora de Efemérides de Luz Natural
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Elevación solar (-4° a +6°)</span>
            </div>
            <div className="flex items-center gap-2">
              <Aperture className="w-4 h-4 text-cyan-400" />
              <span>Crepúsculo de Hora Azul (-6° a -4°)</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Óptica de Dispersión de Rayleigh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Client */}
      <GoldenHourClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} />

      {/* FAQs */}
      <FaqAccordion
        items={content.faqs}
        title="Preguntas Frecuentes sobre la Hora Dorada y Hora Azul"
        subtitle="Aprende cómo la geometría solar, la latitud y la óptica atmosférica influyen en la luz natural."
      />

      {/* Cross Links */}
      <RelatedLinksHub
        currentPath="/golden-hour"
        title="Explorar Herramientas de Astronomía y Efemérides Solares"
        subtitle="Calcula horas de amanecer y atardecer, visualiza fases lunares o consulta horas de sol en el mundo."
        locale="es"
      />

      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Calculadora de Hora Dorada de TimeNumbers",
            "url": "https://www.timenumbers.com/es/golden-hour",
            "applicationCategory": "PhotographyApplication",
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
