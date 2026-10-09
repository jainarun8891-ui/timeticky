"use client";

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Clock, 
  DollarSign, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  Calendar, 
  Coffee,
  HelpCircle
} from 'lucide-react';

interface DayEntry {
  id: string;
  nameEn: string;
  nameEs: string;
  active: boolean;
  startTime: string; // "09:00"
  endTime: string;   // "17:00"
  breakMinutes: number; // e.g. 30
}

interface HoursCalculatorClientProps {
  h1Title?: string;
  locale?: 'en' | 'es';
}

const DEFAULT_DAYS: DayEntry[] = [
  { id: 'mon', nameEn: 'Monday', nameEs: 'Lunes', active: true, startTime: '09:00', endTime: '17:00', breakMinutes: 30 },
  { id: 'tue', nameEn: 'Tuesday', nameEs: 'Martes', active: true, startTime: '09:00', endTime: '17:00', breakMinutes: 30 },
  { id: 'wed', nameEn: 'Wednesday', nameEs: 'Miércoles', active: true, startTime: '09:00', endTime: '17:00', breakMinutes: 30 },
  { id: 'thu', nameEn: 'Thursday', nameEs: 'Jueves', active: true, startTime: '09:00', endTime: '17:00', breakMinutes: 30 },
  { id: 'fri', nameEn: 'Friday', nameEs: 'Viernes', active: true, startTime: '09:00', endTime: '17:00', breakMinutes: 30 },
  { id: 'sat', nameEn: 'Saturday', nameEs: 'Sábado', active: false, startTime: '10:00', endTime: '14:00', breakMinutes: 0 },
  { id: 'sun', nameEn: 'Sunday', nameEs: 'Domingo', active: false, startTime: '10:00', endTime: '14:00', breakMinutes: 0 },
];

