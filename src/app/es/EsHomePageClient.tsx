"use client";

import React, { useState, useEffect } from 'react';
import { GlobalSearchBar } from '@/components/search/GlobalSearchBar';
import { PrecisionClockHero } from '@/components/home/PrecisionClockHero';
import { HeroClockCard } from '@/components/dashboard/HeroClockCard';
import { WorldMapCard } from '@/components/dashboard/WorldMapCard';
import { WorldClockStrip } from '@/components/dashboard/WorldClockStrip';
import { TimeDifferenceCard } from '@/components/dashboard/TimeDifferenceCard';
import { MeetingPlannerCard } from '@/components/dashboard/MeetingPlannerCard';
import { SunDaylightCard } from '@/components/dashboard/SunDaylightCard';
import { DateCalendarCard } from '@/components/dashboard/DateCalendarCard';
import { QuickTimerCard } from '@/components/dashboard/QuickTimerCard';
import { CountryInfoCard } from '@/components/dashboard/CountryInfoCard';
import { QuoteCard } from '@/components/dashboard/QuoteCard';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { City, CITIES } from '@/lib/geo/cities';
import { Clock, Globe, Calendar, ShieldCheck, Sparkles, Compass } from 'lucide-react';

const SPANISH_HOME_FAQS = [
  {
    question: '¿Qué es TimeNumbers y cómo garantiza la hora exacta en tiempo real?',
    answer: 'TimeNumbers es una plataforma global de cronometría civil que sincroniza la hora local con servidores de tiempo atómico UTC de estrato 1 mediante protocolos NTP. Nuestro motor calcula la latencia de red y la deriva del reloj del dispositivo para mostrar la hora con precisión sub-milisegundo.'
  },
  {
    question: '¿Cómo funciona el conversor de zonas horarias?',
    answer: 'Nuestro conversor horario calcula automáticamente la diferencia horaria entre 552 combinaciones canónicas de husos horarios y ciudades, considerando los cambios de horario de verano (DST) vigentes en cada región.'
  },
  {
    question: '¿Se tienen en cuenta los cambios de horario de verano (DST)?',
    answer: 'Sí. TimeNumbers utiliza la base de datos canónica de husos horarios IANA, lo que garantiza que las transiciones de primavera y otoño se apliquen automáticamente con total exactitud.'
  },
  {
    question: '¿Puedo insertar un reloj digital o de cuenta regresiva en mi página web?',
    answer: 'Sí, disponemos de widgets HTML gratuitos y adaptables listos para incrustar en sitios web, WordPress o paneles corporativos a través de nuestra sección de widgets.'
  }
];

export function EsHomePageClient() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Paris default SSR

  // Synchronize spotlight with visitor's detected timezone if matched
  useEffect(() => {
    try {
      let resolvedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (resolvedTz === 'Asia/Calcutta') resolvedTz = 'Asia/Kolkata';
      if (resolvedTz) {
        const localMatch = CITIES.find(c => c.timezone === resolvedTz);
        if (localMatch) {
          setSelectedCity(localMatch);
        }
      }
    } catch {}
  }, []);

  return (
    <div className="w-full min-h-full pb-16">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-5 space-y-6">
        
        {/* Search Bar */}
        <GlobalSearchBar />

        {/* Live Precision Clock & Quick Directory Navigation */}
        <PrecisionClockHero />

        {/* Global Hub Spotlight Clock Card + World Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8 xl:col-span-9 flex">
            <HeroClockCard
              currentCity={selectedCity}
              onSelectCity={(city) => setSelectedCity(city)}
            />
          </div>
          <div className="lg:col-span-4 xl:col-span-3 flex">
            <WorldMapCard
              currentCity={selectedCity}
              onSelectCity={(city) => setSelectedCity(city)}
            />
          </div>
        </div>

        {/* Row 2: World Clock 7 Landmarks Horizontal Strip */}
        <WorldClockStrip
          currentCity={selectedCity}
          onSelectCity={(city) => setSelectedCity(city)}
        />

        {/* Row 3: 4 Columns (Time Difference, Meeting Planner, Sun & Daylight, Date & Calendar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          <TimeDifferenceCard currentCity={selectedCity} />
          <MeetingPlannerCard currentCity={selectedCity} />
          <SunDaylightCard currentCity={selectedCity} />
          <DateCalendarCard currentCity={selectedCity} />
        </div>

        {/* Row 4: 3 Columns (Timer/Countdown, Country Info, Quote Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-4 flex w-full">
            <QuickTimerCard className="w-full h-full" />
          </div>
          <div className="lg:col-span-5 flex w-full">
            <CountryInfoCard currentCity={selectedCity} className="w-full h-full" />
          </div>
          <div className="lg:col-span-3 flex w-full">
            <QuoteCard className="w-full h-full" />
          </div>
        </div>

        {/* Editorial Chronometry Guide & Spanish Content */}
        <section className="bg-white dark:bg-slate-900/80 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 space-y-8 backdrop-blur-xl shadow-xs">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cronometría de Precisión Calibrada por Red</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Hora Exacta en Tiempo Real y Reloj Mundial Online
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Bienvenido a <strong className="text-slate-900 dark:text-white">TimeNumbers</strong>, la plataforma internacional de sincronización horaria y utilidades de productividad temporal. Ofrecemos la hora exacta en vivo para más de 500 capitales y centros financieros del mundo, convertidores visuales de zonas horarias, cálculo de solapamiento de jornadas laborales y herramientas de astronomía civil.
            </p>
          </div>

          {/* Three Key Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Precisión Atómica NTP
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Cada segundo mostrado se calibra contra relojes atómicos UTC mediante triple muestreo de latencia de red, garantizando cero desfase en su pantalla.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Base de Datos IANA Canónica
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Seguimiento en tiempo real de transiciones de horario de verano (DST) y reglas horarias geopolíticas en más de 400 zonas horarias oficiales.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Solapamiento y Colaboración
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Conecte equipos remotos distribuidos entre Madrid, México, Buenos Aires, Nueva York y Tokio sin confusiones en convocatorias internacionales.
              </p>
            </div>
          </div>

          {/* Spanish FAQs */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <FaqAccordion items={SPANISH_HOME_FAQS} />
          </div>
        </section>

        {/* Related Links Hub */}
        <RelatedLinksHub
          currentPath="/es"
          title="Explorar el Directorio de Horas y Zonas del Mundo"
          subtitle="Acceso directo a capitales internacionales, husos horarios, calculadoras y guías de cronometría"
        />

      </div>
    </div>
  );
}
