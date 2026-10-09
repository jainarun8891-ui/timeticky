import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { BestTimeToCallClient } from '@/app/best-time-to-call/BestTimeToCallClient';

export const metadata: Metadata = buildPageMetadata(
  'Mejor Hora para Llamar entre Ciudades y Países — Calculadora',
  'Descubre la mejor hora para llamar a alguien en otra ciudad o país sin despertarle. Horas de solapamiento diurno y laboral para llamadas internacionales.',
  '/best-time-to-call',
  'es'
);

const FAQS_ES = [
  {
    question: '¿Cómo encontrar la mejor hora para llamar a otra zona horaria?',
    answer: 'Compara las horas de vigilia y trabajo de ambas ubicaciones. La "ventana de oro" son las 3 a 5 horas del día en las que ambas partes están entre las 9:00 AM y las 5:00 PM (para trabajo) o entre las 8:00 AM y las 9:00 PM (para llamadas personales). Nuestra calculadora resalta estas horas coincidentes automáticamente.'
  },
  {
    question: '¿Cuál es la mejor hora para llamar a España desde México?',
    answer: 'España tiene generalmente entre 7 y 8 horas de adelanto respecto al centro de México. La mejor hora para llamar a España desde México es por la mañana temprano en México (entre 8:00 AM y 11:00 AM), lo que equivale a las 3:00 PM y 6:00 PM en España.'
  },
  {
    question: '¿Cuál es la mejor hora para llamar a Estados Unidos desde España o Europa?',
    answer: 'La costa este de EE. UU. (Nueva York) tiene 6 horas menos que la Europa central (Madrid/París). La mejor hora para llamar es por la tarde en Europa (de 2:00 PM a 6:00 PM), que corresponde a la mañana laboral en Nueva York (de 8:00 AM a 12:00 PM).'
  },
  {
    question: '¿Cuál es la norma de cortesía internacional para llamadas no programadas?',
    answer: 'La norma universal de etiqueta recomienda no llamar nunca antes de las 8:00 AM ni después de las 9:00 PM de la hora local de la persona que recibe la llamada, a menos que sea una emergencia previamente acordada.'
  }
];

export default function BestTimeToCallPageEs() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TimeNumbers Mejor Hora para Llamar',
    applicationCategory: 'CommunicationApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Calcula horas de coincidencia diurna y laboral para encontrar el momento ideal para realizar llamadas internacionales entre ciudades.'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs
        items={[{ name: 'Mejor Hora para Llamar', url: '/es/best-time-to-call' }]}
        locale="es"
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Mejor Hora para Llamar', url: '/es/best-time-to-call' },
        ]}
      />
      <JsonLd type="faq" data={FAQS_ES} />

      <BestTimeToCallClient locale="es" />

      {/* Plain Spanish Layman's Guide */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Cómo Elegir la Hora Ideal para Llamar sin Complicarte con Husos Horarios
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          A todos nos ha pasado: necesitas hablar con un familiar, cliente o compañero en el extranjero, pero calcular la diferencia horaria mentalmente genera dudas. Un simple error puede hacer que llames a un cliente en su cena o despiertes a alguien a las 3:00 de la madrugada.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Nuestra calculadora compara la hora local real hora por hora entre más de 500 ciudades del mundo. Filtrando las horas de sueño y destacando el horario laboral compartido, puedes coordinar tus llamadas en cuestión de segundos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ventana Verde vs. Ventana Amarilla
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <strong>Verde (Ventana Óptima)</strong> indica que ambas personas se encuentran en su jornada laboral habitual (9 AM a 5 PM) o despiertas (8 AM a 9 PM). <strong>Amarillo (Horario Límite)</strong> señala que una persona está muy temprano por la mañana (7–8 AM) o al final de la tarde (9–10 PM).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Atención a los Cambios de Horario de Verano
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              No todos los países cambian la hora el mismo fin de semana. Por ejemplo, Estados Unidos y Europa cambian sus relojes con semanas de diferencia en marzo y octubre. Nuestro motor toma en cuenta las reglas oficiales IANA para darte siempre la hora exacta.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={FAQS_ES}
        title="Preguntas Frecuentes sobre Llamadas entre Distintos Países"
        subtitle="Respuestas claras sobre normas de etiqueta internacional, desfases horarios y mejores momentos para llamar."
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explora Más Herramientas de Zonas Horarias y Reuniones" />
    </div>
  );
}
