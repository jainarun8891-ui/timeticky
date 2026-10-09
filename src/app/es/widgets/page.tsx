import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { WidgetsClient } from '@/app/widgets/WidgetsClient';

const content = HUB_PAGES_ES_CONTENT['/widgets'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/widgets',
  'es'
);

export default function SpanishWidgetsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs
          items={[
            { name: 'Inicio', url: '/es' },
            { name: 'Widgets de Reloj', url: '/es/widgets' },
          ]}
        />
        <JsonLd
          type="breadcrumb"
          data={[
            { name: 'Inicio', url: '/es' },
            { name: 'Widgets de Reloj', url: '/es/widgets' },
          ]}
        />
        <JsonLd type="faq" data={content.faqs} />
        <JsonLd
          type="application"
          data={{
            name: content.h1,
            category: "UtilitiesApplication",
            description: content.description,
          }}
        />

        <WidgetsClient h1Title={content.h1} description={content.description} locale="es" />

        {/* Educational Guide Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {content.headings[0]}
            </h2>
            {content.page_text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>

          {content.headings.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {content.headings.slice(1).map((heading, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Códigos iframe limpios y compatibles con WordPress, Webflow, Notion y HTML estático sin rastreo.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <FaqAccordion items={content.faqs} title="Preguntas Frecuentes sobre los Widgets de Reloj" />
        </div>

        <RelatedLinksHub title="Explorar Relojes y Zonas Horarias" currentPath="/es/widgets" />
      </div>
    </div>
  );
}
