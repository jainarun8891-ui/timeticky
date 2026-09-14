"use client";

import React from 'react';
import { CITIES, City } from '@/lib/geo/cities';

interface WorldMapProps {
  activeCity?: City;
  onSelectCity?: (city: City) => void;
  className?: string;
}

export function WorldMapSvg({ activeCity = CITIES[0], onSelectCity, className = "w-full h-full" }: WorldMapProps) {
  // Convert lat/lng to SVG coordinates (Equirectangular projection, viewBox 0 0 800 400)
  const getCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 800;
    const y = ((90 - lat) / 180) * 400;
    return { x, y };
  };

  const activePos = getCoords(activeCity.lat, activeCity.lng);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden group">
      <svg
        viewBox="0 0 800 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="oceanBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
          <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Subtle Latitude & Longitude Navigation Grid */}
        <g stroke="#cbd5e1" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.6">
          <line x1="0" y1="100" x2="800" y2="100" />
          <line x1="0" y1="200" x2="800" y2="200" strokeWidth="1" strokeDasharray="none" stroke="#94a3b8" opacity="0.5" />
          <line x1="0" y1="300" x2="800" y2="300" />
          <line x1="200" y1="0" x2="200" y2="400" />
          <line x1="400" y1="0" x2="400" y2="400" strokeWidth="1" strokeDasharray="none" stroke="#94a3b8" opacity="0.5" />
          <line x1="600" y1="0" x2="600" y2="400" />
        </g>

        {/* Accurate, High-Definition Continent Outlines with Clean Fills */}
        <g fill="#cbd5e1" fillOpacity="0.85" stroke="#94a3b8" strokeWidth="0.75" strokeLinejoin="round">
          {/* North America & Arctic Islands */}
          <path d="M120 45 C140 35, 170 30, 210 38 C235 42, 270 35, 290 50 C280 65, 275 80, 260 90 C250 98, 240 102, 235 115 C230 130, 220 145, 205 155 C195 160, 185 170, 175 190 C165 205, 155 210, 140 220 C130 225, 125 215, 130 195 C125 185, 115 180, 105 165 C95 150, 85 130, 90 110 C95 90, 100 70, 110 55 Z" />
          {/* Alaska */}
          <path d="M70 60 C85 55, 105 60, 115 75 C105 90, 90 95, 75 90 C65 85, 60 75, 70 60 Z" />
          {/* Greenland */}
          <path d="M310 25 C335 20, 365 30, 370 55 C365 75, 340 85, 320 80 C305 75, 300 50, 310 25 Z" />

          {/* Central America & Caribbean */}
          <path d="M140 220 C150 230, 165 240, 175 255 C165 260, 155 250, 145 240 C138 230, 135 225, 140 220 Z" />
          <circle cx="185" cy="225" r="2.5" />
          <circle cx="200" cy="230" r="2" />

          {/* South America */}
          <path d="M175 255 C195 250, 230 260, 255 275 C275 290, 285 320, 275 350 C265 375, 240 410, 225 395 C215 375, 205 340, 195 310 C185 285, 170 270, 175 255 Z" />

          {/* Europe */}
          <path d="M380 75 C395 65, 430 60, 460 70 C475 80, 480 95, 470 115 C455 125, 435 130, 410 135 C390 140, 375 130, 380 115 C375 105, 365 95, 375 85 Z" />
          {/* British Isles */}
          <path d="M365 85 C372 75, 385 80, 382 95 C375 105, 365 100, 365 85 Z" />
          <path d="M355 90 C360 85, 365 90, 362 98 C358 102, 354 95, 355 90 Z" />
          {/* Scandinavia */}
          <path d="M410 40 C430 30, 450 45, 445 75 C435 90, 420 85, 415 65 C410 50, 405 45, 410 40 Z" />

          {/* Africa */}
          <path d="M375 145 C410 135, 460 140, 485 170 C505 195, 520 230, 500 270 C480 305, 450 340, 425 330 C405 315, 380 260, 370 220 C360 185, 365 155, 375 145 Z" />
          {/* Madagascar */}
          <path d="M515 280 C522 270, 530 285, 525 310 C520 320, 512 310, 515 280 Z" />

          {/* Asia & Middle East */}
          <path d="M470 70 C520 50, 600 45, 680 65 C725 80, 750 110, 730 140 C705 165, 675 175, 640 180 C615 195, 595 220, 570 235 C550 240, 530 215, 535 195 C520 180, 490 185, 475 165 C460 145, 465 110, 470 70 Z" />
          {/* Arabian Peninsula */}
          <path d="M485 170 C510 165, 535 180, 530 210 C515 225, 495 210, 485 190 Z" />
          {/* Indian Subcontinent */}
          <path d="M545 180 C570 185, 595 210, 580 250 C565 270, 550 250, 545 220 Z" />
          {/* Japan */}
          <path d="M725 115 C735 105, 745 120, 738 145 C730 155, 722 135, 725 115 Z" />
          {/* Southeast Asia Islands */}
          <path d="M625 230 C645 225, 675 240, 660 260 C640 270, 620 250, 625 230 Z" />
          <path d="M670 245 C685 240, 700 255, 690 270 C675 275, 665 260, 670 245 Z" />

          {/* Australia */}
          <path d="M660 280 C700 270, 745 285, 750 320 C745 350, 715 375, 675 365 C650 350, 635 320, 645 295 C650 285, 655 282, 660 280 Z" />
          {/* New Zealand */}
          <path d="M770 345 C778 335, 785 345, 780 365 C775 375, 768 365, 770 345 Z" />
        </g>

        {/* Global Cities Pins */}
        {CITIES.slice(0, 7).map((c) => {
          const pos = getCoords(c.lat, c.lng);
          const isCurrent = c.id === activeCity.id;

          return (
            <g
              key={c.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => onSelectCity && onSelectCity(c)}
              className="cursor-pointer group/pin"
            >
              {isCurrent ? (
                <>
                  {/* Outer Radar Ripple Wave 1 */}
                  <circle cx="0" cy="0" r="24" fill="url(#pinGlow)" className="animate-ping opacity-60" />
                  {/* Outer Radar Ripple Wave 2 */}
                  <circle cx="0" cy="0" r="14" fill="#3b82f6" fillOpacity="0.25" className="animate-pulse" />
                  {/* Core Pin Ring */}
                  <circle cx="0" cy="0" r="7" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" filter="url(#glowEffect)" />
                  <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                </>
              ) : (
                <>
                  <circle cx="0" cy="0" r="3.5" fill="#64748b" stroke="#ffffff" strokeWidth="1" className="group-hover/pin:fill-blue-600 transition-colors" />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
