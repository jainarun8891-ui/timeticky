import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LifeInWeeksClient } from '@/app/life-in-weeks/LifeInWeeksClient';
import { LIFE_PROGRAMMATIC_PRESETS } from '@/lib/life/life-weeks';
import { Brain } from 'lucide-react';

export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return LIFE_PROGRAMMATIC_PRESETS.map((p) => ({ slug: p.slug }));
}

function resolveAgeFromSlug(slug: string): number | null {
  const preset = LIFE_PROGRAMMATIC_PRESETS.find((p) => p.slug === slug);
  if (preset) return preset.age;

  const match = slug.match(/^age-(\d{1,2})$/i);
  if (match) {
    const age = parseInt(match[1], 10);
    if (age > 0 && age <= 100) return age;
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const age = resolveAgeFromSlug(slug);

  if (age === null) {
    return buildPageMetadata(
      'Cuadrícula de la Vida en Semanas',
      'Visualiza tu longevidad humana en una matriz Memento Mori de 4.160 semanas.',
      `/life-in-weeks/${slug}`,
      'es'
    );
  }

  const weeksLived = age * 52;
  const weeksLeft = Math.max(0, 80 * 52 - weeksLived);

  return buildPageMetadata(
    `Tu Vida en Semanas a los ${age} Años — Cuadrícula Memento Mori`,
    `A los ${age} años has vivido aproximadamente ${weeksLived} semanas con ${weeksLeft} semanas restantes de una vida de 80 años. Visualiza tu cuadrícula personal Memento Mori.`,
    `/life-in-weeks/${slug}`,
    'es'
  );
}

export default async function ProgrammaticLifePageEs({ params }: Props) {
  const { slug } = await params;
  const age = resolveAgeFromSlug(slug);

  if (age === null) {
    notFound();
  }

  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  const birthdateStr = `${birthYear}-06-15`;

  const weeksLived = age * 52;
  const weeksLeft = Math.max(0, 80 * 52 - weeksLived);
  const percentageLived = ((weeksLived / (80 * 52)) * 100).toFixed(1);

  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `TimeNumbers Tu Vida en Semanas a los ${age} Años`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requiere navegador web moderno con JavaScript habilitado',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: `Matriz Memento Mori de 4.160 semanas adaptada a los ${age} años.`,
  };

  const dynamicFaqs: FaqItem[] = [
    {
      question: `¿Cuánto de la vida se ha vivido a los ${age} años?`,
      answer: `Asumiendo una esperanza de vida promedio de 80 años (4.160 semanas), a los ${age} años has completado aproximadamente ${weeksLived} semanas, lo que representa el ${percentageLived}% del viaje total de tu vida. Te quedan unas ${weeksLeft} semanas por delante.`
    },
    {
      question: `¿Qué etapa vital representan los ${age} años según la psicología del desarrollo?`,
      answer: age < 30
        ? 'Las edades de 18 a 29 años representan la etapa fundacional de exploración, desarrollo de identidad, aprendizaje acelerado y máxima neuroplasticidad.'
        : age < 50
        ? 'Las edades de 30 a 49 años representan la era de mayor impacto y consolidación: liderazgo profesional, maestría en tu disciplina, familia y resultados compuestos.'
        : 'A partir de los 50 años comienza la etapa de mentoría, sabiduría reflexiva, visión filosófica y construcción de tu legado duradero.'
    },
    {
      question: `¿Cuántos veranos te quedan a los ${age} años?`,
      answer: `Asumiendo una vida de 80 años, a los ${age} años te quedan aproximadamente ${Math.max(0, 80 - age)} veranos para disfrutar de la brisa marina, vacaciones y aventuras al aire libre.`
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
          { name: 'Tu Vida en Semanas', url: '/es/life-in-weeks' },
          { name: `${age} Años`, url: `/es/life-in-weeks/${slug}` },
        ]}
        locale="es"
      />

      {/* Main Interactive Client */}
      <LifeInWeeksClient
        initialBirthdate={birthdateStr}
        customHeading={`Tu Vida en Semanas a los ${age} Años`}
        customDescription={`Has vivido ${weeksLived.toLocaleString('es-ES')} semanas (${percentageLived}%). Aquí tienes la perspectiva visual exacta de las ${weeksLeft.toLocaleString('es-ES')} semanas restantes.`}
      />

      {/* Programmatic Age Milestone Context */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Brain className="w-5 h-5 text-rose-500" />
          <span>La Psicología y Realidad de Cumplir {age} Años</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              El Poder del Interés Compuesto en Hábitos
            </h3>
            <p>
              A los {age} años, pequeños hábitos diarios —leer 20 páginas, hacer ejercicio 3 veces por semana o invertir con disciplina— se multiplican con una fuerza descomunal a lo largo de tus {weeksLeft.toLocaleString('es-ES')} semanas restantes.
            </p>
            <p>
              Por el contrario, las distracciones automáticas restan tiempo irrecuperable. Ver tus cuadros restantes te ayuda a priorizar conscientemente aquello que de verdad importa.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Estacionalidad Intencional
            </h3>
            <p>
              Divide los años venideros en temporadas deliberadas. En lugar de posponer ese viaje soñado o ese proyecto personal, intégralo directamente en tus próximos bloques de 52 semanas.
            </p>
          </div>
        </div>
      </section>

      {/* Programmatic FAQ Accordion */}
      <FaqAccordion
        items={dynamicFaqs}
        title={`Preguntas sobre la Longevidad a los ${age} Años`}
        subtitle="Perspectiva cronológica, hitos restantes y diseño intencional de hábitos de vida."
      />

      {/* Related Links Hub */}
      <RelatedLinksHub
        currentPath={`/es/life-in-weeks/${slug}`}
        title="Explora Más Herramientas de Tiempo y Productividad"
      />
    </main>
  );
}
