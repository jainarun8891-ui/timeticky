import React from 'react';
import { Metadata } from 'next';
import { PomodoroClient } from '@/app/pomodoro/PomodoroClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { Bell, Brain, Target, Flame } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/pomodoro'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/pomodoro'
);

export default function SpanishPomodoroPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Temporizador Pomodoro', url: '/es/pomodoro' }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Temporizador Pomodoro Online",
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30">
            <Flame className="w-3.5 h-3.5" />
            Trabajo Profundo Respaldado por la Neurociencia
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-rose-400" />
              <span>Ritmo Optimizado para la Dopamina</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Sprint de 25m / Descanso de 5m</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Alertas Acústicas Web Audio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Pomodoro Timer App */}
      <PomodoroClient locale="es" />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* FAQs */}
      <FaqAccordion
        title="Preguntas Frecuentes sobre la Técnica Pomodoro"
        subtitle="Aprende a optimizar los intervalos, gestionar interrupciones y mantener la máxima concentración."
        items={content.faqs}
      />

      {/* Cross Links */}
      <RelatedLinksHub
        currentPath="/es/pomodoro"
        title="Explora Herramientas de Productividad y Tiempo"
        subtitle="Accede a temporizadores de intervalos personalizados, cronómetro online o calculadoras de fechas."
      />
    </div>
  );
}
