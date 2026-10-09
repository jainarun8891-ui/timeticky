import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { CountdownEventClient } from '@/app/countdown/CountdownEventClient';
import { buildPageMetadata } from '@/lib/seo/metadata';
import {
  CANONICAL_COUNTDOWN_EVENTS,
  resolveEventData,
} from '@/lib/countdown/countdown-utils';

interface Props {
  params: Promise<{ event: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const SPANISH_EVENT_NAMES: Record<string, { name: string; description: string; culturalNote: string; history: string }> = {
  'new-year': {
    name: 'Año Nuevo 2027',
    description: 'Cuenta regresiva exacta en tiempo real hacia la medianoche y la llegada del Año Nuevo 2027 en las distintas zonas horarias.',
    culturalNote: 'Celebrado globalmente al filo de la medianoche al iniciarse un nuevo año en el calendario gregoriano.',
    history: 'Instituido por Julio César en el año 45 a.C. con la reforma juliana, dedicando enero a Jano, dios romano de los comienzos.',
  },
  'christmas': {
    name: 'Día de Navidad 2026',
    description: 'Cuenta regresiva en vivo en días, horas, minutos y segundos hasta el Día de Navidad 2026.',
    culturalNote: 'Conmemorado por miles de millones de personas como festividad de paz, unión familiar y generosidad.',
    history: 'Oficialmente registrado por primera vez en Roma en el año 336 d.C. durante el mandato del emperador Constantino.',
  },
  'halloween': {
    name: 'Halloween 2026',
    description: 'Descubre cuántos días, horas, minutos y segundos faltan para la noche de Halloween.',
    culturalNote: 'Celebrado en la víspera de Todos los Santos con disfraces, dulces y tradiciones de cosecha otoñal.',
    history: 'Tiene sus raíces hace más de 2000 años en el festival celta de Samhain, punto de inflexión del calendario agrícola.',
  },
  'valentines-day': {
    name: 'San Valentín 2027',
    description: 'Cuenta regresiva en vivo para el Día de San Valentín. Sigue el tiempo restante hasta el 14 de febrero.',
    culturalNote: 'Celebración que honra el amor, la amistad y el aprecio interpersonal.',
    history: 'Nacido en las antiguas fiestas romanas y festividades cristianas en honor a San Valentín.',
  },
  'diwali': {
    name: 'Diwali 2026 (Festival de las Luces)',
    description: 'Cuenta regresiva exacta para Diwali 2026. Descubre los días y horas restantes hasta el festival hindú de las luces.',
    culturalNote: 'Simboliza la victoria espiritual de la luz sobre la oscuridad y el bien sobre el mal.',
    history: 'Gran festival conmemorado en el sur de Asia en la noche más oscura de luna nueva (Amavasya) de Kartika.',
  },
  'holi': {
    name: 'Holi 2027 (Festival de los Colores)',
    description: 'Sigue la cuenta regresiva para Holi 2027. Temporizador en vivo para la celebración primaveral de colores y alegría.',
    culturalNote: 'Marca la llegada de la primavera, la reconciliación y el lanzamiento festivo de polvos de colores.',
    history: 'Mencionado en textos sánscritos del siglo VII, se celebra en la luna llena (Purnima) de Phalguna.',
  },
  'thanksgiving': {
    name: 'Día de Acción de Gracias 2026',
    description: 'Cuenta regresiva en vivo para el Día de Acción de Gracias, celebrado el cuarto jueves de noviembre.',
    culturalNote: 'Fiesta tradicional norteamericana para agradecer las cosechas y compartir en familia.',
    history: 'Proclamado festividad nacional anual por Abraham Lincoln en 1863 durante la Guerra Civil estadounidense.',
  },
};

export async function generateStaticParams() {
  return Object.keys(CANONICAL_COUNTDOWN_EVENTS).map((event) => ({ event }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { event } = await params;
  const sParams = await searchParams;
  const item = resolveEventData(event, sParams);
  const esInfo = SPANISH_EVENT_NAMES[event.toLowerCase()];

  const cleanName = esInfo?.name || item.name;
  const cleanTitle = `Cuenta Regresiva para ${cleanName} — Temporizador de Precisión en Vivo`;
  const cleanDesc = esInfo?.description || item.description;

  return buildPageMetadata(
    cleanTitle,
    cleanDesc,
    `/countdown/${item.slug}`,
    'es'
  );
}

export default async function SpanishCountdownEventPage({ params, searchParams }: Props) {
  const { event } = await params;
  const sParams = await searchParams;
  const item = resolveEventData(event, sParams);
  const esInfo = SPANISH_EVENT_NAMES[event.toLowerCase()];

  const displayName = esInfo?.name || item.name;
  const displayDesc = esInfo?.description || item.description;
  const displayCultural = esInfo?.culturalNote || item.culturalNote;
  const displayHistory = esInfo?.history || item.history;

  const eventFaqs = [
    {
      question: `¿Cómo calcula el tiempo restante la cuenta regresiva para ${displayName}?`,
      answer: `El temporizador calcula la diferencia exacta en milisegundos entre el instante presente y ${item.targetIso}. Desglosa esta duración en días completos, horas, minutos y segundos, actualizándose en tiempo real mediante relojes atómicos de época (Epoch).`
    },
    {
      question: `¿Puedo compartir esta cuenta regresiva para ${displayName} con amigos y familiares?`,
      answer: `¡Sí! Copia la URL de la barra de direcciones o pulsa el botón "Compartir". El enlace incluye todos los parámetros del evento para que cualquiera pueda ver la cuenta sincronizada con tarjetas de vista previa en WhatsApp, Slack, Telegram y X (Twitter).`
    },
    {
      question: `¿Sigue funcionando con exactitud el contador si cambio de pestaña o bloqueo el móvil?`,
      answer: `Sí. TimeNumbers utiliza marcas de tiempo de época continuas en lugar de intervalos simples de JavaScript. Aunque tu pantalla se apague o cambies de aplicación, la cuenta regresiva reflejará la duración restante exacta al instante de volver.`
    },
    {
      question: `¿Qué ocurre cuando la cuenta regresiva para ${displayName} llega a cero?`,
      answer: `Cuando el temporizador alcanza el segundo cero, TimeNumbers activa automáticamente una explosión de confeti festivo y muestra una tarjeta de celebración.`
    }
  ];

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Cuenta Regresiva para ${displayName}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requiere navegador web moderno con JavaScript habilitado',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: displayDesc,
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { name: 'Inicio', url: '/es' },
            { name: 'Cuenta Atrás', url: '/es/countdown' },
            { name: displayName, url: `/es/countdown/${item.slug}` },
          ]}
        />

        {/* Live Countdown Client */}
        <CountdownEventClient
          eventName={displayName}
          targetIso={item.targetIso}
          description={displayDesc}
          eventSlug={item.slug}
          culturalNote={displayCultural}
          emoji={item.emoji}
          locale="es"
        />

        {/* Context / History Section */}
        {displayHistory ? (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Contexto Histórico y Observancia Global
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Arquitectura del Calendario y Tradiciones</h3>
                <p>{displayCultural}</p>
                <p>{displayHistory}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-white text-base">Progresión por Husos Horarios</h3>
                <p>
                  A medida que la Tierra gira hacia el este, las celebraciones avanzan en cascada a través de los 24 husos horarios principales.
                </p>
                <p>
                  TimeNumbers permite a familias, organizadores y equipos internacionales mantenerse sincronizados con cronómetros precisos, sin importar la distancia geográfica.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 space-y-4 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Sobre Esta Cuenta Regresiva Personalizada
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Este temporizador en vivo fue generado a través del cronómetro universal de TimeNumbers. Cada segundo se mide contra servidores de tiempo atómico para garantizar que tu evento compartido esté sincronizado al milisegundo en todo el mundo.
            </p>
          </section>
        )}

        {/* Dynamic Event FAQ Accordion */}
        <FaqAccordion
          items={eventFaqs}
          title={`Preguntas Frecuentes sobre ${displayName}`}
          subtitle={`Sincronización, opciones para compartir y detalles de ejecución para ${displayName}.`}
        />

        {/* Global Hub Navigation */}
        <RelatedLinksHub title="Explora Más Contadores y Calendarios" currentPath="/es/countdown" />
      </div>
    </main>
  );
}
