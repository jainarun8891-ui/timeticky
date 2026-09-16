import React from 'react';

interface CountryFlagProps {
  code: string;
  className?: string;
  title?: string;
}

export function CountryFlag({ code, className = "w-5 h-3.5", title }: CountryFlagProps) {
  const normalized = (code || '').toUpperCase();
  const baseClasses = `inline-flex shrink-0 overflow-hidden rounded-[3px] shadow-xs border border-black/10 dark:border-white/10 ${className}`;

  switch (normalized) {
    case 'FR': // France
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "France"} role="img">
          <rect width="10" height="20" fill="#002395" />
          <rect x="10" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" width="10" height="20" fill="#ED2939" />
        </svg>
      );
    case 'US': // USA
      return (
        <svg viewBox="0 0 38 20" className={baseClasses} aria-label={title || "United States"} role="img">
          <rect width="38" height="20" fill="#B22234" />
          <path d="M0,2.3h38M0,5.4h38M0,8.5h38M0,11.5h38M0,14.6h38M0,17.7h38" stroke="#FFFFFF" strokeWidth="1.54" />
          <rect width="15.2" height="10.8" fill="#3C3B6E" />
          <circle cx="3" cy="2.5" r="0.7" fill="#FFFFFF" />
          <circle cx="7.6" cy="2.5" r="0.7" fill="#FFFFFF" />
          <circle cx="12.2" cy="2.5" r="0.7" fill="#FFFFFF" />
          <circle cx="5.3" cy="5.4" r="0.7" fill="#FFFFFF" />
          <circle cx="9.9" cy="5.4" r="0.7" fill="#FFFFFF" />
          <circle cx="3" cy="8.3" r="0.7" fill="#FFFFFF" />
          <circle cx="7.6" cy="8.3" r="0.7" fill="#FFFFFF" />
          <circle cx="12.2" cy="8.3" r="0.7" fill="#FFFFFF" />
        </svg>
      );
    case 'GB': // United Kingdom
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "United Kingdom"} role="img">
          <clipPath id="gb-flag-clip"><rect width="30" height="20" /></clipPath>
          <g clipPath="url(#gb-flag-clip)">
            <rect width="30" height="20" fill="#012169" />
            <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" strokeWidth="4" />
            <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="2.2" />
            <path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="3.6" />
          </g>
        </svg>
      );
    case 'JP': // Japan
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Japan"} role="img">
          <rect width="30" height="20" fill="#FFFFFF" />
          <circle cx="15" cy="10" r="6" fill="#BC002D" />
        </svg>
      );
    case 'AE': // UAE
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "United Arab Emirates"} role="img">
          <rect width="30" height="6.66" fill="#00732F" />
          <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
          <rect y="13.33" width="30" height="6.67" fill="#000000" />
          <rect width="7.5" height="20" fill="#FF0000" />
        </svg>
      );
    case 'IN': // India
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "India"} role="img">
          <rect width="30" height="6.66" fill="#FF9933" />
          <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
          <rect y="13.33" width="30" height="6.67" fill="#138808" />
          <circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" strokeWidth="0.8" />
        </svg>
      );
    case 'AU': // Australia
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Australia"} role="img">
          <rect width="30" height="20" fill="#00008B" />
          <rect width="14" height="9" fill="#012169" />
          <path d="M0,0 L14,9 M14,0 L0,9" stroke="#FFFFFF" strokeWidth="1.8" />
          <path d="M0,0 L14,9 M14,0 L0,9" stroke="#C8102E" strokeWidth="1" />
          <path d="M7,0 V9 M0,4.5 H14" stroke="#FFFFFF" strokeWidth="2.8" />
          <path d="M7,0 V9 M0,4.5 H14" stroke="#C8102E" strokeWidth="1.6" />
          <circle cx="7" cy="14.5" r="1.4" fill="#FFFFFF" />
          <circle cx="22" cy="5" r="0.8" fill="#FFFFFF" />
          <circle cx="20" cy="8" r="0.8" fill="#FFFFFF" />
          <circle cx="24" cy="10" r="0.8" fill="#FFFFFF" />
          <circle cx="22" cy="15" r="0.8" fill="#FFFFFF" />
        </svg>
      );
    case 'DE': // Germany
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Germany"} role="img">
          <rect width="30" height="6.66" fill="#000000" />
          <rect y="6.66" width="30" height="6.66" fill="#DD0000" />
          <rect y="13.33" width="30" height="6.67" fill="#FFCC00" />
        </svg>
      );
    case 'CA': // Canada
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Canada"} role="img">
          <rect width="7.5" height="20" fill="#FF0000" />
          <rect x="7.5" width="15" height="20" fill="#FFFFFF" />
          <rect x="22.5" width="7.5" height="20" fill="#FF0000" />
          <path d="M15,4 L16.5,7 L19.5,7.5 L17.5,9.5 L18,12.5 L15,11 L12,12.5 L12.5,9.5 L10.5,7.5 L13.5,7 Z" fill="#FF0000" />
        </svg>
      );
    case 'SG': // Singapore
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Singapore"} role="img">
          <rect width="30" height="10" fill="#ED2939" />
          <rect y="10" width="30" height="10" fill="#FFFFFF" />
          <circle cx="6" cy="5" r="3" fill="#FFFFFF" />
          <circle cx="7" cy="5" r="3" fill="#ED2939" />
        </svg>
      );
    case 'BR': // Brazil
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Brazil"} role="img">
          <rect width="30" height="20" fill="#009B3A" />
          <polygon points="15,2 27,10 15,18 3,10" fill="#FEDF00" />
          <circle cx="15" cy="10" r="4.2" fill="#002776" />
        </svg>
      );
    case 'KR': // South Korea
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "South Korea"} role="img">
          <rect width="30" height="20" fill="#FFFFFF" />
          <circle cx="15" cy="10" r="5" fill="#C60C30" />
          <path d="M 10 10 A 2.5 2.5 0 0 0 15 10 A 2.5 2.5 0 0 1 20 10 A 5 5 0 0 1 10 10" fill="#003478" />
        </svg>
      );
    case 'PT': // Portugal
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Portugal"} role="img">
          <rect width="12" height="20" fill="#046A38" />
          <rect x="12" width="18" height="20" fill="#DA291C" />
          <circle cx="12" cy="10" r="3.5" fill="#FED100" />
        </svg>
      );
    case 'GR': // Greece
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Greece"} role="img">
          <rect width="30" height="20" fill="#0D5EAF" />
          <rect y="2.2" width="30" height="2.2" fill="#FFFFFF" />
          <rect y="6.6" width="30" height="2.2" fill="#FFFFFF" />
          <rect y="11.1" width="30" height="2.2" fill="#FFFFFF" />
          <rect y="15.5" width="30" height="2.2" fill="#FFFFFF" />
          <rect width="10" height="10" fill="#0D5EAF" />
          <rect x="3.8" width="2.4" height="10" fill="#FFFFFF" />
          <rect y="3.8" width="10" height="2.4" fill="#FFFFFF" />
        </svg>
      );
    case 'ES': // Spain
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Spain"} role="img">
          <rect width="30" height="5" fill="#AA151B" />
          <rect y="5" width="30" height="10" fill="#F1BF00" />
          <rect y="15" width="30" height="5" fill="#AA151B" />
        </svg>
      );
    case 'IT': // Italy
      return (
        <svg viewBox="0 0 30 20" className={baseClasses} aria-label={title || "Italy"} role="img">
          <rect width="10" height="20" fill="#009246" />
          <rect x="10" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" width="10" height="20" fill="#CE2B37" />
        </svg>
      );
    case 'CH': // Switzerland
      return (
        <svg viewBox="0 0 20 20" className={baseClasses} aria-label={title || "Switzerland"} role="img">
          <rect width="20" height="20" fill="#FF0000" />
          <rect x="8" y="3" width="4" height="14" fill="#FFFFFF" />
          <rect x="3" y="8" width="14" height="4" fill="#FFFFFF" />
        </svg>
      );
    default:
      return (
        <span className={`inline-flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[10px] font-black tracking-tight px-1 rounded-xs border border-slate-300 dark:border-slate-700 ${className}`}>
          {normalized || '🌐'}
        </span>
      );
  }
}
