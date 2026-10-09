"use client";

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface Props {
  h1Title?: string;
  description?: string;
  locale?: 'en' | 'es';
}

export function LearnClient({ h1Title, description, locale = 'en' }: Props) {
  const isEs = locale === 'es';
  const [activeTab, setActiveTab] = useState<'utc' | 'gmt' | 'solar' | 'atomic' | 'jetlag'>('utc');

  const tabsEn = [
    { id: 'utc', label: '1. What is UTC?' },
    { id: 'gmt', label: '2. GMT vs UTC' },
    { id: 'solar', label: '3. Solar Time' },
    { id: 'atomic', label: '4. Atomic Clocks' },
    { id: 'jetlag', label: '5. Jet Lag Science' }
  ];

  const tabsEs = [
    { id: 'utc', label: '1. ¿Qué es UTC?' },
    { id: 'gmt', label: '2. GMT vs UTC' },
    { id: 'solar', label: '3. Tiempo Solar' },
    { id: 'atomic', label: '4. Relojes Atómicos' },
    { id: 'jetlag', label: '5. Ciencia del Jet Lag' }
  ];

  const tabs = isEs ? tabsEs : tabsEn;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-bold shadow-2xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isEs ? 'Academia de Cronometría TimeNumbers' : 'TimeNumbers Chronometry Academy'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {h1Title || (isEs ? 'Cómo Funciona el Tiempo en el Planeta Tierra' : 'How Time Works on Planet Earth')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
          {description ||
            (isEs
              ? 'Enciclopedia visual y científica que explora el funcionamiento de relojes atómicos, husos horarios y biología circadiana.'
              : 'A visual, scientific encyclopedia exploring the mechanics of atomic clocks, international time zones, and circadian biology.')}
        </p>
      </div>

      {/* Interactive Module Tabs */}
      <div className="flex justify-center overflow-x-auto no-scrollbar py-1">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Module Content */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
        {activeTab === 'utc' && (
          <div className="space-y-4 animate-in fade-in">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              {isEs ? 'Módulo 1 • Estándar Fundamental' : 'Module 1 • Fundamental Standard'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isEs
                ? 'Tiempo Universal Coordinado (UTC): El Ancla del Tiempo Mundial'
                : "Coordinated Universal Time (UTC): The World's Clock Anchor"}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEs
                ? 'El Tiempo Universal Coordinado (UTC) es el estándar primario por el cual el mundo regula los relojes. No es una zona horaria en sí, sino una línea base sobre la cual se calculan las zonas horarias del mundo como desplazamientos positivos o negativos (ej. UTC+1 para Madrid, UTC-5 para Nueva York).'
                : 'Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks and time. It is not a time zone itself, but an agreed-upon baseline from which all 24+ world time zones are calculated as positive or negative offsets (e.g. UTC+1 for Paris, UTC-5 for New York).'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-bold text-xs text-slate-900 dark:text-white block mb-1">
                  {isEs ? 'Precisión Atómica (TAI)' : 'Atomic Precision (TAI)'}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isEs
                    ? 'Calculado mediante el promedio de cientos de relojes atómicos de cesio y rubidio en laboratorios de metrología de más de 60 países.'
                    : 'Calculated by averaging hundreds of primary cesium and rubidium atomic clocks situated in national metrology institutes across 60+ countries.'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-bold text-xs text-slate-900 dark:text-white block mb-1">
                  {isEs ? 'Línea Base Global' : 'Universal Daylight Baseline'}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isEs
                    ? 'Mantenido por la Oficina Internacional de Pesas y Medidas (BIPM) en Sèvres, Francia, para asegurar que la navegación GPS, internet y la aviación se mantengan sincronizados.'
                    : 'Maintained by the International Bureau of Weights and Measures (BIPM) in Sèvres, France to ensure satellite navigation, internet routing, and aviation remain synchronized.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gmt' && (
          <div className="space-y-4 animate-in fade-in">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              {isEs ? 'Módulo 2 • Astronómico vs Cuántico' : 'Module 2 • Astronomical vs Quantum'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isEs
                ? 'Greenwich Mean Time (GMT) vs. UTC: ¿Cuál es la Diferencia?'
                : "Greenwich Mean Time (GMT) vs. UTC: What's the Difference?"}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEs
                ? 'Aunque GMT y UTC comparten exactamente el mismo segundo, sus definiciones subyacentes son distintas:'
                : 'While GMT and UTC share the exact same second, their underlying definitions differ:'}
            </p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
                <span className="font-bold text-sm text-blue-900 dark:text-blue-300 block mb-1">
                  {isEs ? 'GMT es una Zona Horaria Civil' : 'GMT is a Time Zone'}
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEs
                    ? 'El Tiempo Medio de Greenwich es una zona horaria civil legal empleada en el Reino Unido durante el invierno (cambiando a BST en verano) y partes de África occidental.'
                    : 'Greenwich Mean Time is a regional civil time zone used legally in the United Kingdom during winter months (switching to British Summer Time BST in summer), as well as parts of Western Africa.'}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                <span className="font-bold text-sm text-emerald-900 dark:text-emerald-300 block mb-1">
                  {isEs ? 'UTC es un Estándar Científico' : 'UTC is a Scientific Time Standard'}
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  {isEs
                    ? 'UTC es una norma universal que nunca cambia por horario de verano. Sirve como referencia fija para software, control aéreo y telecomunicaciones.'
                    : 'UTC is a global standard that never shifts for daylight saving time. It serves as the mathematical fixed point for software, air traffic control, and space missions.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'solar' && (
          <div className="space-y-4 animate-in fade-in">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              {isEs ? 'Módulo 3 • Mecánica Planetaria' : 'Module 3 • Planetary Mechanics'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isEs
                ? 'Tiempo Solar, Ecuación del Tiempo y Geometría Planetaria'
                : 'Solar Time, the Equation of Time & Planetary Geometry'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEs
                ? 'Antes de los ferrocarriles, cada ciudad usaba un reloj de sol. Pero ¿por qué el mediodía solar rara vez coincide exactamente con las 12:00:00 en tu reloj?'
                : 'Before railroads and telegraphs, every town used a sundial. But why does solar noon rarely occur exactly at 12:00:00 on your wristwatch?'}
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">
                {isEs ? 'La Ecuación del Tiempo (EoT)' : 'The Equation of Time (EoT)'}
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                {isEs
                  ? 'La órbita de la Tierra alrededor del Sol no es un círculo perfecto sino una elipse, y su eje está inclinado 23,44°. Como resultado, el tiempo solar aparente se desvía del tiempo civil uniforme hasta +16 minutos en noviembre y -14 minutos en febrero.'
                  : "Earth's orbit around the sun is not a perfect circle; it is an ellipse (eccentricity 0.0167). Furthermore, Earth's axis is tilted at 23.44°. As a result, apparent solar time deviates from uniform clock time by up to +16 minutes in November and -14 minutes in February."}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'atomic' && (
          <div className="space-y-4 animate-in fade-in">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              {isEs ? 'Módulo 4 • Física Cuántica' : 'Module 4 • Quantum Physics'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isEs
                ? 'Osciladores de Cesio y Protocolo de Tiempo de Red (NTP)'
                : 'Cesium Oscillators & Network Time Protocol (NTP)'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEs
                ? 'El segundo en el Sistema Internacional se define como la duración de 9.192.631.770 períodos de radiación de la transición entre los dos niveles hiperfinos del estado fundamental del átomo de cesio-133.'
                : 'The SI base unit of time—the second—is officially defined as the duration of 9,192,631,770 periods of radiation corresponding to the transition between the two hyperfine levels of the ground state of the cesium-133 atom.'}
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">
                {isEs
                  ? 'Sincronización NTP Sub-Segundo en TimeNumbers'
                  : 'Sub-Second NTP Synchronization on TimeNumbers'}
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                {isEs
                  ? 'TimeNumbers calibra continuamente el reloj local de tu navegador frente a servidores atómicos Stratum-1 mediante algoritmos de latencia ida y vuelta (RTT), garantizando una precisión inferior a ±0,01 segundos.'
                  : 'TimeNumbers continuously calibrates your browser local clock against Stratum-1 atomic NTP servers via server round-trip timing (RTT) algorithms, ensuring sub-second display accuracy within ±0.01s.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'jetlag' && (
          <div className="space-y-4 animate-in fade-in">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              {isEs ? 'Módulo 5 • Biología Humana' : 'Module 5 • Human Biology'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isEs
                ? 'Ritmos Circadianos y Jet Lag: Sobrevivir a los Cambios de Zona Horaria'
                : 'Circadian Rhythms & Jet Lag: Surviving Time Zone Shifts'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isEs
                ? 'La fisiología humana se rige por un ciclo molecular de unas 24,2 horas controlado por el núcleo supraquiasmático (NSQ). Cruzar múltiples zonas horarias desincroniza la secreción de melatonina respecto a la luz solar externa.'
                : 'Human physiology is governed by a 24.2-hour molecular cycle controlled by the suprachiasmatic nucleus (SCN). Crossing multiple time zones causes desynchrony between internal melatonin secretion and external sunlight.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  {isEs ? 'Luz Solar Matutina' : 'Morning Sunlight'}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {isEs
                    ? 'Estimula el cortisol e inhibe la melatonina para reiniciar el reloj circadiano principal.'
                    : 'Triggers cortisol and shuts off melatonin to reset master circadian clock.'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  {isEs ? 'Sincronización por Comidas' : 'Meal Resync'}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {isEs
                    ? 'Desayunar a la hora local del destino actualiza rápidamente los relojes metabólicos hepáticos.'
                    : 'Eating at destination breakfast time rapidly updates peripheral liver clocks.'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                <span className="font-bold text-slate-900 dark:text-white block mb-1">
                  {isEs ? 'Retraso de Fase' : 'Phase Delay'}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {isEs
                    ? 'Viajar hacia el oeste suele ser más fácil que hacia el este porque el cuerpo tolera mejor un día alargado.'
                    : 'Flying west is easier than east because humans naturally prefer an extended day.'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
