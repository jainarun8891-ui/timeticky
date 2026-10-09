import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Code2, Terminal, ShieldCheck, Zap, ArrowRight, BookOpen, Key } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';

const content = HUB_PAGES_ES_CONTENT['/developers'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/developers',
  'es'
);

export default function SpanishDevelopersPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.h1,
    description: content.description,
    url: 'https://www.timenumbers.com/es/developers',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.timenumbers.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Desarrolladores', item: 'https://www.timenumbers.com/es/developers' },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/es' },
          { name: 'Desarrolladores', url: '/es/developers' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={content.faqs} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header Breadcrumbs & Intro */}
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/es" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-medium">Desarrolladores</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Code2 className="w-3.5 h-3.5" />
                {content.badgeLabel || 'Infraestructura Cronimétrica Global'}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {content.h1}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mt-2">
                {content.description}
              </p>
            </div>

            <Link
              href="/es/api-docs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm self-start md:self-auto"
            >
              <BookOpen className="w-4 h-4" />
              Referencia Interactiva de API <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Respuesta en Sub-Milisegundos</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculado en memoria con algoritmos astronómicos y datos canónicos tzdata de IANA. Sin latencia de base de datos.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit">
              <Key className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Nivel Gratuito Anónimo</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sin claves de API ni tarjetas requeridas para integración básica. Hasta 100 peticiones por minuto con CORS habilitado.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 space-y-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Fuentes Oficiales</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Sincronizado permanentemente con la base de datos IANA, algoritmos solares de NOAA y especificaciones ISO-8601.
            </p>
          </div>
        </div>

        {/* Quickstart Code Examples */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-600" />
                Integración Rápida
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Consulta la hora actual o convierte zonas horarias mediante peticiones HTTP estándar:
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              Base: /api/v1
            </span>
          </div>

          {/* cURL Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">1. Obtener Hora Atómica UTC Actual</span>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <code>curl -X GET &quot;https://www.timenumbers.com/api/v1/time&quot;</code>
            </div>
          </div>

          {/* Timezone Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">2. Inspeccionar Zona Horaria IANA Específica</span>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <code>curl -X GET &quot;https://www.timenumbers.com/api/v1/timezone/Europe/Madrid&quot;</code>
            </div>
          </div>

          {/* Solar Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">3. Calcular Efemérides Solares para una Ciudad</span>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <code>curl -X GET &quot;https://www.timenumbers.com/api/v1/sun/madrid&quot;</code>
            </div>
          </div>

          {/* Conversion Snippet */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">4. Convertir Hora entre Múltiples Zonas Internacionales</span>
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
              <code>curl -X GET &quot;https://www.timenumbers.com/api/v1/convert?from=Europe/Madrid&amp;to=America/Mexico_City,America/New_York&amp;time=15:00&quot;</code>
            </div>
          </div>
        </div>

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
                    Acceso anónimo sin configuración, resolución en memoria en sub-milisegundos y estándares autorizados de IANA.
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <FaqAccordion items={content.faqs} title="Preguntas Frecuentes sobre la Plataforma de Desarrolladores" />
        </div>

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explora Herramientas para Desarrolladores y Widgets" currentPath="/es/developers" />
      </div>
    </div>
  );
}
