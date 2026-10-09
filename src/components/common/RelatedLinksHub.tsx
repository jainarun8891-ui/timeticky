"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, ArrowRight, ArrowLeftRight, Users, Sparkles, BookOpen, Clock, Calendar, Sun, Phone, Monitor, Plane, Bell, ShieldCheck, Map, Moon, Camera, Code, Layers } from 'lucide-react';
import { CITIES } from '@/lib/geo/cities';
import { TIMEZONES } from '@/lib/time/timezones';
import { getCityRootSlug, findCityByRootSlug } from '@/lib/geo/city-lookup';

interface RelatedLinksHubProps {
  currentPath?: string;
  title?: string;
  subtitle?: string;
  locale?: 'en' | 'es' | string;
}

export function RelatedLinksHub({
  currentPath = '',
  title,
  subtitle,
  locale,
}: RelatedLinksHubProps) {
  const pathname = usePathname();
  const isEs = locale === 'es' || pathname?.startsWith('/es') || currentPath.startsWith('/es');
  const resolvedTitle = title || (isEs ? 'Explorar herramientas de hora y zonas horarias' : 'Explore Global Time & Related Directories');
  const resolvedSubtitle = subtitle || (isEs ? 'Acceso rápido a relojes de capitales internacionales, husos horarios y cronómetros' : 'Quick access to international capitals, timezone offsets, chronometry tools, and horology guides');
  const prefix = isEs ? '/es' : '';
  const targetCitySlugs = [
    'new-york', 'london', 'tokyo', 'paris', 'berlin', 'zurich',
    'madrid', 'mumbai', 'bengaluru', 'hong-kong', 'rome',
    'chicago', 'los-angeles', 'san-francisco', 'washington-dc', 'sao-paulo',
    'toronto', 'seoul', 'cairo', 'dubai', 'sydney', 'singapore'
  ];
  const topCities = targetCitySlugs
    .map(slug => findCityByRootSlug(slug))
    .filter((c): c is (typeof CITIES)[0] => !!c);

  const topComparisons = isEs
    ? [
        { label: 'Directorio de las 92 Diferencias entre Ciudades →', url: '/converter/difference' },
        { label: 'París vs Nueva York', url: '/converter/difference/paris-to-new-york' },
        { label: 'Londres vs Tokio', url: '/converter/difference/london-to-tokyo' },
        { label: 'Nueva York vs Londres', url: '/converter/difference/new-york-to-london' },
        { label: 'Nueva York vs São Paulo', url: '/converter/difference/new-york-to-sao-paulo' },
        { label: 'Nueva York vs Honolulu', url: '/converter/difference/new-york-to-honolulu' },
        { label: 'Los Ángeles vs Honolulu', url: '/converter/difference/los-angeles-to-honolulu' },
        { label: 'Dubái vs Delhi', url: '/converter/difference/dubai-to-delhi' },
        { label: 'Tokio vs Sídney', url: '/converter/difference/tokyo-to-sydney' },
        { label: 'San Francisco vs París', url: '/converter/difference/san-francisco-to-paris' },
        { label: 'Matriz de Comparación de Todas las Ciudades →', url: '/converter/compare' },
      ]
    : [
        { label: 'All 92 City Differences Directory →', url: '/converter/difference' },
        { label: 'Paris vs New York', url: '/converter/difference/paris-to-new-york' },
        { label: 'London vs Tokyo', url: '/converter/difference/london-to-tokyo' },
        { label: 'New York vs London', url: '/converter/difference/new-york-to-london' },
        { label: 'New York vs São Paulo', url: '/converter/difference/new-york-to-sao-paulo' },
        { label: 'New York vs Honolulu', url: '/converter/difference/new-york-to-honolulu' },
        { label: 'Los Angeles vs Honolulu', url: '/converter/difference/los-angeles-to-honolulu' },
        { label: 'Dubai vs Delhi', url: '/converter/difference/dubai-to-delhi' },
        { label: 'Tokyo vs Sydney', url: '/converter/difference/tokyo-to-sydney' },
        { label: 'San Francisco vs Paris', url: '/converter/difference/san-francisco-to-paris' },
        { label: 'Compare All Cities Matrix →', url: '/converter/compare' },
      ];

  const tools = isEs
    ? [
        { name: 'Diferencias Horarias entre Ciudades', desc: 'Horas y solapamiento para más de 92 pares de ciudades', url: '/converter/difference', icon: ArrowLeftRight },
        { name: 'Tiempo Universal Coordinado (UTC)', desc: 'Estándar de referencia atómica y desfase UTC cero', url: '/utc', icon: Globe },
        { name: 'Conversor Multizona Horaria', desc: 'Convierte horas entre zonas mundiales y ciudades', url: '/converter', icon: Layers },
        { name: 'Comparar Ciudades del Mundo', desc: 'Diferencia horaria directa y solapamiento laboral', url: '/converter/compare', icon: ArrowLeftRight },
        { name: 'Hora en Estados Unidos', desc: 'Relojes atómicos en todas las zonas de EE. UU.', url: '/united-states-time-now', icon: Globe },
        { name: 'Reloj de Hora Exacta', desc: 'Cronómetro digital de precisión con referencia atómica', url: '/clock', icon: Clock },
        { name: 'Temporizador Pomodoro', desc: 'Intervalos 25/5 de productividad y concentración', url: '/pomodoro', icon: Bell },
        { name: 'Reloj Analógico de Precisión', desc: 'Segundero continuo y esfera de reloj suizo', url: '/analog-clock', icon: Clock },
        { name: '552 Conversores Horarios', desc: 'Línea de tiempo visual entre 552 pares de zonas', url: '/converter', icon: Layers },
        { name: 'Diferencia entre Fechas', desc: 'Días, semanas, meses y días laborables exactos', url: '/date-difference', icon: Calendar },
        { name: 'Calculadora de Fechas', desc: 'Suma o resta días, semanas y meses a cualquier fecha', url: '/date-calculator', icon: Calendar },
        { name: 'Calculadora de Hora Dorada', desc: 'Iluminación para fotografía y crepúsculo civil', url: '/golden-hour', icon: Camera },
        { name: 'Salida y Puesta del Sol', desc: 'Horas solares y crepúsculo con algoritmo NOAA', url: '/sun', icon: Sun },
        { name: 'Fases Lunares e Iluminación', desc: 'Porcentaje de iluminación lunar en vivo y ciclo sinódico', url: '/moon', icon: Moon },
        { name: 'Mapa Mundial Interactivo', desc: 'Terminador solar en tiempo real y 46 relojes en vivo', url: '/world-map', icon: Globe },
        { name: 'Directorio de 400+ Zonas Horarias', desc: 'Base de datos canónica IANA con relojes en vivo', url: '/time-zones', icon: Globe },
        { name: 'Mapa de Husos Horarios', desc: 'Franjas horarias mundiales con husos UTC clicables', url: '/timezone-map', icon: Map },
        { name: 'Directorio de Ciudades', desc: 'Hora local actual y población en metrópolis mundiales', url: '/cities', icon: Globe },
        { name: 'Detalles de la Fecha de Hoy', desc: 'Día del año, semana ISO, día juliano y progreso anual', url: '/today', icon: Calendar },
        { name: 'Número de Semana ISO', desc: 'Número de semana ISO actual y trimestres del año', url: '/week-number', icon: Calendar },
        { name: 'Conversor de Timestamp Unix', desc: 'Segundos epoch a fecha legible UTC y local', url: '/unix-time-converter', icon: Clock },
        { name: 'Laboratorio de Astronomía', desc: 'Amanecer, atardecer, hora mágica y fases lunares', url: '/sun', icon: Sun },
        { name: 'Prefijos Telefónicos Internacionales', desc: 'Códigos de llamada por país y mejores horas de contacto', url: '/dialing-codes', icon: Phone },
        { name: 'Muro Multireloj Mundial', desc: 'Kiosco con esferas suizas analógicas y digitales', url: '/world-clock-wall', icon: Monitor },
        { name: 'Calculadora de Jet Lag', desc: 'Protocolo de ajuste de luz circadiana en viajes', url: '/jet-lag-calculator', icon: Plane },
        { name: 'Reloj Despertador Online', desc: 'Pantalla de cabecera con alarmas de audio Web Audio', url: '/alarm', icon: Bell },
        { name: 'Planificador de Reuniones', desc: 'Ventana de solapamiento en más de 4 centros globales', url: '/meeting-planner', icon: Users },
        { name: 'Solapamiento de Equipos', desc: 'Matriz de horas compartidas para equipos remotos', url: '/overlap-calculator', icon: Users },
        { name: 'Días Laborables y Hábiles', desc: 'Días hábiles entre fechas y plazos de 90 días', url: '/business-days-calculator', icon: Calendar },
        { name: 'Cuenta Atrás y Edad', desc: 'Semanas, días y seguimiento cronológico exacto', url: '/birthday-calculator', icon: Clock },
        { name: 'Precisión Atómica de Reloj', desc: 'Prueba de latencia y deriva NTP de tu reloj', url: '/clock-accuracy', icon: ShieldCheck },
        { name: 'Estudio de Timestamp Unix', desc: 'Conversor de segundos epoch y laboratorio del año 2038', url: '/unix-time', icon: Clock },
        { name: 'Hora Militar y 24 Horas', desc: 'Conversor de reloj de 24 horas y tabla de pronunciación militar', url: '/military-time', icon: Clock },
        { name: 'Calculadora de Horas de Trabajo', desc: 'Calcula horas trabajadas, pausas de almuerzo, horas extras y nómina', url: '/hours-calculator', icon: Calendar },
        { name: 'Mejor Hora para Llamar', desc: 'Ventana de solapamiento ideal para llamadas entre países y ciudades', url: '/best-time-to-call', icon: Phone },
        { name: 'Comparador de Zonas Horarias', desc: 'Diferencias cara a cara (CST vs EST, PST vs MST, GMT vs UTC)', url: '/timezone/vs', icon: ArrowLeftRight },
        { name: 'Horario de Verano en el Mundo', desc: 'Fechas de cambio de hora en primavera y otoño', url: '/daylight-saving-time', icon: Calendar },
        { name: 'Academia de Horología', desc: 'Fundamentos de UTC, segundos intercalares y cronometría', url: '/learn', icon: BookOpen },
      ]
    : [
        { name: 'City Time Differences Directory', desc: 'Exact hours ahead & overlap for 92+ city pairs', url: '/converter/difference', icon: ArrowLeftRight },
        { name: 'Coordinated Universal Time (UTC)', desc: 'Canonical atomic reference standard and UTC offset zero', url: '/utc', icon: Globe },
        { name: 'Multi-Zone Time Converter Hub', desc: 'Convert hours across global zones and cities', url: '/converter', icon: Layers },
        { name: 'Compare World Cities', desc: 'Direct side-by-side time difference and overlap', url: '/converter/compare', icon: ArrowLeftRight },
        { name: 'United States Time Now', desc: 'Live atomic clocks across all US time zones and Washington D.C.', url: '/united-states-time-now', icon: Globe },
        { name: 'Exact Time Digital Clock', desc: 'Precision digital chronometer with seconds and atomic reference', url: '/clock', icon: Clock },
        { name: 'Online Pomodoro Timer', desc: '25/5 study and deep work productivity intervals', url: '/pomodoro', icon: Bell },
        { name: 'Accurate Analog Clock', desc: 'Smooth sweeping second hand and Swiss watch dial', url: '/analog-clock', icon: Clock },
        { name: '552 Timezone Converters', desc: 'Visual timeline converter across 552 global timezone pairs', url: '/converter', icon: Layers },
        { name: 'Date Difference Calculator', desc: 'Exact days, weeks, months & business days between dates', url: '/date-difference', icon: Calendar },
        { name: 'Date Calculator', desc: 'Add or subtract days, weeks, months & business days', url: '/date-calculator', icon: Calendar },
        { name: 'Golden Hour Calculator', desc: 'Exact photography lighting, blue hour & civil twilight times', url: '/golden-hour', icon: Camera },
        { name: 'Sunrise & Sunset Times Hub', desc: 'NOAA algorithm solar dawn and dusk times worldwide', url: '/sun', icon: Sun },
        { name: 'Moon Phases & Illumination', desc: 'Live lunar surface illumination % and 29.5-day synodic cycle', url: '/moon', icon: Moon },
        { name: 'Interactive World Time Map', desc: 'Real-time solar terminator, day/night zones & 46 live clocks', url: '/world-map', icon: Globe },
        { name: '400+ Time Zones Directory', desc: 'Complete canonical IANA database with live ticking clocks', url: '/time-zones', icon: Globe },
        { name: 'Interactive Timezone Map', desc: 'Live global clock bands with clickable UTC offset zones', url: '/timezone-map', icon: Map },
        { name: 'World Cities Directory', desc: 'Current local time and population across global metropolises', url: '/cities', icon: Globe },
        { name: 'Today\'s Date Details', desc: 'Day of year, ISO week, Julian day & year progress percentage', url: '/today', icon: Calendar },
        { name: 'ISO Week Number Calculator', desc: 'Current ISO week number, calendar quarters & weeks remaining', url: '/week-number', icon: Calendar },
        { name: 'ISO 8601 String Parser', desc: 'Parse, validate and format ISO-8601 date-time strings', url: '/iso-8601', icon: Code },
        { name: 'Unix Timestamp Converter', desc: 'Epoch seconds converter to human readable UTC & local time', url: '/unix-time-converter', icon: Clock },
        { name: 'Astronomy & Twilight Lab', desc: 'Sunrise, sunset, golden hour & moon phase calendar', url: '/sun', icon: Sun },
        { name: 'International Dialing Codes', desc: 'Country calling codes & smart calling hour guide', url: '/dialing-codes', icon: Phone },
        { name: 'Multi-Clock World Wall', desc: 'Trading floor kiosk with Swiss analog & digital dials', url: '/world-clock-wall', icon: Monitor },
        { name: 'Flight & Jet Lag Calculator', desc: 'Travel time & circadian light adjustment protocol', url: '/jet-lag-calculator', icon: Plane },
        { name: 'Online Alarm Clock', desc: 'Fullscreen bedside display with Web Audio chimes', url: '/alarm', icon: Bell },
        { name: 'Meeting Planner', desc: 'Overlap working window across 4+ global hubs', url: '/meeting-planner', icon: Users },
        { name: 'Team Overlap Calculator', desc: 'Mutual working hours matrix for remote teams', url: '/overlap-calculator', icon: Users },
        { name: 'Business Days Calculator', desc: 'Working days between dates & 90-day deadlines', url: '/business-days-calculator', icon: Calendar },
        { name: 'Birthday & Age Countdown', desc: 'Weeks, days & exact chronological age tracker', url: '/birthday-calculator', icon: Clock },
        { name: 'Atomic Clock Accuracy', desc: 'NTP drift latency benchmark', url: '/clock-accuracy', icon: ShieldCheck },
        { name: 'Unix Timestamp Studio', desc: 'Epoch seconds converter & 2038 lab', url: '/unix-time', icon: Clock },
        { name: 'Military Time Converter & Chart', desc: 'Convert 12h to 24h military time with spoken pronunciation & printable chart', url: '/military-time', icon: Clock },
        { name: 'Work Hours & Timesheet Calculator', desc: 'Calculate weekly hours, lunch deductions, overtime pay & gross wages', url: '/hours-calculator', icon: Calendar },
        { name: 'Best Time to Call Calculator', desc: 'Find overlapping daytime calling window between international cities', url: '/best-time-to-call', icon: Phone },
        { name: 'Time Zone VS Comparisons', desc: 'Head-to-head differences (CST vs EST, PST vs MST, GMT vs UTC)', url: '/timezone/vs', icon: ArrowLeftRight },
        { name: 'Daylight Saving Schedule', desc: 'Global spring forward & fall back dates', url: '/daylight-saving-time', icon: Calendar },
        { name: 'Horology Learning Academy', desc: 'Deep dive into UTC, leap seconds & chronometry', url: '/learn', icon: BookOpen },
        { name: 'SEO Authority Simulator', desc: 'Interactive DA vs Keyword Difficulty ranking simulator', url: '/learn/seo-simulator', icon: Sparkles },
      ];

  const filteredTools = tools.filter(t => t.url !== currentPath);

  return (
    <section className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-8 mt-12 space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
            {resolvedTitle}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {resolvedSubtitle}
          </p>
        </div>
        <Link
          href={`${prefix}/world-map`}
          prefetch={false}
          className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          <span>{isEs ? 'Explorar mapa interactivo' : 'Explore Interactive Map'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid: Global Tools */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {isEs ? 'Herramientas de Precisión Horológica' : 'Precision Horology & Global Time Tools'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredTools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.url}
                href={`${prefix}${t.url}`}
                prefetch={false}
                className="group p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-slate-700/60 border border-slate-100 dark:border-slate-800 transition-all flex items-start gap-3"
              >
                <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">
                    {t.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Popular Global Comparisons */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {isEs ? 'Diferencias Horarias Entre Ciudades' : 'High-Volume City Time Differences'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {topComparisons.map((c) => (
            <Link
              key={c.url}
              href={`${prefix}${c.url}`}
              prefetch={false}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-slate-200/60 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-all"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Popular World Cities */}
      <div className="space-y-3">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {isEs ? 'Capitales Mundiales y Centros Financieros' : 'Global Financial & Metropolitan Capitals'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {topCities.map((city) => {
            const canonicalSlug = getCityRootSlug(city);
            return (
              <Link
                key={city.id}
                href={`${prefix}/time/${canonicalSlug}`}
                prefetch={false}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-slate-200/60 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-all"
              >
                {city.name}, {city.country}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
