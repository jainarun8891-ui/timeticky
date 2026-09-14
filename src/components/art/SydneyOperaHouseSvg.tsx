
import React from 'react';

export function SydneyOperaHouseSvg({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ocean waves */}
      <path d="M10 134c10-2 20 2 30 0s20-2 30 0 15-2 20 0" stroke="#0284c7" strokeWidth="2" fill="none" />
      {/* Podium base */}
      <path d="M14 126h72l-4 8H18z" fill="#64748b" />
      {/* Sail 1 */}
      <path d="M22 126c6-28 24-42 34-40-10 16-16 32-14 40z" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
      {/* Sail 2 (Main) */}
      <path d="M38 126c10-38 34-58 46-52-12 22-20 42-18 52z" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
      {/* Sail 3 (Right) */}
      <path d="M58 126c8-26 24-36 32-32-8 14-14 26-12 32z" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
    </svg>
  );
}
