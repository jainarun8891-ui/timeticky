import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { TimeSliderClient } from '@/components/slider/TimeSliderClient';
import { Sliders, Clock, Globe, Sparkles, Users, BookOpen, Calendar } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Deslizador Horario Mundial Interactivo — Comparador de Reuniones Multiciudad',
  'Deslizador visual de 24 horas para comparar husos horarios entre varias ciudades a la vez. Encuentra franjas de trabajo comunes, evita cálculos mentales y exporta reuniones a Google Calendar o Slack.',
  '/es/time-slider'
);

const SPANISH_TIME_SLIDER_FAQS: FaqItem[] = [
  {
    question: '¿Cómo funciona el deslizador horario interactivo?',
    answer:
      'El deslizador coloca varias ciudades del mundo en una línea horizontal de 24 horas perfectamente sincronizada. Cada bloque horario está identificado por colores: verde representa el horario de trabajo habitual (9:00 a 17:00), amarillo señala las horas de mañana o tarde flexibles, y azul oscuro indica las horas de descanso nocturno. Al deslizar el cursor o hacer clic sobre cualquier hora, todas las ciudades se actualizan al instante.'
  },
  {
    question: '¿Cómo encontrar la hora más justa para una reunión con personas en varios países?',
    answer:
      'Busca las columnas verticales donde la mayor cantidad de ciudades coincida en color verde o amarillo. Para equipos distribuidos entre España/Europa, Estados Unidos y Latinoamérica, las primeras horas de la tarde europea (de 14:00 a 18:00 en Madrid) suelen encajar a la perfección con la mañana de Nueva York, México o Buenos Aires.'
  },
  {
    question: '¿Qué ocurre cuando la conversión de hora cruza la medianoche hacia el día siguiente?',
    answer:
      'Dado que la diferencia entre extremos del mundo supera las 12 horas, una llamada fijada a última hora de la tarde en América puede corresponder ya a la mañana del día siguiente en Tokio o Sídney. Nuestra herramienta indica de manera visible el día de la semana y el desfase de fecha (+1 día) para evitar equivocaciones.'
  },
  {
    question: '¿Puedo copiar la propuesta de horario directamente a Slack o Teams?',
    answer:
      'Sí. Haz clic en el botón "Copiar para Slack / Email" debajo de la cuadrícula para obtener un bloque de texto claro y listo para pegar, con la hora convertida de manera personalizada para la ciudad de cada participante.'
  },
  {
    question: '¿El deslizador tiene en cuenta el cambio de hora de verano (DST)?',
    answer:
      'Sí. Utilizamos la base de datos oficial IANA (tzdata). Cuando un país adelanta o retrasa su reloj en primavera u otoño, todas las cuadrículas y diferencias se actualizan con precisión atómica.'
  }
];

export default function SpanishTimeSliderPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeNumbers Deslizador Horario Mundial Interactivo',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requiere navegador web moderno con JavaScript habilitado',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Herramienta visual de 24 horas para comparar husos horarios entre múltiples ciudades del mundo, descubrir solapamientos laborales y generar invitaciones de calendario.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SPANISH_TIME_SLIDER_FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ name: 'Deslizador Horario Mundial', url: '/es/time-slider' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="space-y-3 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>Cronometría Visual y Coordinación Internacional</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Deslizador Horario Mundial y Planificador Multiciudad
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Olvídate de hacer cálculos mentales al fijar reuniones internacionales. Compara múltiples ciudades cara a cara en una línea de tiempo de 24 horas. Desliza el cursor para descubrir franjas de trabajo comunes, respeta el descanso de tu equipo y exporta citas directamente a Google Calendar o Slack.
        </p>
      </div>

      {/* Main Interactive Client */}
      <TimeSliderClient locale="es" />

      {/* Humanized Layman Educational Guide Section in Spanish */}
      <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Coordinación Remota en Lenguaje Sencillo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Cómo Organizar Llamadas Internacionales Sin Estrés ni Confusiones
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Coordinar una llamada o videoconferencia con participantes en tres continentes no debería parecer un problema matemático complejo. Cuando colaboran compañeros en Madrid, Ciudad de México, Los Ángeles y Tokio, un calendario tradicional no basta para mostrar el coste humano de fijar una reunión. La visualización horizontal de 24 horas resuelve esta fricción para siempre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Card 1: Tres zonas biológicas */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Las 3 Bandas de Energía Humana
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Nuestro deslizador clasifica cada hora en tres códigos intuitivos: <strong>Verde (9:00 a 17:00)</strong> es la franja de máxima concentración y productividad. <strong>Amarillo (7:00-9:00 y 17:00-21:00)</strong> es aceptable para reuniones ágiles. <strong>Azul Oscuro (21:00 a 7:00)</strong> representa el descanso personal indiscutible.
            </p>
          </div>

          {/* Card 2: El cambio de fecha */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Evita el Error del &ldquo;Día Siguiente&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              La equivocación más habitual al coordinar a través del Pacífico o con Asia es pasar por alto la fecha del calendario. Cuando alguien en San Francisco fija una llamada un jueves a las 16:00, en Tokio o Sídney ya es viernes por la mañana. Los avisos de fecha eliminan este fallo por completo.
            </p>
          </div>

          {/* Card 3: Protocolo equitativo */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              El Protocolo de Solapamiento Justo
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Cuando la distancia horaria supera las 10 o 12 horas, coincidir dentro de un horario 9 a 5 estricto es físicamente inviable. Los mejores equipos globales rotan el horario de sus sincronizaciones semanales para repartir equitativamente la carga de atender reuniones fuera de jornada.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          items={SPANISH_TIME_SLIDER_FAQS}
          title="Preguntas Frecuentes sobre la Coordinación Horaria Multiciudad"
          subtitle="Consejos prácticos sobre conversión horaria, exportación a calendarios y buenas prácticas para equipos distribuidos."
        />
      </div>

      {/* Related Chronometry Tools */}
      <RelatedLinksHub
        currentPath="/es/time-slider"
        title="Explora Más Herramientas de Tiempo y Productividad"
        subtitle="Compara relojes mundiales, consulta horarios de bolsas y planifica reuniones globales con total precisión."
      />
    </main>
  );
}
