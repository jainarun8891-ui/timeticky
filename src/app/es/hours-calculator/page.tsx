import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { HoursCalculatorClient } from '@/app/hours-calculator/HoursCalculatorClient';

export const metadata: Metadata = buildPageMetadata(
  'Calculadora de Horas Trabajadas y Nómina Semanal',
  'Calcula tus horas trabajadas diarias y semanales con pausas de almuerzo, horas extras (1.5x) y salario bruto. Copia o exporta a CSV gratis y privado.',
  '/hours-calculator',
  'es'
);

const FAQS_ES = [
  {
    question: '¿Cómo calcular el total de horas trabajadas en un día?',
    answer: 'Resta la hora de entrada a la hora de salida, y luego descuenta el tiempo de descanso o pausa para almorzar. Por ejemplo: si entraste a las 8:30 AM y saliste a las 5:00 PM (8 horas y 30 minutos) con 30 minutos de almuerzo no remunerado, trabajaste exactamente 8.00 horas.'
  },
  {
    question: '¿Cómo convertir minutos a horas decimales para la nómina?',
    answer: 'Divide el número de minutos entre 60. Por ejemplo: 15 minutos equivalen a 0.25 horas (15 ÷ 60), 30 minutos a 0.50 horas (30 ÷ 60), y 45 minutos a 0.75 horas (45 ÷ 60). De este modo, 7 horas y 30 minutos son 7.50 horas decimales.'
  },
  {
    question: '¿Cómo se calculan las horas extras?',
    answer: 'Por regla general en la mayoría de legislaciones laborales, las horas que excedan la jornada semanal estándar (generalmente 40 horas) se abonan como horas extraordinarias con un recargo del 50% (tarifa x 1.5).'
  },
  {
    question: '¿Se guardan mis horas o datos de salario en algún servidor?',
    answer: 'No. TimeNumbers ejecuta todos los cálculos de manera 100% local en tu navegador. Tus horarios, pausas y tarifas jamás se envían ni se guardan en servidores externos.'
  },
  {
    question: '¿Puedo exportar o imprimir mi hoja de horas semanales?',
    answer: 'Sí. Puedes pulsar "Descargar CSV" para abrir tu registro en Excel o Google Sheets, o hacer clic en "Copiar Resumen" para pegarlo directamente en un correo electrónico o mensaje para tu jefe o cliente.'
  }
];

export default function HoursCalculatorPageEs() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TimeNumbers Calculadora de Horas de Trabajo',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires modern web browser with JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Calculadora de horas trabajadas y nómina gratuita con deducción de pausas, horas extras y descarga en CSV.'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs
        items={[{ name: 'Calculadora de Horas', url: '/es/hours-calculator' }]}
        locale="es"
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Calculadora de Horas', url: '/es/hours-calculator' },
        ]}
      />
      <JsonLd type="faq" data={FAQS_ES} />

      <HoursCalculatorClient locale="es" />

      {/* Plain Spanish Layman's Guide */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Cómo Calcular las Horas de Trabajo en Palabras Sencillas
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Calcular tus horas a mano o mentalmente suele generar errores que afectan tu salario. Ya seas trabajador autónomo que factura por horas, empleado que revisa su nómina o encargado de equipo, esta herramienta simplifica el cálculo sin complicaciones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Turnos Nocturnos que Cruzan Medianoche
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              ¿Trabajas en turno de noche? Nuestra calculadora detecta automáticamente cuando tu turno cruza las doce de la noche (por ejemplo, de 10:00 PM a 6:00 AM) y calcula las horas totales sin desajustes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Horas Decimales vs. Minutos del Reloj
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Al multiplicar las horas por tu tarifa, no puedes multiplicar minutos directamente ($20 por 7 horas y 30 mins NO es $20 x 7.30). Es necesario convertir los 30 minutos a decimal (0.50), sumando 7.50 horas x $20 = $150.00. La calculadora lo hace automáticamente por ti.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqAccordion
        items={FAQS_ES}
        title="Preguntas Frecuentes sobre el Cálculo de Horas"
        subtitle="Respuestas a preguntas habituales sobre hojas de horas, decimales y horas extras."
      />

      {/* Related Tools Hub */}
      <RelatedLinksHub title="Explora Más Herramientas de Productividad y Tiempo" />
    </div>
  );
}
