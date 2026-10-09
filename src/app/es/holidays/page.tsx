import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { FaqAccordion } from '@/components/common/FaqAccordion';
import { RelatedLinksHub } from '@/components/common/RelatedLinksHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { Calendar, Building2 } from 'lucide-react';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { EditorialContentBlock } from '@/components/common/EditorialContentBlock';

const content = HUB_PAGES_ES_CONTENT['/holidays'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/holidays',
  'es'
);

export default function HolidaysPageEs() {
  const holidays = [
    { name: "Año Nuevo", date: "1 de enero, 2026", type: "Feriado Público", country: "Global / Multinacional", desc: "Celebrado globalmente como el primer día del calendario gregoriano." },
    { name: "Día de Martin Luther King Jr.", date: "19 de enero, 2026", type: "Feriado Federal", country: "Estados Unidos", desc: "Honra al líder de los derechos civiles; se celebra el tercer lunes de enero." },
    { name: "Día de la República", date: "26 de enero, 2026", type: "Fiesta Nacional", country: "India", desc: "Conmemora la entrada en vigor de la Constitución de la India en 1950." },
    { name: "Año Nuevo Lunar / Fiesta de la Primavera", date: "17 de febrero, 2026", type: "Cultural y Estatutario", country: "Asia Oriental y Sudeste", desc: "Principal festividad tradicional del calendario lunisolar." },
    { name: "Viernes Santo", date: "3 de abril, 2026", type: "Feriado Bancario / Estatutario", country: "Reino Unido, UE, América Latina, Global", desc: "Conmemoración cristiana previa al Domingo de Resurrección; cierre bancario." },
    { name: "Lunes de Pascua", date: "6 de abril, 2026", type: "Feriado Bancario", country: "Reino Unido, UE, Australia, Canadá", desc: "Feriado oficial celebrado en la Commonwealth y la Unión Europea." },
    { name: "Día Internacional de los Trabajadores", date: "1 de mayo, 2026", type: "Feriado Público", country: "Global / Más de 80 países", desc: "Homenaje al movimiento obrero y a los derechos laborales internacionales." },
    { name: "Día de los Caídos (Memorial Day)", date: "25 de mayo, 2026", type: "Feriado Federal", country: "Estados Unidos", desc: "Homenaje al personal militar fallecido; último lunes de mayo." },
    { name: "Día de la Independencia", date: "4 de julio, 2026", type: "Feriado Federal", country: "Estados Unidos", desc: "Conmemora la Declaración de Independencia de 1776." },
    { name: "Fiesta Nacional de Francia (Toma de la Bastilla)", date: "14 de julio, 2026", type: "Fiesta Nacional", country: "Francia", desc: "Celebración nacional de la toma de la fortaleza de la Bastilla en 1789." },
    { name: "Diwali (Festival de las Luces)", date: "8 de noviembre, 2026", type: "Nacional y Cultural", country: "India, Singapur, Global", desc: "Gran festividad que celebra la victoria de la luz sobre la oscuridad." },
    { name: "Día de Acción de Gracias (Thanksgiving)", date: "26 de noviembre, 2026", type: "Feriado Federal", country: "Estados Unidos", desc: "Día nacional de gratitud; cuarto jueves de noviembre." },
    { name: "Navidad", date: "25 de diciembre, 2026", type: "Feriado Público", country: "Global / Multinacional", desc: "Celebración cristiana del nacimiento de Jesús; cierre comercial internacional." },
    { name: "Boxing Day (Día de San Esteban)", date: "26 de diciembre, 2026", type: "Feriado Bancario", country: "Reino Unido, Canadá, Australia", desc: "Feriado de la Commonwealth celebrado el día después de Navidad." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ name: 'Días Festivos', url: '/es/holidays' }]} locale="es" />
      <JsonLd
        type="breadcrumb"
        data={[
          { name: 'Inicio', url: '/es' },
          { name: 'Días Festivos', url: '/es/holidays' },
        ]}
      />
      <JsonLd type="faq" data={content.faqs} />

      {/* Hero Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Calendario Estatutario y Cultural</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {content.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
          {content.description}
        </p>
      </div>

      {/* Holiday Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Principales Días Festivos Internacionales (2026 y 2027)
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {holidays.map((h, i) => (
            <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white block">{h.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">{h.country} — {h.desc}</span>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 block">{h.date}</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{h.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Guide */}
      <EditorialContentBlock content={content} badgeLabel={content.badgeLabel} />

      {/* Structured FAQs */}
      <FaqAccordion
        title="Preguntas Frecuentes sobre Días Festivos Internacionales"
        subtitle="Conoce el impacto de los feriados en nóminas, cierres bancarios y planificación laboral."
        items={content.faqs}
      />

      <RelatedLinksHub
        currentPath="/holidays"
        title="Explorar Herramientas de Fechas y Calendarios Relacionadas"
        subtitle="Calcula días hábiles, diferencias de fechas o revisa calendarios imprimibles."
        locale="es"
      />
    </div>
  );
}
