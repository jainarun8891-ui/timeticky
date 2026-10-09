import React from 'react';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug, POPULAR_TIME_DIFFERENCE_PAIRS, getRelatedDifferencePairs } from '@/lib/geo/city-lookup';
import { TimeDifferencePairClient } from '@/components/converter/TimeDifferencePairClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getCityDifferenceData, formatHourAmPm } from '@/lib/seo/page-faqs';
import { getCityDifferenceFaqsEs } from '@/lib/i18n/city-faqs-es';
import { CITY_DIFFERENCE_CUSTOM_CONTENT } from '@/lib/seo/city-difference-custom-content';
import { Clock, ArrowLeftRight, ArrowRight, Table } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const customSlugs = Object.keys(CITY_DIFFERENCE_CUSTOM_CONTENT);
  const pairSlugs = POPULAR_TIME_DIFFERENCE_PAIRS.map(p => `${p.cityA}-to-${p.cityB}`);
  const allSlugs = Array.from(new Set([...customSlugs, ...pairSlugs]));
  return allSlugs.map(slug => ({ slug }));
}

function parsePairSlug(rawSlug: string): { slugA: string; slugB: string } | null {
  if (!rawSlug || !rawSlug.includes('-to-')) return null;
  const parts = rawSlug.toLowerCase().split('-to-');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  return { slugA: parts[0], slugB: parts[1] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parsePairSlug(slug);
  if (!parsed) return buildPageMetadata('Diferencia Horaria No Encontrada', 'Diferencia horaria no encontrada.', `/es/converter/difference/${slug}`);

  const cityA = findCityByRootSlug(parsed.slugA);
  const cityB = findCityByRootSlug(parsed.slugB);
  if (!cityA || !cityB) return buildPageMetadata('Diferencia Horaria No Encontrada', 'Diferencia horaria no encontrada.', `/es/converter/difference/${slug}`);

  const cleanA = getCityRootSlug(cityA);
  const cleanB = getCityRootSlug(cityB);
  const canonicalSlug = `${cleanA}-to-${cleanB}`;

  const data = getCityDifferenceData(cityA, cityB);
  const diffSentence = data.diff.isEqual
    ? `${cityB.name} y ${cityA.name} comparten la misma hora local.`
    : (data.diff.diffHours > 0
        ? `${cityB.name} está ${data.diff.formatted} por delante de ${cityA.name}.`
        : `${cityB.name} está ${data.diff.formatted} por detrás de ${cityA.name}.`);

  return buildPageMetadata(
    `Diferencia Horaria de ${cityA.name} a ${cityB.name} (Horas Exactas y Solapamiento) | TimeNumbers`,
    `${diffSentence} Conversor visual de 24 horas, calculadora de solapamiento laboral en oficina y planificador de reuniones entre ${cityA.name} y ${cityB.name}.`,
    `/es/converter/difference/${canonicalSlug}`
  );
}

export default async function EsConverterCityDifferencePage({ params }: Props) {
  const { slug } = await params;
  const parsed = parsePairSlug(slug);
  if (!parsed) notFound();

  const cityA = findCityByRootSlug(parsed.slugA);
  const cityB = findCityByRootSlug(parsed.slugB);

  if (!cityA || !cityB) {
    notFound();
  }

  const cleanA = getCityRootSlug(cityA);
  const cleanB = getCityRootSlug(cityB);
  const canonicalSlug = `${cleanA}-to-${cleanB}`;

  if (slug !== canonicalSlug) {
    permanentRedirect(`/es/converter/difference/${canonicalSlug}`);
  }

  const faqs = getCityDifferenceFaqsEs(cityA, cityB);
  const data = getCityDifferenceData(cityA, cityB);
  const diffSentence = data.diff.isEqual
    ? `${cityB.name} y ${cityA.name} tienen exactamente la misma hora.`
    : (data.diff.diffHours > 0
        ? `${cityB.name} está ${data.diff.formatted} por delante de ${cityA.name}.`
        : `${cityB.name} está ${data.diff.formatted} por detrás de ${cityA.name}.`);

  const breadcrumbs = [
    { name: 'Conversor', url: '/es/converter' },
    { name: 'Diferencias Horarias', url: '/es/converter/difference' },
    { name: `${cityA.name} a ${cityB.name}`, url: `/es/converter/difference/${canonicalSlug}` }
  ];

  const reciprocalSlug = `${cleanB}-to-${cleanA}`;
  const relatedPairs = getRelatedDifferencePairs(cleanA, cleanB, 8).map(p => {
    const rCityA = findCityByRootSlug(p.cityA);
    const rCityB = findCityByRootSlug(p.cityB);
    return {
      slug: `${p.cityA}-to-${p.cityB}`,
      nameA: rCityA?.name || p.cityA,
      nameB: rCityB?.name || p.cityB,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Conversor', url: '/es/converter' },
          { name: 'Diferencias Horarias', url: '/es/converter/difference' },
          { name: `${cityA.name} a ${cityB.name}`, url: `/es/converter/difference/${canonicalSlug}` }
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Clock className="w-3.5 h-3.5" />
            Comparación Horaria Bilateral
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Diferencia Horaria de {cityA.name} a {cityB.name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {diffSentence} Compara relojes atómicos en vivo, calcula horas laborales compartidas y planifica llamadas internacionales.
          </p>

          {/* Quick Answer Box */}
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-white text-xs sm:text-sm leading-relaxed mt-4">
            <span className="font-bold text-amber-300">Respuesta Rápida: </span>
            <span>{diffSentence} </span>
            <span className="text-slate-200">
              Cuando en {cityA.name} son las 12:00 del mediodía, en {cityB.name} son las {formatHourAmPm(12 + data.diff.diffHours)}.{' '}
              {data.diff.isEqual
                ? `Ambas ciudades tienen exactamente la misma hora civil oficial.`
                : (data.overlapDurationHours > 0
                  ? `Mejor ventana laboral: ${data.overlapDurationHours} horas de coincidencia en horario de oficina.`
                  : 'Sin solapamiento en horario laboral diurno estándar.')}
            </span>
          </div>
        </div>
      </div>

      <TimeDifferencePairClient cityA={cityA} cityB={cityB} locale="es" />

      {/* Server-Rendered Quick Hourly Conversion Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Table className="w-3.5 h-3.5" />
            <span>Tabla de Comparación Hora por Hora</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Tabla Horaria de {cityA.name} a {cityB.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Tabla de referencia cruzada para coordinar reuniones, llamadas y transferencias de trabajo entre {cityA.name} ({cityA.country}) y {cityB.name} ({cityB.country}).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Hora en {cityA.name}</th>
                <th className="py-3 px-4">Hora en {cityB.name}</th>
                <th className="py-3 px-4 hidden sm:table-cell">Estado Laboral</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => {
                const targetHour = hour + data.diff.diffHours;
                const fromFormatted = formatHourAmPm(hour);
                const toFormatted = formatHourAmPm(targetHour);
                const isFromBiz = hour >= 9 && hour <= 17;
                const isToBiz = ((targetHour % 24) + 24) % 24 >= 9 && ((targetHour % 24) + 24) % 24 <= 17;
                const isShared = isFromBiz && isToBiz;

                return (
                  <tr key={hour} className={isShared ? 'bg-emerald-50/50 dark:bg-emerald-950/20 font-semibold' : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'}>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {fromFormatted} ({cityA.name})
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {toFormatted} ({cityB.name})
                    </td>
                    <td className="py-2.5 px-4 hidden sm:table-cell text-xs">
                      {isShared ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Hora de Oficina Compartida
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">
                          Fuera de coincidencia comercial
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reciprocal Comparison Button */}
      <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            ¿Buscas el cálculo inverso?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Consulta la conversión inversa de {cityB.name} a {cityA.name}.
          </p>
        </div>
        <Link
          href={`/es/converter/difference/${reciprocalSlug}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-xs"
        >
          <span>Ver {cityB.name} a {cityA.name}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related Difference Pairs */}
      {relatedPairs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Diferencias Horarias Relacionadas con {cityA.name} y {cityB.name}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedPairs.map((p) => (
              <Link
                key={p.slug}
                href={`/es/converter/difference/${p.slug}`}
                className="group p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-all flex items-center justify-between"
              >
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 truncate">
                  {p.nameA} a {p.nameB}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      <div className="pt-2">
        <FaqAccordion
          title={`Preguntas Frecuentes sobre la Diferencia Horaria entre ${cityA.name} y ${cityB.name}`}
          subtitle="Horas de diferencia, cambios de horario de verano y mejores momentos para coordinar reuniones."
          items={faqs}
        />
      </div>

      {/* Related Links Hub */}
      <RelatedLinksHub
        currentPath={`/es/converter/difference/${canonicalSlug}`}
        title="Explorar Más Conversores de Tiempo"
        subtitle="Calcula diferencias con otras ciudades y accede al reloj mundial."
      />
    </div>
  );
}
