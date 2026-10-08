import { NextResponse } from 'next/server';
import { API_PLANS, ApiPlan } from './plans';

interface RateLimitRecord {
  timestamps: number[];
  monthlyCount: number;
  lastResetMonth: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

// Cleanup stale memory records every 10 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const oneHourAgo = Date.now() - 3600000;
    for (const [key, record] of memoryStore.entries()) {
      if (record.timestamps.length === 0 || record.timestamps[record.timestamps.length - 1] < oneHourAgo) {
        memoryStore.delete(key);
      }
    }
  }, 600000);
}

export interface RateLimitResult {
  allowed: boolean;
  plan: ApiPlan;
  limit: number;
  remaining: number;
  resetSeconds: number;
  identifier: string;
}

export function resolveApiKeyTier(key: string | null): ApiPlan {
  if (!key) return API_PLANS[0]; // Free
  const clean = key.trim();
  if (clean.startsWith('tn_live_biz_') || clean === 'tn_sandbox_biz') {
    return API_PLANS.find(p => p.id === 'business') || API_PLANS[2];
  }
  if (clean.startsWith('tn_live_dev_') || clean === 'tn_sandbox_dev') {
    return API_PLANS.find(p => p.id === 'developer') || API_PLANS[1];
  }
  return API_PLANS[0]; // Free Starter
}

export function checkRateLimit(request: Request): RateLimitResult {
  const authHeader = request.headers.get('authorization') || '';
  const apiKeyHeader = request.headers.get('x-api-key') || '';
  let token = '';

  if (apiKeyHeader) {
    token = apiKeyHeader.trim();
  } else if (authHeader.startsWith('Bearer ')) {
    token = authHeader.replace('Bearer ', '').trim();
  }

  const plan = resolveApiKeyTier(token || null);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
  const identifier = token ? `key:${token.slice(0, 16)}` : `ip:${ip}`;

  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  const windowStart = now - windowMs;

  let record = memoryStore.get(identifier);
  if (!record) {
    record = { timestamps: [], monthlyCount: 0, lastResetMonth: new Date().getUTCMonth() };
    memoryStore.set(identifier, record);
  }

  // Filter timestamps within the current 1-minute window
  record.timestamps = record.timestamps.filter(ts => ts > windowStart);

  const currentMinuteCount = record.timestamps.length;
  const isAllowed = currentMinuteCount < plan.rateLimitPerMin;

  if (isAllowed) {
    record.timestamps.push(now);
    record.monthlyCount += 1;
  }

  const oldestInWindow = record.timestamps[0] || now;
  const resetSeconds = Math.max(1, Math.ceil((oldestInWindow + windowMs - now) / 1000));
  const remaining = Math.max(0, plan.rateLimitPerMin - record.timestamps.length);

  return {
    allowed: isAllowed,
    plan,
    limit: plan.rateLimitPerMin,
    remaining,
    resetSeconds,
    identifier,
  };
}

export function createRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(result.resetSeconds),
    'X-RateLimit-Tier': result.plan.name,
    'X-RateLimit-Monthly-Quota': String(result.plan.monthlyQuota),
  };
}

export function createRateLimitExceededResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      error: 'Too Many Requests',
      message: `Rate limit of ${result.limit} requests per minute exceeded for ${result.plan.name} tier. Upgrade to Developer or Business plan for higher throughput.`,
      tier: result.plan.id,
      retryAfterSeconds: result.resetSeconds,
      upgradeUrl: 'https://www.timenumbers.com/api-docs#pricing',
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.resetSeconds),
        ...createRateLimitHeaders(result),
      },
    }
  );
}
