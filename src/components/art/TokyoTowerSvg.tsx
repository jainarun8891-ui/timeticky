
import React from 'react';

export function TokyoTowerSvg({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Spire */}
      <line x1="50" y1="4" x2="50" y2="25" stroke="#ef4444" strokeWidth="3" />
      {/* Upper deck */}
      <path d="M46 25l-4 35h16l-4-35z" fill="#ef4444" />
      <rect x="40" y="60" width="20" height="6" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
      {/* Mid section */}
      <path d="M42 66l-6 30h28l-6-30z" fill="#ef4444" />
      <rect x="34" y="96" width="32" height="6" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
      {/* Base arch */}
      <path d="M34 102l-14 36h16l5-20a10 10 0 0 1 18 0l5 20h16l-14-36z" fill="#ef4444" />
      <path d="M42 138a8 8 0 0 1 16 0z" fill="#f8fafc" />
    </svg>
  );
}
