import React from 'react';
import { Metadata } from 'next';
import { DashboardClient } from './DashboardClient';
import { LayoutDashboard, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Internal Growth & Revenue Dashboard — TimeNumbers',
  description: 'Internal operations, SEO performance telemetry, and commercial monetization analytics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              Restricted Internal Operations
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <LayoutDashboard className="w-8 h-8 text-blue-600" />
              Growth &amp; Revenue Command Center
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-mono text-right">
            TimeNumbers Chronometry Platform<br />
            Commercial Growth Engine
          </div>
        </div>

        {/* Dashboard Client */}
        <DashboardClient />
      </div>
    </div>
  );
}
