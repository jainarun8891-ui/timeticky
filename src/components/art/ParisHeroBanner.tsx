
import React from 'react';

export function ParisHeroBanner() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl select-none z-0">
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover opacity-90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#eff6ff" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="mistOverlay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Sky wash */}
        <rect width="1200" height="400" fill="url(#skyGrad)" />

        {/* Distant Parisian skyline & Haussmann buildings on left */}
        <g opacity="0.35" fill="#94a3b8">
          <path d="M0 320h120v-40h20v40h40v-60h30v60h50v-50h30v50h60v-70h25v70h95v-45h40v45h60v-55h35v55H0z" />
          {/* Distant Bridge arches across Seine */}
          <path d="M0 340h500v60H0z" fill="#cbd5e1" opacity="0.4" />
          <path d="M60 360a30 30 0 0 1 60 0M180 360a30 30 0 0 1 60 0M300 360a30 30 0 0 1 60 0" stroke="#64748b" strokeWidth="4" fill="none" />
        </g>

        {/* Detailed Eiffel Tower silhouette on left side matching the reference */}
        <g transform="translate(140, 45) scale(1.6)" opacity="0.45">
          {/* Spire */}
          <line x1="50" y1="5" x2="50" y2="35" stroke="#334155" strokeWidth="2.5" />
          {/* Top section */}
          <path d="M47 35h6l-3 40h-4z" fill="#475569" />
          <rect x="43" y="75" width="14" height="4" fill="#1e293b" rx="1" />
          {/* Mid section */}
          <path d="M44 79l-7 45h26l-7-45z" fill="#475569" />
          <rect x="32" y="124" width="36" height="5" fill="#1e293b" rx="1.5" />
          {/* Lower legs & grand arch */}
          <path d="M34 129l-16 65h18l6-32a12 12 0 0 1 16 0l6 32h18l-16-65z" fill="#334155" />
          <path d="M40 194a10 10 0 0 1 20 0z" fill="#ffffff" />
          {/* Cross bracing details */}
          <line x1="38" y1="135" x2="62" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="36" y1="150" x2="64" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
        </g>

        {/* Soft mountain & hill horizon on right matching reference image */}
        <g opacity="0.25" fill="#93c5fd">
          <path d="M750 400l120-130 90 70 140-110 100 170z" />
          <path d="M900 400l100-90 80 50 120-80v120z" fill="#bfdbfe" />
        </g>

        {/* Gradient Mist Overlay to make text perfectly readable */}
        <rect width="1200" height="400" fill="url(#mistOverlay)" />
      </svg>
    </div>
  );
}
