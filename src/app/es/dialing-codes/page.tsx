import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import { DialingCodesClient } from '@/app/dialing-codes/DialingCodesClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Phone, Globe, ShieldCheck, Clock } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/dialing-codes'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/dialing-codes'
);

export default function SpanishDialingCodesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Prefijos Telefónicos Internacionales", url: "/es/dialing-codes" }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Directorio de Prefijos y Códigos Telefónicos Internacionales",
          category: "CommunicationApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Phone className="w-3.5 h-3.5" />
            Guía de Telefonía Internacional UIT-T E.164
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>240+ Jurisdicciones Soberanas</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Relojes en Vivo de Capitales</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Estándar de Marcación E.164</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dialing Client Component */}
      <DialingCodesClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* FAQs */}
      <div className="pt-2">
        <FaqAccordion
          title="Preguntas Frecuentes sobre Números de Teléfono Internacionales"
          subtitle="Todo lo que necesitas saber sobre códigos de país, prefijos de salida y etiqueta telefónica internacional."
          items={content.faqs}
        />
      </div>

      {/* Ubiquitous Related Links */}
      <RelatedLinksHub
        currentPath="/es/dialing-codes"
        title="Explora Herramientas de Husos Horarios y Reuniones"
        subtitle="Coordina horarios internacionales entre zonas horarias con máxima precisión."
      />
    </div>
  );
}
