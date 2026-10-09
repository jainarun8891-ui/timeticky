import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findTimezoneAbbr, findIanaZoneBySlug, offsetToSlug, COMMON_TIMEZONE_ABBREVIATIONS } from '@/lib/time/timezone-lookup';
import { ALL_IANA_TIMEZONES } from '@/lib/time/iana-database';
import { POPULAR_CITIES } from '@/lib/geo/cities';
import { TimezoneDetailClient } from '@/components/common/TimezoneDetailClient';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { JsonLd } from '@/components/seo/JsonLd';
import { Compass } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { TIMEZONE_CUSTOM_CONTENT } from '@/lib/seo/timezone-custom-content';

export const dynamicParams = false;

interface Props {
  params: Promise<{ zone: string }>;
}

export async function generateStaticParams() {
  const customSlugs = Object.keys(TIMEZONE_CUSTOM_CONTENT).map(zone => ({ zone }));
  const abbrSlugs = Object.keys(COMMON_TIMEZONE_ABBREVIATIONS).map(slug => ({ zone: slug }));
  const popularIanaSlugs = [
    'asia-kolkata',
    'america-new-york',
    'europe-london',
    'europe-paris',
    'asia-tokyo',
    'asia-dubai',
    'asia-singapore',
    'australia-sydney',
    'america-los-angeles',
    'america-chicago',
    'america-toronto',
    'europe-berlin',
    'america-st-lucia',
    'america-nassau',
    'america-anguilla',
    'america-dominica',
  ].map(slug => ({ zone: slug }));

  const seen = new Set<string>();
  const combined: { zone: string }[] = [];
  for (const item of [...customSlugs, ...abbrSlugs, ...popularIanaSlugs]) {
    if (!seen.has(item.zone)) {
      seen.add(item.zone);
      combined.push(item);
    }
  }
  return combined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone } = await params;
  const slug = zone.toLowerCase();
  const custom = TIMEZONE_CUSTOM_CONTENT[slug];
  if (custom) {
    return buildPageMetadata(custom.title, custom.description, `/timezone/${slug}`, 'es');
  }

  const abbr = findTimezoneAbbr(slug);
  const iana = findIanaZoneBySlug(slug);

  const titleName = abbr ? `${abbr.primaryName} (${abbr.abbr})` : (iana ? `${iana.id} (${iana.abbreviation})` : zone.toUpperCase());
  const offset = abbr ? abbr.offsetStr : (iana ? iana.formattedOffset : 'UTC');
  const cityName = iana ? iana.id.split('/').pop()?.replace(/_/g, ' ') : '';
  const targetName = abbr ? abbr.abbr : (cityName ? cityName : zone.toUpperCase());

  return buildPageMetadata(
    `Hora Actual en ${targetName} (${offset}) — Reloj Exacto en Vivo`,
    `¿Qué hora es en ${titleName} ahora mismo? Hora local exacta con segundos en vivo, desfase UTC ${offset}, reglas de horario de verano (DST) y convertidor horario.`,
    `/timezone/${slug}`,
    'es'
  );
}