export function HoursCalculatorClient({
  h1Title,
  locale = 'en',
}: HoursCalculatorClientProps) {
  const isEs = locale === 'es';

  const [days, setDays] = useState<DayEntry[]>(DEFAULT_DAYS);
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [currency, setCurrency] = useState<string>('$');
  const [overtimeThreshold, setOvertimeThreshold] = useState<number>(40);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState<number>(1.5);
  const [copied, setCopied] = useState(false);

  // Helper: calculate decimal hours between two times minus break
  const calculateDayHours = (start: string, end: string, breakMins: number, active: boolean): number => {
    if (!active) return 0;
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    
    let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    // If shift rolls over midnight (e.g. 22:00 to 06:00)
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }
    totalMinutes -= breakMins;
    if (totalMinutes <= 0) return 0;

    return Math.round((totalMinutes / 60) * 100) / 100;
  };

  // Calculations
  const calculations = useMemo(() => {
    let totalDecimal = 0;
    const dailyDetails = days.map(d => {
      const hrs = calculateDayHours(d.startTime, d.endTime, d.breakMinutes, d.active);
      totalDecimal += hrs;
      return {
        ...d,
        hoursDecimal: hrs,
        hoursFormatted: `${Math.floor(hrs)}h ${Math.round((hrs % 1) * 60)}m`
      };
    });

    totalDecimal = Math.round(totalDecimal * 100) / 100;
    const regularHours = Math.min(totalDecimal, overtimeThreshold);
    const overtimeHours = Math.max(0, totalDecimal - overtimeThreshold);

    const regularPay = Math.round(regularHours * hourlyRate * 100) / 100;
    const overtimePay = Math.round(overtimeHours * (hourlyRate * overtimeMultiplier) * 100) / 100;
    const totalGrossPay = Math.round((regularPay + overtimePay) * 100) / 100;

    const totalHoursPart = Math.floor(totalDecimal);
    const totalMinsPart = Math.round((totalDecimal % 1) * 60);

    return {
      dailyDetails,
      totalDecimal,
      totalFormatted: `${totalHoursPart} hrs ${totalMinsPart} mins`,
      regularHours,
      overtimeHours,
      regularPay,
      overtimePay,
      totalGrossPay,
    };
  }, [days, hourlyRate, overtimeThreshold, overtimeMultiplier]);

  const updateDay = (id: string, updates: Partial<DayEntry>) => {
    setDays(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const handleCopySummary = () => {
    const lines = [
      isEs ? '=== RESUMEN DE HORAS DE TRABAJO ===' : '=== TIMESHEET WORK HOURS SUMMARY ===',
      ...calculations.dailyDetails.map(d => 
        d.active 
          ? `${isEs ? d.nameEs : d.nameEn}: ${d.startTime} - ${d.endTime} (Descanso: ${d.breakMinutes}m) = ${d.hoursDecimal.toFixed(2)} hrs`
          : `${isEs ? d.nameEs : d.nameEn}: ${isEs ? 'Descanso / Libre' : 'Day Off'}`
      ),
      '----------------------------------------',
      `${isEs ? 'Horas Totales' : 'Total Hours'}: ${calculations.totalDecimal.toFixed(2)} hrs (${calculations.totalFormatted})`,
      `${isEs ? 'Horas Regulares' : 'Regular Hours'}: ${calculations.regularHours.toFixed(2)} hrs`,
      `${isEs ? 'Horas Extras' : 'Overtime Hours'}: ${calculations.overtimeHours.toFixed(2)} hrs`,
      hourlyRate > 0 ? `${isEs ? 'Salario Bruto Estimado' : 'Estimated Gross Pay'}: ${currency}${calculations.totalGrossPay.toLocaleString()}` : '',
      `Generado en https://www.timenumbers.com${isEs ? '/es/hours-calculator' : '/hours-calculator'}`
    ].filter(Boolean);

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportCsv = () => {
    const headers = [
      isEs ? 'Día' : 'Day',
      isEs ? 'Entrada' : 'Clock In',
      isEs ? 'Salida' : 'Clock Out',
      isEs ? 'Descanso (min)' : 'Break (mins)',
      isEs ? 'Horas Decimales' : 'Decimal Hours'
    ];
    const rows = calculations.dailyDetails.map(d => [
      isEs ? d.nameEs : d.nameEn,
      d.active ? d.startTime : '-',
      d.active ? d.endTime : '-',
      d.active ? d.breakMinutes : 0,
      d.hoursDecimal.toFixed(2)
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `timesheet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFillStandardWeek = () => {
    setDays(prev => prev.map(d => ({
      ...d,
      active: d.id !== 'sat' && d.id !== 'sun',
      startTime: '09:00',
      endTime: '17:00',
      breakMinutes: 30
    })));
  };

  return (
    <div className="space-y-10">
      {/* Hero Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800">
          <Calculator className="w-3.5 h-3.5" />
          {isEs ? 'Calculadora de Horas de Trabajo y Nómina' : 'Work Hours & Timesheet Calculator'}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          {h1Title || (isEs ? 'Calculadora de Horas Trabajadas' : 'Work Hours & Timesheet Calculator')}
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {isEs 
            ? 'Calcula tus horas trabajadas semanales con deducción de pausas para almorzar y horas extras. Exporta tu hoja de horas en un clic.'
            : 'Calculate your weekly work hours with lunch break deductions, overtime pay, and estimated gross wages. Export or copy in one click.'}
        </p>
      </div>

      {/* Main Timesheet Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none space-y-8">
        
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-2">
            <button
              onClick={handleFillStandardWeek}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              {isEs ? 'Llenar 9:00 a 17:00 (L-V)' : 'Fill 9-to-5 (Mon–Fri)'}
            </button>
            <button
              onClick={() => setDays(DEFAULT_DAYS)}
              className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              {isEs ? 'Reiniciar' : 'Reset'}
            </button>
          </div>

          {/* Wage / Overtime Settings */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500">{isEs ? 'Moneda:' : 'Currency:'}</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="$">$ (USD/CAD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
                <option value="₹">₹ (INR)</option>
                <option value="A$">A$ (AUD)</option>
                <option value="¥">¥ (JPY)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500">{isEs ? 'Tarifa/Hora:' : 'Pay Rate/Hr:'}</span>
              <span className="font-bold">{currency}</span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                className="w-14 bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500">{isEs ? 'Límite Horas Extras:' : 'Overtime After:'}</span>
              <input
                type="number"
                min="0"
                value={overtimeThreshold}
                onChange={(e) => setOvertimeThreshold(parseFloat(e.target.value) || 0)}
                className="w-10 bg-transparent font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
              />
              <span className="text-slate-400">hrs</span>
            </div>
          </div>
        </div>

        {/* Days Table List */}
        <div className="space-y-3">
          {days.map((day) => {
            const dayCalc = calculations.dailyDetails.find(d => d.id === day.id);
            return (
              <div
                key={day.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  day.active
                    ? 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/90 dark:border-slate-700/80'
                    : 'bg-slate-100/40 dark:bg-slate-900/40 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                {/* Day Checkbox & Name */}
                <div className="flex items-center gap-3 w-32 shrink-0">
                  <input
                    type="checkbox"
                    id={`active-${day.id}`}
                    checked={day.active}
                    onChange={(e) => updateDay(day.id, { active: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                  />
                  <label htmlFor={`active-${day.id}`} className="font-bold text-sm text-slate-800 dark:text-slate-200 cursor-pointer">
                    {isEs ? day.nameEs : day.nameEn}
                  </label>
                </div>

                {/* Time Inputs */}
                {day.active ? (
                  <div className="flex flex-wrap items-center gap-3 text-xs flex-1">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">{isEs ? 'Entrada:' : 'Start:'}</span>
                      <input
                        type="time"
                        value={day.startTime}
                        onChange={(e) => updateDay(day.id, { startTime: e.target.value })}
                        className="bg-transparent font-mono font-semibold focus:outline-none"
                      />
                    </div>

                    <span className="text-slate-400 hidden sm:inline">→</span>

                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400">{isEs ? 'Salida:' : 'End:'}</span>
                      <input
                        type="time"
                        value={day.endTime}
                        onChange={(e) => updateDay(day.id, { endTime: e.target.value })}
                        className="bg-transparent font-mono font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                      <Coffee className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-slate-400">{isEs ? 'Pausa:' : 'Break:'}</span>
                      <select
                        value={day.breakMinutes}
                        onChange={(e) => updateDay(day.id, { breakMinutes: parseInt(e.target.value, 10) })}
                        className="bg-transparent font-semibold focus:outline-none cursor-pointer"
                      >
                        <option value="0">0m</option>
                        <option value="15">15m</option>
                        <option value="30">30m</option>
                        <option value="45">45m</option>
                        <option value="60">1h (60m)</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic flex-1">
                    {isEs ? 'Día de descanso (no trabajado)' : 'Day off (unworked)'}
                  </div>
                )}

                {/* Subtotal */}
                <div className="text-right sm:w-28 shrink-0">
                  <span className="text-xs text-slate-400 block sm:hidden">{isEs ? 'Total Día:' : 'Daily Total:'}</span>
                  <span className={`font-mono font-bold text-sm ${day.active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                    {dayCalc?.hoursDecimal.toFixed(2)} hrs
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grand Total Summary Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl border border-slate-800 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            
            {/* Total Hours */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block uppercase font-medium">
                {isEs ? 'Horas Totales' : 'Total Hours'}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                {calculations.totalDecimal.toFixed(2)}
                <span className="text-xs font-normal text-slate-400 ml-1">hrs</span>
              </div>
              <span className="text-xs text-blue-400 font-mono block">
                ({calculations.totalFormatted})
              </span>
            </div>

            {/* Regular Hours */}
            <div className="space-y-1 sm:pl-4 pt-3 sm:pt-0">
              <span className="text-xs text-slate-400 block uppercase font-medium">
                {isEs ? 'Horas Regulares' : 'Regular Hours'}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                {calculations.regularHours.toFixed(2)}
                <span className="text-xs font-normal text-slate-400 ml-1">hrs</span>
              </div>
              <span className="text-xs text-slate-400 font-mono block">
                {currency}{calculations.regularPay.toLocaleString()}
              </span>
            </div>

            {/* Overtime Hours */}
            <div className="space-y-1 sm:pl-4 pt-3 sm:pt-0">
              <span className="text-xs text-slate-400 block uppercase font-medium">
                {isEs ? 'Horas Extras' : 'Overtime Hours'}
              </span>
              <div className={`text-2xl sm:text-3xl font-black font-mono ${calculations.overtimeHours > 0 ? 'text-amber-400' : 'text-slate-500'}`}>
                {calculations.overtimeHours.toFixed(2)}
                <span className="text-xs font-normal text-slate-400 ml-1">hrs</span>
              </div>
              <span className="text-xs text-slate-400 font-mono block">
                {currency}{calculations.overtimePay.toLocaleString()}
              </span>
            </div>

            {/* Total Gross Pay */}
            <div className="space-y-1 sm:pl-4 pt-3 sm:pt-0">
              <span className="text-xs text-slate-400 block uppercase font-medium">
                {isEs ? 'Salario Bruto Total' : 'Estimated Gross Pay'}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-300">
                {currency}{calculations.totalGrossPay.toLocaleString()}
              </div>
              <span className="text-xs text-slate-400 block">
                {isEs ? 'Antes de impuestos' : 'Before taxes'}
              </span>
            </div>
          </div>

          {/* Action Export Buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={handleCopySummary}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (isEs ? '¡Copiado!' : 'Copied!') : (isEs ? 'Copiar Resumen' : 'Copy Summary')}
            </button>

            <button
              onClick={handleExportCsv}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              {isEs ? 'Descargar CSV' : 'Export CSV'}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              {isEs ? 'Imprimir Hoja' : 'Print Timesheet'}
            </button>
          </div>
        </div>
      </div>

      {/* Decimal Hours Layman Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'Minutos a Horas Decimales' : 'Minutes to Decimal Cheat Sheet'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'Los sistemas de nómina usan números decimales en vez de minutos: 15 mins = 0.25 hrs, 30 mins = 0.50 hrs, 45 mins = 0.75 hrs.'
              : 'Payroll systems use decimals instead of minutes: 15 mins = 0.25 hrs, 30 mins = 0.50 hrs, 45 mins = 0.75 hrs. 8 hrs 30 mins = 8.50 hours.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Coffee className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'Deducciones de Pausas' : 'Unpaid Lunch Deductions'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'Si entras a las 9:00 AM y sales a las 5:00 PM con 30 minutos de almuerzo, tu total neto de trabajo es 7.5 horas (7 horas y 30 minutos).'
              : 'If you clock in at 9:00 AM and leave at 5:00 PM with a 30-minute lunch, your paid net work time is 7.5 hours (7 hours and 30 minutes).'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {isEs ? 'Horas Extras (Overtime)' : 'How Overtime (1.5x) Works'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {isEs
              ? 'En la mayoría de los convenios laborales, las horas trabajadas que superen las 40 horas semanales se pagan a 1.5 veces tu tarifa regular por hora.'
              : 'Any hours worked over 40 hours in a single standard workweek are typically paid at 1.5x your regular hourly wage (time and a half).'}
          </p>
        </div>
      </div>
    </div>
  );
}
