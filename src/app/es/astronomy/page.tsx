import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AstronomyStudioClient } from '@/app/astronomy/AstronomyStudioClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Sun, Moon, Compass, Sparkles } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/astronomy'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/astronomy'
);

export default function SpanishAstronomyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Astronomía Solar y Lunar", url: "/es/astronomy" }]} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Laboratorio Astronómico', url: '/es/astronomy' },
        ]}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            Horología Celeste y Mecánica Solar
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
              <span>Algoritmo Solar NOAA</span>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Ciclo Sinódico Lunar de 29,5 Días</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Crepúsculo Civil, Náutico y Astronómico</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Astronomy Studio */}
      <AstronomyStudioClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* FAQs Section */}
      <div className="pt-4">
        <FaqAccordion
          title="Preguntas Frecuentes sobre la Mecánica Solar y Lunar"
          subtitle="Descubre cómo los ciclos solares, ángulos de crepúsculo y fases lunares rigen el tiempo en la Tierra."
          items={content.faqs}
        />
      </div>

      {/* Related Links Hub */}
      <RelatedLinksHub
        currentPath="/es/astronomy"
        title="Explora Herramientas Horológicas Relacionadas"
        subtitle="Combina el tiempo solar con conversores de husos horarios, relojes mundiales y pruebas de precisión atómica."
      />
    </div>
  );
}
