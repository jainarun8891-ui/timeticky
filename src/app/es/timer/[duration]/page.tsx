import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TimerSuiteClient } from '@/app/timer/TimerSuiteClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { Timer, Clock, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface Props {
  params: Promise<{ duration: string }>;
}

export const dynamicParams = false;

const DURATION_MAP_ES: Record<string, { seconds: number; label: string; name: string; description: string; tips: string; idealFor: string }> = {
  '1-minute': {
    seconds: 60,
    label: '1 Minuto',
    name: 'Temporizador de 1 Minuto',
    description: 'Temporizador online de 1 minuto con alarma sonora. Cuenta atrás precisa para respiración consciente, infusión de té y tareas rápidas.',
    tips: 'Ideal para ejercicios de respiración 4-7-8, tareas relámpago, pausas de pantalla y micro-descansos.',
    idealFor: 'Respiración cuadrada, micro-meditación, té rápido e intervalos de estiramiento.'
  },
  '2-minutes': {
    seconds: 120,
    label: '2 Minutos',
    name: 'Temporizador de 2 Minutos',
    description: 'Temporizador online de 2 minutos con alarma sonora. Perfecto para cepillado dental, planchas abdominales y pausas breves.',
    tips: 'Recomendado por odontólogos de todo el mundo como el intervalo estándar para una higiene bucal óptima.',
    idealFor: 'Cepillado dental, plancha de fitness, té matcha y reseteo mental.'
  },
  '3-minutes': {
    seconds: 180,
    label: '3 Minutos',
    name: 'Temporizador de 3 Minutos',
    description: 'Temporizador de cuenta regresiva de 3 minutos con sonido. Ideal para huevos pasados por agua, debates, discursos y descansos en el gimnasio.',
    tips: 'El intervalo estándar para discursos de debate, presentaciones relámpago y cocción de huevos.',
    idealFor: 'Huevos pasados por agua, oratoria, pausas entre series de pesas y café de goteo.'
  },
  '5-minutes': {
    seconds: 300,
    label: '5 Minutos',
    name: 'Temporizador de 5 Minutos',
    description: 'Temporizador online de 5 minutos con alarma sonora. Ideal para pausas cortas Pomodoro, meditación, cocinar o presentaciones ágiles.',
    tips: 'La duración oficial del descanso corto en el método Pomodoro. Perfecto para beber agua, descansar la vista y despejar la mente.',
    idealFor: 'Pausas Pomodoro, charlas relámpago, meditación y ordenar el escritorio.'
  },
  '10-minutes': {
    seconds: 600,
    label: '10 Minutos',
    name: 'Temporizador de 10 Minutos',
    description: 'Temporizador online de 10 minutos con avisos sonoros. Perfecto para sprints de trabajo enfocado, rutinas de ejercicio y reuniones de pie.',
    tips: 'Un intervalo muy eficaz para entrenamientos por intervalos de alta intensidad (HIIT), reuniones diarias de equipo y lectura concentrada.',
    idealFor: 'Reuniones daily de equipo, entrenamientos HIIT, lectura rápida y relajación guiada.'
  },
  '15-minutes': {
    seconds: 900,
    label: '15 Minutos',
    name: 'Temporizador de 15 Minutos',
    description: 'Temporizador online de 15 minutos con alarma. Ideal para siestas reparadoras, descansos de café y planificación de sprints.',
    tips: 'Científicamente demostrado como la duración idónea para una power nap reparadora sin entrar en fases de sueño profundo que causen letargo.',
    idealFor: 'Power naps reparadoras, planificación de sprint, pausas de café y diario reflexivo.'
  },
  '20-minutes': {
    seconds: 1200,
    label: '20 Minutos',
    name: 'Temporizador de 20 Minutos',
    description: 'Temporizador online de 20 minutos. Diseñado para descanso ocular, sesiones de yoga y bloques de estudio.',
    tips: 'Sigue la regla oftalmológica 20-20-20: cada 20 minutos, enfoca la vista en un punto lejano durante 20 segundos.',
    idealFor: 'Sesiones de yoga, alivio de fatiga visual, intervalos de estudio y cocina a fuego lento.'
  },
  '25-minutes': {
    seconds: 1500,
    label: '25 Minutos',
    name: 'Temporizador de 25 Minutos',
    description: 'Temporizador Pomodoro online de 25 minutos con alarma audible. Diseñado para estudio profundo, redacción y productividad sin distracciones.',
    tips: 'El intervalo clásico de la técnica Pomodoro: 25 minutos de trabajo monotarea ininterrumpido seguidos de 5 minutos de pausa.',
    idealFor: 'Sprints Pomodoro, estudio para exámenes, redacción de documentos y programación.'
  },
  '30-minutes': {
    seconds: 1800,
    label: '30 Minutos',
    name: 'Temporizador de 30 Minutos',
    description: 'Temporizador de cuenta atrás de 30 minutos. Perfecto para repostería, sesiones de estudio, audiolibros y ejercicio aeróbico.',
    tips: 'Duración estándar en calendarios corporativos para reuniones, grabación de podcasts y bloques de tareas académicas.',
    idealFor: 'Estudio intensivo, reuniones de 30 minutos, recetas de horno y carreras de cardio.'
  },
  '45-minutes': {
    seconds: 2700,
    label: '45 Minutos',
    name: 'Temporizador de 45 Minutos',
    description: 'Temporizador de 45 minutos para clases académicas y trabajo profundo con alarma sonora.',
    tips: 'La duración tradicional de clases lectivas universitarias, maximizando la retención cognitiva antes de que aparezca la fatiga mental.',
    idealFor: 'Periodos de clase, programación de software, redacción de tesis y entrenamiento en el gimnasio.'
  },
  '60-minutes': {
    seconds: 3600,
    label: '60 Minutos',
    name: 'Temporizador de 60 Minutos',
    description: 'Temporizador de 60 minutos con aviso sonoro. Bloque completo de una hora para exámenes, estudio y asados de cocina.',
    tips: 'Intervalo clásico de una hora. Ideal para sesiones de estudio silencioso, exámenes de prueba y concentración continua.',
    idealFor: 'Simulacros de examen, estudio de 1 hora, asados en la cocina y bloques de reuniones.'
  },
  '1-hour': {
    seconds: 3600,
    label: '1 Hora',
    name: 'Temporizador de 1 Hora',
    description: 'Temporizador de cuenta regresiva de 1 hora online. Cuenta atrás precisa y resistente a pestañas en segundo plano para estudio y tareas.',
    tips: 'El estándar de oro para bloques estructurados de trabajo profundo (Deep Work). Silencia notificaciones y dedica 60 minutos continuos a proyectos importantes.',
    idealFor: 'Bloques de trabajo profundo, exámenes estándar, asados al horno y redacción creativa.'
  },
  '2-hours': {
    seconds: 7200,
    label: '2 Horas',
    name: 'Temporizador de 2 Horas',
    description: 'Temporizador online de 2 horas con modo de pantalla completa y notificación de alarma sonora.',
    tips: 'Ideal para masterclasses extensas, proyecciones de películas, pruebas de certificación y preparaciones gastronómicas prolongadas.',
    idealFor: 'Exámenes de certificación, sesiones de código prolongadas, experimentos y cocina lenta.'
  },
};

