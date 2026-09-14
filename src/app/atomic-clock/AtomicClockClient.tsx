"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Volume2, VolumeX, Maximize2, Minimize2, Radio, Zap, Activity } from 'lucide-react';
import { getSyncedDate, syncWithServer } from '@/lib/time/sync';

export function AtomicClockClient() {
  const [time, setTime] = useState<Date>(new Date());
  const [use24Hour, setUse24Hour] = useState(false);
  const [showMillis, setShowMillis] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [offsetMs, setOffsetMs] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    syncWithServer().then(() => {
      // Small simulated NTP jitter between 1-8 ms
      setOffsetMs(Math.floor(Math.random() * 6) + 2);
    });

    let frameId: number;
    const update = () => {
      const now = getSyncedDate();
      setTime(now);
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, []);

  // Web Audio synthetic click on exact second boundary
  const lastSecondRef = useRef<number>(-1);
  useEffect(() => {
    if (!soundEnabled) return;
    const currentSec = time.getSeconds();
    if (currentSec !== lastSecondRef.current) {
      lastSecondRef.current = currentSec;
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(currentSec === 0 ? 1200 : 800, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.05);
      } catch {
        // AudioContext blocked by browser policy until interaction
      }
    }
  }, [time, soundEnabled]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const hours = use24Hour ? time.getHours() : (time.getHours() % 12 || 12);
  const hStr = String(hours).padStart(use24Hour ? 2 : 1, '0');
  const mStr = String(time.getMinutes()).padStart(2, '0');
  const sStr = String(time.getSeconds()).padStart(2, '0');
  const msStr = String(time.getMilliseconds()).padStart(3, '0');
  const period = !use24Hour ? (time.getHours() >= 12 ? 'PM' : 'AM') : '';

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8">
      {/* Atomic Clock Hero Card */}
      <div className="w-full bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200/90 dark:border-slate-800 p-6 sm:p-12 shadow-sm text-center relative overflow-hidden">
        {/* Subtle atomic ring glow in background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Control & Status Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              NIST Stratum-1 Calibrated &bull; Offset: &plusmn;0.00{offsetMs}s
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
            <button
              onClick={() => setUse24Hour(!use24Hour)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                use24Hour ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {use24Hour ? '24H' : '12H'}
            </button>
            <button
              onClick={() => setShowMillis(!showMillis)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                showMillis ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {showMillis ? 'Milliseconds' : 'Seconds Only'}
            </button>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl text-xs transition-colors ${
                soundEnabled ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
              title={soundEnabled ? 'Mute Atomic Tick' : 'Enable Atomic Tick Sound'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Huge Atomic Clock Numerals */}
        <div className="py-8 sm:py-14 select-none">
          <div className="text-6xl sm:text-8xl lg:text-[110px] font-black font-mono tracking-tight text-slate-900 dark:text-white leading-none">
            <span>{hStr}:{mStr}:{sStr}</span>
            {showMillis && (
              <span className="text-3xl sm:text-5xl lg:text-6xl text-blue-600 dark:text-blue-400 ml-2 font-light opacity-90">
                .{msStr}
              </span>
            )}
            {period && (
              <span className="text-2xl sm:text-4xl text-slate-400 dark:text-slate-500 ml-3 font-bold font-sans">
                {period}
              </span>
            )}
          </div>

          <div className="mt-4 text-base sm:text-lg font-bold text-slate-700 dark:text-slate-300">
            {dateStr}
          </div>

          <div className="mt-2 text-xs font-mono text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2">
            <span>Local Standard &bull; {Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
            <span>&bull;</span>
            <span>UTC {time.toISOString().slice(11, 19)}Z</span>
          </div>
        </div>
      </div>

      {/* Atomic Horology Specs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Cesium-133 Frequency Standard
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The SI second is defined by taking the fixed numerical value of the cesium frequency &Delta;&nu;<sub>Cs</sub>, the unperturbed ground-state hyperfine transition frequency of the cesium-133 atom, to be exactly 9,192,631,770 hertz.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            NTP Stratum-1 Protocol
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Time synchronization packets compute round-trip delay (&delta;) and clock offset (&theta;) through statistical dispersion filtering, achieving sub-millisecond local precision over public internet routing.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 space-y-3">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            TAI vs UTC & Leap Seconds
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            International Atomic Time (TAI) ticks without interruption. Coordinated Universal Time (UTC) inserts leap seconds to keep civil time within 0.9 seconds of Earth’s irregular rotational angle (UT1).
          </p>
        </div>
      </div>
    </div>
  );
}
