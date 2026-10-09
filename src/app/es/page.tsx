import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { EsHomePageClient } from './EsHomePageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildPageMetadata(
  'Hora Exacta Ahora: ¿Qué Hora Es? Reloj Mundial en Vivo',
  'Descubre qué hora es ahora mismo con segundos en vivo sincronizados con la hora atómica oficial. Reloj mundial de 500+ ciudades, conversor y herramientas gratis.',
  '/es',
  'es'
);

export default function SpanishHomePage() {
  return (
    <>
      <JsonLd type="website" />
      <JsonLd type="organization" />
      <EsHomePageClient />
    </>
  );
}
