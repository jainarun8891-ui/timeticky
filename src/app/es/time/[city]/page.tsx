import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug } from '@/lib/geo/city-lookup';
import { POPULAR_CITIES } from '@/lib/geo/cities';
import { CityPageClient } from '@/components/common/CityPageClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { getCityTemporalData } from '@/lib/seo/page-faqs';
import { getCityFaqsEs } from '@/lib/i18n/city-faqs-es';

export const dynamicParams = false;

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return POPULAR_CITIES.map((c) => ({ city: getCityRootSlug(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);
  if (!city) return buildPageMetadata('Ciudad no encontrada', 'Ciudad no encontrada.', `/es/time/${rawSlug}`);

  const cleanSlug = getCityRootSlug(city);
  const data = getCityTemporalData(city);
  const dstText = data.observesDST
    ? (data.isDstCurrentlyActive ? `horario de verano activo (${data.timezoneAbbr})` : `horario estándar (${data.timezoneAbbr})`)
    : `horario estándar permanente ${data.baseOffset} sin cambios de hora`;

  return buildPageMetadata(
    `Hora actual en ${city.name}, ${city.country} — Reloj en vivo | TimeNumbers`,
    `Consulta la hora exacta en ${city.name}, ${city.country} en tiempo real: reloj digital con segundos, huso horario ${data.timezoneAbbr} (${data.baseOffset}), ${dstText}, salida y puesta del sol hoy y conversor horario.`,
    `/es/time/${cleanSlug}`
  );
}

export default async function EsCityTimePage({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const cleanSlug = getCityRootSlug(city);
  if (rawSlug !== cleanSlug) {
    permanentRedirect(`/es/time/${cleanSlug}`);
  }

  const temporalData = getCityTemporalData(city);
  const cityFaqs = getCityFaqsEs(temporalData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Ciudades', url: '/es/cities' },
          { name: `${city.name}, ${city.country}`, url: `/es/time/${cleanSlug}` },
        ]}
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Ciudades', url: '/es/cities' },
          { name: `${city.name}, ${city.country}`, url: `/es/time/${cleanSlug}` },
        ]}
      />
      <JsonLd type="faq" data={cityFaqs} />

      <CityPageClient
        city={city}
        locale="es"
        h1Title={`Hora actual en ${city.name}, ${city.country}`}
      />

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          title={`Preguntas Frecuentes sobre la hora en ${city.name}`}
          subtitle="Información horológica oficial, husos horarios y cambios de hora de verano."
          items={cityFaqs}
        />
      </div>

      <RelatedLinksHub
        currentPath={`/es/time/${cleanSlug}`}
        title={`Explorar más ubicaciones y husos horarios`}
        subtitle="Compara la hora con otras capitales y planifica reuniones de trabajo."
      />
    </div>
  );
}
