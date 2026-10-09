import { FaqAccordion } from '@/components/common/FaqAccordion';
import { getCountryFaqs } from '@/lib/seo/page-faqs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { getCountryBySlug, getAllCountries } from '@/lib/geo/countries';
import { getCitiesByCountry } from '@/lib/geo/cities';
import { getCityRootSlug } from '@/lib/geo/city-lookup';
import { formatTimeInZone, getUtcOffsetString } from '@/lib/time/timezones';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChevronRight, Compass } from 'lucide-react';
import { COUNTRY_CUSTOM_CONTENT } from '@/lib/seo/country-custom-content';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCountries().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'world') return buildPageMetadata('Directorio Horario de Países', 'Índice global de zonas horarias por país.', '/countries', 'es');
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'País No Encontrado' };

  const custom = COUNTRY_CUSTOM_CONTENT[country.slug];
  const title = `Hora Actual en ${country.name} — Relojes Oficiales y Husos Horarios`;
  const description = `¿Qué hora es en ${country.name} ahora mismo? Consulta la hora local oficial en ${country.capital} y sus principales ciudades con segundos en vivo, husos UTC y horario de verano.`;

  return buildPageMetadata(
    custom?.title || title,
    custom?.description || description,
    `/countries/${country.slug}`,
    'es'
  );
}

export default async function CountryPageEs({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'world') {
    permanentRedirect('/es/countries');
  }
  const country = getCountryBySlug(slug);
  if (!country) notFound();

  const custom = COUNTRY_CUSTOM_CONTENT[country.slug];
  const englishFaqs = custom?.faqs || getCountryFaqs(country);
  
  // Localize FAQs for Spanish
  const faqsEs = [
    {
      question: `¿Qué hora es actualmente en ${country.name}?`,
      answer: `La hora oficial en la capital (${country.capital}) y en todo ${country.name} está determinada por sus husos IANA oficiales (${country.timezones.join(', ')}). Los relojes de TimeNumbers se sincronizan directamente con servidores atómicos para máxima precisión.`
    },
    {
      question: `¿Aplica ${country.name} el Horario de Verano (DST)?`,
      answer: country.hasDst
        ? `${country.name} observa horario de verano. ${country.dstNotes || 'Los relojes se adelantan una hora durante el periodo estival para aprovechar mejor la luz solar.'}`
        : `${country.name} no aplica horario de verano. Sus relojes oficiales se mantienen estables a lo largo de todo el año.`
    },
    {
      question: `¿Cuántos husos horarios atraviesan ${country.name}?`,
      answer: `${country.name} abarca ${country.timezones.length} ${country.timezones.length > 1 ? 'zonas horarias oficiales' : 'zona horaria oficial'} (${country.timezones.slice(0, 3).join(', ')}${country.timezones.length > 3 ? ' entre otras' : ''}).`
    }
  ];

  const cities = getCitiesByCountry(country.code);
  const now = new Date();
  const capitalTime = formatTimeInZone(now, country.timezones[0], false, true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: 'Países', url: '/es/countries' },
          { name: country.name, url: `/es/countries/${country.slug}` },
        ]}
        locale="es"
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Países', url: '/es/countries' },
          { name: country.name, url: `/es/countries/${country.slug}` },
        ]}
      />
      <JsonLd type="faq" data={faqsEs} />

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Hora Exacta en {country.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Capital: {country.capital} • Población: {country.population}
              </p>
            </div>
          </div>

          <div className="text-right bg-blue-50 dark:bg-slate-800 px-5 py-3 rounded-2xl border border-blue-100 dark:border-slate-700">
            <span className="text-[11px] text-slate-400 font-medium block">Hora en la Capital ({country.capital})</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">{capitalTime}</span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block">{getUtcOffsetString(now, country.timezones[0])}</span>
          </div>
        </div>

        {country.slug === 'united-states' && (
          <div className="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-sm text-blue-950 dark:text-blue-200 block">
                ¿Buscas los relojes en vivo de todas las zonas horarias de Estados Unidos?
              </span>
              <span className="text-xs text-blue-700 dark:text-blue-300">
                Consulta los relojes atómicos para las zonas del Este, Central, Montaña, Pacífico, Alaska y Hawái.
              </span>
            </div>
            <Link
              href="/es/united-states-time-now"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors text-center"
            >
              Panel Horario de EE. UU. →
            </Link>
          </div>
        )}

        {country.dstNotes && (
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-800 dark:text-slate-200">Normativa de Horario de Verano: </span>
            {country.dstNotes}
          </div>
        )}
      </div>

      {/* Major Cities List */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Ciudades Principales de {country.name}
        </h2>

        {cities.length === 0 ? (
          <p className="text-xs text-slate-400">Zona horaria principal: {country.timezones.join(', ')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cities.map((city) => {
              const localTime = formatTimeInZone(now, city.timezone, false, false);
              return (
                <Link
                  key={city.id}
                  href={`/es/time/${getCityRootSlug(city)}`}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-all"
                >
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">{city.name}</span>
                    <span className="text-[11px] text-slate-400 block">{city.timezone}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono block">{localTime}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{getUtcOffsetString(now, city.timezone)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
          <span className="text-slate-500">¿Buscas los horarios específicos de cada ciudad en {country.name}?</span>
          <Link
            href={`/es/cities/${country.slug}`}
            className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Ver Todas las Ciudades de {country.name}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <FaqAccordion items={faqsEs} title={`Preguntas Frecuentes sobre la Hora en ${country.name}`} />
      <RelatedLinksHub currentPath={`/es/countries/${country.slug}`} />
    </div>
  );
}
