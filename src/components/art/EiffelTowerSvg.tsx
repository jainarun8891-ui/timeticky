
import React from 'react';

export function EiffelTowerSvg({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M48 5h4v15h-4z" fill="#475569" />
      <path d="M45 20h10l-2 30h-6z" fill="#64748b" />
      <rect x="42" y="50" width="16" height="4" rx="1" fill="#334155" />
      <path d="M43 54l-8 40h30l-8-40z" fill="#64748b" />
      <rect x="30" y="94" width="40" height="6" rx="2" fill="#334155" />
      <path d="M32 100l-14 38h16l5-24a12 12 0 0 1 22 0l5 24h16l-14-38z" fill="#475569" />
      <path d="M38 138a12 12 0 0 1 24 0z" fill="#f8fafc" />
      <line x1="36" y1="106" x2="64" y2="106" stroke="#94a3b8" strokeWidth="2" />
      <line x1="40" y1="70" x2="60" y2="70" stroke="#94a3b8" strokeWidth="2" />
    </svg>
  );
}
