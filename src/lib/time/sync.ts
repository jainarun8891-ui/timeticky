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
  const samples: number[] = [];
  const latencies: number[] = [];

  for (let i = 0; i < 3; i++) {
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
