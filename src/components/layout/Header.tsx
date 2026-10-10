"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search, Moon, Sun, Globe, ChevronDown, Monitor, SunMedium,
  Phone, Plane, Bell, Users, ArrowLeftRight, Clock, Sunset,
  Sparkles, ArrowRight, Layers, Menu, X, ChevronRight,
  BookOpen, Newspaper, MapPin, Compass, Calendar, Camera, TrendingUp, Sliders
} from 'lucide-react';
import { siteConfig } from '@/lib/config/site.config';
import { getLocalizedPath } from '@/lib/i18n';

type ThemeMode = 'daylight' | 'evening' | 'dark';

export function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<ThemeMode>('daylight');
  const [mounted, setMounted] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [convertersOpen, setConvertersOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileConvertersOpen, setMobileConvertersOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const convertersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const html = document.documentElement;
    if (html.classList.contains('evening')) {
      setTheme('evening');
    } else if (html.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('daylight');
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
      if (convertersRef.current && !convertersRef.current.contains(event.target as Node)) {
        setConvertersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileConvertersOpen(false);
    setMobileToolsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close open menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setToolsOpen(false);
        setConvertersOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const changeTheme = (mode: ThemeMode) => {
    setTheme(mode);
    const html = document.documentElement;
    if (mode === 'evening') {
      html.classList.add('dark', 'evening');
      try { localStorage.setItem('gt_theme', 'evening'); } catch {}
    } else if (mode === 'dark') {
      html.classList.add('dark');
      html.classList.remove('evening');
      try { localStorage.setItem('gt_theme', 'dark'); } catch {}
    } else {
      html.classList.remove('dark', 'evening');
      try { localStorage.setItem('gt_theme', 'daylight'); } catch {}
    }
  };

  const isSpanish = pathname?.startsWith('/es') ?? false;
  const prefix = isSpanish ? '/es' : '';

  const featureTools = isSpanish ? [
    { name: 'Deslizador Horario Mundial', desc: 'Compara ciudades en una barra 24h', href: '/es/time-slider', icon: Sliders },
    { name: 'Horarios de Bolsas Mundiales', desc: 'NYSE, Londres, Tokio y sesiones Forex', href: '/es/market-hours', icon: TrendingUp },
    { name: 'Calculadora de Ciclos de Sueño', desc: 'Ciclos de 90 min y hora óptima', href: '/es/sleep-calculator', icon: Moon },
    { name: 'Costo de Reuniones en Vivo', desc: 'Gasto por segundo en tiempo real', href: '/es/meeting-cost-calculator', icon: Users },
    { name: 'La Vida en Semanas Grid', desc: 'Lienzo Memento Mori de 4.160 semanas', href: '/es/life-in-weeks', icon: Calendar },
    { name: 'Estudio de Cuenta Atrás', desc: 'Temporizadores para eventos', href: '/es/countdown', icon: Sparkles },
    { name: 'Conversor de Zonas Horarias', desc: 'Convierte horas entre zonas', href: '/es/converter', icon: ArrowLeftRight },
    { name: 'Comparar Ciudades del Mundo', desc: 'Diferencia horaria directa', href: '/es/converter/compare', icon: ArrowLeftRight },
    { name: 'Diferencia Horaria entre Ciudades', desc: 'Horas y solapamiento para 92+ pares', href: '/es/converter/difference', icon: ArrowLeftRight },
    { name: '552 Conversores Horarios', desc: 'Cuadrícula visual de 552 zonas', href: '/es/converter', icon: ArrowLeftRight },
    { name: 'Reloj de Hora Exacta', desc: 'Cronómetro digital atómico', href: '/es/clock', icon: Clock },
    { name: 'Mapa Mundial Interactivo', desc: 'Terminador solar y 46 relojes', href: '/es/world-map', icon: Globe },
    { name: 'Temporizador Pomodoro Online', desc: 'Intervalos 25/5 de productividad', href: '/es/pomodoro', icon: Bell },
    { name: 'Muro Multireloj Mundial', desc: 'Kiosco con esferas suizas', href: '/es/world-clock-wall', icon: Monitor },
    { name: 'Astronomía Solar y Lunar', desc: 'Amanecer, atardecer y fases lunares', href: '/es/sun', icon: SunMedium },
    { name: 'Diferencia de Fechas', desc: 'Días y meses exactos entre fechas', href: '/es/date-difference', icon: Calendar },
    { name: 'Sumar o Restar a una Fecha', desc: 'Días naturales y días hábiles', href: '/es/date-calculator', icon: Calendar },
    { name: 'Calculadora de Hora Dorada', desc: 'Iluminación y fotografía', href: '/es/golden-hour', icon: Camera },
    { name: 'Prefijos Telefónicos', desc: 'Códigos internacionales por país', href: '/es/dialing-codes', icon: Phone },
    { name: 'Calculadora de Jet Lag', desc: 'Protocolo de ajuste circadiano', href: '/es/jet-lag-calculator', icon: Plane },
    { name: 'Reloj Despertador Online', desc: 'Alarma de cabecera con sonido', href: '/es/alarm', icon: Bell },
    { name: 'Planificador de Reuniones', desc: 'Ventana de solapamiento internacional', href: '/es/meeting-planner', icon: Users },
    { name: 'Hora Militar y Reloj 24h', desc: 'Conversor a 24 horas y pronunciación', href: '/es/military-time', icon: Clock },
    { name: 'Calculadora de Horas de Trabajo', desc: 'Hojas de horas, descansos y horas extras', href: '/es/hours-calculator', icon: Calendar },
    { name: 'Mejor Hora para Llamar', desc: 'Ventana de llamadas internacionales sin despertar', href: '/es/best-time-to-call', icon: Phone },
    { name: 'Comparador de Zonas (VS)', desc: 'Diferencias cara a cara (CST vs EST, PST vs MST)', href: '/es/timezone/vs', icon: ArrowLeftRight },
    { name: 'Estudio de Timestamp Unix', desc: 'Conversor epoch y laboratorio 2038', href: '/es/unix-time', icon: Clock },
    { name: 'Reloj Analógico Suizo', desc: 'Esfera con segundero continuo', href: '/es/analog-clock', icon: Clock },
  ] : [
    { name: 'World Time Slider & Scrubber', desc: 'Visual 24h timeline across multi-cities', href: '/time-slider', icon: Sliders },
    { name: 'Global Market Hours Tracker', desc: 'NYSE, London, Tokyo & Forex sessions', href: '/market-hours', icon: TrendingUp },
    { name: 'Sleep Cycle Calculator', desc: '90-min cycles & optimal bedtimes', href: '/sleep-calculator', icon: Moon },
    { name: 'Meeting Cost Calculator', desc: 'Real-time live dollar burn odometer', href: '/meeting-cost-calculator', icon: Users },
    { name: 'Life in Weeks Grid', desc: 'Memento Mori 4,160-week longevity canvas', href: '/life-in-weeks', icon: Calendar },
    { name: 'Event Countdown Studio', desc: 'Custom shareable live event timers', href: '/countdown', icon: Sparkles },
    { name: 'Time Zone Converter', desc: 'Convert hours across global zones', href: '/converter', icon: ArrowLeftRight },
    { name: 'Compare World Cities', desc: 'Direct side-by-side time difference', href: '/converter/compare', icon: ArrowLeftRight },
    { name: 'City Time Differences', desc: 'Exact hours ahead & overlap for 92+ pairs', href: '/converter/difference', icon: ArrowLeftRight },
    { name: 'Timezone Converters', desc: '552 pairs with visual grid', href: '/converter', icon: ArrowLeftRight },
    { name: 'Exact Time Clock', desc: 'Precision digital chronometer', href: '/clock', icon: Clock },
    { name: 'Interactive World Map', desc: 'Solar terminator & 46 live clocks', href: '/world-map', icon: Globe },
    { name: 'Online Pomodoro Timer', desc: '25/5 study productivity intervals', href: '/pomodoro', icon: Bell },
    { name: 'Multi-Clock World Wall', desc: 'Trading floor kiosk with Swiss dials', href: '/world-clock-wall', icon: Monitor },
    { name: 'Solar & Lunar Astronomy', desc: 'Sunrise, sunset & moon phases', href: '/sun', icon: SunMedium },
    { name: 'Date Difference Calculator', desc: 'Exact days & months between dates', href: '/date-difference', icon: Calendar },
    { name: 'Date Add / Subtract', desc: 'Add or subtract days & business days', href: '/date-calculator', icon: Calendar },
    { name: 'Golden Hour Calculator', desc: 'Photography lighting & magic hour', href: '/golden-hour', icon: Camera },
    { name: 'International Dialing Codes', desc: 'Country calling codes & windows', href: '/dialing-codes', icon: Phone },
    { name: 'Flight & Jet Lag Calculator', desc: 'Flight duration & circadian protocol', href: '/jet-lag-calculator', icon: Plane },
    { name: 'Online Alarm Clock', desc: 'Bedside display with audio chimes', href: '/alarm', icon: Bell },
    { name: 'Meeting Planner', desc: 'Overlap window across global hubs', href: '/meeting-planner', icon: Users },
    { name: 'Military Time & 24h Chart', desc: '12h to 24h converter & spoken phonetic guide', href: '/military-time', icon: Clock },
    { name: 'Work Hours Calculator', desc: 'Timesheet, lunch breaks & overtime wages', href: '/hours-calculator', icon: Calendar },
    { name: 'Best Time to Call', desc: 'International calling window & daylight overlap', href: '/best-time-to-call', icon: Phone },
    { name: 'Time Zone VS Comparisons', desc: 'Side-by-side differences (CST vs EST, PST vs MST)', href: '/timezone/vs', icon: ArrowLeftRight },
    { name: 'Unix Timestamp Studio', desc: 'Epoch seconds converter & 2038 lab', href: '/unix-time', icon: Clock },
    { name: 'Analog Watch Dial', desc: 'Smooth sweeping second hand dial', href: '/analog-clock', icon: Clock },
  ];

  const popularConverters = [
    { label: 'GMT to EST', desc: isSpanish ? 'Londres → Nueva York' : 'London → New York', href: `${prefix}/converter/gmt-to-est` },
    { label: 'EST to GMT', desc: isSpanish ? 'Nueva York → Londres' : 'New York → London', href: `${prefix}/converter/est-to-gmt` },
    { label: 'IST to PST', desc: isSpanish ? 'India → California' : 'India → California', href: `${prefix}/converter/ist-to-pst` },
    { label: 'PST to EST', desc: isSpanish ? 'Pacífico → Oriental' : 'Pacific → Eastern', href: `${prefix}/converter/pst-to-est` },
    { label: 'GMT to IST', desc: isSpanish ? 'Londres → India' : 'London → India', href: `${prefix}/converter/gmt-to-ist` },
    { label: 'CET to EST', desc: isSpanish ? 'Europa → Nueva York' : 'Europe → New York', href: `${prefix}/converter/cet-to-est` },
    { label: 'BST to EST', desc: isSpanish ? 'UK Verano → Oriental' : 'UK Summer → Eastern', href: `${prefix}/converter/bst-to-est` },
    { label: 'UTC to IST', desc: isSpanish ? 'Estándar UTC → India' : 'UTC Standard → India', href: `${prefix}/converter/utc-to-ist` },
    { label: 'KST to GMT', desc: isSpanish ? 'Corea → Londres' : 'Korea → London', href: `${prefix}/converter/kst-to-gmt` },
    { label: 'AEST to GMT', desc: isSpanish ? 'Sídney → Londres' : 'Sydney → London', href: `${prefix}/converter/aest-to-gmt` },
  ];

  return (
    <>
      <header className="w-full bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/90 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-md transition-colors shadow-2xs">
        <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Brand Logo & Tagline */}
        <Link
          href={prefix || "/"}
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Globe className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-none truncate max-w-[130px] sm:max-w-none">
              {isSpanish ? 'Un mundo más conectado' : 'A more connected world'}
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
          <Link href={isSpanish ? "/es/world-clock" : "/world-clock"} className="text-blue-600 dark:text-blue-400 font-extrabold hover:text-blue-700 transition-colors">
            {isSpanish ? "Reloj Mundial" : "World Clock"}
          </Link>

          {/* Converters Mega Dropdown */}
          <div ref={convertersRef} className="relative flex items-center">
            <Link
              href={`${prefix}/converter`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5 py-2 font-bold"
            >
              <span>{isSpanish ? "Conversores" : "Converters"}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-black">
                552
              </span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setConvertersOpen(!convertersOpen);
                setToolsOpen(false);
              }}
              className="p-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              aria-label="Toggle converters dropdown"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${convertersOpen ? 'rotate-180' : ''}`} />
            </button>

            {convertersOpen && (
              <div className="absolute left-0 top-full mt-2 w-96 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-3">
                {/* Header ribbon */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isSpanish ? "Conversores Horarios" : "Timezone Converters"}</span>
                  </div>
                  <Link
                    href={`${prefix}/converter`}
                    onClick={() => setConvertersOpen(false)}
                    className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>{isSpanish ? "Ver los 552" : "View All 552"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Popular Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  {popularConverters.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      prefetch={false}
                      onClick={() => setConvertersOpen(false)}
                      className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-slate-800/80 transition-colors group"
                    >
                      <div className="font-mono font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {c.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {c.desc}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer Banner */}
                <Link
                  href={`${prefix}/converter`}
                  onClick={() => setConvertersOpen(false)}
                  className="w-full py-2 px-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/70 dark:border-blue-800/70 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isSpanish ? "Explorar las 552 Combinaciones" : "Browse All 552 Timezone Combinations"}</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          <Link href={isSpanish ? "/es/world-map" : "/world-map"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>{isSpanish ? "Mapa" : "World Map"}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
              Live
            </span>
          </Link>

          <Link href={isSpanish ? "/es/time-zones" : "/time-zones"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <span>{isSpanish ? "Zonas" : "Time Zones"}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              400+
            </span>
          </Link>

          <Link href={isSpanish ? "/es/world-clock-wall" : "/world-clock-wall"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {isSpanish ? "Muro" : "Wall Clock"}
          </Link>

          <Link href={isSpanish ? "/es/sun" : "/astronomy"} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {isSpanish ? "Sol y Luna" : "Astronomy"}
          </Link>

          {/* Tools Dropdown Menu */}
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => {
                setToolsOpen(!toolsOpen);
                setConvertersOpen(false);
              }}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 py-2 cursor-pointer font-bold"
            >
              <span>{isSpanish ? "Herramientas" : "Tools"}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[540px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-3 grid grid-cols-2 gap-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {featureTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      prefetch={false}
                      onClick={() => setToolsOpen(false)}
                      className="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all flex items-start gap-3 group"
                    >
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 group-hover:text-blue-600 transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors block">
                          {tool.name}
                        </span>
                        <span className="text-[11px] text-slate-400 block truncate">
                          {tool.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link href={`${prefix}/meeting-planner`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {isSpanish ? "Planificador" : "Meeting Planner"}
          </Link>
          <Link href={`${prefix}/learn`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {isSpanish ? "Aprender" : "Learn"}
          </Link>
          <Link href={`${prefix}/blog`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Blog
          </Link>
        </nav>

        {/* Right: Search, 3-State Theme Switcher, Perspective Tagline & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => {
              const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
              if (input) {
                input.focus();
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            type="button"
            className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title={isSpanish ? "Buscar" : "Search"}
            aria-label={isSpanish ? "Buscar" : "Search"}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* 3-State Segmented Theme Control: Daylight | Evening (Navy Blue) | Dark (Hidden on mobile < sm to keep navbar spacious, available in mobile menu) */}
          <div className="hidden sm:flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-2xs shrink-0">
            {/* Daylight / Light */}
            <button
              onClick={() => changeTheme('daylight')}
              type="button"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                theme === 'daylight'
                  ? 'bg-white text-amber-600 shadow-xs scale-102 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Daylight Theme (Light)"
            >
              <Sun className={`w-3.5 h-3.5 ${theme === 'daylight' ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isSpanish ? 'Día' : 'Day'}</span>
            </button>

            {/* Evening / Navy Blue Shade */}
            <button
              onClick={() => changeTheme('evening')}
              type="button"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                theme === 'evening'
                  ? 'bg-[#152758] text-sky-300 shadow-xs border border-sky-400/40 scale-102 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Evening Theme (Navy Blue Shade)"
            >
              <Sunset className={`w-3.5 h-3.5 ${theme === 'evening' ? 'text-orange-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isSpanish ? 'Tarde' : 'Evening'}</span>
            </button>

            {/* Dark / Midnight */}
            <button
              onClick={() => changeTheme('dark')}
              type="button"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 text-blue-400 shadow-xs border border-blue-500/40 scale-102 font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Dark Theme (Deep Midnight)"
            >
              <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-blue-400 fill-blue-400/20' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{isSpanish ? 'Noche' : 'Dark'}</span>
            </button>
          </div>

          {/* Desktop & Mobile Language Switcher: EN | ES (Compact on mobile) */}
          <div className="flex items-center p-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-2xs shrink-0">
            <Link
              href={getLocalizedPath(pathname, 'en')}
              prefetch={false}
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                !isSpanish
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="English"
            >
              EN
            </Link>
            <Link
              href={getLocalizedPath(pathname, 'es')}
              prefetch={false}
              className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all ${
                isSpanish
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
              title="Español"
            >
              ES
            </Link>
          </div>

          <span className="hidden xl:inline text-xs font-medium text-slate-400 dark:text-slate-500">
            {isSpanish ? 'Un mañana más conectado' : 'A more connected tomorrow'}
          </span>

          {/* Hamburger Menu Toggle Button (Visible on Mobile / Tablet, < lg) */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen((prev) => !prev);
            }}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/90 dark:border-slate-700/90 focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-800 dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Side Navigation Drawer (Rendered outside <header> to prevent backdrop-filter containing block trap) */}
    {mobileMenuOpen && (
      <div className="fixed inset-0 z-[100] lg:hidden" id="mobile-side-nav">
        {/* Semi-transparent Backdrop Overlay */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
          aria-hidden="true"
        />

        {/* Slide-out Side Nav Panel (from right edge) */}
        <div
          className="fixed inset-y-0 right-0 w-[88vw] max-w-sm h-full bg-white dark:bg-slate-900 border-l border-slate-200/90 dark:border-slate-800 shadow-2xl flex flex-col z-[101] animate-in slide-in-from-right duration-300 ease-out"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Side Nav Top Bar with Brand & Close Button */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 shrink-0">
            <Link
              href={prefix || "/"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xs">
                <Globe className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-none">
                  {isSpanish ? 'Un mundo más conectado' : 'A more connected world'}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer border border-slate-200/90 dark:border-slate-700/90 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5 text-slate-800 dark:text-white" />
            </button>
          </div>

          {/* Scrollable Side Nav Body */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {/* Language Switcher inside Mobile Drawer */}
            <div className="p-3.5 bg-slate-50/70 dark:bg-slate-950/50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{isSpanish ? 'Idioma' : 'Language'}</span>
              </span>
              <div className="flex items-center p-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 border border-slate-300/80 dark:border-slate-700 shadow-2xs">
                <Link
                  href={getLocalizedPath(pathname, 'en')}
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    !isSpanish
                      ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  English
                </Link>
                <Link
                  href={getLocalizedPath(pathname, 'es')}
                  prefetch={false}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    isSpanish
                      ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Español
                </Link>
              </div>
            </div>
            {/* Quick Search Trigger inside Side Nav */}
            <div className="p-3.5 bg-slate-50/60 dark:bg-slate-950/40 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
                    if (input) {
                      input.focus();
                      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 150);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 text-xs text-slate-400 dark:text-slate-400 shadow-xs text-left group hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                <span className="truncate">{isSpanish ? "Buscar en más de 50.000 ciudades y zonas..." : "Search 50,000+ cities & zones..."}</span>
              </button>
            </div>

            {/* Navigation Options List */}
            <nav className="p-3 space-y-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {/* World Clock */}
              <Link
                href={isSpanish ? "/es/world-clock" : "/world-clock"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {isSpanish ? "Reloj Mundial" : "World Clock"}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Relojes mundiales y diferencias horarias en vivo" : "Real-time world clocks & time differences"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* United States Time Now */}
              <Link
                href={`${prefix}/united-states-time-now`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {isSpanish ? "Hora en Estados Unidos" : "USA Time Now"}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold">
                        {isSpanish ? "Todas las Zonas" : "All US Zones"}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      Eastern, Central, Mountain, Pacific, Alaska & Hawaii
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Converters Accordion / Sub-Panel */}
              <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden bg-slate-50/40 dark:bg-slate-950/30 transition-colors">
                <button
                  type="button"
                  onClick={() => setMobileConvertersOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  aria-expanded={mobileConvertersOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <ArrowLeftRight className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {isSpanish ? "Conversores" : "Converters"}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-black">
                          552
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {isSpanish ? "Línea de tiempo visual y 552 combinaciones" : "Visual timeline grid & converter pairs"}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileConvertersOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {mobileConvertersOpen && (
                  <div className="p-3 pt-1 space-y-2.5 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150">
                    <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                      {isSpanish ? "Pares de Conversión Populares" : "Popular Converter Pairs"}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {popularConverters.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors group"
                        >
                          <div className="font-mono font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {c.label}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {c.desc}
                          </div>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`${prefix}/converter`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/70 dark:border-blue-800/70 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{isSpanish ? "Explorar las 552 Combinaciones" : "Browse All 552 Combinations"}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* World Map */}
              <Link
                href={isSpanish ? "/es/world-map" : "/world-map"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {isSpanish ? "Mapa Mundial" : "World Map"}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800">
                        Live
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Terminador solar y 46 relojes en vivo" : "Solar terminator & 46 live clocks"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Time Zones */}
              <Link
                href={isSpanish ? "/es/time-zones" : "/time-zones"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {isSpanish ? "Zonas Horarias" : "Time Zones"}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                        400+
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Zonas canónicas IANA y husos horarios" : "Canonical IANA timezones & offsets"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Wall Clock */}
              <Link
                href={isSpanish ? "/es/world-clock-wall" : "/world-clock-wall"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {isSpanish ? "Muro Multireloj" : "Wall Clock"}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Kiosco bursátil con esferas suizas" : "Trading floor kiosk with Swiss dials"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Astronomy */}
              <Link
                href={isSpanish ? "/es/sun" : "/astronomy"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <SunMedium className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {isSpanish ? "Astronomía Solar y Lunar" : "Astronomy"}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Amanecer, atardecer y fases lunares" : "Sunrise, sunset & moon phases"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Tools Accordion / Sub-Panel */}
              <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800/80 overflow-hidden bg-slate-50/40 dark:bg-slate-950/30 transition-colors">
                <button
                  type="button"
                  onClick={() => setMobileToolsOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                  aria-expanded={mobileToolsOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {isSpanish ? "Herramientas y Calculadoras" : "Tools & Calculators"}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold border border-teal-200/50 dark:border-teal-800">
                          {featureTools.length} {isSpanish ? "Herramientas" : "Tools"}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-normal">
                        {isSpanish ? "Herramientas de relojería, calculadoras y utilidades" : "Horological tools, calculators & utilities"}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileToolsOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {mobileToolsOpen && (
                  <div className="p-2 space-y-1 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-150">
                    {featureTools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          prefetch={false}
                          onClick={() => setMobileMenuOpen(false)}
                          className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200/80 dark:hover:border-slate-800 transition-all flex items-start gap-3 group"
                        >
                          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 group-hover:text-blue-600 transition-colors shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {tool.name}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {tool.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Meeting Planner */}
              <Link
                href={`${prefix}/meeting-planner`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {isSpanish ? "Planificador de Reuniones" : "Meeting Planner"}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Ventana de solapamiento en más de 4 centros globales" : "Overlap window across 4+ global hubs"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Country Directory */}
              <Link
                href={`${prefix}/countries`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {isSpanish ? "Directorio de Países" : "Country Directory"}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Más de 240 países y territorios con relojes" : "240+ countries & territories with clocks"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Learn */}
              <Link
                href={`${prefix}/learn`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {isSpanish ? "Aprender" : "Learn"}
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Academia de relojería, fundamentos del tiempo e historia" : "Horology academy, time fundamentals & history"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Blog */}
              <Link
                href={`${prefix}/blog`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Blog
                    </div>
                    <div className="text-[11px] text-slate-400 font-normal">
                      {isSpanish ? "Artículos, noticias horarias internacionales y guías" : "Articles, international time news & guides"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </nav>

            {/* Side Nav Footer Area */}
            <div className="p-4 bg-slate-50/70 dark:bg-slate-950/50 space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{isSpanish ? "Tema" : "Theme"}</span>
                <div className="flex items-center p-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-2xs">
                  <button
                    onClick={() => changeTheme('daylight')}
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      theme === 'daylight'
                        ? 'bg-white text-amber-600 shadow-xs scale-102 font-extrabold'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <Sun className={`w-3.5 h-3.5 ${theme === 'daylight' ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
                    <span>{isSpanish ? "Día" : "Day"}</span>
                  </button>
                  <button
                    onClick={() => changeTheme('evening')}
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      theme === 'evening'
                        ? 'bg-[#152758] text-sky-300 shadow-xs border border-sky-400/40 scale-102 font-extrabold'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <Sunset className={`w-3.5 h-3.5 ${theme === 'evening' ? 'text-orange-400' : 'text-slate-400'}`} />
                    <span>{isSpanish ? "Tarde" : "Evening"}</span>
                  </button>
                  <button
                    onClick={() => changeTheme('dark')}
                    type="button"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-slate-900 text-blue-400 shadow-xs border border-blue-500/40 scale-102 font-extrabold'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    <Moon className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-blue-400 fill-blue-400/20' : 'text-slate-400'}`} />
                    <span>{isSpanish ? "Noche" : "Dark"}</span>
                  </button>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center" suppressHydrationWarning>
                © {new Date().getFullYear()} {siteConfig.name} • {isSpanish ? "Cronometría de Precisión" : "Precision Chronometry"}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
}
