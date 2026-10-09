import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { TimerSuiteClient } from '@/app/timer/TimerSuiteClient';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { Timer, Clock, ArrowRight } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/timer'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/timer'
);

const TIMER_PRESETS_ES = [
  { slug: '1-minute', label: '1 Minuto', desc: 'Respiración consciente, té y ejercicios rápidos' },
  { slug: '5-minutes', label: '5 Minutos', desc: 'Pausa breve Pomodoro, descanso ocular y exposiciones relámpago' },
  { slug: '10-minutes', label: '10 Minutos', desc: 'Reunión diaria de equipo, circuitos HIIT y lectura rápida' },
  { slug: '15-minutes', label: '15 Minutos', desc: 'Siesta reparadora, retrospectivas de sprint y pausa café' },
  { slug: '20-minutes', label: '20 Minutos', desc: 'Regla 20-20-20 para la vista, yoga y bloque de estudio' },
  { slug: '30-minutes', label: '30 Minutos', desc: 'Reunión corporativa, repostería y ejercicio cardiovascular' },
  { slug: '45-minutes', label: '45 Minutos', desc: 'Clase académica, programación intensa y sesión de gimnasio' },
  { slug: '1-hour', label: '1 Hora', desc: 'Bloque de trabajo profundo, exámenes y asados lentos' },
  { slug: '2-hours', label: '2 Horas', desc: 'Masterclass extendida, simulacros de certificación y cocción lenta' },
];

export default function EsTimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs items={[{ name: 'Temporizador', url: '/es/timer' }]} />
        <JsonLd
          type="breadcrumb"
          data={[
            { name: 'Inicio', url: '/es' },
            { name: 'Temporizador', url: '/es/timer' },
          ]}
        />
        <JsonLd type="faq" data={content.faqs} />
        <JsonLd
          type="application"
          data={{
            name: "Temporizador Online con Alarma",
            category: "UtilitiesApplication",
            description: content.description,
          }}
        />

        {/* Hero Header */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Timer className="w-3.5 h-3.5" />
            <span>Cronómetro y Cuenta Regresiva de Alta Precisión</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {content.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            {content.description}
          </p>
        </div>

        {/* Timer Suite Client */}
        <TimerSuiteClient initialSeconds={300} title="Temporizador de 5 Minutos" locale="es" />

        {/* Preset Durations Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Intervalos Populares de Cuenta Regresiva</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIMER_PRESETS_ES.map((p) => (
              <Link
                key={p.slug}
                href={`/es/timer/${p.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-2xs hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <strong className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Temporizador de {p.label}
                    </strong>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    {p.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Educational Guide Section */}
        <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} />

        {/* FAQs */}
        <FaqAccordion
          title="Preguntas Frecuentes sobre el Temporizador Online"
          subtitle="Descubre cómo nuestro temporizador sin desfase mantiene una precisión milimétrica incluso en segundo plano."
          items={content.faqs}
        />

        {/* Hub Navigation */}
        <RelatedLinksHub
          currentPath="/es/timer"
          title="Explorar Más Relojes y Herramientas de Productividad"
          subtitle="Prueba nuestro temporizador Pomodoro, cronómetro con milisegundos o verifica la precisión de tu reloj."
        />
      </div>
    </div>
  );
}
