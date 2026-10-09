"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Calendar, Clock, Sparkles, Share2, Copy, Check,
  ArrowRight, ExternalLink, Globe, Play, Heart, Award
} from 'lucide-react';
import { slugifyEventTitle } from '@/lib/countdown/countdown-utils';

interface CountdownGeneratorStudioProps {
  locale?: 'en' | 'es';
}

const CATEGORY_EMOJIS_EN = [
  { emoji: '🚀', label: 'Product Launch' },
  { emoji: '💍', label: 'Wedding' },
  { emoji: '🎂', label: 'Birthday' },
  { emoji: '🏖️', label: 'Vacation' },
  { emoji: '🎓', label: 'Graduation' },
  { emoji: '🎉', label: 'Milestone' },
  { emoji: '🏆', label: 'Competition' },
  { emoji: '👶', label: 'Baby Shower' },
  { emoji: '🎄', label: 'Holiday' },
];

const CATEGORY_EMOJIS_ES = [
  { emoji: '🚀', label: 'Lanzamiento' },
  { emoji: '💍', label: 'Boda' },
  { emoji: '🎂', label: 'Cumpleaños' },
  { emoji: '🏖️', label: 'Vacaciones' },
  { emoji: '🎓', label: 'Graduación' },
  { emoji: '🎉', label: 'Hito' },
  { emoji: '🏆', label: 'Competición' },
  { emoji: '👶', label: 'Baby Shower' },
  { emoji: '🎄', label: 'Festividad' },
];

