import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { MilitaryTimeClient } from '@/app/military-time/MilitaryTimeClient';

export const metadata: Metadata = buildPageMetadata(
  'Conversor de Hora Militar a Hora Normal (Reloj de 24 Horas)',
  'Convierte hora militar de 24 horas a formato 12 horas AM/PM fácilmente. Incluye pronunciación, trucos matemáticos sencillos y tabla completa de 0000 a 2400.',
  '/military-time',
  'es'
);

const FAQS_ES = [
  {
    question: '¿Cómo convertir horas de la tarde (PM) a hora militar?',
    answer: 'Para convertir cualquier hora de la tarde o noche a hora militar, simplemente suma 12 a la hora estándar. Por ejemplo, 5:00 PM + 12 = 17:00 (escrito como 1700 horas en formato militar). Los minutos nunca cambian.'
  },
  {
    question: '¿Cómo convertir horas de la mañana (AM) a hora militar?',
    answer: 'Las horas de la mañana desde la 1:00 AM hasta las 11:59 AM son prácticamente idénticas. Solo agrega un cero adelante si es un solo dígito: las 7:00 AM se convierten en las 0700 horas. La medianoche (12:00 AM) se escribe como 0000.'
  },
  {
    question: '¿Por qué los militares, hospitales y pilotos usan el reloj de 24 horas?',
    answer: 'Lo utilizan para eliminar por completo cualquier confusión entre la mañana y la tarde. En emergencias médicas, navegación aérea internacional y operaciones de defensa, confundir las 7:00 AM con las 7:00 PM podría tener consecuencias fatales. El reloj de 24 horas garantiza que cada minuto del día tenga un número único e inconfundible.'
  },
  {
    question: '¿Qué hora es las 1700 en hora normal?',
    answer: 'Las 1700 en hora militar equivalen exactamente a las 5:00 PM en formato estándar de 12 horas.'
  },
  {
    question: '¿Qué hora es las 2100 en hora normal?',
    answer: 'Las 2100 en hora militar equivalen exactamente a las 9:00 PM en formato estándar de 12 horas.'
  },
  {
    question: '¿La medianoche se escribe 0000 o 2400?',
    answer: 'Ambas formas son correctas según el contexto. 0000 marca el inicio exacto del nuevo día, mientras que 2400 se utiliza para indicar el final del día en curso. En relojes digitales y logística militar moderna se prefiere 0000.'
  }
];

export default function MilitaryTimePageEs() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TimeNumbers Conversor de Hora Militar a Hora Normal',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Conversor interactivo de hora militar de 24 horas con pronunciación, trucos matemáticos y tabla completa de referencia de 0000 a 2400.'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs
        items={[{ name: 'Hora Militar y 24 Horas', url: '/es/military-time' }]}
        locale="es"
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Hora Militar y 24 Horas', url: '/es/military-time' },
        ]}
      />
      <JsonLd type="faq" data={FAQS_ES} />

      <MilitaryTimeClient locale="es" />

      {/* Plain Spanish Layman's Guide */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Cómo Funciona la Hora Militar en Palabras Sencillas
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          La mayoría de nosotros estamos acostumbrados al reloj de 12 horas, que divide el día en dos mitades: <strong>AM</strong> (mañana) y <strong>PM</strong> (tarde y noche). Aunque es muy común, puede prestarse a confusiones, como programar una alarma para las 7:00 AM en lugar de las 7:00 PM.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          La <strong>hora militar</strong> o sistema de 24 horas soluciona esto contando de forma continua desde la medianoche (0000) hasta las 2359. Cada momento del día tiene su propio número único de cuatro dígitos, por lo que nunca hay duda de si es de día o de noche.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              El Truco Mental de los 2 Segundos
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Siempre que veas un número militar superior a 1200 (como 1500 o 2100), simplemente resta 12 a los primeros dos dígitos:
              <br />• 1500 − 12 = <strong>3:00 PM</strong>
              <br />• 1800 − 12 = <strong>6:00 PM</strong>
              <br />• 2200 − 12 = <strong>10:00 PM</strong>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cómo se Pronuncia en Español
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              En español militar o aeronáutico se enuncian las horas y minutos claramente:
              <br />• 0800 = &ldquo;Cero ocho cero cero horas&rdquo; u &ldquo;Ocho en punto&rdquo;
              <br />• 1430 = &ldquo;Catorce treinta horas&rdquo;
              <br />• 2015 = &ldquo;Veinte quince horas&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={FAQS_ES}
        title="Preguntas Frecuentes sobre la Hora Militar"
        subtitle="Respuestas claras a dudas comunes sobre el cálculo de conversión y reloj de 24 horas."
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explora Más Herramientas y Conversores Horarios" />
    </div>
  );
}
