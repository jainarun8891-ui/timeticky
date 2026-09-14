
import React from 'react';

export function BigBenSvg({ className = "w-10 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Spire */}
      <path d="M50 4l6 26h-12z" fill="#d97706" />
      <rect x="42" y="30" width="16" height="6" fill="#b45309" />
      {/* Clock section */}
      <rect x="36" y="36" width="28" height="28" fill="#d97706" rx="2" />
      <circle cx="50" cy="50" r="9" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
      <line x1="50" y1="50" x2="50" y2="44" stroke="#78350f" strokeWidth="1.5" />
      <line x1="50" y1="50" x2="55" y2="50" stroke="#78350f" strokeWidth="1.5" />
      {/* Tower body */}
      <rect x="38" y="64" width="24" height="74" fill="#b45309" />
      <rect x="42" y="70" width="4" height="60" fill="#78350f" opacity="0.3" />
      <rect x="54" y="70" width="4" height="60" fill="#78350f" opacity="0.3" />
      <rect x="32" y="136" width="36" height="4" fill="#78350f" />
    </svg>
  );
}
