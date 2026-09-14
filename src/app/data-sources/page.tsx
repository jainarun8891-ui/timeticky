import React from 'react';
export default function DataSourcesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Data Sources & Provenance</h1>
      <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
        <li><strong>IANA Time Zone Database (tzdata):</strong> Authoritative international timezone rules.</li>
        <li><strong>Astronomical Solar Formulas:</strong> Mathematical models for solar noon, sunrise, and sunset.</li>
        <li><strong>GeoNames:</strong> Geographic coordinates and administrative regions.</li>
      </ul>
    </div>
  );
}
