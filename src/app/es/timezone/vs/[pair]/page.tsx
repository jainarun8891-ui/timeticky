import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { TIMEZONE_VS_PAIRS, TimezoneVsPair } from '@/lib/time/timezone-vs-data';
import { TimezoneVsClient } from '@/app/timezone/vs/TimezoneVsClient';

interface Props {
  params: Promise<{ pair: string }>;
}

export async function generateStaticParams() {
  return Object.keys(TIMEZONE_VS_PAIRS).map((pair) => ({ pair }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params;
  const data = TIMEZONE_VS_PAIRS[pair];
  if (!data) return {};

  const title = `Diferencia entre ${data.zoneA} y ${data.zoneB} — Horas Exactas Explicadas`;
  const desc = data.quickAnswerEs;

  return buildPageMetadata(
    title,
    desc,
    `/timezone/vs/${pair}`,
    'es'
  );
}

export default async function TimezoneVsSinglePageEs({ params }: Props) {
  const { pair } = await params;
  const data = TIMEZONE_VS_PAIRS[pair];
  if (!data) notFound();

  const faqs = [
    {
      question: `¿Cuál es la diferencia exacta entre ${data.zoneA} y ${data.zoneB}?`,
      answer: data.quickAnswerEs,
    },
    {
      question: `¿Ambas zonas (${data.zoneA} y ${data.zoneB}) cambian al horario de verano?`,
      answer: data.detailsEs.dstExplanation,
    },
    {
      question: `¿Qué ciudades importantes utilizan ${data.zoneA}?`,
      answer: `${data.zoneA} (${data.nameA}) incluye: ${data.detailsEs.regionsA.join(', ')}.`,
    },
    {
      question: `¿Qué ciudades importantes utilizan ${data.zoneB}?`,
      answer: `${data.zoneB} (${data.nameB}) incluye: ${data.detailsEs.regionsB.join(', ')}.`,
    }
  ];

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `Calculadora de Diferencia ${data.zoneA} vs ${data.zoneB}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: data.quickAnswerEs
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Comparador de Zonas', url: '/es/timezone/vs' },
          { name: `${data.zoneA} vs ${data.zoneB}`, url: `/es/timezone/vs/${pair}` }
        ]}
        locale="es"
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Comparador de Zonas', url: '/es/timezone/vs' },
          { name: `${data.zoneA} vs ${data.zoneB}`, url: `/es/timezone/vs/${pair}` }
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      {/* Hero Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Diferencia Horaria {data.zoneA} vs {data.zoneB}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Comparando {data.nameA} ({data.zoneA}) y {data.nameB} ({data.zoneB}). Relojes en vivo simultáneos, barra interactiva y regiones incluidas.
        </p>
      </div>

      {/* Interactive Tool Client */}
      <TimezoneVsClient currentPair={pair} locale="es" />

      {/* Detailed Plain-Spanish Guide */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {data.detailsEs.heading}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {data.detailsEs.text}
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Cambios por Horario de Verano
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {data.detailsEs.dstExplanation}
          </p>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={faqs}
        title={`Preguntas Frecuentes sobre ${data.zoneA} vs ${data.zoneB}`}
        subtitle={`Todo lo que necesitas saber al comparar ${data.zoneA} con ${data.zoneB}.`}
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explora Más Comparaciones de Husos Horarios" />
    </div>
  );
}