export default async function TimezonePageEs({ params }: Props) {
  const { zone } = await params;
  const slug = zone.toLowerCase();
  const abbr = findTimezoneAbbr(slug);
  const iana = findIanaZoneBySlug(slug);

  if (!abbr && !iana) {
    notFound();
  }

  const title = abbr ? `${abbr.primaryName} (${abbr.abbr})` : `${iana!.id} (${iana!.city})`;
  const representativeTz = abbr ? abbr.primaryIana : iana!.id;
  const offsetStr = abbr ? abbr.offsetStr : iana!.formattedOffset;
  const displayAbbr = abbr ? abbr.abbr : iana!.abbreviation;
  const hasDst = abbr ? abbr.hasDst : true;
  const isAmbiguous = abbr ? (abbr.meanings.length > 1) : false;
  const notes = abbr ? abbr.notes : undefined;

  // Find cities matching this timezone or offset
  const cities = POPULAR_CITIES.filter(c => {
    if (abbr) {
      return abbr.meanings.some(m => m.iana === c.timezone) || c.timezone === abbr.primaryIana;
    }
    return c.timezone === iana!.id;
  }).slice(0, 12);

  const matchingOffsetCities = POPULAR_CITIES.filter(c => {
    const tzEntry = ALL_IANA_TIMEZONES.find(z => z.id === c.timezone);
    return tzEntry && tzEntry.formattedOffset === offsetStr;
  }).slice(0, 6);

  const finalCities = cities.length >= 3 ? cities : Array.from(new Set([...cities, ...matchingOffsetCities]));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Hora en Vivo y Desfase de ${title}`,
    description: `Hora atómica exacta para ${title}. Desfase ${offsetStr}.`,
    url: `https://www.timenumbers.com/es/timezone/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.timenumbers.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Zonas Horarias', item: 'https://www.timenumbers.com/es/time-zones' },
        { '@type': 'ListItem', position: 3, name: title, item: `https://www.timenumbers.com/es/timezone/${slug}` },
      ],
    },
  };

  const tzFaqsEs = [
    {
      question: `¿Qué hora es en ${title} en este momento?`,
      answer: `El reloj en vivo superior muestra la hora local exacta observada en la región de ${title}. Se sincroniza directamente con servidores atómicos para mantener precisión absoluta.`
    },
    {
      question: `¿Cuál es el desfase UTC oficial para ${title}?`,
      answer: `${title} cuenta con un desfase estándar de ${offsetStr}. Las localidades en esta zona se encuentran situadas ${offsetStr.startsWith('+') ? `${offsetStr.replace('+', '')} horas por delante del` : offsetStr.startsWith('-') ? `${offsetStr.replace('-', '')} horas por detrás del` : 'en el'} Tiempo Universal Coordinado (UTC).`
    },
    {
      question: `¿Aplica ${title} el Horario de Verano (DST)?`,
      answer: `${title} ${hasDst ? 'aplica cambios estacionales de horario de verano, adelantando el reloj 1 hora en primavera y retrasándolo en otoño' : 'mantiene su hora estándar constante todo el año sin alteraciones de reloj'}.`
    },
    {
      question: `¿Qué ciudades importantes operan con el huso horario de ${title}?`,
      answer: `Entre las principales ciudades destacan ${finalCities.slice(0, 4).map(c => c.name).join(', ')}${finalCities.length > 4 ? ', entre otras' : ''}.`
    }
  ];

  const custom = TIMEZONE_CUSTOM_CONTENT[slug];
  const faqs = custom?.faqs || tzFaqsEs;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={faqs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <Breadcrumbs
          items={[
            { name: 'Zonas Horarias', url: '/es/time-zones' },
            { name: displayAbbr, url: `/es/timezone/${slug}` },
          ]}
          locale="es"
        />

        {/* Live Detail Client */}
        <TimezoneDetailClient
          title={custom?.h1 || title}
          description={custom?.description}
          representativeTz={representativeTz}
          offsetStr={offsetStr}
          abbreviation={displayAbbr}
          cities={finalCities}
          hasDst={hasDst}
          notes={notes}
          isAmbiguous={isAmbiguous}
          locale="es"
        />

        {/* Custom Educational Guide Section */}
        {custom && (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-sm">
            <div className="space-y-4 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Análisis Cronométrico de la Zona Horaria</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {custom.headings[0] || `Zona Horaria ${title}`}
              </h2>
              {custom.page_text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
            </div>

            {custom.headings.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {custom.headings.slice(1).map((heading, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Observancia oficial, coordinación de reuniones internacionales y estándares del huso {title}.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Dynamic FAQ Accordion */}
        <FaqAccordion
          items={faqs}
          title={`Preguntas Frecuentes sobre la Zona Horaria ${title}`}
          subtitle={`Detalles esenciales del huso ${title}, cálculo de diferencias horarias y observaciones de horario de verano.`}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub currentPath={`/es/timezone/${slug}`} title="Explora Más Zonas Horarias y Relojes Globales" />
      </div>
    </div>
  );
}
