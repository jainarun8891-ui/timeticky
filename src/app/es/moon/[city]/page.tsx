import React from 'react';
import { notFound } from 'next/navigation';
import { findCityByRootSlug, getCityRootSlug } from '@/lib/geo/city-lookup';
import { MoonClient } from '@/app/moon/MoonClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Moon, Sparkles, Orbit, Compass, Clock, Sun, MapPin } from 'lucide-react';
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
  if (!city) return buildPageMetadata('Ciudad no encontrada', 'Efemérides lunares no encontradas.', `/moon/${rawSlug}`, 'es');

  const cleanSlug = getCityRootSlug(city);
  return buildPageMetadata(
    `Fase Lunar en ${city.name}, ${city.country} Hoy (Iluminación en Vivo)`,
    `Fase lunar exacta de esta noche, porcentaje de iluminación superficial, edad lunar y calendario lunar para ${city.name} (${city.country}). Coordenadas: ${city.lat.toFixed(2)}°, ${city.lng.toFixed(2)}°. Fechas de próxima Luna Llena y Luna Nueva.`,
    `/moon/${cleanSlug}`,
    'es'
  );
}

export default async function CityMoonPageEs({ params }: Props) {
  const { city: rawSlug } = await params;
  const city = findCityByRootSlug(rawSlug);

  if (!city) {
    notFound();
  }

  const cleanSlug = getCityRootSlug(city);
  const isNorthern = city.lat >= 0;
  const absLat = Math.abs(city.lat);
  const isTropical = absLat < 23.5;

  const faqs = [
    {
      question: `¿Cuál es la fase lunar actual en ${city.name} esta noche?`,
      answer: `La fase lunar de esta noche y el porcentaje de iluminación de la superficie en ${city.name} (${city.country}) se calculan utilizando modelos astronómicos sinódicos. Dado que la fase lunar se rige por la alineación celeste del Sol, la Tierra y la Luna, la fase y el porcentaje de iluminación son idénticos a nivel mundial en cualquier segundo UTC.`
    },
    {
      question: `¿Cómo se observa visualmente la Luna desde la latitud de ${city.name} (${city.lat.toFixed(2)}°)?`,
      answer: isTropical
        ? `Ubicados en la latitud tropical ${city.lat.toFixed(2)}°, los observadores en ${city.name} aprecian con frecuencia la característica "luna húmeda" o "luna sonriente", donde el creciente aparece iluminado horizontalmente en la parte inferior como un bote celeste brillante al ascender y ponerse cerca del cenit.`
        : isNorthern
        ? `Situados en el hemisferio norte a ${city.lat.toFixed(2)}° de latitud, los observadores en ${city.name} miran hacia el sur para contemplar la Luna. Durante las fases crecientes, la iluminación comienza en el limbo derecho y se expande hacia la izquierda; las fases menguantes disminuyen de derecha a izquierda.`
        : `Situados en el hemisferio sur a ${city.lat.toFixed(2)}° de latitud, los observadores en ${city.name} miran hacia el norte para observar la Luna. La orientación óptica está invertida en comparación con el hemisferio norte: la iluminación creciente comienza en el borde izquierdo y avanza hacia la derecha rumbo a la Luna Llena.`
    },
    {
      question: `¿Afecta la fase lunar a las mareas en ${city.name}?`,
      answer: `Sí. Las fuerzas gravitacionales combinadas de la Luna y el Sol alcanzan su punto máximo durante la Luna Nueva y la Luna Llena (mareas vivas o sicigias), produciendo los mayores rangos de marea alta y baja. Durante los cuartos de luna (mareas muertas o de cuadratura), las fuerzas gravitacionales se contrarrestan parcialmente.`
    },
    {
      question: `¿Cuándo son la próxima Luna Llena y Luna Nueva en ${city.name}?`,
      answer: `El ciclo lunar sinódico dura exactamente 29,53059 días (29 días, 12 horas, 44 minutos). El módulo astronómico de TimeNumbers proyecta las efemérides en tiempo real para indicar la fecha y hora exacta en la zona horaria ${city.timezone}.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { name: 'Luna', url: '/es/moon' },
          { name: `Fase Lunar en ${city.name}`, url: `/es/moon/${cleanSlug}` },
        ]}
        locale="es"
      />
      <JsonLd type="faq" data={faqs} />
      <JsonLd
        type="application"
        data={{
          name: `Calculadora de Fase Lunar de ${city.name}`,
          category: "UtilitiesApplication",
          description: `Efemérides lunares en vivo, iluminación de superficie y cuenta regresiva a Luna Llena para ${city.name}, ${city.country}.`
        }}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Moon className="w-3.5 h-3.5" />
            <span>Efemérides Lunares de {city.name}, {city.country}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Fase Lunar en {city.name}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Iluminación lunar exacta de esta noche, edad del ciclo sinódico y calendario lunar para {city.name}. Coordenadas: {city.lat.toFixed(4)}° {city.lat >= 0 ? 'N' : 'S'}, {Math.abs(city.lng).toFixed(4)}° {city.lng >= 0 ? 'E' : 'O'} ({city.timezone}).
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
              href={`/es/sun/${cleanSlug}`}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors inline-flex items-center gap-1.5"
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Salida y puesta del sol en {city.name}</span>
            </Link>
          </div>
        </div>
      </div>

      <MoonClient initialCity={city} />

      {/* Deep Scientific Editorial Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Orbit className="w-4 h-4" />
            <span>Geometría y Mecánica Orbital</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Perspectiva Lunar y Orientación Óptica en {city.name}
          </h2>
          <p>
            Al situarse a <strong>{city.lat.toFixed(4)}° de latitud</strong>, la observación lunar en {city.name} está determinada por la perspectiva visual angular respecto al plano ecuatorial de la Tierra:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Hemisferio de Observación</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                Hemisferio {isNorthern ? 'Norte' : 'Sur'}
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                {isNorthern
                  ? 'En el hemisferio norte, la Luna Creciente se ilumina en forma de "D", mientras que la Menguante forma una "C".'
                  : 'En el hemisferio sur, la orientación se invierte: la Luna Creciente parece una "C" y la Menguante una "D".'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Ciclo Sinódico vs Sideral</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                29,53 Días Sinódicos
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                Aunque la Luna completa una órbita en 27,3 días siderales, la Tierra avanza alrededor del Sol, necesitando 2,2 días adicionales para alinearse.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-bold text-slate-500 block">Fuerza Mareomotriz</span>
              <strong className="text-sm text-slate-900 dark:text-white block">
                Atracción Gravitacional
              </strong>
              <p className="text-xs text-slate-500 pt-1">
                El gradiente gravitatorio lunar ejerce una atracción diferencial sobre los océanos terrestres, modulando los ritmos de pleamar y bajamar.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion items={faqs} />
      </div>

      <RelatedLinksHub
        currentPath={`/moon/${cleanSlug}`}
        title={`Explorar más herramientas para ${city.name}`}
        subtitle={`Consulta horarios de salida del sol, relojes atómicos o compara zonas horarias internacionales.`}
        locale="es"
      />
    </div>
  );
}
