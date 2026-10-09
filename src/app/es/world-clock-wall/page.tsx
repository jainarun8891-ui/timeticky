import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { WorldClockWallClient } from '@/app/world-clock-wall/WorldClockWallClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LayoutGrid, Monitor, ShieldCheck, Clock } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/world-clock-wall'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/world-clock-wall'
);

export default function SpanishWorldClockWallPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Muro de Relojes Mundiales", url: "/es/world-clock-wall" }]} />
      <JsonLd type="faq" data={content.faqs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Monitor className="w-3.5 h-3.5" />
            Centro de Operaciones y Muro de Mercados Financieros
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Segundero Sincronizado</span>
            </div>
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-cyan-400" />
              <span>Cuadrícula Multiciudad Personalizable</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Listo para Modo Kiosco en Pantalla Completa</span>
            </div>
          </div>
        </div>
      </div>

      {/* World Clock Wall Client Studio */}
      <WorldClockWallClient locale="es" />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* FAQs */}
      <div className="pt-4">
        <FaqAccordion
          title="Preguntas Frecuentes sobre el Muro de Relojes Mundiales"
          subtitle="Aprende a configurar paneles multizona, modo kiosco y paneles estilo bolsa de valores."
          items={content.faqs}
        />
      </div>

      {/* Related Links */}
      <RelatedLinksHub
        currentPath="/es/world-clock-wall"
        title="Explora Herramientas Horarias Globales"
        subtitle="Compara desfases horarios, planifica reuniones internacionales o convierte zonas horarias."
      />
    </div>
  );
}
