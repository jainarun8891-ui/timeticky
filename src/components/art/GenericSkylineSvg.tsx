
import React from 'react';

export function GenericSkylineSvg({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="18" y="70" width="16" height="66" fill="#94a3b8" rx="1" />
      <rect x="38" y="36" width="24" height="100" fill="#64748b" rx="2" />
      <line x1="50" y1="18" x2="50" y2="36" stroke="#475569" strokeWidth="2" />
      <rect x="66" y="58" width="18" height="78" fill="#94a3b8" rx="1" />
      <circle cx="44" cy="50" r="1.5" fill="#fef3c7" />
      <circle cx="56" cy="50" r="1.5" fill="#fef3c7" />
      <circle cx="44" cy="62" r="1.5" fill="#fef3c7" />
      <circle cx="56" cy="62" r="1.5" fill="#fef3c7" />
    </svg>
  );
}
