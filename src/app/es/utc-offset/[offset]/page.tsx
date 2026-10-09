import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { parseOffsetSlug, getLocationsForOffset } from '@/lib/time/timezone-lookup';
import { TimezoneDetailClient } from '@/components/common/TimezoneDetailClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowRight, Layers } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const dynamicParams = false;

interface Props {
  params: Promise<{ offset: string }>;
}

export async function generateStaticParams() {
  const commonOffsets = [
    'utc-plus-0',
    'utc-plus-1',
    'utc-plus-2',
    'utc-plus-3',
    'utc-plus-4',
    'utc-plus-5',
    'utc-plus-5-30',
    'utc-plus-5-45',
    'utc-plus-6',
    'utc-plus-7',
    'utc-plus-8',
    'utc-plus-9',
    'utc-plus-9-30',
    'utc-plus-10',
    'utc-plus-11',
    'utc-plus-12',
    'utc-minus-3',
    'utc-minus-4',
    'utc-minus-5',
    'utc-minus-6',
    'utc-minus-7',
    'utc-minus-8',
    'utc-minus-9',
    'utc-minus-10',
  ];

  return commonOffsets.map(offset => ({ offset }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { offset } = await params;
  const parsed = parseOffsetSlug(offset);

  if (!parsed) {
    return {
      title: 'Desfase No Encontrado — TimeNumbers',
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata(
    `¿Qué Hora Es en ${parsed.formattedOffset}? Hora Exacta ${parsed.formattedOffset}`,
    `¿Qué hora es en la zona ${parsed.formattedOffset} ahora mismo? Hora local exacta para países y ciudades con huso ${parsed.formattedOffset}, zonas IANA, diferencia respecto a UTC y relojes en vivo.`,
    `/utc-offset/${offset.toLowerCase()}`,
    'es'
  );
}

export default async function UtcOffsetPageEs({ params }: Props) {
  const { offset } = await params;
  const parsed = parseOffsetSlug(offset);

  if (!parsed) {
    notFound();
  }

  const { zones, cities } = getLocationsForOffset(parsed.formattedOffset);
  const representativeTz = zones.length > 0 ? zones[0].id : 'UTC';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Zona Horaria y Relojes de ${parsed.formattedOffset}`,
    description: `Hora actual en ${parsed.formattedOffset}. Ciudades pertenecientes, zonas IANA y diferencia horaria.`,
    url: `https://www.timenumbers.com/es/utc-offset/${offset.toLowerCase()}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.timenumbers.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Zonas Horarias', item: 'https://www.timenumbers.com/es/time-zones' },
        { '@type': 'ListItem', position: 3, name: parsed.formattedOffset, item: `https://www.timenumbers.com/es/utc-offset/${offset.toLowerCase()}` },
      ],
    },
  };

  const offsetFaqsEs = [
    {
      question: `¿Qué hora es en ${parsed.formattedOffset} en este momento?`,
      answer: `Los relojes en el huso horario ${parsed.formattedOffset} marcan actualmente ${parsed.formattedOffset} respecto al Tiempo Universal Coordinado (UTC). Consulta el cronómetro atómico en vivo superior para ver los segundos exactos.`
    },
    {
      question: `¿Qué países y ciudades utilizan el desfase ${parsed.formattedOffset}?`,
      answer: `Las localidades situadas en esta franja longitudinal incluyen a ${cities.slice(0, 4).map(c => c.name).join(', ')}${cities.length > 4 ? ', entre otras' : ''}, abarcando ${zones.length} identificadores IANA oficiales.`
    },
    {
      question: `¿Cuántas horas de diferencia hay entre ${parsed.formattedOffset} y UTC?`,
      answer: `${parsed.formattedOffset} se encuentra exactamente a ${parsed.formattedOffset.replace('UTC', '').trim() || '0'} horas respecto al meridiano cero UTC / GMT.`
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={offsetFaqsEs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <Breadcrumbs
          items={[
            { name: 'Zonas Horarias', url: '/es/time-zones' },
            { name: parsed.formattedOffset, url: `/es/utc-offset/${offset.toLowerCase()}` },
          ]}
          locale="es"
        />

        {/* Live Detail Client */}
        <TimezoneDetailClient
          title={`Hora en ${parsed.formattedOffset}`}
          representativeTz={representativeTz}
          offsetStr={parsed.formattedOffset}
          abbreviation={parsed.label}
          cities={cities.slice(0, 12)}
          hasDst={true}
          notes={`El desfase horario estándar ${parsed.formattedOffset} es observado por territorios ubicados en su meridiano longitudinal o zonas afines.`}
          locale="es"
        />

        {/* IANA Time Zones in this Offset */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                Zonas Horarias IANA en {parsed.formattedOffset}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Identificadores canónicos dentro de la base tz que coinciden con este desfase civil.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {zones.length} {zones.length === 1 ? 'zona' : 'zonas'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {zones.map((z) => (
              <Link
                key={z.id}
                href={`/es/timezone/${z.slug}`}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200/80 dark:border-slate-800 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600">
                    {z.id}
                  </div>
                  <div className="text-xs text-slate-500">
                    {z.city} ({z.region})
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <FaqAccordion items={offsetFaqsEs} title={`Preguntas Frecuentes: ${parsed.formattedOffset}`} />

        {/* Global Hub Navigation */}
        <RelatedLinksHub currentPath={`/es/utc-offset/${offset.toLowerCase()}`} title="Explora Todas las Zonas Horarias y Desfases" />
      </div>
    </div>
  );
}
