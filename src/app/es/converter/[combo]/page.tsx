import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  COMMON_TIMEZONE_ABBREVIATIONS,
  TimezoneAbbrDefinition,
  getAllConverterCombos
} from '@/lib/time/timezone-lookup';
import { POPULAR_CONVERSION_COMBOS } from '@/app/converter/[combo]/page';
import { ConvertComboClient } from '@/app/converter/[combo]/ConvertComboClient';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getTimezoneComboData, getTimezoneComboFaqs, formatHourAmPm } from '@/lib/seo/page-faqs';
import { CONVERTER_COMBO_CUSTOM_CONTENT } from '@/lib/seo/converter-combo-custom-content';
import { Clock, Table } from 'lucide-react';

export const dynamicParams = false;

export async function generateStaticParams() {
  const customSlugs = Object.keys(CONVERTER_COMBO_CUSTOM_CONTENT);
  const canonicalCombos = getAllConverterCombos();
  const allCombos = Array.from(new Set([...customSlugs, ...POPULAR_CONVERSION_COMBOS, ...canonicalCombos]));
  return allCombos.map(combo => ({ combo }));
}

function parseCombo(rawCombo: string): { fromTz: TimezoneAbbrDefinition; toTz: TimezoneAbbrDefinition; cleanSlug: string } | null {
  if (!rawCombo || !rawCombo.includes('-to-')) return null;
  const [fromRaw, toRaw] = rawCombo.toLowerCase().split('-to-');
  if (!fromRaw || !toRaw || fromRaw === toRaw) return null;

  const fromTz = COMMON_TIMEZONE_ABBREVIATIONS[fromRaw];
  const toTz = COMMON_TIMEZONE_ABBREVIATIONS[toRaw];

  if (!fromTz || !toTz) return null;
  return { fromTz, toTz, cleanSlug: `${fromTz.slug}-to-${toTz.slug}` };
}

export async function generateMetadata({ params }: { params: Promise<{ combo: string }> }): Promise<Metadata> {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) return buildPageMetadata('Conversor no encontrado', 'Combinación de zonas horarias no encontrada.', `/es/converter/${combo}`);

  const { fromTz, toTz, cleanSlug } = parsed;
  const data = getTimezoneComboData(fromTz, toTz);

  const title = `Conversor de ${fromTz.abbr} a ${toTz.abbr} — Convertidor de Hora | TimeNumbers`;
  const desc = `Convierte horas entre ${fromTz.abbr} (${fromTz.primaryName}) y ${toTz.abbr} (${toTz.primaryName}) en tiempo real: control deslizante interactivo de 24 horas, cálculo de solapamiento laboral y tabla horaria exacta.`;

  return buildPageMetadata(title, desc, `/es/converter/${cleanSlug}`);
}

export default async function EsConvertComboPage({ params }: { params: Promise<{ combo: string }> }) {
  const { combo } = await params;
  const parsed = parseCombo(combo);
  if (!parsed) notFound();

  const { fromTz, toTz, cleanSlug } = parsed;
  const faqs = getTimezoneComboFaqs(fromTz, toTz);
  const data = getTimezoneComboData(fromTz, toTz);

  const breadcrumbs = [
    { name: 'Conversor', url: '/es/converter' },
    { name: `${fromTz.abbr} a ${toTz.abbr}`, url: `/es/converter/${cleanSlug}` }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={breadcrumbs} />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Conversor', url: '/es/converter' },
          { name: `${fromTz.abbr} a ${toTz.abbr}`, url: `/es/converter/${cleanSlug}` }
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <Clock className="w-3.5 h-3.5" />
            Conversor Oficial {fromTz.abbr} a {toTz.abbr}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Conversor de Horas de {fromTz.abbr} a {toTz.abbr}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Convierte la hora entre {fromTz.primaryName} ({fromTz.abbr}) y {toTz.primaryName} ({toTz.abbr}). Compara relojes atómicos en tiempo real, descubre horas laborales compartidas y planifica llamadas internacionales.
          </p>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 text-white text-xs sm:text-sm leading-relaxed mt-4">
            <span className="font-bold text-amber-300">Diferencia Horaria Oficial: </span>
            <span>
              {data.diffHours === 0
                ? `${fromTz.abbr} y ${toTz.abbr} comparten la misma compensación horaria.`
                : `${toTz.abbr} tiene una diferencia de ${Math.abs(data.diffHours)} horas respecto a ${fromTz.abbr}.`}
            </span>
          </div>
        </div>
      </div>

      <ConvertComboClient
        fromTz={fromTz}
        toTz={toTz}
        comboSlug={cleanSlug}
        locale="es"
      />

      {/* Hourly Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Table className="w-3.5 h-3.5" />
            <span>Tabla de Conversión Horaria</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Tabla de Horas de {fromTz.abbr} a {toTz.abbr}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Tabla de referencia cruzada hora por hora entre {fromTz.abbr} ({fromTz.primaryName}) y {toTz.abbr} ({toTz.primaryName}).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Hora {fromTz.abbr}</th>
                <th className="py-3 px-4">Hora {toTz.abbr}</th>
                <th className="py-3 px-4 hidden sm:table-cell">Estado Comercial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => {
                const targetHour = hour + data.diffHours;
                const fromFormatted = formatHourAmPm(hour);
                const toFormatted = formatHourAmPm(targetHour);
                const isFromBiz = hour >= 9 && hour <= 17;
                const isToBiz = ((targetHour % 24) + 24) % 24 >= 9 && ((targetHour % 24) + 24) % 24 <= 17;
                const isShared = isFromBiz && isToBiz;

                return (
                  <tr key={hour} className={isShared ? 'bg-emerald-50/50 dark:bg-emerald-950/20 font-semibold' : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'}>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {fromFormatted} ({fromTz.abbr})
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {toFormatted} ({toTz.abbr})
                    </td>
                    <td className="py-2.5 px-4 hidden sm:table-cell text-xs">
                      {isShared ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Horario de Oficina Compartido
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">
                          Fuera de horario laboral común
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

      {/* FAQs */}
      <div className="pt-2">
        <FaqAccordion
          title={`Preguntas Frecuentes sobre la Conversión de ${fromTz.abbr} a ${toTz.abbr}`}
          subtitle="Diferencias horarias oficiales, husos horarios y coincidencia de horarios de oficina."
          items={faqs}
        />
      </div>

      {/* Related Links Hub */}
      <RelatedLinksHub
        currentPath={`/es/converter/${cleanSlug}`}
        title="Explorar Más Conversores de Zonas Horarias"
        subtitle="Convierte entre otras zonas y consulta el mapa mundial de husos horarios."
      />
    </div>
  );
}
