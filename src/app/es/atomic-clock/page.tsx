import React from 'react';
import { Metadata } from 'next';
import { AtomicClockClient } from '@/app/atomic-clock/AtomicClockClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Radio, ShieldCheck, Zap, Activity } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/atomic-clock'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/atomic-clock'
);

export default function SpanishAtomicClockPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: 'Reloj Atómico', url: '/es/atomic-clock' }]} />

      <JsonLd type="faq" data={content.faqs} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            <Radio className="w-3.5 h-3.5" />
            Sincronización Estrato 1 NIST y BIPM
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Resonancia de 9.192.631.770 Hz</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Trazable a Estrato 1</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Diagnóstico de Desviación en Vivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Atomic Clock */}
      <AtomicClockClient locale="es" />

      {/* Educational Guide Section */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} locale="es" />

      {/* Real-World Critical Infrastructure Applications */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Por qué la Infraestructura Global Depende de la Precisión Atómica
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cómo la sincronización a nivel de sub-microsegundos impulsa las comunicaciones, la navegación y las finanzas modernas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Navegación por Satélite (GPS/Galileo)
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Triangulación en Nanosegundos
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Los receptores GPS calculan su posición midiendo el tiempo de vuelo de las señales de radio transmitidas por 4 o más satélites orbitales equipados con relojes atómicos.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Mercados Financieros (FinTech)
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Secuenciación de Órdenes de Alta Frecuencia
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Normativas globales (como MiFID II) exigen que los mercados bursátiles electrónicos marquen la hora de las órdenes con una precisión de 100 microsegundos respecto al tiempo atómico.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Telecomunicaciones y Nube
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Consenso en Bases de Datos Distribuidas
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Las bases de datos transaccionales distribuidas (como la API TrueTime de Google Spanner) usan GPS y relojes atómicos para lograr consistencia ACID global linealizable.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={content.faqs}
        title="Preguntas Frecuentes sobre la Hora Atómica y Estándares NTP"
        subtitle="Explora los principios de la resonancia cuántica, segundos intercalares y relojes de red óptica."
      />

      {/* Related Hub */}
      <RelatedLinksHub
        currentPath="/es/atomic-clock"
        title="Explora Herramientas Horológicas y Estándares"
        subtitle="Ejecuta pruebas de diagnóstico de reloj de hardware, visita el centro de referencia UTC o explora el tiempo Unix."
      />

      {/* Schema.org WebApplication structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TimeNumbers Reloj Atómico Online",
            "url": "https://www.timenumbers.com/es/atomic-clock",
            "inLanguage": "es",
            "applicationCategory": "UtilityApplication",
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
