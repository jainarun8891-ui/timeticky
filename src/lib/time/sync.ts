let clockOffsetMs = 0;
let isSynchronized = false;
let syncAccuracyMs = 10;
let lastSyncTimestamp = 0;

export interface SyncState {
  offsetMs: number;
  isSynced: boolean;
  accuracyMs: number;
  lastSyncedAt: number;
}

export async function syncWithServer(): Promise<SyncState> {
  // Prevent aggressive re-syncing if already synced within the last 10 minutes
  if (isSynchronized && (Date.now() - lastSyncTimestamp < 10 * 60 * 1000)) {
    return getSyncState();
  }

  const samples: number[] = [];
  const latencies: number[] = [];
  const iterations = isSynchronized ? 1 : 2;

  for (let i = 0; i < iterations; i++) {
    try {
      const t0 = performance.now();
      const res = await fetch('/api/time', { cache: 'no-store' });
      const t1 = performance.now();
      if (res.ok) {
        const data = await res.json();
        const rtt = t1 - t0;
        const serverTime = data.serverTime;
        const estimatedDeviceTime = Date.now() - (rtt / 2);
        const offset = serverTime - estimatedDeviceTime;
        samples.push(offset);
        latencies.push(rtt);
      }
    } catch (e) {
      // Network error, keep existing state
    }
  }

  if (samples.length > 0) {
    samples.sort((a, b) => a - b);
    clockOffsetMs = samples[Math.floor(samples.length / 2)];
    syncAccuracyMs = Math.round(Math.min(...latencies) / 2);
    isSynchronized = true;
    lastSyncTimestamp = Date.now();
  }

  return {
    offsetMs: clockOffsetMs,
    isSynced: isSynchronized,
    accuracyMs: syncAccuracyMs,
    lastSyncedAt: lastSyncTimestamp
  };
}

export function getSyncedDate(): Date {
  return new Date(Date.now() + clockOffsetMs);
}

export function getSyncState(): SyncState {
  return {
    offsetMs: clockOffsetMs,
    isSynced: isSynchronized,
    accuracyMs: syncAccuracyMs,
    lastSyncedAt: lastSyncTimestamp
  };
}

// -------------------------------------------------------------
// Central Clock Ticker & Mobile Tab Resume Optimization
// -------------------------------------------------------------

type ClockListener = (date: Date) => void;
const subscribers = new Set<ClockListener>();
let globalTickerId: ReturnType<typeof setInterval> | null = null;

function broadcastTick() {
  const now = getSyncedDate();
  subscribers.forEach((cb) => {
    try {
      cb(now);
    } catch {}
  });
}

function ensureGlobalTickerRunning() {
  if (typeof window === 'undefined') return;
  if (!globalTickerId && subscribers.size > 0) {
    globalTickerId = setInterval(broadcastTick, 1000);
  }
}

function stopGlobalTickerIfIdle() {
  if (subscribers.size === 0 && globalTickerId) {
    clearInterval(globalTickerId);
    globalTickerId = null;
  }
}

if (typeof window !== 'undefined') {
  // Instant tick without network call on mobile tab resume or screen wake
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      broadcastTick();
      if (!isSynchronized || (Date.now() - lastSyncTimestamp > 10 * 60 * 1000)) {
        syncWithServer().catch(() => {});
      }
    }
  });

  window.addEventListener('focus', () => {
    broadcastTick();
  });
}

export function subscribeToClock(callback: ClockListener): () => void {
  subscribers.add(callback);
  ensureGlobalTickerRunning();
  // Immediately invoke with current time
  callback(getSyncedDate());

  return () => {
    subscribers.delete(callback);
    stopGlobalTickerIfIdle();
  };
}

