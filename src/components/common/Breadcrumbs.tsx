import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export function Breadcrumbs({ items, className = '', showHomeIcon = true }: Props) {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items.filter(item => item.url !== '/'),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://globaltime.org${item.url}`,
    })),
  };

  return (
    <div className={`w-full py-1 ${className}`}>
      {/* Search Engine Schema.org BreadcrumbList Structured Data for Google Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visible Semantic Navigation Pill */}
      <nav
        aria-label="Breadcrumb"
        className="inline-flex items-center flex-wrap gap-1 sm:gap-1.5 text-xs text-slate-500 dark:text-slate-400 py-1.5 px-3 rounded-xl bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md shadow-2xs transition-colors"
      >
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;
          const isHome = index === 0;

          return (
            <React.Fragment key={item.url + index}>
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" aria-hidden="true" />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[240px] sm:max-w-[360px]"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 font-medium hover:underline underline-offset-2"
                >
                  {isHome && showHomeIcon && (
                    <Home className="w-3.5 h-3.5 text-slate-400 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex-shrink-0" />
                  )}
                  <span>{item.name}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
