"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Bell, BellOff, Volume2, VolumeX, Maximize2, Minimize2, Plus, Trash2, Clock, Play, Moon, Sun, Check, AlertCircle } from 'lucide-react';

interface AlarmItem {
  id: string;
  time: string; // "HH:MM" 24h
  label: string;
  sound: 'zen' | 'chime' | 'pulse' | 'fanfare';
  enabled: boolean;
  snoozeCount: number;
}

export function AlarmClockClient() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [alarms, setAlarms] = useState<AlarmItem[]>([
    { id: '1', time: '07:30', label: 'Morning Wakeup', sound: 'chime', enabled: true, snoozeCount: 0 },
    { id: '2', time: '14:00', label: 'Standup Sync', sound: 'zen', enabled: false, snoozeCount: 0 },
  ]);
  const [newTime, setNewTime] = useState('08:00');
  const [newLabel, setNewLabel] = useState('New Alarm');
  const [newSound, setNewSound] = useState<'zen' | 'chime' | 'pulse' | 'fanfare'>('chime');
  const [activeRingingAlarm, setActiveRingingAlarm] = useState<AlarmItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNightstandMode, setIsNightstandMode] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio Context on first interaction
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Web Audio Synthesizer
  const playSound = (soundType: 'zen' | 'chime' | 'pulse' | 'fanfare') => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (soundType === 'zen') {
        // Singing bowl resonance
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, now); // 432 Hz healing tone
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.5);
      } else if (soundType === 'chime') {
        // Pleasant three-tone ascending chord (E5, G#5, B5)
        const freqs = [659.25, 830.61, 987.77];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.15);
          gain.gain.setValueAtTime(0.4, now + idx * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.15 + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.15);
          osc.stop(now + idx * 0.15 + 1.2);
        });
      } else if (soundType === 'pulse') {
        // High attention electronic double-beep
        [0, 0.2].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(880, now + offset);
          gain.gain.setValueAtTime(0.3, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.12);
        });
      } else if (soundType === 'fanfare') {
        // Rising wakeup brass fanfare
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.4, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.6);
        });
      }
    } catch {}
  };

  // Clock tick & Alarm monitoring
  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Check alarms if not already ringing
      if (!activeRingingAlarm && now.getSeconds() === 0) {
        const curHours = String(now.getHours()).padStart(2, '0');
        const curMins = String(now.getMinutes()).padStart(2, '0');
        const curTimeStr = `${curHours}:${curMins}`;

        const triggered = alarms.find(a => a.enabled && a.time === curTimeStr);
        if (triggered) {
          triggerAlarm(triggered);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [alarms, activeRingingAlarm]);

  const triggerAlarm = (alarm: AlarmItem) => {
    setActiveRingingAlarm(alarm);
    playSound(alarm.sound);
    if (soundIntervalRef.current) clearInterval(soundIntervalRef.current);
    soundIntervalRef.current = setInterval(() => {
      playSound(alarm.sound);
    }, 2500);
  };

  const stopAlarm = () => {
    if (soundIntervalRef.current) {
      clearInterval(soundIntervalRef.current);
      soundIntervalRef.current = null;
    }
    setActiveRingingAlarm(null);
  };

  const snoozeAlarm = (minutes: number) => {
    if (!activeRingingAlarm) return;
    stopAlarm();
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    const snoozeTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setAlarms(prev => [
      ...prev,
      {
        id: `snooze-${Date.now()}`,
        time: snoozeTime,
        label: `Snooze (${activeRingingAlarm.label})`,
        sound: activeRingingAlarm.sound,
        enabled: true,
        snoozeCount: activeRingingAlarm.snoozeCount + 1,
      },
    ]);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleAddAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime) return;
    setAlarms(prev => [
      ...prev,
      {
        id: `alarm-${Date.now()}`,
        time: newTime,
        label: newLabel || 'Alarm',
        sound: newSound,
        enabled: true,
        snoozeCount: 0,
      },
    ]);
    setNewLabel('New Alarm');
  };

  const toggleAlarmEnabled = (id: string) => {
    setAlarms(prev => prev.map(a => (a.id === id ? { ...a, enabled: !a.enabled } : a)));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  const now = currentTime || new Date();
  const timeFormatted = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now);

  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(now);

  return (
    <div ref={containerRef} className={`space-y-8 ${isNightstandMode ? 'bg-black text-red-500 p-8 rounded-3xl' : ''}`}>
      {/* Active Ringing Alarm Alert Modal */}
      {activeRingingAlarm && (
        <div className="p-8 rounded-3xl bg-rose-600 text-white shadow-2xl animate-bounce flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-200 block">
                Alarm Ringing Now!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">{activeRingingAlarm.label}</h2>
              <span className="text-sm text-rose-100 font-mono font-bold">Scheduled for {activeRingingAlarm.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => snoozeAlarm(5)}
              className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-all"
            >
              Snooze 5 Min
            </button>
            <button
              onClick={() => snoozeAlarm(10)}
              className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-all"
            >
              Snooze 10 Min
            </button>
            <button
              onClick={stopAlarm}
              className="px-6 py-3 rounded-2xl bg-white text-rose-700 hover:bg-rose-50 font-black text-sm shadow-lg transition-all"
            >
              Dismiss / Stop
            </button>
          </div>
        </div>
      )}

      {/* Main Bedside Clock Display */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
        {/* Top Controls */}
        <div className="absolute right-6 top-6 flex items-center gap-2">
          <button
            onClick={() => setIsNightstandMode(!isNightstandMode)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all"
            title="Nightstand Dimmer Mode"
          >
            {isNightstandMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-all"
            title="Fullscreen Bedside Display (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400 block mb-2">
          {dateFormatted}
        </span>

        <div className="text-5xl sm:text-7xl lg:text-8xl font-mono font-black tracking-tight text-slate-900 dark:text-white py-4">
          {timeFormatted}
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800 mt-2">
          <Clock className="w-3.5 h-3.5" />
          {alarms.filter(a => a.enabled).length} active alarms armed
        </div>
      </div>

      {/* Alarms Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Add New Alarm Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Set New Alarm
              </h3>
              <span className="text-xs text-slate-400">Configure time and sound chime</span>
            </div>
          </div>

          <form onSubmit={handleAddAlarm} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Alarm Time
              </label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Alarm Label
              </label>
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="e.g. Morning Routine, Team Meeting"
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Audio Chime Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'chime', label: 'Marimba Chime' },
                  { id: 'zen', label: 'Zen Bell' },
                  { id: 'pulse', label: 'Pulse Radar' },
                  { id: 'fanfare', label: 'Brass Fanfare' },
                ].map((s) => (
                  <div key={s.id} className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setNewSound(s.id as 'zen' | 'chime' | 'pulse' | 'fanfare')}
                      className={`flex-1 p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                        newSound === s.id
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                    <button
                      type="button"
                      onClick={() => playSound(s.id as 'zen' | 'chime' | 'pulse' | 'fanfare')}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-600"
                      title="Preview sound"
                    >
                      <Play className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Arm Alarm
            </button>
          </form>
        </div>

        {/* Existing Alarms List */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Configured Alarms ({alarms.length})
            </h3>
            <span className="text-xs text-slate-400">Audio synthesized via Web Audio API</span>
          </div>

          <div className="space-y-3">
            {alarms.map((alarm) => (
              <div
                key={alarm.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  alarm.enabled
                    ? 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700'
                    : 'bg-slate-100/50 dark:bg-slate-800/20 border-slate-200/40 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleAlarmEnabled(alarm.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      alarm.enabled
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {alarm.enabled ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                  </button>

                  <div>
                    <span className="text-2xl font-mono font-black text-slate-900 dark:text-white block">
                      {alarm.time}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {alarm.label} • <strong className="capitalize">{alarm.sound}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playSound(alarm.sound)}
                    className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title="Test chime"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAlarm(alarm.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Delete alarm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
