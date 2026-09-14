
import React from 'react';

export function IndiaGateSvg({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Top tier */}
      <rect x="36" y="24" width="28" height="6" fill="#d97706" rx="1" />
      <rect x="30" y="30" width="40" height="8" fill="#b45309" rx="1" />
      <rect x="24" y="38" width="52" height="10" fill="#d97706" />
      {/* Main arch pillars */}
      <path d="M26 48h14v88H26zM60 48h14v88H60z" fill="#d97706" />
      {/* Arch curve */}
      <path d="M40 84c0-12 10-20 20-20s20 8 20 20v52H40z" fill="#fef3c7" />
      <path d="M44 86a12 12 0 0 1 24 0v50H44z" fill="#f8fafc" stroke="#b45309" strokeWidth="2" />
      {/* Base steps */}
      <rect x="20" y="134" width="60" height="6" fill="#78350f" rx="1" />
    </svg>
  );
}
