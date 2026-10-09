import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCountries, getCountryBySlug } from '@/lib/geo/countries';
import { getCitiesByCountry } from '@/lib/geo/cities';
import { CitiesDirectoryClient } from '@/app/cities/CitiesDirectoryClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { ArrowRight, Compass } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { CITIES_BY_COUNTRY_CUSTOM_CONTENT } from '@/lib/seo/cities-by-country-custom-content';

export const dynamicParams = false;

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return getAllCountries().map(c => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    return buildPageMetadata('Ciudades No Encontradas', 'Directorio de ciudades no encontrado.', `/cities/${slug}`, 'es');
  }

  const custom = CITIES_BY_COUNTRY_CUSTOM_CONTENT[slug];
  const title = `Hora Actual en Ciudades de ${country.name} — Relojes Locales Exactos`;
  const description = `¿Qué hora es en las ciudades de ${country.name}? Consulta la hora local oficial para ${country.capital} y todas las principales urbes de ${country.name}, husos horarios y horario de verano.`;

  return buildPageMetadata(
    custom?.title || title,
    custom?.description || description,
    `/cities/${slug}`,
    'es'
  );
}

export default async function CountryCitiesPageEs({ params }: Props) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const custom = CITIES_BY_COUNTRY_CUSTOM_CONTENT[slug];
  const cities = getCitiesByCountry(country.code);

  const countryFaqsEs = [
    {
      question: `¿Cuál es la capital de ${country.name} y qué zona horaria utiliza?`,
      answer: `La capital de ${country.name} es ${country.capital}. Los relojes en ${country.capital} se rigen por el estándar oficial de tiempo de la región (${country.timezones[0]}) con precisión atómica verificada.`
    },
    {
      question: `¿Aplica ${country.name} el Horario de Verano (DST)?`,
      answer: country.hasDst
        ? `${country.name} observa horario de verano. ${country.dstNotes || 'Los relojes se adelantan una hora durante el periodo estival para maximizar las horas de luz natural.'}`
        : `${country.name} no aplica horario de verano. Los relojes oficiales permanecen constantes durante todo el año.`
    },
    {
      question: `¿Cuántos husos horarios atraviesan ${country.name}?`,
      answer: `${country.name} abarca ${country.timezones.length} ${country.timezones.length > 1 ? 'zonas horarias oficiales IANA' : 'zona horaria oficial IANA'} (${country.timezones.slice(0, 3).join(', ')}${country.timezones.length > 3 ? ' entre otras' : ''}).`
    },
    {
      question: `¿Cuáles son los horarios laborales y comerciales típicos en ${country.name}?`,
      answer: `El horario de oficina corporativo habitual en ${country.name} se desarrolla de lunes a viernes entre las 09:00 y las 17:00 o 18:00 hora local.`
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Ciudades en ${country.name}`,
    description: `Ciudades metropolitanas y relojes en tiempo real en ${country.name}.`,
    url: `https://www.timenumbers.com/es/cities/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.timenumbers.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Ciudades', item: 'https://www.timenumbers.com/es/cities' },
        { '@type': 'ListItem', position: 3, name: country.name, item: `https://www.timenumbers.com/es/cities/${slug}` },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JsonLd type="faq" data={countryFaqsEs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs & Header */}
        <div className="space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Ciudades', url: '/es/cities' },
              { name: country.name, url: `/es/cities/${slug}` },
            ]}
            locale="es"
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <span className="text-base">{country.flag}</span>
                Relojes Municipales de {country.name}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Ciudades de {country.name}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Explora relojes digitales verificados en tiempo real, horas de salida del sol y husos horarios para las urbes metropolitanas de {country.name}.
              </p>
            </div>

            <Link
              href={`/es/countries/${country.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ver Perfil Completo de {country.name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Filtered Cities Client */}
        <CitiesDirectoryClient
          initialCities={cities}
          countryFilter={country.name}
          countryName={country.name}
          locale="es"
        />

        {/* Country Time Guide Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Estructura Horaria y Husos Regionales en {country.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Capital Nacional y Horario Administrativo</h3>
              <p>
                Como capital soberana de {country.name}, {country.capital} coordina la administración pública, el sector bancario y las operaciones diplomáticas.
                La hora civil de {country.capital} establece la pauta para transmisiones oficiales, mercados financieros y logística de transporte.
              </p>
              <p>
                Con una población estimada de {country.population}, {country.name} representa un punto clave de desarrollo comercial en la región.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">Horario de Verano y Ajustes Estacionales</h3>
              <p>
                {country.hasDst
                  ? `${country.name} realiza cambios estacionales de horario de verano. ${country.dstNotes || 'Durante los meses de verano, los relojes se adelantan una hora para optimizar el consumo de energía eléctrica y alargar la tarde.'}`
                  : `${country.name} conserva una hora estándar continua durante los doce meses del año sin modificaciones en los relojes, facilitando la coordinación internacional.`}
              </p>
              <p>
                Todos los relojes municipales en TimeNumbers se sincronizan con servidores atómicos NTP y la base de datos de zonas horarias IANA para garantizar cero desfase de segundos.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic FAQ Accordion */}
        <FaqAccordion
          items={countryFaqsEs}
          title={`Preguntas Frecuentes sobre la Hora en ${country.name}`}
          subtitle={`Detalles esenciales de husos horarios, desfases de la capital y recomendaciones de coordinación para ${country.name}.`}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub currentPath={`/es/cities/${slug}`} title="Explora Todas las Ciudades y Calendarios Globales" />
      </div>
    </div>
  );
}
