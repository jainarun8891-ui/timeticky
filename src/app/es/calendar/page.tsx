import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { HUB_PAGES_ES_CONTENT } from '@/lib/i18n/hub-pages-es';
import { CalendarClient } from '@/app/calendar/CalendarClient';

const content = HUB_PAGES_ES_CONTENT['/calendar'];

export const metadata: Metadata = buildPageMetadata(
  content.title,
  content.description,
  '/calendar',
  'es'
);

export default function CalendarPageEs() {
  return <CalendarClient content={content} locale="es" />;
}
