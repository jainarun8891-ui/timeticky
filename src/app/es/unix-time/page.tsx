import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { UnixTimeClient } from '@/app/unix-time/UnixTimeClient';
import { Terminal } from 'lucide-react';

const content = HUB_PAGES_ES_CONTENT['/unix-time'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/unix-time',
  'es'
);

export default function SpanishUnixTimePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/es' },
          { name: 'Tiempo Unix', url: '/es/unix-time' },
        ]}
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Tiempo Unix', url: '/es/unix-time' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: content.h1,
          category: "DeveloperApplication",
          description: content.description,
        }}
      />

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          {content.badgeLabel || 'Reloj Cronometría POSIX'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {content.description}
        </p>
      </div>

      <UnixTimeClient locale="es" />

      {/* Educational Guide Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-left">
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {content.headings[0]}
          </h2>
          <p className="whitespace-pre-line text-slate-600 dark:text-slate-300">
            {content.page_text}
          </p>
        </div>

        {content.headings.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {content.headings.slice(1).map((heading, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{heading}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={content.faqs} title="Preguntas Frecuentes sobre el Tiempo Unix" />
      </div>

      <RelatedLinksHub title="Herramientas para Desarrolladores y Horarias" currentPath="/es/unix-time" />
    </div>
  );
}
