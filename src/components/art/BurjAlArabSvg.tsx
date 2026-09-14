
import React from 'react';

export function BurjAlArabSvg({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Mast */}
      <line x1="38" y1="6" x2="38" y2="138" stroke="#0284c7" strokeWidth="3" />
      {/* Helipad */}
      <circle cx="56" cy="38" r="6" fill="#0284c7" />
      <line x1="38" y1="38" x2="56" y2="38" stroke="#0284c7" strokeWidth="2" />
      {/* Sail curve */}
      <path d="M38 14c35 15 48 65 24 124H38z" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="2.5" />
      {/* Cross beams */}
      <line x1="38" y1="50" x2="68" y2="70" stroke="#0369a1" strokeWidth="1.5" />
      <line x1="38" y1="80" x2="65" y2="110" stroke="#0369a1" strokeWidth="1.5" />
      {/* Base island */}
      <ellipse cx="48" cy="138" rx="30" ry="4" fill="#94a3b8" />
    </svg>
  );
}
