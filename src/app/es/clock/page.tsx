import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { ClockClient } from '@/app/clock/ClockClient';

const content = HUB_PAGES_ES_CONTENT['/clock'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/es/clock'
);

export default function SpanishClockPage() {
  return <ClockClient content={content} locale="es" />;
}
