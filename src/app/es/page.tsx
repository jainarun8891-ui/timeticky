import React from 'react';
import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { EsHomePageClient } from './EsHomePageClient';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = buildPageMetadata(
  'Hora exacta y reloj mundial online | TimeNumbers',
  'Consulta la hora actual en ciudades de todo el mundo, convierte zonas horarias y utiliza relojes, temporizadores y herramientas gratuitas.',
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
