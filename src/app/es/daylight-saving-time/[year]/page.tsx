import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { Sun, Moon, Clock, ArrowRight, Calendar, Globe, AlertCircle, ShieldAlert } from 'lucide-react';
import { COUNTRIES } from '@/lib/geo/countries';

import { buildPageMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';

interface Props {
  params: Promise<{ year: string }>;
}

const SUPPORTED_SEGMENTS = [
  '2025', '2026', '2027', '2028', '2029', '2030',
  'arizona', 'united-states', 'europe', 'non-observing-countries'
];

export async function generateStaticParams() {
  return SUPPORTED_SEGMENTS.map(year => ({ year }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year: slug } = await params;

  if (slug === 'arizona') {
    return buildPageMetadata(
      "Reglas del Horario de Verano en Arizona y MST",
      "Por qué la mayor parte de Arizona no aplica el Horario de Verano (DST). Explicación del Tiempo Estándar de la Montaña (MST) todo el año y la excepción Navajo.",
      "/daylight-saving-time/arizona",
      'es'
    );
  }

  if (slug === 'united-states') {
    return buildPageMetadata(
      "Horario de Verano en Estados Unidos: Calendario y Cambios",
      "A qué hora cambian los relojes en Estados Unidos. Conoce cuándo se adelantan en marzo y se atrasan en noviembre, la Ley de Hora Uniforme y excepciones.",
      "/daylight-saving-time/united-states",
      'es'
    );
  }

  if (slug === 'europe') {
    return buildPageMetadata(
      "Horario de Verano en Europa: Calendario de Cambio de Hora",
      "¿Cuándo cambian la hora en Europa? Calendario oficial del horario de verano europeo (CEST/BST) en marzo y octubre en el Reino Unido y países de la UE.",
      "/daylight-saving-time/europe",
      'es'
    );
  }

  if (slug === 'non-observing-countries') {
    return buildPageMetadata(
      "Países que no aplican el Horario de Verano",
      "Lista completa de países y territorios sin cambio de hora. Descubre por qué China, India, Japón, Brasil y naciones ecuatoriales mantienen hora fija.",
      "/daylight-saving-time/non-observing-countries",
      'es'
    );
  }

  const y = parseInt(slug, 10);
  if (isNaN(y)) return {};

  return buildPageMetadata(
    `Horario de Verano ${y}: Fechas y Calendario de Cambio de Hora`,
    `¿Cuándo cambia la hora en ${y}? Calendario completo de horario de verano (DST), fechas exactas de adelanto en primavera y atraso en otoño para EE. UU., Europa y el mundo.`,
    `/daylight-saving-time/${y}`,
    'es'
  );
}

export default async function DaylightSavingTimeYearPageEs({ params }: Props) {
  const { year: slug } = await params;

  if (slug === 'arizona') {
    const faqs = [
      {
        question: "¿Cambia Arizona la hora en el horario de verano?",
        answer: "No. La mayor parte del estado de Arizona NO aplica el Horario de Verano. Arizona permanece en el Tiempo Estándar de la Montaña (MST, UTC-7) durante todo el año."
      },
      {
        question: "¿Por qué Arizona no participa en el horario de verano?",
        answer: "En 1968, la legislatura de Arizona optó por excluirse de la Ley de Hora Uniforme. Debido al calor extremo del desierto en verano, una hora adicional de sol por la tarde aumentaría el consumo eléctrico en aire acondicionado residencial."
      },
      {
        question: "¿Cambia de hora la Nación Navajo en Arizona?",
        answer: "¡Sí! La Nación Navajo, que abarca el noreste de Arizona y partes de Nuevo México y Utah, SÍ aplica el Horario de Verano para mantenerse sincronizada entre estados. Sin embargo, la Reserva Hopi dentro de la Nación Navajo no lo aplica."
      }
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { name: "Horario de Verano", url: "/es/daylight-saving-time" },
            { name: "Arizona", url: "/es/daylight-saving-time/arizona" }
          ]}
          locale="es"
        />
        <JsonLd
          type="breadcrumb"
          data={[
            { name: 'Inicio', url: '/es' },
            { name: 'Horario de Verano', url: '/es/daylight-saving-time' },
            { name: 'Arizona', url: '/es/daylight-saving-time/arizona' },
          ]}
        />
        <JsonLd type="faq" data={faqs} />
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sun className="w-3.5 h-3.5" />
            <span>Tiempo Estándar de la Montaña (MST Todo el Año)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            ¿Cambia Arizona la hora en el Horario de Verano?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Arizona permanece en UTC-7 todo el año. Descubre por qué los relojes no cambian en Phoenix, Tucson y Flagstaff.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Información Clave para Viajeros y Equipos Remotos</h2>
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-sm text-amber-900 dark:text-amber-200">
            Cuando EE. UU. adelanta el reloj en marzo, Arizona coincide con la hora de verano del Pacífico (PDT). Cuando atrasa el reloj en noviembre, Arizona coincide con la hora estándar de la montaña (MST).
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <FaqAccordion items={faqs} title="Preguntas Frecuentes sobre la Hora en Arizona" />
        </section>

        <RelatedLinksHub currentPath="/daylight-saving-time/arizona" locale="es" />
      </div>
    );
  }

  if (slug === 'non-observing-countries') {
    const nonObserving = [
      { name: "China", note: "Abandonó el DST en 1992; utiliza la hora de Beijing (UTC+8) en todo el país." },
      { name: "India", note: "Nunca aplicó DST nacional; mantiene la hora estándar de la India (IST, UTC+5:30)." },
      { name: "Japón", note: "Abolió el DST en 1952 durante la ocupación de posguerra." },
      { name: "Rusia", note: "Abolió el cambio de hora en 2014; usa hora estándar permanente en sus 11 husos." },
      { name: "Brasil", note: "Eliminó el DST en 2019 debido a un ahorro energético insignificante cerca del ecuador." },
      { name: "Turquía", note: "Permanece permanentemente en horario de verano (UTC+3) desde 2016." },
      { name: "Arabia Saudita y EAU", note: "Sin cambios estacionales; ciclo solar ecuatorial estable." },
      { name: "Singapur", note: "Ubicado a 1° de latitud norte; exactamente 12 horas de luz todo el año." },
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { name: "Horario de Verano", url: "/es/daylight-saving-time" },
            { name: "Países sin cambio de hora", url: "/es/daylight-saving-time/non-observing-countries" }
          ]}
          locale="es"
        />
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>Hora Estándar Permanente</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            ¿Qué países no aplican el Horario de Verano?
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Más del 60% de la población mundial vive en naciones que conservan una hora estándar fija todo el año.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nonObserving.map(c => (
            <div key={c.name} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white text-base">{c.name}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>

        <RelatedLinksHub currentPath="/daylight-saving-time/non-observing-countries" locale="es" />
      </div>
    );
  }

  if (slug === 'united-states') {
    const faqs = [
      {
        question: "¿Cuándo empieza y termina el Horario de Verano en Estados Unidos?",
        answer: "Bajo la Ley de Política Energética de 2005, el horario de verano en EE. UU. comienza a las 2:00 AM del segundo domingo de marzo (se adelanta 1 hora) y finaliza a las 2:00 AM del primer domingo de noviembre (se atrasa 1 hora)."
      },
      {
        question: "¿Qué estados y territorios de EE. UU. no aplican el horario de verano?",
        answer: "Hawái y la mayor parte de Arizona no cambian la hora. Los territorios que no aplican DST incluyen Puerto Rico, Guam, Samoa Americana, las Islas Vírgenes de EE. UU. y las Islas Marianas del Norte."
      }
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { name: "Horario de Verano", url: "/es/daylight-saving-time" },
            { name: "Estados Unidos", url: "/es/daylight-saving-time/united-states" }
          ]}
          locale="es"
        />
        <JsonLd
          type="breadcrumb"
          data={[
            { name: 'Inicio', url: '/es' },
            { name: 'Horario de Verano', url: '/es/daylight-saving-time' },
            { name: 'Estados Unidos', url: '/es/daylight-saving-time/united-states' },
          ]}
        />
        <JsonLd type="faq" data={faqs} />
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Ley Federal de Hora Uniforme</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Calendario de Horario de Verano en Estados Unidos
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Reglas, horas de cambio y excepciones estatales para el DST en todo el territorio estadounidense.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <FaqAccordion items={faqs} title="Preguntas Frecuentes sobre el Horario de Verano en EE. UU." />
        </section>

        <RelatedLinksHub currentPath="/daylight-saving-time/united-states" locale="es" />
      </div>
    );
  }

  if (slug === 'europe') {
    const faqs = [
      {
        question: "¿Cuándo cambia la hora en Europa?",
        answer: "En la Unión Europea y el Reino Unido, el horario de verano comienza el último domingo de marzo a la 01:00 UTC (los relojes avanzan a las 02:00 UTC) y finaliza el último domingo de octubre a la 01:00 UTC (los relojes se atrasan)."
      }
    ];

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { name: "Horario de Verano", url: "/es/daylight-saving-time" },
            { name: "Europa", url: "/es/daylight-saving-time/europe" }
          ]}
          locale="es"
        />
        <JsonLd
          type="breadcrumb"
          data={[
            { name: 'Inicio', url: '/es' },
            { name: 'Horario de Verano', url: '/es/daylight-saving-time' },
            { name: 'Europa', url: '/es/daylight-saving-time/europe' },
          ]}
        />
        <JsonLd type="faq" data={faqs} />
        <header className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Horario de Verano Europeo (CEST/WEST/EEST)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Calendario de Horario de Verano en Europa
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Fechas de transición y horarios de cambio de reloj en el Reino Unido y países de la Unión Europea.
          </p>
        </header>

        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <FaqAccordion items={faqs} title="Preguntas Frecuentes sobre el Horario de Verano en Europa" />
        </section>

        <RelatedLinksHub currentPath="/daylight-saving-time/europe" locale="es" />
      </div>
    );
  }

  const y = parseInt(slug, 10);
  if (isNaN(y)) notFound();

  const faqs = [
    {
      question: `¿Se adelanta o se atrasa el reloj en marzo de ${y}?`,
      answer: `En marzo de ${y}, los relojes se ADELANTAN 1 hora ("Primavera: adelanto") a las 2:00 AM hora local en Estados Unidos, Canadá y Europa, haciendo que esa noche tenga 23 horas.`
    },
    {
      question: `¿Cuándo empieza y termina el Horario de Verano en ${y}?`,
      answer: `En ${y}, el Horario de Verano en EE. UU. comienza el segundo domingo de marzo y finaliza el primer domingo de noviembre. En el Reino Unido y Europa, el horario de verano comienza el último domingo de marzo y termina el último domingo de octubre.`
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { name: "Horario de Verano", url: "/es/daylight-saving-time" },
          { name: `${y}`, url: `/es/daylight-saving-time/${y}` }
        ]}
        locale="es"
      />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Horario de Verano', url: '/es/daylight-saving-time' },
          { name: `${y}`, url: `/es/daylight-saving-time/${y}` },
        ]}
      />
      <JsonLd type="faq" data={faqs} />

      <header className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Calendario del Horario de Verano {y}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Fechas globales de transición, horas exactas de cambio de reloj y calendario de primavera y otoño para {y}.
        </p>
      </header>

      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider opacity-80 block">Regla Mnemotécnica Universal</span>
          <span className="text-xl sm:text-2xl font-black">“En primavera se adelanta una hora, en otoño se atrasa una hora”</span>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-bold">Marzo: +1h</span>
          <span className="px-3 py-1.5 rounded-xl bg-white/20 text-xs font-bold">Noviembre: -1h</span>
        </div>
      </div>

      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={faqs} title={`Preguntas Frecuentes sobre el Cambio de Hora en ${y}`} />
      </section>

      <RelatedLinksHub currentPath={`/daylight-saving-time/${y}`} locale="es" />
    </div>
  );
}
