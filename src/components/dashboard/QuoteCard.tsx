"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export function QuoteCard({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const isSpanish = pathname?.startsWith('/es') ?? false;

  return (
    <div className={`w-full h-full bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 flex flex-col justify-between ${className}`}>
      <div className="text-3xl text-blue-500/40 font-serif leading-none select-none">
        &ldquo;
      </div>

      <div className="my-auto py-1">
        <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight">
          {isSpanish ? (
            <>&ldquo;El tiempo es una experiencia compartida.&rdquo;</>
          ) : (
            <>&ldquo;Time is a shared experience.&rdquo;</>
          )}
        </p>
        <p className="text-xs text-slate-400 font-medium mt-1.5 leading-relaxed">
          {isSpanish ? (
            <>Lugares diferentes.<br />Un mundo más conectado.</>
          ) : (
            <>Different places.<br />A more connected world.</>
          )}
        </p>
      </div>

      <div className="flex justify-end pt-1">
        <div className="w-10 h-1 rounded-full bg-blue-600" />
      </div>
    </div>
  );
}
