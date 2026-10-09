import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getCityBySlug, City, CITIES } from '@/lib/geo/cities';
import { CompareCitiesClient } from '@/components/converter/CompareCitiesClient';
import { ArrowLeftRight } from 'lucide-react';

export const dynamicParams = false;

interface Props {
  params: Promise<{
    cities: string[];
  }>;
}

export async function generateStaticParams() {
  const comparisonSets: string[][] = [
    ['new-york', 'london'],
    ['new-york', 'tokyo'],
    ['london', 'tokyo'],
    ['paris', 'new-york'],
    ['los-angeles', 'london'],
    ['sydney', 'london'],
    ['madrid', 'buenos-aires'],
    ['mexico-city', 'madrid'],
    ['bogota', 'madrid'],
    ['santiago', 'madrid'],
    ['lima', 'madrid'],
    ['new-york', 'london', 'tokyo'],
    ['paris', 'berlin', 'rome'],
    ['madrid', 'barcelona', 'valencia'],
  ];

  return comparisonSets.map(cities => ({ cities }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cities } = await params;
  if (!cities || cities.length === 0) {
    return buildPageMetadata('Comparar Ciudades', 'Compara la hora en ciudades del mundo en vivo.', '/converter/compare', 'es');
  }

  const resolvedCities = cities
    .map(slug => getCityBySlug(slug))
    .filter(Boolean) as City[];

  const cityNames = resolvedCities.map(c => c.name);
  const title = cityNames.length >= 2
    ? `Comparación Horaria: ${cityNames.slice(0, 3).join(' vs ')} — Relojes y Diferencias`
    : `Comparar Hora Entre Ciudades`;

  const description = `Comparador interactivo de diferencia horaria en vivo entre ${cityNames.join(', ')}. Consulta relojes atómicos, desfases UTC y solapamiento de horarios laborales.`;
  const canonicalPath = `/converter/compare/${cities.join('/')}`;

  return buildPageMetadata(title, description, canonicalPath, 'es');
}

const COMPARE_FAQS_ES = [
  {
    question: "¿Cómo se calcula la diferencia horaria entre múltiples ciudades?",
    answer: "La hora local de cada ciudad se obtiene a partir del Tiempo Universal Coordinado (UTC) utilizando la base de datos oficial de zonas horarias IANA (tzdb). La diferencia relativa en horas se calcula directamente respecto a la primera ciudad base seleccionada."
  },
  {
    question: "¿Cómo afecta el horario de verano (DST) a estas comparaciones?",
    answer: "Cada vez que una de las regiones comparadas entra o sale del horario de verano, el desfase se ajusta de manera automática en tiempo real sin requerir cambios manuales."
  },
  {
    question: "¿Puedo añadir más ciudades a esta matriz comparativa?",
    answer: "¡Sí! Utiliza el panel inferior para agregar hasta 10 ciudades internacionales simultáneamente y comparar sus husos horarios y horas de trabajo en tiempo real."
  }
];

export default async function ConverterCompareCitiesPageEs({ params }: Props) {
  const { cities } = await params;
  if (!cities || cities.length === 0) {
    notFound();
  }

  const resolvedCities = cities
    .map(slug => getCityBySlug(slug))
    .filter(Boolean) as City[];

  if (resolvedCities.length === 0) {
    notFound();
  }

  const initialCities = resolvedCities.length >= 1 ? resolvedCities : CITIES.slice(0, 3);
  const cityLabels = initialCities.map(c => c.name).join(' vs ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Convertidor', url: '/es/converter' },
          { name: 'Comparar Ciudades', url: '/es/converter/compare' },
          { name: cityLabels, url: `/es/converter/compare/${cities.join('/')}` },
        ]}
        locale="es"
      />

      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Convertidor', url: '/es/converter' },
          { name: 'Comparar Ciudades', url: '/es/converter/compare' },
          { name: cityLabels, url: `/es/converter/compare/${cities.join('/')}` },
        ]}
      />
      <JsonLd type="faq" data={COMPARE_FAQS_ES} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Comparador Interactivo de Múltiples Ciudades</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Comparación Horaria: {cityLabels}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Comparativa atómica en tiempo real entre {initialCities.map(c => `${c.name} (${c.country})`).join(', ')}. Consulta relojes en vivo, diferencias de zona y solapamiento laboral.
          </p>
        </div>
      </div>

      <CompareCitiesClient initialCities={initialCities} locale="es" />

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={COMPARE_FAQS_ES} title="Preguntas Frecuentes: Comparación entre Ciudades" />
      </div>

      <RelatedLinksHub currentPath={`/es/converter/compare/${cities.join('/')}`} />

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `Comparación Horaria ${cityLabels}`,
            "url": `https://www.timenumbers.com/es/converter/compare/${cities.join('/')}`,
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
