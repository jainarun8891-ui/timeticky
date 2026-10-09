"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';

export function Footer() {
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith('/es') ?? false;
  const prefix = isSpanish ? '/es' : '';

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 mt-16 py-10 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          {/* Left: Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
              <Globe className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              {siteConfig.name}
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              {isSpanish ? 'Un mundo más conectado' : 'A more connected world'}
            </span>
          </div>

          {/* Right: Tagline */}
          <div className="text-xs font-medium text-slate-400 dark:text-slate-500 text-center md:text-right">
            {isSpanish
              ? 'Cronometría de Precisión • Husos Horarios IANA Canónicos • Sincronización NTP Sub-Milisegundo'
              : 'Precision Chronometry • Canonical IANA Timezones • Sub-Millisecond NTP Synchronization'}
          </div>
        </div>

        {/* Links Grid: 7 Structured Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 font-medium text-xs">
          {/* 1. Clocks & Dials */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              {isSpanish ? 'Relojes y Esferas' : 'Clocks & Dials'}
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href={`${prefix}/world-clock`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Reloj Mundial' : 'World Clock Dashboard'}</Link></li>
              <li><Link prefetch={false} href={prefix || '/'} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Inicio de Relojes' : 'Global Clocks Home'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/clock`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Reloj de Hora Exacta' : 'Exact Time Clock'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/analog-clock`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Reloj Analógico' : 'Analog Clock Dial'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/fullscreen-clock`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Pantalla Completa' : 'Fullscreen Desk Clock'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/world-clock-wall`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Muro Multireloj' : 'Multi-Clock World Wall'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/atomic-clock`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Reloj Atómico UTC' : 'Atomic Clock Standard'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/clock-accuracy`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Test de Precisión' : 'Clock Accuracy Test'}</Link></li>
            </ul>
          </div>

          {/* 2. Timers & Productivity */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              {isSpanish ? 'Temporizadores' : 'Timers & Audio'}
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href={`${prefix}/pomodoro`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Temporizador Pomodoro' : 'Pomodoro Timer'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/timer`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Cuenta Regresiva' : 'Countdown Timer'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/countdown`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Cuenta Atrás para Eventos' : 'Countdown Events'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/life-in-weeks`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold text-rose-600 dark:text-rose-400">{isSpanish ? 'La Vida en Semanas' : 'Life in Weeks (Memento Mori)'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/stopwatch`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Cronómetro Online' : 'Online Stopwatch'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/alarm`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Reloj con Alarma' : 'Online Alarm Clock'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/calendar`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Calendario Global' : 'Global Calendar'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/holidays`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Días Feriados' : 'World Public Holidays'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/today`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Detalles de Hoy' : "Today's Date & Details"}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/week-number`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Número de Semana ISO' : 'ISO Week Number'}</Link></li>
            </ul>
          </div>

          {/* 3. Calculators & Converters */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              {isSpanish ? 'Calculadoras' : 'Calculators'}
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href={`${prefix}/converter`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Conversor de Zonas' : 'Time Zone Converter'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/hours-calculator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold text-blue-600 dark:text-blue-400">{isSpanish ? 'Calculadora de Horas' : 'Work Hours Calculator'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/best-time-to-call`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Mejor Hora para Llamar' : 'Best Time to Call'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/military-time`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Hora Militar 24h' : 'Military Time 24h'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/timezone/vs`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Comparador Zonas (VS)' : 'Timezone VS Pairs'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/sleep-calculator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold text-blue-600 dark:text-blue-400">{isSpanish ? 'Calculadora de Sueño' : 'Sleep Cycle Calculator'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/meeting-cost-calculator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold text-emerald-600 dark:text-emerald-400">{isSpanish ? 'Costo de Reuniones' : 'Meeting Cost Calculator'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/converter/difference`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Diferencias Horarias' : 'City Time Differences'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/converter/compare`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Comparar Ciudades' : 'Compare World Cities'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/converter`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? '552 Pares Horarios' : '552 Timezone Pairs'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/meeting-planner`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Planificador de Reuniones' : 'Meeting Planner Grid'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/overlap-calculator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Solapamiento Horario' : 'Overlap Calculator'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/date-difference`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Diferencia de Fechas' : 'Date Difference'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/date-calculator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Sumar / Restar Fechas' : 'Date Add / Subtract'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/business-days-calculator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Días Hábiles' : 'Business Days'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/birthday-calculator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Edad y Cumpleaños' : 'Birthday & Age'}</Link></li>
            </ul>
          </div>

          {/* 4. Timezones & Travel */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              {isSpanish ? 'Husos y Mapa' : 'Timezones & Map'}
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href={`${prefix}/united-states-time-now`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Hora en EE. UU.' : 'US Time Now'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/time-zones`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? '400+ Husos Horarios' : '400+ Time Zones'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/timezone-map`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Mapa Interactivo' : 'Interactive Time Map'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/world-map`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Mapa Solar Mundial' : 'World Sun Map (Live)'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/cities`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Directorio de Ciudades' : 'World Cities Directory'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/countries`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Directorio de Países' : 'Country Time Directory'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/dialing-codes`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Prefijos Telefónicos' : 'Dialing Codes'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/jet-lag-calculator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Calculadora de Jet Lag' : 'Jet Lag Calculator'}</Link></li>
            </ul>
          </div>

          {/* 5. Solar, Lunar & Ephemeris */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              {isSpanish ? 'Sol y Luna' : 'Sun & Moon Lab'}
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href={`${prefix}/sun`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Centro de Astronomía' : 'Astronomy & Sun Hub'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/golden-hour`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Hora Dorada' : 'Golden Hour Times'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/sun`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Amanecer y Atardecer' : 'Sunrise & Sunset'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/sun/new-york`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Sol: Nueva York' : 'Sun: New York'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/sun/london`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Sol: Londres' : 'Sun: London'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/sun/madrid`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Sol: Madrid' : 'Sun: Madrid'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/sun/tokyo`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Sol: Tokio' : 'Sun: Tokyo'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/sun/paris`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Sol: París' : 'Sun: Paris'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/moon`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Fases de la Luna' : 'Moon Phases'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/moon/new-york`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Luna: Nueva York' : 'Moon: New York'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/moon/london`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Luna: Londres' : 'Moon: London'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/moon/tokyo`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Luna: Tokio' : 'Moon: Tokyo'}</Link></li>
            </ul>
          </div>

          {/* 6. Daylight Saving & Standards */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              {isSpanish ? 'DST y Estándares' : 'DST & Standards'}
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href={`${prefix}/utc`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Tiempo Universal (UTC)' : 'Coordinated Universal Time (UTC)'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/daylight-saving-time`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Horario de Verano' : 'DST Hub'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/daylight-saving-time/2026`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Horario de Verano 2026' : 'Daylight Saving 2026'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/daylight-saving-time/2027`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Horario de Verano 2027' : 'Daylight Saving 2027'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/daylight-saving-time/united-states`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'DST Estados Unidos' : 'United States DST'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/daylight-saving-time/europe`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Hora de Verano Europa' : 'Europe Summer Time'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/unix-time`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Timestamp Unix' : 'Unix Timestamp Studio'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/unix-time-converter`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Conversor Epoch' : 'Unix Epoch Converter'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/iso-8601`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Analizador ISO 8601' : 'ISO 8601 Parser'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/api-docs`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'API para Desarrolladores' : 'Developer Time API'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/learn`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Academia de Horología' : 'Horology Academy'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/learn/seo-simulator`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Simulador SERP' : 'SERP Simulator'}</Link></li>
            </ul>
          </div>

          {/* 7. Company & Support */}
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2.5 uppercase tracking-wider">
              {isSpanish ? 'Acerca de y Legal' : 'About & Legal'}
            </h5>
            <ul className="space-y-1.5">
              <li><Link prefetch={false} href={`${prefix}/about`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Acerca de TimeNumbers' : 'About TimeNumbers'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/contact`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Contacto y Soporte' : 'Contact & Support'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/blog`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Blog de Cronometría' : 'Chronometry Blog'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/faq`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Preguntas Frecuentes' : 'Global Time FAQs'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/widgets`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Widgets de Reloj Web' : 'Embed Clock Widgets'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/data-sources`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Fuentes de Datos' : 'Data Sources'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/privacy`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Política de Privacidad' : 'Privacy Policy'}</Link></li>
              <li><Link prefetch={false} href={`${prefix}/terms`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{isSpanish ? 'Términos de Servicio' : 'Terms of Service'}</Link></li>
            </ul>
          </div>
        </div>

        {/* Global Metropolitan City Clocks (Canonical Direct Links) */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {isSpanish ? 'Relojes de Ciudades Principales del Mundo' : 'Popular World City Clocks'}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
            <Link prefetch={false} href={`${prefix}/time/new-york`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Nueva York</Link>
            <Link prefetch={false} href={`${prefix}/time/london`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Londres</Link>
            <Link prefetch={false} href={`${prefix}/time/madrid`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Madrid</Link>
            <Link prefetch={false} href={`${prefix}/time/mexico-city`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Ciudad de México</Link>
            <Link prefetch={false} href={`${prefix}/time/buenos-aires`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Buenos Aires</Link>
            <Link prefetch={false} href={`${prefix}/time/bogota`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Bogotá</Link>
            <Link prefetch={false} href={`${prefix}/time/santiago`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Santiago</Link>
            <Link prefetch={false} href={`${prefix}/time/tokyo`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tokio</Link>
            <Link prefetch={false} href={`${prefix}/time/paris`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">París</Link>
            <Link prefetch={false} href={`${prefix}/time/berlin`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Berlín</Link>
            <Link prefetch={false} href={`${prefix}/time/rome`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Roma</Link>
            <Link prefetch={false} href={`${prefix}/time/sao-paulo`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">São Paulo</Link>
            <Link prefetch={false} href={`${prefix}/time/los-angeles`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Los Ángeles</Link>
            <Link prefetch={false} href={`${prefix}/time/chicago`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Chicago</Link>
            <Link prefetch={false} href={`${prefix}/time/toronto`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Toronto</Link>
            <Link prefetch={false} href={`${prefix}/time/dubai`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dubái</Link>
            <Link prefetch={false} href={`${prefix}/time/sydney`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sídney</Link>
            <Link prefetch={false} href={`${prefix}/time/singapore`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Singapur</Link>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-400" suppressHydrationWarning>
          © {new Date().getFullYear()} {siteConfig.name}. {isSpanish ? 'Todos los relojes mundiales sincronizados con el estándar de referencia atómica UTC.' : 'All global times synchronized to UTC atomic reference standard.'}
        </div>
      </div>
    </footer>
  );
}