export function CountdownGeneratorStudio({ locale = 'en' }: CountdownGeneratorStudioProps) {
  const router = useRouter();
  const isEs = locale === 'es';
  const categoryEmojis = isEs ? CATEGORY_EMOJIS_ES : CATEGORY_EMOJIS_EN;

  // Form State
  const [eventName, setEventName] = useState(isEs ? 'Lanzamiento de Producto' : 'Product Hunt Launch');
  const [targetDate, setTargetDate] = useState(() => {
    // Default to 14 days from today at 09:00
    const d = new Date(Date.now() + 14 * 86400000);
    return `${d.toISOString().slice(0, 10)}T09:00`;
  });
  const [selectedEmoji, setSelectedEmoji] = useState('🚀');
  const [description, setDescription] = useState(
    isEs ? 'Lanzamiento oficial de nuestra nueva plataforma.' : 'Official worldwide release of our new platform.'
  );
  const [copied, setCopied] = useState(false);

  // Compute target URL
  const slug = slugifyEventTitle(eventName);
  const searchParams = new URLSearchParams();
  searchParams.set('date', targetDate);
  searchParams.set('title', eventName);
  searchParams.set('emoji', selectedEmoji);
  if (description) searchParams.set('desc', description);

  const basePath = isEs ? '/es/countdown' : '/countdown';
  const fullSharePath = `${basePath}/${slug}?${searchParams.toString()}`;

  // Live diff preview
  const targetMs = new Date(targetDate).getTime();
  const nowMs = Date.now();
  const diffMs = Math.max(0, targetMs - nowMs);
  const totalSecs = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  const copyGeneratedLink = () => {
    if (typeof window !== 'undefined') {
      const fullUrl = `${window.location.origin}${fullSharePath}`;
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLaunch = () => {
    router.push(fullSharePath);
  };

  return (
    <div className="space-y-8">
      {/* Studio Header */}
      <section className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200/60 dark:border-blue-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          {isEs ? 'Generador de Cuenta Regresiva Dinámica' : 'Viral Dynamic Countdown Generator'}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {isEs ? 'Generador de Cuenta Regresiva para Eventos' : 'Custom Event Countdown Generator'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {isEs
            ? 'Crea una cuenta regresiva instantánea en vivo para bodas, cumpleaños, lanzamientos o vacaciones. Genera una URL para compartir con tarjetas de vista previa en redes sociales.'
            : 'Create an instant live countdown for weddings, birthdays, product launches, or vacations. Generates a shareable URL with dynamic Open Graph social media cards for X, WhatsApp, and Slack.'}
        </p>
      </section>

      {/* Main Generator Console (Grid Layout with Zero CLS) */}
      <section
        aria-label="Countdown Creator Console"
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>{isEs ? 'Configura tu Evento' : 'Configure Your Event'}</span>
            </h2>

            {/* Event Title */}
            <div className="space-y-2">
              <label htmlFor="countdown-event-name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isEs ? 'Nombre o Hito del Evento:' : 'Event Name or Milestone:'}
              </label>
              <input
                id="countdown-event-name"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder={isEs ? 'p. ej. Boda de Laura y Carlos' : "e.g. Sarah & Alex's Wedding"}
                maxLength={60}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
              />
            </div>

            {/* Target Date & Time */}
            <div className="space-y-2">
              <label htmlFor="countdown-datetime" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isEs ? 'Fecha y Hora Objetivo (Tu Zona Horaria Local):' : 'Target Date & Time (Your Local Timezone):'}
              </label>
              <input
                id="countdown-datetime"
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm font-mono font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
              />
            </div>

            {/* Category Emoji Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {isEs ? 'Categoría e Ícono Emoji:' : 'Category & Emoji Icon:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {categoryEmojis.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedEmoji(item.emoji)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      selectedEmoji === item.emoji
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30 ring-2 ring-blue-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <label htmlFor="countdown-description" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isEs ? 'Descripción / Subtítulo del Evento (Opcional):' : 'Event Description / Tagline (Optional):'}
              </label>
              <input
                id="countdown-description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isEs ? 'p. ej. Celebración con amigos y familia.' : 'e.g. Gathering with friends and family.'}
                maxLength={120}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Launch & Copy Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleLaunch}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span>{isEs ? 'Iniciar Cuenta Regresiva en Vivo' : 'Launch Live Countdown'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={copyGeneratedLink}
                className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>
                  {copied
                    ? (isEs ? '¡Enlace Copiado!' : 'Share Link Copied!')
                    : (isEs ? 'Copiar Enlace' : 'Copy Share Link')}
                </span>
              </button>
            </div>
          </div>

          {/* Right: Live Interactive Card Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 block">
              {isEs ? 'Vista Previa en Vivo y Tarjeta Social' : 'Live Preview & Social Card Mockup'}
            </span>

            {/* Preview Hero Card */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  {isEs ? 'Vista Previa' : 'Live Preview'}
                </span>
                <span className="text-2xl">{selectedEmoji}</span>
              </div>

              <div className="space-y-1 text-center">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
                  {eventName || (isEs ? 'Tu Evento' : 'Your Event Name')}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {description || (isEs ? 'Cuenta regresiva con actualización en vivo.' : 'Live countdown with real-time second updates.')}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 pt-1">
                  <Clock className="w-3 h-3" />
                  <span>{isEs ? 'Objetivo: ' : 'Target: '}{new Date(targetDate).toLocaleDateString(isEs ? 'es-ES' : undefined)}</span>
                </div>
              </div>

              {/* 4 Digit Boxes */}
              <div className="grid grid-cols-4 gap-2 font-mono text-center">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-black text-white block">{days}</span>
                  <span className="text-[9px] uppercase font-sans text-slate-400 font-bold block">{isEs ? 'Días' : 'Days'}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-black text-white block">{hours}</span>
                  <span className="text-[9px] uppercase font-sans text-slate-400 font-bold block">{isEs ? 'Horas' : 'Hours'}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-black text-white block">{minutes}</span>
                  <span className="text-[9px] uppercase font-sans text-slate-400 font-bold block">{isEs ? 'Min' : 'Mins'}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-2xl font-black text-blue-400 block">{seconds}</span>
                  <span className="text-[9px] uppercase font-sans text-slate-400 font-bold block">{isEs ? 'Seg' : 'Secs'}</span>
                </div>
              </div>

              {/* Slug Preview Pill */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-[11px] font-mono text-slate-400 truncate flex items-center justify-between gap-2">
                <span className="truncate">timenumbers.com{fullSharePath}</span>
                <Link
                  href={fullSharePath}
                  className="text-blue-400 hover:text-blue-300 shrink-0 font-bold flex items-center gap-1"
                >
                  <span>{isEs ? 'Abrir' : 'Open'}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
