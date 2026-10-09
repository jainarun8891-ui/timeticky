import React from 'react';
import { notFound } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug } from '@/lib/geo/city-lookup';
import { SunriseSunsetClient } from '@/components/tools/SunriseSunsetClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Sun, Camera, Compass, Clock, Globe } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const popular = ['delhi', 'new-york', 'london', 'paris', 'tokyo', 'sydney', 'mumbai', 'dubai', 'singapore', 'berlin', 'san-francisco', 'toronto'];
  return popular.map(city => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);
  if (!city) return buildPageMetadata('Ciudad no encontrada', 'Horas de sol no encontradas.', `/sun/${rawSlug}`, 'es');

  const cleanSlug = getCityRootSlug(city);
  return buildPageMetadata(
    `Amanecer y Atardecer en ${city.name}, ${city.country} Hoy (Horarios Solares)`,
    `Horas exactas de salida del sol, puesta de sol, amanecer, crepúsculo civil y duración del día en ${city.name} (${city.country}) hoy. Coordenadas: ${city.lat.toFixed(2)}°, ${city.lng.toFixed(2)}°. Predicciones solares NOAA de alta precisión.`,
    `/sun/${cleanSlug}`,
    'es'
  );
}

export default async function CitySunriseSunsetPageEs({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const cleanSlug = getCityRootSlug(city);
  const isNorthern = city.lat >= 0;
  const absLat = Math.abs(city.lat);
  const isHighLat = absLat > 45;
  const isTropical = absLat < 23.5;

  const faqs = [
    {
      question: `¿A qué hora amanece y atardece en ${city.name} hoy?`,
      answer: `Las horas exactas de amanecer y atardecer en ${city.name} (${city.country}) se calculan utilizando algoritmos de efemérides solares NOAA de alta precisión para las coordenadas ${city.lat.toFixed(4)}° de latitud y ${city.lng.toFixed(4)}° de longitud, considerando la refracción atmosférica (34 minutos de arco) y la elevación.`
    },
    {
      question: `¿Cuánto dura la luz del día en ${city.name} en las diferentes estaciones?`,
      answer: isTropical
        ? `Ubicada a una latitud de ${city.lat.toFixed(2)}°, ${city.name} se encuentra en la zona tropical. Por ello, la duración del día se mantiene muy estable durante todo el año, variando menos de una hora entre solsticios (típicamente entre 11,5 y 12,8 horas).`
        : isHighLat
        ? `En la latitud ${city.lat.toFixed(2)}°, ${city.name} experimenta notables variaciones estacionales. En pleno verano la luz solar se extiende hasta 16-17 horas con crepúsculos prolongados, mientras que en pleno invierno se reduce a aproximadamente 7,5-8,5 horas.`
        : `En la latitud ${city.lat.toFixed(2)}°, ${city.name} experimenta variaciones estacionales templadas. El día dura unas 14-15 horas en verano y alrededor de 9-10 horas en pleno invierno.`
    },
    {
      question: `¿Cuándo son la Hora Dorada y la Hora Azul en ${city.name}?`,
      answer: `La Hora Dorada de la mañana inicia con el amanecer y dura unos 45-60 minutos; la vespertina comienza una hora antes del atardecer. La Hora Azul ocurre justo tras la puesta de sol (y antes del amanecer) durante el crepúsculo civil cuando el sol está entre 0° y 6° bajo el horizonte, tiñendo el cielo de tonos azul profundo e índigo.`
    },
    {
      question: `¿Cuándo ocurre el Mediodía Solar en ${city.name}?`,
      answer: `El mediodía solar en ${city.name} es el momento astronómico exacto en que el sol cruza el meridiano local (${city.lng.toFixed(2)}° longitud) y alcanza su altitud máxima diaria. Dependiendo de la ecuación del tiempo y el horario de verano, suele caer entre las 11:45 y las 13:30 en el huso ${city.timezone}.`
    },
    {
      question: `¿Cuánto dura el crepúsculo civil en ${city.name}?`,
      answer: `En ${city.name}, el crepúsculo civil suele durar entre 25 y 45 minutos tras la puesta de sol. Debido al ángulo de descenso solar según la latitud (${city.lat.toFixed(2)}°), la duración crepuscular aumenta en los meses de verano.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { name: 'Sol', url: '/es/sun' },
          { name: `Horarios Solares en ${city.name}`, url: `/es/sun/${cleanSlug}` },
        ]}
        locale="es"
      />
      <JsonLd type="faq" data={faqs} />
      <JsonLd
        type="application"
        data={{
          name: `Calculadora Solar de ${city.name}`,
          category: "UtilitiesApplication",
          description: `Horarios diarios de amanecer, atardecer, crepúsculo civil y mediodía solar en ${city.name}, ${city.country}.`
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            <Sun className="w-3.5 h-3.5" />
            <span>Efemérides Solares para {city.name}, {city.country}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Amanecer y Atardecer en {city.name}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Horarios diarios precisos de amanecer, ocaso, crepúsculo civil, mediodía solar y duración del día en {city.name}. Coordenadas: {city.lat.toFixed(4)}° {city.lat >= 0 ? 'N' : 'S'}, {Math.abs(city.lng).toFixed(4)}° {city.lng >= 0 ? 'E' : 'O'} ({city.timezone}).
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <Link
              href={`/es/time/${cleanSlug}`}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Hora actual en {city.name}</span>
            </Link>
            <Link
              href={`/es/moon/${cleanSlug}`}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Fases lunares en {city.name}</span>
            </Link>
          </div>
        </div>
      </div>

      <SunriseSunsetClient initialCity={city} />

      {/* In-Depth City Solar Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Compass className="w-4 h-4" />
            <span>Características Geográficas y Solares</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Perfil Solar y Ciclos Estacionales en {city.name}
          </h2>
          <p>
            Situada a <strong>{city.lat.toFixed(4)}° de latitud</strong> y <strong>{city.lng.toFixed(4)}° de longitud</strong>, {city.name} funciona bajo la zona horaria <strong>{city.timezone}</strong>. La trayectoria solar se rige por la inclinación axial de la Tierra:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Hemisferio y Zona</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                Hemisferio {isNorthern ? 'Norte' : 'Sur'} • {isTropical ? 'Zona Tropical' : isHighLat ? 'Subpolar / Alta Templada' : 'Zona Templada'}
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                {isNorthern ? 'El día más largo ocurre cerca del 21 de junio; el más corto cerca del 21 de diciembre.' : 'El día más largo ocurre cerca del 21 de diciembre; el más corto cerca del 21 de junio.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Refracción Atmosférica</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                +34 Minutos de Arco (~0.566°)
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                La curvatura atmosférica hace visible el sol unos 2,5 a 3,5 minutos antes del amanecer geométrico real en {city.name}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Variación del Mediodía Solar</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                Deriva de Ecuación del Tiempo
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                Según la época del año, el mediodía astronómico exacto en {city.name} se desvía del mediodía del reloj hasta en ±16 minutos debido a la excentricidad orbital.
              </p>
            </div>
          </div>
        </section>

        {/* Photography Lighting Guide */}
        <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <Camera className="w-4 h-4" />
            <span>Guía para Fotografía y Cinematografía</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Ventanas de Hora Dorada y Hora Azul en {city.name}
          </h2>
          <p>
            Para fotógrafos, creadores de contenido y videógrafos en {city.name}, las horas alrededor del amanecer y atardecer ofrecen la luz natural más suave y favorecedora:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-slate-800/70 border border-amber-200/70 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-bold text-amber-900 dark:text-amber-300">Hora Dorada (Espectro Cálido)</strong>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">Sol +6° a 0°</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                La radiación atraviesa una masa atmosférica más amplia, dispersando los fotones azules y bañando los edificios y paisajes de {city.name} en tonos cálidos dorados y terracota con sombras largas y difusas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-slate-800/70 border border-indigo-200/70 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-bold text-indigo-900 dark:text-indigo-300">Hora Azul (Índigo y Cobalto)</strong>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-200/60 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200">Sol 0° a -6°</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Durante el crepúsculo civil, la absorción de ozono filtra las longitudes de onda rojas, creando un cielo cobalto profundo que contrasta perfectamente con la iluminación urbana de {city.name}.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={faqs} />
      </div>

      <RelatedLinksHub
        currentPath={`/sun/${cleanSlug}`}
        title={`Explorar más herramientas para ${city.name}`}
        subtitle={`Consulta relojes en vivo, fases de la luna o compara ${city.name} con otras ciudades globales.`}
        locale="es"
      />
    </div>
  );
}
