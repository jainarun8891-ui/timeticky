import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { AlarmClockClient } from '@/app/alarm/AlarmClockClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Bell, Clock, Volume2, ShieldCheck } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/alarm'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/alarm'
);

export default function SpanishAlarmPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={[{ name: "Despertador Online", url: "/es/alarm" }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Reloj Despertador y Alarma Online",
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Bell className="w-3.5 h-3.5" />
            Síntesis de Audio de Alta Precisión y Reloj de Mesita
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Campanas Sintéticas Web Audio</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Función Snooze y Multialarma</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Modo Nocturno de Pantalla Completa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alarm Client Component */}
      <AlarmClockClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* FAQs */}
      <div className="pt-4">
        <FaqAccordion
          title="Preguntas Frecuentes sobre el Despertador Online"
          subtitle="Consejos para asegurar que la alarma suene a tiempo, evitar la inercia del sueño y optimizar la pantalla nocturna."
          items={content.faqs}
        />
      </div>

      {/* Related Links */}
      <RelatedLinksHub
        currentPath="/es/alarm"
        title="Explora Herramientas de Productividad y Tiempo"
        subtitle="Descubre nuestro cronómetro, temporizador con cuenta regresiva y verificación de precisión atómica."
      />
    </div>
  );
}
