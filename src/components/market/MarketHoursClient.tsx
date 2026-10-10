"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  STOCK_EXCHANGES,
  FOREX_SESSIONS,
  StockExchange,
  ForexSession,
  calculateExchangeStatus,
  isForexSessionActive
} from '@/lib/markets/market-data';
import {
  TrendingUp,
  Clock,
  Globe,
  Sliders,
  DollarSign,
  AlertCircle,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface MarketHoursClientProps {
  locale?: 'en' | 'es';
}

export function MarketHoursClient({ locale = 'en' }: MarketHoursClientProps) {
  const isEs = locale === 'es';
  const [now, setNow] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'stocks' | 'forex'>('stocks');
  const [useLocalTime, setUseLocalTime] = useState(true);
  const [scrubberHour, setScrubberHour] = useState<number | null>(null);

  // Live real-time ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute exchange statuses
  const exchangeStatuses = useMemo(() => {
    return STOCK_EXCHANGES.map(exchange => {
      const status = calculateExchangeStatus(exchange, now);
      return {
        exchange,
        status
      };
    });
  }, [now]);

  // Compute forex session statuses
  const forexStatuses = useMemo(() => {
    return FOREX_SESSIONS.map(session => {
      const active = isForexSessionActive(session, now);
      return {
        session,
        active
      };
    });
  }, [now]);

  // Count active open markets
  const openStockCount = exchangeStatuses.filter(s => s.status.status === 'open').length;
  const activeForexCount = forexStatuses.filter(s => s.active).length;

  // Active time for the scrubber
  const displayedTime = useMemo(() => {
    if (scrubberHour === null) return now;
    const d = new Date(now);
    d.setUTCHours(scrubberHour, 0, 0, 0);
    return d;
  }, [scrubberHour, now]);

  // Helper to format hours in 12h/24h
  const formatTimeSlot = (h: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12} ${ampm}`;
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. Hero Market Pulse Banner */}
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>{isEs ? 'Radar Bursátil en Vivo' : 'Live Global Market Radar'}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span suppressHydrationWarning>
                  {now.toLocaleTimeString(isEs ? 'es-ES' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="text-slate-400 text-[10px]">
                  {isEs ? 'Tu Hora Local' : 'Local Time'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {/* Open Stocks Counter */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-xs text-slate-400 font-medium">
                {isEs ? 'Bolsas de Valores Activas' : 'Active Stock Exchanges'}
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black font-mono text-emerald-400">
                  {openStockCount}
                </span>
                <span className="text-xs text-slate-300">
                  / {STOCK_EXCHANGES.length} {isEs ? 'mercados mayores' : 'major global hubs'}
                </span>
              </div>
            </div>

            {/* Active Forex Sessions */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="text-xs text-slate-400 font-medium">
                {isEs ? 'Sesiones Forex en Curso' : 'Active Forex Sessions'}
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black font-mono text-blue-400">
                  {activeForexCount}
                </span>
                <span className="text-xs text-slate-300">
                  / 4 {isEs ? 'sesiones mundiales (24/5)' : 'global sessions (24/5)'}
                </span>
              </div>
            </div>

            {/* Golden Overlap Window Status */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md md:col-span-2 lg:col-span-1">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
                <span>{isEs ? 'Ventana Dorada (Londres + NY)' : 'Golden Overlap (London + NY)'}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="mt-1">
                {forexStatuses.some(s => s.session.id === 'london-session' && s.active) &&
                forexStatuses.some(s => s.session.id === 'newyork-session' && s.active) ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    {isEs ? '🔥 MÁXIMA LIQUIDEZ ACTIVA' : '🔥 PEAK GLOBAL LIQUIDITY ACTIVE'}
                  </span>
                ) : (
                  <span className="text-xs text-slate-300">
                    {isEs ? 'Próxima ventana: 13:00 – 17:00 UTC (8 AM – 12 PM EST)' : 'Next window: 13:00 – 17:00 UTC (8 AM – 12 PM EST)'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Controls & Interactive Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        {/* Market Category Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
          <button
            onClick={() => setActiveTab('stocks')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'stocks'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{isEs ? 'Bolsas de Valores (Acciones)' : 'Stock Exchanges (Equities)'}</span>
          </button>
          <button
            onClick={() => setActiveTab('forex')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'forex'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>{isEs ? 'Sesiones Forex (Divisas 24/5)' : 'Forex Sessions (Currencies 24/5)'}</span>
          </button>
        </div>

        {/* Local vs Exchange Time Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {isEs ? 'Mostrar Hora:' : 'Display Time:'}
          </span>
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
            <button
              onClick={() => setUseLocalTime(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                useLocalTime
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isEs ? 'Mi Hora Local' : 'My Local Time'}
            </button>
            <button
              onClick={() => setUseLocalTime(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !useLocalTime
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {isEs ? 'Hora de la Bolsa' : 'Exchange Time'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Interactive 24-Hour Market Timeline Scrubber */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isEs ? 'Línea de Tiempo Interactiva de 24 Horas' : 'Interactive 24-Hour Global Timeline'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {scrubberHour !== null && (
              <button
                onClick={() => setScrubberHour(null)}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {isEs ? 'Restablecer a Ahora' : 'Reset to Live Now'}
              </button>
            )}
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
              {scrubberHour !== null
                ? `${formatTimeSlot(scrubberHour)} UTC`
                : (isEs ? 'Hora Actual en Vivo' : 'Live Real-Time')}
            </span>
          </div>
        </div>

        {/* 24-Hour Track */}
        <div className="space-y-2">
          <div className="grid grid-cols-12 sm:grid-cols-24 gap-1">
            {Array.from({ length: 24 }).map((_, h) => {
              const currentUtcHour = now.getUTCHours();
              const isCurrentUtc = h === currentUtcHour;
              const isSelected = scrubberHour === h;
              // Golden Window: 13 to 16 UTC (London & NY overlap)
              const isGolden = h >= 13 && h <= 16;

              return (
                <button
                  key={h}
                  onClick={() => setScrubberHour(h)}
                  className={`h-11 rounded-lg flex flex-col items-center justify-center text-[10px] font-mono transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-blue-600 text-white font-extrabold shadow-md ring-2 ring-blue-400 scale-105 z-10'
                      : isCurrentUtc
                      ? 'bg-emerald-500 text-white font-bold ring-2 ring-emerald-300'
                      : isGolden
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:bg-amber-200'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={`${h}:00 UTC - ${isGolden ? 'Golden Overlap' : ''}`}
                >
                  <span className="leading-none">{h}h</span>
                  {isGolden && !isSelected && !isCurrentUtc && (
                    <span className="w-1 h-1 rounded-full bg-amber-500 mt-0.5"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>{isEs ? 'Hora UTC Actual' : 'Current UTC Hour'}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              <span>{isEs ? 'Ventana Dorada de Solapamiento (13:00 – 17:00 UTC)' : 'Golden Overlap Window (13:00 – 17:00 UTC)'}</span>
            </span>
            <span className="text-[10px] text-slate-400">
              {isEs ? 'Haz clic en cualquier hora para simular' : 'Click any hour to simulate market state'}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Main Market Cards */}
      {activeTab === 'stocks' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {exchangeStatuses.map(({ exchange, status }) => {
            const isOpen = status.status === 'open';
            const isPreOrPost = status.status === 'pre-market' || status.status === 'after-hours';
            const isLunch = status.status === 'lunch';

            return (
              <div
                key={exchange.id}
                className={`p-5 sm:p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md ${
                  isOpen
                    ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/80 ring-1 ring-emerald-400/20'
                    : isPreOrPost
                    ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-800/80 ring-1 ring-amber-400/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
                }`}
              >
                {/* Header: Flag, Name, Status Badge */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{exchange.flag}</span>
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                          {exchange.shortName}
                        </h4>
                        <div className="text-xs text-slate-400 font-medium">
                          {exchange.city}, {exchange.country} &bull; {exchange.currency}
                        </div>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                        isOpen
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : isPreOrPost
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : isLunch
                          ? 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isOpen
                            ? 'bg-emerald-500 animate-pulse'
                            : isPreOrPost
                            ? 'bg-amber-500'
                            : 'bg-slate-400'
                        }`}
                      />
                      <span>{isEs ? status.statusLabelEs : status.statusLabelEn}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {isEs ? exchange.descriptionEs : exchange.descriptionEn}
                  </p>
                </div>

                {/* Clock & Countdown Meter */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        {useLocalTime
                          ? (isEs ? 'Tu Hora Local' : 'Your Local Time')
                          : (isEs ? 'Hora Local de la Bolsa' : 'Exchange Time')}
                      </div>
                      <div className="text-lg font-black font-mono text-slate-900 dark:text-white" suppressHydrationWarning>
                        {useLocalTime ? status.localTimeStr : status.exchangeTimeStr}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        {isEs ? 'Campana' : 'Bell Countdown'}
                      </div>
                      <div className="text-xs font-bold font-mono text-slate-700 dark:text-slate-200">
                        {isEs ? status.countdownTextEs : status.countdownTextEn}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isOpen ? 'bg-emerald-500' : isPreOrPost ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      style={{ width: `${status.progressPercent}%` }}
                    />
                  </div>

                  {/* Indices badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {exchange.keyIndices.map(idx => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300"
                      >
                        {idx}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 4b. Forex Sessions Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {forexStatuses.map(({ session, active }) => (
            <div
              key={session.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-xs ${
                active
                  ? 'bg-white dark:bg-slate-900 border-blue-300 dark:border-blue-800/80 ring-1 ring-blue-400/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{session.flag}</span>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                        {session.name}
                      </h4>
                      <div className="text-xs text-slate-400 font-medium">
                        {session.city} &bull; {session.volumeShare} {isEs ? 'del volumen mundial' : 'of global daily volume'}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      active
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    <span>{active ? (isEs ? 'Sesión Activa' : 'Session Active') : (isEs ? 'Cerrada' : 'Inactive')}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {isEs ? session.descriptionEs : session.descriptionEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">
                    {isEs ? 'Horario UTC:' : 'Session Hours (UTC):'}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {session.utcOpen}:00 – {session.utcClose}:00 UTC
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-400 mb-1.5">
                    {isEs ? 'Pares de Divisas Principales:' : 'High-Volatility Currency Pairs:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {session.majorPairs.map(pair => (
                      <span
                        key={pair}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-200"
                      >
                        {pair}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
