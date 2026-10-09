"use client";

import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, Clock, Calendar, Code, ArrowRight, ShieldCheck } from 'lucide-react';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import Link from 'next/link';

interface Props {
  h1Title?: string;
  locale?: 'en' | 'es';
}

export function UnixConverterClient({ h1Title, locale = 'en' }: Props) {
  const isEs = locale === 'es';
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [currentEpochMs, setCurrentEpochMs] = useState<number>(Date.now());
  const [copied, setCopied] = useState<string | null>(null);

  const [inputVal, setInputVal] = useState<string>(String(Math.floor(Date.now() / 1000)));

  useEffect(() => {
    const timer = setInterval(() => {
      const n = Date.now();
      setCurrentEpoch(Math.floor(n / 1000));
      setCurrentEpochMs(n);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const num = parseInt(inputVal, 10);
  const isValid = !isNaN(num);
  const d = isValid ? new Date(num > 10000000000 ? num : num * 1000) : null;
  const isDateValid = d && !isNaN(d.getTime());

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const faqsEn = [
    {
      question: "What is the difference between UTC, GMT, and Epoch timestamp?",
      answer: "Epoch timestamp is the elapsed number of seconds since 00:00:00 UTC on Thursday, January 1, 1970 (not counting leap seconds). UTC (Coordinated Universal Time) is the international atomic time standard. GMT (Greenwich Mean Time) is an observational time zone historically aligned with the Royal Observatory in Greenwich."
    },
    {
      question: "What is the Year 2038 Unix timestamp problem?",
      answer: "The Year 2038 problem (Y2038) refers to 32-bit signed integers overflowing when Unix time reaches 2,147,483,647 seconds on January 19, 2038 at 03:14:07 UTC. Modern 64-bit operating systems resolve this by supporting timestamps well beyond 292 billion years."
    },
    {
      question: "How to convert Unix timestamp seconds to readable human date in JavaScript?",
      answer: "In JavaScript: const date = new Date(timestamp * 1000); console.log(date.toISOString()); For milliseconds: const date = new Date(timestampMs)."
    }
  ];

  const faqsEs = [
    {
      question: "¿Cuál es la diferencia entre UTC, GMT y el timestamp Epoch?",
      answer: "El timestamp Epoch es el número de segundos transcurridos desde las 00:00:00 UTC del jueves 1 de enero de 1970 (sin contar segundos intercalares). UTC (Tiempo Universal Coordinado) es el estándar internacional atómico. GMT es una zona horaria observacional históricamente alineada con Greenwich."
    },
    {
      question: "¿Qué es el problema del año 2038 (Y2038) en Unix?",
      answer: "El problema del año 2038 surge cuando los enteros de 32 bits con signo se desbordan al alcanzar los 2.147.483.647 segundos el 19 de enero de 2038 a las 03:14:07 UTC. Los sistemas operativos modernos de 64 bits solucionan esto permitiendo registrar fechas durante más de 292.000 millones de años."
    },
    {
      question: "¿Cómo convertir segundos de timestamp Unix a una fecha legible en JavaScript?",
      answer: "En JavaScript: const fecha = new Date(timestamp * 1000); console.log(fecha.toISOString()); Para milisegundos: const fecha = new Date(timestampMs)."
    }
  ];

  const faqs = isEs ? faqsEs : faqsEn;

  return (
    <div className="space-y-10">
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-3.5 h-3.5" />
          <span>{isEs ? 'Herramientas para Desarrolladores' : 'Developer Tools Suite'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {h1Title || (isEs ? 'Conversor de Timestamp Unix y Epoch' : 'Unix Timestamp Converter & Epoch Studio')}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          {isEs
            ? 'Epoch atómico en vivo en segundos y milisegundos, formato ISO 8601 bidireccional y documentación técnica.'
            : 'Live atomic epoch in seconds & milliseconds, bidirectional ISO 8601 formatting, and technical documentation.'}
        </p>
      </header>

      {/* Live Epoch Tickers */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
              {isEs ? 'Segundos Epoch (En Vivo)' : 'Epoch Seconds (Live)'}
            </span>
            <div className="text-3xl sm:text-4xl font-mono font-black text-slate-900 dark:text-white">
              {currentEpoch}
            </div>
          </div>
          <button
            onClick={() => handleCopy(String(currentEpoch), 'sec')}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all"
            title={isEs ? 'Copiar Segundos Epoch' : 'Copy Epoch Seconds'}
          >
            {copied === 'sec' ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
              {isEs ? 'Milisegundos Epoch (En Vivo)' : 'Epoch Milliseconds (Live)'}
            </span>
            <div className="text-3xl sm:text-4xl font-mono font-black text-blue-600 dark:text-blue-400">
              {currentEpochMs}
            </div>
          </div>
          <button
            onClick={() => handleCopy(String(currentEpochMs), 'ms')}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all"
            title={isEs ? 'Copiar Milisegundos Epoch' : 'Copy Epoch Milliseconds'}
          >
            {copied === 'ms' ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </section>

      {/* Bidirectional Converter */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <span>{isEs ? 'Convertir Timestamp a Fecha Humana Legible' : 'Convert Timestamp to Readable Human Date'}</span>
        </h2>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {isEs ? 'Introduce Segundos o Milisegundos Epoch' : 'Enter Epoch Seconds or Milliseconds'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-lg text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 1789370650"
            />
            <button
              onClick={() => setInputVal(String(currentEpoch))}
              className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {isEs ? 'Hora Actual' : 'Current Time'}
            </button>
          </div>
        </div>

        {isDateValid && d && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEs ? 'Fecha UTC / GMT' : 'UTC / GMT Date'}</span>
              <div className="font-mono font-bold text-sm text-slate-900 dark:text-white select-all">
                {d.toUTCString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEs ? 'Cadena ISO 8601' : 'ISO 8601 String'}</span>
              <div className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400 select-all">
                {d.toISOString()}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEs ? 'Hora Local del Dispositivo' : 'Local Device Time'}</span>
              <div className="font-mono font-bold text-sm text-slate-900 dark:text-white select-all">
                {d.toLocaleString(isEs ? 'es-ES' : undefined)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">{isEs ? 'Tiempo Relativo' : 'Relative Time'}</span>
              <div className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                {isEs
                  ? `${Math.round((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} días respecto a hoy`
                  : `${Math.round((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days relative to today`}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Free Anonymous REST API Snippet */}
      <section className="bg-slate-950 text-slate-100 rounded-3xl p-8 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base">{isEs ? 'API REST Pública y Gratuita' : 'Free Anonymous REST API'}</h3>
          </div>
          <Link href={isEs ? '/es/api-docs' : '/api-docs'} className="text-xs font-bold text-blue-400 hover:underline">
            {isEs ? 'Ver Documentación de API →' : 'View API Docs →'}
          </Link>
        </div>
        <p className="text-xs text-slate-400">
          {isEs
            ? 'Consulta zonas horarias, desplazamientos UTC y marcas de tiempo epoch de forma programática sin autenticación:'
            : 'Query real-time timezone, UTC offsets, and atomic epoch data programmatically with 0 auth headers:'}
        </p>
        <div className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-emerald-400 overflow-x-auto">
          <code>curl -s https://www.timenumbers.com/api/v1/time?city=tokyo</code>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <FaqAccordion items={faqs} title="Frequently Asked Questions on Unix Epoch &amp; Standards" />
      </section>

      <RelatedLinksHub />
    </div>
  );
}
