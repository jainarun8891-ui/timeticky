
import React from 'react';

export function StatueOfLibertySvg({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Torch */}
      <path d="M68 15l4-10 4 10-4 4z" fill="#f59e0b" />
      <path d="M70 20l2 25-4 0z" fill="#10b981" />
      {/* Crown rays */}
      <path d="M44 32l-8-8 6 10zM50 30v-10l2 10zM56 32l8-8-6 10z" fill="#059669" />
      {/* Head */}
      <circle cx="50" cy="38" r="7" fill="#10b981" />
      {/* Body & Robe */}
      <path d="M42 45l-4 45 10 48h24l-8-55 4-38z" fill="#10b981" />
      <path d="M46 52l6 40 10-35z" fill="#047857" opacity="0.4" />
      {/* Pedestal */}
      <rect x="30" y="125" width="40" height="6" fill="#64748b" rx="1" />
      <rect x="24" y="131" width="52" height="9" fill="#475569" rx="1" />
    </svg>
  );
}
