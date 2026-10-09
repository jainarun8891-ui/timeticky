import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { SleepCalculatorClient } from '@/app/sleep-calculator/SleepCalculatorClient';
import {
  POPULAR_SLEEP_PRESETS,
  parseSleepSlug,
  formatTime12,
} from '@/lib/sleep/sleep-calc';
import { Brain, Sparkles, Moon, Sun } from 'lucide-react';

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POPULAR_SLEEP_PRESETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSleepSlug(slug);

  if (!parsed) {
    return buildPageMetadata(
      'Horario de Ciclos de Sueño',
      'Calcula ciclos de sueño óptimos y horas de despertar para evitar el cansancio matutino.',
      `/sleep-calculator/${slug}`,
      'es'
    );
  }

  const timeFormatted = formatTime12(new Date(2026, 0, 1, parsed.hour, parsed.minute));
  const esTitle = parsed.mode === 'wake'
    ? `A Qué Hora Dormir para Despertar a las ${timeFormatted} — Ciclos de Sueño`
    : `A Qué Hora Despertar si Duermo a las ${timeFormatted} — Ciclos de Sueño`;

  const esDescription = parsed.mode === 'wake'
    ? `Descubre exactamente a qué hora acostarte para despertar a las ${timeFormatted} con energía natural, sin cansancio matutino y completando ciclos de 90 minutos.`
    : `Descubre las mejores horas para despertar si te vas a dormir a las ${timeFormatted}. Basado en ciclos naturales de 90 minutos y tiempo promedio para conciliar el sueño.`;

  return buildPageMetadata(
    esTitle,
    esDescription,
    `/sleep-calculator/${slug}`,
    'es'
  );
}

export default async function ProgrammaticSleepPageEs({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSleepSlug(slug);

  if (!parsed) {
    notFound();
  }

  const timeFormatted = formatTime12(new Date(2026, 0, 1, parsed.hour, parsed.minute));

  const pageTitle = parsed.mode === 'wake'
    ? `A Qué Hora Dormir para Despertar a las ${timeFormatted}`
    : `A Qué Hora Despertar si Te Duermes a las ${timeFormatted}`;

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `TimeNumbers Calculadora de Ciclos de Sueño — ${pageTitle}`,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requiere navegador web moderno con JavaScript habilitado',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: `Cálculo de ciclos de sueño de 90 minutos para las ${timeFormatted}.`,
  };

  const dynamicFaqs: FaqItem[] = [
    {
      question: parsed.mode === 'wake'
        ? `¿Cuál es la mejor hora exacta para acostarse y despertar a las ${timeFormatted}?`
        : `¿A qué hora debería despertarme si me duermo a las ${timeFormatted}?`,
      answer: parsed.mode === 'wake'
        ? `Para despertar totalmente despejado a las ${timeFormatted}, debes quedarte dormido a las horas calculadas completando múltiplos de 90 minutos (por ejemplo, 5 ciclos equivalen a 7,5 horas de descanso, o 6 ciclos a 9 horas), añadiendo 14 minutos para conciliar el sueño.`
        : `Si te duermes a las ${timeFormatted}, tus ciclos naturales de sueño de 90 minutos concluyen en intervalos de 4,5h, 6,0h, 7,5h y 9,0h (más 14 minutos de latencia). Despertar tras 5 ciclos otorga la mayor recuperación cognitiva.`
    },
    {
      question: '¿Por qué sincronizar el sueño con ciclos de 90 minutos elimina el cansancio matutino?',
      answer:
        'Cuando suena la alarma en medio de la fase de sueño profundo N3 (ondas lentas), el cerebro sufre inercia del sueño: una desorientación y pesadez prolongada. Al programar el despertar al finalizar un ciclo de 90 minutos durante el sueño ligero, el cortisol y la temperatura corporal están fisiológicamente listos para la vigilia.'
    },
    {
      question: '¿Qué hacer si me despierto 15 minutos antes de la alarma?',
      answer:
        'Si te despiertas de forma espontánea 15 o 20 minutos antes de tu alarma sintiéndote despejado, ¡levántate de inmediato! Tu organismo ha terminado un ciclo completo de forma natural. Volver a dormirte iniciará un ciclo nuevo forzado, haciendo que despiertes cansado cuando finalmente suene el despertador.'
    }
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />
      <Breadcrumbs
        items={[
          { name: 'Calculadora de Sueño', url: '/es/sleep-calculator' },
          { name: pageTitle, url: `/es/sleep-calculator/${slug}` },
        ]}
        locale="es"
      />

      {/* Main Interactive Client */}
      <SleepCalculatorClient
        initialMode={parsed.mode}
        initialHour={parsed.hour}
        initialMinute={parsed.minute}
        customHeading={pageTitle}
        customDescription={`Horarios óptimos calculados con base científica (ciclos ultradianos de 90 minutos y 14 minutos para conciliar el sueño).`}
      />

      {/* Programmatic Scientific Sleep Architecture */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-indigo-500" />
          <span>Fisiología de los Ritmos Circadianos y Ciclos Ultradianos</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Estructura de las Fases del Sueño
            </h3>
            <p>
              Una noche de descanso no es un bloque continuo. Se divide en ciclos de aproximadamente 90 a 110 minutos que transitan entre el sueño ligero (N1 y N2), el sueño profundo restaurador (N3 delta) y la fase MOR (REM), donde se consolidan la memoria y las emociones.
            </p>
            <p>
              Completar 5 ciclos completos (7 horas y 30 minutos) suele ser la cantidad ideal para la mayoría de adultos activos.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              La Regla de los 14 Minutos
            </h3>
            <p>
              Los estudios clínicos de polisomnografía demuestran que un ser humano saludable tarda entre 10 y 20 minutos en quedarse dormido (latencia del sueño).
            </p>
            <p>
              Nuestra calculadora incluye automáticamente estos 14 minutos en cada recomendación para que tu alarma coincida exactamente con el final del ciclo.
            </p>
          </div>
        </div>
      </section>

      {/* Programmatic FAQ Accordion */}
      <FaqAccordion
        items={dynamicFaqs}
        title={`Preguntas sobre el Horario de las ${timeFormatted}`}
        subtitle="Ciencia cronobiológica, eliminación de la inercia del sueño y recuperación óptima."
      />

      {/* Related Links Hub */}
      <RelatedLinksHub
        currentPath={`/es/sleep-calculator/${slug}`}
        title="Explora Más Herramientas de Salud y Cronometría"
      />
    </main>
  );
}
