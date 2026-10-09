import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { MeetingPlannerClient } from '@/app/meeting-planner/MeetingPlannerClient';
import { Users } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/meeting-planner'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/meeting-planner'
);

export default function SpanishMeetingPlannerPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: "Planificador de Reuniones", url: "/es/meeting-planner" }]} />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Planificador Global de Reuniones",
          category: "BusinessApplication",
          description: content.description
        }}
      />

      {/* Top Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs text-blue-600 font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Herramientas de Colaboración Global</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          {content.h1}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {content.description}
        </p>
      </div>

      {/* Interactive Planner Grid */}
      <MeetingPlannerClient />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* FAQs */}
      <div className="pt-2">
        <FaqAccordion
          title="Preguntas Frecuentes sobre la Planificación de Reuniones Multizona"
          subtitle="Respuestas claras sobre la coordinación de llamadas y videoconferencias internacionales en diferentes husos horarios."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/es/meeting-planner"
        title="Explora Herramientas Horológicas Relacionadas"
        subtitle="Compara horarios, planifica reuniones internacionales o visualiza el muro de relojes mundiales."
      />
    </div>
  );
}
