import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { MoonClient } from '@/app/moon/MoonClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Moon, Sparkles, ShieldCheck, MapPin, ArrowRight, Compass } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/moon'];

export const metadata = buildPageMetadata(
  content.title,
  content.description,
  '/moon',
  'es'
);

const POPULAR_MOON_CITIES_ES = [
  { name: 'Nueva Delhi', country: 'India', href: '/es/moon/delhi', desc: 'Fase lunar actual, % de iluminación superficial y horas de salida de la luna en Delhi' },
  { name: 'Nueva York', country: 'Estados Unidos', href: '/es/moon/new-york', desc: 'Iluminación lunar de esta noche, estado creciente/menguante y puesta de luna en NYC' },
  { name: 'Londres', country: 'Reino Unido', href: '/es/moon/london', desc: 'Iluminación lunar en el meridiano de Greenwich, edad lunar y próxima luna llena para Londres' },
  { name: 'Tokio', country: 'Japón', href: '/es/moon/tokyo', desc: 'Efemérides lunares en vivo, calendario de ciclos y porcentaje de iluminación para Tokio' },
  { name: 'Sídney', country: 'Australia', href: '/es/moon/sydney', desc: 'Perspectiva lunar invertida del hemisferio sur y efemérides de mareas costeras' },
  { name: 'París', country: 'Francia', href: '/es/moon/paris', desc: 'Seguimiento lunar en Europa Central, luna creciente y visibilidad en el cielo nocturno' },
];

export default function MoonPageEs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ name: "Fases Lunares y Ciclos", url: "/es/moon" }]} locale="es" />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Fase Lunar', url: '/es/moon' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />
      <JsonLd
        type="application"
        data={{
          name: "Fase Lunar en Vivo e Iluminación Superficial",
          category: "UtilitiesApplication",
          description: content.description
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Moon className="w-3.5 h-3.5" />
            <span>Observatorio del Ciclo Lunar Sinódico</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {content.h1}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Efemérides sinódicas de 29,53 días</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>% de Iluminación Superficial en Vivo</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Cuenta Regresiva a Luna Llena y Nueva</span>
            </div>
          </div>
        </div>
      </div>

      <MoonClient />

      {/* Major City Lunar Guides */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Grandes Metrópolis — Iluminación Lunar de Esta Noche
            </h3>
          </div>
          <Link
            href="/es/sun"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Horarios Solares</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_MOON_CITIES_ES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {c.country}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Efemérides Lunares en {c.name}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deep Scientific Editorial Architecture */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} />

      <div className="pt-4">
        <FaqAccordion
          title="Preguntas Frecuentes sobre las Fases de la Luna"
          subtitle="Descubre cómo la órbita, geometría y gravedad de la Luna influyen en nuestro planeta."
          items={content.faqs}
        />
      </div>

      <RelatedLinksHub
        currentPath="/moon"
        title="Explorar Herramientas de Astronomía y Tiempo Relacionadas"
        subtitle="Consulta horas de amanecer y atardecer, reglas de horario de verano o zonas horarias mundiales."
        locale="es"
      />
    </div>
  );
}
