import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion, FaqItem } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { MarketHoursClient } from '@/components/market/MarketHoursClient';
import { TrendingUp, Clock, Globe, Sparkles, BookOpen } from 'lucide-react';

export const metadata: Metadata = buildPageMetadata(
  'Horarios de Bolsas Mundiales y Sesiones Forex en Vivo — Relojes Bursátiles',
  'Comprueba si las bolsas de Nueva York (NYSE/NASDAQ), Londres (LSE), Tokio (TSE), India (NSE) y Hong Kong están abiertas ahora mismo. Cuenta atrás para la campana, gráfico de 24 horas y sesiones Forex en vivo.',
  '/es/market-hours'
);

const SPANISH_MARKET_FAQS: FaqItem[] = [
  {
    question: '¿A qué hora abre y cierra la bolsa de Nueva York (NYSE y NASDAQ)?',
    answer:
      'La sesión oficial de la Bolsa de Nueva York (NYSE) y NASDAQ abre a las 9:30 AM hora del Este (EST/EDT) y cierra a las 4:00 PM hora del Este, de lunes a viernes. La negociación previa (premercado) comienza a las 4:00 AM EST, y la sesión extendida posterior (after-hours) se prolonga hasta las 8:00 PM EST.'
  },
  {
    question: '¿Qué es la "Ventana Dorada" de solapamiento entre Londres y Nueva York?',
    answer:
      'La Ventana Dorada tiene lugar entre las 8:00 AM y las 12:00 PM hora de Nueva York (13:00 a 17:00 UTC). Durante estas 4 horas diarias, la Bolsa de Londres y los mercados estadounidenses operan simultáneamente al mismo tiempo. Este lapso concentra aproximadamente el 70% del volumen total diario de divisas y acciones mundiales, ofreciendo la mayor liquidez y spreads más reducidos.'
  },
  {
    question: '¿Por qué las bolsas de Tokio y Hong Kong tienen una pausa para almorzar?',
    answer:
      'A diferencia de las bolsas occidentales que operan en horario continuo, la Bolsa de Tokio (TSE) y la de Hong Kong (HKEX) hacen una pausa oficial de 60 minutos al mediodía (de 11:30 AM a 12:30 PM en Tokio y de 12:00 PM a 1:00 PM en Hong Kong). Esta tradición permite a los intermediarios institucionales conciliar libros de órdenes y auditar márgenes en momentos de menor volumen natural.'
  },
  {
    question: '¿Cómo afecta el cambio de horario de verano (DST) a los mercados internacionales?',
    answer:
      'Dado que Estados Unidos y Europa cambian sus relojes en fechas distintas (y países como Japón o la India no aplican horario de verano), la diferencia horaria entre bolsas se desplaza una hora dos veces al año. Por ejemplo, en marzo, durante las semanas en que EE. UU. ya adelantó la hora pero el Reino Unido aún no, la ventana de solapamiento cambia una hora.'
  },
  {
    question: '¿El mercado de divisas (Forex) está realmente abierto las 24 horas?',
    answer:
      'Sí, el mercado de divisas opera 24 horas al día, 5 días a la semana. Se abre el domingo por la tarde a las 5:00 PM EST (cuando arranca la sesión de Sídney en Oceanía) y se mantiene activo de manera ininterrumpida a través de cuatro sesiones regionales rotativas hasta el viernes a las 5:00 PM EST, cuando concluye la jornada en Nueva York.'
  },
  {
    question: '¿Es seguro para un inversor principiante operar en premercado o postmercado?',
    answer:
      'Las sesiones fuera de hora (premercado y postmercado) registran un volumen sustancialmente menor y menos participantes que la sesión regular. Esto genera diferenciales (spreads) más amplios, menor liquidez y bruscos saltos de precios ante noticias. La mayoría de los expertos recomiendan a los inversores particulares operar dentro del horario oficial habitual.'
  }
];

export default function SpanishMarketHoursPage() {
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TimeNumbers Radar de Horarios Bursátiles y Sesiones Forex Mundiales',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requiere navegador web moderno con JavaScript habilitado',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Horarios de bolsas de valores mundiales y sesiones de Forex en tiempo real con cuentas atrás para la campana de apertura y cierre, detector de solapamiento y conversión a tu hora local.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SPANISH_MARKET_FAQS.map(faq => ({
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
      <Breadcrumbs items={[{ name: 'Horarios de Mercados', url: '/es/market-hours' }]} />

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
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Cronometría Financiera Global</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Horarios de Bolsas Mundiales y Sesiones Forex en Vivo
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          Consulta en tiempo real si las bolsas de valores de Nueva York, Londres, Tokio, Bombay y Hong Kong están abiertas en este momento. Sigue la cuenta atrás para la campana de apertura y cierre, descubre los momentos de máxima liquidez en Forex y convierte los horarios a tu zona horaria local.
        </p>
      </div>

      {/* Main Interactive Client */}
      <MarketHoursClient locale="es" />

      {/* Humanized Layman Educational Guide Section in Spanish */}
      <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guía Explicada en Lenguaje Sencillo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Cómo Funcionan los Horarios de Negociación Financiera en el Mundo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            El planeta no se detiene, y los mercados financieros tampoco. Conforme el sol recorre los husos horarios de los continentes, el capital bursátil fluye en un relevo continuo: desde Sídney y Tokio hasta Londres, Fráncfort y finalmente Nueva York. Conocer con exactitud cuándo abre, cierra y se solapa cada plaza es vital para cualquier inversor, operador y gestor internacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Card 1: Horario regular vs premercado */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sesión Regular frente a Premercado
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Aunque la campana oficial en Wall Street suena a las 9:30 AM EST, los algoritmos y mesas de inversión procesan órdenes en premercado desde las 4:00 AM EST. El postmercado se prolonga hasta las 8:00 PM EST. No obstante, al haber menos participantes, los precios pueden experimentar gran volatilidad.
            </p>
          </div>

          {/* Card 2: Ventana Dorada */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              La Ventana Dorada de Solapamiento
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Entre la 1:00 PM y las 5:00 PM UTC (8:00 AM a 12:00 PM en Nueva York), Londres y Wall Street coinciden abiertos a la vez. Este bloque de 4 horas genera cerca del 70% de todo el volumen diario mundial de divisas y la máxima profundidad de mercado en acciones.
            </p>
          </div>

          {/* Card 3: Relevo 24/5 de Forex */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              El Relevo de 24 Horas en Divisas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A diferencia de las bolsas tradicionales que cierran por la tarde, el mercado Forex pasa el testigo de una región a otra sin interrupción. Desde la noche del domingo hasta la tarde del viernes, las divisas se negocian 24 horas ininterrumpidas entre Sídney, Tokio, Londres y Nueva York.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
        <FaqAccordion
          items={SPANISH_MARKET_FAQS}
          title="Preguntas Frecuentes sobre los Horarios Bursátiles Mundiales"
          subtitle="Respuestas claras y directas a las dudas más comunes sobre campanas de apertura, cierres y husos horarios financieros."
        />
      </div>

      {/* Related Chronometry Tools */}
      <RelatedLinksHub
        currentPath="/es/market-hours"
        title="Explora Más Herramientas de Tiempo y Productividad"
        subtitle="Compara relojes mundiales, planifica reuniones internacionales y convierte zonas horarias sin fricción."
      />
    </main>
  );
}
