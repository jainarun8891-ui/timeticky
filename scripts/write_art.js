const fs = require('fs');

// Eiffel Tower
fs.writeFileSync('src/components/art/EiffelTowerSvg.tsx', `
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
`, 'utf8');

// Statue of Liberty
fs.writeFileSync('src/components/art/StatueOfLibertySvg.tsx', `
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
`, 'utf8');

// Big Ben
fs.writeFileSync('src/components/art/BigBenSvg.tsx', `
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
`, 'utf8');

// Tokyo Tower
fs.writeFileSync('src/components/art/TokyoTowerSvg.tsx', `
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
`, 'utf8');

// Burj Al Arab
fs.writeFileSync('src/components/art/BurjAlArabSvg.tsx', `
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
`, 'utf8');

// India Gate
fs.writeFileSync('src/components/art/IndiaGateSvg.tsx', `
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
`, 'utf8');

// Sydney Opera House
fs.writeFileSync('src/components/art/SydneyOperaHouseSvg.tsx', `
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
`, 'utf8');

// Generic Skyline
fs.writeFileSync('src/components/art/GenericSkylineSvg.tsx', `
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
`, 'utf8');

// Paris Hero Scenic Vector Banner
fs.writeFileSync('src/components/art/ParisHeroBanner.tsx', `
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
`, 'utf8');

// World Map SVG
fs.writeFileSync('src/components/art/WorldMapSvg.tsx', `
import React from 'react';

interface WorldMapProps {
  activeLat?: number;
  activeLng?: number;
  className?: string;
}

export function WorldMapSvg({ activeLat = 48.8566, activeLng = 2.3522, className = "w-full h-44" }: WorldMapProps) {
  // Convert lat/lng to SVG coordinates (Equirectangular projection, viewBox 0 0 400 200)
  const pinX = ((activeLng + 180) / 360) * 400;
  const pinY = ((90 - activeLat) / 180) * 200;

  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center select-none">
      <svg
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Soft continent silhouettes */}
        <g fill="#cbd5e1" fillOpacity="0.6">
          {/* North America */}
          <path d="M50 40c10-15 45-20 70-5 15 10 25 35 15 50-10 12-25 15-30 30-3 10-12 25-15 35-5-2-12-10-10-20 5-15-5-25-15-35-10-10-18-35-15-55z" />
          {/* South America */}
          <path d="M100 110c12 5 25 18 20 35-5 18-12 35-15 50-3-5-10-15-12-25-2-15 0-45 7-60z" />
          {/* Europe */}
          <path d="M180 35c20-10 40 5 45 20-5 12-20 18-30 18-10 0-18-10-20-22 2-6 3-12 5-16z" />
          {/* Africa */}
          <path d="M175 75c20-5 35 10 45 25 10 15 15 35 10 50-8 15-20 30-32 30-10 0-18-20-20-40-2-20-8-45-3-65z" />
          {/* Asia */}
          <path d="M225 30c30-10 80 0 100 25 15 20 25 50 15 65-15 15-40 10-55 20-15 10-25 30-35 25-12-5-20-25-25-45 5-25-5-60 0-90z" />
          {/* Australia */}
          <path d="M315 130c18-5 35 10 38 25-2 15-18 25-30 20-12-5-15-20-8-45z" />
        </g>

        {/* Equator & Prime Meridian subtle guide lines */}
        <line x1="0" y1="100" x2="400" y2="100" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="0.8" />
        <line x1="200" y1="0" x2="200" y2="200" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="0.8" />

        {/* Pulsing Target Dot */}
        <g transform={\`translate(\${pinX}, \${pinY})\`}>
          <circle cx="0" cy="0" r="10" fill="#3b82f6" fillOpacity="0.25" className="animate-ping" />
          <circle cx="0" cy="0" r="5" fill="#2563eb" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
`, 'utf8');

console.log('Art components written successfully');
