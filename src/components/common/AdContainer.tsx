"use client";

import React, { useState, useEffect } from 'react';

interface AdContainerProps {
  slotId?: string;
  format?: 'leaderboard' | 'rectangle' | 'in-feed';
  className?: string;
}

export function AdContainer({
  slotId = 'default-slot',
  format = 'leaderboard',
  className = '',
}: AdContainerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Defined dimensions to prevent Cumulative Layout Shift (CLS)
  const formatStyles = {
    leaderboard: 'min-h-[90px] max-w-[728px] mx-auto',
    rectangle: 'min-h-[250px] max-w-[300px] mx-auto',
    'in-feed': 'min-h-[100px] w-full',
  }[format];

  return (
    <aside
      aria-label="Sponsored Advertisement"
      className={`relative my-6 px-4 py-2 rounded-2xl bg-slate-100/60 dark:bg-slate-900/40 border border-dashed border-slate-300/80 dark:border-slate-800 flex flex-col items-center justify-center transition-all overflow-hidden ${formatStyles} ${className}`}
    >
      {/* Policy-compliant disclosure label */}
      <div className="w-full text-center mb-1">
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-500 select-none">
          Advertisement
        </span>
      </div>

      {/* Ad slot injection container */}
      <div
        id={`ad-slot-${slotId}`}
        className="w-full flex items-center justify-center text-xs text-slate-400 dark:text-slate-600 font-mono text-center py-2"
      >
        {isClient ? (
          <div className="text-[11px] opacity-70">
            {/* Dynamic ad scripts will target this container without causing layout shift */}
            <span>Sponsored Placement</span>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