export async function generateStaticParams() {
  return Object.keys(DURATION_MAP_ES).map(duration => ({ duration }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { duration } = await params;
  const item = DURATION_MAP_ES[duration.toLowerCase()];

  if (!item) {
    return buildPageMetadata('Temporizador No Encontrado', 'Duración de temporizador no encontrada.', `/es/timer/${duration.toLowerCase()}`);
  }

  return buildPageMetadata(
    `${item.name} Online con Alarma | TimeNumbers`,
    item.description,
    `/es/timer/${duration.toLowerCase()}`
  );
}

export default async function EsTimerDurationPage({ params }: Props) {
  const { duration } = await params;
  const item = DURATION_MAP_ES[duration.toLowerCase()];

  if (!item) {
    notFound();
  }

  const timerFaqs = [
    {
      question: `¿Qué precisión tiene el ${item.name} online?`,
      answer: `TimeNumbers utiliza marcas de tiempo de alta resolución de la API Performance del navegador y del reloj del sistema operativo, eliminando la desviación temporal incluso si el dispositivo entra en ahorro de energía.`
    },
    {
      question: `¿Seguirá funcionando el ${item.name} si cambio de pestaña o bloqueo la pantalla?`,
      answer: `Sí. El temporizador calcula el tiempo restante basándose en timestamps absolutos. Si el navegador ralentiza pestañas inactivas para ahorrar batería, el temporizador reconcilia su estado al regresar, asegurando que la alarma suene con total precisión cuando transcurran ${item.label}.`
    },
    {
      question: `¿Cuáles son los usos más recomendados para una cuenta atrás de ${item.label}?`,
      answer: `Entre las aplicaciones más comunes destacan: ${item.idealFor}. ${item.tips}`
    },
    {
      question: `¿Puedo utilizar este temporizador en pantalla completa?`,
      answer: `Sí, pulsa el botón de pantalla completa en la interfaz para ampliar los dígitos a todo el monitor, ideal para aulas de estudio, salas de fitness y conferencias.`
    },
    {
      question: `¿Requiere conexión a internet para contar el tiempo?`,
      answer: `Una vez cargada la página, los cálculos temporales y los sonidos de alerta se ejecutan completamente en tu dispositivo sin necesidad de conexión constante a la red.`
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: item.name,
    description: item.description,
    url: `https://www.timenumbers.com/es/timer/${duration.toLowerCase()}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.timenumbers.com/es' },
        { '@type': 'ListItem', position: 2, name: 'Temporizador', item: 'https://www.timenumbers.com/es/timer' },
        { '@type': 'ListItem', position: 3, name: item.label, item: `https://www.timenumbers.com/es/timer/${duration.toLowerCase()}` },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="space-y-4">
          <Breadcrumbs
            items={[
              { name: 'Temporizador', url: '/es/timer' },
              { name: item.label, url: `/es/timer/${duration.toLowerCase()}` }
            ]}
          />

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Timer className="w-3.5 h-3.5" />
                Cuenta Regresiva de Precisión Atómica
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {item.name}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {item.description}
              </p>
            </div>
          </div>
        </div>

        {/* Timer Suite Client */}
        <TimerSuiteClient
          initialSeconds={item.seconds}
          title={item.name}
          presetSlug={duration.toLowerCase()}
          locale="es"
        />

        {/* Informational Guidance Box */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>Aplicaciones Óptimas para {item.label}</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {item.tips}
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <strong className="text-slate-900 dark:text-white font-semibold">Casos de uso sugeridos: </strong>
            {item.idealFor}
          </div>
        </section>

        {/* FAQs */}
        <FaqAccordion
          title={`Preguntas Frecuentes sobre el ${item.name}`}
          subtitle="Aclaraciones sobre exactitud, modo en segundo plano y funcionamiento en pantalla completa."
          items={timerFaqs}
        />

        {/* Related Links Hub */}
        <RelatedLinksHub
          currentPath={`/es/timer/${duration.toLowerCase()}`}
          title="Explorar Más Herramientas de Tiempo y Productividad"
          subtitle="Descubre cronómetros con milisegundos, relojes mundiales y conversores de zonas horarias."
        />
      </div>
    </div>
  );
}
