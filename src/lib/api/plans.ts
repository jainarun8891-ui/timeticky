export interface ApiPlan {
  id: 'free' | 'developer' | 'business' | 'enterprise';
  name: string;
  priceInr: number;
  priceUsd: number;
  period: 'month';
  rateLimitPerMin: number;
  monthlyQuota: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const API_PLANS: ApiPlan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    priceInr: 0,
    priceUsd: 0,
    period: 'month',
    rateLimitPerMin: 10,
    monthlyQuota: 3000,
    description: 'Perfect for development, personal scripts, and prototype validation.',
    features: [
      '3,000 requests per month',
      '10 requests per minute',
      'UTC, timezones & location endpoints',
      'Community documentation & samples',
      'No credit card required'
    ]
  },
  {
    id: 'developer',
    name: 'Developer Pro',
    priceInr: 399,
    priceUsd: 5,
    period: 'month',
    rateLimitPerMin: 60,
    monthlyQuota: 50000,
    description: 'Designed for production mobile apps, SaaS integrations, and cron jobs.',
    features: [
      '50,000 requests per month',
      '60 requests per minute (1 req/sec burst)',
      'Solar, astronomical & moon phase endpoints',
      'Timezone conversion & meeting overlap matrix',
      'Email developer support within 24h',
      'Commercial production license'
    ],
    recommended: true
  },
  {
    id: 'business',
    name: 'Business Scale',
    priceInr: 1999,
    priceUsd: 25,
    period: 'month',
    rateLimitPerMin: 300,
    monthlyQuota: 500000,
    description: 'High-throughput infrastructure for multinational enterprise scheduling & logistics.',
    features: [
      '500,000 requests per month',
      '300 requests per minute burst capacity',
      '99.9% Uptime SLA guarantee',
      'Multi-city parallel batch calculation',
      'Dedicated edge caching & zero-latency routes',
      'Priority horology engineering escalation'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Custom',
    priceInr: 7999,
    priceUsd: 99,
    period: 'month',
    rateLimitPerMin: 1200,
    monthlyQuota: 5000000,
    description: 'Custom contract, bespoke quotas, on-premises docker containers, or dedicated cloud routing.',
    features: [
      '5,000,000+ requests per month',
      'Custom rate limits & dedicated IPs',
      '99.99% Enterprise SLA',
      'Dedicated account manager',
      'Custom timezone data ingestion',
      'Invoiced payment & signed DPA'
    ]
  }
];
